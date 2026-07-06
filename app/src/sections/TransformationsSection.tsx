import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  {
    name: "Sarah M.",
    duration: "12 tygodni",
    result: "-12 kg",
    quote: "Kinga zmieniła moje życie. W końcu czuję się dobrze we własnej skórze.",
    gradient: "from-pink-light to-pink-soft",
  },
  {
    name: "Jessica L.",
    duration: "16 tygodni",
    result: "+7 kg mięśni",
    quote: "Spersonalizowany plan zrobił ogromną różnicę. Najlepsza inwestycja w życiu.",
    gradient: "from-pink-soft to-pink-light",
  },
  {
    name: "Emily R.",
    duration: "8 tygodni",
    result: "-8 kg",
    quote: "Nigdy nie sądziłam, że polubię treningi, dopóki nie trafiłam na program Kingi.",
    gradient: "from-pink-mist to-pink-light",
  },
  {
    name: "Amanda K.",
    duration: "20 tygodni",
    result: "-16 kg",
    quote: "Od kanapowca do biegacza maratońskiego. Kinga wierzyła we mnie, gdy ja sama w siebie wątpiłam.",
    gradient: "from-pink-light to-pink-mist",
  },
];

export default function TransformationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollTransformations = (direction: "left" | "right") => {
    if (cardsRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      cardsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const canScroll = scrollWidth > clientWidth;
    setShowLeftArrow(canScroll && scrollLeft > 10);
    setShowRightArrow(canScroll && scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardsRef.current) {
        const { scrollWidth, clientWidth } = cardsRef.current;
        setShowRightArrow(scrollWidth > clientWidth);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".transform-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Cards animation with alternating slide directions
      const cards = cardsRef.current?.querySelectorAll(".transform-card");
      if (cards) {
        cards.forEach((card, index) => {
          const xFrom = index % 2 === 0 ? -80 : 80;
          gsap.fromTo(
            card,
            { opacity: 0, x: xFrom, y: 40 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="transformations"
      className="relative w-full py-12 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-blush-mist" />

      {/* Decorative elements */}
      <img
        src="/assets/clips.webp"
        alt=""
        loading="lazy"
        className="absolute top-[8%] right-[3%] w-16 sm:w-24 opacity-40 animate-float-slow"
      />
      <img
        src="/assets/kettlebell.webp"
        alt=""
        loading="lazy"
        className="absolute bottom-[10%] left-[5%] w-14 sm:w-20 opacity-35 animate-float"
      />

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="transform-heading font-display font-bold text-4xl sm:text-5xl lg:text-6xl gradient-text mb-4">
            Prawdziwe Efekty
          </h2>
          <p className="transform-heading font-body text-base sm:text-lg text-charcoal/70 max-w-xl mx-auto">
            Te niesamowite kobiety zaufały procesowi i odmieniły swoje życie.
            Twoja historia może być następna.
          </p>
        </div>

        {/* Scroll Container Wrapper with Mobile Scroll Indicators */}
        <div className="relative max-w-5xl mx-auto">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scrollTransformations("left")}
            className={`absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-glass sm:hidden transition-all duration-300 hover:bg-white/45 active:scale-90 ${
              showLeftArrow ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
            }`}
            aria-label="Poprzedni"
          >
            <svg className="w-5 h-5 text-pink-hot" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Transformation Cards Grid */}
          <div
            ref={cardsRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none gap-6 pb-6 sm:pb-0 px-4 sm:px-0 -mx-4 sm:mx-auto scrollbar-none sm:grid sm:grid-cols-2 lg:gap-8"
          >
            {transformations.map((t) => (
              <div
                key={t.name}
                className="transform-card w-[85vw] sm:w-auto shrink-0 sm:shrink snap-center glass-card p-6 sm:p-8 bg-gradient-to-br from-white/40 to-white/20 hover:shadow-glass-lg transition-all duration-500 group"
              >
              {/* Before/After visual representation */}
              <div className="flex gap-3 mb-6">
                <div
                  className={`flex-1 h-28 sm:h-32 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <span className="font-display font-bold text-white/40 text-lg">
                    PRZED
                  </span>
                  <div className="absolute inset-0 bg-charcoal/10" />
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-pink"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
                <div
                  className={`flex-1 h-28 sm:h-32 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <span className="font-display font-bold text-white/70 text-lg">
                    PO
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold text-lg text-charcoal">
                    {t.name}
                  </h3>
                  <p className="font-body text-sm text-charcoal/60">
                    {t.duration}
                  </p>
                </div>
                <div className="glass-card px-3 py-1.5 bg-pink/20">
                  <span className="font-display font-bold text-sm gradient-text">
                    {t.result}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <p className="font-body text-base text-pink-hot italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scrollTransformations("right")}
            className={`absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-glass sm:hidden transition-all duration-300 hover:bg-white/45 active:scale-90 ${
              showRightArrow ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
            }`}
            aria-label="Następny"
          >
            <svg className="w-5 h-5 text-pink-hot" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-charcoal/70 mb-4">
            Dołącz do kobiet, które już przeszły swoją metamorfozę
          </p>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              getLenis()?.scrollTo("#pricing", { duration: 1.2 });
            }}
            className="font-display font-semibold text-lg gradient-text hover:opacity-80 transition-opacity inline-flex items-center gap-2 group"
          >
            Rozpocznij swoją metamorfozę
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
