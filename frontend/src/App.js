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
import PersonalizedModal from "./components/PersonalizedModal";
import SEO from "./components/SEO";
import TermPage from "./pages/TermPage";
import AboutPage from "./pages/AboutPage";
import GuidesIndex from "./pages/GuidesIndex";
import GuidePage from "./pages/GuidePage";
import { termPages, monthYear } from "./data/terms";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rates, setRates] = useState([]);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(`${API}/rates`, { params: { term: "all", rate_type: "standard" } });
        setRates(res.data.rates || []);
        setUpdatedAt(res.data.updated_at);
      } catch (e) {
        console.error("Failed to load rates", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
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
        title={`Best CD Rates ${monthYear()} \u2014 Compare 4.75% APY | CDSummit`}
        description="Compare the best CD rates from top FDIC-insured US banks. High-yield certificates of deposit up to 4.75% APY, official FDIC national averages, CD calculator and ladder builder."
        keywords="best CD rates, certificate of deposit, high yield CD, CD rates today, FDIC insured CD, 12 month CD rates, CD calculator, CD ladder"
        path="/"
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "CDSummit",
            url: typeof window !== "undefined" ? window.location.origin : "",
            description:
              "Independent comparison of certificate of deposit rates from top FDIC-insured US banks.",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CDSummit",
            url: typeof window !== "undefined" ? window.location.origin : "",
            logo: typeof window !== "undefined" ? `${window.location.origin}/og-image.png` : "",
            description:
              "CDSummit compares the best CD rates from FDIC-insured banks, with official FDIC national averages, a CD calculator, and a ladder builder.",
          },
        ]}
      />
      <Header />
      <main>
        <Hero onGetRates={() => setModalOpen(true)} rates={rates} updatedAt={updatedAt} />
        <RatesSection rates={rates} loading={loading} updatedAt={updatedAt} />
        <Calculator rates={rates} />
        <LadderBuilder rates={rates} />
        <WhyCDs />
        <RateAlerts />
        <FAQSection />
      </main>
      <Footer />
      <CookieBanner />
      <PersonalizedModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/guides" element={<GuidesIndex />} />
            <Route path="/guides/:slug" element={<GuidePage />} />
            {termPages.map((p) => (
              <Route key={p.slug} path={`/${p.slug}`} element={<TermPage />} />
            ))}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
