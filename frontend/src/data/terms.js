// Configuration for dedicated SEO term pages

export const monthYear = () =>
  new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const termPages = [
  {
    slug: "best-6-month-cd-rates",
    term: "6",
    rateType: "standard",
    title: "Best 6-Month CD Rates",
    heading: "Best 6-Month CD Rates",
    description:
      "Six-month CDs are ideal when you want a guaranteed return without locking your money away for long. They typically beat savings account yields while keeping your cash accessible within half a year \u2014 a smart parking spot for an emergency fund overflow or money earmarked for a near-term goal.",
  },
  {
    slug: "best-1-year-cd-rates",
    term: "12",
    rateType: "standard",
    title: "Best 1-Year CD Rates",
    heading: "Best 1-Year CD Rates",
    description:
      "The 12-month CD is the most popular term in America \u2014 and usually where banks compete hardest. If you can set money aside for a full year, one-year CDs frequently offer the highest APYs on the market, combining a strong rate with a reasonable commitment.",
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
    slug: "jumbo-cd-rates",
    term: "all",
    rateType: "jumbo",
    title: "Best Jumbo CD Rates",
    heading: "Best Jumbo CD Rates",
    description:
      "Jumbo CDs require larger minimum deposits \u2014 typically $100,000 \u2014 and sometimes pay a premium over standard CDs. Remember that FDIC/NCUA insurance caps at $250,000 per depositor, per institution, so spread very large balances across multiple banks.",
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

export const getTermPage = (slug) => termPages.find((p) => p.slug === slug);
