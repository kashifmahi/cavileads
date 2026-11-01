import React, { useState } from "react";
import { TrendingUp, ShieldCheck, BadgeCheck, Fingerprint, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { TOP_BROKERED_APY, maturityMonthYear, termLabel } from "../data/brokered";

const trustItems = [
  { icon: BadgeCheck, title: "Free comparison", sub: "No obligation to inquire" },
  { icon: ShieldCheck, title: "Compare FDIC-insured bank CDs", sub: "Banks issue and insure the CDs" },
  { icon: Fingerprint, title: "No SSN needed", sub: "Compare without one" },
];

const PREVIEW_TERMS = [6, 9, 12, 18, 24];

const Hero = () => {
  const [previewTerm, setPreviewTerm] = useState(12);

  const scrollTo = (sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative overflow-hidden hero-bg pt-16">
      <div className="absolute inset-0 hero-dots" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left min-w-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 animate-fade-up">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">
                Non-callable options up to {TOP_BROKERED_APY.toFixed(2)}% APY
              </span>
            </div>

            <h1 className="mt-6 font-serif text-3xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Compare Non-Callable Brokered CD Options
            </h1>

            <p className="mt-5 text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Explore fixed-term CD options, compare yields and maturity dates, and discover
              opportunities for deposits of $50,000 or more. Request details with no obligation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button
                data-testid="hero-compare-cta"
                onClick={() => scrollTo("#scout-wizard")}
                className="h-12 px-7 text-base font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg shadow-lg shadow-emerald-900/30 transition-colors duration-200 group"
              >
                Compare CD Options
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Button>
              <Button
                variant="outline"
                data-testid="hero-basics-cta"
                onClick={() => scrollTo("#brokered-basics")}
                className="h-12 px-7 text-base font-semibold bg-transparent border-slate-500/60 text-white hover:bg-white/10 hover:text-white rounded-lg transition-colors duration-200"
              >
                How Brokered CDs Work
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              {trustItems.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col items-center lg:items-start gap-1.5 px-2 sm:px-3 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 text-center lg:text-left"
                >
                  <card.icon className="w-5 h-5 text-emerald-400" />
                  <p className="text-xs font-semibold text-white">{card.title}</p>
                  <p className="text-[10px] text-slate-400">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: maturity preview card */}
          <div className="min-w-0 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            <div className="rounded-2xl bg-white shadow-2xl border border-white/20 overflow-hidden" data-testid="maturity-preview">
              <div className="px-5 sm:px-6 py-4 border-b border-slate-100">
                <p className="font-serif font-bold text-[#16233d]">Maturity preview</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Pick a term and see roughly when the money comes back.
                </p>
              </div>
              <div className="px-5 sm:px-6 py-5">
                <div className="flex flex-wrap gap-2">
                  {PREVIEW_TERMS.map((m) => (
                    <button
                      key={m}
                      data-testid={`preview-term-${m}`}
                      onClick={() => setPreviewTerm(m)}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 ${
                        previewTerm === m
                          ? "bg-[#16233d] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {termLabel(m)}
                    </button>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-5">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Estimated maturity</p>
                  <p className="mt-1 text-2xl font-bold text-[#16233d]" data-testid="preview-maturity">
                    {maturityMonthYear(previewTerm)}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-500">Today</span>
                    <div className="relative flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700">Maturity</span>
                  </div>
                </div>
                <Button
                  data-testid="preview-show-matching"
                  onClick={() => scrollTo("#rates")}
                  className="mt-5 w-full h-11 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold group"
                >
                  Show matching CD options
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Button>
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] text-slate-500">
              Rates and availability must be confirmed before investing. Issuer details available upon inquiry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
