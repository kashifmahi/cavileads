# Cavicord regression: public rates, admin rate mgmt, leads, chat
import os
import uuid
import pytest
import requests
from dotenv import dotenv_values

FE_ENV = dotenv_values("/app/frontend/.env")
BE_ENV = dotenv_values("/app/backend/.env")
BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or FE_ENV["REACT_APP_BACKEND_URL"]).rstrip("/")
ADMIN_KEY = BE_ENV["ADMIN_KEY"]
H = {"X-Admin-Key": ADMIN_KEY}


@pytest.fixture(scope="module")
def s():
    return requests.Session()


# Public rates
class TestRates:
    def test_rates(self, s):
        r = s.get(f"{BASE_URL}/api/rates")
        assert r.status_code == 200
        d = r.json()
        assert len(d["rates"]) > 0
        assert d["updated_at"] and d["oldest_updated_at"]
        assert d["oldest_updated_at"] <= d["updated_at"]
        assert all(x["rate_type"] == "standard" for x in d["rates"])

    def test_rates_all_types(self, s):
        r = s.get(f"{BASE_URL}/api/rates", params={"rate_type": "all"})
        assert r.status_code == 200
        types = {x["rate_type"] for x in r.json()["rates"]}
        assert {"standard", "jumbo", "no_penalty"} <= types


# Admin rates
class TestAdminRates:
    def test_no_key_401(self, s):
        assert s.get(f"{BASE_URL}/api/admin/rates").status_code == 401
        assert s.get(f"{BASE_URL}/api/admin/rates", headers={"X-Admin-Key": "bad"}).status_code == 401
        assert s.patch(f"{BASE_URL}/api/admin/rates/x", json={"apy": 1}).status_code == 401
        assert s.post(f"{BASE_URL}/api/admin/rates/verify-all").status_code == 401

    def test_get_all(self, s):
        r = s.get(f"{BASE_URL}/api/admin/rates", headers=H)
        assert r.status_code == 200
        rates = r.json()["rates"]
        pub = s.get(f"{BASE_URL}/api/rates", params={"rate_type": "all"}).json()["rates"]
        assert len(rates) == len(pub)
        assert "_id" not in rates[0] and "id" in rates[0]

    def test_patch_and_restore(self, s):
        rates = s.get(f"{BASE_URL}/api/admin/rates", headers=H).json()["rates"]
        target = rates[0]
        orig = target["apy"]
        try:
            r = s.patch(f"{BASE_URL}/api/admin/rates/{target['id']}", json={"apy": 4.99}, headers=H)
            assert r.status_code == 200
            d = r.json()
            assert d["apy"] == 4.99
            assert d["verify_status"] == "confirmed"
            assert d["verified_at"]
            again = [x for x in s.get(f"{BASE_URL}/api/admin/rates", headers=H).json()["rates"] if x["id"] == target["id"]][0]
            assert again["apy"] == 4.99
        finally:
            rr = s.patch(f"{BASE_URL}/api/admin/rates/{target['id']}", json={"apy": orig}, headers=H)
            assert rr.status_code == 200 and rr.json()["apy"] == orig

    def test_patch_invalid_id(self, s):
        r = s.patch(f"{BASE_URL}/api/admin/rates/nope-{uuid.uuid4()}", json={"apy": 4.0}, headers=H)
        assert r.status_code == 404

    def test_patch_empty_400(self, s):
        rid = s.get(f"{BASE_URL}/api/admin/rates", headers=H).json()["rates"][0]["id"]
        assert s.patch(f"{BASE_URL}/api/admin/rates/{rid}", json={}, headers=H).status_code == 400

    def test_patch_out_of_range_422(self, s):
        rid = s.get(f"{BASE_URL}/api/admin/rates", headers=H).json()["rates"][0]["id"]
        assert s.patch(f"{BASE_URL}/api/admin/rates/{rid}", json={"apy": 50}, headers=H).status_code == 422
        assert s.patch(f"{BASE_URL}/api/admin/rates/{rid}", json={"apy": -1}, headers=H).status_code == 422

    def test_verify_all(self, s):
        r = s.post(f"{BASE_URL}/api/admin/rates/verify-all", headers=H)
        assert r.status_code == 200
        d = r.json()
        assert isinstance(d["verified"], int) and d["verified"] > 0
        rates = s.get(f"{BASE_URL}/api/admin/rates", headers=H).json()["rates"]
        assert all(x["verify_status"] == "confirmed" and x["verified_at"] for x in rates)


# Leads (admin list) & chat
class TestLeadsChat:
    def test_admin_leads(self, s):
        r = s.get(f"{BASE_URL}/api/admin/leads", headers=H)
        assert r.status_code == 200
        assert "leads" in r.json() and "total" in r.json()

    def test_admin_leads_401(self, s):
        assert s.get(f"{BASE_URL}/api/admin/leads").status_code == 401

    def test_chat(self, s):
        r = s.post(f"{BASE_URL}/api/chat", json={"session_id": f"TEST_{uuid.uuid4().hex[:12]}",
                                                 "message": "What is the best 12 month CD rate?"}, timeout=60)
        assert r.status_code == 200, r.text
        reply = r.json()["reply"]
        assert len(reply) > 10
        print("CHAT:", reply[:300])
