// Configuration for dedicated SEO term pages

export const monthYear = () =>
  new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const termPages = [
  {
    slug: "best-3-month-cd-rates",
    term: "3",
    rateType: "standard",
    title: "Best 3-Month CD Rates",
    heading: "Best 3-Month CD Rates",
    description:
      "Three-month CDs are the shortest mainstream term — a smart parking spot for cash you'll need soon but want working in the meantime. They typically out-earn savings accounts while keeping your money accessible within a single quarter.",
  },
  {
    slug: "best-18-month-cd-rates",
    term: "18",
    rateType: "standard",
    title: "Best 18-Month CD Rates",
    heading: "Best 18-Month CD Rates",
    description:
      "Eighteen-month CDs sit in a sweet spot: meaningfully higher commitment than a 1-year CD without locking funds for two full years. They're popular with savers who expect rate cuts and want to extend today's yield a little further.",
  },
  {
    slug: "best-2-year-cd-rates",
    term: "24",
    rateType: "standard",
    title: "Best 2-Year CD Rates",
    heading: "Best 2-Year CD Rates",
    description:
      "Two-year CDs let you lock in today's rates through potential Federal Reserve cuts. If you believe rates are heading lower, extending your term protects your yield for longer \u2014 a popular middle rung in CD ladders.",
  },
  {
    slug: "best-3-year-cd-rates",
    term: "36",
    rateType: "standard",
    title: "Best 3-Year CD Rates",
    heading: "Best 3-Year CD Rates",
    description:
      "Three-year CDs balance rate security with flexibility. They're a core building block for CD ladders and suit savers with a medium-term goal \u2014 a house down payment, tuition, or a planned large purchase.",
  },
  {
    slug: "best-5-year-cd-rates",
    term: "60",
    rateType: "standard",
    title: "Best 5-Year CD Rates",
    heading: "Best 5-Year CD Rates",
    description:
      "Five-year CDs maximize rate certainty. Lock in a strong APY now and it's guaranteed for half a decade regardless of what the Fed does \u2014 the anchor rung of any long-term CD ladder strategy.",
  },
  {
    slug: "no-penalty-cd-rates",
    term: "all",
    rateType: "no_penalty",
    title: "Best No-Penalty CD Rates",
    heading: "Best No-Penalty CD Rates",
    description:
      "No-penalty CDs let you withdraw your full balance \u2014 principal and earned interest \u2014 anytime after the first week, with zero fee. You trade a slightly lower APY for full flexibility: the best of a CD and a savings account combined.",
  },
];

// Nav links for "Best Rates" menus — mixes term pages and canonical landing pages
export const rateNavLinks = [
  { slug: "best-3-month-cd-rates", title: "Best 3-Month CD Rates" },
  { slug: "6-month-cd", title: "Best 6-Month CD Rates" },
  { slug: "12-month-cd", title: "Best 1-Year CD Rates" },
  { slug: "best-18-month-cd-rates", title: "Best 18-Month CD Rates" },
  { slug: "best-2-year-cd-rates", title: "Best 2-Year CD Rates" },
  { slug: "best-3-year-cd-rates", title: "Best 3-Year CD Rates" },
  { slug: "best-5-year-cd-rates", title: "Best 5-Year CD Rates" },
  { slug: "high-yield-cd", title: "High-Yield CD Rates" },
  { slug: "jumbo-cd", title: "Jumbo CD Rates" },
  { slug: "no-penalty-cd-rates", title: "Best No-Penalty CD Rates" },
];

export const getTermPage = (slug) => termPages.find((p) => p.slug === slug);
