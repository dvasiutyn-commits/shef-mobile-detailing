"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "Do you come to my location?",
    answer:
      "Yes! We provide fully mobile detailing throughout the Chicagoland area.",
  },
  {
    question: "Do I need to provide water and electricity?",
    answer:
      "Yes, access to water and electricity is required for most detailing services.",
  },
  {
    question: "How long does a detail take?",
    answer:
      "Most appointments take between 2 and 5 hours depending on the vehicle size and condition.",
  },
  {
    question: "Do you remove pet hair?",
    answer:
      "Yes! Pet hair removal is available as an additional service.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Simply click the Book Now button or contact us directly by phone or message.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-black py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-gray-400">
            Everything you need to know before booking your appointment.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border bg-[#171717] transition-all duration-300 ${
                  isOpen
                    ? "border-yellow-400/40 shadow-lg shadow-yellow-500/5"
                    : "border-white/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-white/[0.02]"
                >
                  <span className="pr-6 font-semibold text-white">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="shrink-0 text-2xl text-yellow-400"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: {
                          duration: 0.35,
                          ease: "easeInOut",
                        },
                        opacity: {
                          duration: 0.2,
                        },
                      }}
                    >
                      <div className="px-6 pb-6 text-gray-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}