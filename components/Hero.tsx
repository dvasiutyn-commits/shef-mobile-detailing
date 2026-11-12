import FadeIn from "@/components/FadeIn";

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-xl">
            <FadeIn delay={0.1}>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-400">
                Shef Mobile Detailing
              </p>
            </FadeIn>

            
              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
                Premium Mobile
                <br />
                Detailing
              </h1>
            

            <FadeIn delay={0.3}>
              <p className="mt-6 text-lg text-gray-300 md:text-xl">
                Professional interior and exterior detailing brought directly
                to your location.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black transition-all duration-300 active:scale-95 hover:scale-105 hover:bg-yellow-400"
                >
                  Book Now
                </a>

                <a
                  href="#pricing"
                  className="rounded-full border border-white px-8 py-4 font-semibold text-white transition-all duration-300 active:scale-95 hover:scale-105 hover:bg-white hover:text-black"
                >
                  Get Quote
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}