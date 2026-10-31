import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { formatTerm } from "../mock/mock";
import { getAttribution } from "../lib/attribution";
import { API } from "../App";

const amountOptions = [
  "$50,000 - $99,999",
  "$100,000 - $249,999",
  "$250,000 - $499,999",
  "$500,000+",
];

const timeframeOptions = [
  "Immediately",
  "Within 1 week",
  "Within 1 month",
];

const termOptions = [
  { label: "6 months", value: 6 },
  { label: "12 months", value: 12 },
  { label: "2 years", value: 24 },
  { label: "3 years", value: 36 },
  { label: "5 years", value: 60 },
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  amount: "",
  timeframe: "",
  term: "",
  agree: true,
};

const PersonalizedModal = ({ open, onOpenChange, defaultTerm }) => {
  const [step, setStep] = useState("form"); // form | results
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [matches, setMatches] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (open && defaultTerm) {
      setForm((f) => ({ ...f, term: String(defaultTerm) }));
    }
  }, [open, defaultTerm]);

  const set = (field) => (value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.phone || form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Please enter a valid phone number.";
    if (!form.amount) e.amount = "Please select an investment amount.";
    if (!form.timeframe) e.timeframe = "Please select a timeframe.";
    if (!form.term) e.term = "Please select a CD term.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setServerError("");
    setSubmitting(true);
    try {
      const attr = getAttribution();
      const res = await axios.post(`${API}/leads`, {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email,
        phone: `+1 ${form.phone}`,
        investment_amount: form.amount,
        timeframe: form.timeframe,
        term_months: Number(form.term),
        agree: true,
        source_page: attr.source_page || window.location.pathname,
        utm_source: attr.utm_source || "",
        utm_medium: attr.utm_medium || "",
        utm_campaign: attr.utm_campaign || "",
        utm_term: attr.utm_term || "",
        gclid: attr.gclid || "",
      });
      // Google Ads / GA4 conversion event (fires only if a Google tag is installed)
      try {
        if (window.gtag) {
          // Google Ads conversion: "Cavicord lead form" (account 193-165-7031)
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
      setStep("results");
    } catch (err) {
      console.error("lead submit failed", err);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = (o) => {
    onOpenChange(o);
    if (!o) {
      setTimeout(() => {
        setStep("form");
        setErrors({});
        setServerError("");
      }, 300);
    }
  };

  const fieldError = (name) =>
    errors[name] ? <p className="text-xs text-red-600 mt-1">{errors[name]}</p> : null;

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-[#16233d] text-xl">
                Get Personalized CD Rates
              </DialogTitle>
              <DialogDescription>
                Fill out the form below and a CD specialist will help you find the
                best rates for deposits of $50,000 or more.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-1" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-slate-700">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    data-testid="lead-first-name"
                    value={form.firstName}
                    onChange={(e) => set("firstName")(e.target.value)}
                    className="h-11"
                  />
                  {fieldError("firstName")}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-slate-700">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    data-testid="lead-last-name"
                    value={form.lastName}
                    onChange={(e) => set("lastName")(e.target.value)}
                    className="h-11"
                  />
                  {fieldError("lastName")}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  data-testid="lead-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  className="h-11"
                />
                {fieldError("email")}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-slate-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-slate-50 text-sm text-slate-600 font-medium">
                    +1
                  </span>
                  <Input
                    id="phone"
                    data-testid="lead-phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    className="h-11 rounded-l-none"
                  />
                </div>
                {fieldError("phone")}
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-700">
                  Ideal Investment Amount <span className="text-red-500">*</span>
                </Label>
                <Select value={form.amount} onValueChange={set("amount")}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    {amountOptions.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldError("amount")}
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-700">
                  Ideal Investment Timeframe <span className="text-red-500">*</span>
                </Label>
                <Select value={form.timeframe} onValueChange={set("timeframe")}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframeOptions.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldError("timeframe")}
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-700">
                  Ideal CD Term <span className="text-red-500">*</span>
                </Label>
                <Select value={form.term} onValueChange={set("term")}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    {termOptions.map((t) => (
                      <SelectItem key={t.value} value={String(t.value)}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldError("term")}
              </div>

              <p className="text-xs text-slate-500 leading-snug pt-1">
                By submitting, you agree to our{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-[#16233d] font-medium">Privacy Policy</a> and{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline text-[#16233d] font-medium">Terms of Service</a>{" "}
                and to being contacted about CD rates at the details above.
              </p>

              {serverError && <p className="text-sm text-red-600">{serverError}</p>}

              <Button
                type="submit"
                data-testid="lead-submit-button"
                disabled={submitting}
                className="w-full h-11 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold group"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    Get My Personalized Rates
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </>
                )}
              </Button>
              <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Sent securely and shared only with our partner banks and advisors to answer your request.
              </p>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <DialogTitle className="font-serif text-[#16233d] text-xl" data-testid="lead-success-title">
                  Thanks, {form.firstName}! Here Are Your Top Matches
                </DialogTitle>
              </div>
              <DialogDescription>
                Best {formatTerm(Number(form.term))} CDs for {form.amount}. A CD
                specialist will reach out at {form.email} shortly.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              {matches.length === 0 && (
                <p className="text-sm text-slate-500">
                  No CDs match that amount range. A specialist will contact you
                  with tailored options.
                </p>
              )}
              {matches.map((rate, i) => (
                <div
                  key={rate.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:border-emerald-300 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-sm"
                      style={{ backgroundColor: rate.color }}
                    >
                      {rate.bank.charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold text-[#16233d] text-sm">{rate.bank}</p>
                      {i === 0 && (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 text-[10px] mt-0.5">
                          Top Pick
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">{rate.apy.toFixed(2)}%</p>
                    <p className="text-[10px] text-slate-500 uppercase">APY</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setStep("form")}
              className="w-full border-slate-300 text-[#16233d] hover:bg-slate-50"
            >
              Adjust Preferences
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PersonalizedModal;
