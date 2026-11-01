// Content expansions for the comparison pages that Search Console shows getting
// impressions at positions 35–95 (Oct 2026). Each entry adds sections (with an
// optional comparison table), FAQs matching the exact queries people search, and
// sources. Rates in worked examples are labelled illustrative — live rates are on
// the rate pages. Applied in guides.js / articles.js via applyExpansion().

const FDIC = { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" };
const NCUA = { label: "NCUA — Share Insurance Coverage", url: "https://ncua.gov/consumers/share-insurance-coverage" };
const IRS_1099INT = { label: "IRS — About Form 1099-INT", url: "https://www.irs.gov/forms-pubs/about-form-1099-int" };
const IRS_550 = { label: "IRS Publication 550 — Investment Income and Expenses", url: "https://www.irs.gov/publications/p550" };
const TD_IBONDS = { label: "TreasuryDirect — I bonds", url: "https://www.treasurydirect.gov/savings-bonds/i-bonds/" };
const TD_BONDS = { label: "TreasuryDirect — Treasury bonds", url: "https://www.treasurydirect.gov/marketable-securities/treasury-bonds/" };
const TD_BILLS = { label: "TreasuryDirect — Treasury bills", url: "https://www.treasurydirect.gov/marketable-securities/treasury-bills/" };
const SEC_BONDFUNDS = { label: "Investor.gov — Bond funds", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/bond-funds" };
const SEC_MMF = { label: "Investor.gov — Money market funds", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/money-market-mutual-funds" };
const FED_REGD = { label: "Federal Reserve — Regulation D amendment (savings transfer limit removed, 2020)", url: "https://www.federalreserve.gov/newsevents/pressreleases/bcreg20200424a.htm" };
const NOLHGA = { label: "NOLHGA — National Organization of Life & Health Insurance Guaranty Associations", url: "https://www.nolhga.com/" };
const FDIC_RATES = { label: "FDIC — National rates and rate caps", url: "https://www.fdic.gov/national-rates-and-rate-caps" };

export const EXPANSIONS = {
  // ---------------------------------------------------------------- guides
  "cd-vs-money-market": {
    metaTitle: "Certificate of Deposit vs Money Market Account | Cavicord",
    metaDescription:
      "CD vs money market account: rates, FDIC insurance, access and minimums side by side, a $25,000 example, and how an MMA differs from a money market fund.",
    readTime: "11 min read",
    dateModified: "2026-10-31",
    sections: [
      {
        before: "A practical split",
        heading: "Certificate of deposit vs money market account at a glance",
        body: "Both are bank deposit accounts with the same federal insurance. The differences are the rate type, how you reach your money, and what it costs to get it out early.",
        table: {
          columns: ["", "Certificate of deposit (CD)", "Money market account (MMA)"],
          rows: [
            ["Rate", "Fixed for the whole term", "Variable — the bank can change it any time"],
            ["Typical term", "3 months to 5 years", "None — open-ended"],
            ["Access", "At maturity; early withdrawal costs a penalty", "Any time; often checks and a debit card"],
            ["Insurance", "FDIC (banks) or NCUA (credit unions), $250,000 per depositor, per institution, per ownership category", "Same FDIC/NCUA coverage"],
            ["Adding money", "Usually not after opening", "Any time"],
            ["Minimums", "Often $0–$1,000 at online banks", "Often $1,000–$10,000 for the top rate tier"],
            ["Best for", "Money with a known date", "Emergency funds and bills"],
          ],
          caption: "Features vary by bank — check the account disclosure.",
        },
      },
      {
        before: "A practical split",
        heading: "What $25,000 earns in each over 12 months",
        body: "Using illustrative rates — a 12-month CD at 4.00% APY and a money market account that averages 3.50% over the year — the CD earns $1,000 and the MMA about $875. The $125 difference is the price of being able to withdraw any day. If rates rise during the year, the MMA's rate can rise with them and close the gap; if rates fall, the gap widens because the CD rate can't move. See today's actual numbers on the rate pages before deciding.",
        bullets: [
          "CD: $25,000 × 4.00% = $1,000, fixed and known on day one.",
          "MMA: $25,000 × ~3.50% average = about $875, depending on rate changes.",
          "Break even: the MMA only wins if its average rate over the year beats the CD's APY.",
        ],
      },
      {
        before: "A practical split",
        heading: "Money market account vs money market fund",
        body: "The names are confusing, but they are different products. A money market account is a bank deposit, insured by the FDIC or NCUA. A money market fund is a mutual fund sold by a brokerage that buys short-term debt; it is regulated by the SEC, aims to keep a $1.00 share price but is not FDIC insured and can, in rare cases, lose value. Funds often yield about the same as top MMAs, and Treasury-only funds can be partly exempt from state income tax.",
        bullets: [
          "Money market account: bank deposit, FDIC/NCUA insured, variable rate.",
          "Money market fund: investment, not FDIC insured, yield moves daily.",
          "CD: bank deposit, FDIC/NCUA insured, fixed rate for the term.",
        ],
      },
      {
        before: "A practical split",
        heading: "Withdrawal limits on money market accounts",
        body: "Federal Regulation D used to cap convenient withdrawals from savings and money market accounts at six per month. The Federal Reserve removed that requirement in 2020, but many banks still keep a monthly limit or charge an excess-transaction fee, so read the account terms. A CD has no monthly limit — just one big one: money stays in until maturity unless you pay the penalty.",
      },
    ],
    faqs: [
      {
        q: "Is a money market account FDIC insured?",
        a: "Yes, when it's held at an FDIC-member bank — up to $250,000 per depositor, per bank, per ownership category, the same as a CD. Money market accounts at credit unions are covered by the NCUA to the same limit. A money market fund at a brokerage is not FDIC insured.",
      },
      {
        q: "Can you lose money in a money market account?",
        a: "Not from market moves, and it's insured within the limits — only the interest rate changes. Account fees, such as a monthly fee for dropping below a minimum balance, are taken from the balance, so check the fee schedule.",
      },
      {
        q: "Is a CD or money market account better for $50,000?",
        a: "Split it by timeline. Keep what you might need in the next year in the money market account and put money with a known date into CDs, or a CD ladder, to lock the higher fixed rate. $50,000 is well under the $250,000 insurance limit at a single bank.",
      },
    ],
    sources: [FDIC, NCUA, FED_REGD, SEC_MMF, FDIC_RATES],
  },

  "how-do-cds-work": {
    metaTitle: "How Does a Certificate of Deposit Work? | Cavicord",
    metaDescription:
      "How a certificate of deposit works, step by step: how CD interest is calculated, what $10,000 earns, FDIC insurance, penalties and what happens at maturity.",
    readTime: "11 min read",
    dateModified: "2026-10-31",
    sections: [
      {
        before: "Types of CDs you'll see",
        heading: "How a CD works, step by step",
        body: "Opening and running a CD takes five steps, most of them on day one.",
        bullets: [
          "Pick a term and compare APYs across banks — the same term can pay very different rates at different banks.",
          "Open the CD online or in a branch and fund it with a single deposit (most CDs don't accept later deposits).",
          "Choose where interest goes: added to the CD (compounding) or paid out to another account.",
          "Leave it alone until maturity; the rate is fixed no matter what happens to market rates.",
          "At maturity, use the grace period (usually 7–10 days) to withdraw, renew or move to another term.",
        ],
      },
      {
        before: "Types of CDs you'll see",
        heading: "How bank CD interest works, with real numbers",
        body: "APY already includes compounding, so the quick estimate is deposit × APY for one year. $10,000 in a 1-year CD at an illustrative 4.00% APY earns $400. Left for five years at the same 4.00% APY and compounding, it grows to about $12,166.53 — $2,166.53 of interest, of which $166.53 is interest earned on earlier interest. Banks quote both an interest rate and an APY; always compare APYs because they put every bank on the same footing.",
        table: {
          columns: ["Deposit", "APY", "Term", "Balance at maturity", "Interest earned"],
          rows: [
            ["$10,000", "4.00%", "1 year", "$10,400.00", "$400.00"],
            ["$10,000", "4.00%", "5 years", "$12,166.53", "$2,166.53"],
            ["$25,000", "4.00%", "1 year", "$26,000.00", "$1,000.00"],
          ],
          caption: "Illustrative APY. Interest is taxable in the year it's credited.",
        },
      },
      {
        before: "Who CDs are right for",
        heading: "Are certificates of deposit FDIC insured?",
        body: "Yes. CDs at FDIC-member banks are insured up to $250,000 per depositor, per bank, per ownership category — principal and earned interest together. Credit union share certificates get the same $250,000 coverage from the NCUA. If an insured bank fails, the FDIC has historically paid insured depositors within a few business days, either directly or by moving the account to another bank. You can hold more than $250,000 fully insured by spreading it across banks or ownership categories (individual, joint, certain retirement accounts, trust accounts).",
      },
    ],
    faqs: [
      {
        q: "How do CD accounts work at a bank?",
        a: "You deposit a lump sum for a fixed term, the bank pays a fixed APY, and you get your money plus interest at maturity. Withdrawing before maturity costs an early-withdrawal penalty, usually a set number of months of interest.",
      },
      {
        q: "How long is a certificate of deposit?",
        a: "Most banks offer terms from 3 months to 5 years, and some go to 10 years. Common terms are 6 months, 12 months, 18 months, 2 years, 3 years and 5 years.",
      },
      {
        q: "What happens to my CD if the bank fails?",
        a: "If the bank is FDIC insured and you're within the $250,000 limit, your principal and earned interest are protected. The FDIC either pays you directly or transfers the deposit to another bank, which may let you keep the CD or withdraw without penalty.",
      },
    ],
    sources: [FDIC, NCUA, IRS_1099INT, FDIC_RATES],
  },

  "cd-vs-high-yield-savings": {
    metaTitle: "High-Yield Savings vs CD: Which Is Better? | Cavicord",
    metaDescription:
      "High-yield savings vs CD: side-by-side table, what $25,000 earns in each, when a CD ladder beats an HYSA, and how to split your money.",
    readTime: "10 min read",
    dateModified: "2026-10-31",
    sections: [
      {
        before: "When a CD wins",
        heading: "High-yield savings account vs CD at a glance",
        body: "The two accounts share the same insurance. The difference is whether your rate and your access are fixed.",
        table: {
          columns: ["", "CD", "High-yield savings (HYSA)"],
          rows: [
            ["Rate", "Fixed until maturity", "Variable — follows the Fed and the bank"],
            ["Access", "At maturity; early withdrawal penalty", "Any time"],
            ["Add money", "Usually not", "Any time"],
            ["Insurance", "FDIC/NCUA to $250,000", "FDIC/NCUA to $250,000"],
            ["When rates fall", "Keeps paying the locked rate", "Rate usually drops within weeks"],
            ["When rates rise", "Stuck at the old rate", "Rate usually rises"],
            ["Best for", "Dated goals, locking a rate", "Emergency fund, uncertain timing"],
          ],
        },
      },
      {
        before: "The hybrid most savers end up with",
        heading: "CD ladder vs high-yield savings",
        body: "A CD ladder splits money across several CDs that mature at different times — for example $25,000 as five $5,000 CDs maturing in 1, 2, 3, 4 and 5 years, each renewed into a new 5-year CD as it matures. A rung matures every year, so part of the money becomes available regularly while most of it earns longer-term rates. Compared with keeping all $25,000 in an HYSA, a ladder protects more of your yield when rates fall but gives up instant access to most of the balance.",
        bullets: [
          "Ladder: higher locked yields on most of the money; one rung available each year.",
          "HYSA: every dollar available today; yield moves with the market.",
          "Common split: 3–6 months of expenses in an HYSA, the rest in a ladder.",
        ],
      },
      {
        before: "The hybrid most savers end up with",
        heading: "What $25,000 earns in a year",
        body: "With illustrative rates — a 12-month CD at 4.25% APY and an HYSA that averages 3.75% over the year — the CD earns $1,062.50 and the HYSA about $937.50. The roughly $125 gap is what you pay for daily access. The gap disappears if HYSA rates rise during the year and grows if they fall.",
      },
    ],
    faqs: [
      {
        q: "Is a high-yield savings account better than a CD right now?",
        a: "It depends on the rate gap and your timeline. If a CD pays meaningfully more and you won't need the money before maturity, the CD wins. If the gap is small or you may need the money, the HYSA's flexibility is worth more. Compare today's CD rates with your HYSA rate before choosing.",
      },
      {
        q: "Is a CD ladder better than a high-yield savings account?",
        a: "For money you won't need all at once, often yes: a ladder locks higher rates on most of the balance while a rung matures regularly. For an emergency fund, an HYSA is better because every dollar is available immediately.",
      },
    ],
    sources: [FDIC, NCUA, FDIC_RATES],
  },

  // -------------------------------------------------------------- articles
  "cds-vs-bonds": {
    metaTitle: "CDs vs Bonds: Which Is Safer & Pays More? | Cavicord",
    metaDescription:
      "CDs vs bonds: compare safety, returns, taxes and what happens when rates move, with a side-by-side table of CDs, Treasuries, corporates and bond funds.",
    readTime: "11 min read",
    dateModified: "2026-10-31",
    sections: [
      {
        before: "The practical verdict",
        heading: "CDs vs bonds at a glance",
        body: "The safest bond and a CD are both very low risk, but they protect you in different ways.",
        table: {
          columns: ["", "Bank CD", "Treasury bond/note", "Corporate bond", "Bond fund"],
          rows: [
            ["Backed by", "FDIC/NCUA to $250,000", "U.S. government", "The company", "Many issuers; no guarantee"],
            ["Value before maturity", "Fixed (penalty to exit)", "Moves with rates", "Moves with rates and credit", "Moves daily"],
            ["Get your principal back?", "Yes, at maturity", "Yes, at maturity", "Yes, unless default", "No maturity date"],
            ["State income tax", "Taxed", "Exempt", "Taxed", "Depends on holdings"],
            ["Sell early", "Bank penalty", "Market price", "Market price", "Any day, at NAV"],
          ],
        },
      },
      {
        before: "The practical verdict",
        heading: "What rising rates do to a bond (worked example)",
        body: "Say you buy a 5-year bond at its $1,000 face value paying 4% (semi-annual interest), and right after you buy it, yields on similar bonds jump to 5%. Its market price falls to about $956 — a paper loss of roughly 4.4%. If you hold it to maturity you still get $1,000 back plus every coupon, so the loss only becomes real if you sell. A 5-year CD at 4% in the same situation never shows a lower value; the cost of exiting early is the stated penalty instead.",
        bullets: [
          "Bond held to maturity: full face value back, no loss.",
          "Bond sold after rates rise: sale price below what you paid.",
          "CD broken early: a fixed penalty, usually a number of months of interest.",
        ],
      },
      {
        before: "The practical verdict",
        heading: "Are CDs bonds?",
        body: "No. A CD is a bank deposit contract insured by the FDIC or NCUA; a bond is a debt security issued by a government or company and traded in the securities market. Brokered CDs blur the line a little: they're still bank CDs with FDIC coverage, but you buy and sell them through a brokerage, so their resale price moves with rates like a bond's.",
      },
    ],
    faqs: [
      {
        q: "Are bonds better than CDs for retirement?",
        a: "Many retirees use both. CDs fit money you'll spend on known dates in the next few years because the amount is guaranteed and insured. Treasuries add state-tax savings and can be sold without a bank penalty. Bond funds offer diversification and daily liquidity but no maturity date or guaranteed principal.",
      },
      {
        q: "Are Treasury bonds better than CDs?",
        a: "Treasuries are exempt from state and local income tax and can be sold before maturity, which can make them better in high-tax states. Top CDs often pay a higher stated yield. Compare the after-state-tax yield on the same term.",
      },
      {
        q: "Are I bonds better than CDs?",
        a: "I bonds protect against inflation and are state-tax exempt, but you can't redeem them in the first 12 months, you lose 3 months of interest if you redeem within 5 years, and purchases are capped at $10,000 per person per year electronically. CDs have no purchase cap and a fixed, known rate.",
      },
    ],
    sources: [FDIC, TD_BONDS, TD_IBONDS, SEC_BONDFUNDS, IRS_550],
  },

  "how-is-cd-interest-taxed": {
    metaTitle: "How Are CDs Taxed? CD Interest Tax Rules | Cavicord",
    metaDescription:
      "How CD interest is taxed: when it counts as income, Form 1099-INT and 1099-OID, state tax, IRA CDs, and a worked after-tax example vs a T-bill.",
    readTime: "9 min read",
    dateModified: "2026-10-31",
    sections: [
      {
        before: "Four legal ways to reduce CD taxes",
        heading: "Worked example: tax on $20,000 of CD interest",
        body: "Assume a $20,000 1-year CD at an illustrative 4.50% APY, a 22% federal bracket and a 5% state income tax. The CD earns $900; you owe about $198 federal and $45 state, leaving $657 after tax. A $20,000 Treasury bill yielding 4.30% earns $860; it's taxed federally ($189.20) but exempt from state tax, leaving $670.80 — slightly more, despite the lower headline rate. The higher your state tax rate, the more that exemption matters.",
        table: {
          columns: ["", "1-year CD", "Treasury bill"],
          rows: [
            ["Illustrative yield", "4.50%", "4.30%"],
            ["Interest on $20,000", "$900.00", "$860.00"],
            ["Federal tax (22%)", "$198.00", "$189.20"],
            ["State tax (5%)", "$45.00", "$0 (exempt)"],
            ["After-tax interest", "$657.00", "$670.80"],
          ],
          caption: "Illustrative rates and brackets; your numbers depend on your own tax situation.",
        },
      },
      {
        before: "Early withdrawal penalties are deductible",
        heading: "Multi-year CDs: taxed every year, not at maturity",
        body: "For CDs longer than one year, interest is generally taxable as it accrues each year, even if the bank doesn't pay it out until maturity (IRS original issue discount rules). So a 3-year CD produces a 1099-INT, or a 1099-OID, in each of the three years. Plan for that tax each April even though you can't touch the money.",
      },
      {
        before: "Early withdrawal penalties are deductible",
        heading: "IRA CDs",
        body: "A CD held inside a traditional IRA grows tax-deferred: no 1099-INT each year, and you pay income tax when you withdraw from the IRA. Inside a Roth IRA, qualified withdrawals are tax-free. The IRA's own rules (contribution limits, early-withdrawal penalties before 59½, required minimum distributions for traditional IRAs) apply on top of the bank's CD penalty.",
      },
    ],
    faqs: [
      {
        q: "Are CDs taxable?",
        a: "Yes. Interest from a CD in a regular account is taxable income each year it's credited. Only CDs held inside a tax-advantaged account such as an IRA avoid annual tax.",
      },
      {
        q: "Do I pay tax on CD interest if I reinvest it?",
        a: "Yes. Interest added back to the CD, or rolled into a renewed CD, is still taxable in the year it was credited.",
      },
      {
        q: "Is CD interest taxed as capital gains?",
        a: "No. CD interest is ordinary income taxed at your regular bracket, never capital gains. (Selling a brokered CD before maturity on the secondary market can create a separate capital gain or loss.)",
      },
    ],
    sources: [IRS_1099INT, IRS_550, TD_BILLS],
  },

  "cd-vs-annuity": {
    metaTitle: "CD vs Annuity Calculator: After-Tax Comparison | Cavicord",
    metaDescription:
      "CD vs annuity: compare guarantees, insurance, taxes and early-exit costs, then run the after-tax calculator to see which leaves you more.",
    readTime: "10 min read",
    dateModified: "2026-10-31",
    sections: [
      {
        before: "Which one fits you",
        heading: "CD vs annuity at a glance",
        body: "A multi-year guaranteed annuity (MYGA) is the annuity most often compared with a CD because both pay a fixed rate for a fixed term.",
        table: {
          columns: ["", "Bank CD", "Fixed annuity (MYGA)"],
          rows: [
            ["Issued by", "Bank or credit union", "Life insurance company"],
            ["Protection", "FDIC/NCUA to $250,000", "Insurer, then state guaranty association (limits vary by state)"],
            ["Taxes", "Interest taxed every year", "Tax-deferred until withdrawal"],
            ["Early exit", "Penalty of some months of interest", "Surrender charge, often several % of the balance in early years"],
            ["Before age 59½", "No extra IRS penalty", "10% IRS penalty on gains withdrawn (some exceptions)"],
            ["Typical terms", "3 months–5 years", "2–10 years"],
          ],
        },
      },
      {
        before: "Which one fits you",
        heading: "Annuity vs CD calculator: a $100,000, 5-year example",
        body: "Assume $100,000, a 24% tax bracket, a 5-year CD at an illustrative 4.00% APY and a 5-year MYGA at 4.50%. The CD's interest is taxed every year, so it effectively compounds at 3.04% and ends at about $116,153 after tax. The MYGA grows untaxed to about $124,618; cashing it out and paying 24% on the $24,618 gain leaves about $118,710 — roughly $2,557 more than the CD. If you're under 59½ and withdraw the gain, the 10% IRS penalty brings the MYGA down to about $116,248, almost the same as the CD.",
        table: {
          columns: ["After 5 years", "CD (4.00%, taxed yearly)", "MYGA (4.50%, tax-deferred)"],
          rows: [
            ["Balance before tax", "—", "$124,618"],
            ["After 24% tax", "$116,153", "$118,710"],
            ["Under 59½ (adds 10% penalty on gain)", "$116,153", "$116,248"],
          ],
          caption: "Illustrative rates; excludes state tax, fees and surrender charges.",
        },
      },
    ],
    faqs: [
      {
        q: "Is an annuity safer than a CD?",
        a: "A CD within FDIC or NCUA limits is backed by the federal government. A fixed annuity depends on the insurance company's strength, with state guaranty associations as a backstop up to limits that vary by state. Most consider the CD's protection simpler and stronger.",
      },
      {
        q: "Can you lose money in a fixed annuity?",
        a: "Not from market moves in a fixed annuity held to term. You can lose money by surrendering early, because surrender charges can exceed the interest earned in the first years.",
      },
    ],
    sources: [FDIC, NOLHGA, IRS_550],
  },
  // ---------------------------------------------------------------- articles
  "no-penalty-cd-guide": {
    metaTitle: "What Is a No-Penalty CD? Rates, Rules & Examples | Cavicord",
    metaDescription:
      "A no-penalty CD locks a fixed rate but lets you withdraw the full balance after the first week with no fee. Rules, a $20,000 example and how it compares.",
    readTime: "8 min read",
    dateModified: "2026-10-31",
    sections: [
      {
        before: "The rate trade-off",
        heading: "No-penalty CD rules to check before you open one",
        body: "No-penalty (also called liquid) CDs share the same idea, but the fine print varies by bank.",
        bullets: [
          "Waiting period: federal Regulation D requires a penalty on withdrawals in the first 6 days, so most banks require you to wait at least 7 days after funding.",
          "Full withdrawal only: many banks let you take out the whole balance and close the CD, but not a partial withdrawal.",
          "Minimum deposit: often $0–$1,000; check whether a higher balance earns a higher rate.",
          "What happens at maturity: like any CD, it may auto-renew into a new term at the bank's then-current rate.",
        ],
      },
      {
        before: "Smart uses for a no-penalty CD",
        heading: "No-penalty CD vs regular CD vs high-yield savings",
        body: "A no-penalty CD sits in the middle: a locked rate like a CD, with an exit like savings.",
        table: {
          columns: ["", "No-penalty CD", "Regular CD", "High-yield savings"],
          rows: [
            ["Rate", "Fixed for the term", "Fixed for the term", "Variable"],
            ["Typical terms", "Around 5 to 15 months", "3 months to 5+ years", "None"],
            ["Early exit", "No fee after the first week (usually full balance only)", "Penalty, often 3–12 months of interest", "Any time"],
            ["Rate compared with the best regular CDs", "Usually a little lower", "Highest for the term", "Varies; can fall any time"],
            ["Insurance", "FDIC/NCUA to $250,000", "FDIC/NCUA to $250,000", "FDIC/NCUA to $250,000"],
          ],
        },
      },
      {
        before: "Smart uses for a no-penalty CD",
        heading: "Example: $20,000 in a no-penalty CD",
        body: "Illustrative rates. You put $20,000 in an 11-month no-penalty CD at 4.00% APY. Rates rise four months later and a regular 12-month CD pays 4.60%. You close the no-penalty CD, collect about $267 of interest (4 months), pay no fee, and move the money. If rates had fallen instead, you'd keep the 4.00% locked for the full 11 months — about $733. A regular CD would have charged a penalty to switch; a savings account's rate could have dropped with the market.",
      },
    ],
    faqs: [
      {
        q: "Do no-penalty CDs have a fixed rate?",
        a: "Yes. The APY is locked for the term, which is the main advantage over a savings account whose rate can change at any time.",
      },
      {
        q: "Can I make a partial withdrawal from a no-penalty CD?",
        a: "Usually not. Most banks require you to withdraw the full balance, which closes the CD. A few allow partial withdrawals with a minimum remaining balance — check the account terms.",
      },
      {
        q: "Are no-penalty CDs FDIC insured?",
        a: "Yes, when held at an FDIC-insured bank (or an NCUA-insured credit union), up to $250,000 per depositor, per institution, per ownership category — the same as any CD.",
      },
    ],
    sources: [FDIC, NCUA, FDIC_RATES, { label: "eCFR — 12 CFR 204.2(c), Regulation D time deposits", url: "https://www.ecfr.gov/current/title-12/chapter-II/subchapter-A/part-204/section-204.2" }],
  },
  "what-happens-when-a-cd-matures": {
    metaTitle: "What Happens When a CD Matures? Grace Period Guide",
    metaDescription:
      "When a CD matures you get a grace period, often 7–10 days, to withdraw, renew or move the money. See the maturity timeline and what auto-renewal can cost.",
    readTime: "8 min read",
    dateModified: "2026-10-31",
    sections: [
      {
        before: "Option 1: Withdraw and walk away",
        heading: "CD maturity timeline",
        body: "What usually happens around the maturity date (timing varies by bank — check your disclosure).",
        table: {
          columns: ["When", "What happens"],
          rows: [
            ["About 30 days before", "The bank sends a maturity notice. For automatically renewing CDs longer than one month, banks must send it at least 30 days before maturity (or 20 days before the end of a grace period of at least 5 days); for non-renewing CDs longer than one year, at least 10 days before maturity."],
            ["Maturity date", "The term ends. You've earned the full rate with no penalty."],
            ["Grace period (often 7–10 days)", "Withdraw, add money, change the term or move the money with no penalty."],
            ["After the grace period", "If you did nothing, the CD has renewed for a new term at the bank's current rate, and early-withdrawal penalties apply again."],
          ],
        },
      },
      {
        before: "Smart moves before maturity",
        heading: "Example: what auto-renewal can cost",
        body: "Illustrative rates. A $10,000 12-month CD matures and auto-renews at the bank's standard rate of 1.50% APY, while top online banks pay 4.00% for the same term. Over the next year that's about $150 of interest instead of $400 — $250 left on the table. Moving the money during the grace period avoids it.",
      },
    ],
    faqs: [
      {
        q: "Is CD interest taxed when the CD matures?",
        a: "CD interest is generally taxable in the year it's credited and available to you, even if you leave it in the CD — not only at maturity. For CDs longer than one year that pay interest only at maturity, part of the interest is taxed each year under the IRS original issue discount (OID) rules. Banks report $10 or more on Form 1099-INT (or 1099-OID), but smaller amounts are still taxable. CDs in an IRA follow IRA tax rules instead.",
      },
      {
        q: "Can I withdraw a CD after the grace period without a penalty?",
        a: "Usually not. Once the CD renews, it's a new term and the bank's early-withdrawal penalty applies. Some banks waive penalties in limited cases such as the owner's death; check the account terms.",
      },
    ],
    sources: [FDIC, IRS_1099INT, IRS_550, { label: "CFPB — Regulation DD (Truth in Savings), §1030.5 maturity notices", url: "https://www.consumerfinance.gov/rules-policy/regulations/1030/5/" }],
  },

  // ---- Nov 2026 audit: sources, worked examples, internal links (batch A)
  "are-cds-worth-it": {
    dateModified: "2026-11-01",
    sections: [
      {
        before: "The rate-cut argument for locking in now",
        heading: "What $25,000 earns: national averages vs a competitive CD",
        body: "The FDIC publishes national average deposit rates every month. In October 2026 the average savings account paid 0.38% and the average 12-month CD paid 1.76%. Competitive online banks often pay well above the average, so the table also shows an illustrative 4.00% APY. Here is one year of interest on $25,000 at each rate. The penalty risk is also smaller than many people assume. Say you break the illustrative 4.00% CD after 6 months and the bank charges 3 months of interest. You earned about $500 and give back about $250, so you keep about $250 before tax. The same $25,000 at the 0.38% savings average would have earned $47.50 over those 6 months.",
        table: {
          columns: ["Where the $25,000 sits", "Rate", "Interest after 1 year"],
          rows: [
            ["National average savings account (FDIC, Oct 2026)", "0.38%", "$95.00"],
            ["National average 12-month CD (FDIC, Oct 2026)", "1.76%", "$440.00"],
            ["Competitive 12-month CD (illustrative)", "4.00% APY", "$1,000.00"],
          ],
          caption: "National averages are FDIC data via FRED, October 2026. 4.00% is illustrative, not an offer from any bank. Before tax.",
        },
        bullets: [
          "Penalties differ by bank. See [how CD early withdrawal penalties work](/articles/cd-early-withdrawal-penalty) and test your own case in the [early withdrawal penalty calculator](/cd-early-withdrawal-penalty-calculator).",
          "Compare actual offers on [today's best 1-year CD rates](/best-1-year-cd-rates) before you commit.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the national average CD rate?",
        a: "In October 2026 the FDIC's national average rate for a 12-month CD was 1.76%, and the national average savings rate was 0.38%. These are averages across all banks; competitive online banks often pay much more.",
      },
    ],
    sources: [
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
      { label: "FRED (St. Louis Fed) — FDIC National Rate: Savings", url: "https://fred.stlouisfed.org/series/SNDR" },
      { label: "FRED (St. Louis Fed) — FDIC National Rate: 12-Month CD", url: "https://fred.stlouisfed.org/series/NDR12MCD" },
      { label: "Investor.gov — Certificates of Deposit (CDs)", url: "https://www.investor.gov/investing-basics/investment-products/certificates-deposit-cds" },
      { label: "Federal Reserve — FOMC statement, October 28, 2026", url: "https://federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm" },
    ],
  },

  "cd-early-withdrawal-penalty": {
    dateModified: "2026-11-01",
    sections: [
      {
        before: "Five ways to avoid penalties entirely",
        heading: "What different penalty rules cost on a $10,000 CD",
        body: "Penalty rules vary more than most people expect. The table applies the federal minimum and published penalty formulas from two banks to the same $10,000 CD at an illustrative 4.00% interest rate. Day-based penalties use a 365-day year; your bank's exact method may differ slightly. Timing matters as much as the rule. Break a 5-year CD after 4 months and you have earned about $133.33. Under a 6-month-interest rule the penalty is $200.00, so $66.67 comes out of principal. Under a 150-day rule the penalty is $164.38, so $31.05 comes out of principal.",
        table: {
          columns: ["Penalty rule", "Where it applies (example)", "Penalty on $10,000 at 4.00%"],
          rows: [
            ["7 days' simple interest", "Federal minimum for withdrawals within 6 days of deposit", "$7.67"],
            ["60 days of interest", "Ally Bank CDs of 3 to 24 months", "$65.75"],
            ["3 months of interest", "Capital One 360 CDs of 12 months or less", "$100.00"],
            ["150 days of interest", "Ally Bank CDs of 49 to 60 months", "$164.38"],
            ["6 months of interest", "Capital One 360 CDs longer than 12 months", "$200.00"],
            ["12 months of interest", "Hypothetical stricter rule, for comparison", "$400.00"],
          ],
          caption: "4.00% is illustrative, not either bank's rate. Penalty terms from each bank's published CD FAQ or disclosure, checked November 2026.",
        },
        bullets: [
          "Run your own numbers in the [CD early withdrawal penalty calculator](/cd-early-withdrawal-penalty-calculator).",
          "If you might need the money early, a [no-penalty CD](/articles/no-penalty-cd-guide) removes the fee after the first week.",
          "A [CD ladder](/guides/cd-ladder-explained) keeps part of your money maturing regularly, so you rarely need to break a CD.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a legal maximum on CD early withdrawal penalties?",
        a: "No. Federal law sets a minimum penalty of at least seven days' simple interest on withdrawals made within six days of deposit, but there is no federal maximum. Each bank sets its own schedule in the account agreement.",
      },
    ],
    sources: [
      { label: "OCC HelpWithMyBank — CD penalties", url: "https://helpwithmybank.gov/help-topics/bank-accounts/certificates-of-deposit/cd-penalties.html" },
      { label: "Ally Bank — Certificates of Deposit FAQs (penalty schedule)", url: "https://www.ally.com/help/bank/cds.html" },
      { label: "Capital One — 360 CD account disclosures", url: "https://www.capitalone.com/bank/disclosures/cds/online-cds/" },
      { label: "IRS — Form 1099-INT (box 2, early withdrawal penalty)", url: "https://irs.gov/pub/irs-pdf/f1099int.pdf" },
      { label: "Investor.gov — Certificates of Deposit (CDs)", url: "https://www.investor.gov/investing-basics/investment-products/certificates-deposit-cds" },
    ],
  },

  "how-much-money-in-cds": {
    dateModified: "2026-11-01",
    sections: [
      {
        before: "Never put these in a CD",
        heading: "Worked example: sizing CDs for one household",
        body: "Take a household with $90,000 in cash and $5,000 of monthly expenses. Six months of expenses, $30,000, stays in a savings account as the emergency fund. The three dated goals above go into CDs, each matched to its date. The last $7,000 has no date, so it stays liquid or moves to long-term investing. That puts $53,000 in CDs. Interest assumes it compounds at the APY and stays in the CD; it is taxable each year. Even with interest, the three CDs total $57,427.22 at maturity, well under the $250,000 FDIC limit for one ownership category at one bank.",
        table: {
          columns: ["Goal", "Amount", "CD term", "APY (illustrative)", "Value at maturity", "Interest"],
          rows: [
            ["Car", "$8,000", "10 months", "4.00%", "$8,265.79", "$265.79"],
            ["House down payment", "$30,000", "2 years", "3.90%", "$32,385.63", "$2,385.63"],
            ["Tuition", "$15,000", "3 years", "3.80%", "$16,775.80", "$1,775.80"],
            ["Total in CDs", "$53,000", "", "", "$57,427.22", "$4,427.22"],
          ],
          caption: "APYs are illustrative, not offers from any bank. Before tax.",
        },
        bullets: [
          "Try your own amounts and terms in the [CD calculator](/cd-calculator).",
          "If the dates are less certain, a [CD ladder](/guides/cd-ladder-explained) spreads maturities instead.",
          "Before going over $250,000 at one bank, read [how FDIC insurance protects CDs](/guides/are-cds-safe).",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the $250,000 FDIC limit per CD or per bank?",
        a: "Per bank, not per CD. FDIC insurance covers $250,000 per depositor, per insured bank, for each account ownership category, such as single, joint or certain retirement accounts. All your single-owner CDs and deposit accounts at one bank count toward the same $250,000. The FDIC's EDIE tool can check your coverage.",
      },
    ],
    sources: [
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
      { label: "FDIC — Electronic Deposit Insurance Estimator (EDIE)", url: "https://edie.fdic.gov/" },
      { label: "NCUA — Share Insurance Coverage", url: "https://www.ncua.gov/consumers/share-insurance-coverage" },
      { label: "Investor.gov — Certificates of Deposit (CDs)", url: "https://www.investor.gov/investing-basics/investment-products/certificates-deposit-cds" },
    ],
  },

  "fed-rate-cuts-and-cd-rates": {
    dateModified: "2026-11-01",
    sections: [
      {
        before: "Three moves savers make before rate cuts",
        heading: "What the Fed actually did in mid-2026, and what it means for a ladder",
        body: "This article explains what happens when the Fed cuts. From June to October 2026 it did not cut. The Fed held its target range in June and July, raised it by 0.25 percentage point in September, and held again in October, when two voters wanted another increase. Over the same months the FDIC's national average 12-month CD rate rose from 1.65% to 1.76%. A ladder handles either direction. Take $20,000 split into four $5,000 rungs. When a rung matures, only that $5,000 reprices. If the new rate is 0.25 point higher or lower, that rung earns $12.50 more or less per year, while the other $15,000 keeps its locked rates. In a high-yield savings account the whole $20,000 reprices, so the same 0.25-point move changes annual interest by $50.00.",
        table: {
          columns: ["FOMC meeting", "Decision", "Target range after", "Vote"],
          rows: [
            ["June 17, 2026", "Hold", "3.50% to 3.75%", "12–0"],
            ["July 29, 2026", "Hold", "3.50% to 3.75%", "9–3 (three preferred a 0.25-point hike)"],
            ["Sept. 16, 2026", "Raise 0.25 point", "3.75% to 4.00%", "12–0"],
            ["Oct. 28, 2026", "Hold", "3.75% to 4.00%", "10–2 (two preferred a 0.25-point hike)"],
          ],
          caption: "Source: FOMC statements on federalreserve.gov. CD averages: FDIC data via FRED.",
        },
        bullets: [
          "See how CD yields have moved on our [CD rate trends](/cd-rate-trends) page.",
          "Build one step by step with our guide to [CD ladders](/guides/cd-ladder-explained).",
          "Weigh locked and variable rates in [CDs vs high-yield savings](/guides/cd-vs-high-yield-savings).",
        ],
      },
    ],
    faqs: [
      {
        q: "What has the Fed done with rates recently?",
        a: "It has not cut since at least June 2026. The Fed held its target range at 3.50% to 3.75% in June and July, raised it to 3.75% to 4.00% on September 16, 2026, and held it there on October 28, 2026.",
      },
    ],
    sources: [
      { label: "Federal Reserve — FOMC statement, June 17, 2026", url: "https://federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm" },
      { label: "Federal Reserve — FOMC statement, July 29, 2026", url: "https://federalreserve.gov/newsevents/pressreleases/monetary20260729a.htm" },
      { label: "Federal Reserve — FOMC statement, September 16, 2026", url: "https://federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm" },
      { label: "Federal Reserve — FOMC statement, October 28, 2026", url: "https://federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm" },
      { label: "FRED (St. Louis Fed) — FDIC National Rate: 12-Month CD", url: "https://fred.stlouisfed.org/series/NDR12MCD" },
    ],
  },

  "can-you-add-money-to-a-cd": {
    dateModified: "2026-11-01",
    sections: [
      {
        before: "Better workarounds for ongoing savers",
        heading: "Monthly saver example: add-on CD vs savings account",
        body: "Say you save $500 at the start of each month for a year, $6,000 in total. Compare an add-on CD at an illustrative 3.75% APY with a high-yield savings account at an illustrative 3.50% APY that holds steady all year. Each deposit earns interest only from the month it goes in, compounded monthly at the APY. The add-on CD earns $8.04 more over the year. The gap is small because the average dollar is in the account for only a little over half the year. The rate edge matters more once the balance is large, which is why many savers build up cash first and then open a CD. Many standard CDs don't accept deposits during the term at all. Capital One's 360 CD disclosure says additional deposits are not permitted, while Ally lets you add funds during its 10-day grace period.",
        table: {
          columns: ["Account", "APY (illustrative)", "Deposited", "Balance after 12 months", "Interest"],
          rows: [
            ["Add-on CD", "3.75%", "$6,000", "$6,121.19", "$121.19"],
            ["High-yield savings", "3.50%", "$6,000", "$6,113.15", "$113.15"],
          ],
          caption: "$500 deposited at the start of each month. APYs are illustrative, not offers from any bank. Before tax.",
        },
        bullets: [
          "Learn how the grace period works in [what happens when a CD matures](/articles/what-happens-when-a-cd-matures).",
          "For a growing balance you may need soon, compare a [no-penalty CD](/articles/no-penalty-cd-guide).",
          "Model a lump sum once your savings reach your target in the [CD calculator](/cd-calculator).",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I add money to a CD during the grace period?",
        a: "Often, yes. Some banks, such as Ally, let you add funds during the grace period after maturity, before the CD renews. Others don't say, so check your bank's CD disclosure or call before the maturity date.",
      },
    ],
    sources: [
      { label: "Ally Bank — Certificates of Deposit FAQs (adding funds, grace period)", url: "https://www.ally.com/help/bank/cds.html" },
      { label: "Capital One — 360 CD account disclosures", url: "https://www.capitalone.com/bank/disclosures/cds/online-cds/" },
      { label: "CFPB — Regulation DD (Truth in Savings), §1030.5 maturity notices", url: "https://www.consumerfinance.gov/rules-policy/regulations/1030/5" },
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
    ],
  },

  // ---- Nov 2026 audit: sources, worked examples, internal links (batch B)
  "what-is-a-jumbo-cd": {
    dateModified: "2026-11-01",
    sections: [
      {
        before: "How the jumbo premium changes by term",
        heading: "Interest counts toward the $250,000 limit",
        body: "FDIC insurance covers principal plus accrued interest, up to $250,000 per depositor, per bank, per ownership category. So a jumbo CD that starts right at $250,000 drifts over the limit as interest builds. If the bank failed near maturity, the interest above $250,000 would be uninsured. The fix is to open a little below the cap. The table shows the largest opening deposit that stays fully insured through maturity at an illustrative 4.00% APY, for one owner and for a two-owner joint CD. Use our [CD calculator](/cd-calculator) to rerun it at the rate you're offered, and compare offers on the [jumbo CD rates](/jumbo-cd-rates) page. If you need to hold more than this at one time, [brokered CDs](/guides/brokered-vs-bank-cds) let you split the balance across many issuing banks in one account.",
        table: {
          caption: "Illustrative 4.00% APY, interest left in the CD. Assumes no other deposits in the same ownership category at that bank.",
          columns: ["Term", "Max opening deposit, single owner", "Max opening deposit, joint (2 owners)", "Interest a $250,000 CD earns by maturity"],
          rows: [
            ["1 year", "$240,384", "$480,769", "$10,000"],
            ["2 years", "$231,139", "$462,278", "$20,400"],
            ["3 years", "$222,249", "$444,498", "$31,216"],
            ["5 years", "$205,481", "$410,963", "$54,163"],
          ],
        },
        bullets: [
          "A $250,000 single-owner 5-year CD at 4.00% APY would be worth $304,163 at maturity — $54,163 over the cap.",
          "Your other deposits at the same bank in the same ownership category count too.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does CD interest count toward the FDIC limit?",
        a: "Yes. The FDIC insures principal plus accrued interest up to $250,000 per depositor, per bank, per ownership category. A CD that opens at exactly $250,000 will exceed the limit as interest accrues, so leave headroom.",
      },
    ],
    sources: [
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
      { label: "FDIC — Deposit Insurance at a Glance (2024)", url: "https://fdic.gov/deposit-insurance/deposit-insurance-glance-brochure-english.pdf" },
      { label: "Investor.gov — Certificates of Deposit (CDs)", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/certificates-deposit-cds" },
      { label: "CFPB — What should I know about CDs?", url: "https://www.consumerfinance.gov/ask-cfpb/what-should-i-know-about-cds-en-917/" },
    ],
  },

  "cd-vs-treasury-bills": {
    dateModified: "2026-11-01",
    sections: [
      {
        before: "Bottom line",
        heading: "The break-even CD rate at your state tax rate",
        body: "To compare fairly, convert the T-bill yield into the CD APY you would need to match it after state tax: T-bill yield ÷ (1 − state tax rate). This ignores any federal deduction for state taxes, which is limited for most filers. The table uses an illustrative 4.00% T-bill. Worked example: $50,000 for one year, 24% federal bracket, 9% state rate. An illustrative 4.25% APY CD earns $2,125; after $510 federal and $191.25 state tax you keep $1,423.75. An illustrative 4.00% T-bill earns $2,000; after $480 federal tax you keep $1,520. The T-bill wins by $96.25, even though its yield is 0.25 points lower. The CD would need about 4.40% to break even. In a state with no income tax, the same CD keeps $1,615 and wins by $95. Check the [best 1-year CD rates](/best-1-year-cd-rates) and the [best 6-month CD rates](/best-6-month-cd-rates) against current bill yields, and see [how CD interest is taxed](/articles/how-is-cd-interest-taxed) for the federal side.",
        table: {
          caption: "Illustrative 4.00% T-bill yield. Break-even CD APY = 4.00% ÷ (1 − state rate). Federal tax applies to both.",
          columns: ["Your state income tax rate", "CD APY needed to match a 4.00% T-bill"],
          rows: [
            ["0% (no state income tax)", "4.00%"],
            ["3%", "4.12%"],
            ["5%", "4.21%"],
            ["7%", "4.30%"],
            ["9%", "4.40%"],
            ["11%", "4.49%"],
            ["13.3%", "4.61%"],
          ],
        },
      },
    ],
    faqs: [
      {
        q: "How do I compare a CD and a T-bill after state tax?",
        a: "Divide the T-bill yield by (1 minus your state income tax rate). At a 9% state rate, a 4.00% T-bill matches a CD paying about 4.40% APY. If the CD pays more than that, it wins after tax.",
      },
    ],
    sources: [
      { label: "TreasuryDirect — Tax forms and withholding (state and local tax exemption)", url: "https://www.treasurydirect.gov/marketable-securities/tax-forms-and-withholding" },
      { label: "TreasuryDirect — Redeem or reinvest Treasury bills", url: "https://treasurydirect.gov/help-center/treasury-bills/redeem-reinvest-treasury-bills/" },
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
      { label: "Federal Reserve Bank of St. Louis (FRED) — 1-Year Treasury Bill rate", url: "https://fred.stlouisfed.org/series/DTB1YR" },
    ],
  },

  "brokered-vs-bank-cds": {
    metaDescription:
      "Brokered vs bank CDs: how FDIC and SIPC protection differ, simple vs compound interest, selling early, and a worked example of the FDIC overlap trap.",
    dateModified: "2026-11-01",
    sections: [
      {
        before: "Which should you choose?",
        heading: "FDIC vs SIPC: which protects what",
        body: "A brokered CD sits inside a brokerage account, so two different protections are in play, and they cover different failures. FDIC insurance covers the CD if the issuing bank fails. SIPC covers missing cash and securities if the brokerage firm fails, up to $500,000 including $250,000 in cash. SIPC does not cover a drop in market value, and it is not a substitute for FDIC coverage. The common mistake is overlap. Say you already have a $100,000 CD directly at Bank A. Your brokerage then buys $200,000 of Bank A brokered CDs and $200,000 of Bank B CDs, all in your name alone. At Bank A your single-ownership total is $300,000, so $50,000 is uninsured. Bank B's $200,000 is fully covered. Ask which banks issue each CD before you buy. For the full rules, see [are CDs safe](/guides/are-cds-safe), and for large single-bank balances see [what a jumbo CD is](/articles/what-is-a-jumbo-cd).",
        table: {
          caption: "Single-ownership category, ignoring accrued interest (which also counts toward the FDIC limit).",
          columns: ["Bank", "Direct CD", "Brokered CDs", "Total", "FDIC insured", "Uninsured"],
          rows: [
            ["Bank A", "$100,000", "$200,000", "$300,000", "$250,000", "$50,000"],
            ["Bank B", "$0", "$200,000", "$200,000", "$200,000", "$0"],
            ["Total", "$100,000", "$400,000", "$500,000", "$450,000", "$50,000"],
          ],
        },
        bullets: [
          "Bank fails: FDIC, up to $250,000 per depositor, per bank, per ownership category.",
          "Brokerage fails: SIPC, up to $500,000 including $250,000 cash — not market losses.",
          "You sell early at a loss: neither one covers it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does SIPC insure my brokered CDs?",
        a: "SIPC protects the CDs and cash held at a member brokerage if the brokerage fails, up to $500,000 including $250,000 in cash. It does not cover a fall in market value. Protection against the issuing bank failing comes from FDIC insurance.",
      },
    ],
    sources: [
      { label: "Investor.gov — Brokered CDs: Investor Bulletin", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/brokered-cds-investor-bulletin" },
      { label: "SIPC — What SIPC protects", url: "https://sipc.org/for-investors/what-sipc-protects" },
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
      { label: "SEC — High-Yield CDs: Protect Your Money by Checking the Fine Print", url: "https://www.sec.gov/investor/pubs/certific.htm" },
      { label: "Investor.gov — Certificates of Deposit (CDs)", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/certificates-deposit-cds" },
    ],
  },

  "cd-ladder-explained": {
    dateModified: "2026-11-01",
    sections: [
      {
        before: "Where to open the rungs",
        heading: "A $50,000 five-rung ladder, year by year",
        body: "Here is the full schedule for $50,000 split into five $10,000 rungs, using illustrative APYs, not current offers. Each value assumes interest stays in the CD and compounds annually. In the first cycle the five rungs earn $6,163.80 combined. From year 1 on, one rung matures every 12 months and is reinvested in a new 5-year CD. Rung 1, for example, comes due at $10,400 and, rolled into a 5-year CD at 3.95%, grows to $12,622.80 by the end of year 6. By the end of year 4 every rung is a 5-year CD, and you still have one maturity a year. Your bank must send a notice at least 30 days before an auto-renewing CD over one month matures (or 20 days before the grace period ends, if it is at least five days). Use that notice as your cue to shop the [best 1-year CD rates](/best-1-year-cd-rates) and long-term rates. Read [what happens when a CD matures](/articles/what-happens-when-a-cd-matures), and model your own numbers in the [CD calculator](/cd-calculator).",
        table: {
          caption: "Illustrative APYs, not current offers. $10,000 per rung, annual compounding.",
          columns: ["Rung", "Opening term", "Illustrative APY", "Matures", "Value at maturity", "Interest", "Then"],
          rows: [
            ["1", "1 year", "4.00%", "End of year 1", "$10,400.00", "$400.00", "Roll into a 5-year CD"],
            ["2", "2 years", "3.90%", "End of year 2", "$10,795.21", "$795.21", "Roll into a 5-year CD"],
            ["3", "3 years", "3.85%", "End of year 3", "$11,200.04", "$1,200.04", "Roll into a 5-year CD"],
            ["4", "4 years", "3.85%", "End of year 4", "$11,631.24", "$1,631.24", "Roll into a 5-year CD"],
            ["5", "5 years", "3.95%", "End of year 5", "$12,137.31", "$2,137.31", "Roll into a 5-year CD"],
          ],
        },
      },
    ],
    faqs: [
      {
        q: "Will my bank remind me before a ladder rung matures?",
        a: "For CDs that renew automatically and have terms longer than one month, federal Truth in Savings rules require the bank to send a notice at least 30 calendar days before maturity, or at least 20 days before the grace period ends if the grace period is five days or longer. Set your own reminder anyway.",
      },
    ],
    sources: [
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
      { label: "FDIC — Deposit Insurance at a Glance (2024)", url: "https://fdic.gov/deposit-insurance/deposit-insurance-glance-brochure-english.pdf" },
      { label: "CFPB — Regulation DD (Truth in Savings), §1030.5 maturity notices", url: "https://www.consumerfinance.gov/rules-policy/regulations/1030/5/" },
      { label: "CFPB — What should I know about CDs?", url: "https://www.consumerfinance.gov/ask-cfpb/what-should-i-know-about-cds-en-917/" },
    ],
  },

  "are-cds-safe": {
    metaDescription:
      "Are CDs safe? What FDIC and NCUA insurance covers, how the 2024 trust rule changed limits, a $500,000 coverage example, and the real risks to avoid.",
    dateModified: "2026-11-01",
    sections: [
      {
        before: "The pros",
        heading: "How $500,000 can be fully insured at one bank",
        body: "Coverage is figured per ownership category, so one person can insure more than $250,000 at a single bank by titling accounts differently. Take a saver with $500,000 at one bank. If all of it sits in individual CDs, $250,000 is insured and $250,000 is not. Spread across three categories, all of it can be covered. Since April 1, 2024, revocable trusts (including payable-on-death accounts) and irrevocable trusts are one trust category. It is insured at $250,000 per eligible beneficiary, up to five, for a maximum of $1,250,000 per owner per bank. This is the FDIC rule; the NCUA's version for credit unions takes effect December 1, 2026. Accrued interest counts toward every limit, so leave room. At an illustrative 4.00% APY, a $250,000 single CD would grow to $260,000 in a year and put $10,000 over the cap. For retirement savers, see [CDs for retirement](/cd-for-retirement). For balances that won't fit at one bank, see [brokered CDs](/guides/brokered-vs-bank-cds) or [jumbo CDs](/articles/what-is-a-jumbo-cd).",
        table: {
          caption: "One owner, one bank. Accrued interest also counts toward each limit.",
          columns: ["Ownership category", "Example account", "Balance", "Coverage limit", "Insured", "Uninsured"],
          rows: [
            ["All in one category", "Individual CDs only", "$500,000", "$250,000", "$250,000", "$250,000"],
            ["Single", "Individual CD", "$240,000", "$250,000", "$240,000", "$0"],
            ["Certain retirement accounts", "IRA CD", "$100,000", "$250,000", "$100,000", "$0"],
            ["Trust", "POD CD naming 2 beneficiaries", "$160,000", "$500,000", "$160,000", "$0"],
            ["Split total", "Three categories", "$500,000", "—", "$500,000", "$0"],
          ],
        },
      },
    ],
    faqs: [
      {
        q: "How did the 2024 FDIC trust rule change CD coverage?",
        a: "Since April 1, 2024, revocable trusts (including payable-on-death accounts) and irrevocable trusts are combined into one trust category. Coverage is $250,000 per eligible beneficiary, up to five, so the maximum is $1,250,000 per owner per bank across all of that owner's trust deposits. This is the FDIC rule; the NCUA's matching rule for credit unions takes effect December 1, 2026.",
      },
    ],
    sources: [
      { label: "FDIC — Understanding Deposit Insurance", url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
      { label: "FDIC — Deposit Insurance at a Glance (2024)", url: "https://fdic.gov/deposit-insurance/deposit-insurance-glance-brochure-english.pdf" },
      { label: "FDIC — Compliance guide: Simplification of Deposit Insurance Rules (trust accounts, effective April 1, 2024)", url: "https://fdic.gov/media/411" },
      { label: "FDIC — Payment to depositors after a bank failure", url: "https://fdic.gov/bank-failures/payment-depositors" },
      { label: "NCUA (MyCreditUnion.gov) — Share insurance", url: "https://mycreditunion.gov/share-insurance" },
    ],
  },
};

export const applyExpansion = (item) => {
  const x = EXPANSIONS[item.slug];
  if (!x) return item;
  if (x.metaTitle) item.metaTitle = x.metaTitle;
  if (x.metaDescription) item.metaDescription = x.metaDescription;
  if (x.readTime) item.readTime = x.readTime;
  if (x.dateModified) item.dateModified = x.dateModified;
  for (const s of x.sections || []) {
    const { before, ...section } = s;
    const i = before ? item.sections.findIndex((e) => e.heading === before) : -1;
    if (i >= 0) item.sections.splice(i, 0, section);
    else item.sections.push(section);
  }
  item.faqs = [...item.faqs, ...(x.faqs || [])];
  if (x.sources) item.sources = x.sources;
  return item;
};
