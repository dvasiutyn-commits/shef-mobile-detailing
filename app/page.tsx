import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <FadeIn>
        <Services />
      </FadeIn>

      <FadeIn>
        <Pricing />
      </FadeIn>

      <FadeIn>
        <Reviews />
      </FadeIn>

      <FadeIn>
        <FAQ />
      </FadeIn>

      <FadeIn>
        <CTA />
      </FadeIn>

      <Footer />
    </>
  );
}