// Intent-based ad landing pages — each targets one search intent

export const landingPages = [
  {
    slug: "best-cd-rates",
    term: "all",
    rateType: "standard",
    metaTitle: "Best CD Rates Today — Compare Top APYs | Cavicord",
    metaDescription:
      "The best CD rates from FDIC-insured banks, ranked by APY. Compare terms, minimums, and penalties side by side — then get options matched to you.",
    h1: "Today's Best CD Rates",
    sub: "Every rate below is from an FDIC-insured bank, ranked by APY so the strongest yields rise to the top. Compare, then let us match you with options for your deposit.",
    benefits: [
      { title: "Ranked by APY", text: "The highest-paying CDs always appear first — no pay-for-placement." },
      { title: "FDIC Insured", text: "Every listed bank is federally insured up to $250,000 per depositor." },
      { title: "Penalties Shown", text: "See each CD's early-withdrawal penalty before you commit." },
    ],
    faqs: [
      { q: "What is the best CD rate right now?", a: "The top APY changes often — the table on this page is ranked live, so the first row is the current leader. Always verify the rate with the bank before opening." },
      { q: "Are the best CD rates safe?", a: "Yes — every bank we list is FDIC or NCUA insured, protecting up to $250,000 per depositor, per institution, regardless of how high the APY is." },
      { q: "Which CD term pays the most?", a: "Twelve-month CDs usually offer the most competitive APYs because banks fight hardest for that term, but compare — short terms sometimes pay more late in a rate cycle." },
    ],
  },
  {
    slug: "cd-rates",
    term: "all",
    rateType: "standard",
    metaTitle: "Current CD Rates — Compare Bank APYs | Cavicord",
    metaDescription:
      "Current CD rates from top US banks in one sortable table: APY, minimum deposit, term, and early-withdrawal penalty. Plus live FDIC national averages.",
    h1: "Current CD Rates",
    sub: "A single, honest view of what banks pay on certificates of deposit right now — every term, every listed bank, next to the official FDIC national averages.",
    benefits: [
      { title: "All Terms", text: "From 3-month to 5-year CDs in one comparison table." },
      { title: "FDIC Benchmarks", text: "National average rates pulled live from FDIC.gov for context." },
      { title: "Updated Daily", text: "Rates are reviewed against bank disclosures with visible timestamps." },
    ],
    faqs: [
      { q: "How often do CD rates change?", a: "Banks can change rates on new CDs at any time — often around Federal Reserve meetings. A rate is only locked once you open the CD." },
      { q: "Why do online banks pay higher CD rates?", a: "Online banks have no branch overhead, so they pass the savings to depositors as higher APYs — with identical FDIC insurance." },
      { q: "What's the difference between rate and APY?", a: "APY includes compounding, the interest rate doesn't. Always compare CDs by APY — it's the real annual return." },
    ],
  },
  {
    slug: "12-month-cd",
    term: "12",
    rateType: "standard",
    metaTitle: "12-Month CD Rates — Top 1-Year APYs | Cavicord",
    metaDescription:
      "Compare 12-month CD rates from FDIC-insured banks. The 1-year CD is America's most competitive term — see today's top APYs and what you'd earn.",
    h1: "12-Month CD Rates",
    sub: "The 12-month CD is where banks compete hardest — often the highest APY on the market with just a one-year commitment. Here are today's leaders.",
    benefits: [
      { title: "Peak APYs", text: "Banks typically price their most aggressive rates at 12 months." },
      { title: "One-Year Lock", text: "Guaranteed rate for 12 months regardless of Fed cuts." },
      { title: "Ladder Ready", text: "The classic first rung of a CD ladder strategy." },
    ],
    faqs: [
      { q: "How much does a 12-month CD earn on $10,000?", a: "At 4.50% APY, $10,000 grows to about $10,450 in one year — $450 in interest, guaranteed and FDIC-insured. Use the exact APY from the table above." },
      { q: "What happens after the 12 months?", a: "You get a grace period of about 7–10 days to withdraw, add funds, or switch terms. Do nothing and most banks auto-renew at the then-current rate." },
      { q: "Can I take money out of a 12-month CD early?", a: "Yes, but most banks charge an early-withdrawal penalty — commonly 3 to 6 months of interest on a 1-year CD." },
    ],
  },
  {
    slug: "6-month-cd",
    term: "6",
    rateType: "standard",
    metaTitle: "6-Month CD Rates — Short-Term Top APYs | Cavicord",
    metaDescription:
      "Compare 6-month CD rates from FDIC-insured banks. Earn well above savings-account yields while keeping your cash accessible within half a year.",
    h1: "6-Month CD Rates",
    sub: "A six-month CD beats most savings accounts without a long lock-up — ideal for cash you'll want back within the year. Today's top short-term rates:",
    benefits: [
      { title: "Short Commitment", text: "Your money is back, with interest, in just six months." },
      { title: "Beats Savings", text: "Typically out-yields high-yield savings accounts — with a locked rate." },
      { title: "Low Minimums", text: "Several listed banks require $0–$1,000 to open." },
    ],
    faqs: [
      { q: "Is a 6-month CD worth it?", a: "Yes, for money with a near-term purpose: it locks a rate above most savings accounts while keeping the commitment short. For uncertain timelines, consider a no-penalty CD instead." },
      { q: "6-month vs 12-month CD — which is better?", a: "The 12-month usually pays a higher APY; the 6-month returns your money sooner. Match the term to when you'll actually need the cash — never stretch past your real timeline." },
      { q: "How is a 6-month CD taxed?", a: "Interest is taxed as ordinary income in the year it's paid. For a 6-month CD, that's typically the year it matures." },
    ],
  },
  {
    slug: "high-yield-cd",
    term: "all",
    rateType: "standard",
    metaTitle: "High-Yield CDs — Top APYs From Online Banks | Cavicord",
    metaDescription:
      "High-yield CDs pay well above the national average, mostly from low-overhead online banks. Compare today's highest APYs — all FDIC insured.",
    h1: "High-Yield CDs",
    sub: "High-yield CDs come mostly from online banks with low overhead — same FDIC insurance, meaningfully higher APY. Ranked highest-first across all terms:",
    benefits: [
      { title: "Above Average", text: "Every listed rate is compared against the official FDIC national average." },
      { title: "Same Insurance", text: "Online banks carry identical FDIC protection to branch banks." },
      { title: "All Terms Ranked", text: "The single highest APY on our list is always the first row." },
    ],
    faqs: [
      { q: "What counts as a high-yield CD?", a: "Any CD paying meaningfully above the FDIC national average for its term — usually offered by online banks. The gap can be a full percentage point or more." },
      { q: "Are high-yield CDs riskier?", a: "No. The APY doesn't change the safety: FDIC insurance covers up to $250,000 per depositor, per bank, at every institution we list." },
      { q: "Why would I ever take a lower rate?", a: "Features matter: a slightly lower APY with no early-withdrawal penalty, or a lower minimum deposit, can be the better fit for your situation." },
    ],
  },
  {
    slug: "jumbo-cd",
    term: "all",
    rateType: "jumbo",
    metaTitle: "Jumbo CD Rates — $100K+ Deposits Compared | Cavicord",
    metaDescription:
      "Compare jumbo CD rates for deposits of $100,000 or more. See when jumbo APYs beat standard CDs — and how to stay fully FDIC-insured over $250K.",
    h1: "Jumbo CD Rates",
    sub: "Jumbo CDs take $100,000+ deposits and sometimes pay a premium. Compare today's jumbo APYs — and remember FDIC insurance caps at $250,000 per bank.",
    benefits: [
      { title: "Large Deposits", text: "Built for $100,000+ positions — home-sale proceeds, exits, inheritances." },
      { title: "Compare First", text: "Top standard CDs often match jumbo rates — we show both so you can check." },
      { title: "Insurance Aware", text: "Spread deposits across banks to keep every dollar FDIC-protected." },
    ],
    faqs: [
      { q: "Do jumbo CDs pay more than regular CDs?", a: "Sometimes, but the premium is small and often absent — many online banks pay the same APY at $1,000 as at $100,000. Always compare the actual numbers." },
      { q: "Is a $300,000 jumbo CD fully insured?", a: "Not at one bank — FDIC coverage caps at $250,000 per depositor, per bank. Split large balances across institutions or ownership categories to stay fully covered." },
      { q: "What's the minimum for a jumbo CD?", a: "Typically $100,000, though some banks set it at $50,000. Each listed rate shows its exact minimum." },
    ],
  },
  {
    slug: "cd-calculator",
    term: "all",
    rateType: "standard",
    showCalculator: true,
    metaTitle: "CD Calculator — See What Your Deposit Earns | Cavicord",
    metaDescription:
      "Free CD calculator: enter your deposit and term to see exactly what you'd earn at today's real rates from FDIC-insured banks. No signup needed.",
    h1: "CD Calculator",
    sub: "Enter a deposit amount and term below — we'll show your estimated earnings using today's actual top rates, not hypothetical numbers.",
    benefits: [
      { title: "Real Rates", text: "Calculations use live APYs from our comparison table, not examples." },
      { title: "Instant Math", text: "See ending balance and total interest for any amount and term." },
      { title: "Free Forever", text: "No account, no email, no signup required to calculate." },
    ],
    faqs: [
      { q: "How is CD interest calculated?", a: "Ending value = deposit x (1 + APY/100)^years. APY already includes compounding, so this single formula gives your guaranteed total at maturity." },
      { q: "Is CD interest compounded?", a: "Yes — most banks compound daily or monthly. That's exactly what APY captures, which is why comparing APYs (not interest rates) is the right method." },
      { q: "Does the calculator include taxes?", a: "No — results are pre-tax. CD interest is taxed as ordinary income in the year it's credited, so your after-tax earnings depend on your bracket." },
    ],
  },
  {
    slug: "cd-for-retirement",
    term: "all",
    rateType: "standard",
    metaTitle: "CDs for Retirement — Safe, Predictable Income | Cavicord",
    metaDescription:
      "How retirees use CDs for guaranteed, FDIC-insured income: ladders for regular cash flow, IRA CDs for tax advantages, and zero market risk.",
    h1: "CDs for Retirement",
    sub: "For money you can't afford to risk, CDs offer what markets can't: a guaranteed return, FDIC insurance, and a known payout date. Here's how retirees use them.",
    benefits: [
      { title: "Zero Market Risk", text: "Your principal and rate are contractually guaranteed to maturity." },
      { title: "Predictable Income", text: "A CD ladder delivers cash on a schedule you design." },
      { title: "IRA Compatible", text: "Hold CDs inside a traditional or Roth IRA for tax advantages." },
    ],
    sections: [
      {
        heading: "Why retirees choose CDs",
        body: "Near and in retirement, the cost of a market drawdown is highest — you may be forced to sell at a loss to fund living expenses. CDs remove that risk entirely for the money assigned to them: the rate is locked, the principal is FDIC-insured up to $250,000 per depositor per bank, and the maturity value is known to the dollar on day one.",
      },
      {
        heading: "The retirement CD ladder",
        body: "A common structure splits cash across 1-, 2-, 3-, 4-, and 5-year CDs. A rung matures every year, producing predictable liquidity for annual spending, while the long rungs earn long-term rates. Each maturing rung can fund the year ahead or roll into a new 5-year CD at current rates — a self-renewing income machine with no market exposure.",
      },
      {
        heading: "IRA CDs: the tax angle",
        body: "CDs held inside a traditional IRA grow tax-deferred; inside a Roth IRA, interest can be entirely tax-free. Many banks offer IRA CD accounts directly. One extra benefit: most banks waive early-withdrawal penalties on IRA CDs for holders over 59½ — check the bank's disclosure for its exact policy.",
      },
    ],
    faqs: [
      { q: "Are CDs a good investment for retirees?", a: "For the safe portion of a retirement portfolio, yes — they deliver guaranteed, FDIC-insured returns with zero market risk. Most planners pair them with growth assets rather than using CDs alone." },
      { q: "What is an IRA CD?", a: "A regular CD held inside an IRA. Interest grows tax-deferred (traditional) or tax-free (Roth), and many banks waive early-withdrawal penalties after age 59½." },
      { q: "How much retirement money should be in CDs?", a: "A common approach covers 1–5 years of planned withdrawals with a CD ladder, keeping longer-horizon money invested for growth. There's no universal number — it depends on your spending and risk tolerance." },
    ],
  },
];

export const getLanding = (slug) => landingPages.find((p) => p.slug === slug);
