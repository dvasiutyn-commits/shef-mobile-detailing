import FadeIn from "@/components/FadeIn";

export default function Services() {
  return (
    <section
      id="services"
      className="bg-black py-16 scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            OUR SERVICES
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Premium Detailing Services
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            Professional detailing tailored to your vehicle. From interior
            refreshes to complete details, every service is performed with
            premium products and attention to detail.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Interior Detail */}
          <FadeIn delay={0.1}>
            <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#171717] p-8 transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400 hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)]">
              <h3 className="text-2xl font-bold text-white">
                Interior Detail
              </h3>

              <div className="mt-4">
                <p className="text-sm uppercase tracking-wider text-gray-400">
                  Starting at
                </p>

                <p className="text-5xl font-extrabold text-yellow-400">
                  $120
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-gray-300">
                <li>✓ Full Interior Vacuum</li>
                <li>✓ Deep Interior Cleaning</li>
                <li>✓ Dashboard, Console & Door Panels</li>
                <li>✓ Floor Mats Cleaned</li>
                <li>✓ Windows & Mirrors</li>
                <li>✓ Odor Reduction</li>
              </ul>

              <a
                href="#pricing"
                className="mt-8 block w-full rounded-full bg-yellow-500 py-2.5 text-center font-semibold text-black transition-all duration-300 active:scale-95 hover:scale-105 hover:bg-yellow-400"
              >
                View Pricing
              </a>
            </div>
          </FadeIn>

          {/* Exterior Detail */}
          <FadeIn delay={0.2}>
            <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#171717] p-8 transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400 hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)]">
              <h3 className="text-2xl font-bold text-white">
                Exterior Detail
              </h3>

              <div className="mt-4">
                <p className="text-sm uppercase tracking-wider text-gray-400">
                  Starting at
                </p>

                <p className="text-5xl font-extrabold text-yellow-400">
                  $80
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-gray-300">
                <li>✓ Hand Wash</li>
                <li>✓ Wheels & Tires</li>
                <li>✓ Door Jambs</li>
                <li>✓ Bug Removal</li>
                <li>✓ Spray Wax Protection</li>
                <li>✓ Tire Dressing</li>
                <li>✓ Crystal Clear Windows</li>
              </ul>

              <a
                href="#pricing"
                className="mt-8 block w-full rounded-full bg-yellow-500 py-2.5 text-center font-semibold text-black transition-all duration-300 active:scale-95 hover:scale-105 hover:bg-yellow-400"
              >
                View Pricing
              </a>
            </div>
          </FadeIn>

          {/* Full Detail */}
          <FadeIn delay={0.3}>
            <div className="group flex h-full flex-col rounded-2xl border-2 border-yellow-400 bg-[#1A1A1A] p-8 shadow-xl shadow-yellow-500/15 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(234,179,8,0.25)]">
              <p className="mb-2 text-sm font-bold uppercase text-yellow-400">
                Most Popular
              </p>

              <h3 className="text-2xl font-bold text-white">
                Full Detail
              </h3>

              <div className="mt-4">
                <p className="text-sm uppercase tracking-wider text-gray-400">
                  Starting at
                </p>

                <p className="text-5xl font-extrabold text-yellow-400">
                  $180
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-gray-300">
                <li>✓ Everything Included in Interior Detail</li>
                <li>✓ Everything Included in Exterior Detail</li>
                <li>✓ Premium Spray Wax Protection</li>
                <li>✓ Crystal Clear Windows</li>
                <li>✓ Odor Reduction</li>
              </ul>

              <a
                href="#pricing"
                className="mt-8 block w-full rounded-full bg-yellow-500 py-2.5 text-center font-semibold text-black transition-all duration-300 active:scale-95 hover:scale-105 hover:bg-yellow-400"
              >
                View Pricing
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}