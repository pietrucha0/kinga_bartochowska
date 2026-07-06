import { useEffect, useRef } from "react";
import gsap from "gsap";
import PillButton from "@/components/PillButton";
import { getLenis } from "@/hooks/useSmoothScroll";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".floating-shape",
        { opacity: 0, scale: 0.5, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
        },
        0
      );

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
      className="relative w-full h-[100dvh] lg:min-h-screen xl:min-h-[72vh] overflow-hidden flex items-center py-0 lg:py-0"
    >
      <div className="absolute inset-0 bg-blush-mist" />

      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Clips - Top Left Corner */}
        <img
          src="/assets/clips.webp"
          alt=""
          className="floating-shape clips-shape absolute top-[2%] left-[2%] w-16 sm:top-[2%] sm:left-[3%] sm:w-32 md:w-40 animate-float-slow"
          style={{ animationDelay: "0s" }}
        />
        {/* Dumbbell - Top Right Corner */}
        <img
          src="/assets/dumbbell.webp"
          alt=""
          className="floating-shape dumbbell-shape absolute top-[4%] right-[2%] w-16 sm:top-[12%] sm:right-[8%] sm:w-24 md:w-32 animate-float"
          style={{ animationDelay: "1s" }}
        />
        {/* Kettlebell - Bottom Right Corner */}
        <img
          src="/assets/kettlebell.webp"
          alt=""
          className="floating-shape kettlebell-shape absolute bottom-[22%] right-[2%] w-16 sm:bottom-[20%] sm:right-[3%] sm:w-24 md:w-32 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        {/* Barbell - Desktop and Mobile */}
        <img
          src="/assets/barbell.webp"
          alt=""
          className="floating-shape barbell-shape absolute bottom-[2%] left-[2%] w-28 sm:bottom-[10%] sm:left-[45%] sm:w-64 md:w-80 animate-float-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full lg:h-auto section-container pt-[90px] sm:pt-32 lg:pt-16 pb-8 lg:pb-8 flex flex-col lg:block justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 items-center justify-center h-full lg:h-auto min-h-0 lg:min-h-[50vh] gap-2">
          
          {/* Group wrapper for text and CTA to keep them close on desktop, while maintaining mobile ordering via 'contents' */}
          <div className="contents lg:flex lg:flex-col lg:justify-center lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:gap-y-3 w-full">
            
            {/* 1. Headline - Order 1 on mobile, Col 1 Row 1 on desktop */}
            <div className="order-1 lg:order-none flex flex-col justify-center items-start text-left w-full pl-8 sm:pl-0 mt-1 lg:mt-0">
              <h1 className="font-display font-black sm:font-bold text-[38px] xs:text-[42px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] lg:leading-[0.85] tracking-tight lg:tracking-tighter">
                <span className="hero-headline-word inline-block gradient-text">
                  TWOJA
                </span>{" "}
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
            <div className="order-3 lg:order-none flex flex-col justify-center items-start text-left w-full pl-8 sm:pl-0 mt-1 lg:mt-0">
              <p className="hero-subheadline font-accent text-[21px] xs:text-[24px] sm:text-3xl text-pink-hot mb-1 lg:mb-0 italic leading-normal">
                Trenuj ciężko. Wyglądaj i czuj się świetnie.
              </p>
            </div>

            {/* 4. CTA - Order 4 on mobile, Col 1 Row 3 on desktop */}
            <div className="order-4 lg:order-none flex items-center justify-start w-full pl-8 sm:pl-0 mt-1 lg:mt-0">
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
                src="/assets/trainer.png"
                alt="Kinga Bartochowska - Personal Trainer"
                className="relative z-10 w-[96vw] lg:w-full max-w-[450px] lg:max-w-[410px] xl:max-w-[460px] max-h-[50vh] lg:max-h-none h-auto object-contain drop-shadow-2xl scale-110 sm:scale-100 lg:scale-125 origin-bottom transform lg:translate-y-6"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
