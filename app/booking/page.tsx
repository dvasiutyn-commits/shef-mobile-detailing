
import type { Metadata } from "next";
import BookingForm from "../../components/BookingForm";

export const metadata: Metadata = {
  title: "Book Mobile Car Detailing | SHEF Mobile Detailing",
  description:
    "Book professional mobile car detailing in Chicagoland. Choose your interior, exterior, or full detailing service and request an appointment.",
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-500">
          SHEF Mobile Detailing
        </p>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Book Your Detail
        </h1>

        <p className="mb-10 text-gray-400">
          Customize your detailing service and request your
          preferred appointment date.
        </p>

        <BookingForm />
      </div>
    </main>
  );
}
