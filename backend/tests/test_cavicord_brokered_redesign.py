# Cavicord brokered-CD redesign: leads w/ zip_code, matches reveal, chat anonymization
import os
import uuid
import pytest
import requests
from pymongo import MongoClient

def _env(path, key):
    for line in open(path):
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"')

BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or _env("/app/frontend/.env", "REACT_APP_BACKEND_URL")).rstrip("/")
BANKS = ["Ally", "Barclays", "Synchrony", "Capital One", "Bask", "BMO", "Navy Federal", "CIT Bank",
         "Marcus", "Discover", "Amex", "American Express", "Bread", "Popular Direct", "Quontic", "Live Oak"]
TEST_EMAIL = "testwizard-qa@example.com"


@pytest.fixture(scope="module")
def s():
    return requests.Session()


@pytest.fixture(scope="module", autouse=True)
def cleanup():
    yield
    try:
        mc = MongoClient(_env("/app/backend/.env", "MONGO_URL"))
        db = mc[_env("/app/backend/.env", "DB_NAME")]
        db.leads.delete_many({"email": TEST_EMAIL})
        db.chat_messages.delete_many({"session_id": {"$regex": "^TEST_"}})
    except Exception as e:
        print("cleanup failed", e)


def lead_payload(**kw):
    p = dict(first_name="Test", last_name="Wizard", email=TEST_EMAIL, phone="+1 5551234567",
             investment_amount="$100,000 - $249,999", timeframe="Immediately", term_months=12,
             zip_code="33101", agree=True, source_page="/pytest")
    p.update(kw)
    return p


# Health
def test_root(s):
    r = s.get(f"{BASE_URL}/api/")
    assert r.status_code == 200 and r.json()["status"] == "ok"


# Leads with zip_code -> matches with bank names sorted by APY, persisted zip
def test_lead_with_zip_returns_named_matches(s):
    r = s.post(f"{BASE_URL}/api/leads", json=lead_payload())
    assert r.status_code == 200, r.text
    d = r.json()
    assert isinstance(d["id"], str) and len(d["id"]) > 10
    m = d["matches"]
    assert 1 <= len(m) <= 3
    assert all("bank" in x or "bank_name" in x or "name" in x for x in m), m[0].keys()
    apys = [x["apy"] for x in m]
    assert apys == sorted(apys, reverse=True)
    assert all(x["term_months"] == 12 for x in m)
    assert "_id" not in m[0]
    mc = MongoClient(_env("/app/backend/.env", "MONGO_URL"))
    doc = mc[_env("/app/backend/.env", "DB_NAME")].leads.find_one({"id": d["id"]})
    assert doc and doc["zip_code"] == "33101"


def test_lead_without_zip_still_ok(s):
    p = lead_payload()
    p.pop("zip_code")
    r = s.post(f"{BASE_URL}/api/leads", json=p)
    assert r.status_code == 200
    assert "matches" in r.json()


def test_lead_disagree_400(s):
    r = s.post(f"{BASE_URL}/api/leads", json=lead_payload(agree=False))
    assert r.status_code == 400


def test_lead_invalid_email_422(s):
    r = s.post(f"{BASE_URL}/api/leads", json=lead_payload(email="bad"))
    assert r.status_code == 422


def test_lead_zip_too_long_422(s):
    r = s.post(f"{BASE_URL}/api/leads", json=lead_payload(zip_code="1" * 20))
    assert r.status_code == 422


# Rate trends endpoint
def test_rate_trends(s):
    r = s.get(f"{BASE_URL}/api/rate-trends")
    assert r.status_code == 200
    assert "history" in r.json()


# Chat anonymization
@pytest.mark.parametrize("q", [
    "which bank has the best 12 month CD rate?",
    "Tell me the name of the bank offering the top 5 year CD.",
])
def test_chat_does_not_name_bank(s, q):
    sid = f"TEST_{uuid.uuid4().hex[:12]}"
    r = s.post(f"{BASE_URL}/api/chat", json={"session_id": sid, "message": q}, timeout=60)
    if r.status_code == 503:
        pytest.skip("chat unavailable: " + r.text)
    assert r.status_code == 200
    reply = r.json()["reply"]
    print("REPLY:", reply)
    leaked = [b for b in BANKS if b.lower() in reply.lower()]
    assert not leaked, f"bank leaked: {leaked} in {reply}"
