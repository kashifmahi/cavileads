import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import SEO from "../components/SEO";
import { ShieldCheck, Landmark, SearchCheck, Scale, ChevronRight } from "lucide-react";

const principles = [
  {
    icon: Landmark,
    title: "How rates are sourced",
    body: "National average CD rates are pulled directly from the FDIC's official National Rates and Rate Caps publication and refreshed automatically. Per-bank APYs are curated by our editorial team from each bank's public disclosures and re-verified on a regular schedule. Every rate row carries an 'updated' timestamp so you know exactly how fresh the data is.",
  },
  {
    icon: SearchCheck,
    title: "Editorial policy",
    body: "Rankings are ordered by APY \u2014 highest first \u2014 with no pay-for-placement. If we ever earn a referral fee when you open an account through a link, it never changes the order in which products appear, and it costs you nothing. We only list federally insured institutions.",
  },
  {
    icon: ShieldCheck,
    title: "FDIC / NCUA disclaimer",
    body: "Deposits at FDIC-member banks are insured up to $250,000 per depositor, per bank, per ownership category. Credit union deposits carry equivalent NCUA insurance. CDSummit is not a bank, does not accept deposits, and does not offer CDs directly \u2014 we are an independent comparison resource.",
  },
  {
    icon: Scale,
    title: "Accuracy commitment",
    body: "Rates change frequently. While we work to keep every figure current, always confirm the APY, minimum deposit, and early-withdrawal penalty on the bank's own site before opening an account. If you spot an outdated rate, tell us and we'll correct it promptly.",
  },
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About CDSummit — How We Source & Rank CD Rates"
        description="Who we are, how CDSummit sources CD rates from the FDIC and bank disclosures, our editorial policy, and federal deposit insurance disclaimers."
        path="/about"
      />
      <Header />
      <main className="pt-16">
        <div className="hero-bg relative overflow-hidden">
          <div className="absolute inset-0 hero-dots" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300">About & Trust</span>
            </nav>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-white">
              How CDSummit Works
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed">
              We're an independent comparison resource on a simple mission: help American
              savers find the highest safe yield on their cash. Here's exactly how our
              data is sourced, ranked, and kept honest.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid gap-6">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:border-emerald-200 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 shrink-0">
                    <p.icon className="w-5 h-5 text-emerald-600" />
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-[#16233d]">{p.title}</h2>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl calc-result-bg p-7 text-white">
            <h2 className="font-serif text-xl font-bold">Advertiser disclosure</h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Some links on CDSummit may be affiliate links, meaning we may earn a commission
              if you open an account — at no additional cost to you. This supports our free
              tools and data. Product order is always determined by APY, never by compensation.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default AboutPage;
