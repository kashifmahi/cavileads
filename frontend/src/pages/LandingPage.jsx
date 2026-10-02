import React, { useEffect, useState } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import RateTable from "../components/RateTable";
import Calculator from "../components/Calculator";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CheckCircle2, CalendarCheck, ChevronRight, ArrowRight, Landmark } from "lucide-react";
import { getLanding } from "../data/landings";
import { monthYear } from "../data/terms";
import { useRatesModal } from "../context/RatesModalContext";
import { API } from "../App";

const LandingPage = () => {
  const location = useLocation();
  const slug = location.pathname.slice(1);
  const config = getLanding(slug);
  const [rates, setRates] = useState([]);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [national, setNational] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openRatesModal } = useRatesModal();

  useEffect(() => {
    if (!config) return;
    window.scrollTo(0, 0);
    setLoading(true);
    axios
      .get(`${API}/rates`, { params: { term: config.term, rate_type: config.rateType } })
      .then((res) => {
        setRates(res.data.rates || []);
        setUpdatedAt(res.data.updated_at);
      })
      .catch((e) => console.error("rates failed", e))
      .finally(() => setLoading(false));
    axios
      .get(`${API}/national-rates`)
      .then((res) => setNational(res.data))
      .catch(() => {});
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!config) return <Navigate to="/" replace />;

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const topApy = rates.length ? Math.max(...rates.map((r) => r.apy)) : null;
  const nationalAvg =
    config.term !== "all" && national
      ? national.rates.find((r) => String(r.term_months) === config.term)?.national_rate
      : null;
  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: origin },
        { "@type": "ListItem", position: 2, name: config.h1, item: `${origin}/${config.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={config.metaTitle}
        description={config.metaDescription}
        path={`/${config.slug}`}
        schemas={schemas}
      />
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <div className="hero-bg relative overflow-hidden">
          <div className="absolute inset-0 hero-dots" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300">{config.h1}</span>
            </nav>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-white">
              {config.h1} <span className="text-emerald-400">— {monthYear()}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed">{config.sub}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                data-testid="landing-hero-cta"
                onClick={openRatesModal}
                className="h-12 px-6 text-base font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors duration-200 group"
              >
                Get Personalized Rates
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Button>
              {topApy && (
                <Badge className="bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/15 border border-emerald-500/40 px-3 py-1.5">
                  Top rate: {topApy.toFixed(2)}% APY
                </Badge>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                <CalendarCheck className="w-4 h-4 text-emerald-400" />
                Updated {updatedAt ? fmtDate(updatedAt) : "daily"}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-4" data-testid="landing-benefits">
            {config.benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h2 className="font-semibold text-[#16233d]">{b.title}</h2>
                </div>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>

          {/* Calculator-first pages */}
          {config.showCalculator && (
            <div className="mt-10 -mx-4 sm:-mx-6 lg:-mx-8" data-testid="landing-calculator">
              <Calculator rates={rates} loading={loading} />
            </div>
          )}

          {/* National average */}
          {nationalAvg != null && (
            <div className="mt-10 inline-flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-5 py-3">
              <Landmark className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-slate-600">
                Official FDIC national average:{" "}
                <span className="font-bold text-[#16233d]">{nationalAvg.toFixed(2)}% APY</span>
              </span>
            </div>
          )}

          {/* Rates table */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-bold text-[#16233d]">Compare Rates</h2>
            <div className="mt-5">
              <RateTable rates={rates} loading={loading} showBest={config.term !== "all"} />
            </div>
            <p className="mt-6 text-xs text-slate-400">
              *APYs are curated by our editorial team and verified against bank disclosures. Rates are
              subject to change — always confirm with the issuing bank. All listed institutions are
              federally insured (FDIC or NCUA).
            </p>
          </div>

          {/* Content sections (e.g., retirement) */}
          {config.sections &&
            config.sections.map((s) => (
              <section key={s.heading} className="mt-12 max-w-3xl">
                <h2 className="font-serif text-2xl font-bold text-[#16233d]">{s.heading}</h2>
                <p className="mt-3 text-slate-600 leading-relaxed">{s.body}</p>
              </section>
            ))}

          {/* FAQ */}
          <section className="mt-14 max-w-3xl" data-testid="landing-faqs">
            <h2 className="font-serif text-2xl font-bold text-[#16233d]">Frequently asked questions</h2>
            <div className="mt-5 space-y-5">
              {config.faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-[#16233d]">{f.q}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA banner */}
          <div className="mt-14 rounded-2xl calc-result-bg p-7 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold">
                Want rates matched to your goals?
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Tell us your deposit amount and timeframe — a CD specialist will find your best options.
              </p>
            </div>
            <Button
              data-testid="landing-banner-cta"
              onClick={openRatesModal}
              className="h-12 px-6 shrink-0 text-base font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors duration-200 group"
            >
              Get Personalized Rates
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default LandingPage;
