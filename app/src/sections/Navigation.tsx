import { useEffect, useRef, useState } from "react";
import PillButton from "@/components/PillButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "O mnie", href: "#about" },
  { label: "Oferta", href: "#pricing" },
  { label: "Kontakt", href: "#contact" },
  { label: "Opinie", href: "#opinie" },
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

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.2 });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-500 ${
        scrolled ? "py-3" : "py-4 sm:py-5"
      }`}
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
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(0, { duration: 1.2 });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="absolute left-6 sm:left-8 flex items-center h-full"
        >
          <img
            src="/assets/kingsquad_logo.png"
            alt="King Squad Logo"
            className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 filter hover:opacity-80"
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 mx-auto">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-body text-sm font-medium text-charcoal/80 hover:text-charcoal transition-colors duration-300 relative group block py-1"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink to-pink-hot rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block absolute right-6 sm:right-8">
          <PillButton
            variant="cyan"
            className="text-xs lg:text-sm py-2 lg:py-2.5 px-4 lg:px-6"
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
          >
            Zacznij teraz
          </PillButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden absolute right-6 sm:right-8 flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Menu nawigacyjne"
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
        <ul className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-body text-base font-medium text-charcoal/80 hover:text-charcoal transition-colors text-left py-2 block"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <PillButton
              variant="cyan"
              className="mt-2 w-full"
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
            >
              Zacznij teraz
            </PillButton>
          </li>
        </ul>
      </div>
    </nav>
  );
}
