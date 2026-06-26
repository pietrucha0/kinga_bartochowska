import { useEffect, useRef } from "react";
import gsap from "gsap";
import PillButton from "@/components/PillButton";

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
      className="relative w-full min-h-[72vh] overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 bg-blush-mist" />

      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/clips.png"
          alt=""
          className="floating-shape absolute top-[2%] left-[3%] w-20 sm:w-32 md:w-40 opacity-80 animate-float-slow"
          style={{ animationDelay: "0s" }}
        />
        <img
          src="/assets/dumbbell.png"
          alt=""
          className="floating-shape absolute top-[12%] right-[8%] w-16 sm:w-24 md:w-32 opacity-70 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <img
          src="/assets/kettlebell.png"
          alt=""
          className="floating-shape absolute bottom-[20%] right-[3%] w-16 sm:w-24 md:w-32 opacity-70 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <img
          src="/assets/barbell.png"
          alt=""
          className="floating-shape absolute bottom-[15%] left-[30%] w-40 sm:w-64 md:w-80 opacity-90 animate-float-slow"
          style={{ animationDelay: "3s" }}
        />

      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-container pt-16 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[50vh]">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div ref={headlineRef} className="mb-4">
              <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
                <span className="headline-word inline-block gradient-text">
                  ZBUDUJ
                </span>{" "}
                <span className="headline-word inline-block gradient-text">
                  SWOJE
                </span>
                <br />
                <span className="headline-word inline-block text-charcoal">
                  WYMARZONE
                </span>{" "}
                <span className="headline-word inline-block text-charcoal">
                  CIAŁO
                </span>
              </h1>
            </div>

            <p className="subheadline font-accent text-2xl sm:text-3xl text-pink-hot mb-5 italic">
              Trenuj ciężko. Wyglądaj i czuj się świetnie.
            </p>



            <div ref={ctaRef} className="flex items-center gap-4">
              <div className="relative">
                <PillButton variant="cyan" onClick={() => {
                  document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  Zacznij teraz
                </PillButton>
              </div>
              <span className="font-body text-sm text-charcoal/60">
                Rozpocznij swoją metamorfozę
              </span>
            </div>
          </div>

          <div
            ref={trainerRef}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-pink-light/40 via-pink-mist/20 to-transparent rounded-full blur-3xl scale-90" />
              
              <img
                src="/assets/trainer.png"
                alt="Kinga Bartochowska - Personal Trainer"
                className="relative z-10 w-full max-w-[290px] sm:max-w-[350px] lg:max-w-[410px] xl:max-w-[460px] h-auto object-contain drop-shadow-2xl scale-120 lg:scale-125 origin-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
