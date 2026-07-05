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
    <>
      {/* Top Utility Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-charcoal text-white/90 text-xs flex justify-between items-center h-9 px-4 sm:px-8 border-b border-white/5 transition-all duration-500 ${
          scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="flex items-center gap-4 sm:gap-6 mx-auto sm:mx-0">
          <a
            href="mailto:kingsquadt@gmail.com"
            className="flex items-center gap-1.5 hover:text-cyan transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="font-body">kingsquadt@gmail.com</span>
          </a>
          <a
            href="tel:500547580"
            className="flex items-center gap-1.5 hover:text-cyan transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="font-body">500-547-580</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://www.instagram.com/kinga.bartochowska/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan transition-colors"
          >
            Instagram
          </a>
          <span className="text-white/20">|</span>
          <a
            href="https://www.tiktok.com/@kingsquadt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan transition-colors"
          >
            TikTok
          </a>
        </div>
      </div>

      <nav
        ref={navRef}
        className={`fixed left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-500 ${
          scrolled ? "top-0 py-3" : "top-9 py-4 sm:py-5"
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
          className="absolute left-6 sm:left-8 font-display font-bold text-lg sm:text-xl md:text-2xl gradient-text tracking-tight whitespace-nowrap"
        >
          KINGA BARTOCHOWSKA
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
    </>
  );
}
