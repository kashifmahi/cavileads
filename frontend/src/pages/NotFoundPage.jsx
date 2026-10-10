import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { SearchX, ArrowRight } from "lucide-react";

const NotFoundPage = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="Page Not Found | Cavicord"
      description="The page you're looking for doesn't exist. Compare today's best CD rates instead."
      path="/404"
      noindex
    />
    <Header />
    <main className="pt-16">
      <div className="hero-bg relative overflow-hidden">
        <div className="absolute inset-0 hero-dots" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <SearchX className="w-12 h-12 text-emerald-400 mx-auto" />
          <h1 className="mt-6 font-serif text-4xl sm:text-5xl font-bold text-white" data-testid="not-found-heading">
            404 — Page Not Found
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-slate-300 leading-relaxed">
            This page doesn't exist or has moved. The best CD rates, however, are exactly where
            they should be.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              data-testid="not-found-home-link"
              className="h-12 px-6 text-base font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors duration-200"
            >
              <Link to="/">
                Compare CD Rates <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 px-6 text-base font-semibold border-slate-500 text-white bg-transparent hover:bg-white/10 hover:text-white rounded-lg transition-colors duration-200"
            >
              <Link to="/articles">Read Articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFoundPage;
