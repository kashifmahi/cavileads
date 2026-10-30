import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { TrendingUp, ChevronRight, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useRatesModal } from "../context/RatesModalContext";
import { API } from "../App";
import { SITE_URL } from "../config";

const TERMS = [
  { key: "6", label: "6-Month" },
  { key: "12", label: "12-Month" },
  { key: "24", label: "2-Year" },
  { key: "60", label: "5-Year" },
];

const fmtDate = (d) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export default function TrendsPage() {
  const [history, setHistory] = useState([]);
  const [since, setSince] = useState("");
  const [term, setTerm] = useState("12");
  const { openRatesModal } = useRatesModal();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${API}/rate-trends`)
      .then((res) => {
        setHistory(res.data.history || []);
        setSince(res.data.tracking_since || "");
      })
      .catch((e) => console.error("trends failed", e));
  }, []);

  const chartData = history
    .filter((h) => h.terms?.[term])
    .map((h) => ({
      date: fmtDate(h.date),
      "Best APY": h.terms[term].best,
      "Average APY": h.terms[term].avg,
      "FDIC National Avg (12-mo)": h.fdic_12mo ?? null,
    }));
  const latest = history.length ? history[history.length - 1] : null;
  const latestTerm = latest?.terms?.[term];
  const spread =
    latestTerm && latest?.fdic_12mo != null ? (latestTerm.best - latest.fdic_12mo).toFixed(2) : null;

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Daily CD Rate Trends — Cavicord",
    description:
      "Daily tracking of the best and average certificate of deposit (CD) APYs from top FDIC-insured US banks, compared with the FDIC national average.",
    url: `${SITE_URL}/cd-rate-trends`,
    creator: { "@type": "Organization", name: "Cavicord", url: SITE_URL },
    temporalCoverage: since ? `${since}/..` : undefined,
    license: `${SITE_URL}/about`,
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="CD Rate Trends — Daily History of the Best CD Rates | Cavicord"
        description="Track how the best CD rates change over time. Daily history of top and average APYs from FDIC-insured banks vs the FDIC national average, updated every morning."
        path="/cd-rate-trends"
        keywords="cd rate trends, cd rate history, are cd rates going up, cd rates over time"
        schemas={[datasetSchema]}
      />
      <Header />
      <main className="pt-16">
        <div className="hero-bg relative overflow-hidden">
          <div className="absolute inset-0 hero-dots" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300">Rate Trends</span>
            </nav>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-white">
              CD Rate Trends
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed">
              We verify CD rates from top FDIC-insured banks every morning and record the
              results. This page shows how the best and average APYs move over time —
              tracked daily{since ? ` since ${fmtDate(since)}, ${since.slice(0, 4)}` : ""}.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          {latestTerm && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="trends-stat-best">
                <p className="text-xs text-slate-500 uppercase">Today's Best {TERMS.find((t) => t.key === term)?.label} APY</p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">{latestTerm.best.toFixed(2)}%</p>
                <p className="text-xs text-slate-500">via {latestTerm.best_bank}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="trends-stat-avg">
                <p className="text-xs text-slate-500 uppercase">Average Across Tracked Banks</p>
                <p className="mt-1 text-2xl font-bold text-[#16233d]">{latestTerm.avg.toFixed(2)}%</p>
                <p className="text-xs text-slate-500">{latestTerm.count} banks tracked</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="trends-stat-spread">
                <p className="text-xs text-slate-500 uppercase">Edge vs FDIC National Avg</p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">{spread != null ? `+${spread}%` : "—"}</p>
                <p className="text-xs text-slate-500">12-mo national average: {latest?.fdic_12mo != null ? `${latest.fdic_12mo.toFixed(2)}%` : "n/a"}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <h2 className="font-serif text-xl font-bold text-[#16233d] inline-flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" /> Best &amp; Average APY Over Time
            </h2>
            <div className="flex gap-2">
              {TERMS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTerm(t.key)}
                  data-testid={`trends-term-${t.key}`}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    term === t.key ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm" data-testid="trends-chart">
            {chartData.length === 0 ? (
              <p className="py-16 text-center text-slate-500">Loading rate history…</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={340}>
                  <LineChart data={chartData} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} domain={["auto", "auto"]} unit="%" width={55} />
                    <Tooltip formatter={(v) => (v != null ? `${Number(v).toFixed(2)}%` : "n/a")} />
                    <Legend wrapperStyle={{ fontSize: 13 }} />
                    <Line type="monotone" dataKey="Best APY" stroke="#047857" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Average APY" stroke="#16233d" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="FDIC National Avg (12-mo)" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="6 4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                {chartData.length < 7 && (
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Daily tracking began {since ? fmtDate(since) : "recently"} — the chart fills in a new point every morning.
                  </p>
                )}
              </>
            )}
          </div>

          {history.length > 0 && (
            <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200" data-testid="trends-table">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    {TERMS.map((t) => (
                      <th key={t.key} className="px-4 py-3">{t.label} Best</th>
                    ))}
                    <th className="px-4 py-3">FDIC 12-mo Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {[...history].reverse().slice(0, 30).map((h) => (
                    <tr key={h.date} className="border-t border-slate-100">
                      <td className="px-4 py-3 text-slate-600">{fmtDate(h.date)}, {h.date.slice(0, 4)}</td>
                      {TERMS.map((t) => (
                        <td key={t.key} className="px-4 py-3 font-semibold text-emerald-700">
                          {h.terms?.[t.key] ? `${h.terms[t.key].best.toFixed(2)}%` : "—"}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-slate-600">{h.fdic_12mo != null ? `${h.fdic_12mo.toFixed(2)}%` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-14 max-w-3xl" data-testid="trends-explainer">
            <h2 className="font-serif text-2xl font-bold text-[#16233d]">How we collect this data</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Every morning we check the APYs on new CDs at the FDIC- and NCUA-insured banks in our
              rate tables and record the highest and the average APY for each term. The dashed line is
              the FDIC's national average rate for 12-month CDs, which includes thousands of banks and
              credit unions, most of which pay far less than the leading online banks. The gap between
              the two lines shows how much you gain by shopping around instead of accepting your local
              bank's rate.
            </p>
            <h2 className="mt-10 font-serif text-2xl font-bold text-[#16233d]">What moves CD rates</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              CD rates follow the Federal Reserve's policy rate and Treasury yields. When the Fed cuts
              rates, or the market expects it to, banks lower the APYs on new CDs, often before the cut
              happens. Rates on longer terms move with longer Treasury yields, so short and long CDs
              don't always move together. Competition matters too: banks that need deposits raise rates
              on specific terms, which is why promotional rates appear on odd terms like 7 or 18 months.
              A CD you've already opened keeps its rate until maturity, whatever happens next.
            </p>
            <h2 className="mt-10 font-serif text-2xl font-bold text-[#16233d]">Using the trend</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              If the best rates are drifting down, locking a longer term keeps today's yield; see{" "}
              <Link to="/best-5-year-cd-rates" className="text-emerald-700 underline underline-offset-2">5-year CD rates</Link>{" "}
              and our explainer on{" "}
              <Link to="/articles/fed-rate-cuts-and-cd-rates" className="text-emerald-700 underline underline-offset-2">how Fed cuts affect CD rates</Link>.
              If you're unsure which way rates will go, a{" "}
              <Link to="/guides/cd-ladder-explained" className="text-emerald-700 underline underline-offset-2">CD ladder</Link>{" "}
              or a{" "}
              <Link to="/no-penalty-cd-rates" className="text-emerald-700 underline underline-offset-2">no-penalty CD</Link>{" "}
              keeps your options open.
            </p>
          </div>

          <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">
            <h3 className="font-serif text-xl font-bold text-[#16233d]">Lock in today's best rate</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              Rates move daily. Tell us your amount and term and we'll match you with the top APYs.
            </p>
            <Button
              onClick={() => openRatesModal()}
              data-testid="trends-cta-btn"
              className="mt-5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold"
            >
              Get Personalized Rates <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="mt-4 text-xs text-slate-500">
              Data on this page is free to cite with a link to cavicord.tech/cd-rate-trends.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
