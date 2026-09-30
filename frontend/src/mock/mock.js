// Mock data for Cavicord — will be replaced by backend API later

export const BRAND = {
  name: "Cavicord",
  tagline: "Find the Best CD Rates Across America",
};

// term is in months
export const cdRates = [
  // 6 months
  { id: 1, bank: "Bask Bank", apy: 4.65, minDeposit: 1000, termMonths: 6, penalty: "90 days of interest", best: true, color: "#2563eb" },
  { id: 2, bank: "Marcus by Goldman Sachs", apy: 4.6, minDeposit: 500, termMonths: 6, penalty: "90 days of interest", color: "#0f766e" },
  { id: 3, bank: "Ally Bank", apy: 4.4, minDeposit: 0, termMonths: 6, penalty: "60 days of interest", color: "#7c3aed" },
  { id: 4, bank: "Synchrony Bank", apy: 4.35, minDeposit: 0, termMonths: 6, penalty: "90 days of interest", color: "#b45309" },
  { id: 5, bank: "Discover Bank", apy: 4.25, minDeposit: 2500, termMonths: 6, penalty: "3 months of interest", color: "#ea580c" },
  // 12 months
  { id: 6, bank: "Marcus by Goldman Sachs", apy: 4.75, minDeposit: 500, termMonths: 12, penalty: "270 days of interest", best: true, color: "#0f766e" },
  { id: 7, bank: "Ally Bank", apy: 4.5, minDeposit: 0, termMonths: 12, penalty: "150 days of interest", color: "#7c3aed" },
  { id: 8, bank: "Barclays", apy: 4.4, minDeposit: 0, termMonths: 12, penalty: "90 days of interest", color: "#0284c7" },
  { id: 9, bank: "Capital One", apy: 4.3, minDeposit: 0, termMonths: 12, penalty: "6 months of interest", color: "#dc2626" },
  { id: 10, bank: "Discover Bank", apy: 4.25, minDeposit: 2500, termMonths: 12, penalty: "6 months of interest", color: "#ea580c" },
  // 24 months
  { id: 11, bank: "Bread Savings", apy: 4.35, minDeposit: 1500, termMonths: 24, penalty: "180 days of interest", best: true, color: "#9333ea" },
  { id: 12, bank: "Barclays", apy: 4.2, minDeposit: 0, termMonths: 24, penalty: "180 days of interest", color: "#0284c7" },
  { id: 13, bank: "Ally Bank", apy: 4.1, minDeposit: 0, termMonths: 24, penalty: "150 days of interest", color: "#7c3aed" },
  { id: 14, bank: "Capital One", apy: 4.05, minDeposit: 0, termMonths: 24, penalty: "6 months of interest", color: "#dc2626" },
  { id: 15, bank: "Synchrony Bank", apy: 4.0, minDeposit: 0, termMonths: 24, penalty: "180 days of interest", color: "#b45309" },
  // 36 months
  { id: 16, bank: "Quontic Bank", apy: 4.25, minDeposit: 500, termMonths: 36, penalty: "2 years of interest", best: true, color: "#059669" },
  { id: 17, bank: "Bread Savings", apy: 4.15, minDeposit: 1500, termMonths: 36, penalty: "365 days of interest", color: "#9333ea" },
  { id: 18, bank: "Barclays", apy: 4.1, minDeposit: 0, termMonths: 36, penalty: "180 days of interest", color: "#0284c7" },
  { id: 19, bank: "Ally Bank", apy: 4.0, minDeposit: 0, termMonths: 36, penalty: "150 days of interest", color: "#7c3aed" },
  { id: 20, bank: "Discover Bank", apy: 3.95, minDeposit: 2500, termMonths: 36, penalty: "6 months of interest", color: "#ea580c" },
  // 60 months
  { id: 21, bank: "BMO Alto", apy: 4.2, minDeposit: 0, termMonths: 60, penalty: "180 days of interest", best: true, color: "#1d4ed8" },
  { id: 22, bank: "Bread Savings", apy: 4.15, minDeposit: 1500, termMonths: 60, penalty: "365 days of interest", color: "#9333ea" },
  { id: 23, bank: "Barclays", apy: 4.05, minDeposit: 0, termMonths: 60, penalty: "180 days of interest", color: "#0284c7" },
  { id: 24, bank: "Capital One", apy: 4.0, minDeposit: 0, termMonths: 60, penalty: "6 months of interest", color: "#dc2626" },
  { id: 25, bank: "Synchrony Bank", apy: 3.9, minDeposit: 0, termMonths: 60, penalty: "365 days of interest", color: "#b45309" },
];

export const termTabs = [
  { label: "All", value: "all" },
  { label: "3 months", value: "3" },
  { label: "6 months", value: "6" },
  { label: "12 months", value: "12" },
  { label: "18 months", value: "18" },
  { label: "2 years", value: "24" },
  { label: "3 years", value: "36" },
  { label: "5 years", value: "60" },
];

export const formatTerm = (months) => {
  if (months < 12 || months % 12 !== 0) return `${months} months`;
  const years = months / 12;
  return years === 1 ? "12 months" : `${years} years`;
};

export const whyCds = [
  {
    icon: "ShieldCheck",
    title: "FDIC Insured",
    description:
      "Your deposits are protected up to $250,000 per depositor, per bank by the Federal Deposit Insurance Corporation.",
  },
  {
    icon: "Lock",
    title: "Guaranteed Returns",
    description:
      "Lock in your rate at the time of deposit. Unlike stocks, your CD rate won't fluctuate with market conditions.",
  },
  {
    icon: "PiggyBank",
    title: "Principal Protection",
    description:
      "Your initial deposit is never at risk. CDs offer one of the safest ways to grow your savings.",
  },
  {
    icon: "TrendingUp",
    title: "Higher Than Savings",
    description:
      "CDs typically offer significantly higher APYs than traditional savings or checking accounts.",
  },
  {
    icon: "CalendarClock",
    title: "Flexible Terms",
    description:
      "Choose terms from 3 months to 5 years to match your financial goals and liquidity needs.",
  },
  {
    icon: "LineChart",
    title: "Predictable Growth",
    description:
      "Know exactly how much you'll earn before you invest. Perfect for conservative financial planning.",
  },
];

export const faqs = [
  {
    question: "What is a Certificate of Deposit (CD)?",
    answer:
      "A certificate of deposit is a savings product offered by banks and credit unions that pays a fixed interest rate on money held for an agreed-upon period of time. In exchange for keeping your funds deposited for the full term, you typically earn a higher APY than a standard savings account.",
  },
  {
    question: "Are CDs safe investments?",
    answer:
      "Yes. CDs from FDIC-insured banks are protected up to $250,000 per depositor, per institution. Your principal and earned interest are guaranteed as long as you stay within insurance limits, making CDs one of the lowest-risk places to grow your money.",
  },
  {
    question: "What happens if I withdraw early?",
    answer:
      "Most CDs charge an early withdrawal penalty, usually a set number of days or months of earned interest. The penalty varies by bank and term length. Some banks offer no-penalty CDs that allow you to withdraw without a fee, typically at a slightly lower APY.",
  },
  {
    question: "How are CD interest rates determined?",
    answer:
      "CD rates are influenced by the federal funds rate set by the Federal Reserve, competition among banks, and the term length you choose. When the Fed raises rates, CD yields generally rise, and online banks often pay more than traditional branches because of lower overhead.",
  },
  {
    question: "What is a CD ladder?",
    answer:
      "A CD ladder is a strategy where you split your money across multiple CDs with staggered maturity dates — for example 1, 2, 3, 4, and 5 years. As each CD matures, you reinvest it into a new long-term CD. This gives you regular access to a portion of your funds while capturing higher long-term rates.",
  },
  {
    question: "What is APY and how is it different from the interest rate?",
    answer:
      "APY (annual percentage yield) is the total return you earn in one year including compounding, while the interest rate is the base rate before compounding. Because most CDs compound daily or monthly, the APY is slightly higher than the stated rate — it's the number to use when comparing CDs, since all banks must calculate it the same way.",
  },
  {
    question: "How is CD interest calculated?",
    answer:
      "CD interest compounds on a schedule set by the bank — usually daily or monthly. Your balance grows as earned interest is added to the principal, and future interest is calculated on the larger amount. A $10,000 CD at 4.75% APY earns about $475 in the first year; over longer terms, compounding accelerates the growth.",
  },
  {
    question: "Does Cavicord offer CDs directly?",
    answer:
      "No. Cavicord is an independent comparison resource. We research and compare rates from top FDIC-insured banks so you can find the best CD for your goals. To open a CD, you'll apply directly with the bank of your choice.",
  },
];
