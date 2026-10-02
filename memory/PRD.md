# Cavicord — PRD & Status

## Original problem statement
Clone of cdvanta.com rebranded as **Cavicord** (domain: cavicord.tech). CD-rate comparison site: sortable rate tables, term SEO pages, calculator, ladder builder, lead capture, email notifications, admin dashboard + CSV export, SEO/AIO content & schema, mobile responsive. User self-deploys to own Ubuntu VPS (/opt/app, Nginx + systemd cavicord-api + MongoDB).

## Stack
- Frontend: React 19 + Vite 8 (`vite.config.mjs`), Tailwind, shadcn, react-helmet-async v3, lazy routes. Build output: `frontend/build/` (Nginx root).
- Backend: FastAPI on 8001 (`/api` prefix), MongoDB. Seeded 43 rates + FDIC national averages, leads, subscribers, admin-key-gated endpoints.
- Email: `backend/email_service.py` uses Emergent-managed integration — NOT installable on public VPS (emergentintegrations removed from requirements.txt). Email on VPS unverified/likely broken; needs public provider (e.g. Resend w/ user key) if wanted.

## Implemented (chronological highlights)
- Full UI: hero, rate tables, term filters, calculator, ladder builder, FAQ, cookie banner, footer; mobile fixes verified.
- Lead form (PersonalizedModal) + shared RatesModalContext, 5 CTA placements; /admin dashboard w/ CSV exports.
- **2026-06: Lead IP capture + timeframe options** — backend `/api/leads` stores `ip_address` (X-Forwarded-For aware); IP shown as badge in admin lead cards and included as "IP Address" column in lead CSV export. Timeframe dropdown changed to: Immediately / Within 1 week / Within 1 month. Verified via curl (real IP stored) + UI screenshot.
- 10 term SEO pages (`src/data/terms.js`), 7 guides (`src/data/guides.js`), About page.
- SEO: per-route Helmet metadata, canonical, JSON-LD (Organization, WebSite, FAQPage, Article, BreadcrumbList, ItemList, HowTo), robots.txt, sitemap.xml, llms.txt (all pointing to https://cavicord.tech).
- Vite migration complete (no CRACO).
- **2026-06 (this session): Articles content system**
  - `src/data/articles.js`: 11 answer-first articles (Strategy/Basics/Taxes/CD Types/Rates categories), each with metaTitle <60 chars, metaDescription ~155 chars, quick-answer paragraph, H2 sections w/ bullets, 3-4 FAQs.
  - `src/pages/ArticlesIndex.jsx` (/articles, CollectionPage schema) + `src/pages/ArticlePage.jsx` (/articles/:slug, Article + FAQPage + BreadcrumbList schema, quick-answer box, FAQ section, CTA, related links).
  - Header ("Articles" desktop + mobile nav) & Footer ("All Articles") links; sitemap.xml (12 new URLs, 25 total) and llms.txt updated.
  - **Bug fixed**: duplicate meta description/og/twitter tags — React 19 + helmet v3 uses native head hoisting and cannot dedupe static index.html tags; removed Helmet-owned tags (description, keywords, og:title/description/image, twitter:title/description/image) from index.html. Verified: exactly 1 per-route tag on /, guides, articles.
  - Testing: agent iteration_1.json — 10/11 pass, the 1 issue (duplicate meta) fixed and self-verified. Production build passes.

## Known caveats / risks
- VPS API state unresolved: user never confirmed `curl -i http://127.0.0.1:8001/api/rates`; suspected stale uvicorn on 8001. HTTPS/Certbot completion unconfirmed.
- Exposed admin key + email key in earlier chat — recommend rotation.
- Rates are seeded/curated + FDIC national data; NOT live per-bank scraping (providers block bots).
- SPA client rendering: no SSR/prerender; JSON-LD + meta injected via JS (Google OK, weak for non-JS crawlers).

## Backlog
- P0: Verify VPS backend (/api/rates) + HTTPS; make email VPS-deployable or fail-soft.
- P1: Submit sitemap to Google Search Console + Bing (user-side); metadata audit of remaining pages; expand guides w/ query fan-out Q&As (user skipped this round).
- P2: SSR/prerender for static HTML per route; more articles (publish cadence); real CWV measurement (LCP <2.5s, INP <200ms, CLS <0.1).
