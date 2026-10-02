import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RatesSection from "./components/RatesSection";
import Calculator from "./components/Calculator";
import LadderBuilder from "./components/LadderBuilder";
import WhyCDs from "./components/WhyCDs";
import RateAlerts from "./components/RateAlerts";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import ChatWidget from "./components/ChatWidget";
import SEO from "./components/SEO";
import { RatesModalProvider } from "./context/RatesModalContext";
import { termPages, monthYear } from "./data/terms";
import { landingPages } from "./data/landings";
import { captureAttribution } from "./lib/attribution";

// Route-level code splitting: secondary pages load their JS on demand,
// keeping the home page bundle small for faster LCP/INP.
const TermPage = lazy(() => import("./pages/TermPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GuidesIndex = lazy(() => import("./pages/GuidesIndex"));
const GuidePage = lazy(() => import("./pages/GuidePage"));
const ArticlesIndex = lazy(() => import("./pages/ArticlesIndex"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

const PageFallback = () => (
  <div className="min-h-screen bg-white pt-16">
    <div className="hero-bg h-56" />
  </div>
);

const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [rates, setRates] = useState([]);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    const fetchRates = async (attempt = 1) => {
      try {
        const res = await axios.get(`${API}/rates`, {
          params: { term: "all", rate_type: "standard" },
          timeout: 15000,
        });
        if (cancelled) return;
        setRates(res.data.rates || []);
        setUpdatedAt(res.data.updated_at);
        setLoading(false);
      } catch (e) {
        console.error(`Failed to load rates (attempt ${attempt})`, e);
        if (cancelled) return;
        if (attempt < 3) {
          setTimeout(() => fetchRates(attempt + 1), 3000);
        } else {
          setLoading(false);
        }
      }
    };
    fetchRates();
    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll to hash target when arriving from another route
  useEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`Compare CD Rates ${monthYear()} \u2014 Today's Best CD Rates | Cavicord`}
        description="Compare CD rates from top FDIC-insured banks side by side — by term, minimum deposit, and early-withdrawal terms. Current CD rates updated daily, plus a free CD calculator and ladder builder."
        keywords="compare CD rates, best CD rates, best CD rates today, top CD rates, current CD rates, CD rate comparison, compare bank CD rates, high yield CD rates, FDIC insured CD rates"
        path="/"
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Cavicord",
            url: typeof window !== "undefined" ? window.location.origin : "",
            description:
              "Independent comparison of certificate of deposit rates from top FDIC-insured US banks.",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Cavicord",
            url: typeof window !== "undefined" ? window.location.origin : "",
            logo: typeof window !== "undefined" ? `${window.location.origin}/og-image.png` : "",
            description:
              "Cavicord compares the best CD rates from FDIC-insured banks, with official FDIC national averages, a CD calculator, and a ladder builder.",
          },
        ]}
      />
      <Header />
      <main>
        <Hero rates={rates} updatedAt={updatedAt} loading={loading} />
        <RatesSection rates={rates} loading={loading} updatedAt={updatedAt} />
        <Calculator rates={rates} loading={loading} />
        <LadderBuilder rates={rates} />
        <WhyCDs />
        <RateAlerts />
        <FAQSection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

function App() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <RatesModalProvider>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/guides" element={<GuidesIndex />} />
                <Route path="/guides/:slug" element={<GuidePage />} />
                <Route path="/articles" element={<ArticlesIndex />} />
                <Route path="/articles/:slug" element={<ArticlePage />} />
                {termPages.map((p) => (
                  <Route key={p.slug} path={`/${p.slug}`} element={<TermPage />} />
                ))}
                {landingPages.map((p) => (
                  <Route key={p.slug} path={`/${p.slug}`} element={<LandingPage />} />
                ))}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
            <ChatWidget />
          </RatesModalProvider>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
