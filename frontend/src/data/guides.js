import { newGuides } from "./newGuides.js";
import { applyExpansion } from "./expansions.js";

// Comparison guides — same answer-first format as articles.js
// (quick answer, dated, sectioned with bullets, FAQ). Search Console showed
// the article format ranking and the old 250-word guide format not ranking.

export const guides = [
  {
    slug: "cd-vs-high-yield-savings",
    title: "CD vs. High-Yield Savings Account: Which Should You Choose?",
    metaTitle: "CD vs. High-Yield Savings: Which Pays More in 2026? | Cavicord",
    metaDescription:
      "CD or high-yield savings account? See which earns more on $10,000, when a locked rate beats a floating one, and the hybrid most savers end up using.",
    category: "Comparison",
    readTime: "7 min read",
    datePublished: "2026-05-12",
    dateModified: "2026-10-26",
    excerpt:
      "Both are FDIC-insured ways to earn interest. The right choice depends on when you'll need the money and whether you'd rather lock today's rate or keep it floating.",
    answer:
      "Choose a CD for money you won't touch before a known date — it locks today's APY, which matters most when rates are falling. Choose a high-yield savings account (HYSA) for your emergency fund or anything you might need on short notice. On a $10,000 deposit, a 1-year CD at 4.50% earns $450; an HYSA that starts at 4.00% and drifts down to 3.50% after a Fed cut earns closer to $375 — but you can get at it any day.",
    sections: [
      {
        heading: "The core difference: locked vs. floating",
        body: "A high-yield savings account pays a variable rate you can access anytime. A certificate of deposit pays a fixed rate in exchange for leaving the money alone for a set term. When the Federal Reserve cuts its benchmark rate, HYSA yields usually drop within two to four weeks — but a CD keeps paying its locked rate until maturity. The reverse is also true: if rates rise, the HYSA floats up and the CD stays put.",
        bullets: [
          "CD: fixed APY, fixed term (3 months to 5 years), early-withdrawal penalty.",
          "HYSA: variable APY, no term, withdraw anytime (some banks cap monthly transfers).",
          "Both: FDIC insured up to $250,000 per depositor, per bank, per ownership category.",
        ],
      },
      {
        heading: "What $10,000 actually earns",
        body: "The honest comparison is after a rate move, not on day one. Suppose both start near 4.50% APY and the Fed cuts twice during the year.",
        bullets: [
          "1-year CD at 4.50%: $450 interest, guaranteed, paid at maturity.",
          "HYSA starting at 4.50% and ending at 3.75%: roughly $410, and it could keep falling.",
          "HYSA if rates had risen instead to 5.00%: roughly $475 — the only scenario where it wins on yield.",
        ],
      },
      {
        heading: "When a CD wins",
        body: "A CD is the better tool when the money has a date attached and you want certainty. It also works as a commitment device: the early-withdrawal penalty makes it harder to raid the account for a vacation.",
        bullets: [
          "A house down payment 12–24 months out.",
          "Tuition due next fall.",
          "Cash you're parking after a home sale or inheritance while you decide.",
          "Any time you believe rates are heading lower and want to extend today's yield.",
        ],
      },
      {
        heading: "When an HYSA wins",
        body: "Liquidity is worth more than a few basis points when the car breaks down. An HYSA is the right home for money you cannot schedule.",
        bullets: [
          "Your emergency fund (3–6 months of expenses).",
          "Money for an uncertain purchase date.",
          "Periods when rates are rising and you want your yield to float upward.",
          "Deposits you add to regularly — most CDs don't accept additional deposits.",
        ],
      },
      {
        heading: "The hybrid most savers end up with",
        body: "You don't have to pick one. A common structure keeps the emergency fund in an HYSA and ladders everything else into CDs so a rung matures every six or twelve months. A no-penalty CD is the third option: it locks a rate but lets you withdraw the full balance after the first week with no fee, usually for about 0.25–0.50% less APY than a standard CD of the same term.",
        bullets: [
          "HYSA: 3–6 months of expenses, always accessible.",
          "CD ladder: the rest, split across 1- to 5-year terms.",
          "No-penalty CD: a middle ground when the APY gap to a standard CD is small.",
        ],
      },
      {
        heading: "How to decide in 60 seconds",
        body: "Ask three questions. Do I know when I'll need this money? If yes, lean CD. Could I need it sooner? If yes, lean HYSA or no-penalty CD. Do I think rates are going down? If yes, lock a CD now; if you think they're going up, keep floating and revisit after the next Fed meeting.",
      },
    ],
    faqs: [
      {
        q: "Do CDs pay more than high-yield savings accounts?",
        a: "Usually, yes — the top CDs tend to pay 0.25–0.75 percentage points more than the top HYSAs for the same bank, and the CD rate is guaranteed for the term. The gap narrows or flips when rates are rising fast.",
      },
      {
        q: "Can I lose money in a CD or HYSA?",
        a: "Not within FDIC limits. Both are insured up to $250,000 per depositor, per bank. The only way to lose money in a CD is an early-withdrawal penalty large enough to exceed the interest earned, which happens only if you withdraw very early.",
      },
      {
        q: "Is a no-penalty CD better than an HYSA?",
        a: "If the no-penalty CD pays as much as or more than the HYSA, yes — you get the same access with a locked rate. If it pays meaningfully less, the HYSA's flexibility and ability to accept deposits usually win.",
      },
      {
        q: "Should I move my emergency fund into a CD?",
        a: "No. An emergency fund needs to be available the same day. Keep it in an HYSA (or a no-penalty CD if the rate is competitive) and use standard CDs only for money with a known timeline.",
      },
    ],
  },
  {
    slug: "cd-vs-treasury-bills",
    title: "CD vs. Treasury Bills: Where Should Your Cash Sit?",
    metaTitle: "CD vs Treasury Bills: Which Pays More After Tax? | Cavicord",
    metaDescription:
      "CDs and T-bills often pay similar yields, but state taxes, liquidity and how you buy them change the answer. See which wins for your state and timeline.",
    category: "Comparison",
    readTime: "8 min read",
    datePublished: "2026-05-19",
    dateModified: "2026-10-26",
    excerpt:
      "CDs and Treasury bills look alike on a yield chart, but taxes, liquidity and convenience push the answer one way or the other depending on where you live.",
    answer:
      "For most savers in states with an income tax, a Treasury bill wins on after-tax yield because T-bill interest is exempt from state and local tax. For savers in no-income-tax states, for terms longer than one year, or for anyone who values simplicity, a top-yielding bank CD is usually the better choice. Compare after-tax yields, not sticker APYs — the difference can be 0.3–0.6 percentage points in high-tax states.",
    sections: [
      {
        heading: "Safety: effectively a tie",
        body: "Treasury bills carry the full faith and credit of the U.S. government. CDs from FDIC-insured banks are federally insured up to $250,000 per depositor, per bank, per ownership category. Below those limits, both are considered among the safest places to hold cash. Above $250,000, T-bills keep their guarantee at any size; CDs require splitting deposits across banks.",
      },
      {
        heading: "The tax angle favors T-bills",
        body: "T-bill interest is taxable federally but exempt from state and local income tax. CD interest is taxed at every level. The effect is biggest in high-tax states.",
        bullets: [
          "California (up to 13.3% state tax): a 4.50% T-bill is equivalent to roughly a 5.10% CD for a top-bracket saver.",
          "New York (up to 10.9%): a 4.50% T-bill is equivalent to about a 5.00% CD.",
          "Texas, Florida, Nevada, Washington (no state income tax): no tax advantage — compare raw yields.",
        ],
      },
      {
        heading: "Liquidity also favors T-bills",
        body: "T-bills can be sold on the secondary market any business day through your brokerage, with no penalty. The price may be slightly above or below what you paid depending on rate moves since purchase. Breaking a bank CD early costs a fixed penalty — commonly 3 to 6 months of interest on a 1-year CD. Held to maturity, neither loses principal.",
      },
      {
        heading: "Convenience and term length favor CDs",
        body: "Opening a CD takes five minutes at an online bank and the interest compounds inside the account. T-bills require a TreasuryDirect or brokerage account, an understanding of auction dates, and manual reinvestment every 4, 8, 13, 17, 26 or 52 weeks. Beyond one year you'd move to Treasury notes, which trade with more price volatility — a 2- to 5-year CD is simpler and its rate is just as locked.",
        bullets: [
          "CD: one account, auto-compounding, set-and-forget until maturity.",
          "T-bill: auction calendar, reinvestment decisions, brokerage statements.",
          "T-bill ladders are cheap to run; CD ladders are easier to understand.",
        ],
      },
      {
        heading: "A worked example",
        body: "A saver in New Jersey (top state rate 10.75%) with $50,000 compares a 1-year CD at 4.60% APY with a 52-week T-bill at 4.45%.",
        bullets: [
          "CD: $2,300 interest, minus federal and ~$247 state tax.",
          "T-bill: $2,225 interest, minus federal tax only.",
          "After state tax, the T-bill is ahead by roughly $170 despite the lower headline yield.",
        ],
      },
      {
        heading: "Bottom line",
        body: "High state tax and a horizon of a year or less: T-bills usually edge ahead. No state income tax, a longer term, or a preference for one simple account: a top-yielding CD is hard to beat. If you're splitting hairs, the no-penalty CD is a third option that matches T-bill liquidity with CD simplicity.",
      },
    ],
    faqs: [
      {
        q: "Are Treasury bills safer than CDs?",
        a: "Both are backed by the federal government — T-bills directly, CDs through FDIC insurance up to $250,000 per depositor, per bank. Within insurance limits the safety is equivalent. Above those limits, T-bills are safer because the guarantee has no cap.",
      },
      {
        q: "Do I pay state tax on CD interest?",
        a: "Yes. CD interest is ordinary income at the federal, state and local level. T-bill interest is exempt from state and local income tax, which is the main reason T-bills can beat CDs after tax in high-tax states.",
      },
      {
        q: "Can I buy T-bills without a brokerage?",
        a: "Yes, through TreasuryDirect.gov with no fees. The interface is dated and selling before maturity requires transferring the bill to a brokerage, so most people who want liquidity buy T-bills at Fidelity, Schwab or Vanguard instead.",
      },
      {
        q: "Which is better for a CD ladder: CDs or T-bills?",
        a: "For rungs of one year or less in a taxable account, T-bills are cheaper after tax in most states. For rungs of two to five years, bank CDs are simpler and avoid the price swings of Treasury notes. Many savers use T-bills for the short rungs and CDs for the long ones.",
      },
    ],
  },
  {
    slug: "brokered-vs-bank-cds",
    title: "Brokered CDs vs. Bank CDs: What's the Difference?",
    metaTitle: "Brokered CDs vs. Bank CDs: Which Should You Buy? | Cavicord",
    metaDescription:
      "Brokered CDs trade in your brokerage account with no early-withdrawal penalty — but no compounding and real market risk if you sell early. Here's who should use which.",
    category: "Comparison",
    readTime: "7 min read",
    datePublished: "2026-05-26",
    dateModified: "2026-10-26",
    excerpt:
      "Brokered CDs are bought through a brokerage and can be sold before maturity — but they behave differently from the CDs you open directly at a bank.",
    answer:
      "Bank CDs suit most savers: you open them directly, interest compounds inside the account, and early withdrawal costs a known penalty. Brokered CDs — bought through Fidelity, Schwab, Vanguard and the like — are better for large balances that need FDIC coverage across many banks in one account, and for investors who may want to sell before maturity at market price instead of paying a penalty. The trade-offs: brokered CDs pay simple interest, can be callable, and can lose value if you sell after rates rise.",
    sections: [
      {
        heading: "How brokered CDs work",
        body: "Banks issue CDs in bulk to brokerages, which resell them to customers in $1,000 increments. You buy them like a bond inside your brokerage account. Because you can hold CDs from dozens of banks in one place, brokered CDs are the standard way to keep a $1 million cash position fully FDIC-insured without opening twenty bank accounts.",
        bullets: [
          "Minimum: typically $1,000 per CD.",
          "New-issue brokered CDs usually have no purchase fee; secondary-market trades may carry a small markup.",
          "FDIC insurance is per issuing bank, so spreading across issuers raises your total coverage.",
        ],
      },
      {
        heading: "Selling early: market risk instead of a penalty",
        body: "A bank CD charges a defined interest penalty for early withdrawal. A brokered CD has no penalty — you sell it on the secondary market at the going price. If rates have risen since you bought, your CD is worth less and you take a loss; if rates have fallen, you may sell at a gain. Thin trading can also mean a wide bid-ask spread on small lots.",
      },
      {
        heading: "Interest: compounding vs. simple",
        body: "Most bank CDs compound interest daily or monthly and quote an APY. Brokered CDs pay simple interest — usually monthly or semi-annually — into your brokerage cash balance, and the quoted rate is a coupon, not an APY. On a 5-year CD at 4.50%, compounding adds roughly 0.5 percentage points of total return over the term unless you reinvest each coupon yourself.",
        bullets: [
          "Bank CD, $25,000 at 4.50% APY for 5 years: about $6,150 interest.",
          "Brokered CD, $25,000 at 4.50% simple for 5 years: $5,625 interest if coupons sit in cash.",
        ],
      },
      {
        heading: "Callable brokered CDs: read the fine print",
        body: "Some brokered CDs are callable: the bank can redeem them early, usually after a year, if rates fall. You get your principal back but lose the high rate exactly when you'd most want to keep it. Callable CDs pay a slightly higher coupon to compensate. If you see a brokered CD yielding noticeably more than peers, check whether it's callable before buying.",
      },
      {
        heading: "Which should you choose?",
        body: "Match the product to the problem.",
        bullets: [
          "Choose a bank CD if: you have under $250,000 per bank, want compounding, and prefer a known penalty over market risk.",
          "Choose brokered CDs if: you need FDIC coverage well above $250,000 in one account, you already use a brokerage for cash management, or you want the option to sell at market price.",
          "Either way: compare the brokered CD's simple rate against the bank CD's APY on equal terms before deciding.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are brokered CDs FDIC insured?",
        a: "Yes, as long as the issuing bank is FDIC-insured and the brokerage records you as the owner — which the major brokerages do. Coverage is $250,000 per issuing bank, per depositor, so holding CDs from several banks multiplies your total coverage.",
      },
      {
        q: "Can I lose money on a brokered CD?",
        a: "Only if you sell before maturity after rates have risen, or if you overpay on the secondary market. Held to maturity, you receive full principal plus the stated interest, exactly like a bank CD.",
      },
      {
        q: "Do brokered CDs pay higher rates than bank CDs?",
        a: "Sometimes, especially for longer terms and callable issues. But the brokered rate is simple interest, not APY, so a 4.50% brokered CD earns less over five years than a 4.50% APY bank CD that compounds. Always compare on the same basis.",
      },
      {
        q: "What happens when a brokered CD matures?",
        a: "The principal and final interest payment are deposited into your brokerage cash account. There's no auto-renewal — you decide what to buy next, which is one advantage over bank CDs that roll over by default.",
      },
    ],
  },
  {
    slug: "how-do-cds-work",
    title: "What Is a Certificate of Deposit and How Do CDs Work?",
    metaTitle: "How Does a Certificate of Deposit (CD) Work? | Cavicord",
    metaDescription:
      "A certificate of deposit locks your money for a set term at a fixed APY. Learn how CD interest compounds, what the early-withdrawal penalty costs, and what happens at maturity.",
    category: "Basics",
    readTime: "8 min read",
    datePublished: "2026-05-04",
    dateModified: "2026-10-26",
    excerpt:
      "A plain-English walkthrough of certificates of deposit: how the term, APY and early-withdrawal penalty fit together, and what happens at maturity.",
    answer:
      "A certificate of deposit (CD) is a savings account with a time lock. You deposit a fixed amount for a set term — 3 months to 5 years — and the bank pays a fixed APY that's usually higher than a regular savings account. Your rate is guaranteed for the whole term, your principal is FDIC-insured up to $250,000 per bank, and if you withdraw early you pay a penalty, typically 3 to 12 months of interest. At maturity you get a short grace period to withdraw before the bank auto-renews the CD.",
    sections: [
      {
        heading: "The basic deal",
        body: "You give the bank certainty — your money stays put for the term — and the bank gives you certainty in return: a rate that can't change. That's the whole trade. A 12-month CD opened today at 4.50% APY pays 4.50% for 12 months no matter what the Federal Reserve does, which is exactly why savers reach for CDs when they expect rates to fall.",
        bullets: [
          "Terms: commonly 3, 6, 12, 18, 24, 36 and 60 months.",
          "Minimums: $0 to $2,500 at most online banks; some require $5,000 or more.",
          "Rate: fixed for the full term. Bump-up and step-up CDs are the rare exceptions.",
        ],
      },
      {
        heading: "How the interest works",
        body: "Most banks compound CD interest daily or monthly: earned interest is added to your balance and future interest is calculated on the larger amount. APY (annual percentage yield) already includes that compounding, and federal rules require every bank to calculate it the same way — so APY is the only number you need to compare.",
        bullets: [
          "$10,000 at 4.50% APY for 1 year → $10,450.",
          "$10,000 at 4.25% APY for 3 years → about $11,330.",
          "$10,000 at 4.20% APY for 5 years → about $12,285.",
        ],
      },
      {
        heading: "What happens at maturity",
        body: "When the term ends you enter a grace period, typically 7 to 10 days, when you can withdraw everything, add money, or move to a different term. If you do nothing, most banks automatically renew you into a new CD of the same term at whatever rate is current — which may be much lower than what you had. Set a calendar reminder for the maturity date and decide on purpose.",
      },
      {
        heading: "The early-withdrawal penalty",
        body: "Taking money out before maturity costs a set amount of interest. The penalty is charged even if you haven't earned that much interest yet, so a very early withdrawal can dip into principal.",
        bullets: [
          "Terms under 12 months: usually 3 months of interest.",
          "12 to 24 months: usually 6 months of interest.",
          "3 to 5 years: usually 12 months of interest, sometimes more.",
          "No-penalty CDs: zero fee after the first 6–7 days, in exchange for a slightly lower APY.",
        ],
      },
      {
        heading: "Types of CDs you'll see",
        body: "Beyond the standard fixed-term CD, banks offer a few variations.",
        bullets: [
          "No-penalty CD: withdraw the full balance anytime after the first week.",
          "Jumbo CD: $100,000+ deposits; sometimes a slightly higher rate.",
          "Bump-up CD: one chance to move to a higher rate if the bank raises it.",
          "IRA CD: a CD held inside a traditional or Roth IRA for tax advantages.",
          "Brokered CD: bought through a brokerage; tradable, no penalty, no compounding.",
        ],
      },
      {
        heading: "Who CDs are right for",
        body: "CDs fit money with a known timeline — a down payment two years out, tuition next fall, or savings you simply won't touch — and savers who want a guaranteed return with zero market risk. They're a poor fit for emergency funds or money you'll add to regularly. For most people, the right answer is both: a high-yield savings account for liquidity and a CD ladder for everything else.",
      },
    ],
    faqs: [
      {
        q: "Can you lose money in a CD?",
        a: "Not from market movements — the rate and principal are fixed and FDIC-insured up to $250,000 per depositor, per bank. The only way to lose money is an early-withdrawal penalty that exceeds the interest you've earned so far.",
      },
      {
        q: "What's the difference between APY and interest rate?",
        a: "The interest rate is the nominal rate before compounding; APY is the actual annual return including compounding. Two CDs with the same interest rate but different compounding schedules will have different APYs — always compare APY.",
      },
      {
        q: "Can I add money to a CD after opening it?",
        a: "Usually not. Most CDs accept a single deposit at opening. A few banks offer add-on CDs that allow additional deposits, and you can always open a second CD or add money during the grace period at maturity.",
      },
      {
        q: "How is CD interest taxed?",
        a: "As ordinary income in the year it's credited to your account, even if you don't withdraw it. The bank sends a 1099-INT for any year you earn $10 or more. CDs held inside an IRA are the exception.",
      },
      {
        q: "What CD term should I choose?",
        a: "Match the term to when you'll actually need the money, then check whether a longer term pays enough extra to justify the lock. When short-term rates are higher than long-term rates, a 12-month CD or a ladder is usually the sweet spot.",
      },
    ],
  },
  {
    slug: "cd-vs-money-market",
    title: "CD vs. Money Market Account: Which Pays Off?",
    metaTitle: "CD vs Money Market Account: Which Pays More? | Cavicord",
    metaDescription:
      "Money market accounts give you checks and a floating rate; CDs give you a locked rate and a penalty. See which earns more and the split most savers use.",
    category: "Comparison",
    readTime: "7 min read",
    datePublished: "2026-06-02",
    dateModified: "2026-10-26",
    excerpt:
      "Both are safe, interest-bearing accounts — but they behave very differently when you need access to your cash or want to lock a rate.",
    answer:
      "A money market account (MMA) is a liquid savings account with a variable rate and, often, check-writing or a debit card. A CD locks your money for a fixed term at a fixed rate. Top CDs usually pay 0.25–0.75 percentage points more than top MMAs and the rate can't fall mid-term — so a CD pays off for money with a date on it. An MMA pays off for cash you need to reach, especially an emergency fund or a business operating account.",
    sections: [
      {
        heading: "The core difference",
        body: "An MMA behaves like a savings account with extra access features. You can move money in and out, and many banks issue checks or a debit card. A CD is the opposite: one deposit, one term, one rate, with a penalty for leaving early. The MMA gives flexibility; the CD gives certainty.",
        bullets: [
          "MMA: variable APY, deposits and withdrawals anytime, sometimes a cap of 6 convenient withdrawals per month.",
          "CD: fixed APY, no additional deposits, early-withdrawal penalty.",
          "Both: FDIC insured up to $250,000 per depositor, per bank.",
        ],
      },
      {
        heading: "Rates: locked vs. floating",
        body: "The best CDs usually out-pay the best money market accounts, and the CD rate is frozen the day you open it. MMA rates move with the market — they rise during a hiking cycle and fall within weeks of a Fed cut. If you expect rates to fall, a CD protects your yield; if you expect them to rise, an MMA floats up with them.",
        bullets: [
          "Falling-rate year, $20,000: CD at 4.50% earns $900; MMA drifting from 4.25% to 3.50% earns roughly $775.",
          "Rising-rate year: the MMA can finish above the CD — the only case where it wins on yield.",
        ],
      },
      {
        heading: "Access to your money",
        body: "This is where the MMA wins outright. Need $3,000 for a car repair? Write a check or transfer it the same day. Breaking a CD early triggers a penalty of 3 to 12 months of interest depending on the term. For an emergency fund, that flexibility matters more than an extra half a percent.",
      },
      {
        heading: "Minimums and fees",
        body: "Money market accounts more often carry minimum-balance requirements ($1,000–$10,000 for the best rates) and monthly fees if you dip below them. Most online-bank CDs have low or no minimums and no fees at all, as long as you hold to maturity. Read the MMA's fee schedule before chasing its headline rate.",
      },
      {
        heading: "A practical split",
        body: "Many savers keep the money they might need in a money market account and ladder the rest into CDs. The MMA handles near-term bills and emergencies; the CDs lock higher, guaranteed yields on the balance. A no-penalty CD can replace the MMA if its rate is competitive and you don't need check-writing.",
        bullets: [
          "MMA: emergency fund and next 6 months of planned spending.",
          "CD ladder: everything beyond that, with a rung maturing every 6–12 months.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a money market account the same as a money market fund?",
        a: "No. A money market account is a bank deposit, FDIC-insured. A money market fund is a mutual fund held at a brokerage — not FDIC-insured, though it invests in very short-term, high-quality debt. This guide covers the bank account.",
      },
      {
        q: "Which pays more, a CD or a money market account?",
        a: "Usually a CD, by about 0.25–0.75 percentage points at the top of the market, and the CD rate is guaranteed. MMAs can briefly pay more during a fast rate-hiking cycle.",
      },
      {
        q: "Can I write checks from a CD?",
        a: "No. CDs have no transaction features. If you need check-writing or a debit card alongside a competitive rate, a money market account is the right product.",
      },
      {
        q: "Should I put my emergency fund in a CD or money market account?",
        a: "A money market account (or a high-yield savings account). Emergency money has to be available the same day with no penalty, which rules out standard CDs. A no-penalty CD is an acceptable alternative if its rate is competitive.",
      },
    ],
  },
  {
    slug: "cd-ladder-explained",
    title: "CD Ladder Explained: How to Build One Step by Step",
    metaTitle: "CD Ladder Explained: How to Build One ($25K Example) | Cavicord",
    metaDescription:
      "A CD ladder gives you regular access to your money while earning long-term rates. See exactly how to build one, a worked $25,000 example, and three variations.",
    category: "Strategy",
    readTime: "8 min read",
    datePublished: "2026-05-08",
    dateModified: "2026-10-26",
    excerpt:
      "A CD ladder gives you regular access to your money while capturing higher long-term rates. Here's exactly how to set one up.",
    answer:
      "A CD ladder splits your savings across several CDs with staggered maturity dates instead of one big CD. A classic five-rung ladder puts equal amounts into 1-, 2-, 3-, 4- and 5-year CDs; each year one rung matures and you roll it into a new 5-year CD. After four years every rung earns the long-term rate, yet a fifth of your money comes free every 12 months. It's the standard way to get long-term yields without locking everything up at once.",
    sections: [
      {
        heading: "What a CD ladder is",
        body: "Instead of putting $25,000 into a single 5-year CD, you open five CDs of $5,000 each with terms of 1, 2, 3, 4 and 5 years. From then on, one CD matures every year. You can spend it, move it, or — the usual play — reinvest it in a new 5-year CD so the ladder keeps rolling.",
      },
      {
        heading: "Why it beats a single CD",
        body: "Long-term CDs usually pay more but lock you in; short-term CDs stay flexible but earn less. A ladder captures both. It also spreads reinvestment risk: you're never forced to renew all of your money at one moment's rates, which matters a lot when rates swing by a full percentage point in a year.",
        bullets: [
          "Liquidity: a rung matures every year (or every few months in a mini-ladder).",
          "Yield: within four years, every rung is earning the 5-year rate.",
          "Rate averaging: you reinvest at a different rate each year instead of betting everything on one.",
        ],
      },
      {
        heading: "Building it, step by step",
        body: "Using today's rates on $25,000, here is what a five-rung ladder looks like on day one.",
        bullets: [
          "Rung 1 — $5,000 in a 1-year CD at ~4.75%: matures to about $5,238.",
          "Rung 2 — $5,000 in a 2-year CD at ~4.35%: matures to about $5,444.",
          "Rung 3 — $5,000 in a 3-year CD at ~4.25%: matures to about $5,665.",
          "Rung 4 — $5,000 in a 4-year CD at ~4.25%: matures to about $5,906.",
          "Rung 5 — $5,000 in a 5-year CD at ~4.20%: matures to about $6,142.",
          "Year 1: rung 1 matures. Reinvest it in a new 5-year CD. Repeat every year.",
        ],
      },
      {
        heading: "Where to open the rungs",
        body: "You don't have to use one bank. Shop each term separately — the bank with the best 1-year rate is rarely the one with the best 5-year rate. Spreading across banks also keeps large ladders under the $250,000 FDIC limit per institution. Keep a simple spreadsheet with each CD's bank, APY, maturity date and renewal instructions.",
      },
      {
        heading: "Variations worth knowing",
        body: "The five-year, five-rung ladder is the textbook version. Three variations suit different timelines.",
        bullets: [
          "Mini-ladder: 3-, 6-, 9- and 12-month CDs for money you'll need within a year or two.",
          "Barbell: half in 6–12 month CDs, half in 4–5 year CDs, nothing in between — useful when mid-term rates are weak.",
          "No-penalty rung: if a bank's no-penalty CD pays nearly as much as its standard CD, use it for the shortest rung for extra flexibility.",
        ],
      },
      {
        heading: "Mistakes to avoid",
        body: "Ladders fail quietly when nobody manages them.",
        bullets: [
          "Letting rungs auto-renew into the same short term at a low rate — set reminders for every maturity date.",
          "Building the ladder when long-term rates are far below short-term rates; a mini-ladder may earn more.",
          "Exceeding $250,000 at one bank.",
          "Laddering emergency-fund money — that belongs in a savings account.",
        ],
      },
      {
        heading: "Try it with live rates",
        body: "The free CD Ladder Builder on our homepage models a ladder using today's best rates. Set your total amount and the number of rungs, and it shows the projected interest for each rung and the ladder as a whole, using the actual top APY for each term.",
      },
    ],
    faqs: [
      {
        q: "How much money do you need for a CD ladder?",
        a: "Enough to meet each bank's minimum per rung. With $0-minimum online banks you can ladder $2,500; most people start somewhere between $10,000 and $50,000. The strategy scales to any amount.",
      },
      {
        q: "Is a CD ladder worth it when rates are falling?",
        a: "Yes — that's when it shines. Your long rungs keep earning the rates you locked while they were high, and only one rung at a time is exposed to the new, lower rates.",
      },
      {
        q: "Can I build a CD ladder at one bank?",
        a: "You can, and it's simpler to manage. But rates vary a lot by term and bank, so a ladder spread across two or three banks usually earns more and keeps you under FDIC limits on larger balances.",
      },
      {
        q: "CD ladder vs. high-yield savings — which is better?",
        a: "A ladder usually earns more and locks its rates; a savings account gives same-day access to everything. Most savers do both: savings for emergencies, a ladder for the rest.",
      },
    ],
  },
  {
    slug: "are-cds-safe",
    title: "Are CDs Safe? Pros and Cons of Certificates of Deposit",
    metaTitle: "Are CDs Safe? FDIC Insurance Limits & Real Risks | Cavicord",
    metaDescription:
      "CDs are among the safest places to keep cash — up to the FDIC limit. See exactly what's protected, what isn't, and the three risks that actually cost savers money.",
    category: "Basics",
    readTime: "7 min read",
    datePublished: "2026-06-09",
    dateModified: "2026-10-26",
    excerpt:
      "CDs are among the lowest-risk places to hold money — but 'safe' doesn't mean 'always right.' Here's the honest balance sheet.",
    answer:
      "Yes. A CD at an FDIC-insured bank is protected up to $250,000 per depositor, per bank, per ownership category — principal and interest — even if the bank fails. Credit-union CDs carry the same coverage through the NCUA. The real risks aren't bank failure; they're keeping more than $250,000 at one bank, locking in before rates rise, paying an early-withdrawal penalty, and letting a CD auto-renew at a bad rate. All four are avoidable.",
    sections: [
      {
        heading: "The safety backstop: federal insurance",
        body: "When an FDIC-insured bank fails, the FDIC either moves your deposits to another bank or pays you directly, typically within days. Since 1933, no depositor has lost a cent of insured funds. Coverage is $250,000 per depositor, per bank, per ownership category — so a couple with a joint account at one bank is covered to $500,000, and the same couple with individual and joint accounts can reach $1 million at a single institution.",
        bullets: [
          "Check a bank at FDIC.gov/bankfind before opening an account.",
          "Credit unions: look for NCUA insurance, which has identical limits.",
          "Fintech apps that 'partner' with banks: confirm which bank holds the deposit and how it's titled.",
        ],
      },
      {
        heading: "The pros",
        body: "CDs solve a specific problem — earning a guaranteed return on money you don't need yet — better than almost anything else.",
        bullets: [
          "Locked rate: it cannot fall mid-term, no matter what the Fed does.",
          "Predictable: you can calculate the maturity value to the dollar before opening.",
          "No market risk: stocks and bond funds can drop; an insured CD cannot.",
          "Higher yield than a typical savings account.",
          "Useful friction: the penalty discourages impulse withdrawals.",
        ],
      },
      {
        heading: "The cons",
        body: "Safety has a price, and it's worth naming plainly.",
        bullets: [
          "Locked money: early withdrawal costs 3–12 months of interest.",
          "Rate risk in reverse: if rates rise after you lock, you're stuck below market until maturity.",
          "Inflation: CDs preserve purchasing power more than they build wealth; long-run returns trail stocks.",
          "Opportunity cost: a 5-year CD at 4.20% looks great until you need the cash in year two.",
        ],
      },
      {
        heading: "The three risks that actually cost people money",
        body: "In practice, savers lose money on CDs in predictable ways that have nothing to do with bank failure.",
        bullets: [
          "Exceeding $250,000 at one bank. Split large balances across institutions or ownership categories, or use brokered CDs.",
          "Ignoring the grace period. Banks auto-renew at the current rate, which may be a point lower than what you had. Put every maturity date in your calendar.",
          "Choosing the wrong term. If you might need the money, pick a shorter CD or a no-penalty CD rather than gambling on not needing it.",
        ],
      },
      {
        heading: "CDs vs. other 'safe' options",
        body: "For money that must not lose value, the realistic alternatives are high-yield savings accounts, Treasury bills and money market funds. Savings accounts are more liquid but float with rates. T-bills are state-tax-free and liquid but need a brokerage. Money market funds are not FDIC-insured. A CD is the simplest way to get a locked, insured rate.",
      },
      {
        heading: "Bottom line",
        body: "For money with a known timeline that you cannot afford to lose, an FDIC-insured CD is one of the safest choices available. For long-term wealth building, treat it as the stability layer alongside — not instead of — growth investments. Stay under the insurance cap, pick the term honestly, and watch the maturity date.",
      },
    ],
    faqs: [
      {
        q: "What happens to my CD if the bank fails?",
        a: "The FDIC steps in, usually over a weekend. Your insured balance (up to $250,000 per depositor, per bank, per ownership category) is either transferred to another bank or paid out to you. You may lose the remaining term at your locked rate, but not your money.",
      },
      {
        q: "Are online bank CDs as safe as big bank CDs?",
        a: "Yes, as long as the online bank is FDIC-insured — Ally, Marcus, Capital One, Discover and the others we list all are. Insurance coverage is identical regardless of whether the bank has branches.",
      },
      {
        q: "Is a 5-year CD a bad idea right now?",
        a: "It depends on where you think rates are going. If you expect cuts, locking a 5-year rate protects you. If you expect hikes, a shorter term or a ladder keeps you flexible. A ladder is the standard way to hedge the uncertainty.",
      },
      {
        q: "Can I have more than $250,000 insured?",
        a: "Yes. Use multiple banks, use different ownership categories (individual, joint, IRA, trust) at one bank, or buy brokered CDs from several issuers inside one brokerage account. Each route multiplies your coverage.",
      },
    ],
  },
];

guides.push(...newGuides);
guides.forEach(applyExpansion);

export const getGuide = (slug) => guides.find((g) => g.slug === slug);
