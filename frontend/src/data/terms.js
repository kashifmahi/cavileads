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
    sections: [
      { heading: "Who a 3-month CD is for", body: "A 3-month CD suits money with a known job in the next few months: a tax bill, a tuition payment, a home closing, or cash you're holding while you decide what to do next. You get a fixed APY for the whole term, which a savings account can't promise, since savings rates can change any day. When the yield curve is flat or inverted, short CDs sometimes pay as much as, or more than, longer terms, so they're worth checking even if you could lock up money for longer." },
      { heading: "3-month CD vs high-yield savings", body: "The trade-off is certainty against access. A high-yield savings account lets you withdraw anytime, but its rate floats. A 3-month CD locks the rate but charges a penalty to withdraw early. If the CD's APY is only slightly above the best savings rate, the savings account usually wins on flexibility. If the gap is meaningful and you're sure you won't need the money for 90 days, the CD earns more." },
      { heading: "Early withdrawal penalties and renewal", body: "Penalties on short CDs are commonly one to three months of interest, which on a 3-month term can wipe out most of what you've earned. At maturity most banks give a 7–10 day grace period, then automatically renew into another CD at whatever rate applies that day. Set a reminder so you can compare rates before it rolls over." },
    ],
    faqs: [
      { q: "Is a 3-month CD worth it?", a: "It's worth it when the APY beats your savings account by enough to justify locking the money for three months, and you're confident you won't need it sooner." },
      { q: "Can you lose money in a 3-month CD?", a: "Not from market moves, since FDIC or NCUA insurance protects deposits up to $250,000 per depositor, per bank. Withdrawing early can cost some interest, and at some banks part of your principal." },
      { q: "What happens when a 3-month CD matures?", a: "You get a short grace period, usually 7 to 10 days, to withdraw or change terms. If you do nothing, most banks renew it automatically." },
    ],
    related: [
      { to: "/guides/cd-vs-high-yield-savings", label: "CD vs high-yield savings" },
      { to: "/articles/what-happens-when-a-cd-matures", label: "What happens when a CD matures" },
      { to: "/guides/cd-vs-treasury-bills", label: "CDs vs Treasury bills" },
      { to: "/cd-early-withdrawal-penalty-calculator", label: "CD early withdrawal penalty calculator" },
    ],
  },
  {
    slug: "best-18-month-cd-rates",
    term: "18",
    rateType: "standard",
    title: "Best 18-Month CD Rates",
    heading: "Best 18-Month CD Rates",
    description:
      "Eighteen-month CDs sit in a sweet spot: meaningfully higher commitment than a 1-year CD without locking funds for two full years. They're popular with savers who expect rate cuts and want to extend today's yield a little further.",
    sections: [
      { heading: "Why consider an 18-month CD", body: "Eighteen months is a non-standard term, and banks often use odd terms for promotional rates, so an 18-month CD sometimes pays more than the 12- or 24-month CDs at the same bank. It also extends a rate past a single year without tying up money for two, which is useful if you expect rates to fall but want access sooner than a 2-year CD allows." },
      { heading: "Locking a rate before Fed cuts", body: "When the Federal Reserve cuts rates, banks lower the APYs on new CDs, often within days. A CD you've already opened keeps its rate until maturity. An 18-month term carries today's yield through several Fed meetings, which is the main reason savers choose it when cuts are expected." },
      { heading: "What early withdrawal costs", body: "Penalties on terms between one and two years are commonly around six months of interest, though some banks charge more. Check the disclosure before opening, and run your numbers through the penalty calculator if there's any chance you'll need the money early." },
    ],
    faqs: [
      { q: "Are 18-month CD rates higher than 1-year rates?", a: "Sometimes. Banks price odd terms as promotions, so compare the 18-month APY with 12- and 24-month terms at the same bank before choosing." },
      { q: "Is an 18-month CD a good idea if rates are falling?", a: "It can be: it holds today's APY for a year and a half, longer than a 1-year CD, while keeping the commitment shorter than a 2-year term." },
      { q: "Can I add money to an 18-month CD?", a: "Most CDs accept one deposit at opening. A few add-on CDs allow extra deposits, usually at a lower APY." },
    ],
    related: [
      { to: "/articles/fed-rate-cuts-and-cd-rates", label: "How Fed rate cuts affect CD rates" },
      { to: "/guides/cd-ladder-explained", label: "How a CD ladder works" },
      { to: "/articles/can-you-add-money-to-a-cd", label: "Can you add money to a CD?" },
      { to: "/cd-early-withdrawal-penalty-calculator", label: "CD early withdrawal penalty calculator" },
    ],
  },
  {
    slug: "best-2-year-cd-rates",
    term: "24",
    rateType: "standard",
    title: "Best 2-Year CD Rates",
    heading: "Best 2-Year CD Rates",
    description:
      "Two-year CDs let you lock in today's rates through potential Federal Reserve cuts. If you believe rates are heading lower, extending your term protects your yield for longer \u2014 a popular middle rung in CD ladders.",
    sections: [
      { heading: "When a 2-year CD makes sense", body: "A 2-year CD fits a goal that's a couple of years out, or the middle rung of a CD ladder. Compare it with the best 1-year rate. If the 2-year APY is only slightly higher, you're giving up a year of flexibility for little extra. If 1-year rates are higher, which happens late in a rate cycle, you take on reinvestment risk: the chance that rates are lower when your 1-year CD matures." },
      { heading: "Taxes on multi-year CDs", body: "CD interest is taxed as ordinary income in the year it's credited to your account, even if it stays in the CD until maturity. On a 2-year CD you'll usually get a 1099-INT for each year. Holding CDs in an IRA defers the tax." },
      { heading: "Early withdrawal penalties", body: "Two-year CDs commonly carry penalties of six to twelve months of interest. If you withdraw in the first months, the penalty can exceed the interest earned and reduce your principal. The penalty calculator shows the break-even point for your deposit." },
    ],
    faqs: [
      { q: "Should I get a 1-year or 2-year CD?", a: "Pick the 2-year if its APY is competitive and you expect rates to fall. Pick the 1-year if rates are similar or you might need the money sooner." },
      { q: "Do I pay tax on CD interest before maturity?", a: "Generally yes. Interest is taxable in the year it's credited, even if you don't withdraw it." },
      { q: "Are 2-year CDs FDIC insured?", a: "Yes, at FDIC-member banks, up to $250,000 per depositor, per bank, per ownership category. Credit union CDs are covered by NCUA." },
    ],
    related: [
      { to: "/guides/cd-ladder-explained", label: "How a CD ladder works" },
      { to: "/articles/how-is-cd-interest-taxed", label: "How CD interest is taxed" },
      { to: "/guides/i-bonds-vs-cds", label: "I bonds vs CDs" },
      { to: "/articles/cds-vs-bonds", label: "CDs vs bonds" },
      { to: "/cd-early-withdrawal-penalty-calculator", label: "CD early withdrawal penalty calculator" },
    ],
  },
  {
    slug: "best-3-year-cd-rates",
    term: "36",
    rateType: "standard",
    title: "Best 3-Year CD Rates",
    heading: "Best 3-Year CD Rates",
    description:
      "Three-year CDs balance rate security with flexibility. They're a core building block for CD ladders and suit savers with a medium-term goal \u2014 a house down payment, tuition, or a planned large purchase.",
    sections: [
      { heading: "Matching a 3-year CD to a goal", body: "A 3-year CD works best when the money has a date attached: a down payment, a car, or tuition a few years away. You know exactly what you'll have at maturity, and the deposit is protected by FDIC or NCUA insurance up to the limits, unlike a bond fund whose value can fall before you need it." },
      { heading: "3-year CDs vs bonds and Treasuries", body: "Treasury notes of similar maturity are exempt from state income tax and can be sold before maturity, which matters in high-tax states. Bank CDs can't be sold, but they often pay competitive APYs. Brokered CDs sit in between: they can be sold on a secondary market, though their price can be below what you paid if rates have risen." },
      { heading: "The cost of breaking a 3-year CD", body: "Penalties on terms of three years or longer are often twelve months of interest, sometimes more. Before opening, check the penalty and consider splitting the deposit across shorter terms if you might need part of it early." },
    ],
    faqs: [
      { q: "Is a 3-year CD a good investment?", a: "It's a good fit for money you won't need for three years and want protected from market swings. Compare the APY with Treasury yields of a similar maturity." },
      { q: "What is the penalty for cashing out a 3-year CD early?", a: "It varies by bank, but twelve months of interest is common for multi-year terms. The bank's account disclosure states the exact amount." },
      { q: "Are brokered CDs better than bank CDs?", a: "Brokered CDs can be sold before maturity instead of paying a penalty, but the sale price may be lower than face value. Bank CDs are simpler and have a fixed penalty." },
    ],
    related: [
      { to: "/articles/cds-vs-bonds", label: "CDs vs bonds" },
      { to: "/guides/cd-vs-treasury-bills", label: "CDs vs Treasury bills" },
      { to: "/guides/brokered-vs-bank-cds", label: "Brokered vs bank CDs" },
      { to: "/guides/cds-vs-bond-funds", label: "CDs vs bond funds" },
      { to: "/cd-early-withdrawal-penalty-calculator", label: "CD early withdrawal penalty calculator" },
    ],
  },
  {
    slug: "best-5-year-cd-rates",
    term: "60",
    rateType: "standard",
    title: "Best 5-Year CD Rates",
    heading: "Best 5-Year CD Rates",
    description:
      "Five-year CDs maximize rate certainty. Lock in a strong APY now and it's guaranteed for half a decade regardless of what the Fed does \u2014 the anchor rung of any long-term CD ladder strategy.",
    sections: [
      { heading: "Who should lock in a 5-year CD", body: "A 5-year CD suits savers who want a guaranteed return for a long stretch: retirees building predictable income, or anyone who expects rates to fall and wants to keep today's APY. It is the anchor rung of most CD ladders, since each maturing rung is typically reinvested in a new 5-year CD." },
      { heading: "The risk on the other side", body: "The trade-off is opportunity cost. If rates rise after you open a 5-year CD, your money stays at the lower rate unless you pay the penalty to get out. Inflation is the other risk: a fixed APY loses purchasing power if prices rise faster than your rate." },
      { heading: "Penalties and ways around them", body: "Five-year CDs carry the largest penalties, often twelve months of interest or more. Two ways to keep flexibility: build a ladder so part of your money matures every year, or use a brokered CD that can be sold before maturity, accepting that its price can fall if rates rise." },
    ],
    faqs: [
      { q: "Are 5-year CDs a good idea right now?", a: "They make sense if the APY is competitive and you expect rates to stay flat or fall. If you think rates will rise, shorter terms or a ladder keep your options open." },
      { q: "How much is the penalty on a 5-year CD?", a: "Commonly twelve months of interest or more, depending on the bank. Use the penalty calculator with your bank's stated penalty to see the cost." },
      { q: "Can I use a 5-year CD in an IRA?", a: "Yes. Many banks offer IRA CDs, which defer tax on the interest until you withdraw from the IRA." },
    ],
    related: [
      { to: "/cd-for-retirement", label: "CDs for retirement savings" },
      { to: "/articles/fed-rate-cuts-and-cd-rates", label: "How Fed rate cuts affect CD rates" },
      { to: "/articles/cd-vs-annuity", label: "CD vs annuity" },
      { to: "/guides/cd-vs-treasury-bonds", label: "CDs vs Treasury bonds" },
      { to: "/cd-early-withdrawal-penalty-calculator", label: "CD early withdrawal penalty calculator" },
    ],
  },
  {
    slug: "no-penalty-cd-rates",
    term: "all",
    rateType: "no_penalty",
    title: "Best No-Penalty CD Rates",
    heading: "Best No-Penalty CD Rates",
    description:
      "No-penalty CDs let you withdraw your full balance \u2014 principal and earned interest \u2014 anytime after the first week, with zero fee. You trade a slightly lower APY for full flexibility: the best of a CD and a savings account combined.",
    sections: [
      { heading: "How no-penalty CDs work", body: "A no-penalty CD locks your APY for the full term but lets you withdraw your whole balance, with the interest earned, without a fee. Federal rules require a waiting period after funding, usually the first six or seven days, before you can withdraw. Most banks only allow withdrawing the entire balance at once, which closes the CD, rather than partial withdrawals." },
      { heading: "No-penalty CD vs high-yield savings", body: "Both give you access to your money, but a no-penalty CD fixes the rate for the term while a savings account's rate can drop at any time. No-penalty CDs often pay a little less than standard CDs of the same length, and sometimes less than the best savings accounts, so compare the current APYs before choosing." },
      { heading: "When to choose one", body: "No-penalty CDs work well for part of an emergency fund, or for money you're parking while you watch where rates go. If rates rise, you can withdraw and move to a higher-paying CD. If they fall, you keep the locked rate." },
    ],
    faqs: [
      { q: "Can you withdraw from a no-penalty CD anytime?", a: "After the initial waiting period, usually the first week, yes. Most banks require you to withdraw the full balance, which closes the CD." },
      { q: "Do no-penalty CDs pay less than regular CDs?", a: "Usually slightly less than standard CDs of the same term, in exchange for the flexibility. Compare against the best regular CDs and savings accounts." },
      { q: "Are no-penalty CDs FDIC insured?", a: "Yes, at FDIC-member banks, up to $250,000 per depositor, per bank, per ownership category." },
    ],
    related: [
      { to: "/articles/no-penalty-cd-guide", label: "No-penalty CD guide" },
      { to: "/guides/cd-vs-high-yield-savings", label: "CD vs high-yield savings" },
      { to: "/articles/cd-early-withdrawal-penalty", label: "CD early withdrawal penalties explained" },
      { to: "/cd-early-withdrawal-penalty-calculator", label: "CD early withdrawal penalty calculator" },
    ],
  },
];

// Nav links for "Best Rates" menus — mixes term pages and canonical landing pages
export const rateNavLinks = [
  { slug: "best-3-month-cd-rates", title: "Best 3-Month CD Rates" },
  { slug: "best-6-month-cd-rates", title: "Best 6-Month CD Rates" },
  { slug: "best-1-year-cd-rates", title: "Best 1-Year CD Rates" },
  { slug: "best-18-month-cd-rates", title: "Best 18-Month CD Rates" },
  { slug: "best-2-year-cd-rates", title: "Best 2-Year CD Rates" },
  { slug: "best-3-year-cd-rates", title: "Best 3-Year CD Rates" },
  { slug: "best-5-year-cd-rates", title: "Best 5-Year CD Rates" },
  { slug: "high-yield-cd-rates", title: "High-Yield CD Rates" },
  { slug: "jumbo-cd-rates", title: "Jumbo CD Rates" },
  { slug: "no-penalty-cd-rates", title: "Best No-Penalty CD Rates" },
  { slug: "cd-rates-for-seniors", title: "CD Rates for Seniors" },
];

export const getTermPage = (slug) => termPages.find((p) => p.slug === slug);
