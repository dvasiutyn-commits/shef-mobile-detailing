import { Car, Sparkles, Star } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-yellow-400/20 bg-[#171717] p-12 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            BOOK YOUR DETAIL TODAY
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Make Your Vehicle Look Like New Again
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Bring back that showroom shine with premium mobile detailing delivered
            right to your home or workplace throughout Chicagoland.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            {/* Book Now */}
            <a
              href="https://app.squareup.com/appointments/book/xz4vivgeaj8bsr/LYCKAKYQDWG1T/start"
              target="_blank"
             rel="noopener noreferrer"
              className="rounded-full bg-yellow-500 px-10 py-4 font-semibold text-black transition-all duration-300 active:scale-95 hover:scale-105 hover:bg-yellow-400"
            >
              Book Now
            </a>

            {/* Call Now */}
            <a
              href="tel:+13128852920"
              className="rounded-full border border-yellow-400 px-10 py-4 font-semibold text-yellow-400 transition duration-300 hover:scale-105 hover:bg-yellow-400 hover:text-black"
            >
              Call Now
            </a>

          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">

            <div className="flex flex-col items-center">
              <Car
                size={42}
                strokeWidth={2}
                className="text-yellow-400"
              />

              <p className="mt-3 font-semibold text-white">
                Fully Mobile
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Sparkles
                size={42}
                strokeWidth={2}
                className="text-yellow-400"
              />

              <p className="mt-3 font-semibold text-white">
                Premium Products
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Star
                size={42}
                strokeWidth={2}
                className="fill-yellow-400 text-yellow-400"
              />

              <p className="mt-3 font-semibold text-white">
                5★ Google Rating
              </p>
            </div>

          </div>

          <p className="mt-10 text-sm tracking-wide text-gray-500">
            Proudly serving Chicagoland • Mobile Service • By Appointment Only
          </p>

        </div>
      </div>
    </section>
  );
}