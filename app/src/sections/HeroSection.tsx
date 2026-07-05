import { useEffect, useRef } from "react";
import gsap from "gsap";
import PillButton from "@/components/PillButton";
import { getLenis } from "@/hooks/useSmoothScroll";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const trainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".floating-shape",
        { opacity: 0, scale: 0.5, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.15 },
        0
      );

      tl.fromTo(
        ".headline-word",
        { opacity: 0, y: 60, rotateX: -30 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.12 },
        0.3
      );

      tl.fromTo(
        ".subheadline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.7
      );

      tl.fromTo(
        trainerRef.current,
        { opacity: 0, x: 80, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        0.5
      );



      tl.fromTo(
        ctaRef.current,
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
      className="relative w-full min-h-screen lg:min-h-[72vh] overflow-hidden flex items-center py-12 lg:py-0"
    >
      <div className="absolute inset-0 bg-blush-mist" />

      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Clips - Top Left Corner */}
        <img
          src="/assets/clips.webp"
          alt=""
          className="floating-shape absolute top-[8%] left-[2%] w-24 opacity-35 sm:top-[2%] sm:left-[3%] sm:w-32 md:w-40 sm:opacity-80 animate-float-slow"
          style={{ animationDelay: "0s" }}
        />
        {/* Dumbbell - Top Right Corner */}
        <img
          src="/assets/dumbbell.webp"
          alt=""
          className="floating-shape absolute top-[12%] right-[2%] w-24 opacity-35 sm:top-[12%] sm:right-[8%] sm:w-24 md:w-32 sm:opacity-70 animate-float"
          style={{ animationDelay: "1s" }}
        />
        {/* Kettlebell - Bottom Right Corner */}
        <img
          src="/assets/kettlebell.webp"
          alt=""
          className="floating-shape absolute bottom-[8%] right-[2%] w-24 opacity-35 sm:bottom-[20%] sm:right-[3%] sm:w-24 md:w-32 sm:opacity-70 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        {/* Barbell - Desktop Only */}
        <img
          src="/assets/barbell.webp"
          alt=""
          className="floating-shape absolute bottom-[15%] left-[30%] w-40 sm:w-64 md:w-80 opacity-90 animate-float-slow hidden sm:block"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-container pt-32 pb-8 lg:pt-16 lg:pb-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-0 lg:min-h-[50vh]">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left order-1 lg:order-1 max-w-xl mx-auto lg:max-w-none">
            <div ref={headlineRef} className="mb-4">
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.85] tracking-tighter">
                <span className="headline-word inline-block gradient-text">
                  TWOJA
                </span>{" "}
                <span className="headline-word inline-block gradient-text">
                  NAJLEPSZA
                </span>{" "}
                <span className="headline-word inline-block gradient-text">
                  FORMA
                </span>
                <br />
                <span className="headline-word inline-block text-charcoal">
                  ZACZYNA
                </span>{" "}
                <span className="headline-word inline-block text-charcoal">
                  SIĘ
                </span>{" "}
                <span className="headline-word inline-block text-charcoal">
                  TUTAJ
                </span>
              </h1>
            </div>

            <p className="subheadline font-accent text-2xl sm:text-3xl text-pink-hot mb-5 italic">
              Trenuj ciężko. Wyglądaj i czuj się świetnie.
            </p>

            <div ref={ctaRef} className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="relative">
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

          {/* Right Column - Trainer Portrait (Visible on all screens) */}
          <div
            ref={trainerRef}
            className="flex relative justify-center lg:justify-end order-2 lg:order-2 mt-8 lg:mt-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-pink-light/40 via-pink-mist/20 to-transparent rounded-full blur-3xl scale-90" />
              
              <img
                src="/assets/trainer.webp"
                alt="Kinga Bartochowska - Personal Trainer"
                className="relative z-10 w-full max-w-[250px] sm:max-w-[320px] lg:max-w-[410px] xl:max-w-[460px] h-auto object-contain drop-shadow-2xl scale-110 lg:scale-125 origin-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
