// Configuration for dedicated SEO term pages

export const monthYear = () =>
  new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const termPages = [
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
];

// Nav links for "Best Rates" menus — mixes term pages and canonical landing pages
export const rateNavLinks = [
  { slug: "best-6-month-cd-rates", title: "Best 6-Month CD Rates" },
  { slug: "best-1-year-cd-rates", title: "Best 1-Year CD Rates" },
  { slug: "best-18-month-cd-rates", title: "Best 18-Month CD Rates" },
  { slug: "best-2-year-cd-rates", title: "Best 2-Year CD Rates" },
  { slug: "high-yield-cd-rates", title: "High-Yield CD Rates" },
  { slug: "jumbo-cd-rates", title: "Jumbo CD Rates" },
  { slug: "cd-rates-for-seniors", title: "CD Rates for Seniors" },
];

export const getTermPage = (slug) => termPages.find((p) => p.slug === slug);
