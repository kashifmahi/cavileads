import React, { createContext, useContext, useState } from "react";
import PersonalizedModal from "../components/PersonalizedModal";

const RatesModalContext = createContext({ openRatesModal: () => {} });

export const useRatesModal = () => useContext(RatesModalContext);

export const RatesModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [defaultTerm, setDefaultTerm] = useState(null);
  const openRatesModal = (opts) => {
    setDefaultTerm(opts && opts.term ? opts.term : null);
    setOpen(true);
  };
  return (
    <RatesModalContext.Provider value={{ openRatesModal }}>
      {children}
      <PersonalizedModal open={open} onOpenChange={setOpen} defaultTerm={defaultTerm} />
    </RatesModalContext.Provider>
  );
};
