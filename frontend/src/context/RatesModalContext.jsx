import React, { createContext, useContext } from "react";

// Lead capture was removed (Nov 2026). Cavicord no longer collects deposit
// amounts or phone numbers. "openRatesModal" now just takes the visitor to the
// rate table (on this page if present, otherwise the all-rates page).
const scrollToRates = () => {
  if (typeof document === "undefined") return;
  const el = document.getElementById("rates");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.assign("/best-cd-rates");
  }
};

const RatesModalContext = createContext({ openRatesModal: scrollToRates });

export const useRatesModal = () => useContext(RatesModalContext);

export const RatesModalProvider = ({ children }) => (
  <RatesModalContext.Provider value={{ openRatesModal: scrollToRates }}>
    {children}
  </RatesModalContext.Provider>
);
