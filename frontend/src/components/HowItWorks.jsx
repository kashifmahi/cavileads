import React from "react";
import { Landmark, Briefcase, UserCheck, CalendarCheck } from "lucide-react";

const STEPS = [
  { n: 1, t: "Share your preferences", d: "Term, approximate deposit, ZIP code and when the money is ready." },
  { n: 2, t: "Hear from a specialist", d: "A Cavicord CD specialist calls with issuer details and current availability." },
  { n: 3, t: "Review your options", d: "Compare the issuing banks, APYs and maturity dates matched to you." },
  { n: 4, t: "You authorize", d: "Nothing moves without your review and authorization. No obligation at any step." },
];

const BASICS = [
  { icon: Landmark, t: "Issuing bank", d: "The bank issues the CD and sets the rate, term, maturity date and interest schedule." },
  { icon: Briefcase, t: "Brokerage account", d: "A participating provider offers the account used to purchase the CD." },
  { icon: UserCheck, t: "Your holding", d: "You review and authorize the transaction; the CD is held in your approved account." },
  { icon: CalendarCheck, t: "Maturity", d: "Principal and interest are handled at maturity according to the CD terms." },
];

const HowItWorks = () => (
  <section id="brokered-basics" className="scroll-mt-24 bg-slate-50 border-y border-slate-200" data-testid="how-it-works">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
      <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">How the service works</p>
      <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#16233d]">
        From first look to an authorized transaction
      </h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-700 text-white text-sm font-bold">{s.n}</span>
            <h3 className="mt-3 font-semibold text-[#16233d]">{s.t}</h3>
            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Sending the scouting form or an application does not lock in a rate or guarantee availability.
      </p>

      <h2 className="mt-12 font-serif text-2xl font-bold text-[#16233d]">How a brokered CD works</h2>
      <p className="mt-2 max-w-3xl text-slate-600 leading-relaxed">
        A brokered CD is issued by a bank, then bought and held inside a brokerage account — a setup
        that can put CDs from several issuing banks within reach of one relationship.
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BASICS.map((b) => (
          <div key={b.t} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <b.icon className="w-5 h-5 text-emerald-600" />
            <h3 className="mt-2.5 font-semibold text-[#16233d]">{b.t}</h3>
            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{b.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500 max-w-3xl">
        Cavicord does not issue CDs, open brokerage accounts, hold customer funds or execute CD
        transactions. Eligible deposits may qualify for FDIC insurance subject to applicable limits,
        ownership-category requirements and other deposits held at the same issuing bank.
      </p>
    </div>
  </section>
);

export default HowItWorks;
