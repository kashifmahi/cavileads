import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import { formatTerm } from "../mock/mock";
import { useLeadForm, LeadFields, LeadResults } from "./LeadForm";

const PersonalizedModal = ({ open, onOpenChange, defaultTerm }) => {
  const lf = useLeadForm(open ? defaultTerm : null);
  const { step, setStep, form, setErrors, setServerError } = lf;

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
            <LeadFields lf={lf} />
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
            <LeadResults lf={lf} />
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
