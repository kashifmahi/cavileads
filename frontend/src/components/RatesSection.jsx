import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Badge } from "./ui/badge";
import { termTabs, formatTerm } from "../mock/mock";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ShieldCheck, AlertCircle, DollarSign, CalendarClock, Landmark, CalendarCheck } from "lucide-react";
import RateTable, { BankAvatar, fmtDeposit } from "./RateTable";
import { API } from "../App";

const RatesSection = ({ rates, loading, updatedAt }) => {
  const [activeTab, setActiveTab] = useState("12");
  const [selected, setSelected] = useState(null);
  const [national, setNational] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/national-rates`)
      .then((res) => setNational(res.data))
      .catch((e) => console.error("national rates failed", e));
  }, []);

  const filtered = useMemo(() => {
    const list =
      activeTab === "all"
        ? [...rates]
        : rates.filter((r) => String(r.term_months) === activeTab);
    return list.sort((a, b) => b.apy - a.apy);
  }, [activeTab, rates]);

  const nationalAvg = useMemo(() => {
    if (!national || activeTab === "all") return null;
    const row = national.rates.find((r) => String(r.term_months) === activeTab);
    return row ? row.national_rate : null;
  }, [national, activeTab]);

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

  return (
    <section id="rates" className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Live Data</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-[#16233d]">
            Today's Best CD Rates
          </h2>
          <p className="mt-4 text-slate-500">
            Sorted by APY. Compare minimum deposits and terms from top
            FDIC-insured banks.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#16233d] bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5">
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
            Rates updated {updatedAt ? fmtDate(updatedAt) : "daily"}
          </p>
        </div>

        {/* Term tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {termTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.value
                  ? "bg-[#16233d] text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FDIC national average strip */}
        {nationalAvg !== null && (
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-5 py-3">
              <Landmark className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-slate-600">
                Official FDIC national average for {termTabs.find((t) => t.value === activeTab)?.label}:{" "}
                <span className="font-bold text-[#16233d]">{nationalAvg.toFixed(2)}% APY</span>
              </span>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 text-[10px]">
                Live from FDIC.gov
              </Badge>
            </div>
          </div>
        )}

        <div className="mt-10">
          <RateTable
            rates={filtered}
            loading={loading}
            showBest={activeTab !== "all"}
            onView={setSelected}
          />
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          *Bank APYs curated and verified against bank disclosures. National
          averages sourced live from FDIC.gov. Rates are subject to change. All
          listed banks are FDIC-insured.
        </p>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <BankAvatar bank={selected.bank} color={selected.color} />
                  <div>
                    <DialogTitle className="font-serif text-[#16233d]">{selected.bank}</DialogTitle>
                    <DialogDescription>{formatTerm(selected.term_months)} Certificate of Deposit</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="rounded-lg bg-emerald-50 p-4">
                  <p className="text-xs text-emerald-700 font-medium">APY</p>
                  <p className="text-2xl font-bold text-emerald-600">{selected.apy.toFixed(2)}%</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1"><DollarSign className="w-3 h-3" /> Min. Deposit</p>
                  <p className="text-2xl font-bold text-[#16233d]">{fmtDeposit(selected.min_deposit)}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1"><CalendarClock className="w-3 h-3" /> Term</p>
                  <p className="text-base font-semibold text-[#16233d] mt-1">{formatTerm(selected.term_months)}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Early Penalty</p>
                  <p className="text-base font-semibold text-[#16233d] mt-1">{selected.penalty}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                FDIC insured up to $250,000 per depositor, per bank.
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RatesSection;
