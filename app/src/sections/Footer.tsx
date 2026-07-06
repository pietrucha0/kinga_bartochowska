import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    href: "https://www.instagram.com/kinga.bartochowska/",
  },
  {
    name: "TikTok",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.33 6.34 6.34 6.34 0 006.33-6.33V9.91a8.27 8.27 0 004.84 1.55v-3.5a4.85 4.85 0 01-1.06-.27z" />
      </svg>
    ),
    href: "https://www.tiktok.com/@kingsquadt",
  },
  // {
  //   name: "YouTube",
  //   icon: (
  //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  //       <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  //     </svg>
  //   ),
  //   href: "#",
  // },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const emailUser = "tdauqsgnik";
  const emailDomain = "moc.liamg";
  const emailAddress = emailUser.split("").reverse().join("") + "@" + emailDomain.split("").reverse().join("");

  const phonePart1 = "085";
  const phonePart2 = "745";
  const phonePart3 = "005";
  const rev = (s: string) => s.split("").reverse().join("");
  const phoneRaw = rev(phonePart3) + rev(phonePart2) + rev(phonePart1);
  const phoneFormatted = `${rev(phonePart3)}-${rev(phonePart2)}-${rev(phonePart1)}`;

  return (
    <footer
      ref={footerRef}
      className="relative bg-blush-mist border-t border-pink-light/30 pt-20 pb-10 overflow-hidden"
    >
      <div className="section-container relative z-10">
        <div className="footer-content flex flex-col items-center">
          {/* Logo */}
          <a
            href="#"
            className="mb-6 block"
          >
            <img
              src="/assets/kingsquad_logo.png"
              alt="King Squad Logo"
              className="h-16 sm:h-20 w-auto object-contain mx-auto transition-all duration-300 filter hover:opacity-80"
            />
          </a>

          <p className="font-accent text-xl sm:text-2xl text-pink-hot italic mb-6 text-center">
            Odmień swoje ciało, odmień swoje życie
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-8 text-charcoal/70 font-body text-sm">
            <a href={`mailto:${emailAddress}`} className="hover:text-pink transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 text-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{emailAddress}</span>
            </a>
            <a href={`tel:${phoneRaw}`} className="hover:text-pink transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{phoneFormatted}</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-10">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-5 py-2.5 flex items-center gap-2 font-body text-sm text-charcoal/80 hover:text-charcoal transition-all duration-300 hover:shadow-glass"
                aria-label={link.name}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.name}</span>
              </a>
            ))}
          </div>



          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-pink/30 to-transparent mb-6" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 font-body text-xs text-charcoal/50 text-center">
            <span>&copy; {new Date().getFullYear()} Kinga Bartochowska. Wszelkie prawa zastrzeżone.</span>
            <span className="hidden sm:inline">&middot;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
