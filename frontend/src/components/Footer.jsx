import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ShieldCheck } from "lucide-react";
import { BRAND } from "../mock/mock";
import { termPages } from "../data/terms";
import { guides } from "../data/guides";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-bg text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                <TrendingUp className="w-5 h-5 text-emerald-400" strokeWidth={2.5} />
              </span>
              <span className="font-serif text-xl font-bold text-white">{BRAND.name}</span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              An independent resource helping savers compare the best certificate
              of deposit rates from top FDIC-insured banks across the United
              States.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              All listed banks are FDIC insured
            </div>
          </div>

          {/* Best rates */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Best CD Rates</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {termPages.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/${p.slug}`}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & tools */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Guides & Tools</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/guides/${g.slug}`}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {g.title.split(":")[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/articles" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  All Articles
                </Link>
              </li>
              <li>
                <a href="/#calculator" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  CD Earnings Calculator
                </a>
              </li>
              <li>
                <a href="/#ladder" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  CD Ladder Builder
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  About & Trust
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  Advertiser Disclosure
                </Link>
              </li>
              <li>
                <a href="/#alerts" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  Rate Alerts
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-slate-500 leading-relaxed">
            {BRAND.name} is not a bank and does not offer certificates of deposit
            directly. Rates shown are for informational purposes only and are
            subject to change without notice. National average rates are sourced
            from the FDIC. Always verify current rates and terms directly with the
            issuing bank before opening an account. Some links may be affiliate
            links; see our Advertiser Disclosure.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            © {year} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
