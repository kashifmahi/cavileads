import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CheckCircle2, Loader2, ShieldCheck, ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { getAttribution } from "../lib/attribution";
import { INDEPENDENCE_NOTE } from "../data/compliance";
import { API } from "../App";
import { LeadResults } from "./LeadForm";

const AMOUNTS = ["$50,000 - $99,999", "$100,000 - $249,999", "$250,000 - $499,999", "$500,000+"];
const TERMS = [
  { label: "6–9 months", value: 6 },
  { label: "12 months", value: 12 },
  { label: "18 months", value: 18 },
  { label: "2 years", value: 24 },
  { label: "Not sure yet", value: 12 },
];
const TIMING = ["Immediately", "Within 1 week", "Within 1 month", "Just exploring options"];

const STEP_TITLES = ["Investment preferences", "Your location", "Where to send your matches"];

// "Find CD Options That Match Your Needs" — 3-step matching wizard.
// Same /api/leads submit, consent wording and Google Ads conversion as the
// single-step lead form; reveals the matched banks after submission.
const MatchWizard = ({ id = "match-wizard", className = "" }) => {
  const [step, setStep] = useState(1); // 1 | 2 | 3 | 4 (results)
  const [form, setForm] = useState({
    amount: "", termLabel: "", timing: "", zip: "",
    firstName: "", lastName: "", email: "", phone: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [matches, setMatches] = useState([]);

  const set = (field) => (value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const err = (name) =>
    errors[name] ? <p className="text-xs text-red-600 mt-1">{errors[name]}</p> : null;

  const next1 = () => {
    const e = {};
    if (!form.amount) e.amount = "Please select an amount range.";
    if (!form.termLabel) e.termLabel = "Please select a term.";
    if (!form.timing) e.timing = "Please select timing.";
    if (Object.keys(e).length) return setErrors(e);
    setStep(2);
  };

  const next2 = () => {
    if (!/^\d{5}$/.test(form.zip.trim()))
      return setErrors({ zip: "Please enter a valid 5-digit ZIP code." });
    setStep(3);
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.phone || form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Please enter a valid phone number.";
    if (Object.keys(e).length) return setErrors(e);
    setServerError("");
    setSubmitting(true);
    try {
      const attr = getAttribution();
      const term = TERMS.find((t) => t.label === form.termLabel)?.value || 12;
      const res = await axios.post(`${API}/leads`, {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email,
        phone: `+1 ${form.phone}`,
        investment_amount: form.amount,
        timeframe: form.timing,
        term_months: term,
        zip_code: form.zip.trim(),
        agree: true,
        source_page: attr.source_page || window.location.pathname,
        utm_source: attr.utm_source || "",
        utm_medium: attr.utm_medium || "",
        utm_campaign: attr.utm_campaign || "",
        utm_term: attr.utm_term || "",
        gclid: attr.gclid || "",
      });
      try {
        if (window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-18545024484/wZYWCIu7ga8dEOS7-opF",
            value: 1.0,
            currency: "PKR",
          });
          window.gtag("event", "generate_lead", {
            source_page: attr.source_page || window.location.pathname,
            utm_campaign: attr.utm_campaign || "",
          });
        }
      } catch (gtagErr) {
        // tag not installed — ignore
      }
      setMatches(res.data.matches || []);
      setStep(4);
    } catch (error) {
      console.error("match wizard submit failed", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectField = (label, field, items, testid) => (
    <div className="space-y-1.5">
      <Label className="text-slate-700">{label} <span className="text-red-500">*</span></Label>
      <Select value={form[field]} onValueChange={set(field)}>
        <SelectTrigger className="h-11" data-testid={testid}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {items.map((it) => (
            <SelectItem key={it} value={it}>{it}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {err(field)}
    </div>
  );

  return (
    <section id={id} className={`scroll-mt-24 ${className}`} data-testid="match-wizard">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
        <div className="bg-[#16233d] px-6 sm:px-8 py-6">
          <h2 className="font-serif text-2xl sm:text-[1.7rem] font-bold text-white leading-tight">
            Find CD Options That Match Your Needs
          </h2>
          {step <= 3 && (
            <div className="mt-3 flex items-center gap-3">
              <p className="text-sm text-emerald-300 font-medium" data-testid="wizard-step-label">
                Step {step} of 3 — {STEP_TITLES[step - 1]}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" /> About one minute
              </span>
            </div>
          )}
          <div className="mt-3 flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  step >= s ? "bg-emerald-500" : "bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-4" data-testid="wizard-step-1">
              {selectField("Approximately how much are you considering depositing?", "amount", AMOUNTS, "wizard-amount")}
              {selectField("Preferred CD term", "termLabel", TERMS.map((t) => t.label), "wizard-term")}
              {selectField("When would your funds be available?", "timing", TIMING, "wizard-timing")}
              <Button onClick={next1} data-testid="wizard-continue-1" className="w-full h-11 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold group">
                Continue <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Button>
              <p className="text-xs text-slate-500 text-center">
                Free comparison · No obligation to inquire · No Social Security number needed
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4" data-testid="wizard-step-2">
              <div className="space-y-1.5">
                <Label htmlFor={`${id}-zip`} className="text-slate-700">
                  ZIP code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`${id}-zip`}
                  data-testid="wizard-zip"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="e.g. 33101"
                  value={form.zip}
                  onChange={(e) => set("zip")(e.target.value.replace(/\D/g, ""))}
                  className="h-11 max-w-[180px]"
                />
                {err("zip")}
                <p className="text-xs text-slate-500">
                  Used to match options and deposit-insurance considerations available in your area.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} data-testid="wizard-back-2" className="h-11 border-slate-300 text-[#16233d]">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button onClick={next2} data-testid="wizard-continue-2" className="flex-1 h-11 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold group">
                  Continue <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={submit} className="space-y-4" data-testid="wizard-step-3" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor={`${id}-first`} className="text-slate-700">First Name <span className="text-red-500">*</span></Label>
                  <Input id={`${id}-first`} data-testid="wizard-first-name" value={form.firstName} onChange={(e) => set("firstName")(e.target.value)} className="h-11" />
                  {err("firstName")}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`${id}-last`} className="text-slate-700">Last Name <span className="text-red-500">*</span></Label>
                  <Input id={`${id}-last`} data-testid="wizard-last-name" value={form.lastName} onChange={(e) => set("lastName")(e.target.value)} className="h-11" />
                  {err("lastName")}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor={`${id}-email`} className="text-slate-700">Email Address <span className="text-red-500">*</span></Label>
                  <Input id={`${id}-email`} data-testid="wizard-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email")(e.target.value)} className="h-11" />
                  {err("email")}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`${id}-phone`} className="text-slate-700">Phone Number <span className="text-red-500">*</span></Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-slate-50 text-sm text-slate-600 font-medium">+1</span>
                    <Input id={`${id}-phone`} data-testid="wizard-phone" type="tel" placeholder="(555) 123-4567" value={form.phone} onChange={(e) => set("phone")(e.target.value)} className="h-11 rounded-l-none" />
                  </div>
                  {err("phone")}
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-snug pt-1">
                By submitting, you agree to our{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-[#16233d] font-medium">Privacy Policy</a> and{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline text-[#16233d] font-medium">Terms of Service</a>{" "}
                and to Cavicord contacting you by email or phone about CD rates at the details above.
              </p>
              {serverError && <p className="text-sm text-red-600">{serverError}</p>}
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(2)} data-testid="wizard-back-3" className="h-11 border-slate-300 text-[#16233d]">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button type="submit" data-testid="wizard-submit" disabled={submitting} className="flex-1 h-11 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold group">
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Matching…</>
                  ) : (
                    <>See My Matched Banks <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" /></>
                  )}
                </Button>
              </div>
              <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Sent securely to Cavicord. We never sell or share your contact details.
              </p>
              <p className="text-[11px] text-slate-500 leading-snug" data-testid="wizard-independence-note">
                {INDEPENDENCE_NOTE}
              </p>
            </form>
          )}

          {step === 4 && (
            <div data-testid="wizard-results">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16233d]" data-testid="wizard-success-title">
                  Thanks, {form.firstName}! here are your matched banks
                </h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Matched for {form.amount} near {form.zip}. A CD specialist will reach out at {form.email} shortly
                with current availability.
              </p>
              <LeadResults lf={{ matches }} />
              <Button variant="outline" onClick={() => setStep(1)} className="mt-4 w-full border-slate-300 text-[#16233d] hover:bg-slate-50">
                Adjust preferences
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MatchWizard;
