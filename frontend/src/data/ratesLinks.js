// Which rates page each article/guide should send readers (and link equity) to.
// Search Console showed articles ranking for commercial "… rates" queries that belong
// to the rates pages (e.g. "jumbo cd rates" landing on /articles/what-is-a-jumbo-cd,
// position 12, while /jumbo-cd-rates sat at 52). A topic-matched, keyword-anchored link
// from each article tells Google which page should rank for the rates query.

const DEFAULT = { to: "/best-cd-rates", label: "Compare today's best CD rates" };

export const RATES_LINKS = {
  // articles
  "what-is-a-jumbo-cd": { to: "/jumbo-cd-rates", label: "See today's jumbo CD rates" },
  "no-penalty-cd-guide": { to: "/no-penalty-cd-rates", label: "Compare no-penalty CD rates" },
  "cd-early-withdrawal-penalty": { to: "/cd-early-withdrawal-penalty-calculator", label: "Calculate your exact penalty" },
  "what-happens-when-a-cd-matures": { to: "/best-cd-rates", label: "Renewing? Compare today's best CD rates" },
  "are-cds-worth-it": DEFAULT,
  "how-is-cd-interest-taxed": DEFAULT,
  "how-much-money-in-cds": { to: "/cd-calculator", label: "Run the numbers in the CD calculator" },
  "fed-rate-cuts-and-cd-rates": { to: "/best-5-year-cd-rates", label: "Lock a rate: best 5-year CD rates" },
  "can-you-add-money-to-a-cd": { to: "/high-yield-cd-rates", label: "Compare high-yield CD rates" },
  "cds-vs-bonds": { to: "/best-3-year-cd-rates", label: "Compare 3-year CD rates" },
  "cd-vs-annuity": { to: "/cd-for-retirement", label: "CDs for retirement savings" },
  // guides
  "cd-vs-high-yield-savings": { to: "/high-yield-cd-rates", label: "Compare high-yield CD rates" },
  "cd-vs-treasury-bills": { to: "/best-6-month-cd-rates", label: "Compare 6-month CD rates" },
  "brokered-vs-bank-cds": DEFAULT,
  "how-do-cds-work": DEFAULT,
  "cd-vs-money-market": { to: "/best-1-year-cd-rates", label: "Compare 1-year CD rates" },
  "cd-ladder-explained": { to: "/cd-rates", label: "Compare CD rates for every rung" },
  "are-cds-safe": DEFAULT,
};

export const ratesLinkFor = (slug) => RATES_LINKS[slug] || DEFAULT;
