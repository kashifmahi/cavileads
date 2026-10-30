# Cavicord — PRD & Status

## Original problem statement
Clone of cdvanta.com rebranded as **Cavicord** (domain: cavicord.tech). CD-rate comparison site: sortable rate tables, term SEO pages, calculator, ladder builder, lead capture, email notifications, admin dashboard + CSV export, SEO/AIO content & schema, mobile responsive. User self-deploys to own Ubuntu VPS (/opt/app, Nginx + systemd cavicord-api + MongoDB).

## Stack
- Frontend: React 19 + Vite 8 (`vite.config.mjs`), Tailwind, shadcn, react-helmet-async v3, lazy routes. Build output: `frontend/build/` (Nginx root).
- Backend: FastAPI on 8001 (`/api` prefix), MongoDB. Seeded 43 rates + FDIC national averages, leads, subscribers, admin-key-gated endpoints.
- Email: `backend/email_service.py` calls Emergent managed email proxy via plain httpx (NO internal package needed — VPS-compatible). 2026-06 hardening: EMERGENT_EMAIL_KEY/EMAIL_FROM_NAME now optional (fail-soft skip + warning log, no crash). litellm internal-wheel line removed from requirements.txt — installs cleanly from public PyPI.

## Implemented (chronological highlights)
- Full UI: hero, rate tables, term filters, calculator, ladder builder, FAQ, cookie banner, footer; mobile fixes verified.
- Lead form (PersonalizedModal) + shared RatesModalContext, 5 CTA placements; /admin dashboard w/ CSV exports.
- **2026-06: Lead IP capture + timeframe options** — backend `/api/leads` stores `ip_address` (X-Forwarded-For aware); IP shown as badge in admin lead cards and included as "IP Address" column in lead CSV export. Timeframe dropdown changed to: Immediately / Within 1 week / Within 1 month. Verified via curl (real IP stored) + UI screenshot.
- **2026-06: Lead geo lookup + status tracking** — server-side IP geolocation at lead creation (ipwho.is primary, ip-api.com fallback; fail-soft) stores `city`/`country`, shown as MapPin badge + CSV columns. Lead `status` (new/contacted/in_progress/closed) via PATCH `/api/admin/leads/{id}/status`; color-coded Select per admin lead card. Verified via curl + live UI. NOTE: ipapi.co is Cloudflare-blocked — do not retry it.
- **2026-06: Intent landing pages + conversion attribution** — 8 ad-ready landing pages (`src/data/landings.js` + `src/pages/LandingPage.jsx`): /best-cd-rates, /cd-rates, /12-month-cd, /6-month-cd, /high-yield-cd, /jumbo-cd, /cd-calculator (embeds Calculator), /cd-for-retirement (extra content sections). Each: intent H1/meta (<60/<155), benefits row, live RateTable filtered by term/rate_type, FAQ + FAQPage/Breadcrumb schema, 2 lead CTAs. Added to sitemap (33 URLs). Attribution: first-touch capture in `src/lib/attribution.js` (source_page + utm_source/medium/campaign/term + gclid in sessionStorage, captured in App useEffect); PersonalizedModal sends these with leads; backend Lead/LeadCreate extended; admin shows "From:" + campaign badges; CSV has Source Page/UTM/GCLID columns; fires `gtag('event','generate_lead')` if a Google tag is installed (none yet — user to add Ads tag later). Verified e2e: UI lead from /6-month-cd?utm_campaign=6mo-test showed correct badges in admin; all 8 LPs render.
- **2026-06: Open Account → lead form** — RateTable "Open Account" buttons (desktop + mobile) AND the hero top-rates card "Open" buttons now open the PersonalizedModal with the rate's term preselected (openRatesModal({term}); PersonalizedModal defaultTerm prop) instead of linking to external bank URLs. No external rate.url links remain anywhere. Verified via UI screenshots. Bing msvalidate.01 meta tag added to index.html.
- **2026-06 (Oct 27): Prerender fail-safe + new logo** — (1) BUG: live VPS served bare SPA shell (daily cron's yarn build wiped prerendered files, then prerender failed). FIX: prerender.mjs honors PRERENDER_DIR env + waits for [data-testid^='open-account-'] on rate routes (fails route instead of baking skeletons); daily-refresh.sh builds to build-staging, greps APY sanity, atomic swap to build/ (build.bak kept). Testing agent iteration_3: 100%/100%, 38/38 staging prerender verified. Second zip (cavileads-main (1).zip) checked — it was BEHIND workspace, nothing synced. (2) New logo: user's "CAVICORD Neon Chrome Emblem" recomposed via PIL into horizontal lockup (mark+wordmark, transparent, 922x160, 55KB) at public/logo-cavicord.png; Header (h-10) + Footer (h-14) use it; verified desktop nav fits one line + mobile. NOTE: 33/34 rates stale at Sep 30 (bank pages block verify-run; ~1 confirms daily); visible 'Rates verified' date = max updated_at so it bumps daily. User must pull + run deploy/daily-refresh.sh on VPS to restore prerendered pages.
- **2026-06 (Oct 25): Repo sync from user zip (cavileads-main) + polish** — workspace synced to user's updated repo. New in that version: admin rate management (GET/PATCH /api/admin/rates, verify-all, verify-run which checks each bank page for the listed APY; AdminRates.jsx editor with CD Rates tab in /admin); author E-E-A-T (src/data/author.js "Kashif Mahi", AuthorByline on articles/guides, Person schema); redirects REVERSED per Search Console preference — landing pages now live at long slugs (/best-1-year-cd-rates, /best-6-month-cd-rates, /high-yield-cd-rates, /jumbo-cd-rates) and short slugs 301 to them (redirects.js + nginx); /api/rates returns oldest_updated_at; deploy/daily-refresh.sh (cron 6:15: verify-run → FDIC refresh → rebuild+prerender → nginx reload); public/sitemap.xml deleted (prerender-generated only). Kept workspace package.json (emergentbase deps for preview tooling).
  - Testing agent iteration_2.json: 12/12 backend, all frontend flows pass. Fixed its action items: admin rates table overflow (AdminPage max-w-6xl→7xl, verified fits at 1920px), verifyAll catch + save() empty-payload guard + surfaced backend error detail, data-testids added (AdminRates inputs/saves/buttons/message, PersonalizedModal fields/submit/success), landing CTA now preselects page term (verified "12 months" on /best-1-year-cd-rates).
  - Live check: cavicord.tech already runs this version (correct 301 direction). Re-added gzip+security headers to deploy/nginx-cavicord.conf (user's zip had dropped them; still missing live — USER MUST RE-APPLY nginx conf). /app/memory/test_credentials.md populated.
- **2026-06 (Oct): Static prerendering (SSG) + 404 + URL merges + sitemap lastmod**
  - `frontend/prerender.mjs` (puppeteer@24 devDep, Node 20-compatible): after `vite build`, serves build/ locally (pristine shell fallback), crawls all 38 routes headless, writes static HTML per route (rates baked in from live API), dedupes shell <title>, writes build/404.html (from NotFoundPage) and build/sitemap.xml with lastmod (articles use dateModified, rest build date). Scripts: `yarn prerender`, `yarn build:ssg`. Daily cron on VPS rebuilds so rates stay fresh.
  - Canonicals/schemas now use fixed SITE_URL (`src/config.js` = https://cavicord.tech) instead of window.location.origin (was baking localhost during prerender). SEO.jsx supports `noindex` (used by /admin + /404).
  - Hydration dedupe: `main.jsx` strips baked head tags (title/desc/canonical/og/twitter/ld+json) + clears #root before createRoot render when prerendered. Verified post-JS: exactly 1 title/desc/canonical per page.
  - Real 404: NotFoundPage at `*` route; nginx `try_files $uri $uri/index.html =404` + `error_page 404 /404.html` (see `/app/deploy/nginx-cavicord.conf` — full server block incl. X-Forwarded-For proxy headers, asset caching, daily cron line).
  - Merged duplicates (301 in nginx conf + client Navigate via `src/data/redirects.js`): /best-1-year-cd-rates→/12-month-cd, /best-6-month-cd-rates→/6-month-cd, /high-yield-cd-rates→/high-yield-cd, /jumbo-cd-rates→/jumbo-cd. Removed from terms.js/public sitemap; Header/Footer nav now use `rateNavLinks` from terms.js.
  - Verified: 38/38 prerendered, raw HTML has unique title/meta/canonical/OG + baked rates, 404.html correct, client redirects work, hydration clean via vite preview test. Real 404 HTTP status requires the nginx config (user-side).
- **2026-06: AI chatbot (Cavi)** — floating chat widget on all pages (`src/components/ChatWidget.jsx`, mounted in App.jsx). Backend `POST /api/chat` (server.py) calls Google Gemini (`gemini-3.5-flash`) via public REST API with user's own free Google AI Studio key (`GEMINI_API_KEY` in backend/.env — VPS-deployable, no Emergent-internal deps, httpx only). Grounding: system prompt injected with live rate data from MongoDB + FDIC national averages (10-min cache via `chat_rates_context()`); strict rules — never invent rates, educational only, FDIC mentions, offers lead capture after helping. Multi-turn history in `db.chat_messages` per session_id (sessionStorage UUID, last 20 msgs). Lead capture: "See personalized CD options" button in chat opens existing PersonalizedModal (full lead pipeline w/ IP/geo/status/email). Self-tested: grounded math answer ($50k/12mo → $2,375 @ real 4.75% Marcus rate), multi-turn memory, unlisted-bank refusal, off-topic steering, UI e2e incl. lead modal handoff. VPS NOTE: user must add GEMINI_API_KEY to VPS backend/.env.
- 10 term SEO pages (`src/data/terms.js`), 7 guides (`src/data/guides.js`), About page.
- SEO: per-route Helmet metadata, canonical, JSON-LD (Organization, WebSite, FAQPage, Article, BreadcrumbList, ItemList, HowTo), robots.txt, sitemap.xml, llms.txt (all pointing to https://cavicord.tech).
- Vite migration complete (no CRACO).
- **2026-06 (this session): Articles content system**
  - `src/data/articles.js`: 11 answer-first articles (Strategy/Basics/Taxes/CD Types/Rates categories), each with metaTitle <60 chars, metaDescription ~155 chars, quick-answer paragraph, H2 sections w/ bullets, 3-4 FAQs.
  - `src/pages/ArticlesIndex.jsx` (/articles, CollectionPage schema) + `src/pages/ArticlePage.jsx` (/articles/:slug, Article + FAQPage + BreadcrumbList schema, quick-answer box, FAQ section, CTA, related links).
  - Header ("Articles" desktop + mobile nav) & Footer ("All Articles") links; sitemap.xml (12 new URLs, 25 total) and llms.txt updated.
  - **Bug fixed**: duplicate meta description/og/twitter tags — React 19 + helmet v3 uses native head hoisting and cannot dedupe static index.html tags; removed Helmet-owned tags (description, keywords, og:title/description/image, twitter:title/description/image) from index.html. Verified: exactly 1 per-route tag on /, guides, articles.
  - Testing: agent iteration_1.json — 10/11 pass, the 1 issue (duplicate meta) fixed and self-verified. Production build passes.

## Hosting (CHANGED Oct 27): Emergent hosting, not VPS
- User now hosts cavicord.tech on EMERGENT (deployed via platform; VPS retired). VPS-only artifacts (deploy/nginx-cavicord.conf, deploy/daily-refresh.sh, prerender pipeline) are not used on Emergent — the SPA serves live API data so rates/date are always current without rebuilds.
- Daily verification on Emergent: `.emergent/crons.yml` → daily-rate-verify (06:15 UTC) → POST /api/cron/verify-rates (Bearer WEBHOOK_CRON_SECRET in backend/.env, constant-time check, run_id dedupe in db.cron_runs, verify_bank_rates() in background task). Verified in preview: 401s, accepted/duplicate dedupe, job ran (2 confirmed/24 unconfirmed/17 errored — banks block scraping as known).
- NOTE: crons.yml + cron endpoint were added AFTER the user's deploy was initiated — a REDEPLOY is required to get them live. nginx-level real 404/301s don't apply on Emergent (client-side redirects + NotFoundPage render with 200).

## Known caveats / risks
- **2026-06 PRODUCTION CONFIRMED by user**: cavicord.tech live — rates table populates, HTTPS valid, chatbot works (GEMINI_API_KEY set on VPS), test lead w/ IP/geo/source shown in /admin, email notification received, sitemap submitted to Google Search Console + Bing (msvalidate.01 Bing meta tag added to index.html). All previous VPS blockers resolved.
- Exposed admin key + email key in earlier chat — user advised to rotate ADMIN_KEY on VPS.
- Rates are seeded/curated + FDIC national data; NOT live per-bank scraping (providers block bots).
- SPA client rendering: no SSR/prerender; JSON-LD + meta injected via JS (Google OK, weak for non-JS crawlers).

## Backlog
- P0: Verify VPS backend (/api/rates) + HTTPS; make email VPS-deployable or fail-soft.
- P1: Submit sitemap to Google Search Console + Bing (user-side); metadata audit of remaining pages; expand guides w/ query fan-out Q&As (user skipped this round).
- P2: SSR/prerender for static HTML per route; more articles (publish cadence); real CWV measurement (LCP <2.5s, INP <200ms, CLS <0.1).

## 2026-10-27: SEO hardening (post Emergent-hosting)
- Found production /sitemap.xml serving SPA HTML: sitemap file was lost from public/ during code sync.
- Added frontend/generate-sitemap.mjs (36 URLs, lastmod); wired into `yarn build` so every deploy ships fresh sitemap.
- Added default meta description, canonical, og:title/description/url/image, twitter tags to index.html (marked data-default).
- SEO.jsx removes data-default tags on mount -> no duplicates; verified 1 of each tag at runtime.
- NEEDS REDEPLOY for sitemap + default tags to reach production.

## 2026-10-28: Performance fixes (PageSpeed reports)
- Google Fonts now async (preload + media=print swap) — removes 200ms render block.
- Logo: 120KB PNG in public/ -> 23KB webp imported via src/assets (hashed under /assets/ => 1yr immutable cache on Emergent edge). width/height attrs added (no CLS).
- Header scroll listener: passive + rAF-throttled, setState only on change (forced reflow mitigation).
- Note: Emergent edge serves /assets/* (hashed) with 1yr immutable cache automatically; other static files fixed at 5min TTL (platform-side, not configurable).

## 2026-10-28 (cont): Full PageSpeed optimization pass
- Fonts fully SELF-HOSTED: 7 latin woff2 (Inter 400-700, Playfair 600-800) in src/fonts via src/fonts.css; Google Fonts links removed from index.html. Kills fonts.googleapis->gstatic critical chain.
- Logo: public/assets/logo-cavicord-v2.webp (stable URL under /assets/ => 1yr edge cache) + <link rel=preload fetchpriority=high> in index.html + fetchpriority=high on header img. Fixes LCP discovery delay (was 1590ms).
- ChatWidget + CookieBanner lazy-loaded (out of main bundle).
- A11y: Slider thumbs get aria-label passthrough; Calculator="Deposit amount", LadderBuilder="Total investment amount".
- All verified in preview. NOTE: every PageSpeed report user pasted was measured against the OLD deploy; needs one redeploy.

## 2026-10-28 (cont): WCAG contrast fixes
- All green CTA buttons: bg-emerald-600 -> bg-emerald-700 (white text now 5.5:1) across 14 files.
- Hero card + RateTable + Calculator/Ladder/Modal/Admin: text-slate-400 -> text-slate-500 on white backgrounds; APY values text-emerald-600 -> 700.
- Kept slate-400 on dark backgrounds (footer, hero dark side, page breadcrumb heroes) where contrast is fine.
- Follow-up contrast pass: LadderBuilder APY -> emerald-700, RateAlerts active toggle -> emerald-700, RateAlerts footnote + Footer disclaimer/copyright slate-500 -> slate-400 (dark bg). Verified 0 slate-400 left in white sections; footer grey now rgb(148,163,184).
- Agent discoverability: added public/ai-catalog.json + public/.well-known/ai-catalog.json (AI-Catalog spec 1.0; entries: rates API, national-rates API, site). Verified valid JSON served in preview.

## 2026-10-28 (cont): Critical chain + image delivery
- Entry CSS now INLINED into index.html post-build (inline-css.mjs in build script) -> zero render-blocking requests.
- API warm-up: inline script in index.html starts fetch of /api/rates + /api/national-rates at HTML parse (window.__pre); App.jsx + RatesSection consume primed promise, axios fallback. Verified exactly 1 request per endpoint, cuts ~1.4s off data display.
- Logo recompressed q75: 23KB -> 17KB.
- Source maps enabled (vite build.sourcemap: true).
- Cache TTL 5m on /assets/ confirmed PLATFORM BUG (docs say 1yr immutable for hashed assets): user should email support@emergent.sh with job ID.

## 2026-10-28: Rate Change Alerts (subscriber emails)
- process_rate_alerts(): compares APYs vs db.rate_snapshots {_id:latest}; emails "instant" subscribers on any change (rise/fall arrows, old->new); Monday top-10 digest to "weekly" subscribers (deduped via db.meta weekly_digest).
- Triggers: daily cron (after verify_bank_rates) + instantly after admin PATCH that changes an APY.
- Unsubscribe: HMAC-signed GET /api/unsubscribe?email&token (secret: WEBHOOK_CRON_SECRET), sets active:false; re-subscribing reactivates.
- Templates in email_service.py: rate_change_alert_html, weekly_top10_html (pass safety gate; absolute https links + unsubscribe footer).
- Admin: POST /api/admin/alerts/run (manual trigger), POST /api/admin/alerts/preview {email} (sends both sample emails).
- TESTED in preview: change detection, alert dispatch, 401 bad token, unsubscribe deactivation, APY restored, test subscribers cleaned. Prod builds its first snapshot on next 6:15 UTC cron; alerts flow from the following run.
- PageSpeed after deploy: Perf 89 / A11y 100 / BP 100 / SEO 100 / Agentic 4/4 (mobile). Final tweaks: fadeUp animation starts at opacity .6 + 0.45s (hero text LCP no longer delayed by fade), preconnects for t0-t3.gstatic.com (bank favicons, ~300ms LCP). Remaining non-code items: 5-min asset cache (platform bug, email support), CSP/HSTS headers (platform edge, cannot set via app).

## 2026-10-28: Rate Trends page (/cd-rate-trends)
- Backend: db.rate_history (one doc/UTC date: best+avg+bank per term 3/6/12/18/24/36/60 + fdic_12mo). record_rate_history() runs in daily cron and lazily on GET /api/rate-trends if today missing. No fabricated backfill (YMUL honesty) — history grows daily from 2026-10-28.
- Frontend: pages/TrendsPage.jsx — stat cards (best/avg/spread vs FDIC), recharts line chart with 6mo/12mo/2yr/5yr toggle, 30-day table, Dataset JSON-LD, cite-with-link note, lead CTA. Footer link, sitemap (37 URLs), llms.txt entry.
- Tested: API returns history, term switching works, chart renders, SEO title correct.

## 2026-10-28: Inner-page audit fixes (landing/articles/guides)
- Footer headings h4 -> h2 (heading-order violation on every page).
- Contrast: ArticlesIndex meta row slate-400->500 + emerald-600->700 links; GuidesIndex read-guide links ->700; LandingPage disclaimer slate-400->500.
- fetchpriority -> fetchPriority (React console warning).
- FAVICONS RESTORED: favicon.ico/png + apple-touch-icon.png were missing from public/ (lost in code sync) -> regenerated from logo icon. Was causing 404 console error + no favicon in Google results.
- Verified via axe-core: /best-cd-rates, /articles, /guides, /cd-rate-trends all clean; favicon 200.

## 2026-10-28: Full-site audit sweep (all 37 routes)
- TermPage disclaimer slate-400 -> 500 (contrast on all 13 term pages).
- Bank favicon 404 (gstatic for savings.breadfinancial.com): logoDomain now strips to registrable domain -> console errors gone.
- CookieBanner used fadeUp (starts opacity .6) -> scanners flagged its contents mid-animation. New transform-only animate-slide-up class for the banner.
- Verified clean via axe-core (contrast, heading-order, link-name, image-alt, button-name) on: home, all term/landing types, articles (index+2), guides (index+2), trends, about, calculator. Zero console errors.

## 2026-10-29: Code audit (code_review_agent) + fixes
- Audit verdict issues addressed:
  1. verify patterns: removed bare-number match (false "confirmed") -> now requires %/APY adjacency. Tested.
  2. Alert dedupe: _alerts_safe now debounces 10s + asyncio.Lock serializes process_rate_alerts (cron path too). Tested: 3 rapid admin edits -> 1 alert run.
  3. CORS: allow_credentials=False (invalid combo with origins=*).
- FALSE POSITIVE in audit: "gemini-3.5-flash invalid model" — model is valid (reviewer knowledge cutoff); chat tested working live same day.
- Known accepted: unsubscribe returns success for unknown email (no enumeration), admin verify button 180s timeout, snapshot keyed by UUID id (reseed only fires on empty collection).

## 2026-10-29: GitHub repo sync (kashifmahi/cavileads, merge PR #6)
- Backend identical; synced frontend: index.html (responsive logo preload w/ imagesrcset, dns-prefetch instead of 4 gstatic preconnects, removed default canonical/og:url — SPA duplicate-signal fix), Header/Footer (srcSet logos 230w/460w/645w), prerender.mjs (gfonts unblock + css inline for SSG builds), new public/assets/logo-cavicord-v2-{230,460}.webp.
- KEPT our package.json (repo was missing @emergentbase overlay/visual-edits platform deps).
- Verified: build clean, header serves 230w variant, footer 460w, rates render, canonical set per-route by Helmet.

## 2026-10-29: GitHub sync round 2 (PR #7 seo/onpage-keywords)
- Synced: src/data/{articles,guides,landings}.js, NEW ratesLinks.js (topic-matched internal links article/guide -> rates page for keyword consolidation), ArticlePage.jsx + GuidePage.jsx (render article-rates-link-top + article-compare-cta / guide-rates-link-top). Kept our package.json.
- testing_agent iteration_4: 100% frontend pass — all 18 ratesLinks keys valid, navigation works, 14 routes unique SEO tags, 0 console errors. Two cosmetic notes only (generic bottom-CTA heading, 12-Month vs 1-Year keyword variance — intentional).

## 2026-10-29: GitHub sync round 3 (PR #8 seo/penalty-calculator)
- Synced: NEW components/PenaltyCalculator.jsx, landings.js (+ /cd-early-withdrawal-penalty-calculator landing with showPenaltyCalculator flag), ratesLinks.js, LandingPage.jsx. Kept our package.json.
- Sitemap now 38 URLs; llms.txt entry added. Screenshot-verified: page renders with live penalty math (payout, net gain/loss, break-even warning).

## 2026-10-29: GitHub sync round 4 (PR #9 seo/hard-js-redirects)
- Synced index.html (pre-app location.replace script for legacy slugs + www->non-www, map injected at build) + vite.config.mjs (legacyRedirects plugin reading src/data/redirects.js). Kept our llms.txt (repo missing penalty-calc line), package.json.
- Verified: /jumbo-cd -> /jumbo-cd-rates via location.replace in preview.
- Support confirmed: Emergent supports www<->root redirect (Domain tab) but NO custom path-based server-side 301s; backend only gets /api paths. User advised to email support.

## 2026-10-30: Hotfix sync (PR #10 369a23f — www/apex redirect loop)
- index.html inline script no longer does www->apex in JS (host-level redirect lives ONLY in Domain tab, cavicord.tech = Primary). Slug redirects unchanged.
- testing_agent iteration_5: 100% pass — zero www references in served+built HTML, 4 legacy slugs redirect one-hop w/ query+hash preserved, canonicals + homepage load with no loop, 0 console errors.
- Note: SITE_URL=apex matches Domain-tab primary=apex. If primary ever flips to www, SITE_URL/canonicals must flip too.

## 2026-10-30: Critical sync (PR #11 b22a969 — same-origin API)
- App.jsx: on any *.cavicord.tech host, BACKEND_URL = "" (relative /api, same origin) instead of baked REACT_APP_BACKEND_URL (was https://www.cavicord.tech -> CORS-blocked all API calls from apex). Preview/dev keep env URL.
- prerender.mjs: rewrites http://127.0.0.1:5050/ modulepreload links to root-relative in saved SSG HTML.
- Both files byte-identical to main; build clean; preview smoke-tested (rates render, API same-origin).
