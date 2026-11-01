import React, { useState, useMemo } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Lock, ShieldCheck, ArrowRight, CalendarClock } from "lucide-react";
import { useRatesModal } from "../context/RatesModalContext";
import {
  BROKERED_OPTIONS,
  maturityDate,
  asOfDate,
  termLabel,
  MODAL_TERM_MAP,
  fmtMin,
} from "../data/brokered";

const TERM_FILTERS = [
  { label: "Any term", value: "all" },
  ...[6, 9, 12, 18, 24].map((m) => ({ label: termLabel(m), value: String(m) })),
];

const DEPOSIT_FILTERS = [
  { label: "Any amount", value: "all" },
  { label: "$50,000 minimum", value: "50000" },
  { label: "$100,000 minimum", value: "100000" },
];

const FREQ_FILTERS = ["Any frequency", "Monthly", "Quarterly", "Semi-annually", "At maturity"];

const BrokeredOptions = ({ filterTerm = "all", id = "rates", className = "" }) => {
  const hasTermMatch = BROKERED_OPTIONS.some((o) => String(o.termMonths) === String(filterTerm));
  const [term, setTerm] = useState(hasTermMatch ? String(filterTerm) : "all");
  const [deposit, setDeposit] = useState("all");
  const [freq, setFreq] = useState("Any frequency");
  const { openRatesModal } = useRatesModal();

  const options = useMemo(() => {
    return BROKERED_OPTIONS.filter((o) => {
      if (term !== "all" && String(o.termMonths) !== term) return false;
      if (deposit !== "all" && o.min !== Number(deposit)) return false;
      if (freq !== "Any frequency" && o.schedule !== freq) return false;
      return true;
    });
  }, [term, deposit, freq]);

  return (
    <section id={id} className={`scroll-mt-24 ${className}`} data-testid="brokered-options">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Current rates</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#16233d]">
          Compare non-callable brokered CD options
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600 leading-relaxed">
          Compare terms, stated maturity dates, APYs, minimum deposits and payment schedules.
          Issuer details are available upon inquiry. All options are non-callable — confirm current
          rates and final terms before investing. Cavicord only compares options and refers your
          inquiry — we are not the broker, dealer or issuer of any CD shown.
        </p>
        <p className="mt-2 text-xs text-slate-500">Rates displayed as of {asOfDate()}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl" data-testid="brokered-filters">
          <Select value={term} onValueChange={setTerm}>
            <SelectTrigger className="h-11" data-testid="brokered-filter-term">
              <SelectValue placeholder="Preferred term" />
            </SelectTrigger>
            <SelectContent>
              {TERM_FILTERS.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={deposit} onValueChange={setDeposit}>
            <SelectTrigger className="h-11" data-testid="brokered-filter-deposit">
              <SelectValue placeholder="Deposit amount" />
            </SelectTrigger>
            <SelectContent>
              {DEPOSIT_FILTERS.map((d) => (
                <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={freq} onValueChange={setFreq}>
            <SelectTrigger className="h-11" data-testid="brokered-filter-frequency">
              <SelectValue placeholder="Interest frequency" />
            </SelectTrigger>
            <SelectContent>
              {FREQ_FILTERS.map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="mt-3 text-sm text-slate-500" data-testid="brokered-count">
          {options.length} option{options.length !== 1 ? "s" : ""} match the selected filters.
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((o) => (
            <div
              key={o.id}
              data-testid={`brokered-card-${o.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge className="bg-[#16233d] text-white hover:bg-[#16233d] border-0 text-[10px]">
                  Non-callable
                </Badge>
                <Badge
                  className={`border-0 text-[10px] ${
                    o.availability === "Limited"
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  {o.availability}
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-emerald-700">
                {o.apy.toFixed(2)}% <span className="text-sm font-semibold text-slate-500">APY</span>
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Issuer details available upon inquiry
              </p>
              <dl className="mt-4 space-y-2 text-sm flex-1">
                <div className="flex justify-between"><dt className="text-slate-500">Term</dt><dd className="font-semibold text-[#16233d]">{termLabel(o.termMonths)}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Maturity date</dt><dd className="font-medium text-[#16233d]">{maturityDate(o.termMonths)}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Minimum deposit</dt><dd className="font-medium text-[#16233d]">{fmtMin(o.min)}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Interest schedule</dt><dd className="font-medium text-[#16233d]">{o.schedule}</dd></div>
              </dl>
              <Button
                data-testid={`brokered-inquire-${o.id}`}
                onClick={() => openRatesModal({ term: MODAL_TERM_MAP[o.termMonths] || 12 })}
                className="mt-4 w-full h-10 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold group"
              >
                View details / inquire
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Button>
            </div>
          ))}
        </div>
        {options.length === 0 && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
            No options match those filters — reset a filter or inquire and a specialist will scout
            current inventory for you.
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-slate-500">
          <p className="flex items-start gap-1.5 max-w-2xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            Rates and availability are subject to change and must be confirmed before any application
            or investment. Confirm the issuing institution, deposit-insurance eligibility and final
            terms before investing. Eligible deposits may qualify for FDIC insurance subject to
            applicable limits.
          </p>
          <p className="flex items-center gap-1.5 shrink-0">
            <CalendarClock className="w-4 h-4 text-slate-400" />
            Display date reflects the current date.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrokeredOptions;
