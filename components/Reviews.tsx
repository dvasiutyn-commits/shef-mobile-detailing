import FadeIn from "@/components/FadeIn";

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 bg-[#0B0B0B] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            GOOGLE REVIEWS
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Trusted by Our Customers
          </h2>

          <div className="mt-6 flex flex-col items-center">
            <div className="text-2xl text-yellow-400">
              ★★★★★
            </div>

            <p className="mt-2 text-lg font-semibold text-white">
              5.0 Rating
            </p>

            <p className="text-gray-400">
              Real Reviews From Real Customers
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Review 1 */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-[#171717] p-8 transition duration-500 hover:-translate-y-2 hover:border-yellow-400/30">
              <div className="text-xl text-yellow-400">
                ★★★★★
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Verified Google Review
              </p>

              <p className="mt-5 italic text-gray-300">
                &quot;My car looks like new, and the attention to detail was amazing.
                Everything was spotless, and the whole experience was professional
                and friendly. I&apos;ll definitely be coming back!&quot;
              </p>

              <p className="mt-6 font-semibold text-white">
                — Angie Bernal
              </p>
            </div>
          </FadeIn>

          {/* Review 2 */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-white/10 bg-[#171717] p-8 transition duration-500 hover:-translate-y-2 hover:border-yellow-400/30">
              <div className="text-xl text-yellow-400">
                ★★★★★
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Verified Google Review
              </p>

              <p className="mt-5 italic text-gray-300">
                &quot;I would definitely recommend these young guys for car detailing.
                I received great service and was really impressed with the results.
                Keep up the great work!&quot;
              </p>

              <p className="mt-6 font-semibold text-white">
                — Solongo Ochirbat
              </p>
            </div>
          </FadeIn>

          {/* Review 3 */}
          <FadeIn delay={0.3}>
            <div className="rounded-2xl border border-white/10 bg-[#171717] p-8 transition duration-500 hover:-translate-y-2 hover:border-yellow-400/30">
              <div className="text-xl text-yellow-400">
                ★★★★★
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Verified Google Review
              </p>

              <p className="mt-5 italic text-gray-300">
                &quot;Highly recommend! My car honestly looks brand new again.
                Super clean work, attention to every detail, and great service overall.&quot;
              </p>

              <p className="mt-6 font-semibold text-white">
                — Владислав Олійник
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://share.google/RJJuOTVxc8hljyJHI"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-yellow-400 px-8 py-3 font-semibold text-yellow-400 transition-all duration-300 active:scale-95 hover:scale-105 hover:bg-yellow-400 hover:text-black"
          >
            View All Google Reviews
          </a>
        </div>
      </div>
    </section>
  );
}