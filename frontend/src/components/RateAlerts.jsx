import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BellRing, CheckCircle2, Loader2 } from "lucide-react";
import { API } from "../App";

const RateAlerts = () => {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [state, setState] = useState("idle"); // idle | loading | done
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setState("loading");
    try {
      await axios.post(`${API}/subscribers`, { email, frequency });
      setState("done");
    } catch (err) {
      console.error("subscribe failed", err);
      setError("Something went wrong. Please try again.");
      setState("idle");
    }
  };

  return (
    <section id="alerts" className="hero-bg relative overflow-hidden">
      <div className="absolute inset-0 hero-dots" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/15">
            <BellRing className="w-6 h-6 text-emerald-400" />
          </span>
          <h2 className="mt-5 font-serif text-3xl sm:text-4xl font-bold text-white">
            Never Miss a Rate Change
          </h2>
          <p className="mt-4 text-slate-300">
            Get the weekly top-10 CD rates in your inbox, or instant alerts the
            moment a bank moves its APY.
          </p>

          {state === "done" ? (
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 px-6 py-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <p className="text-emerald-300 font-medium">
                You're subscribed! Watch your inbox for {frequency === "weekly" ? "the weekly top-10" : "instant rate alerts"}.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8">
              <div className="flex justify-center gap-2 mb-5">
                {[
                  { label: "Weekly Top-10", value: "weekly" },
                  { label: "Instant Alerts", value: "instant" },
                ].map((f) => (
                  <button
                    type="button"
                    key={f.value}
                    onClick={() => setFrequency(f.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      frequency === f.value
                        ? "bg-emerald-600 text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-emerald-500"
                />
                <Button
                  type="submit"
                  disabled={state === "loading"}
                  className="h-12 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shrink-0"
                >
                  {state === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Get Rate Alerts"
                  )}
                </Button>
              </div>
              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
              <p className="mt-4 text-xs text-slate-500">
                Free forever. Unsubscribe anytime. We never share your email.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RateAlerts;
