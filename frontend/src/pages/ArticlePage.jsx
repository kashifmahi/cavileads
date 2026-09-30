import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import SEO from "../components/SEO";
import { Clock, ChevronRight, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { getArticle, articles } from "../data/articles";

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const ArticlePage = () => {
  const { slug } = useParams();
  const article = getArticle(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <Navigate to="/articles" replace />;

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}/articles/${article.slug}`;
  const related = articles.filter((a) => a.slug !== slug).slice(0, 4);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: { "@type": "Organization", name: "Cavicord Editorial Team" },
      publisher: { "@type": "Organization", name: "Cavicord" },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: origin },
        { "@type": "ListItem", position: 2, name: "Articles", item: `${origin}/articles` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={article.metaTitle}
        description={article.metaDescription}
        path={`/articles/${article.slug}`}
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
              <Link to="/articles" className="hover:text-emerald-400 transition-colors">Articles</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300 truncate max-w-[200px] sm:max-w-none">{article.title}</span>
            </nav>
            <span className="mt-5 inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
              {article.category}
            </span>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight">
              {article.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" /> {article.readTime}
              </span>
              <span>Updated {formatDate(article.dateModified)}</span>
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          {/* Quick answer — featured-snippet style */}
          <div
            data-testid="article-quick-answer"
            className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-7"
          >
            <div className="flex items-center gap-2 text-emerald-700">
              <Lightbulb className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Quick answer</span>
            </div>
            <p className="mt-3 text-[#16233d] leading-relaxed font-medium">{article.answer}</p>
          </div>

          {article.sections.map((s) => (
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
            </section>
          ))}

          {/* FAQs */}
          <section className="mt-12" data-testid="article-faqs">
            <h2 className="font-serif text-2xl font-bold text-[#16233d]">Frequently asked questions</h2>
            <div className="mt-5 space-y-5">
              {article.faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-[#16233d]">{f.q}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 rounded-2xl calc-result-bg p-7 text-white">
            <h3 className="font-serif text-xl font-bold">Ready to compare rates?</h3>
            <p className="mt-2 text-sm text-slate-300">
              See today's best CD rates from top FDIC-insured banks, ranked by APY.
            </p>
            <Link
              to="/"
              data-testid="article-compare-cta"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200"
            >
              Compare CD Rates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related articles */}
          <div className="mt-14">
            <h3 className="font-serif text-xl font-bold text-[#16233d]">Keep reading</h3>
            <div className="mt-4 grid gap-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/articles/${a.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:border-emerald-200 transition-colors duration-200"
                >
                  <span className="text-sm font-medium text-[#16233d] group-hover:text-emerald-700 transition-colors">
                    {a.title}
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

export default ArticlePage;
