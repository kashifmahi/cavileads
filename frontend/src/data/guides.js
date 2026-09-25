// Comparison guide articles (original editorial content)

export const guides = [
  {
    slug: "cd-vs-high-yield-savings",
    title: "CD vs. High-Yield Savings Account: Which Should You Choose?",
    excerpt:
      "Both are safe, FDIC-insured ways to earn interest. The right choice depends on when you'll need the money and how much rate certainty you want.",
    readTime: "5 min read",
    sections: [
      {
        heading: "The core difference",
        body: "A high-yield savings account (HYSA) pays a variable rate you can access anytime. A CD pays a fixed rate in exchange for locking your money up for a set term. When the Federal Reserve cuts rates, HYSA yields drop within weeks \u2014 but a CD keeps paying its locked rate until maturity.",
      },
      {
        heading: "When a CD wins",
        body: "Choose a CD when you have a lump sum you won't need before a known date, and you want to protect today's rate against future cuts. CDs also remove the temptation to dip into savings \u2014 the early withdrawal penalty is a useful commitment device.",
      },
      {
        heading: "When an HYSA wins",
        body: "Choose an HYSA for your emergency fund or any money you may need on short notice. Liquidity matters more than an extra fraction of a percent when the car breaks down. HYSAs also win if rates are rising, since your yield floats upward automatically.",
      },
      {
        heading: "The hybrid strategy",
        body: "Many savers keep 3\u20136 months of expenses in an HYSA and ladder the rest into CDs. You can also use a no-penalty CD to lock a rate while retaining the right to walk away \u2014 a genuine best-of-both option when the spread is small.",
      },
    ],
  },
  {
    slug: "cd-vs-treasury-bills",
    title: "CD vs. Treasury Bills: Where Should Your Cash Sit?",
    excerpt:
      "CDs and T-bills often pay similar yields, but they differ in taxes, liquidity, and how you buy them. Here's a practical breakdown.",
    readTime: "6 min read",
    sections: [
      {
        heading: "Safety: effectively a tie",
        body: "T-bills carry the full faith and credit of the U.S. government. CDs from FDIC-insured banks are federally insured up to $250,000 per depositor, per bank. For balances under insurance limits, both are considered among the safest assets available.",
      },
      {
        heading: "The tax angle favors T-bills",
        body: "Interest from T-bills is exempt from state and local income taxes. If you live in a high-tax state, a T-bill yielding the same as a CD delivers a meaningfully higher after-tax return. CD interest is fully taxable at both federal and state levels.",
      },
      {
        heading: "Liquidity favors T-bills too",
        body: "T-bills can be sold on the secondary market anytime without a penalty (though the price can fluctuate slightly). Breaking a CD early usually costs months of interest. However, CDs never lose principal if held to maturity \u2014 and neither do T-bills.",
      },
      {
        heading: "Convenience favors CDs",
        body: "Opening a CD takes minutes at an online bank. Buying T-bills requires a TreasuryDirect or brokerage account and understanding auction mechanics. For terms beyond one year, CDs are also simpler than rolling short T-bills repeatedly.",
      },
      {
        heading: "Bottom line",
        body: "High state tax and shorter horizon: T-bills usually edge ahead. No state income tax, longer terms, or maximum simplicity: a top-yielding CD is hard to beat. Compare after-tax yields, not sticker APYs.",
      },
    ],
  },
  {
    slug: "brokered-vs-bank-cds",
    title: "Brokered CDs vs. Bank CDs: What's the Difference?",
    excerpt:
      "Brokered CDs are bought through a brokerage and can be sold before maturity \u2014 but they behave differently from the CDs you open directly at a bank.",
    readTime: "5 min read",
    sections: [
      {
        heading: "How brokered CDs work",
        body: "Brokerages like Fidelity, Schwab, and Vanguard distribute CDs issued by hundreds of banks. You buy them inside your brokerage account, often in $1,000 increments, and can hold CDs from many banks in one place \u2014 handy for staying under FDIC limits with large balances.",
      },
      {
        heading: "Selling early: market risk instead of penalties",
        body: "A bank CD charges a defined interest penalty for early withdrawal. A brokered CD has no penalty \u2014 instead you sell it on the secondary market at the going price, which may be more or less than you paid depending on rate movements. If rates rose since purchase, expect a loss.",
      },
      {
        heading: "Interest handling differs",
        body: "Most bank CDs compound interest within the CD. Brokered CDs typically pay simple interest out to your brokerage cash account \u2014 there's no compounding unless you reinvest it yourself. When comparing yields, note that a brokered CD's rate is not an APY.",
      },
      {
        heading: "Which should you choose?",
        body: "Bank CDs suit most savers: simple, compounding, predictable penalties. Brokered CDs shine for large portfolios needing multi-bank FDIC coverage in one account, callable-CD yield hunters, and investors who may want to trade out early without a fixed penalty.",
      },
    ],
  },
];

export const getGuide = (slug) => guides.find((g) => g.slug === slug);
