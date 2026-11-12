import FadeIn from "@/components/FadeIn";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-24 bg-black py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Pricing
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Simple & Transparent Pricing
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            Choose your service and vehicle size. Final price depends on
            vehicle condition.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {/* Interior */}
          <FadeIn delay={0.1}>
            <div className="group rounded-3xl border border-white/10 bg-[#171717] p-10 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-400/40 hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)]">
              <h3 className="mb-8 text-3xl font-bold text-white">
                Interior Detail
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">Sedan</span>
                  <span className="font-bold text-yellow-400">$120+</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">SUV</span>
                  <span className="font-bold text-yellow-400">$150+</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">Truck</span>
                  <span className="font-bold text-yellow-400">$170+</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Van</span>
                  <span className="font-bold text-yellow-400">$190+</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Exterior */}
          <FadeIn delay={0.2}>
            <div className="group rounded-3xl border border-white/10 bg-[#171717] p-10 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-400/40 hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)]">
              <h3 className="mb-8 text-3xl font-bold text-white">
                Exterior Detail
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">Sedan</span>
                  <span className="font-bold text-yellow-400">$80+</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">SUV</span>
                  <span className="font-bold text-yellow-400">$100+</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">Truck</span>
                  <span className="font-bold text-yellow-400">$120+</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Van</span>
                  <span className="font-bold text-yellow-400">$140+</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Full Detail */}
          <FadeIn delay={0.3}>
            <div className="group rounded-3xl border-2 border-yellow-400 bg-[#1A1A1A] p-10 shadow-xl shadow-yellow-500/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(234,179,8,0.25)]">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-yellow-400">
                MOST POPULAR
              </p>

              <h3 className="mb-8 text-3xl font-bold text-white">
                Full Detail
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">Sedan</span>
                  <span className="font-bold text-yellow-400">$180+</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">SUV</span>
                  <span className="font-bold text-yellow-400">$230+</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">Truck</span>
                  <span className="font-bold text-yellow-400">$260+</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Van</span>
                  <span className="font-bold text-yellow-400">$300+</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Extras */}
          <FadeIn delay={0.4}>
            <div className="group rounded-3xl border border-white/10 bg-[#171717] p-10 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-400/40 hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)]">
              <h3 className="mb-8 text-3xl font-bold text-white">
                Additional Services
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-gray-300">Pet Hair Removal</span>
                  <span className="font-bold text-yellow-400">From $40</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300">Extraction</span>
                  <span className="font-bold text-yellow-400">From $50</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <p className="text-center text-sm text-gray-500">
            * Final price may vary depending on vehicle size and condition.
          </p>
        </div>
      </div>
    </section>
  );
}