import React from "react";
import { Button } from "./ui/button";
import { CheckCircle2, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { formatTerm } from "../mock/mock";
import { useLeadForm, LeadFields, LeadResults } from "./LeadForm";

// On-page lead form (no click needed to open it). Used on landing, term,
// article and guide pages and the homepage.
const InlineLeadForm = ({
  title = "Get matched to the best CD rates for $50,000+",
  sub = "Tell us your amount and term. We'll show your top FDIC-insured matches instantly, and a CD specialist will follow up with options for your deposit.",
  defaultTerm,
  id = "get-rates",
  className = "",
}) => {
  const lf = useLeadForm(defaultTerm);
  const { step, setStep, form } = lf;

  return (
    <section id={id} className={`scroll-mt-24 ${className}`} data-testid="inline-lead-form">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/70 to-white shadow-sm p-6 sm:p-8">
        {step === "form" ? (
          <>
            <h2 className="font-serif text-2xl sm:text-[1.7rem] font-bold text-[#16233d] leading-tight">{title}</h2>
            <p className="mt-2 text-slate-600 leading-relaxed">{sub}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-600" />Free, no obligation</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" />FDIC-insured banks only</li>
              <li className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-600" />Takes 30 seconds</li>
            </ul>
            <div className="mt-6">
              <LeadFields lf={lf} compact idPrefix={`${id}-`} />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h2 className="font-serif text-2xl font-bold text-[#16233d]" data-testid="lead-success-title">
                Thanks, {form.firstName}! Here are your top matches
              </h2>
            </div>
            <p className="mt-2 text-slate-600">
              Best {formatTerm(Number(form.term))} CDs for {form.amount}. A CD specialist will reach out at {form.email} shortly.
            </p>
            <div className="mt-4"><LeadResults lf={lf} /></div>
            <Button variant="outline" onClick={() => setStep("form")} className="mt-4 w-full border-slate-300 text-[#16233d] hover:bg-slate-50">
              Adjust preferences
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default InlineLeadForm;
