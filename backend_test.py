#!/usr/bin/env python3
"""
Backend API tests for Cavicord CD rates comparison site.
Tests new 3-month and 18-month seed data + regression tests.
"""

import requests
import json
import sys
from typing import Dict, List, Any

# Backend URL from frontend/.env
BASE_URL = "https://hardcore-solomon-8.preview.emergentagent.com/api"
ADMIN_KEY = "CAV-7k2m9x4qL8"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

def log_test(name: str):
    print(f"\n{Colors.BLUE}{'='*80}{Colors.RESET}")
    print(f"{Colors.BLUE}TEST: {name}{Colors.RESET}")
    print(f"{Colors.BLUE}{'='*80}{Colors.RESET}")

def log_pass(msg: str):
    print(f"{Colors.GREEN}✓ {msg}{Colors.RESET}")

def log_fail(msg: str):
    print(f"{Colors.RED}✗ {msg}{Colors.RESET}")

def log_info(msg: str):
    print(f"{Colors.YELLOW}ℹ {msg}{Colors.RESET}")

def test_3_month_rates():
    """Test 1: GET /api/rates?term=3 → 200, 4 standard rates"""
    log_test("GET /api/rates?term=3 (3-month CDs)")
    
    resp = requests.get(f"{BASE_URL}/rates", params={"term": "3"})
    
    if resp.status_code != 200:
        log_fail(f"Expected 200, got {resp.status_code}")
        return False
    
    data = resp.json()
    rates = data.get("rates", [])
    
    # Should have 4 rates
    if len(rates) != 4:
        log_fail(f"Expected 4 rates, got {len(rates)}")
        return False
    log_pass(f"Got 4 rates for 3-month term")
    
    # All should be term_months=3
    for r in rates:
        if r.get("term_months") != 3:
            log_fail(f"Rate has term_months={r.get('term_months')}, expected 3")
            return False
    log_pass("All rates have term_months=3")
    
    # Check expected banks and APYs
    expected = [
        {"bank": "Bask Bank", "apy": 4.50, "best": True},
        {"bank": "Ally Bank", "apy": 4.30, "best": False},
        {"bank": "Synchrony Bank", "apy": 4.25, "best": False},
        {"bank": "Discover Bank", "apy": 4.10, "best": False},
    ]
    
    for i, exp in enumerate(expected):
        rate = rates[i]
        if rate.get("bank") != exp["bank"]:
            log_fail(f"Rate {i}: expected bank '{exp['bank']}', got '{rate.get('bank')}'")
            return False
        if rate.get("apy") != exp["apy"]:
            log_fail(f"Rate {i}: expected APY {exp['apy']}, got {rate.get('apy')}")
            return False
        if rate.get("best") != exp["best"]:
            log_fail(f"Rate {i}: expected best={exp['best']}, got {rate.get('best')}")
            return False
    
    log_pass("Bask Bank 4.50% has best=true")
    log_pass("All banks and APYs match expected values")
    
    # Check all rates have url and rate_type fields
    for r in rates:
        if "url" not in r or not r["url"]:
            log_fail(f"Rate {r.get('bank')} missing url field")
            return False
        if r.get("rate_type") != "standard":
            log_fail(f"Rate {r.get('bank')} has rate_type={r.get('rate_type')}, expected 'standard'")
            return False
    log_pass("All rates have url and rate_type='standard' fields")
    
    log_pass("✅ TEST PASSED: 3-month rates working correctly")
    return True

def test_18_month_rates():
    """Test 2: GET /api/rates?term=18 → 200, 5 standard rates"""
    log_test("GET /api/rates?term=18 (18-month CDs)")
    
    resp = requests.get(f"{BASE_URL}/rates", params={"term": "18"})
    
    if resp.status_code != 200:
        log_fail(f"Expected 200, got {resp.status_code}")
        return False
    
    data = resp.json()
    rates = data.get("rates", [])
    
    # Should have 5 rates
    if len(rates) != 5:
        log_fail(f"Expected 5 rates, got {len(rates)}")
        return False
    log_pass(f"Got 5 rates for 18-month term")
    
    # All should be term_months=18
    for r in rates:
        if r.get("term_months") != 18:
            log_fail(f"Rate has term_months={r.get('term_months')}, expected 18")
            return False
    log_pass("All rates have term_months=18")
    
    # Check expected banks and APYs
    expected = [
        {"bank": "Marcus by Goldman Sachs", "apy": 4.50, "best": True},
        {"bank": "Ally Bank", "apy": 4.35, "best": False},
        {"bank": "Barclays", "apy": 4.30, "best": False},
        {"bank": "Synchrony Bank", "apy": 4.25, "best": False},
        {"bank": "Capital One", "apy": 4.20, "best": False},
    ]
    
    for i, exp in enumerate(expected):
        rate = rates[i]
        if rate.get("bank") != exp["bank"]:
            log_fail(f"Rate {i}: expected bank '{exp['bank']}', got '{rate.get('bank')}'")
            return False
        if rate.get("apy") != exp["apy"]:
            log_fail(f"Rate {i}: expected APY {exp['apy']}, got {rate.get('apy')}")
            return False
        if rate.get("best") != exp["best"]:
            log_fail(f"Rate {i}: expected best={exp['best']}, got {rate.get('best')}")
            return False
    
    log_pass("Marcus by Goldman Sachs 4.50% has best=true")
    log_pass("All banks and APYs match expected values")
    
    # Check all rates have url and rate_type fields
    for r in rates:
        if "url" not in r or not r["url"]:
            log_fail(f"Rate {r.get('bank')} missing url field")
            return False
        if r.get("rate_type") != "standard":
            log_fail(f"Rate {r.get('bank')} has rate_type={r.get('rate_type')}, expected 'standard'")
            return False
    log_pass("All rates have url and rate_type='standard' fields")
    
    log_pass("✅ TEST PASSED: 18-month rates working correctly")
    return True

def test_all_rates_count():
    """Test 3: GET /api/rates?term=all&rate_type=all → 200, 43 total rates"""
    log_test("GET /api/rates?term=all&rate_type=all (total count)")
    
    resp = requests.get(f"{BASE_URL}/rates", params={"term": "all", "rate_type": "all"})
    
    if resp.status_code != 200:
        log_fail(f"Expected 200, got {resp.status_code}")
        return False
    
    data = resp.json()
    rates = data.get("rates", [])
    
    # Should have 43 rates total (34 previous + 9 new)
    if len(rates) != 43:
        log_fail(f"Expected 43 rates, got {len(rates)}")
        log_info(f"Breakdown by term:")
        term_counts = {}
        for r in rates:
            term = r.get("term_months")
            term_counts[term] = term_counts.get(term, 0) + 1
        for term in sorted(term_counts.keys()):
            log_info(f"  {term} months: {term_counts[term]} rates")
        return False
    log_pass(f"Got 43 total rates (34 previous + 9 new)")
    
    # Verify breakdown by rate_type
    standard = [r for r in rates if r.get("rate_type") == "standard"]
    jumbo = [r for r in rates if r.get("rate_type") == "jumbo"]
    no_penalty = [r for r in rates if r.get("rate_type") == "no_penalty"]
    
    log_info(f"Breakdown: {len(standard)} standard, {len(jumbo)} jumbo, {len(no_penalty)} no_penalty")
    
    if len(standard) != 34:
        log_fail(f"Expected 34 standard rates, got {len(standard)}")
        return False
    if len(jumbo) != 5:
        log_fail(f"Expected 5 jumbo rates, got {len(jumbo)}")
        return False
    if len(no_penalty) != 4:
        log_fail(f"Expected 4 no_penalty rates, got {len(no_penalty)}")
        return False
    
    log_pass("Rate type breakdown correct: 34 standard + 5 jumbo + 4 no_penalty = 43")
    
    # Verify all rates have url and rate_type fields
    for r in rates:
        if "url" not in r:
            log_fail(f"Rate {r.get('bank')} missing url field")
            return False
        if "rate_type" not in r:
            log_fail(f"Rate {r.get('bank')} missing rate_type field")
            return False
    log_pass("All rates have url and rate_type fields")
    
    log_pass("✅ TEST PASSED: Total rate count is 43")
    return True

def test_12_month_regression():
    """Test 4: GET /api/rates?term=12 → still 5 rates, Marcus 4.75 best=true"""
    log_test("GET /api/rates?term=12 (regression test)")
    
    resp = requests.get(f"{BASE_URL}/rates", params={"term": "12"})
    
    if resp.status_code != 200:
        log_fail(f"Expected 200, got {resp.status_code}")
        return False
    
    data = resp.json()
    rates = data.get("rates", [])
    
    # Should have 5 rates
    if len(rates) != 5:
        log_fail(f"Expected 5 rates, got {len(rates)}")
        return False
    log_pass(f"Got 5 rates for 12-month term")
    
    # First rate should be Marcus 4.75% with best=true
    first = rates[0]
    if first.get("bank") != "Marcus by Goldman Sachs":
        log_fail(f"Expected first bank 'Marcus by Goldman Sachs', got '{first.get('bank')}'")
        return False
    if first.get("apy") != 4.75:
        log_fail(f"Expected first APY 4.75, got {first.get('apy')}")
        return False
    if first.get("best") != True:
        log_fail(f"Expected first rate best=true, got {first.get('best')}")
        return False
    
    log_pass("Marcus by Goldman Sachs 4.75% has best=true")
    log_pass("✅ TEST PASSED: 12-month rates regression working")
    return True

def test_rate_type_filters():
    """Test 5: GET /api/rates?rate_type=jumbo → 5 rates; rate_type=no_penalty → 4 rates"""
    log_test("GET /api/rates?rate_type filters (regression)")
    
    # Test jumbo
    resp = requests.get(f"{BASE_URL}/rates", params={"rate_type": "jumbo"})
    if resp.status_code != 200:
        log_fail(f"Jumbo: Expected 200, got {resp.status_code}")
        return False
    
    data = resp.json()
    jumbo_rates = data.get("rates", [])
    
    if len(jumbo_rates) != 5:
        log_fail(f"Expected 5 jumbo rates, got {len(jumbo_rates)}")
        return False
    log_pass(f"Got 5 jumbo rates")
    
    # Verify all are jumbo with min_deposit=100000
    for r in jumbo_rates:
        if r.get("rate_type") != "jumbo":
            log_fail(f"Rate {r.get('bank')} has rate_type={r.get('rate_type')}, expected 'jumbo'")
            return False
        if r.get("min_deposit") != 100000:
            log_fail(f"Rate {r.get('bank')} has min_deposit={r.get('min_deposit')}, expected 100000")
            return False
    log_pass("All jumbo rates have rate_type='jumbo' and min_deposit=100000")
    
    # Test no_penalty
    resp = requests.get(f"{BASE_URL}/rates", params={"rate_type": "no_penalty"})
    if resp.status_code != 200:
        log_fail(f"No-penalty: Expected 200, got {resp.status_code}")
        return False
    
    data = resp.json()
    no_penalty_rates = data.get("rates", [])
    
    if len(no_penalty_rates) != 4:
        log_fail(f"Expected 4 no_penalty rates, got {len(no_penalty_rates)}")
        return False
    log_pass(f"Got 4 no_penalty rates")
    
    # Verify all are no_penalty
    for r in no_penalty_rates:
        if r.get("rate_type") != "no_penalty":
            log_fail(f"Rate {r.get('bank')} has rate_type={r.get('rate_type')}, expected 'no_penalty'")
            return False
    log_pass("All no_penalty rates have rate_type='no_penalty'")
    
    log_pass("✅ TEST PASSED: Rate type filters working correctly")
    return True

def test_national_rates_regression():
    """Test 6: GET /api/national-rates → returns FDIC data including '3 month CD' product"""
    log_test("GET /api/national-rates (regression)")
    
    resp = requests.get(f"{BASE_URL}/national-rates")
    
    if resp.status_code != 200:
        log_fail(f"Expected 200, got {resp.status_code}")
        return False
    
    data = resp.json()
    rates = data.get("rates", [])
    
    if not rates:
        log_fail("No rates returned")
        return False
    log_pass(f"Got {len(rates)} FDIC products")
    
    # Check for '3 month CD' product
    three_month = None
    for r in rates:
        if r.get("product") == "3 month CD":
            three_month = r
            break
    
    if not three_month:
        log_fail("'3 month CD' product not found in FDIC data")
        log_info(f"Available products: {[r.get('product') for r in rates]}")
        return False
    
    log_pass("Found '3 month CD' product in FDIC data")
    
    # Verify it has term_months=3 and national_rate
    if three_month.get("term_months") != 3:
        log_fail(f"'3 month CD' has term_months={three_month.get('term_months')}, expected 3")
        return False
    if three_month.get("national_rate") is None:
        log_fail("'3 month CD' missing national_rate field")
        return False
    
    log_pass(f"'3 month CD' has term_months=3 and national_rate={three_month.get('national_rate')}")
    
    # Verify response structure
    if "source" not in data:
        log_fail("Response missing 'source' field")
        return False
    if "fetched_at" not in data:
        log_fail("Response missing 'fetched_at' field")
        return False
    
    log_pass("Response has correct structure (rates, source, fetched_at)")
    log_pass("✅ TEST PASSED: National rates regression working")
    return True

def test_leads_18_month():
    """Test 7: POST /api/leads with term_months 18 → 200 with up to 3 matches, all term_months=18"""
    log_test("POST /api/leads with term_months=18")
    
    payload = {
        "first_name": "T",
        "last_name": "U",
        "email": "t18@example.com",
        "phone": "+1 5551112222",
        "investment_amount": "$25,000 - $49,999",
        "timeframe": "Immediately",
        "term_months": 18,
        "agree": True
    }
    
    resp = requests.post(f"{BASE_URL}/leads", json=payload)
    
    if resp.status_code != 200:
        log_fail(f"Expected 200, got {resp.status_code}")
        log_info(f"Response: {resp.text}")
        return False
    
    data = resp.json()
    
    # Verify response structure
    if "id" not in data:
        log_fail("Response missing 'id' field")
        return False
    if "matches" not in data:
        log_fail("Response missing 'matches' field")
        return False
    
    matches = data.get("matches", [])
    
    # Should have up to 3 matches
    if len(matches) > 3:
        log_fail(f"Expected up to 3 matches, got {len(matches)}")
        return False
    if len(matches) == 0:
        log_fail("Expected at least 1 match, got 0")
        return False
    
    log_pass(f"Got {len(matches)} matches (up to 3)")
    
    # All matches should be term_months=18
    for m in matches:
        if m.get("term_months") != 18:
            log_fail(f"Match {m.get('bank')} has term_months={m.get('term_months')}, expected 18")
            return False
    log_pass("All matches have term_months=18")
    
    # Verify sorted by APY desc
    apys = [m.get("apy") for m in matches]
    if apys != sorted(apys, reverse=True):
        log_fail(f"Matches not sorted by APY desc: {apys}")
        return False
    log_pass(f"Matches sorted by APY desc: {apys}")
    
    # First match should be Marcus 4.50%
    first = matches[0]
    if first.get("bank") != "Marcus by Goldman Sachs":
        log_fail(f"Expected first match 'Marcus by Goldman Sachs', got '{first.get('bank')}'")
        return False
    if first.get("apy") != 4.50:
        log_fail(f"Expected first match APY 4.50, got {first.get('apy')}")
        return False
    
    log_pass("First match is Marcus by Goldman Sachs 4.50%")
    
    # Verify all matches have min_deposit <= 25000
    for m in matches:
        if m.get("min_deposit", 0) > 25000:
            log_fail(f"Match {m.get('bank')} has min_deposit={m.get('min_deposit')}, expected <= 25000")
            return False
    log_pass("All matches have min_deposit <= 25000")
    
    log_pass("✅ TEST PASSED: POST /api/leads with term_months=18 working correctly")
    return True

def test_admin_leads_regression():
    """Test 8: GET /api/admin/leads with X-Admin-Key header → 200"""
    log_test("GET /api/admin/leads (regression)")
    
    headers = {"X-Admin-Key": ADMIN_KEY}
    resp = requests.get(f"{BASE_URL}/admin/leads", headers=headers)
    
    if resp.status_code != 200:
        log_fail(f"Expected 200, got {resp.status_code}")
        log_info(f"Response: {resp.text}")
        return False
    
    data = resp.json()
    
    # Verify response structure
    if "leads" not in data:
        log_fail("Response missing 'leads' field")
        return False
    if "total" not in data:
        log_fail("Response missing 'total' field")
        return False
    
    leads = data.get("leads", [])
    total = data.get("total", 0)
    
    log_pass(f"Got {total} leads")
    
    # Verify total matches length
    if len(leads) != total:
        log_fail(f"Total {total} doesn't match leads length {len(leads)}")
        return False
    
    log_pass(f"Total count matches leads array length")
    
    # Verify at least one lead exists (from previous test)
    if total == 0:
        log_fail("Expected at least 1 lead from previous tests")
        return False
    
    log_pass("At least one lead exists in database")
    
    log_pass("✅ TEST PASSED: Admin leads endpoint working correctly")
    return True

def main():
    print(f"\n{Colors.BLUE}{'='*80}{Colors.RESET}")
    print(f"{Colors.BLUE}CAVICORD BACKEND API TESTS - NEW SEED DATA + REGRESSION{Colors.RESET}")
    print(f"{Colors.BLUE}{'='*80}{Colors.RESET}")
    print(f"Base URL: {BASE_URL}")
    print(f"{Colors.BLUE}{'='*80}{Colors.RESET}\n")
    
    tests = [
        ("Test 1: 3-month rates", test_3_month_rates),
        ("Test 2: 18-month rates", test_18_month_rates),
        ("Test 3: Total rate count (43)", test_all_rates_count),
        ("Test 4: 12-month regression", test_12_month_regression),
        ("Test 5: Rate type filters", test_rate_type_filters),
        ("Test 6: National rates regression", test_national_rates_regression),
        ("Test 7: POST /api/leads with term_months=18", test_leads_18_month),
        ("Test 8: Admin leads regression", test_admin_leads_regression),
    ]
    
    results = []
    for name, test_func in tests:
        try:
            result = test_func()
            results.append((name, result))
        except Exception as e:
            log_fail(f"Test failed with exception: {e}")
            results.append((name, False))
    
    # Summary
    print(f"\n{Colors.BLUE}{'='*80}{Colors.RESET}")
    print(f"{Colors.BLUE}TEST SUMMARY{Colors.RESET}")
    print(f"{Colors.BLUE}{'='*80}{Colors.RESET}")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = f"{Colors.GREEN}✅ PASSED{Colors.RESET}" if result else f"{Colors.RED}❌ FAILED{Colors.RESET}"
        print(f"{status} - {name}")
    
    print(f"\n{Colors.BLUE}{'='*80}{Colors.RESET}")
    if passed == total:
        print(f"{Colors.GREEN}ALL {total} TESTS PASSED ✅{Colors.RESET}")
    else:
        print(f"{Colors.RED}{total - passed} of {total} TESTS FAILED ❌{Colors.RESET}")
    print(f"{Colors.BLUE}{'='*80}{Colors.RESET}\n")
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    sys.exit(main())
