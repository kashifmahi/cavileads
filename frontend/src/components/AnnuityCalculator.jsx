import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator as CalcIcon, ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// CD vs fixed annuity (MYGA) after-tax comparison.
// CD: interest taxed every year at the marginal rate, so it compounds at APY × (1 − tax).
// Annuity: tax-deferred growth at the guaranteed rate; the whole gain is taxed as ordinary
// income at withdrawal, plus the 10% IRS additional tax on the gain if taken before 59½.
// Excludes state tax, fees and surrender charges — an estimate, not advice.

const fmt = (v) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const num = (v, fallback = 0) => {
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : fallback;
};
const BRACKETS = [10, 12, 22, 24, 32, 35, 37];

const AnnuityCalculator = () => {
  const [amount, setAmount] = useState("100000");
  const [years, setYears] = useState("5");
  const [cdApy, setCdApy] = useState("4.00");
  const [annRate, setAnnRate] = useState("4.50");
  const [tax, setTax] = useState(24);
  const [under59, setUnder59] = useState(false);

  const r = useMemo(() => {
    const P = Math.max(0, num(amount));
    const n = Math.min(Math.max(0, num(years)), 30);
    const c = Math.max(0, num(cdApy)) / 100;
    const a = Math.max(0, num(annRate)) / 100;
    const t = tax / 100;
    const cd = P * Math.pow(1 + c * (1 - t), n);
    const annGross = P * Math.pow(1 + a, n);
    const gain = annGross - P;
    const annTax = gain * t;
    const early = under59 ? gain * 0.1 : 0;
    const ann = annGross - annTax - early;
    return { P, n, cd, annGross, annTax, early, ann, diff: ann - cd };
  }, [amount, years, cdApy, annRate, tax, under59]);

  const winner = Math.abs(r.diff) < 1 ? "tie" : r.diff > 0 ? "annuity" : "cd";

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7" data-testid="annuity-calculator">
      <h2 className="font-serif text-2xl font-bold text-[#16233d] flex items-center gap-2">
        <CalcIcon className="w-6 h-6 text-emerald-600" /> CD vs annuity calculator
      </h2>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        Compare what a CD and a fixed (multi-year guaranteed) annuity leave you with after federal income tax.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="ac-amount">Amount ($)</Label>
          <Input id="ac-amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} data-testid="ac-amount" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="ac-years">Years</Label>
          <Input id="ac-years" inputMode="numeric" value={years} onChange={(e) => setYears(e.target.value)} data-testid="ac-years" />
        </div>
        <div>
          <Label htmlFor="ac-cd">CD APY (%)</Label>
          <Input id="ac-cd" inputMode="decimal" value={cdApy} onChange={(e) => setCdApy(e.target.value)} data-testid="ac-cd" />
        </div>
        <div>
          <Label htmlFor="ac-ann">Annuity rate (%)</Label>
          <Input id="ac-ann" inputMode="decimal" value={annRate} onChange={(e) => setAnnRate(e.target.value)} data-testid="ac-ann" />
        </div>
        <div>
          <Label htmlFor="ac-tax">Federal tax bracket</Label>
          <select
            id="ac-tax"
            value={tax}
            onChange={(e) => setTax(Number(e.target.value))}
            className="mt-1 flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
            data-testid="ac-tax"
          >
            {BRACKETS.map((b) => (
              <option key={b} value={b}>{b}%</option>
            ))}
          </select>
        </div>
        <label className="flex items-end gap-2 pb-2 text-sm text-slate-700">
          <input type="checkbox" checked={under59} onChange={(e) => setUnder59(e.target.checked)} className="h-4 w-4" data-testid="ac-under59" />
          I'll withdraw before age 59½
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`rounded-xl bg-white border p-5 ${winner === "cd" ? "border-emerald-500" : "border-slate-200"}`}>
          <div className="text-xs uppercase tracking-wider text-slate-500">CD after tax</div>
          <div className="mt-1 text-2xl font-bold text-[#16233d]" data-testid="ac-cd-result">{fmt(r.cd)}</div>
          <p className="mt-1 text-xs text-slate-500">Interest taxed each year</p>
        </div>
        <div className={`rounded-xl bg-white border p-5 ${winner === "annuity" ? "border-emerald-500" : "border-slate-200"}`}>
          <div className="text-xs uppercase tracking-wider text-slate-500">Annuity after tax</div>
          <div className="mt-1 text-2xl font-bold text-[#16233d]" data-testid="ac-ann-result">{fmt(r.ann)}</div>
          <p className="mt-1 text-xs text-slate-500">
            {fmt(r.annGross)} before tax − {fmt(r.annTax)} tax{r.early > 0 ? ` − ${fmt(r.early)} early-withdrawal tax` : ""}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-[#16233d]" data-testid="ac-verdict">
        {winner === "tie"
          ? "About the same after tax."
          : `${winner === "cd" ? "The CD" : "The annuity"} comes out about ${fmt(Math.abs(r.diff))} ahead after ${r.n} years.`}
      </p>
      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
        Estimate only: federal tax at a flat bracket, no state tax, fees or surrender charges. A CD is FDIC/NCUA insured to
        $250,000; a fixed annuity is backed by the insurer and state guaranty associations. Not tax or financial advice.
      </p>
      <Link to="/cd-rates" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-700">
        Find today's best CD rates <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
};

export default AnnuityCalculator;
