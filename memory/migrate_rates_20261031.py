"""One-off migration: set verified APYs (bank's own site, 2026-10-31), delete unverifiable rows."""
import os, uuid
from datetime import datetime, timezone
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv('/app/backend/.env')
db = MongoClient(os.environ['MONGO_URL'])[os.environ['DB_NAME']]
NOW = datetime.now(timezone.utc).isoformat()

# (bank, term, type) -> dict(apy, min, url) ; None = delete
U = "https://"
SRC = {
    "Ally Bank": U + "www.ally.com/bank/high-yield-cd/",
    "Capital One": U + "www.capitalone.com/bank/cds/online-cds/",
    "Synchrony Bank": U + "www.synchrony.com/banking/products/cd",
    "Barclays": U + "banking.us.barclays/online-cds.html",
    "Bask Bank": U + "www.baskbank.com/certificates-of-deposit",
    "BMO Alto": U + "alto.bmo.com/en-us/",
    "CIT Bank": U + "www.cit.com/cit-bank/bank/cds/no-penalty-cd",
    "Navy Federal Credit Union": U + "www.navyfederal.org/checking-savings/savings/certificates.html",
}
SET = [
    ("Ally Bank", 3, "standard", 2.90, 0), ("Ally Bank", 6, "standard", 4.00, 0),
    ("Ally Bank", 12, "standard", 4.50, 0), ("Ally Bank", 18, "standard", 4.50, 0),
    ("Ally Bank", 36, "standard", 4.25, 0), ("Ally Bank", 60, "standard", 4.50, 0),
    ("Ally Bank", 11, "no_penalty", 2.90, 0),
    ("Capital One", 6, "standard", 3.30, 0), ("Capital One", 12, "standard", 4.00, 0),
    ("Capital One", 18, "standard", 3.60, 0), ("Capital One", 24, "standard", 3.50, 0),
    ("Capital One", 36, "standard", 3.50, 0), ("Capital One", 60, "standard", 3.60, 0),
    ("Synchrony Bank", 6, "standard", 4.20, 0), ("Synchrony Bank", 12, "standard", 4.30, 0),
    ("Synchrony Bank", 18, "standard", 4.50, 0), ("Synchrony Bank", 24, "standard", 4.60, 0),
    ("Synchrony Bank", 36, "standard", 4.65, 0), ("Synchrony Bank", 60, "standard", 4.75, 0),
    ("Barclays", 6, "standard", 4.00, 0), ("Barclays", 12, "standard", 4.50, 0),
    ("Barclays", 18, "standard", 4.50, 0), ("Barclays", 24, "standard", 4.75, 0),
    ("Barclays", 36, "standard", 4.50, 0), ("Barclays", 60, "standard", 4.75, 0),
    ("Bask Bank", 3, "standard", 4.10, 1000), ("Bask Bank", 6, "standard", 3.90, 1000),
    ("Bask Bank", 12, "standard", 4.35, 1000), ("Bask Bank", 18, "standard", 4.00, 1000),
    ("Bask Bank", 24, "standard", 4.30, 1000),
    ("BMO Alto", 12, "standard", 3.00, 0),
    ("CIT Bank", 11, "no_penalty", 3.90, 1000),
    ("Navy Federal Credit Union", 12, "jumbo", 4.10, 100000),
    ("Navy Federal Credit Union", 24, "jumbo", 3.70, 100000),
]
DELETE = [
    ("Ally Bank", 24, "standard"), ("Synchrony Bank", 3, "standard"), ("Synchrony Bank", 11, "no_penalty"),
    ("BMO Alto", 60, "standard"),
] + [("Discover Bank", t, "standard") for t in (3, 6, 12, 36)] \
  + [("Marcus by Goldman Sachs", t, "standard") for t in (6, 12, 18)] + [("Marcus by Goldman Sachs", 13, "no_penalty")] \
  + [("Bread Savings", t, "standard") for t in (24, 36, 60)] \
  + [("Quontic Bank", 36, "standard")] \
  + [("Credit One Bank", t, "jumbo") for t in (12, 24)] \
  + [("Suncoast Credit Union", 12, "jumbo")]

COLORS = {"Ally Bank": "#7c3aed", "Capital One": "#dc2626", "Synchrony Bank": "#b45309",
          "Barclays": "#0ea5e9", "Bask Bank": "#2563eb", "BMO Alto": "#1d4ed8",
          "CIT Bank": "#16a34a", "Navy Federal Credit Union": "#1e3a8a"}
rows = []
for bank, term, rtype, apy, mn in SET:
    q = {"bank": bank, "term_months": term, "rate_type": rtype}
    old = db.bank_rates.find_one(q)
    color = (old or {}).get("color") or db.bank_rates.find_one({"bank": bank}, {"color": 1}) or {}
    color = color.get("color") if isinstance(color, dict) else color
    penalty = (old or {}).get("penalty") or {"standard": "See bank disclosure", "no_penalty": "None — no-penalty CD", "jumbo": "See bank disclosure"}[rtype]
    upd = {"apy": apy, "min_deposit": mn, "url": SRC[bank], "updated_at": NOW, "verified_at": NOW,
           "verify_status": "confirmed"}
    if old:
        db.bank_rates.update_one(q, {"$set": upd})
    else:
        db.bank_rates.insert_one({"id": str(uuid.uuid4()), **q, **upd,
                                  "penalty": penalty, "color": color or COLORS.get(bank, "#334155"),
                                  "created_at": NOW})
    rows.append((bank, term, rtype, (old or {}).get("apy"), apy, SRC[bank], ""))
for bank, term, rtype in DELETE:
    q = {"bank": bank, "term_months": term, "rate_type": rtype}
    old = db.bank_rates.find_one(q)
    if old:
        db.bank_rates.delete_one(q)
        rows.append((bank, term, rtype, old.get("apy"), None, "", "DELETED"))
print(f"{'Bank':<26} {'Term':>4} {'Type':<10} {'Old':>5} {'New':>5}  {'Del':<7} Source")
for b, t, rt, o, n, s, d in sorted(rows, key=lambda r: (r[0], r[2], r[1])):
    print(f"{b:<26} {t:>3}mo {rt:<10} {o if o is not None else '—':>5} {n if n is not None else '—':>5}  {d:<7} {s}")
print("\nFinal row count:", db.bank_rates.count_documents({}))
