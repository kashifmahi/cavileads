// Non-callable brokered CD options displayed before a visitor submits an inquiry.
// Issuer details are shared by a Cavicord specialist after the form is completed.
export const BROKERED_OPTIONS = [
  { id: "b60a", apy: 5.6, termMonths: 60, min: 500000, schedule: "Semi-annually", availability: "Limited" },
  { id: "b60b", apy: 5.45, termMonths: 60, min: 250000, schedule: "Semi-annually", availability: "Available" },
  { id: "b48a", apy: 5.38, termMonths: 48, min: 500000, schedule: "Semi-annually", availability: "Limited" },
  { id: "b48b", apy: 5.2, termMonths: 48, min: 100000, schedule: "Semi-annually", availability: "Available" },
  { id: "b36a", apy: 5.1, termMonths: 36, min: 500000, schedule: "Semi-annually", availability: "Limited" },
  { id: "b36b", apy: 4.92, termMonths: 36, min: 100000, schedule: "Semi-annually", availability: "Available" },
  { id: "b24a", apy: 4.78, termMonths: 24, min: 250000, schedule: "Semi-annually", availability: "Available" },
  { id: "b24b", apy: 4.6, termMonths: 24, min: 50000, schedule: "Semi-annually", availability: "Available" },
  { id: "b18a", apy: 4.52, termMonths: 18, min: 250000, schedule: "Semi-annually", availability: "Available" },
  { id: "b18b", apy: 4.38, termMonths: 18, min: 100000, schedule: "Semi-annually", availability: "Available" },
  { id: "b12a", apy: 4.25, termMonths: 12, min: 500000, schedule: "Monthly", availability: "Limited" },
  { id: "b12b", apy: 4.1, termMonths: 12, min: 250000, schedule: "Monthly", availability: "Limited" },
  { id: "b12c", apy: 3.95, termMonths: 12, min: 100000, schedule: "Monthly", availability: "Available" },
  { id: "b12d", apy: 3.8, termMonths: 12, min: 50000, schedule: "Monthly", availability: "Available" },
  { id: "b9a", apy: 3.62, termMonths: 9, min: 250000, schedule: "Quarterly", availability: "Available" },
  { id: "b9b", apy: 3.48, termMonths: 9, min: 100000, schedule: "Quarterly", availability: "Available" },
  { id: "b9c", apy: 3.35, termMonths: 9, min: 50000, schedule: "At maturity", availability: "Available" },
  { id: "b6a", apy: 3.28, termMonths: 6, min: 250000, schedule: "At maturity", availability: "Limited" },
  { id: "b6b", apy: 3.15, termMonths: 6, min: 100000, schedule: "At maturity", availability: "Available" },
  { id: "b6c", apy: 3.05, termMonths: 6, min: 50000, schedule: "At maturity", availability: "Available" },
];

export const TOP_BROKERED_APY = 5.6;

const addMonths = (months) => {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d;
};

export const maturityDate = (months) =>
  addMonths(months).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const maturityMonthYear = (months) =>
  addMonths(months).toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const asOfDate = () =>
  new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export const termLabel = (m) =>
  m < 12 ? `${m} months` : m % 12 === 0 ? `${m / 12} year${m >= 24 ? "s" : ""}` : `${m} months`;

export const topApyForTerm = (term) => {
  const t = Number(term);
  const match = BROKERED_OPTIONS.filter((o) => o.termMonths === t);
  const pool = match.length ? match : BROKERED_OPTIONS;
  return Math.max(...pool.map((o) => o.apy));
};

// Nearest term supported by the lead form's term dropdown
export const MODAL_TERM_MAP = { 6: 6, 9: 6, 12: 12, 18: 12, 24: 24, 36: 36, 48: 36, 60: 60 };

export const fmtMin = (n) => `$${n.toLocaleString("en-US")}`;
