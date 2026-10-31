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
      "Certificate of deposit vs money market account, side by side: rates, FDIC insurance, access, minimums and a $25,000 example. Plus how a money market account differs from a money market fund.",
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
      "Are CDs safer than bonds? Compare CDs with Treasuries, corporate bonds and bond funds on safety, price risk, taxes and yield — with a worked example of what rising rates do to a bond.",
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
      "How CD interest is taxed: ordinary income in the year it's credited, Form 1099-INT, state tax, multi-year CDs, IRA CDs and a worked example comparing a CD with a Treasury bill after tax.",
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
      "CD vs fixed annuity (MYGA): FDIC vs state guaranty coverage, surrender charges, tax deferral and a worked $100,000 example showing after-tax results over 5 years.",
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
