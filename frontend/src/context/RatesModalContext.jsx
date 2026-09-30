import React, { createContext, useContext, useState } from "react";
import PersonalizedModal from "../components/PersonalizedModal";

const RatesModalContext = createContext({ openRatesModal: () => {} });

export const useRatesModal = () => useContext(RatesModalContext);

export const RatesModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <RatesModalContext.Provider value={{ openRatesModal: () => setOpen(true) }}>
      {children}
      <PersonalizedModal open={open} onOpenChange={setOpen} />
    </RatesModalContext.Provider>
  );
};
