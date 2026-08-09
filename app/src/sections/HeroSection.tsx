import { useEffect, useRef } from "react";
import gsap from "gsap";
import PillButton from "@/components/PillButton";
import { getLenis } from "@/hooks/useSmoothScroll";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-headline-word",
        { opacity: 0, y: 60, rotateX: -30 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.12 },
        0.3
      );

      tl.fromTo(
        ".hero-subheadline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.7
      );

      tl.fromTo(
        ".hero-trainer-image",
        { opacity: 0, x: () => window.innerWidth < 1024 ? 0 : 80, y: () => window.innerWidth < 1024 ? 40 : 0, scale: 0.9 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 1 },
        0.5
      );

      tl.fromTo(
        ".hero-cta-button",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        1
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:min-h-screen overflow-hidden flex items-center py-0 lg:py-0"
    >
      {/* Background Gradient & Ambient Glows */}
      <div className="absolute inset-0 hero-bg-gradient" />
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-pink/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-cyan/12 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full h-full lg:h-auto section-container pt-[110px] sm:pt-32 lg:pt-16 pb-16 sm:pb-24 lg:pb-8 flex flex-col lg:block justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 items-center justify-center h-full lg:h-auto min-h-0 lg:min-h-[50vh] gap-1 sm:gap-2">
          
          {/* Group wrapper for text and CTA to keep them close on desktop, while maintaining mobile ordering via 'contents' */}
          <div className="contents lg:flex lg:flex-col lg:justify-center lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:gap-y-6 w-full">
            
            {/* 1. Headline - Order 1 on mobile, Col 1 Row 1 on desktop */}
            <div className="order-1 lg:order-none flex flex-col justify-center items-start text-left w-full pl-6 sm:pl-0 mt-1 lg:mt-0">
              <h1 className="font-display font-black sm:font-bold text-[38px] xs:text-[42px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] lg:leading-[0.85] tracking-tight lg:tracking-tighter">
                <span className="hero-headline-word inline-block gradient-text">
                  TWOJA
                </span>{" "}
                <br className="block sm:hidden" />
                <span className="hero-headline-word inline-block gradient-text">
                  NAJLEPSZA
                </span>{" "}
                <span className="hero-headline-word inline-block gradient-text">
                  FORMA
                </span>
                <br />
                <span className="hero-headline-word inline-block text-charcoal">
                  ZACZYNA
                </span>{" "}
                <span className="hero-headline-word inline-block text-charcoal">
                  SIĘ
                </span>{" "}
                <span className="hero-headline-word inline-block text-charcoal">
                  TUTAJ
                </span>
              </h1>
            </div>

            {/* 3. Subheadline - Order 3 on mobile, Col 1 Row 2 on desktop */}
            <div className="order-3 lg:order-none flex flex-col justify-center items-start text-left w-full pl-6 sm:pl-0 mt-5 sm:mt-6 lg:mt-2.5">
              <p className="hero-subheadline font-body text-base sm:text-lg lg:text-xl text-pink-hot font-bold leading-snug">
                Trenuj ciężko, wyglądaj i czuj się świetnie
              </p>
            </div>

            {/* 4. CTA - Order 4 on mobile, Col 1 Row 3 on desktop */}
            <div className="order-4 lg:order-none flex items-center justify-start w-full pl-6 sm:pl-0 mt-5 sm:mt-6 lg:mt-2.5">
              <div className="relative hero-cta-button">
                <PillButton
                  variant="cyan"
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    getLenis()?.scrollTo("#pricing", { duration: 1.2 });
                  }}
                >
                  Zacznij teraz
                </PillButton>
              </div>
            </div>

          </div>

          {/* 2. Trainer Portrait - Order 2 on mobile, Col 2 Row 1-3 on desktop */}
          <div
            className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3 flex relative justify-center lg:justify-end mt-1 lg:mt-0"
          >
            <div className="relative hero-trainer-image">
              <div className="absolute inset-0 bg-gradient-to-t from-pink-light/40 via-pink-mist/20 to-transparent rounded-full blur-3xl scale-90" />
              
              <img
                src="/assets/hero-kinga.png"
                alt="Kinga Bartochowska - Personal Trainer"
                className="relative z-10 w-[96vw] lg:w-full max-w-[450px] lg:max-w-[410px] xl:max-w-[460px] max-h-[46vh] sm:max-h-[50vh] lg:max-h-none h-auto object-contain drop-shadow-2xl scale-105 sm:scale-100 lg:scale-125 origin-bottom transform lg:translate-y-6"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
