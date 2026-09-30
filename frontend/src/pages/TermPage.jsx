import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import RateTable from "../components/RateTable";
import SEO from "../components/SEO";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Landmark, CalendarCheck, ChevronRight, ArrowRight } from "lucide-react";
import { getTermPage, termPages, monthYear } from "../data/terms";
import { useRatesModal } from "../context/RatesModalContext";
import { API } from "../App";

const TermPage = () => {
  const location = useLocation();
  const slug = location.pathname.slice(1); // Remove leading "/"
  const config = getTermPage(slug);
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

  const nationalAvg =
    config.term !== "all" && national
      ? national.rates.find((r) => String(r.term_months) === config.term)?.national_rate
      : null;

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

  const topApy = rates.length ? Math.max(...rates.map((r) => r.apy)) : null;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${config.title} \u2014 ${monthYear()} | Cavicord`}
        description={`${config.description.slice(0, 150)}\u2026`}
        keywords={`${config.title.toLowerCase()}, CD rates, certificate of deposit, FDIC insured, high yield CD`}
        path={`/${config.slug}`}
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: typeof window !== "undefined" ? window.location.origin : "",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: config.title,
                item: typeof window !== "undefined" ? `${window.location.origin}/${config.slug}` : "",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${config.title} \u2014 ${monthYear()}`,
            numberOfItems: rates.length,
            itemListElement: rates.slice(0, 10).map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${r.bank} \u2014 ${r.apy.toFixed(2)}% APY (${r.term_months}-month CD)`,
            })),
          },
        ]}
      />
      <Header />
      <main className="pt-16">
        {/* Page hero */}
        <div className="hero-bg relative overflow-hidden">
          <div className="absolute inset-0 hero-dots" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300">{config.title}</span>
            </nav>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-white">
              {config.heading} <span className="text-emerald-400">— {monthYear()}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed">{config.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {topApy && (
                <Badge className="bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/15 border border-emerald-500/40 px-3 py-1.5">
                  Top rate: {topApy.toFixed(2)}% APY
                </Badge>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                <CalendarCheck className="w-4 h-4 text-emerald-400" />
                Rates updated {updatedAt ? fmtDate(updatedAt) : "daily"}
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {nationalAvg != null && (
            <div className="mb-8 inline-flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-5 py-3">
              <Landmark className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-slate-600">
                Official FDIC national average:{" "}
                <span className="font-bold text-[#16233d]">{nationalAvg.toFixed(2)}% APY</span>
              </span>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 text-[10px]">
                Live from FDIC.gov
              </Badge>
            </div>
          )}
          <RateTable rates={rates} loading={loading} showBest={config.term !== "all"} />
          <p className="mt-6 text-xs text-slate-400">
            *APYs are curated by our editorial team and verified against bank disclosures. National
            averages sourced live from FDIC.gov. Rates are subject to change — always confirm with the
            issuing bank. All listed institutions are federally insured (FDIC or NCUA).
          </p>

          {/* CTA banner */}
          <div className="mt-12 rounded-2xl calc-result-bg p-7 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold">
                Want rates matched to your goals?
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Tell us your deposit amount and timeframe — a CD specialist will find your best options.
              </p>
            </div>
            <Button
              onClick={openRatesModal}
              className="h-12 px-6 shrink-0 text-base font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors duration-200 group"
            >
              Get Personalized Rates
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Button>
          </div>

          {/* Other term pages */}
          <div className="mt-14">
            <h2 className="font-serif text-2xl font-bold text-[#16233d]">Compare Other CD Terms</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {termPages
                .filter((p) => p.slug !== slug)
                .map((p) => (
                  <Link
                    key={p.slug}
                    to={`/${p.slug}`}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-[#16233d] hover:text-white transition-colors duration-200"
                  >
                    {p.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default TermPage;
