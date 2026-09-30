import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TrendingUp, ShieldCheck, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BRAND } from "../mock/mock";
import { termPages } from "../data/terms";
import { useRatesModal } from "../context/RatesModalContext";

const anchorLinks = [
  { label: "Compare Rates", hash: "#rates" },
  { label: "Calculator", hash: "#calculator" },
  { label: "Ladder", hash: "#ladder" },
  { label: "FAQ", hash: "#faq" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openRatesModal } = useRatesModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToAnchor = (e, hash) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === "/") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#16233d] group-hover:bg-[#1e2f52] transition-colors duration-200">
              <TrendingUp className="w-5 h-5 text-emerald-400" strokeWidth={2.5} />
            </span>
            <span className="font-serif text-xl font-bold text-[#16233d] tracking-tight">
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {anchorLinks.slice(0, 3).map((link) => (
              <a
                key={link.hash}
                href={`/${link.hash}`}
                onClick={(e) => goToAnchor(e, link.hash)}
                className="text-sm font-medium text-slate-600 hover:text-[#16233d] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#16233d] transition-colors duration-200 outline-none">
                Best Rates <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {termPages.map((p) => (
                  <DropdownMenuItem key={p.slug} asChild>
                    <Link to={`/${p.slug}`} className="cursor-pointer">
                      {p.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/guides"
              className="text-sm font-medium text-slate-600 hover:text-[#16233d] transition-colors duration-200"
            >
              Guides
            </Link>
            <Link
              to="/articles"
              data-testid="nav-articles-link"
              className="text-sm font-medium text-slate-600 hover:text-[#16233d] transition-colors duration-200"
            >
              Articles
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-slate-600 hover:text-[#16233d] transition-colors duration-200"
            >
              About
            </Link>
            <a
              href="/#faq"
              onClick={(e) => goToAnchor(e, "#faq")}
              className="text-sm font-medium text-slate-600 hover:text-[#16233d] transition-colors duration-200"
            >
              FAQ
            </a>
          </nav>

          {/* Right: badge + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium">FDIC Insured</span>
            </div>
            <Button
              onClick={openRatesModal}
              size="sm"
              className="h-9 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors duration-200"
            >
              Get Personalized Rates
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-6 py-4 gap-1">
            <Button
              onClick={() => {
                setMobileOpen(false);
                openRatesModal();
              }}
              className="w-full h-11 mb-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold group"
            >
              Get Personalized Rates
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Button>
            {anchorLinks.map((link) => (
              <a
                key={link.hash}
                href={`/${link.hash}`}
                onClick={(e) => goToAnchor(e, link.hash)}
                className="py-2.5 text-base font-medium text-slate-700 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <p className="pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Best Rates</p>
            {termPages.map((p) => (
              <Link
                key={p.slug}
                to={`/${p.slug}`}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
              >
                {p.title}
              </Link>
            ))}
            <Link
              to="/guides"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-base font-medium text-slate-700 hover:text-emerald-700 transition-colors"
            >
              Guides
            </Link>
            <Link
              to="/articles"
              data-testid="mobile-nav-articles-link"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-base font-medium text-slate-700 hover:text-emerald-700 transition-colors"
            >
              Articles
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-base font-medium text-slate-700 hover:text-emerald-700 transition-colors"
            >
              About
            </Link>
            <div className="flex items-center gap-2 text-slate-500 pt-3 border-t border-slate-100 mt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium">FDIC Insured</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
