// Merged duplicate URLs — one topic, one URL. Mirror these as 301s in Nginx.
// Canonical slugs follow the "*-cd-rates" pattern used by every other term page
// (Search Console showed Google preferring these over the short slugs).
export const REDIRECTS = {
  "/12-month-cd": "/best-1-year-cd-rates",
  "/6-month-cd": "/best-6-month-cd-rates",
  "/high-yield-cd": "/high-yield-cd-rates",
  "/jumbo-cd": "/jumbo-cd-rates",
};
