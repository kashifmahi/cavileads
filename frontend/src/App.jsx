import React, { useState, useEffect } from "react";
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
import SEO from "./components/SEO";
import { RatesModalProvider } from "./context/RatesModalContext";
import TermPage from "./pages/TermPage";
import AboutPage from "./pages/AboutPage";
import GuidesIndex from "./pages/GuidesIndex";
import GuidePage from "./pages/GuidePage";
import AdminPage from "./pages/AdminPage";
import { termPages, monthYear } from "./data/terms";

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
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <RatesModalProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/guides" element={<GuidesIndex />} />
              <Route path="/guides/:slug" element={<GuidePage />} />
              {termPages.map((p) => (
                <Route key={p.slug} path={`/${p.slug}`} element={<TermPage />} />
              ))}
              <Route path="*" element={<Home />} />
            </Routes>
          </RatesModalProvider>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
