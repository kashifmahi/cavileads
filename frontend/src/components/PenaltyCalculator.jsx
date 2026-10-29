import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator as CalcIcon, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// CD early-withdrawal penalty estimator.
// Most US banks state the penalty as N months (or days) of interest at the CD's rate on the
// amount withdrawn. Interest earned so far is compounded at the APY; the penalty is simple
// interest for the stated period. Both are estimates — the bank's disclosure is the authority.

const TERM_OPTIONS = [3, 6, 9, 12, 18, 24, 36, 48, 60];

// A starting point only, shown as a suggestion the user can change.
const suggestedPenaltyMonths = (termMonths) => {
  if (termMonths <= 6) return 3;
  if (termMonths <= 24) return 6;
  return 12;
};

const fmt = (v) =>
  (v < 0 ? "−" : "") +
  Math.abs(v).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const num = (v, fallback = 0) => {
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : fallback;
};

const PenaltyCalculator = () => {
  const [deposit, setDeposit] = useState("10000");
  const [apy, setApy] = useState("4.00");
  const [term, setTerm] = useState(12);
  const [held, setHeld] = useState("4");
  const [penaltyMonths, setPenaltyMonths] = useState("6");
  const [touchedPenalty, setTouchedPenalty] = useState(false);

  const onTerm = (t) => {
    setTerm(t);
    if (!touchedPenalty) setPenaltyMonths(String(suggestedPenaltyMonths(t)));
    if (num(held) >= t) setHeld(String(Math.max(0, t - 1)));
  };

  const r = useMemo(() => {
    const P = Math.max(0, num(deposit));
    const rate = Math.max(0, num(apy)) / 100;
    const h = Math.min(Math.max(0, num(held)), term);
    const pm = Math.max(0, num(penaltyMonths));
    const earned = P * (Math.pow(1 + rate, h / 12) - 1);
    const penalty = P * rate * (pm / 12);
    const net = earned - penalty;
    const payout = P + net;
    const fullTerm = P * (Math.pow(1 + rate, term / 12) - 1);
    // months held before the interest earned covers the penalty
    const breakEven = rate > 0 ? 12 * Math.log(1 + rate * (pm / 12)) / Math.log(1 + rate) : 0;
    return { P, h, earned, penalty, net, payout, fullTerm, breakEven };
  }, [deposit, apy, term, held, penaltyMonths]);

  const eatsPrincipal = r.net < 0;

  return (
    <section className="bg-slate-50 py-14 sm:py-16" data-testid="penalty-calculator">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
          <div className="flex items-center gap-2 text-[#16233d] font-semibold mb-6">
            <CalcIcon className="w-5 h-5 text-emerald-600" /> Your CD
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="pc-deposit">Amount in the CD ($)</Label>
              <Input id="pc-deposit" inputMode="decimal" value={deposit} onChange={(e) => setDeposit(e.target.value)} data-testid="pc-deposit" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="pc-apy">APY (%)</Label>
              <Input id="pc-apy" inputMode="decimal" value={apy} onChange={(e) => setApy(e.target.value)} data-testid="pc-apy" />
            </div>
          </div>

          <div className="mt-5">
            <Label>CD term</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TERM_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTerm(t)}
                  aria-pressed={term === t}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    term === t ? "bg-[#16233d] text-white border-[#16233d]" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {t < 12 || t % 12 ? `${t} mo` : `${t / 12} yr`}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pc-held">Months held so far</Label>
              <Input id="pc-held" inputMode="numeric" value={held} onChange={(e) => setHeld(e.target.value)} data-testid="pc-held" />
            </div>
            <div>
              <Label htmlFor="pc-penalty">Penalty (months of interest)</Label>
              <Input
                id="pc-penalty"
                inputMode="decimal"
                value={penaltyMonths}
                onChange={(e) => { setTouchedPenalty(true); setPenaltyMonths(e.target.value); }}
                data-testid="pc-penalty"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            Penalty pre-filled with a common amount for this term. Your bank's account disclosure states the
            exact figure. If it's given in days, divide by 30.
          </p>
        </div>

        {/* Results */}
        <div className="rounded-2xl calc-result-bg p-7 text-white flex flex-col">
          <div className="text-sm uppercase tracking-wider text-slate-300">If you withdraw now</div>
          <div className="mt-2 text-4xl font-bold" data-testid="pc-payout">{fmt(r.payout)}</div>
          <div className="mt-1 text-sm text-slate-300">paid out on {fmt(r.P)} deposited</div>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-slate-300">Interest earned so far</dt><dd className="font-semibold">{fmt(r.earned)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-300">Early withdrawal penalty</dt><dd className="font-semibold text-amber-300" data-testid="pc-penalty-amount">{fmt(-r.penalty)}</dd></div>
            <div className="flex justify-between border-t border-white/15 pt-3"><dt className="text-slate-300">Net gain or loss</dt><dd className={`font-semibold ${eatsPrincipal ? "text-red-300" : "text-emerald-300"}`} data-testid="pc-net">{fmt(r.net)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-300">Interest if held to maturity</dt><dd className="font-semibold">{fmt(r.fullTerm)}</dd></div>
          </dl>

          <div className={`mt-6 rounded-xl p-4 text-sm leading-relaxed ${eatsPrincipal ? "bg-red-500/15" : "bg-emerald-500/15"}`}>
            {eatsPrincipal ? (
              <p className="flex gap-2"><AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />The penalty is larger than the interest earned, so it cuts into your principal by {fmt(-r.net)}.</p>
            ) : (
              <p className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />You keep your principal plus {fmt(r.net)} of interest after the penalty.</p>
            )}
            <p className="mt-2 text-slate-200">Break-even: after about {r.breakEven.toFixed(1)} months, the interest earned covers this penalty.</p>
          </div>

          <Link
            to="/no-penalty-cd-rates"
            className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
          >
            Avoid the penalty: compare no-penalty CD rates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PenaltyCalculator;
