from fastapi import FastAPI, APIRouter, HTTPException, Query, Header, Depends, Request
from fastapi.responses import HTMLResponse
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
from email_service import (
    send_email,
    lead_notification_html,
    subscriber_notification_html,
    rate_change_alert_html,
    weekly_top10_html,
)

OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "")
ADMIN_KEY = os.environ.get("ADMIN_KEY", "")

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_MODEL = "gemini-3.5-flash"

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
    verified_at: Optional[datetime] = None   # last time the APY was confirmed on the bank's page
    verify_status: str = ""                   # confirmed | unconfirmed | error

class BankRateUpdate(BaseModel):
    apy: Optional[float] = Field(default=None, ge=0, le=20)
    min_deposit: Optional[int] = Field(default=None, ge=0)
    penalty: Optional[str] = Field(default=None, max_length=100)
    url: Optional[str] = Field(default=None, max_length=300)

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
    source_page: str = Field(default="", max_length=200)
    utm_source: str = Field(default="", max_length=200)
    utm_medium: str = Field(default="", max_length=200)
    utm_campaign: str = Field(default="", max_length=200)
    utm_term: str = Field(default="", max_length=200)
    gclid: str = Field(default="", max_length=300)

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
    source_page: str = ""
    utm_source: str = ""
    utm_medium: str = ""
    utm_campaign: str = ""
    utm_term: str = ""
    gclid: str = ""
    ip_address: str = ""
    city: str = ""
    country: str = ""
    status: str = "new"  # new | contacted | in_progress | closed
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

LEAD_STATUSES = ("new", "contacted", "in_progress", "closed")

class LeadStatusUpdate(BaseModel):
    status: str

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
    # 3 months
    {"bank": "Bask Bank", "apy": 4.50, "min_deposit": 1000, "term_months": 3, "penalty": "90 days of interest", "color": "#2563eb"},
    {"bank": "Ally Bank", "apy": 4.30, "min_deposit": 0, "term_months": 3, "penalty": "60 days of interest", "color": "#7c3aed"},
    {"bank": "Synchrony Bank", "apy": 4.25, "min_deposit": 0, "term_months": 3, "penalty": "90 days of interest", "color": "#b45309"},
    {"bank": "Discover Bank", "apy": 4.10, "min_deposit": 2500, "term_months": 3, "penalty": "3 months of interest", "color": "#ea580c"},
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
    # 18 months
    {"bank": "Marcus by Goldman Sachs", "apy": 4.50, "min_deposit": 500, "term_months": 18, "penalty": "270 days of interest", "color": "#0f766e"},
    {"bank": "Ally Bank", "apy": 4.35, "min_deposit": 0, "term_months": 18, "penalty": "150 days of interest", "color": "#7c3aed"},
    {"bank": "Barclays", "apy": 4.30, "min_deposit": 0, "term_months": 18, "penalty": "180 days of interest", "color": "#0284c7"},
    {"bank": "Synchrony Bank", "apy": 4.25, "min_deposit": 0, "term_months": 18, "penalty": "180 days of interest", "color": "#b45309"},
    {"bank": "Capital One", "apy": 4.20, "min_deposit": 0, "term_months": 18, "penalty": "6 months of interest", "color": "#dc2626"},
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
    # Reseed when empty or when schema/data is outdated
    total = await db.bank_rates.count_documents({})
    with_type = await db.bank_rates.count_documents({"rate_type": {"$exists": True}})
    has_new_terms = await db.bank_rates.count_documents({"term_months": 3})
    if total == 0 or with_type < total or with_type == 0 or has_new_terms == 0:
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
    oldest = min((d.get("updated_at") for d in docs), default=None)
    return {"rates": docs, "updated_at": updated, "oldest_updated_at": oldest}

@api_router.get("/national-rates")
async def national_rates():
    doc = await get_cached_national_rates()
    return {"rates": doc["rates"], "source": doc["source"], "fetched_at": doc["fetched_at"]}

@api_router.post("/refresh")
async def refresh():
    doc = await get_cached_national_rates(force=True)
    return {"status": "refreshed", "fetched_at": doc["fetched_at"], "products": len(doc["rates"])}

def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else ""

async def geo_lookup(ip: str) -> dict:
    """Best-effort IP geolocation; never raises, returns {} on any failure."""
    if not ip or ip.startswith(("10.", "172.", "192.168.", "127.", "::1")):
        return {}
    try:
        async with httpx.AsyncClient(timeout=4) as c:
            r = await c.get(f"https://ipwho.is/{ip}")
            if r.status_code == 200:
                d = r.json()
                if d.get("success"):
                    return {"city": d.get("city") or "", "country": d.get("country") or ""}
            r = await c.get(f"http://ip-api.com/json/{ip}?fields=status,city,country")
            if r.status_code == 200:
                d = r.json()
                if d.get("status") == "success":
                    return {"city": d.get("city") or "", "country": d.get("country") or ""}
    except Exception as exc:
        logger.warning("Geo lookup failed for %s: %s", ip, exc)
    return {}

@api_router.post("/leads")
async def create_lead(payload: LeadCreate, request: Request):
    if not payload.agree:
        raise HTTPException(status_code=400, detail="You must agree to the Privacy Policy and Terms of Service")
    await ensure_seeded()
    ip = client_ip(request)
    geo = await geo_lookup(ip)
    lead = Lead(**payload.dict(), ip_address=ip, city=geo.get("city", ""), country=geo.get("country", ""))
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
    # Notify site owner by email (never blocks/fails the lead submission)
    if OWNER_EMAIL:
        try:
            await send_email(
                to=OWNER_EMAIL,
                subject=f"New CD lead: {payload.first_name} {payload.last_name} ({payload.investment_amount})",
                html=lead_notification_html(lead.dict()),
                reply_to=payload.email,
            )
        except Exception as exc:
            logger.error("Lead notification email failed: %s", exc)
    return {"id": lead.id, "matches": matches}

@api_router.post("/subscribers")
async def create_subscriber(payload: SubscriberCreate):
    if payload.frequency not in ("weekly", "instant"):
        raise HTTPException(status_code=400, detail="frequency must be 'weekly' or 'instant'")
    now = datetime.now(timezone.utc)
    result = await db.subscribers.update_one(
        {"email": payload.email},
        {
            "$set": {"frequency": payload.frequency, "updated_at": now, "active": True},
            "$setOnInsert": {"id": str(uuid.uuid4()), "email": payload.email, "created_at": now},
        },
        upsert=True,
    )
    # Notify owner about brand-new subscribers only (never blocks the response)
    if OWNER_EMAIL and result.upserted_id is not None:
        try:
            await send_email(
                to=OWNER_EMAIL,
                subject="New rate alerts subscriber on Cavicord",
                html=subscriber_notification_html(payload.email, payload.frequency),
            )
        except Exception as exc:
            logger.error("Subscriber notification email failed: %s", exc)
    return {"status": "subscribed", "email": payload.email, "frequency": payload.frequency}

def require_admin(x_admin_key: str = Header(default="")):
    if not ADMIN_KEY or x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Invalid admin key")
    return True

# ---------------------------- Rate management ----------------------------

@api_router.get("/admin/rates")
async def admin_rates(_: bool = Depends(require_admin)):
    await ensure_seeded()
    docs = await db.bank_rates.find({}, {"_id": 0}).to_list(500)
    docs.sort(key=lambda r: (r.get("rate_type", "standard"), r["term_months"], -r["apy"]))
    return {"rates": docs}

@api_router.patch("/admin/rates/{rate_id}")
async def admin_update_rate(rate_id: str, payload: BankRateUpdate, _: bool = Depends(require_admin)):
    changes = {k: v for k, v in payload.dict().items() if v is not None}
    if not changes:
        raise HTTPException(status_code=400, detail="Nothing to update")
    now = datetime.now(timezone.utc)
    changes["updated_at"] = now
    changes["verified_at"] = now
    changes["verify_status"] = "confirmed"
    res = await db.bank_rates.update_one({"id": rate_id}, {"$set": changes})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Rate not found")
    doc = await db.bank_rates.find_one({"id": rate_id}, {"_id": 0})
    if "apy" in changes:
        asyncio.create_task(_alerts_safe())
    return doc

async def _alerts_safe():
    try:
        await process_rate_alerts()
    except Exception as exc:
        logger.error("rate alerts after admin update failed: %s", exc)

@api_router.post("/admin/rates/verify-all")
async def admin_verify_all(_: bool = Depends(require_admin)):
    """Manual 'I checked every bank today' button."""
    now = datetime.now(timezone.utc)
    res = await db.bank_rates.update_many(
        {}, {"$set": {"updated_at": now, "verified_at": now, "verify_status": "confirmed"}}
    )
    return {"verified": res.modified_count, "at": now}

def _apy_patterns(apy: float) -> List[str]:
    s = f"{apy:.2f}"
    return [s + "%", s + " %", s + "% APY", s]

async def verify_bank_rates() -> dict:
    """Daily job: fetch each bank's CD page and confirm the APY we list still appears there.
    Confirmed rows get today's date. Unconfirmed rows keep their old date and are reported."""
    await ensure_seeded()
    docs = await db.bank_rates.find({}, {"_id": 0}).to_list(500)
    pages: dict = {}
    async with httpx.AsyncClient(timeout=25, headers={"User-Agent": UA}, follow_redirects=True) as http:
        for url in {d.get("url") or BANK_URLS.get(d["bank"], "") for d in docs}:
            if not url:
                continue
            try:
                r = await http.get(url)
                pages[url] = re.sub(r"\s+", " ", r.text) if r.status_code == 200 else None
            except Exception as exc:
                logger.warning("verify: fetch failed for %s: %s", url, exc)
                pages[url] = None
    now = datetime.now(timezone.utc)
    confirmed, unconfirmed, errored = [], [], []
    for d in docs:
        url = d.get("url") or BANK_URLS.get(d["bank"], "")
        page = pages.get(url)
        label = f'{d["bank"]} {d["term_months"]}mo {d.get("rate_type","standard")} {d["apy"]:.2f}%'
        if page is None:
            status = "error"; errored.append(label)
        elif any(p in page for p in _apy_patterns(d["apy"])):
            status = "confirmed"; confirmed.append(label)
        else:
            status = "unconfirmed"; unconfirmed.append(label)
        changes = {"verify_status": status, "verified_at": now}
        if status == "confirmed":
            changes["updated_at"] = now
        await db.bank_rates.update_one({"id": d["id"]}, {"$set": changes})
    # FDIC national averages: force a fresh pull
    fdic_ok = True
    try:
        await get_cached_national_rates(force=True)
    except Exception:
        fdic_ok = False
    report = {
        "at": now, "confirmed": confirmed, "unconfirmed": unconfirmed, "errored": errored, "fdic_refreshed": fdic_ok,
    }
    logger.info("verify: %d confirmed, %d unconfirmed, %d errored", len(confirmed), len(unconfirmed), len(errored))
    if OWNER_EMAIL and (unconfirmed or errored):
        try:
            rows = "".join(f"<li>{x}</li>" for x in unconfirmed + errored)
            await send_email(
                to=OWNER_EMAIL,
                subject=f"Cavicord: {len(unconfirmed) + len(errored)} CD rates need a manual check",
                html=f"<p>The daily check could not confirm these rates on the bank's page. "
                     f"Open <a href='{os.environ.get('SITE_URL', 'https://cavicord.tech')}/admin'>the admin page</a>, "
                     f"check each bank, and update or mark verified.</p><ul>{rows}</ul>",
            )
        except Exception as exc:
            logger.error("verify: report email failed: %s", exc)
    return report

@api_router.post("/admin/rates/verify-run")
async def admin_verify_run(_: bool = Depends(require_admin)):
    return await verify_bank_rates()

# ---------------------------- platform cron webhook ----------------------------
import hmac
import asyncio

CRON_SECRET = os.environ.get("WEBHOOK_CRON_SECRET", "")

@api_router.post("/cron/verify-rates")
async def cron_verify_rates(request: Request):
    # Cron endpoints must ack 2xx immediately; enqueue/background the actual work.
    auth = request.headers.get("authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else ""
    if not CRON_SECRET or not token or not hmac.compare_digest(token, CRON_SECRET):
        raise HTTPException(status_code=401, detail="Unauthorized")
    run_id = request.headers.get("x-webhook-id", "") or str(uuid.uuid4())
    dup = await db.cron_runs.find_one({"run_id": run_id})
    if dup:
        return {"status": "duplicate", "run_id": run_id}
    await db.cron_runs.insert_one({"run_id": run_id, "job": "verify-rates", "at": datetime.now(timezone.utc)})

    async def _job():
        try:
            await verify_bank_rates()
        except Exception as exc:
            logger.error("cron verify-rates failed: %s", exc)
        try:
            await process_rate_alerts()
        except Exception as exc:
            logger.error("cron rate alerts failed: %s", exc)
        try:
            await record_rate_history()
        except Exception as exc:
            logger.error("cron rate history failed: %s", exc)

    asyncio.create_task(_job())
    return {"status": "accepted", "run_id": run_id}

# ---------------------------- subscriber rate alerts ----------------------------
import hashlib

SITE_URL = os.environ.get("SITE_URL", "https://cavicord.tech")

def _unsub_token(email: str) -> str:
    secret = (CRON_SECRET or ADMIN_KEY or "cavicord").encode()
    return hmac.new(secret, email.lower().encode(), hashlib.sha256).hexdigest()[:32]

def _unsub_url(email: str) -> str:
    from urllib.parse import quote
    return f"{SITE_URL}/api/unsubscribe?email={quote(email)}&token={_unsub_token(email)}"

@api_router.get("/unsubscribe")
async def unsubscribe(email: str, token: str):
    if not hmac.compare_digest(token, _unsub_token(email)):
        raise HTTPException(status_code=401, detail="Invalid unsubscribe link")
    await db.subscribers.update_one(
        {"email": email}, {"$set": {"active": False, "updated_at": datetime.now(timezone.utc)}}
    )
    return HTMLResponse(
        "<html><body style='font-family:Arial,sans-serif;max-width:480px;margin:80px auto;text-align:center'>"
        "<h2 style='color:#16233d'>You're unsubscribed</h2>"
        "<p style='color:#64748b'>You won't receive any more CD rate alerts from Cavicord.</p>"
        f"<p><a href='{SITE_URL}' style='color:#047857'>Back to Cavicord</a></p></body></html>"
    )

async def _active_subscribers(frequency: str) -> list:
    return await db.subscribers.find(
        {"frequency": frequency, "active": {"$ne": False}}, {"_id": 0, "email": 1}
    ).to_list(2000)

async def _send_to_subscribers(subs: list, subject: str, html_fn) -> int:
    sent = 0
    for s in subs:
        try:
            await send_email(to=s["email"], subject=subject, html=html_fn(s["email"]))
            sent += 1
        except Exception as exc:
            logger.error("alert email to %s failed: %s", s["email"], exc)
    return sent

async def process_rate_alerts() -> dict:
    """Compare current APYs against the last snapshot; email instant subscribers on
    any change. On Mondays also send the weekly top-10 digest."""
    docs = await db.bank_rates.find({}, {"_id": 0}).to_list(500)
    standard = [d for d in docs if d.get("rate_type", "standard") == "standard"]
    current = {d["id"]: d for d in standard}
    snap = await db.rate_snapshots.find_one({"_id": "latest"}) or {}
    prev = snap.get("apys", {})
    changes = [
        {"bank": d["bank"], "term_months": d["term_months"], "old": prev[rid], "new": d["apy"]}
        for rid, d in current.items()
        if rid in prev and abs(prev[rid] - d["apy"]) >= 0.005
    ]
    await db.rate_snapshots.replace_one(
        {"_id": "latest"},
        {"_id": "latest", "apys": {rid: d["apy"] for rid, d in current.items()},
         "at": datetime.now(timezone.utc)},
        upsert=True,
    )
    instant_sent = weekly_sent = 0
    if changes:
        changes.sort(key=lambda c: c["new"] - c["old"], reverse=True)
        subs = await _active_subscribers("instant")
        if subs:
            n_up = sum(1 for c in changes if c["new"] > c["old"])
            n_down = len(changes) - n_up
            parts = ([f"{n_up} CD rate{'s' if n_up != 1 else ''} up"] if n_up else []) + \
                    ([f"{n_down} down"] if n_down else [])
            subject = f"Rate alert: {' and '.join(parts)}"
            instant_sent = await _send_to_subscribers(
                subs, subject, lambda em: rate_change_alert_html(changes, SITE_URL, _unsub_url(em))
            )
        logger.info("rate alerts: %d changes, %d instant emails sent", len(changes), instant_sent)
    today = datetime.now(timezone.utc).date()
    if today.weekday() == 0:  # Monday digest
        meta = await db.meta.find_one({"_id": "weekly_digest"}) or {}
        if meta.get("last_sent") != today.isoformat():
            top = sorted(standard, key=lambda d: -d["apy"])[:10]
            subs = await _active_subscribers("weekly")
            if subs and top:
                weekly_sent = await _send_to_subscribers(
                    subs, "This week's top 10 CD rates",
                    lambda em: weekly_top10_html(top, SITE_URL, _unsub_url(em)),
                )
            await db.meta.replace_one(
                {"_id": "weekly_digest"},
                {"_id": "weekly_digest", "last_sent": today.isoformat(), "sent_count": weekly_sent},
                upsert=True,
            )
            logger.info("weekly digest: %d emails sent", weekly_sent)
    return {"changes": len(changes), "instant_sent": instant_sent, "weekly_sent": weekly_sent}

@api_router.post("/admin/alerts/run")
async def admin_alerts_run(_: bool = Depends(require_admin)):
    """Manually trigger change detection + alert emails (also used for testing)."""
    return await process_rate_alerts()

# ---------------------------- rate history / trends ----------------------------

TREND_TERMS = (3, 6, 12, 18, 24, 36, 60)

async def record_rate_history() -> dict:
    """Store one per-day summary of best/avg APY per term (idempotent per UTC date)."""
    today = datetime.now(timezone.utc).date().isoformat()
    docs = await db.bank_rates.find({"rate_type": "standard"}, {"_id": 0}).to_list(500)
    terms = {}
    for t in TREND_TERMS:
        rows = [d for d in docs if d["term_months"] == t]
        if not rows:
            continue
        best = max(rows, key=lambda d: d["apy"])
        terms[str(t)] = {
            "best": round(best["apy"], 2),
            "best_bank": best["bank"],
            "avg": round(sum(d["apy"] for d in rows) / len(rows), 2),
            "count": len(rows),
        }
    fdic_12 = None
    try:
        nat = await get_cached_national_rates()
        for r in nat.get("rates", []):
            if r.get("term_months") == 12 and r.get("national_rate") is not None:
                fdic_12 = r["national_rate"]
    except Exception:
        pass
    doc = {"date": today, "terms": terms, "fdic_12mo": fdic_12,
           "recorded_at": datetime.now(timezone.utc)}
    await db.rate_history.replace_one({"date": today}, doc, upsert=True)
    return doc

@api_router.get("/rate-trends")
async def rate_trends():
    await ensure_seeded()
    today = datetime.now(timezone.utc).date().isoformat()
    if not await db.rate_history.find_one({"date": today}):
        await record_rate_history()
    history = await db.rate_history.find({}, {"_id": 0, "recorded_at": 0}).sort("date", 1).to_list(365)
    return {"history": history, "tracking_since": history[0]["date"] if history else today}

@api_router.post("/admin/alerts/preview")
async def admin_alerts_preview(request: Request, _: bool = Depends(require_admin)):
    """Send sample alert + digest emails to a given address for review."""
    body = await request.json()
    to = body.get("email") or OWNER_EMAIL
    if not to:
        raise HTTPException(status_code=400, detail="No email provided")
    docs = await db.bank_rates.find({"rate_type": "standard"}, {"_id": 0}).to_list(500)
    top = sorted(docs, key=lambda d: -d["apy"])[:10]
    sample = [
        {"bank": top[0]["bank"], "term_months": top[0]["term_months"], "old": top[0]["apy"] - 0.15, "new": top[0]["apy"]},
        {"bank": top[1]["bank"], "term_months": top[1]["term_months"], "old": top[1]["apy"] + 0.10, "new": top[1]["apy"]},
    ]
    await send_email(to=to, subject="[Sample] Rate alert: 1 CD rate up and 1 down",
                     html=rate_change_alert_html(sample, SITE_URL, _unsub_url(to)))
    await send_email(to=to, subject="[Sample] This week's top 10 CD rates",
                     html=weekly_top10_html(top, SITE_URL, _unsub_url(to)))
    return {"status": "sent", "to": to}

@api_router.get("/admin/leads")
async def admin_leads(_: bool = Depends(require_admin)):
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"leads": leads, "total": len(leads)}

@api_router.patch("/admin/leads/{lead_id}/status")
async def update_lead_status(lead_id: str, payload: LeadStatusUpdate, _: bool = Depends(require_admin)):
    if payload.status not in LEAD_STATUSES:
        raise HTTPException(status_code=400, detail=f"status must be one of: {', '.join(LEAD_STATUSES)}")
    result = await db.leads.update_one({"id": lead_id}, {"$set": {"status": payload.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"id": lead_id, "status": payload.status}

# ---------------------------- AI chat assistant ----------------------------

class ChatRequest(BaseModel):
    session_id: str = Field(min_length=8, max_length=64)
    message: str = Field(min_length=1, max_length=2000)

_chat_ctx_cache = {"text": "", "at": None}

async def chat_rates_context() -> str:
    """Compact, cached (10 min) summary of live rate data for grounding the assistant."""
    now = datetime.now(timezone.utc)
    if _chat_ctx_cache["text"] and _chat_ctx_cache["at"] and (now - _chat_ctx_cache["at"]) < timedelta(minutes=10):
        return _chat_ctx_cache["text"]
    await ensure_seeded()
    rates = await db.bank_rates.find({}, {"_id": 0}).sort("apy", -1).to_list(200)
    by_term = {}
    for r in rates:
        if r.get("rate_type") == "standard":
            by_term.setdefault(r["term_months"], []).append(r)
    lines = []
    for term in sorted(by_term):
        entries = "; ".join(
            f"{r['bank']} {r['apy']:.2f}% APY (min ${r['min_deposit']:,}, penalty: {r['penalty'] or 'see bank'})"
            for r in by_term[term][:3]
        )
        lines.append(f"- {term}-month CDs: {entries}")
    for label, rt in (("Jumbo", "jumbo"), ("No-penalty", "no_penalty")):
        special = [r for r in rates if r.get("rate_type") == rt][:3]
        if special:
            entries = "; ".join(
                f"{r['bank']} {r['apy']:.2f}% APY ({r['term_months']}-mo, min ${r['min_deposit']:,})" for r in special
            )
            lines.append(f"- {label} CDs: {entries}")
    try:
        doc = await get_cached_national_rates()
        nat = "; ".join(
            f"{x['term_months']}-mo {x['national_rate']:.2f}%"
            for x in doc["rates"]
            if x.get("term_months") and x.get("national_rate") is not None
        )
        if nat:
            lines.append(f"- FDIC national average CD rates: {nat}")
    except Exception as exc:
        logger.warning("National rates unavailable for chat context: %s", exc)
    text = "\n".join(lines)
    _chat_ctx_cache["text"] = text
    _chat_ctx_cache["at"] = now
    return text

CHAT_SYSTEM_TEMPLATE = """You are Cavi, the friendly AI assistant on Cavicord (cavicord.tech), an independent certificate of deposit (CD) rate comparison site.

TODAY'S DATE: {date}

CURRENT RATE DATA — the ONLY rates you may ever quote:
{rates}

STRICT RULES:
1. Only quote APYs, minimum deposits, and penalties that appear in the rate data above. NEVER invent, estimate, or recall rates from memory. If a bank or term isn't listed, say you don't have that rate and suggest comparing on the site.
2. Educational information only — never personalized financial, tax, or legal advice, and never guarantees of returns. Rates can change at any time; the user must verify directly with the bank before opening an account.
3. You may do interest math using rates from the data. Formula: ending value = deposit x (1 + APY/100)^years. Show the math briefly, round to the nearest dollar, and label the result an estimate.
4. Keep answers short and clear: 2-5 sentences or a few dash bullets. Plain text only — no markdown headers or tables. **Bold** sparingly for key numbers.
5. Mention FDIC insurance ($250,000 per depositor, per bank) when relevant.
6. After you've genuinely helped (not in your first sentence, and not every single message), offer once: "Would you like to see personalized CD options? Tap the button below this chat and we'll match you with current rates." The site displays that button — never ask for the user's name, email, or phone inside the chat. Our personalized matching is designed for savers with $50,000 or more to deposit; when a user mentions an amount of $50,000+, highlight jumbo CDs and FDIC strategies for larger balances (e.g., spreading funds across banks to stay under the $250,000 insurance cap) and make the personalized-rates offer promptly.
7. If asked about anything unrelated to CDs, savings, or personal banking, politely steer back to CD topics."""

@api_router.post("/chat")
async def chat(payload: ChatRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=503, detail="Chat is not configured")
    history = await db.chat_messages.find(
        {"session_id": payload.session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(40)
    contents = [{"role": m["role"], "parts": [{"text": m["content"]}]} for m in history[-20:]]
    contents.append({"role": "user", "parts": [{"text": payload.message}]})
    system = CHAT_SYSTEM_TEMPLATE.format(
        date=datetime.now(timezone.utc).strftime("%B %d, %Y"),
        rates=await chat_rates_context(),
    )
    body = {
        "system_instruction": {"parts": [{"text": system}]},
        "contents": contents,
        "generationConfig": {"temperature": 0.3, "maxOutputTokens": 2048},
    }
    try:
        async with httpx.AsyncClient(timeout=30) as c:
            r = await c.post(
                f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent",
                headers={"x-goog-api-key": GEMINI_API_KEY, "Content-Type": "application/json"},
                json=body,
            )
        if r.status_code != 200:
            logger.error("Gemini error %s: %s", r.status_code, r.text[:300])
            raise HTTPException(status_code=503, detail="The assistant is temporarily unavailable. Please try again in a moment.")
        data = r.json()
        parts = data["candidates"][0]["content"]["parts"]
        reply = "".join(p.get("text", "") for p in parts).strip()
        if not reply:
            raise ValueError("empty reply")
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Chat request failed: %s", exc)
        raise HTTPException(status_code=503, detail="The assistant is temporarily unavailable. Please try again in a moment.")
    now = datetime.now(timezone.utc)
    await db.chat_messages.insert_many([
        {"session_id": payload.session_id, "role": "user", "content": payload.message, "created_at": now},
        {"session_id": payload.session_id, "role": "model", "content": reply, "created_at": now + timedelta(milliseconds=1)},
    ])
    return {"reply": reply, "session_id": payload.session_id}

@api_router.get("/admin/subscribers")
async def admin_subscribers(_: bool = Depends(require_admin)):
    subs = await db.subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"subscribers": subs, "total": len(subs)}

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
