import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillButton from "@/components/PillButton";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Samodzielny",
    price: "119 zł",
    period: "/miesiąc",
    description: "Idealny dla samodzielnych entuzjastek fitnessu",
    features: [
      "Dostęp do biblioteki treningów",
      "Podstawowy przewodnik żywieniowy",
      "Dostęp do forum społeczności",
      "Aplikacja do śledzenia postępów",
      "Cotygodniowe wskazówki e-mail",
    ],
    cta: "Rozpocznij",
    variant: "outline" as const,
    popular: false,
    tint: "from-pink-mist/60 to-pink-light/40",
  },
  {
    name: "Z Trenerem",
    price: "299 zł",
    period: "/miesiąc",
    description: "Spersonalizowane wsparcie dla szybszych efektów",
    features: [
      "Wszystko z planu Samodzielnego",
      "Konsultacja wideo 1-na-1 co miesiąc",
      "Indywidualne plany treningowe",
      "Spersonalizowany plan żywieniowy",
      "Bezpośredni kontakt z trenerem",
      "Analiza wideo techniki ćwiczeń",
    ],
    cta: "Zacznij treningi",
    variant: "cyan" as const,
    popular: true,
    tint: "from-white/50 to-pink-mist/50",
  },
  {
    name: "Elite VIP",
    price: "599 zł",
    period: "/miesiąc",
    description: "Ekskluzywne doświadczenie pełnej metamorfozy",
    features: [
      "Wszystko z planu Z Trenerem",
      "Cotygodniowe konsultacje wideo 1-na-1",
      "Priorytetowe wsparcie 24/7",
      "Ekskluzywne materiały VIP",
      "Miesięczny pakiet suplementów",
      "Prywatna grupa mastermind",
      "Kwartalna analiza składu ciała",
    ],
    cta: "Wybierz VIP",
    variant: "pink" as const,
    popular: false,
    tint: "from-pink-light/50 to-pink-soft/40",
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading
      gsap.fromTo(
        ".pricing-heading",
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

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll(".pricing-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-pink-gradient" />

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="pricing-heading font-display font-bold text-4xl sm:text-5xl lg:text-6xl gradient-text mb-4">
            Plany Premium
          </h2>
          <p className="pricing-heading font-body text-base sm:text-lg text-charcoal/70 max-w-xl mx-auto">
            Wybierz plan dopasowany do Twoich celów. Wszystkie pakiety zawierają dostęp
            do naszej ekskluzywnej społeczności fitness.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              <GlassCard
                className={`relative p-6 sm:p-8 h-full bg-gradient-to-b ${plan.tint}`}
                hover={true}
                tilt={true}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-cyan text-white font-body text-xs font-semibold px-4 py-1.5 rounded-pill glow-cyan">
                      Najpopularniejszy
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="text-center mb-6 pt-2">
                  <h3 className="font-display font-semibold text-xl text-charcoal mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display font-bold text-4xl sm:text-5xl gradient-text">
                      {plan.price}
                    </span>
                    <span className="font-body text-sm text-charcoal/60">
                      {plan.period}
                    </span>
                  </div>
                  <p className="font-body text-sm text-charcoal/60 mt-2">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 font-body text-sm text-charcoal/80"
                    >
                      <svg
                        className="w-5 h-5 text-pink flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <PillButton
                  variant={plan.variant}
                  className={`w-full ${plan.popular ? "glow-cyan" : ""}`}
                  onClick={() => {
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {plan.cta}
                </PillButton>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
