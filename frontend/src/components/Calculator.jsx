import React, { useState, useMemo } from "react";
import { Slider } from "./ui/slider";
import { Calculator as CalcIcon, Sparkles } from "lucide-react";
import { formatTerm } from "../mock/mock";

const termOptions = [6, 12, 24, 36, 60];

const Calculator = ({ rates = [] }) => {
  const [deposit, setDeposit] = useState(10000);
  const [term, setTerm] = useState(12);

  const bestRate = useMemo(() => {
    const list = rates.filter((r) => r.term_months === term);
    if (list.length === 0) return null;
    return list.reduce((a, b) => (a.apy > b.apy ? a : b), list[0]);
  }, [term, rates]);

  const earnings = useMemo(() => {
    if (!bestRate) return { interest: 0, total: deposit };
    const years = term / 12;
    const total = deposit * Math.pow(1 + bestRate.apy / 100, years);
    return { interest: total - deposit, total };
  }, [deposit, term, bestRate]);

  const fmt = (v) =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section id="calculator" className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> New
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-[#16233d]">
            CD Earnings Calculator
          </h2>
          <p className="mt-4 text-slate-500">
            See exactly how much your money could grow with today's best rates.
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-2 text-[#16233d] font-semibold mb-8">
              <CalcIcon className="w-5 h-5 text-emerald-600" />
              Your Investment
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-600">Deposit Amount</label>
                <span className="text-lg font-bold text-[#16233d]">{fmt(deposit)}</span>
              </div>
              <Slider
                value={[deposit]}
                min={500}
                max={250000}
                step={500}
                onValueChange={(v) => setDeposit(v[0])}
                className="[&_[role=slider]]:bg-emerald-600 [&_[role=slider]]:border-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>$500</span>
                <span>$250,000</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 block mb-3">Term Length</label>
              <div className="flex flex-wrap gap-2">
                {termOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTerm(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      term === t
                        ? "bg-[#16233d] text-white shadow"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {formatTerm(t)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl calc-result-bg p-8 text-white flex flex-col justify-between shadow-lg">
            <div>
              <p className="text-sm text-slate-300">
                Best available rate for {formatTerm(term)}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-emerald-400">
                  {bestRate ? bestRate.apy.toFixed(2) : "\u2014"}%
                </span>
                <span className="text-sm text-slate-400">APY</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {bestRate ? `via ${bestRate.bank}` : "Loading rates\u2026"}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-sm text-slate-300">Initial Deposit</span>
                <span className="font-semibold">{fmt(deposit)}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-sm text-slate-300">Interest Earned</span>
                <span className="font-semibold text-emerald-400">+{fmt(earnings.interest)}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-slate-300">Total at Maturity</span>
                <span className="text-2xl font-bold">{fmt(earnings.total)}</span>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-slate-500 leading-relaxed">
              Estimate assumes annual compounding and no early withdrawal. Actual
              earnings may vary by bank compounding schedule.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
