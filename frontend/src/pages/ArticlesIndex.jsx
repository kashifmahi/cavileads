import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import SEO from "../components/SEO";
import { Newspaper, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { articles } from "../data/articles";

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ArticlesIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="CD Articles: Rates, Strategy & Tax Answers | Cavicord"
        description="Clear, answer-first articles on CD rates, taxes, penalties, and strategy — written to help you make smarter decisions with your savings."
        path="/articles"
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Cavicord CD Articles",
            url: `${origin}/articles`,
            hasPart: articles.map((a) => ({
              "@type": "Article",
              headline: a.title,
              url: `${origin}/articles/${a.slug}`,
              datePublished: a.datePublished,
            })),
          },
        ]}
      />
      <Header />
      <main className="pt-16">
        <div className="hero-bg relative overflow-hidden">
          <div className="absolute inset-0 hero-dots" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300">Articles</span>
            </nav>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-white">
              CD Articles & Analysis
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed">
              Every article answers the question in the first paragraph — then goes
              deep on the details, trade-offs, and tax rules that matter.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid gap-6" data-testid="articles-list">
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={`/articles/${a.slug}`}
                data-testid={`article-card-${a.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 shrink-0 group-hover:bg-emerald-100 transition-colors duration-300">
                    <Newspaper className="w-5 h-5 text-emerald-600" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-700">
                        {a.category}
                      </span>
                      <span className="text-slate-400">{formatDate(a.dateModified)}</span>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-[#16233d] group-hover:text-emerald-700 transition-colors duration-200">
                      {a.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">{a.excerpt}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {a.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                        Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
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

export default ArticlesIndex;
