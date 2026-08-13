"use client";

import { useState } from "react";

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
  className="bg-black py-24 scroll-mt-24"
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

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-[#171717]"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >

                <span className="font-semibold text-white">
                  {faq.question}
                </span>

                <span className="text-2xl text-yellow-400">
                  {open === index ? "−" : "+"}
                </span>

              </button>


              {open === index && (
                <div className="px-6 pb-6 text-gray-400">
                  {faq.answer}
                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}