import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import SEO from "../components/SEO";
import { Clock, ChevronRight, ArrowRight } from "lucide-react";
import { getGuide, guides } from "../data/guides";

const GuidePage = () => {
  const { slug } = useParams();
  const guide = getGuide(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!guide) return <Navigate to="/guides" replace />;

  const others = guides.filter((g) => g.slug !== slug);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.excerpt,
      author: { "@type": "Organization", name: "Cavicord Editorial Team" },
      publisher: { "@type": "Organization", name: "Cavicord" },
      mainEntityOfPage:
        typeof window !== "undefined"
          ? `${window.location.origin}/guides/${guide.slug}`
          : "",
    },
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
          name: "Guides",
          item: typeof window !== "undefined" ? `${window.location.origin}/guides` : "",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: guide.title,
          item:
            typeof window !== "undefined"
              ? `${window.location.origin}/guides/${guide.slug}`
              : "",
        },
      ],
    },
  ];

  // HowTo schema for step-by-step guides (stronger AI/rich-result visibility)
  if (guide.slug === "cd-ladder-explained") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Build a CD Ladder",
      description:
        "Split your savings across CDs with staggered maturities to get regular access to your money while earning long-term rates.",
      step: guide.sections.map((s, i) => ({
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
        title={`${guide.title} | Cavicord`}
        description={guide.excerpt}
        keywords="CD comparison, certificate of deposit guide, savings strategy"
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
            <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight">
              {guide.title}
            </h1>
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-slate-400">
              <Clock className="w-4 h-4 text-emerald-400" /> {guide.readTime}
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <p className="text-lg text-slate-600 leading-relaxed">{guide.excerpt}</p>
          {guide.sections.map((s) => (
            <div key={s.heading} className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-[#16233d]">{s.heading}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{s.body}</p>
            </div>
          ))}

          <div className="mt-12 rounded-2xl calc-result-bg p-7 text-white">
            <h3 className="font-serif text-xl font-bold">Ready to compare rates?</h3>
            <p className="mt-2 text-sm text-slate-300">
              See today's best CD rates from top FDIC-insured banks, ranked by APY.
            </p>
            <Link
              to="/"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200"
            >
              Compare CD Rates <ArrowRight className="w-4 h-4" />
            </Link>
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
