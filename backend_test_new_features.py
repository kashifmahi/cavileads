#!/usr/bin/env python3
"""
Backend API tests for CDSummit/Cavicord new features:
1. Admin endpoints with X-Admin-Key authentication
2. Email notifications on lead submission
3. Email notifications on new subscriber
4. Regression tests for existing endpoints
"""

import httpx
import asyncio
import sys
import os
from datetime import datetime

# Load environment variables
BASE_URL = "https://hardcore-solomon-8.preview.emergentagent.com/api"
ADMIN_KEY = "CAV-7k2m9x4qL8"

class TestResults:
    def __init__(self):
        self.passed = []
        self.failed = []
        self.warnings = []
    
    def add_pass(self, test_name: str, details: str = ""):
        self.passed.append(f"✅ {test_name}" + (f": {details}" if details else ""))
    
    def add_fail(self, test_name: str, details: str):
        self.failed.append(f"❌ {test_name}: {details}")
    
    def add_warning(self, test_name: str, details: str):
        self.warnings.append(f"⚠️  {test_name}: {details}")
    
    def print_summary(self):
        print("\n" + "="*80)
        print("TEST SUMMARY")
        print("="*80)
        
        if self.failed:
            print("\n🔴 FAILED TESTS:")
            for fail in self.failed:
                print(f"  {fail}")
        
        if self.warnings:
            print("\n🟡 WARNINGS:")
            for warn in self.warnings:
                print(f"  {warn}")
        
        if self.passed:
            print("\n🟢 PASSED TESTS:")
            for pass_test in self.passed:
                print(f"  {pass_test}")
        
        print("\n" + "="*80)
        print(f"Total: {len(self.passed)} passed, {len(self.failed)} failed, {len(self.warnings)} warnings")
        print("="*80 + "\n")
        
        return len(self.failed) == 0

results = TestResults()

async def test_admin_leads_with_valid_key():
    """Test GET /api/admin/leads with valid X-Admin-Key header"""
    print("\n[TEST 1] GET /api/admin/leads with valid admin key...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(
                f"{BASE_URL}/admin/leads",
                headers={"X-Admin-Key": ADMIN_KEY}
            )
            
            if resp.status_code != 200:
                results.add_fail("Admin leads with valid key", f"Expected 200, got {resp.status_code}")
                return
            
            data = resp.json()
            if "leads" not in data or "total" not in data:
                results.add_fail("Admin leads with valid key", f"Missing 'leads' or 'total' in response: {data}")
                return
            
            if not isinstance(data["leads"], list):
                results.add_fail("Admin leads with valid key", f"'leads' should be a list, got {type(data['leads'])}")
                return
            
            # Check if sorted by created_at desc (newest first)
            if len(data["leads"]) > 1:
                dates = [lead.get("created_at") for lead in data["leads"] if lead.get("created_at")]
                if dates and dates != sorted(dates, reverse=True):
                    results.add_warning("Admin leads sorting", "Leads may not be sorted by created_at desc")
            
            results.add_pass("Admin leads with valid key", f"Returns {data['total']} leads")
            return data
    except Exception as e:
        results.add_fail("Admin leads with valid key", f"Exception: {str(e)}")

async def test_admin_leads_without_key():
    """Test GET /api/admin/leads without X-Admin-Key header"""
    print("\n[TEST 2] GET /api/admin/leads without admin key...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(f"{BASE_URL}/admin/leads")
            
            if resp.status_code != 401:
                results.add_fail("Admin leads without key", f"Expected 401, got {resp.status_code}")
                return
            
            results.add_pass("Admin leads without key", "Correctly returns 401")
    except Exception as e:
        results.add_fail("Admin leads without key", f"Exception: {str(e)}")

async def test_admin_leads_with_wrong_key():
    """Test GET /api/admin/leads with wrong X-Admin-Key header"""
    print("\n[TEST 3] GET /api/admin/leads with wrong admin key...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(
                f"{BASE_URL}/admin/leads",
                headers={"X-Admin-Key": "bad-key"}
            )
            
            if resp.status_code != 401:
                results.add_fail("Admin leads with wrong key", f"Expected 401, got {resp.status_code}")
                return
            
            results.add_pass("Admin leads with wrong key", "Correctly returns 401")
    except Exception as e:
        results.add_fail("Admin leads with wrong key", f"Exception: {str(e)}")

async def test_admin_subscribers_with_valid_key():
    """Test GET /api/admin/subscribers with valid X-Admin-Key header"""
    print("\n[TEST 4] GET /api/admin/subscribers with valid admin key...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(
                f"{BASE_URL}/admin/subscribers",
                headers={"X-Admin-Key": ADMIN_KEY}
            )
            
            if resp.status_code != 200:
                results.add_fail("Admin subscribers with valid key", f"Expected 200, got {resp.status_code}")
                return
            
            data = resp.json()
            if "subscribers" not in data or "total" not in data:
                results.add_fail("Admin subscribers with valid key", f"Missing 'subscribers' or 'total' in response: {data}")
                return
            
            if not isinstance(data["subscribers"], list):
                results.add_fail("Admin subscribers with valid key", f"'subscribers' should be a list, got {type(data['subscribers'])}")
                return
            
            results.add_pass("Admin subscribers with valid key", f"Returns {data['total']} subscribers")
            return data
    except Exception as e:
        results.add_fail("Admin subscribers with valid key", f"Exception: {str(e)}")

async def test_admin_subscribers_without_key():
    """Test GET /api/admin/subscribers without X-Admin-Key header"""
    print("\n[TEST 5] GET /api/admin/subscribers without admin key...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(f"{BASE_URL}/admin/subscribers")
            
            if resp.status_code != 401:
                results.add_fail("Admin subscribers without key", f"Expected 401, got {resp.status_code}")
                return
            
            results.add_pass("Admin subscribers without key", "Correctly returns 401")
    except Exception as e:
        results.add_fail("Admin subscribers without key", f"Exception: {str(e)}")

async def test_admin_subscribers_with_wrong_key():
    """Test GET /api/admin/subscribers with wrong X-Admin-Key header"""
    print("\n[TEST 6] GET /api/admin/subscribers with wrong admin key...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(
                f"{BASE_URL}/admin/subscribers",
                headers={"X-Admin-Key": "bad-key"}
            )
            
            if resp.status_code != 401:
                results.add_fail("Admin subscribers with wrong key", f"Expected 401, got {resp.status_code}")
                return
            
            results.add_pass("Admin subscribers with wrong key", "Correctly returns 401")
    except Exception as e:
        results.add_fail("Admin subscribers with wrong key", f"Exception: {str(e)}")

async def test_lead_submission_with_email_notification():
    """Test POST /api/leads with email notification"""
    print("\n[TEST 7] POST /api/leads with email notification...")
    try:
        timestamp = datetime.now().strftime("%H%M%S")
        payload = {
            "first_name": "Test",
            "last_name": "Lead",
            "email": f"test.lead.{timestamp}@example.com",
            "phone": "+1 (555) 987-6543",
            "investment_amount": "$25,000 - $49,999",
            "timeframe": "Immediately",
            "term_months": 12,
            "agree": True
        }
        
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(f"{BASE_URL}/leads", json=payload)
            
            if resp.status_code != 200:
                results.add_fail("Lead submission with email", f"Expected 200, got {resp.status_code}: {resp.text}")
                return None
            
            data = resp.json()
            if "id" not in data or "matches" not in data:
                results.add_fail("Lead submission with email", f"Missing 'id' or 'matches' in response: {data}")
                return None
            
            if not isinstance(data["matches"], list):
                results.add_fail("Lead submission with email", f"'matches' should be a list, got {type(data['matches'])}")
                return None
            
            results.add_pass("Lead submission with email", f"Returns id={data['id'][:8]}... with {len(data['matches'])} matches")
            print(f"  ℹ️  Check backend logs for email send status (successful or 'Lead notification email failed')")
            return data["id"]
    except Exception as e:
        results.add_fail("Lead submission with email", f"Exception: {str(e)}")
        return None

async def test_lead_appears_in_admin():
    """Test that the new lead appears in GET /api/admin/leads"""
    print("\n[TEST 8] Verify new lead appears in admin endpoint...")
    try:
        # First create a lead
        timestamp = datetime.now().strftime("%H%M%S")
        test_email = f"verify.lead.{timestamp}@example.com"
        payload = {
            "first_name": "Verify",
            "last_name": "Admin",
            "email": test_email,
            "phone": "+1 (555) 111-2222",
            "investment_amount": "$10,000 - $24,999",
            "timeframe": "Within 3 months",
            "term_months": 12,
            "agree": True
        }
        
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(f"{BASE_URL}/leads", json=payload)
            if resp.status_code != 200:
                results.add_fail("Lead appears in admin", f"Failed to create test lead: {resp.status_code}")
                return
            
            lead_id = resp.json()["id"]
            
            # Now check admin endpoint
            resp = await client.get(
                f"{BASE_URL}/admin/leads",
                headers={"X-Admin-Key": ADMIN_KEY}
            )
            
            if resp.status_code != 200:
                results.add_fail("Lead appears in admin", f"Admin endpoint returned {resp.status_code}")
                return
            
            data = resp.json()
            leads = data.get("leads", [])
            
            # Check if our lead is in the list
            found = any(lead.get("email") == test_email for lead in leads)
            if not found:
                results.add_fail("Lead appears in admin", f"Lead with email {test_email} not found in admin/leads")
                return
            
            results.add_pass("Lead appears in admin", f"New lead with email {test_email} found in admin endpoint")
    except Exception as e:
        results.add_fail("Lead appears in admin", f"Exception: {str(e)}")

async def test_subscriber_email_notification_new():
    """Test POST /api/subscribers with email notification for NEW subscriber"""
    print("\n[TEST 9] POST /api/subscribers with email notification (new subscriber)...")
    try:
        timestamp = datetime.now().strftime("%H%M%S")
        test_email = f"newsub.test.{timestamp}@example.com"
        payload = {
            "email": test_email,
            "frequency": "instant"
        }
        
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(f"{BASE_URL}/subscribers", json=payload)
            
            if resp.status_code != 200:
                results.add_fail("New subscriber email", f"Expected 200, got {resp.status_code}: {resp.text}")
                return None
            
            data = resp.json()
            if data.get("status") != "subscribed":
                results.add_fail("New subscriber email", f"Expected status='subscribed', got {data}")
                return None
            
            results.add_pass("New subscriber email", f"Subscriber created with email {test_email}")
            print(f"  ℹ️  Check backend logs for email send status (should see email attempt for NEW subscriber)")
            return test_email
    except Exception as e:
        results.add_fail("New subscriber email", f"Exception: {str(e)}")
        return None

async def test_subscriber_email_notification_duplicate():
    """Test POST /api/subscribers with same email - should NOT send second email"""
    print("\n[TEST 10] POST /api/subscribers with duplicate email (no second email)...")
    try:
        timestamp = datetime.now().strftime("%H%M%S")
        test_email = f"duplicate.test.{timestamp}@example.com"
        payload = {
            "email": test_email,
            "frequency": "instant"
        }
        
        async with httpx.AsyncClient(timeout=30) as client:
            # First submission
            resp1 = await client.post(f"{BASE_URL}/subscribers", json=payload)
            if resp1.status_code != 200:
                results.add_fail("Duplicate subscriber email", f"First submission failed: {resp1.status_code}")
                return
            
            # Second submission with same email
            resp2 = await client.post(f"{BASE_URL}/subscribers", json=payload)
            if resp2.status_code != 200:
                results.add_fail("Duplicate subscriber email", f"Second submission failed: {resp2.status_code}")
                return
            
            results.add_pass("Duplicate subscriber email", f"Both submissions returned 200")
            print(f"  ℹ️  Check backend logs - should see email attempt ONLY for first submission, NOT second")
    except Exception as e:
        results.add_fail("Duplicate subscriber email", f"Exception: {str(e)}")

async def test_subscriber_appears_in_admin():
    """Test that new subscriber appears in GET /api/admin/subscribers"""
    print("\n[TEST 11] Verify new subscriber appears in admin endpoint...")
    try:
        timestamp = datetime.now().strftime("%H%M%S")
        test_email = f"verify.sub.{timestamp}@example.com"
        payload = {
            "email": test_email,
            "frequency": "weekly"
        }
        
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(f"{BASE_URL}/subscribers", json=payload)
            if resp.status_code != 200:
                results.add_fail("Subscriber appears in admin", f"Failed to create subscriber: {resp.status_code}")
                return
            
            # Check admin endpoint
            resp = await client.get(
                f"{BASE_URL}/admin/subscribers",
                headers={"X-Admin-Key": ADMIN_KEY}
            )
            
            if resp.status_code != 200:
                results.add_fail("Subscriber appears in admin", f"Admin endpoint returned {resp.status_code}")
                return
            
            data = resp.json()
            subscribers = data.get("subscribers", [])
            
            # Check if our subscriber is in the list
            found = any(sub.get("email") == test_email for sub in subscribers)
            if not found:
                results.add_fail("Subscriber appears in admin", f"Subscriber {test_email} not found in admin/subscribers")
                return
            
            results.add_pass("Subscriber appears in admin", f"New subscriber {test_email} found in admin endpoint")
    except Exception as e:
        results.add_fail("Subscriber appears in admin", f"Exception: {str(e)}")

async def test_regression_rates():
    """Regression test: GET /api/rates?term=12 still returns 5 standard rates"""
    print("\n[TEST 12] REGRESSION: GET /api/rates?term=12...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(f"{BASE_URL}/rates?term=12")
            
            if resp.status_code != 200:
                results.add_fail("Regression rates", f"Expected 200, got {resp.status_code}")
                return
            
            data = resp.json()
            if "rates" not in data:
                results.add_fail("Regression rates", f"Missing 'rates' in response: {data}")
                return
            
            rates = data["rates"]
            if len(rates) != 5:
                results.add_fail("Regression rates", f"Expected 5 rates for term=12, got {len(rates)}")
                return
            
            # Check all are standard rates
            non_standard = [r for r in rates if r.get("rate_type") != "standard"]
            if non_standard:
                results.add_fail("Regression rates", f"Found non-standard rates: {non_standard}")
                return
            
            results.add_pass("Regression rates", f"Returns 5 standard 12-month rates")
    except Exception as e:
        results.add_fail("Regression rates", f"Exception: {str(e)}")

async def test_regression_national_rates():
    """Regression test: GET /api/national-rates still works"""
    print("\n[TEST 13] REGRESSION: GET /api/national-rates...")
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(f"{BASE_URL}/national-rates")
            
            if resp.status_code != 200:
                results.add_fail("Regression national rates", f"Expected 200, got {resp.status_code}")
                return
            
            data = resp.json()
            if "rates" not in data or "source" not in data or "fetched_at" not in data:
                results.add_fail("Regression national rates", f"Missing required fields in response: {data.keys()}")
                return
            
            rates = data["rates"]
            if not isinstance(rates, list) or len(rates) == 0:
                results.add_fail("Regression national rates", f"Expected non-empty list of rates, got {rates}")
                return
            
            results.add_pass("Regression national rates", f"Returns {len(rates)} FDIC products")
    except Exception as e:
        results.add_fail("Regression national rates", f"Exception: {str(e)}")

async def main():
    print("="*80)
    print("CDSummit/Cavicord Backend API Tests")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Key: {ADMIN_KEY}")
    print("="*80)
    
    # Run all tests
    await test_admin_leads_with_valid_key()
    await test_admin_leads_without_key()
    await test_admin_leads_with_wrong_key()
    await test_admin_subscribers_with_valid_key()
    await test_admin_subscribers_without_key()
    await test_admin_subscribers_with_wrong_key()
    await test_lead_submission_with_email_notification()
    await test_lead_appears_in_admin()
    await test_subscriber_email_notification_new()
    await test_subscriber_email_notification_duplicate()
    await test_subscriber_appears_in_admin()
    await test_regression_rates()
    await test_regression_national_rates()
    
    # Print summary
    success = results.print_summary()
    
    return 0 if success else 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)
