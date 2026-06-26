import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Card reveal
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -60, rotate: -4 },
        {
          opacity: 1,
          x: 0,
          rotate: -2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-light/10 to-transparent" />

      <div className="relative z-10 section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="order-2 lg:order-1">
            <h2
              ref={headingRef}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl gradient-text mb-8"
            >
              Moja Filozofia
            </h2>

            <div ref={cardRef} style={{ transform: "rotate(-2deg)" }}>
              <GlassCard className="p-6 sm:p-8 lg:p-10" tilt={true}>
                <p className="font-body text-base sm:text-lg text-charcoal/80 leading-relaxed mb-6" style={{ transform: "rotate(2deg)" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="font-body text-base sm:text-lg text-charcoal/80 leading-relaxed mb-8" style={{ transform: "rotate(2deg)" }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                <div className="flex items-center gap-4" style={{ transform: "rotate(2deg)" }}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink to-pink-hot flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-charcoal">
                      Kinga Bartochowska
                    </div>
                    <div className="font-body text-sm text-charcoal/60">
                      Certyfikowana Trenerka Personalna i Dietetyk
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Right Column - Editorial Portrait */}
          <div ref={imageRef} className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative elements behind image */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-[32px] bg-gradient-to-br from-pink-light/30 to-pink-soft/30 -z-10" />
              
              {/* Main portrait with a beautiful border and shadow */}
              <div className="relative p-3 sm:p-4 rounded-[32px] bg-white/50 backdrop-blur-lg border-2 border-white shadow-[0_25px_60px_-15px_rgba(224,17,95,0.25)]">
                <img
                  src="/assets/kinga2.png"
                  alt="Portret Kingi Bartochowskiej"
                  className="w-full max-w-sm lg:max-w-md h-auto object-contain rounded-2xl bg-gradient-to-tr from-pink-light/20 via-white/40 to-pink-soft/20"
                />
              </div>

              {/* Floating decorative shape */}
              <img
                src="/assets/dumbbell-3d.png"
                alt=""
                className="absolute -bottom-6 -left-6 w-16 sm:w-20 opacity-90 animate-float-slow z-20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
