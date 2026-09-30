from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Cavicord API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("cavicord")

FDIC_URL = "https://www.fdic.gov/national-rates-and-rate-caps"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

# ---------------------------- Models ----------------------------

class BankRate(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    bank: str
    apy: float
    min_deposit: int = 0
    term_months: int
    penalty: str = ""
    best: bool = False
    color: str = "#0f766e"
    rate_type: str = "standard"  # standard | jumbo | no_penalty
    url: str = ""
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SubscriberCreate(BaseModel):
    email: EmailStr
    frequency: str = "weekly"  # weekly | instant

class NationalRate(BaseModel):
    product: str
    term_months: Optional[int] = None
    national_rate: Optional[float] = None
    rate_cap: Optional[float] = None

class LeadCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=25)
    investment_amount: str = Field(min_length=1)
    timeframe: str = Field(min_length=1)
    term_months: int
    agree: bool

class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    email: str
    phone: str
    investment_amount: str
    timeframe: str
    term_months: int
    agree: bool
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

def parse_amount(label: str) -> float:
    """Extract the first dollar figure from an amount-range label, e.g. '$50,000 - $99,999' -> 50000."""
    m = re.search(r"([0-9][0-9,]*)", label)
    if not m:
        return 0.0
    try:
        return float(m.group(1).replace(",", ""))
    except ValueError:
        return 0.0

# ---------------------------- Seed data ----------------------------

BANK_URLS = {
    "Bask Bank": "https://www.baskbank.com/certificates-of-deposit",
    "Marcus by Goldman Sachs": "https://www.marcus.com/us/en/savings/high-yield-cds",
    "Ally Bank": "https://www.ally.com/bank/cd-rates/",
    "Synchrony Bank": "https://www.synchronybank.com/banking/cd/",
    "Discover Bank": "https://www.discover.com/online-banking/cd/",
    "Barclays": "https://www.banking.barclaysus.com/online-cds.html",
    "Capital One": "https://www.capitalone.com/bank/cds/online-cds/",
    "Bread Savings": "https://savings.breadfinancial.com/",
    "Quontic Bank": "https://www.quontic.com/certificate-of-deposit/",
    "BMO Alto": "https://www.bmoalto.com/",
    "CIT Bank": "https://www.cit.com/cit-bank/bank/certificates-of-deposit",
    "Credit One Bank": "https://www.creditonebank.com/high-yield-cds",
    "Navy Federal Credit Union": "https://www.navyfederal.org/checking-savings/savings/certificates.html",
    "Suncoast Credit Union": "https://www.suncoastcreditunion.com/personal/savings/certificates",
}

SEED_RATES = [
    # 6 months
    {"bank": "Bask Bank", "apy": 4.65, "min_deposit": 1000, "term_months": 6, "penalty": "90 days of interest", "color": "#2563eb"},
    {"bank": "Marcus by Goldman Sachs", "apy": 4.60, "min_deposit": 500, "term_months": 6, "penalty": "90 days of interest", "color": "#0f766e"},
    {"bank": "Ally Bank", "apy": 4.40, "min_deposit": 0, "term_months": 6, "penalty": "60 days of interest", "color": "#7c3aed"},
    {"bank": "Synchrony Bank", "apy": 4.35, "min_deposit": 0, "term_months": 6, "penalty": "90 days of interest", "color": "#b45309"},
    {"bank": "Discover Bank", "apy": 4.25, "min_deposit": 2500, "term_months": 6, "penalty": "3 months of interest", "color": "#ea580c"},
    # 12 months
    {"bank": "Marcus by Goldman Sachs", "apy": 4.75, "min_deposit": 500, "term_months": 12, "penalty": "270 days of interest", "color": "#0f766e"},
    {"bank": "Ally Bank", "apy": 4.50, "min_deposit": 0, "term_months": 12, "penalty": "150 days of interest", "color": "#7c3aed"},
    {"bank": "Barclays", "apy": 4.40, "min_deposit": 0, "term_months": 12, "penalty": "90 days of interest", "color": "#0284c7"},
    {"bank": "Capital One", "apy": 4.30, "min_deposit": 0, "term_months": 12, "penalty": "6 months of interest", "color": "#dc2626"},
    {"bank": "Discover Bank", "apy": 4.25, "min_deposit": 2500, "term_months": 12, "penalty": "6 months of interest", "color": "#ea580c"},
    # 24 months
    {"bank": "Bread Savings", "apy": 4.35, "min_deposit": 1500, "term_months": 24, "penalty": "180 days of interest", "color": "#9333ea"},
    {"bank": "Barclays", "apy": 4.20, "min_deposit": 0, "term_months": 24, "penalty": "180 days of interest", "color": "#0284c7"},
    {"bank": "Ally Bank", "apy": 4.10, "min_deposit": 0, "term_months": 24, "penalty": "150 days of interest", "color": "#7c3aed"},
    {"bank": "Capital One", "apy": 4.05, "min_deposit": 0, "term_months": 24, "penalty": "6 months of interest", "color": "#dc2626"},
    {"bank": "Synchrony Bank", "apy": 4.00, "min_deposit": 0, "term_months": 24, "penalty": "180 days of interest", "color": "#b45309"},
    # 36 months
    {"bank": "Quontic Bank", "apy": 4.25, "min_deposit": 500, "term_months": 36, "penalty": "2 years of interest", "color": "#059669"},
    {"bank": "Bread Savings", "apy": 4.15, "min_deposit": 1500, "term_months": 36, "penalty": "365 days of interest", "color": "#9333ea"},
    {"bank": "Barclays", "apy": 4.10, "min_deposit": 0, "term_months": 36, "penalty": "180 days of interest", "color": "#0284c7"},
    {"bank": "Ally Bank", "apy": 4.00, "min_deposit": 0, "term_months": 36, "penalty": "150 days of interest", "color": "#7c3aed"},
    {"bank": "Discover Bank", "apy": 3.95, "min_deposit": 2500, "term_months": 36, "penalty": "6 months of interest", "color": "#ea580c"},
    # 60 months
    {"bank": "BMO Alto", "apy": 4.20, "min_deposit": 0, "term_months": 60, "penalty": "180 days of interest", "color": "#1d4ed8"},
    {"bank": "Bread Savings", "apy": 4.15, "min_deposit": 1500, "term_months": 60, "penalty": "365 days of interest", "color": "#9333ea"},
    {"bank": "Barclays", "apy": 4.05, "min_deposit": 0, "term_months": 60, "penalty": "180 days of interest", "color": "#0284c7"},
    {"bank": "Capital One", "apy": 4.00, "min_deposit": 0, "term_months": 60, "penalty": "6 months of interest", "color": "#dc2626"},
    {"bank": "Synchrony Bank", "apy": 3.90, "min_deposit": 0, "term_months": 60, "penalty": "365 days of interest", "color": "#b45309"},
    # Jumbo CDs (min $100k)
    {"bank": "Credit One Bank", "apy": 4.55, "min_deposit": 100000, "term_months": 12, "penalty": "90 days of interest", "color": "#0891b2", "rate_type": "jumbo"},
    {"bank": "Navy Federal Credit Union", "apy": 4.45, "min_deposit": 100000, "term_months": 12, "penalty": "180 days of interest", "color": "#1e3a8a", "rate_type": "jumbo"},
    {"bank": "Suncoast Credit Union", "apy": 4.40, "min_deposit": 100000, "term_months": 12, "penalty": "90 days of interest", "color": "#c2410c", "rate_type": "jumbo"},
    {"bank": "Credit One Bank", "apy": 4.30, "min_deposit": 100000, "term_months": 24, "penalty": "180 days of interest", "color": "#0891b2", "rate_type": "jumbo"},
    {"bank": "Navy Federal Credit Union", "apy": 4.25, "min_deposit": 100000, "term_months": 24, "penalty": "180 days of interest", "color": "#1e3a8a", "rate_type": "jumbo"},
    # No-penalty CDs
    {"bank": "Marcus by Goldman Sachs", "apy": 4.35, "min_deposit": 500, "term_months": 13, "penalty": "None", "color": "#0f766e", "rate_type": "no_penalty"},
    {"bank": "Ally Bank", "apy": 4.20, "min_deposit": 0, "term_months": 11, "penalty": "None", "color": "#7c3aed", "rate_type": "no_penalty"},
    {"bank": "CIT Bank", "apy": 4.15, "min_deposit": 1000, "term_months": 11, "penalty": "None", "color": "#334155", "rate_type": "no_penalty"},
    {"bank": "Synchrony Bank", "apy": 4.10, "min_deposit": 0, "term_months": 11, "penalty": "None", "color": "#b45309", "rate_type": "no_penalty"},
]

# ---------------------------- FDIC fetcher ----------------------------

PRODUCT_TERM_MAP = {
    "1 month cd": 1, "3 month cd": 3, "6 month cd": 6, "12 month cd": 12,
    "24 month cd": 24, "36 month cd": 36, "48 month cd": 48, "60 month cd": 60,
}

def _safe_float(value: str) -> Optional[float]:
    m = re.match(r"^\s*([0-9]+\.[0-9]+|[0-9]+)", value.strip())
    try:
        return float(m.group(1)) if m else None
    except (ValueError, AttributeError):
        return None

async def fetch_fdic_rates() -> List[dict]:
    """Scrape the official FDIC national rates table."""
    async with httpx.AsyncClient(timeout=25, headers={"User-Agent": UA}, follow_redirects=True) as http:
        resp = await http.get(FDIC_URL)
        resp.raise_for_status()
        html = resp.text

    rows = re.findall(r"<tr[^>]*>.*?</tr>", html, re.S)
    results = []
    for row in rows:
        cells = re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", row, re.S)
        cells = [re.sub(r"<[^>]+>", "", c).strip() for c in cells]
        if len(cells) < 6:
            continue
        product_raw = re.sub(r"[0-9]+$", "", cells[0]).strip()  # strip footnote digits
        key = product_raw.lower()
        if key in PRODUCT_TERM_MAP or product_raw in ("Savings", "Interest Checking", "Money Market"):
            results.append({
                "product": product_raw,
                "term_months": PRODUCT_TERM_MAP.get(key),
                "national_rate": _safe_float(cells[1]),
                "rate_cap": _safe_float(cells[5]),
            })
    if not results:
        raise ValueError("FDIC table parse returned no rows")
    return results

async def get_cached_national_rates(force: bool = False) -> dict:
    doc = await db.national_rates.find_one({"_id": "latest"})
    now = datetime.now(timezone.utc)
    if doc and not force:
        fetched_at = doc.get("fetched_at")
        if fetched_at and fetched_at.replace(tzinfo=timezone.utc) > now - timedelta(hours=24):
            return doc
    try:
        rates = await fetch_fdic_rates()
        doc = {"_id": "latest", "rates": rates, "source": FDIC_URL, "fetched_at": now}
        await db.national_rates.replace_one({"_id": "latest"}, doc, upsert=True)
        logger.info("FDIC national rates refreshed: %d products", len(rates))
        return doc
    except Exception as exc:
        logger.error("FDIC fetch failed: %s", exc)
        if doc:
            return doc  # stale cache better than nothing
        raise HTTPException(status_code=503, detail="FDIC data temporarily unavailable")

# ---------------------------- Seeding & helpers ----------------------------

async def ensure_seeded():
    # Reseed when empty or when schema is outdated (missing rate_type/url fields)
    total = await db.bank_rates.count_documents({})
    with_type = await db.bank_rates.count_documents({"rate_type": {"$exists": True}})
    if total == 0 or with_type < total or with_type == 0:
        await db.bank_rates.delete_many({})
        docs = []
        for r in SEED_RATES:
            data = {**r, "url": BANK_URLS.get(r["bank"], "")}
            docs.append(BankRate(**data).dict())
        await db.bank_rates.insert_many(docs)
        logger.info("Seeded %d bank rates", len(docs))

def mark_best(rates: List[dict]) -> List[dict]:
    best_by_key = {}
    for r in rates:
        key = (r["term_months"], r.get("rate_type", "standard"))
        if key not in best_by_key or r["apy"] > best_by_key[key]["apy"]:
            best_by_key[key] = r
    for r in rates:
        key = (r["term_months"], r.get("rate_type", "standard"))
        r["best"] = best_by_key[key] is r
    return rates

# ---------------------------- Routes ----------------------------

@api_router.get("/")
async def root():
    return {"message": "Cavicord API", "status": "ok"}

@api_router.get("/rates")
async def get_rates(term: str = Query("all"), rate_type: str = Query("standard")):
    await ensure_seeded()
    query = {}
    if rate_type != "all":
        if rate_type not in ("standard", "jumbo", "no_penalty"):
            raise HTTPException(status_code=400, detail="rate_type must be standard, jumbo, no_penalty or all")
        query["rate_type"] = rate_type
    if term != "all":
        try:
            query["term_months"] = int(term)
        except ValueError:
            raise HTTPException(status_code=400, detail="term must be 'all' or a number of months")
    docs = await db.bank_rates.find(query, {"_id": 0}).to_list(500)
    docs = mark_best(docs)
    docs.sort(key=lambda r: r["apy"], reverse=True)
    updated = max((d.get("updated_at") for d in docs), default=None)
    return {"rates": docs, "updated_at": updated}

@api_router.get("/national-rates")
async def national_rates():
    doc = await get_cached_national_rates()
    return {"rates": doc["rates"], "source": doc["source"], "fetched_at": doc["fetched_at"]}

@api_router.post("/refresh")
async def refresh():
    doc = await get_cached_national_rates(force=True)
    return {"status": "refreshed", "fetched_at": doc["fetched_at"], "products": len(doc["rates"])}

@api_router.post("/leads")
async def create_lead(payload: LeadCreate):
    if not payload.agree:
        raise HTTPException(status_code=400, detail="You must agree to the Privacy Policy and Terms of Service")
    await ensure_seeded()
    lead = Lead(**payload.dict())
    await db.leads.insert_one(lead.dict())
    amount = parse_amount(payload.investment_amount)
    matches = await db.bank_rates.find(
        {
            "term_months": payload.term_months,
            "min_deposit": {"$lte": amount},
            "rate_type": "standard",
        },
        {"_id": 0},
    ).sort("apy", -1).to_list(3)
    return {"id": lead.id, "matches": matches}

@api_router.post("/subscribers")
async def create_subscriber(payload: SubscriberCreate):
    if payload.frequency not in ("weekly", "instant"):
        raise HTTPException(status_code=400, detail="frequency must be 'weekly' or 'instant'")
    now = datetime.now(timezone.utc)
    await db.subscribers.update_one(
        {"email": payload.email},
        {
            "$set": {"frequency": payload.frequency, "updated_at": now},
            "$setOnInsert": {"id": str(uuid.uuid4()), "email": payload.email, "created_at": now},
        },
        upsert=True,
    )
    return {"status": "subscribed", "email": payload.email, "frequency": payload.frequency}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await ensure_seeded()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
