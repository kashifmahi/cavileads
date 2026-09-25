import React from "react";
import {
  ShieldCheck,
  Lock,
  PiggyBank,
  TrendingUp,
  CalendarClock,
  LineChart,
} from "lucide-react";
import { whyCds } from "../mock/mock";

const iconMap = { ShieldCheck, Lock, PiggyBank, TrendingUp, CalendarClock, LineChart };

const WhyCDs = () => {
  return (
    <section id="why-cds" className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#16233d]">
            Why Invest in CDs?
          </h2>
          <p className="mt-4 text-slate-500">
            Certificates of deposit are one of the safest and most predictable
            investment vehicles available.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyCds.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-[#16233d]">{item.title}</h3>
                <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyCDs;
