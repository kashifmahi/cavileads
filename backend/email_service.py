import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logger = logging.getLogger("cavicord.email")

# Emergent managed email proxy. This is a CONSTANT — never read it from
# os.environ, so it survives deployment.
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]  # this app's OWN brand (G1)
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")  # G2 ask-back phrasing
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    """Structural safety gate (G2 + G3). Never weaken or bypass."""
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    """Send via Emergent managed email proxy. html must come from a
    server-side template, never request input (G4)."""
    _assert_safe_email(subject, html)  # G2-G3 gate — never skip
    payload = {"to": [to], "subject": subject, "html": html,
               "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def lead_notification_html(lead: dict) -> str:
    """Server-side template for new-lead notification (all values escaped)."""
    rows = [
        ("Name", f"{lead.get('first_name', '')} {lead.get('last_name', '')}"),
        ("Email", lead.get("email", "")),
        ("Phone", lead.get("phone", "")),
        ("Investment Amount", lead.get("investment_amount", "")),
        ("Timeframe", lead.get("timeframe", "")),
        ("CD Term", f"{lead.get('term_months', '')} months"),
    ]
    tr = "".join(
        f'<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#64748b;'
        f'font-size:13px">{escape(str(k))}</td>'
        f'<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#16233d;'
        f'font-weight:bold;font-size:13px">{escape(str(v))}</td></tr>'
        for k, v in rows
    )
    return (
        '<table role="presentation" width="100%" style="max-width:520px;font-family:Arial,sans-serif">'
        '<tr><td style="padding:24px">'
        '<h2 style="color:#16233d;margin:0 0 4px">New Personalized Rates Request</h2>'
        '<p style="color:#64748b;font-size:14px;margin:0 0 16px">A visitor just submitted the '
        "Get Personalized Rates form on your site.</p>"
        f'<table role="presentation" width="100%" style="border:1px solid #e5e7eb;'
        f'border-radius:8px">{tr}</table>'
        f'<p style="font-size:12px;color:#888;margin-top:16px">Sent by {escape(EMAIL_FROM_NAME)}. '
        "This is an automated lead notification.</p>"
        "</td></tr></table>"
    )


def subscriber_notification_html(email: str, frequency: str) -> str:
    """Server-side template for new-subscriber notification (values escaped)."""
    return (
        '<table role="presentation" width="100%" style="max-width:520px;font-family:Arial,sans-serif">'
        '<tr><td style="padding:24px">'
        '<h2 style="color:#16233d;margin:0 0 4px">New Rate Alerts Subscriber</h2>'
        f'<p style="color:#334155;font-size:14px">Email: <strong>{escape(email)}</strong><br>'
        f'Preference: <strong>{escape(frequency)}</strong></p>'
        f'<p style="font-size:12px;color:#888;margin-top:16px">Sent by {escape(EMAIL_FROM_NAME)}. '
        "This is an automated notification.</p>"
        "</td></tr></table>"
    )
