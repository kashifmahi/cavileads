// Intent-based ad landing pages — each targets one search intent

export const landingPages = [
  {
    slug: "best-cd-rates",
    term: "all",
    rateType: "standard",
    showTodaySummary: true,
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
    slug: "best-1-year-cd-rates",
    term: "12",
    rateType: "standard",
    metaTitle: "Best 1-Year CD Rates Today — Top 12-Month APYs | Cavicord",
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
    slug: "best-6-month-cd-rates",
    term: "6",
    rateType: "standard",
    metaTitle: "Best 6-Month CD Rates Today — Top Short-Term APYs | Cavicord",
    metaDescription:
      "Compare 6-month CD rates from FDIC-insured banks. Earn well above savings-account yields while keeping your cash accessible within half a year.",
    h1: "Best 6-Month CD Rates Today",
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
    slug: "high-yield-cd-rates",
    term: "all",
    rateType: "standard",
    metaTitle: "High-Yield CD Rates Today — Top Online Bank APYs | Cavicord",
    metaDescription:
      "High-yield CDs pay well above the national average, mostly from low-overhead online banks. Compare today's highest APYs — all FDIC insured.",
    h1: "High-Yield CD Rates Today",
    sub: "High-yield CDs come mostly from online banks with low overhead — same FDIC insurance, meaningfully higher APY. Ranked highest-first across all terms:",
    benefits: [
      { title: "Above Average", text: "Every listed rate is compared against the official FDIC national average." },
      { title: "Same Insurance", text: "Online banks carry identical FDIC protection to branch banks." },
      { title: "All Terms Ranked", text: "The single highest APY on our list is always the first row." },
    ],
    sections: [
      {
        heading: "What makes a CD high-yield",
        body: "There's no official definition. In practice a high-yield CD pays well above the FDIC national average rate for the same term — often around double it or more — and usually comes from an online bank or credit union with lower costs than a branch network. The insurance is identical: FDIC or NCUA coverage up to $250,000 per depositor, per institution, per ownership category.",
      },
      {
        heading: "High-yield CD vs high-yield savings account",
        body: "Both pay more than a traditional bank. The difference is whether the rate is locked.",
        table: {
          columns: ["", "High-yield CD", "High-yield savings"],
          rows: [
            ["Rate", "Fixed for the term", "Variable"],
            ["Access", "At maturity; penalty to exit early", "Any time"],
            ["Best for", "Money with a known date", "Emergency fund"],
            ["Insurance", "FDIC/NCUA to $250,000", "FDIC/NCUA to $250,000"],
          ],
        },
      },
      {
        heading: "How to get the highest CD rate",
        body: "A few habits capture most of the extra yield.",
        bullets: [
          "Compare APYs across online banks and credit unions, not just your own bank.",
          "Check promotional terms such as 7, 11, 13 or 18 months; banks often price odd terms higher.",
          "Look at the minimum deposit: some top rates need $500–$1,000 or more.",
          "Read the early-withdrawal penalty: a higher APY with a harsh penalty can be the worse deal if you might need the money.",
          "Join a credit union if needed: many accept members through a small donation to a partner charity.",
        ],
      },
    ],
    faqs: [
      { q: "What counts as a high-yield CD?", a: "Any CD paying meaningfully above the FDIC national average for its term — usually offered by online banks. The gap can be a full percentage point or more." },
      { q: "Are high-yield CDs riskier?", a: "No. The APY doesn't change the safety: FDIC insurance covers up to $250,000 per depositor, per bank, at every institution we list." },
      { q: "Why would I ever take a lower rate?", a: "Features matter: a slightly lower APY with no early-withdrawal penalty, or a lower minimum deposit, can be the better fit for your situation." },
    ],
  },
  {
    slug: "jumbo-cd-rates",
    term: "all",
    rateType: "jumbo",
    metaTitle: "Jumbo CD Rates Today: Best $100K+ CD Rates | Cavicord",
    metaDescription:
      "Compare jumbo CD rates for deposits of $100,000 or more. See when jumbo APYs beat standard CDs — and how to stay fully FDIC-insured over $250K.",
    h1: "Jumbo CD Rates Today",
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
      { q: "What is a super jumbo CD?", a: "A super jumbo CD has an even higher minimum — usually $250,000 or more. Because that's above the $250,000 FDIC limit at a single bank, any amount over the limit is uninsured unless you use joint, trust or retirement ownership categories, or a deposit-placement network that spreads it across banks." },
      { q: "Which term pays the best jumbo CD rate?", a: "It changes with the rate cycle. When the Fed is expected to cut, banks often pay the most on 6- to 18-month jumbo CDs and less on 5-year terms; when rates are expected to rise, longer terms can pay more. Filter the table above by term to see today's leaders." },
      { q: "Are jumbo CD rates negotiable?", a: "Sometimes, at smaller banks and credit unions — especially for relationship customers or deposits well above the minimum. Online banks usually publish one fixed rate. It costs nothing to ask a local bank to match the top APY in the table." },
    ],
    sections: [
      {
        heading: "What a jumbo CD earns: $100,000, $250,000 and $500,000",
        body: "Interest on a jumbo CD is simple to estimate: deposit × APY for one year. The table uses an illustrative 4.25% APY for a 12-month term; check the live table above for today's actual rates.",
        table: {
          columns: ["Deposit", "Interest in 12 months at 4.25% APY", "Fully FDIC insured at one bank (one owner)?"],
          rows: [
            ["$100,000", "$4,250", "Yes"],
            ["$250,000", "$10,625", "Not fully — interest above $250,000 is uninsured; keep principal under about $240,000 or use a joint or trust account"],
            ["$500,000", "$21,250", "No — split across banks or ownership categories"],
          ],
          caption: "Illustrative APY. The $250,000 limit includes principal and accrued interest.",
        },
      },
      {
        heading: "Jumbo vs super jumbo CDs",
        body: "A jumbo CD usually starts at $100,000; a super jumbo CD at $250,000 or more. Super jumbo minimums sit at or above the FDIC limit for one depositor at one bank, so check coverage before you deposit.",
        bullets: [
          "Joint account with two owners: up to $500,000 insured at one bank.",
          "Revocable trust (payable-on-death) accounts: up to $250,000 per beneficiary, counting up to 5 beneficiaries — at most $1,250,000 per owner at one bank.",
          "IRAs are a separate ownership category: $250,000 per owner at each bank, for all of that owner's IRAs and self-directed retirement accounts combined.",
          "Deposit-placement networks can spread one large deposit across many FDIC-insured banks.",
        ],
      },
      {
        heading: "How to choose a jumbo CD",
        body: "Compare the APY first, then the details that matter more at large balances.",
        bullets: [
          "Early-withdrawal penalty in dollars: 6 months of interest on $100,000 at 4.25% is about $2,125.",
          "Whether a standard CD from another bank pays the same or more for a lower minimum.",
          "Whether interest compounds or is paid out monthly, if you want income.",
          "What happens at maturity: the grace period and the auto-renewal rate.",
        ],
      },
      {
        heading: "Jumbo CD rates by term: 1-year, 2-year, 3-year and 5-year",
        body: "Most people searching for jumbo CD rates are choosing between a 1-year and a 5-year commitment. A 1-year jumbo CD keeps $100,000+ working at a guaranteed rate while leaving you free to reinvest within twelve months. 2- and 3-year jumbo CDs lock today's APY through a likely change in Fed policy. A 5-year jumbo CD guarantees the rate longest but carries the largest early-withdrawal penalty — often 12 months of interest or more, which on $100,000 can be several thousand dollars. Use the term filter in the table to compare each length side by side.",
      },
      {
        heading: "Jumbo CD vs. standard CD: is the premium real?",
        body: "Historically, jumbo CDs paid a few basis points more than standard CDs from the same bank. Today, many of the highest-paying online banks pay the same APY whether you deposit $1,000 or $100,000 — so a standard CD from a top-ranked bank can beat a jumbo CD from a lower-paying one. Compare the APY in the table rather than the label: the right choice is simply the highest FDIC-insured rate for your term.",
      },
      {
        heading: "Keeping $250,000+ fully FDIC-insured",
        body: "FDIC insurance covers $250,000 per depositor, per insured bank, per ownership category. A $500,000 jumbo position at one bank in one name is half uninsured. To stay fully covered you can split the money across two or more banks, use separate ownership categories (individual, joint, revocable trust, IRA), or use a deposit-placement network that spreads one deposit across many FDIC-insured banks. Credit-union share certificates carry the same $250,000 protection through the NCUA.",
      },
    ],
  },
  {
    slug: "cd-early-withdrawal-penalty-calculator",
    term: "all",
    rateType: "standard",
    showPenaltyCalculator: true,
    metaTitle: "CD Early Withdrawal Penalty Calculator (Free) | Cavicord",
    metaDescription:
      "Free CD early withdrawal penalty calculator: enter your deposit, APY, term and months held to see the penalty, what you'd get back, and whether it touches principal.",
    h1: "CD Early Withdrawal Penalty Calculator",
    sub: "See what breaking a CD early would cost you: the penalty in dollars, what you'd get back today, and how many months it takes for the interest to cover the penalty.",
    benefits: [
      { title: "Penalty in Dollars", text: "Turns \"6 months of interest\" into an exact dollar figure for your balance and APY." },
      { title: "Principal Check", text: "Shows when an early exit would eat into the money you deposited, not just the interest." },
      { title: "Break-Even Month", text: "Tells you how long you need to hold the CD before the interest covers the penalty." },
    ],
    sections: [
      {
        heading: "Typical CD early withdrawal penalties by term",
        body: "Banks set their own penalties, but most follow a similar pattern. Use these as a starting point and confirm with your account disclosure.",
        table: {
          columns: ["CD term", "Common penalty", "On $10,000 at 4.00%"],
          rows: [
            ["6 months or less", "About 3 months of interest (90 days)", "$100"],
            ["7 months to 2 years", "About 6 months of interest (180 days)", "$200"],
            ["Over 2 years to 4 years", "About 6–12 months of interest", "$200–$400"],
            ["5 years and longer", "About 12 months of interest or more", "$400+"],
          ],
          caption: "Common ranges across US banks; individual banks differ. Penalty = amount × rate × months ÷ 12.",
        },
      },
      {
        heading: "Penalty examples on larger balances",
        body: "Penalties scale with the amount withdrawn, so they matter most on large CDs.",
        table: {
          columns: ["Amount withdrawn", "Rate", "Penalty: 6 months of interest", "Penalty: 12 months of interest"],
          rows: [
            ["$25,000", "4.00%", "$500", "$1,000"],
            ["$50,000", "4.00%", "$1,000", "$2,000"],
            ["$100,000", "4.25%", "$2,125", "$4,250"],
          ],
        },
      },
      {
        heading: "How CD early withdrawal penalties are calculated",
        body: "Most banks state the penalty as a number of months (or days) of interest at the CD's rate, charged on the amount you withdraw. A common pattern is about 3 months of interest on terms under a year, 6 months on 1- to 2-year CDs, and 12 months or more on longer terms, but it varies by bank. Penalty = amount withdrawn × rate × (penalty months ÷ 12). On a $10,000 CD at 4.00% with a 6-month penalty, that's $10,000 × 0.04 × 0.5 = $200. Your account disclosure has the exact rule.",
      },
      {
        heading: "Can a penalty reduce your principal?",
        body: "Yes. The penalty is charged whether or not you've earned that much interest yet. Withdraw a 5-year CD with a 12-month penalty after three months and the penalty is roughly four times the interest earned, so the difference comes out of your deposit. The break-even figure in the calculator shows when that stops being true.",
      },
      {
        heading: "When paying the penalty still makes sense",
        body: "If rates have risen sharply since you opened the CD, moving the money can come out ahead even after the penalty. Compare the penalty with the extra interest a new CD would pay over your remaining term. If you might need the money early, a no-penalty CD avoids the question entirely, usually for a slightly lower APY.",
      },
    ],
    faqs: [
      { q: "Should I break my CD to get a higher rate?", a: "Compare the penalty with the extra interest you'd earn. Example: $50,000 with 12 months left, penalty 6 months of interest at 3.50% = $875. Moving to a 12-month CD paying 1 percentage point more earns about $500 extra, so staying put wins. Run your own numbers in the calculator." },
      { q: "Do I lose my principal if I withdraw a CD early?", a: "Only if the penalty is larger than the interest earned so far, which happens when you withdraw soon after opening. The calculator flags when this happens and shows the break-even month." },
      { q: "How much is the penalty for cashing out a CD early?", a: "Usually 3 to 12 months of interest, depending on the bank and the CD's term. On $10,000 at 4.00%, 6 months of interest is $200. Enter your own numbers above for the exact figure." },
      { q: "Is the CD early withdrawal penalty tax-deductible?", a: "Yes. In the US the forfeited interest is an above-the-line deduction (\"penalty on early withdrawal of savings\"), reported by your bank on Form 1099-INT, box 2." },
      { q: "Are there exceptions to the penalty?", a: "Many banks waive it if the account owner dies or is declared legally incompetent. Some also allow penalty-free withdrawals from IRA CDs for required minimum distributions. Check your account agreement." },
      { q: "Can I withdraw part of a CD?", a: "Some banks allow partial withdrawals and charge the penalty only on the amount taken; others require you to close the whole CD. The calculator works for either: enter the amount you plan to withdraw." },
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
  {
    slug: "cd-rates-for-seniors",
    term: "all",
    rateType: "standard",
    metaTitle: "CD Rates for Seniors: Best Options for Retirees | Cavicord",
    metaDescription:
      "CD rates for seniors and retirees: today's top FDIC-insured APYs, whether senior specials are worth it, IRA CDs and RMDs, and CD ladders for income.",
    h1: "CD Rates for Seniors",
    sub: "The best CD rate for a retiree is usually the same top rate anyone can get — senior-only specials are rare and often lower. Compare today's highest FDIC-insured APYs below, then see how retirees structure CDs for income and safety.",
    benefits: [
      { title: "Guaranteed Income", text: "A fixed APY and a known payout date — no market risk on the money you need." },
      { title: "Insured to the Limit", text: "Up to $250,000 per depositor, per bank, per ownership category — more with joint and trust accounts." },
      { title: "IRA-Friendly", text: "IRA CDs work alongside required minimum distributions; many banks waive penalties for RMDs." },
    ],
    sections: [
      {
        heading: "Do banks offer special CD rates for seniors?",
        body: "A few local banks and credit unions run senior or \"55+\" CD specials, or add a small rate bump for relationship customers. In most cases the top online banks and credit unions in the table above pay as much or more, with the same FDIC or NCUA insurance. The practical rule: compare a senior special's APY with today's top rate for the same term before choosing it.",
      },
      {
        heading: "Choosing a CD term in retirement",
        body: "Match the term to when you'll spend the money.",
        table: {
          columns: ["Goal", "Typical choice"],
          rows: [
            ["Cash you may need this year", "No-penalty CD or 3–6 month CD"],
            ["Next 1–2 years of withdrawals", "12- to 24-month CDs"],
            ["Steady income for 5 years", "A 1–5 year CD ladder (one rung matures each year)"],
            ["Locking today's rate for longer", "3- to 5-year CDs, if you won't need the money early"],
            ["Monthly income", "CDs that pay interest monthly to checking, instead of compounding"],
          ],
        },
      },
      {
        heading: "IRA CDs and required minimum distributions",
        body: "CDs held in a traditional IRA grow tax-deferred, but required minimum distributions (RMDs) still apply. Many banks let you take an RMD from an IRA CD without an early-withdrawal penalty — check the disclosure before you open one. Laddering IRA CDs so one matures before each RMD date avoids the question.",
      },
      {
        heading: "Insuring more than $250,000",
        body: "Retirees often hold more than one bank's insurance limit after selling a home or rolling over a pension.",
        bullets: [
          "Joint account (you and a spouse): up to $500,000 at one bank.",
          "Revocable trust or payable-on-death beneficiaries: up to $250,000 per beneficiary, counting up to 5 beneficiaries — at most $1,250,000 per owner at one bank.",
          "IRAs are a separate ownership category: $250,000 per owner at each bank, for all of that owner's IRAs and self-directed retirement accounts combined.",
          "Spread money across several banks, or use a deposit-placement network.",
        ],
      },
      {
        heading: "Protecting yourself from CD scams",
        body: "Fraudsters target retirees with \"guaranteed\" high-yield CDs that are really uninsured investments. Real bank CDs come from FDIC- or NCUA-insured institutions you can look up yourself (FDIC BankFind, NCUA credit union locator). Be wary of anyone offering a CD rate far above the top rates in the table, asking you to wire money, or pressuring you to decide quickly.",
      },
    ],
    faqs: [
      { q: "What is the best CD rate for seniors right now?", a: "Usually the top rate available to anyone — see the first rows of the table above. Senior-only specials exist at some local banks and credit unions but rarely beat the best online rates." },
      { q: "Are CDs a good idea for retirees?", a: "For money you'll need in the next few years and can't afford to lose, CDs are a strong fit: fixed rate, FDIC or NCUA insurance and a known maturity date. Most retirees pair them with longer-term investments rather than holding only CDs." },
      { q: "Can I take my RMD from a CD without a penalty?", a: "Often yes for IRA CDs — many banks waive the early-withdrawal penalty for required minimum distributions — but it's bank-specific. Check the account disclosure or ladder the CDs to mature before your RMD date." },
      { q: "Can a CD pay me monthly income?", a: "Yes. Many banks let you have interest paid monthly or quarterly to a checking account instead of compounding in the CD. The APY may be slightly lower because the interest doesn't compound." },
      { q: "How much of my retirement savings should be in CDs?", a: "There's no single answer. A common approach keeps 1–5 years of planned withdrawals in CDs or a CD ladder and invests money for later years for growth. A financial planner can help set the split for your situation." },
    ],
  },
];

export const getLanding = (slug) => landingPages.find((p) => p.slug === slug);
