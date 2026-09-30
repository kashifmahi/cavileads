import React from "react";
import { TrendingUp, ShieldCheck, Clock, ArrowRight, ExternalLink, CalendarCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { BankAvatar } from "./RateTable";
import { useRatesModal } from "../context/RatesModalContext";

const trustItems = [
  { icon: ShieldCheck, title: "FDIC Insured", sub: "Up to $250,000" },
  { icon: TrendingUp, title: "High APY", sub: "Competitive rates" },
  { icon: Clock, title: "Flexible Terms", sub: "3 mo \u2013 5 yr" },
];

const Hero = ({ rates = [], updatedAt, loading = false }) => {
  const { openRatesModal } = useRatesModal();
  const scrollToRates = () => {
    const el = document.querySelector("#rates");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const top3 = [...rates]
    .filter((r) => r.term_months === 12)
    .sort((a, b) => b.apy - a.apy)
    .slice(0, 3);

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null;

  return (
    <section id="top" className="relative overflow-hidden hero-bg pt-16">
      <div className="absolute inset-0 hero-dots" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 animate-fade-up">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">
                Rates as high as 4.75% APY
              </span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Find the Best CD Rates Across America
            </h1>

            <p className="mt-5 text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Compare certificate of deposit rates from the nation's top banks.
              Lock in high yields with FDIC-insured security.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button
                onClick={openRatesModal}
                className="h-12 px-7 text-base font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-900/30 transition-colors duration-200 group"
              >
                Get Personalized Rates
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Button>
              <Button
                variant="outline"
                onClick={scrollToRates}
                className="h-12 px-7 text-base font-semibold bg-transparent border-slate-500/60 text-white hover:bg-white/10 hover:text-white rounded-lg transition-colors duration-200"
              >
                Compare All Rates
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              {trustItems.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col items-center lg:items-start gap-1.5 px-3 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                >
                  <card.icon className="w-5 h-5 text-emerald-400" />
                  <p className="text-xs font-semibold text-white">{card.title}</p>
                  <p className="text-[10px] text-slate-400">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: above-the-fold top rates card */}
          <div className="animate-fade-up" style={{ animationDelay: "0.25s" }}>
            <div className="rounded-2xl bg-white shadow-2xl border border-white/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-[#16233d]">Today's Top 1-Year CDs</p>
                  <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Rates updated {fmtDate(updatedAt) || "daily"}
                  </p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
                  Sorted by APY
                </Badge>
              </div>
              <div className="divide-y divide-slate-100">
                {top3.length === 0 && loading &&
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="px-6 py-4">
                      <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                  ))}
                {top3.length === 0 && !loading && (
                  <div className="px-6 py-8 text-center">
                    <p className="text-sm text-slate-500">
                      Rates are temporarily unavailable.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-2 text-sm font-semibold text-emerald-700 hover:text-emerald-600 underline"
                    >
                      Tap to retry
                    </button>
                  </div>
                )}
                {top3.map((rate, i) => (
                      <div key={rate.id} className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-emerald-50/40 transition-colors duration-150">
                        <div className="flex items-center gap-3 min-w-0">
                          <BankAvatar bank={rate.bank} color={rate.color} size="w-9 h-9" />
                          <div className="min-w-0">
                            <p className="font-semibold text-[#16233d] text-sm truncate">{rate.bank}</p>
                            <p className="text-xs text-slate-400">
                              Min: {rate.min_deposit === 0 ? "None" : `$${rate.min_deposit.toLocaleString()}`}
                              {i === 0 && <span className="ml-2 text-emerald-600 font-semibold">Best Rate</span>}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <p className="text-lg font-bold text-emerald-600">{rate.apy.toFixed(2)}%</p>
                            <p className="text-[10px] text-slate-400 uppercase">APY</p>
                          </div>
                          <Button
                            asChild
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors duration-200"
                          >
                            <a href={rate.url || "#"} target="_blank" rel="noopener noreferrer sponsored">
                              Open
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
              </div>
              <button
                onClick={scrollToRates}
                className="w-full px-6 py-3.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200 flex items-center justify-center gap-1.5"
              >
                See all 25+ rates <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-3 text-center text-[11px] text-slate-500">
              FDIC national averages sourced live from FDIC.gov
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
