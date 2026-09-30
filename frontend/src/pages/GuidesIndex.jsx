import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import SEO from "../components/SEO";
import { BookOpen, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { guides } from "../data/guides";

const GuidesIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="CD Guides & Comparisons — Cavicord"
        description="In-depth comparisons: CD vs high-yield savings, CD vs Treasury bills, brokered vs bank CDs. Make smarter decisions with your savings."
        path="/guides"
      />
      <Header />
      <main className="pt-16">
        <div className="hero-bg relative overflow-hidden">
          <div className="absolute inset-0 hero-dots" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300">Guides</span>
            </nav>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-white">
              CD Guides & Comparisons
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed">
              Straightforward answers to the questions savers actually ask — no jargon,
              just the trade-offs that matter.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid gap-6">
            {guides.map((g) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 shrink-0 group-hover:bg-emerald-100 transition-colors duration-300">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                  </span>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-[#16233d] group-hover:text-emerald-700 transition-colors duration-200">
                      {g.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">{g.excerpt}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {g.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                        Read guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default GuidesIndex;
