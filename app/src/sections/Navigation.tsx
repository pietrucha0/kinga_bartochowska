import { useEffect, useRef, useState } from "react";
import PillButton from "@/components/PillButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Filozofia", href: "#philosophy" },
  { label: "Osiągnięcia", href: "#achievements" },
  { label: "Metamorfozy", href: "#transformations" },
  { label: "Cennik", href: "#pricing" },
  { label: "Opinie", href: "#community" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-5 transition-all duration-500"
    >
      <div
        className={`mx-auto max-w-6xl relative flex items-center h-[60px] px-6 sm:px-8 rounded-pill transition-all duration-500 ${
          scrolled
            ? "bg-white/40 backdrop-blur-2xl shadow-glass border border-white/60"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="absolute left-6 sm:left-8 font-display font-bold text-lg sm:text-xl md:text-2xl gradient-text tracking-tight whitespace-nowrap"
        >
          KINGA BARTOCHOWSKA
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 mx-auto">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-body text-sm font-medium text-charcoal/80 hover:text-charcoal transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink to-pink-hot rounded-full transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block absolute right-6 sm:right-8">
          <PillButton
            variant="cyan"
            className="text-xs lg:text-sm py-2 lg:py-2.5 px-4 lg:px-6"
            onClick={() => scrollToSection("#contact")}
          >
            Zacznij teraz
          </PillButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden absolute right-6 sm:right-8 flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-2 mx-auto max-w-6xl rounded-3xl overflow-hidden transition-all duration-500 ${
          mobileOpen
            ? "max-h-[400px] opacity-100 bg-white/50 backdrop-blur-2xl border border-white/60 shadow-glass"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-body text-base font-medium text-charcoal/80 hover:text-charcoal transition-colors text-left py-2"
            >
              {link.label}
            </button>
          ))}
          <PillButton
            variant="cyan"
            className="mt-2 w-full"
            onClick={() => scrollToSection("#contact")}
          >
            Zacznij teraz
          </PillButton>
        </div>
      </div>
    </nav>
  );
}
