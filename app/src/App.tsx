import useSmoothScroll from "@/hooks/useSmoothScroll";
import Navigation from "@/sections/Navigation";
import HeroSection from "@/sections/HeroSection";
import PhilosophySection from "@/sections/PhilosophySection";
import TransformationsSection from "@/sections/TransformationsSection";
import PricingSection from "@/sections/PricingSection";
import OpinionsSection from "@/sections/OpinionsSection";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/sections/Footer";

export default function App() {
  useSmoothScroll();

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <PhilosophySection />
        <TransformationsSection />
        <PricingSection />
        <ContactSection />
        <OpinionsSection />
      </main>
      <Footer />
    </div>
  );
}
