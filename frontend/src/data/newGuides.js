// Comparison guides added Oct 2026 for queries Search Console showed with impressions
// but no dedicated page ("cd vs i bond", "bond funds vs cds", "cd vs treasury bond").
// Rates in examples are illustrative; live CD rates are on the rate pages.

export const newGuides = [
  {
    slug: "i-bonds-vs-cds",
    title: "I Bonds vs CDs: Which Is Better for Your Savings?",
    metaTitle: "I Bonds vs CDs: Which Is Better? | Cavicord",
    metaDescription:
      "I bonds vs CDs compared: how each rate works, the $10,000 I bond limit, the 12-month lock and 3-month penalty, state-tax rules and when each one wins.",
    category: "Comparison",
    readTime: "9 min read",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    excerpt:
      "I bonds track inflation and are state-tax free; CDs pay a fixed, known rate with no purchase limit. Which wins depends on inflation, how much you're saving and when you need it.",
    answer:
      "Choose I bonds if you want protection against inflation, can leave the money for at least a year (ideally five), and are saving $10,000 or less per person per year. Choose a CD if you want a fixed rate you know on day one, need the money on a specific date within a few years, or are saving more than the I bond limit. Many savers use both: I bonds for long-term, inflation-protected cash and CDs for dated goals.",
    sections: [
      {
        heading: "How each one pays",
        body: "A CD pays one fixed APY for the whole term. An I bond's rate has two parts: a fixed rate set when you buy, which never changes, plus an inflation rate based on the Consumer Price Index that the Treasury resets every six months (announced each May and November). When inflation is high, I bonds can pay far more than CDs; when inflation falls, their rate falls with it, while a CD's rate stays locked.",
        bullets: [
          "CD: one fixed rate, known on day one.",
          "I bond: fixed rate plus an inflation rate that changes every 6 months.",
          "Both: backed by the government (FDIC/NCUA insurance for CDs; the U.S. Treasury for I bonds).",
        ],
      },
      {
        heading: "I bonds vs CDs at a glance",
        body: "The biggest practical differences are the purchase limit and how long your money is tied up.",
        table: {
          columns: ["", "I bonds", "Bank CDs"],
          rows: [
            ["Rate", "Fixed rate + inflation rate, resets every 6 months", "Fixed for the term"],
            ["Purchase limit", "$10,000 per person per calendar year (electronic, via TreasuryDirect)", "No limit (insured to $250,000 per bank)"],
            ["Minimum hold", "12 months — can't redeem earlier", "None, but early withdrawal costs a penalty"],
            ["Early-exit cost", "Lose the last 3 months of interest if redeemed before 5 years", "Usually 3–12 months of interest"],
            ["Federal tax", "Deferred until you redeem (up to 30 years)", "Due every year"],
            ["State/local tax", "Exempt", "Taxed"],
            ["Where to buy", "TreasuryDirect.gov", "Any bank or credit union"],
          ],
        },
      },
      {
        heading: "When I bonds win",
        body: "I bonds are strongest when inflation is high or rising and you don't need the money soon.",
        bullets: [
          "You want your savings to keep pace with inflation over several years.",
          "You live in a high-income-tax state (I bond interest is state-tax free).",
          "You'd like to defer federal tax until you redeem.",
          "You may use the money for qualified higher-education costs (interest can be federally tax-free, subject to income limits).",
        ],
      },
      {
        heading: "When CDs win",
        body: "CDs are better for money with a date on it and for amounts above the I bond limit.",
        bullets: [
          "You need the money in under 12 months — I bonds can't be redeemed in the first year.",
          "You want to know exactly what you'll have at maturity.",
          "Inflation is falling and current CD rates are higher than the I bond's current rate.",
          "You're saving more than $10,000 per person this year.",
        ],
      },
      {
        heading: "How the 5-year rule changes the math",
        body: "If you redeem an I bond after 12 months but before 5 years, you forfeit the last three months of interest. On a short horizon that can cut the effective yield noticeably, so compare a CD's full rate with the I bond's rate after the 3-month penalty. After five years there's no penalty, and the bond keeps earning for up to 30 years.",
      },
    ],
    faqs: [
      {
        q: "Are I bonds better than CDs right now?",
        a: "It depends on the current I bond composite rate versus today's CD rates and on how long you'll hold. Compare the I bond rate, adjusted for the 3-month penalty if you'll redeem within 5 years, with CD APYs for your timeline.",
      },
      {
        q: "Can you lose money in an I bond?",
        a: "No. The composite rate can't fall below zero, so the bond's value never goes down. You can give up the last 3 months of interest by redeeming before five years.",
      },
      {
        q: "How much can I put in I bonds?",
        a: "Up to $10,000 per person per calendar year in electronic I bonds through TreasuryDirect. Paper I bonds bought with a tax refund were discontinued at the start of 2025. CDs have no purchase limit.",
      },
      {
        q: "Should I buy I bonds or a CD for an emergency fund?",
        a: "Neither is ideal for money you might need immediately. I bonds are locked for 12 months and CDs charge a penalty. A high-yield savings account or no-penalty CD fits emergency money better.",
      },
    ],
    sources: [
      { label: "TreasuryDirect — I bonds", url: "https://www.treasurydirect.gov/savings-bonds/i-bonds/" },
      { label: "TreasuryDirect — I bond interest rates", url: "https://www.treasurydirect.gov/savings-bonds/i-bonds/i-bonds-interest-rates/" },
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
      { label: "IRS Publication 550 — Investment Income and Expenses", url: "https://www.irs.gov/publications/p550" },
    ],
  },
  {
    slug: "cds-vs-bond-funds",
    title: "CDs vs Bond Funds: Which Is Right for Your Cash?",
    metaTitle: "CDs vs Bond Funds: Safety & Rate Risk | Cavicord",
    metaDescription:
      "Bond funds vs CDs: why a bond fund can lose value when rates rise, how duration measures that risk, taxes, liquidity and when each makes sense.",
    category: "Comparison",
    readTime: "8 min read",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    excerpt:
      "A CD returns your principal plus a fixed rate at maturity. A bond fund has no maturity date and its price moves every day, so the right choice depends on whether you can ride out price swings.",
    answer:
      "Choose a CD if you need a known amount on a known date: your principal is insured and the rate is fixed. Choose a bond fund if you're investing for the longer term, want diversification and daily liquidity, and can accept that the fund's value can fall — sometimes for a year or more — when interest rates rise. For money you'll spend within a few years, CDs are usually the safer fit.",
    sections: [
      {
        heading: "The key difference: a bond fund never matures",
        body: "An individual CD or bond has a maturity date when you get your principal back. A bond fund is a constantly managed basket of bonds with no maturity date, so there's no point at which you're promised your original investment back. Its price — the net asset value, or NAV — changes every trading day as interest rates and credit conditions move.",
      },
      {
        heading: "CDs vs bond funds at a glance",
        body: "Bond funds trade certainty for diversification and liquidity.",
        table: {
          columns: ["", "Bank CD", "Bond fund"],
          rows: [
            ["Principal protection", "FDIC/NCUA insured to $250,000", "None — value can fall"],
            ["Return", "Fixed APY for the term", "Varies; interest income plus or minus price changes"],
            ["Maturity date", "Yes", "No"],
            ["Access", "At maturity; penalty to exit early", "Sell any trading day at the current price"],
            ["Costs", "None to open, usually", "Annual expense ratio"],
            ["Taxes", "Interest taxed yearly as ordinary income", "Dividends and capital gains taxed; Treasury and municipal funds have partial exemptions"],
          ],
        },
      },
      {
        heading: "Duration: how much a bond fund can fall",
        body: "A bond fund's duration, listed on its fact sheet, estimates how much its price moves when rates change. A fund with a duration of 6 years would fall roughly 6% if interest rates rose by one percentage point, and rise roughly 6% if they fell by one point. Short-term bond funds (duration 1–3) move less; long-term funds (duration 10+) move a lot. A CD has no equivalent swing because its value isn't marked to the market.",
        bullets: [
          "Duration 2: about a 2% drop for a 1-point rate rise.",
          "Duration 6: about a 6% drop.",
          "Duration 15: about a 15% drop.",
        ],
      },
      {
        heading: "When a bond fund makes sense",
        body: "Bond funds suit long-term portfolios: they diversify across hundreds of issuers, reinvest automatically and can be sold any day. They can also gain value when rates fall, which a CD can't. Over a long horizon, the interest income usually outweighs temporary price drops.",
      },
      {
        heading: "When a CD makes sense",
        body: "CDs suit money you'll need on a specific date — a down payment, tuition or planned retirement spending in the next few years — because you know exactly what you'll have and there's no risk of selling after a price drop. A CD ladder can give regular access while keeping that certainty.",
      },
    ],
    faqs: [
      {
        q: "Are bond funds safer than CDs?",
        a: "No. CDs are insured and return your principal at maturity. Bond funds are not insured and can lose value, especially when interest rates rise. High-quality bond funds are less volatile than stocks but more volatile than CDs.",
      },
      {
        q: "Why did my bond fund lose money?",
        a: "Most often because interest rates rose: existing bonds paying lower rates become worth less, so the fund's NAV falls. Credit worries about the issuers can also push prices down.",
      },
      {
        q: "Should I sell my bond fund and buy CDs?",
        a: "That depends on when you need the money. For money you'll spend in the next few years, CDs remove the price risk. For long-term money, a bond fund's diversification and liquidity may still fit, so consider your timeline and tax situation before switching.",
      },
    ],
    sources: [
      { label: "Investor.gov — Bond funds", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/bond-funds" },
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
    ],
  },
  {
    slug: "cd-vs-treasury-bonds",
    title: "CD vs Treasury Bonds and Notes: Which Pays More?",
    metaTitle: "CDs vs Treasury Bonds & Notes: After-Tax Yield | Cavicord",
    metaDescription:
      "CD vs Treasury bond or note: safety, the state-tax exemption, selling before maturity and how to compare after-tax yields for 2- to 30-year terms.",
    category: "Comparison",
    readTime: "8 min read",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    excerpt:
      "Treasury notes and bonds and bank CDs are both very safe. The decision usually comes down to after-tax yield in your state and whether you might sell before maturity.",
    answer:
      "Both are about as safe as it gets: CDs are FDIC or NCUA insured to $250,000, and Treasuries are backed by the U.S. government with no limit. Treasury interest is exempt from state and local income tax and you can sell before maturity at the market price; CD interest is fully taxable and early exit costs a penalty. Compare the CD's APY with the Treasury yield adjusted for your state tax rate — in high-tax states a Treasury often comes out ahead even at a slightly lower headline yield.",
    sections: [
      {
        heading: "Treasury bills, notes and bonds",
        body: "The U.S. Treasury sells debt in three lengths. Treasury bills mature in a year or less and are covered in our CD vs Treasury bills guide. Treasury notes mature in 2, 3, 5, 7 or 10 years, and Treasury bonds in 20 or 30 years. Notes and bonds pay interest every six months and return their face value at maturity. They're sold at auction through TreasuryDirect or a brokerage and trade daily in the secondary market.",
      },
      {
        heading: "CDs vs Treasuries at a glance",
        body: "The trade-offs are taxes and flexibility.",
        table: {
          columns: ["", "Bank CD", "Treasury note/bond"],
          rows: [
            ["Backed by", "FDIC/NCUA to $250,000", "U.S. government, no limit"],
            ["Terms", "3 months–5 years (some to 10)", "Notes 2–10 years; bonds 20–30 years"],
            ["Interest", "Fixed APY, usually compounding", "Fixed coupon paid every 6 months"],
            ["State/local tax", "Taxed", "Exempt"],
            ["Exit early", "Bank's early-withdrawal penalty", "Sell at market price (could be a gain or loss)"],
            ["Minimum", "Often $0–$1,000", "$100 at TreasuryDirect"],
          ],
        },
      },
      {
        heading: "How to compare after-tax yields",
        body: "Because Treasury interest skips state income tax, convert the CD's yield to an after-state-tax figure before comparing. A simple way: CD APY × (1 − your state tax rate). With an illustrative 5% state rate, a CD at 4.40% is worth about 4.18% after state tax, so a Treasury yielding more than 4.18% would come out ahead. In a state with no income tax, compare the headline yields directly.",
        bullets: [
          "CD after state tax = CD APY × (1 − state rate).",
          "Compare that figure with the Treasury yield for the same term.",
          "Both are still subject to federal income tax.",
        ],
      },
      {
        heading: "Selling before maturity",
        body: "If you might need the money early, the exit costs differ. A CD's penalty is known in advance (for example, 6 or 12 months of interest). A Treasury's sale price depends on rates at the time: if rates have fallen you may sell at a gain; if they've risen you'll sell at a loss. Holding either to maturity returns your full principal.",
      },
      {
        heading: "Which to choose",
        body: "Choose CDs when they pay a clearly higher after-tax yield for your term, when you want compounding without managing coupons, or when you're under the $250,000 insurance limit per bank. Choose Treasuries in high-tax states, for amounts above insurance limits, for terms longer than banks offer, or when you might want to sell before maturity.",
      },
    ],
    faqs: [
      {
        q: "Are Treasury bonds safer than CDs?",
        a: "Both are extremely safe. Treasuries are backed by the U.S. government with no dollar limit; CDs are federally insured up to $250,000 per depositor, per bank, per ownership category. Above $250,000 at one bank, Treasuries offer simpler full protection.",
      },
      {
        q: "Do CDs or Treasuries pay more?",
        a: "It changes with the market. Top online-bank CDs sometimes beat Treasury yields for the same term; at other times Treasuries pay more. Always compare after state tax.",
      },
      {
        q: "Can you lose money on a Treasury bond?",
        a: "Only if you sell before maturity after rates have risen. Held to maturity, you receive the full face value plus all the interest.",
      },
    ],
    sources: [
      { label: "TreasuryDirect — Treasury notes", url: "https://www.treasurydirect.gov/marketable-securities/treasury-notes/" },
      { label: "TreasuryDirect — Treasury bonds", url: "https://www.treasurydirect.gov/marketable-securities/treasury-bonds/" },
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
      { label: "IRS Publication 550 — Investment Income and Expenses", url: "https://www.irs.gov/publications/p550" },
    ],
  },
];
