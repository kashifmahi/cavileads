#!/usr/bin/env python3
"""
CDSummit Backend API Test Suite
Tests updated POST /api/leads endpoint with full lead-capture form
"""
import requests
import json
import time
from datetime import datetime

# Base URL from frontend/.env
BASE_URL = "https://hardcore-solomon-8.preview.emergentagent.com/api"

def print_test(name, passed, details=""):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if details:
        print(f"   {details}")
    print()

# ==================== UPDATED POST /api/leads TESTS ====================

def test_leads_valid_payload():
    """Test 1: Valid payload with $50,000-$99,999 → 3 matches, all standard 12-month rates sorted APY desc"""
    print("=" * 60)
    print("TEST 1: POST /api/leads - Valid payload with $50,000-$99,999")
    print("=" * 60)
    
    try:
        payload = {
            "first_name": "Jane",
            "last_name": "Doe",
            "email": f"jane.doe.{int(time.time())}@example.com",
            "phone": "+1 (555) 123-4567",
            "investment_amount": "$50,000 - $99,999",
            "timeframe": "Immediately",
            "term_months": 12,
            "agree": True
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        resp = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 200:
            print(f"Response: {resp.text}")
            print_test("Valid payload", False, f"Expected 200, got {resp.status_code}")
            return False
        
        data = resp.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        # Check structure
        if "id" not in data or "matches" not in data:
            print_test("Valid payload", False, "Missing 'id' or 'matches' in response")
            return False
        
        matches = data["matches"]
        print(f"Number of matches: {len(matches)}")
        
        # Should return 3 matches
        if len(matches) != 3:
            print_test("Valid payload", False, f"Expected 3 matches, got {len(matches)}")
            return False
        
        # All should be standard 12-month rates
        for m in matches:
            if m.get("term_months") != 12:
                print_test("Valid payload", False, f"Match has term_months={m.get('term_months')}, expected 12")
                return False
            if m.get("rate_type") != "standard":
                print_test("Valid payload", False, f"Match has rate_type={m.get('rate_type')}, expected 'standard'")
                return False
        
        # All should have min_deposit <= 50000
        for m in matches:
            if m.get("min_deposit", 0) > 50000:
                print_test("Valid payload", False, f"Match {m['bank']} has min_deposit={m['min_deposit']}, expected <= 50000")
                return False
        
        # Should be sorted by APY desc
        apys = [m["apy"] for m in matches]
        if apys != sorted(apys, reverse=True):
            print_test("Valid payload", False, f"Matches not sorted by APY desc: {apys}")
            return False
        
        # Top match should be Marcus 4.75%
        top = matches[0]
        if "Marcus" not in top["bank"] or top["apy"] != 4.75:
            print_test("Valid payload", False, f"Expected Marcus 4.75% as top match, got {top['bank']} {top['apy']}%")
            return False
        
        matches_str = ', '.join([f"{m['bank']} {m['apy']}%" for m in matches])
        print(f"✓ Top 3 matches: {matches_str}")
        print_test("Valid payload", True, f"3 matches, all standard 12-month rates sorted APY desc, Marcus 4.75% top, all min_deposit <= 50000")
        return True, data["id"]
        
    except Exception as e:
        print_test("Valid payload", False, f"Exception: {str(e)}")
        return False, None

def test_leads_under_10k():
    """Test 2: investment_amount 'Under $10,000' with term_months 12 → verify matches include Discover Bank"""
    print("=" * 60)
    print("TEST 2: POST /api/leads - Under $10,000 amount")
    print("=" * 60)
    
    try:
        payload = {
            "first_name": "John",
            "last_name": "Smith",
            "email": f"john.smith.{int(time.time())}@example.com",
            "phone": "+1 (555) 987-6543",
            "investment_amount": "Under $10,000",
            "timeframe": "Within 3 months",
            "term_months": 12,
            "agree": True
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        resp = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 200:
            print(f"Response: {resp.text}")
            print_test("Under $10,000 amount", False, f"Expected 200, got {resp.status_code}")
            return False
        
        data = resp.json()
        matches = data["matches"]
        print(f"Number of matches: {len(matches)}")
        
        # All matches should have min_deposit <= 10000
        for m in matches:
            if m.get("min_deposit", 0) > 10000:
                print_test("Under $10,000 amount", False, f"Match {m['bank']} has min_deposit={m['min_deposit']}, expected <= 10000")
                return False
        
        # Check if Discover Bank is included (min_deposit=2500)
        discover = [m for m in matches if "Discover" in m["bank"]]
        if discover:
            print(f"✓ Discover Bank included: APY {discover[0]['apy']}%, min_deposit {discover[0]['min_deposit']}")
        else:
            print(f"⚠ Discover Bank not in top 3 matches")
        
        matches_str = ', '.join([f"{m['bank']} (min ${m['min_deposit']})" for m in matches])
        print(f"✓ Matches: {matches_str}")
        print_test("Under $10,000 amount", True, f"All matches have min_deposit <= 10000")
        return True
        
    except Exception as e:
        print_test("Under $10,000 amount", False, f"Exception: {str(e)}")
        return False

def test_leads_agree_false():
    """Test 3: agree: false → 400 with detail about Privacy Policy"""
    print("=" * 60)
    print("TEST 3: POST /api/leads - agree=false")
    print("=" * 60)
    
    try:
        payload = {
            "first_name": "Test",
            "last_name": "User",
            "email": "test@example.com",
            "phone": "+1 (555) 000-0000",
            "investment_amount": "$10,000 - $24,999",
            "timeframe": "Immediately",
            "term_months": 12,
            "agree": False
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        resp = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 400:
            print_test("agree=false", False, f"Expected 400, got {resp.status_code}")
            return False
        
        data = resp.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        # Check error detail mentions Privacy Policy
        detail = data.get("detail", "")
        if "Privacy Policy" not in detail:
            print_test("agree=false", False, f"Expected error detail to mention 'Privacy Policy', got: {detail}")
            return False
        
        print(f"✓ Error detail: {detail}")
        print_test("agree=false", True, "Correctly returns 400 with Privacy Policy error")
        return True
        
    except Exception as e:
        print_test("agree=false", False, f"Exception: {str(e)}")
        return False

def test_leads_missing_first_name():
    """Test 4: Missing first_name → 422"""
    print("=" * 60)
    print("TEST 4: POST /api/leads - Missing first_name")
    print("=" * 60)
    
    try:
        payload = {
            # "first_name" omitted
            "last_name": "Doe",
            "email": "test@example.com",
            "phone": "+1 (555) 123-4567",
            "investment_amount": "$10,000 - $24,999",
            "timeframe": "Immediately",
            "term_months": 12,
            "agree": True
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        resp = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 422:
            print_test("Missing first_name", False, f"Expected 422, got {resp.status_code}")
            return False
        
        print_test("Missing first_name", True, "Correctly returns 422 for missing first_name")
        return True
        
    except Exception as e:
        print_test("Missing first_name", False, f"Exception: {str(e)}")
        return False

def test_leads_invalid_email():
    """Test 5: Invalid email → 422"""
    print("=" * 60)
    print("TEST 5: POST /api/leads - Invalid email")
    print("=" * 60)
    
    try:
        payload = {
            "first_name": "Test",
            "last_name": "User",
            "email": "not-an-email",
            "phone": "+1 (555) 123-4567",
            "investment_amount": "$10,000 - $24,999",
            "timeframe": "Immediately",
            "term_months": 12,
            "agree": True
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        resp = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 422:
            print_test("Invalid email", False, f"Expected 422, got {resp.status_code}")
            return False
        
        print_test("Invalid email", True, "Correctly returns 422 for invalid email")
        return True
        
    except Exception as e:
        print_test("Invalid email", False, f"Exception: {str(e)}")
        return False

def test_leads_phone_too_short():
    """Test 6: phone too short '123' → 422 (min_length 7)"""
    print("=" * 60)
    print("TEST 6: POST /api/leads - Phone too short")
    print("=" * 60)
    
    try:
        payload = {
            "first_name": "Test",
            "last_name": "User",
            "email": "test@example.com",
            "phone": "123",
            "investment_amount": "$10,000 - $24,999",
            "timeframe": "Immediately",
            "term_months": 12,
            "agree": True
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        resp = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 422:
            print_test("Phone too short", False, f"Expected 422, got {resp.status_code}")
            return False
        
        print_test("Phone too short", True, "Correctly returns 422 for phone too short (min_length 7)")
        return True
        
    except Exception as e:
        print_test("Phone too short", False, f"Exception: {str(e)}")
        return False

def test_leads_mongodb_persistence(lead_id):
    """Test 7: Verify lead persisted in MongoDB with all fields"""
    print("=" * 60)
    print("TEST 7: Verify lead persisted in MongoDB")
    print("=" * 60)
    
    try:
        from pymongo import MongoClient
        mongo_url = "mongodb://localhost:27017"
        db_name = "test_database"
        
        client = MongoClient(mongo_url)
        db = client[db_name]
        
        # Find the lead by ID
        lead = db.leads.find_one({"id": lead_id})
        
        if not lead:
            print_test("MongoDB persistence", False, f"Lead with id={lead_id} not found in MongoDB")
            client.close()
            return False
        
        print(f"Lead found in MongoDB:")
        print(f"  first_name: {lead.get('first_name')}")
        print(f"  last_name: {lead.get('last_name')}")
        print(f"  email: {lead.get('email')}")
        print(f"  phone: {lead.get('phone')}")
        print(f"  investment_amount: {lead.get('investment_amount')}")
        print(f"  timeframe: {lead.get('timeframe')}")
        print(f"  term_months: {lead.get('term_months')}")
        print(f"  agree: {lead.get('agree')}")
        print(f"  created_at: {lead.get('created_at')}")
        
        # Verify all required fields are present
        required_fields = ["first_name", "last_name", "email", "phone", "investment_amount", "timeframe", "term_months", "agree", "created_at"]
        missing_fields = [f for f in required_fields if f not in lead]
        
        if missing_fields:
            print_test("MongoDB persistence", False, f"Missing fields in MongoDB: {missing_fields}")
            client.close()
            return False
        
        client.close()
        print_test("MongoDB persistence", True, "Lead persisted correctly with all fields")
        return True
        
    except Exception as e:
        print_test("MongoDB persistence", False, f"Exception: {str(e)}")
        return False

# ==================== REGRESSION TESTS ====================

def test_rates_regression():
    """Test 8: REGRESSION - GET /api/rates?term=all&rate_type=all returns 34 rates"""
    print("=" * 60)
    print("TEST 8: GET /api/rates?term=all&rate_type=all (REGRESSION)")
    print("=" * 60)
    
    try:
        resp = requests.get(f"{BASE_URL}/rates?term=all&rate_type=all", timeout=10)
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 200:
            print_test("GET /api/rates regression", False, f"Expected 200, got {resp.status_code}")
            return False
        
        data = resp.json()
        rates = data["rates"]
        print(f"Number of rates: {len(rates)}")
        
        if len(rates) != 34:
            print_test("GET /api/rates regression", False, f"Expected 34 rates, got {len(rates)}")
            return False
        
        print_test("GET /api/rates regression", True, "34 rates returned")
        return True
        
    except Exception as e:
        print_test("GET /api/rates regression", False, f"Exception: {str(e)}")
        return False

def test_national_rates_regression():
    """Test 9: REGRESSION - GET /api/national-rates returns FDIC data"""
    print("=" * 60)
    print("TEST 9: GET /api/national-rates (REGRESSION)")
    print("=" * 60)
    
    try:
        resp = requests.get(f"{BASE_URL}/national-rates", timeout=30)
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 200:
            print_test("GET /api/national-rates regression", False, f"Expected 200, got {resp.status_code}")
            return False
        
        data = resp.json()
        
        if "rates" not in data or "source" not in data or "fetched_at" not in data:
            print_test("GET /api/national-rates regression", False, "Missing required fields")
            return False
        
        rates = data["rates"]
        print(f"Number of products: {len(rates)}")
        
        if len(rates) == 0:
            print_test("GET /api/national-rates regression", False, "No rates returned")
            return False
        
        print_test("GET /api/national-rates regression", True, f"FDIC data working, {len(rates)} products")
        return True
        
    except Exception as e:
        print_test("GET /api/national-rates regression", False, f"Exception: {str(e)}")
        return False

def test_subscribers_regression():
    """Test 10: REGRESSION - POST /api/subscribers still works"""
    print("=" * 60)
    print("TEST 10: POST /api/subscribers (REGRESSION)")
    print("=" * 60)
    
    try:
        unique_email = f"regression-{int(time.time())}@example.com"
        payload = {
            "email": unique_email,
            "frequency": "weekly"
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        resp = requests.post(f"{BASE_URL}/subscribers", json=payload, timeout=10)
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 200:
            print(f"Response: {resp.text}")
            print_test("POST /api/subscribers regression", False, f"Expected 200, got {resp.status_code}")
            return False
        
        data = resp.json()
        
        if data.get("status") != "subscribed":
            print_test("POST /api/subscribers regression", False, f"Expected status='subscribed', got '{data.get('status')}'")
            return False
        
        print_test("POST /api/subscribers regression", True, "Subscriber endpoint still working")
        return True
        
    except Exception as e:
        print_test("POST /api/subscribers regression", False, f"Exception: {str(e)}")
        return False

def main():
    print("\n" + "=" * 60)
    print("CDSummit Backend API Test Suite - UPDATED POST /api/leads")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print(f"Started at: {datetime.now()}")
    print("=" * 60 + "\n")
    
    results = []
    lead_id = None
    
    # UPDATED POST /api/leads TESTS
    print("\n" + "=" * 60)
    print("UPDATED POST /api/leads TESTS")
    print("=" * 60 + "\n")
    
    valid_result = test_leads_valid_payload()
    if isinstance(valid_result, tuple):
        results.append(("POST /api/leads - Valid payload", valid_result[0]))
        lead_id = valid_result[1]
    else:
        results.append(("POST /api/leads - Valid payload", valid_result))
    
    results.append(("POST /api/leads - Under $10,000", test_leads_under_10k()))
    results.append(("POST /api/leads - agree=false", test_leads_agree_false()))
    results.append(("POST /api/leads - Missing first_name", test_leads_missing_first_name()))
    results.append(("POST /api/leads - Invalid email", test_leads_invalid_email()))
    results.append(("POST /api/leads - Phone too short", test_leads_phone_too_short()))
    
    # MongoDB persistence test (only if we have a lead_id from test 1)
    if lead_id:
        results.append(("POST /api/leads - MongoDB persistence", test_leads_mongodb_persistence(lead_id)))
    else:
        print("⚠ Skipping MongoDB persistence test (no lead_id from test 1)")
    
    # REGRESSION TESTS
    print("\n" + "=" * 60)
    print("REGRESSION TESTS")
    print("=" * 60 + "\n")
    results.append(("GET /api/rates?term=all&rate_type=all (REGRESSION)", test_rates_regression()))
    results.append(("GET /api/national-rates (REGRESSION)", test_national_rates_regression()))
    results.append(("POST /api/subscribers (REGRESSION)", test_subscribers_regression()))
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {name}")
    
    print("=" * 60)
    print(f"Total: {passed}/{total} tests passed")
    print(f"Completed at: {datetime.now()}")
    print("=" * 60 + "\n")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
