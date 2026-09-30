import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Cookie } from "lucide-react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cavicord_cookie_consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handle = (choice) => {
    localStorage.setItem("cavicord_cookie_consent", choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-xl animate-fade-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 shrink-0">
            <Cookie className="w-5 h-5 text-emerald-600" />
          </span>
          <p className="text-sm text-slate-600 leading-relaxed">
            We use cookies and tracking technologies to improve your experience,
            analyze site traffic, and support our marketing efforts. By clicking
            "Accept", you consent to the use of cookies as described in our{" "}
            <span className="underline text-[#16233d] font-medium cursor-pointer">Cookie Policy</span>.
          </p>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handle("declined")}
            className="border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={() => handle("accepted")}
            className="bg-[#16233d] hover:bg-[#1e2f52] text-white"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
