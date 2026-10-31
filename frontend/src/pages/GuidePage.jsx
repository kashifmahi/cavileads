import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import SEO from "../components/SEO";
import AuthorByline from "../components/AuthorByline";
import { SITE_URL } from "../config";
import { Clock, ChevronRight, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { getGuide, guides } from "../data/guides";
import { authorSchema, publisherSchema } from "../data/author";
import { ratesLinkFor } from "../data/ratesLinks";
import { SectionTable, SourcesList } from "../components/ContentExtras";

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const GuidePage = () => {
  const { slug } = useParams();
  const guide = getGuide(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!guide) return <Navigate to="/guides" replace />;

  const others = guides.filter((g) => g.slug !== slug);
  const ratesLink = ratesLinkFor(guide.slug);
  const url = `${SITE_URL}/guides/${guide.slug}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.metaDescription,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      author: authorSchema(SITE_URL),
      publisher: publisherSchema(SITE_URL),
      mainEntityOfPage: url,
      image: `${SITE_URL}/og-image.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
  ];

  // HowTo schema for the step-by-step ladder guide
  if (guide.slug === "cd-ladder-explained") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Build a CD Ladder",
      description:
        "Split your savings across CDs with staggered maturities to get regular access to your money while earning long-term rates.",
      step: guide.sections.slice(0, 5).map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.heading,
        text: s.body,
      })),
    });
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        path={`/guides/${guide.slug}`}
        schemas={schemas}
      />
      <Header />
      <main className="pt-16">
        <div className="hero-bg relative overflow-hidden">
          <div className="absolute inset-0 hero-dots" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-slate-400 flex-wrap">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/guides" className="hover:text-emerald-400 transition-colors">Guides</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300 truncate max-w-[200px] sm:max-w-none">{guide.title}</span>
            </nav>
            <span className="mt-5 inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
              {guide.category}
            </span>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight">
              {guide.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" /> {guide.readTime}
              </span>
              <span>Updated {formatDate(guide.dateModified)}</span>
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <AuthorByline datePublished={guide.datePublished} dateModified={guide.dateModified} />

          {/* Quick answer — featured-snippet style */}
          <div
            data-testid="guide-quick-answer"
            className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-7"
          >
            <div className="flex items-center gap-2 text-emerald-700">
              <Lightbulb className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Quick answer</span>
            </div>
            <p className="mt-3 text-[#16233d] leading-relaxed font-medium">{guide.answer}</p>
            <Link
              to={ratesLink.to}
              data-testid="guide-rates-link-top"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 underline underline-offset-4 decoration-emerald-300 hover:decoration-emerald-700"
            >
              {ratesLink.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {guide.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-[#16233d]">{s.heading}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{s.body}</p>
              {s.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              <SectionTable table={s.table} />
            </section>
          ))}

          {/* FAQs */}
          <section className="mt-12" data-testid="guide-faqs">
            <h2 className="font-serif text-2xl font-bold text-[#16233d]">Frequently asked questions</h2>
            <div className="mt-5 space-y-5">
              {guide.faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-[#16233d]">{f.q}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <SourcesList sources={guide.sources} />

          {/* CTA — link to the most relevant rate page, not just the homepage */}
          <div className="mt-12 rounded-2xl calc-result-bg p-7 text-white">
            <h3 className="font-serif text-xl font-bold">Ready to compare rates?</h3>
            <p className="mt-2 text-sm text-slate-300">
              See today's best CD rates from top FDIC-insured banks, ranked by APY.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to={ratesLink.to}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200"
              >
                {ratesLink.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/no-penalty-cd-rates"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 hover:bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200"
              >
                No-Penalty CDs
              </Link>
              <Link
                to="/cd-calculator"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 hover:bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200"
              >
                CD Calculator
              </Link>
            </div>
          </div>

          <div className="mt-14">
            <h3 className="font-serif text-xl font-bold text-[#16233d]">More guides</h3>
            <div className="mt-4 grid gap-3">
              {others.map((g) => (
                <Link
                  key={g.slug}
                  to={`/guides/${g.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:border-emerald-200 transition-colors duration-200"
                >
                  <span className="text-sm font-medium text-[#16233d] group-hover:text-emerald-700 transition-colors">
                    {g.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default GuidePage;
