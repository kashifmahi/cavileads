import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { faqs } from "../mock/mock";

const FAQSection = () => {
  return (
    <section id="faq" className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#16233d]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-500">
            Everything you need to know about certificates of deposit.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-slate-200 bg-white px-6 shadow-sm data-[state=open]:border-emerald-200 transition-colors duration-200"
            >
              <AccordionTrigger className="text-left text-base font-semibold text-[#16233d] hover:no-underline hover:text-emerald-700 py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
