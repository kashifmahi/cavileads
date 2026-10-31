import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import SEO from "../components/SEO";
import { ChevronRight } from "lucide-react";
import { LEGAL_UPDATED, CONTACT_EMAIL } from "../data/legal";

const fmt = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const withEmailLink = (text) => {
  const parts = text.split(CONTACT_EMAIL);
  return parts.flatMap((p, i) =>
    i < parts.length - 1
      ? [p, <a key={i} href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-800 underline underline-offset-2">{CONTACT_EMAIL}</a>]
      : [p]
  );
};

const LegalPage = ({ doc }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [doc.slug]);

  return (
    <div className="min-h-screen bg-white">
      <SEO title={doc.metaTitle} description={doc.metaDescription} path={`/${doc.slug}`} />
      <Header />
      <main className="pt-16">
        <div className="hero-bg relative overflow-hidden">
          <div className="absolute inset-0 hero-dots" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
            <nav className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300">{doc.title}</span>
            </nav>
            <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-white">{doc.title}</h1>
            <p className="mt-3 text-sm text-slate-400">Last updated {fmt(LEGAL_UPDATED)}</p>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14" data-testid={`legal-${doc.slug}`}>
          <p className="text-slate-600 leading-relaxed">{doc.intro}</p>
          {doc.sections.map((s) => (
            <section key={s.heading} className="mt-9">
              <h2 className="font-serif text-xl font-bold text-[#16233d]">{s.heading}</h2>
              {s.body && <p className="mt-3 text-slate-600 leading-relaxed">{withEmailLink(s.body)}</p>}
              {s.bullets && (
                <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-600 leading-relaxed">
                  {s.bullets.map((b) => (
                    <li key={b}>{withEmailLink(b)}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default LegalPage;
