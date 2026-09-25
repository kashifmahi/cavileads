import React, { useState, useMemo } from "react";
import { Slider } from "./ui/slider";
import { Layers, ArrowDown } from "lucide-react";
import { formatTerm } from "../mock/mock";

const LADDER_TERMS = [12, 24, 36, 48, 60];

const LadderBuilder = ({ rates = [] }) => {
  const [total, setTotal] = useState(25000);
  const [rungs, setRungs] = useState(5);

  const ladder = useMemo(() => {
    const terms = LADDER_TERMS.slice(0, rungs);
    const perRung = total / terms.length;
    return terms.map((term) => {
      // Use best rate for exact term, else nearest available term
      const exact = rates.filter((r) => r.term_months === term);
      let best = exact.length
        ? exact.reduce((a, b) => (a.apy > b.apy ? a : b))
        : null;
      if (!best && rates.length) {
        const sorted = [...rates].sort(
          (a, b) => Math.abs(a.term_months - term) - Math.abs(b.term_months - term) || b.apy - a.apy
        );
        best = sorted[0];
      }
      const apy = best ? best.apy : 0;
      const years = term / 12;
      const value = perRung * Math.pow(1 + apy / 100, years);
      return { term, amount: perRung, apy, bank: best?.bank || "\u2014", value, interest: value - perRung };
    });
  }, [total, rungs, rates]);

  const totals = useMemo(
    () => ladder.reduce((acc, r) => ({ interest: acc.interest + r.interest, value: acc.value + r.value }), { interest: 0, value: 0 }),
    [ladder]
  );

  const fmt = (v) =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section id="ladder" className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
            <Layers className="w-3.5 h-3.5" /> Free Tool
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-[#16233d]">
            CD Ladder Builder
          </h2>
          <p className="mt-4 text-slate-500">
            Split your savings across staggered maturities — regular access to your
            money while capturing long-term rates.
          </p>
        </div>

        <div className="mt-12 max-w-5xl mx-auto">
          {/* Controls */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-600">Total to Invest</label>
                <span className="text-lg font-bold text-[#16233d]">{fmt(total)}</span>
              </div>
              <Slider
                value={[total]}
                min={1000}
                max={250000}
                step={1000}
                onValueChange={(v) => setTotal(v[0])}
                className="[&_[role=slider]]:bg-emerald-600 [&_[role=slider]]:border-emerald-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 block mb-3">Number of Rungs</label>
              <div className="flex gap-2">
                {[2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRungs(n)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      rungs === n
                        ? "bg-[#16233d] text-white shadow"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rungs */}
          <div className="mt-8 grid gap-3">
            {ladder.map((rung, i) => (
              <div
                key={rung.term}
                className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200 transition-colors duration-200"
                style={{ marginLeft: `${i * 2}%` }}
              >
                <div className="flex items-center gap-3 sm:w-44">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-[#16233d] text-sm">{formatTerm(rung.term)}</p>
                    <p className="text-xs text-slate-400">matures year {Math.ceil(rung.term / 12)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 text-sm">
                  <div>
                    <p className="text-xs text-slate-400">Deposit</p>
                    <p className="font-semibold text-[#16233d]">{fmt(rung.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Best APY</p>
                    <p className="font-semibold text-emerald-600">{rung.apy.toFixed(2)}%</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-slate-400">Via</p>
                    <p className="font-medium text-slate-600 truncate">{rung.bank}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">At Maturity</p>
                    <p className="font-bold text-[#16233d]">{fmt(rung.value)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 rounded-2xl calc-result-bg p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ArrowDown className="w-5 h-5 text-emerald-400" />
              <p className="text-sm text-slate-300">
                As each rung matures, reinvest into a new {formatTerm(LADDER_TERMS[rungs - 1])} CD to keep the ladder rolling.
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-slate-400 uppercase tracking-wide">Total projected interest</p>
              <p className="text-2xl font-bold text-emerald-400">+{fmt(totals.interest)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LadderBuilder;
