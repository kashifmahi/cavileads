# CDSummit — API Contracts & Integration Plan

## Data sources
1. **FDIC National Rates (LIVE, official)** — scraped from https://www.fdic.gov/national-rates-and-rate-caps
   - Table format verified: rows like ['12 month CD', '1.73', '2.48', '4.16', '5.74', '5.74']
   - Cached in Mongo `national_rates`, refreshed if older than 24h (FDIC updates monthly).
2. **Bank CD rates** — stored in Mongo `bank_rates`, seeded from curated data.
   - Banks block automated scraping (Marcus 403, Ally JS-rendered, Discover redirect).
   - `/api/refresh` endpoint + daily-refresh-on-read attempts re-fetch of FDIC; bank rates keep `updated_at` timestamps.
3. **Leads** — personalized rates form submissions stored in Mongo `leads`.

## Endpoints (all prefixed /api)
- `GET /api/rates?term=all|6|12|24|36|60` → `{ rates: [BankRate], updated_at }`
  - BankRate: { id, bank, apy, min_deposit, term_months, penalty, best, color }
  - Sorted APY desc; `best=true` for highest APY per term.
- `GET /api/national-rates` → `{ rates: [{product, term_months|null, national_rate, rate_cap}], source, fetched_at }`
- `POST /api/leads` body `{ amount:number, term_months:int, email:str }` → `{ id, matches: top 3 BankRate }`
- `POST /api/refresh` → force re-fetch FDIC data.

## Mocked in mock.js → replaced by
- `cdRates` → GET /api/rates (fetched in Home, passed down to RatesSection, Calculator, PersonalizedModal)
- localStorage lead saving in PersonalizedModal → POST /api/leads
- whyCds, faqs, termTabs, BRAND stay static (content, not data).

## Frontend changes
- Home fetches /api/rates on mount (loading skeleton until ready).
- RatesSection: adds live FDIC National Average strip (from /api/national-rates) + "updated" timestamp.
- PersonalizedModal: POST /api/leads, show returned matches.
- Calculator: uses fetched rates.
