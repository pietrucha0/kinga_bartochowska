import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillButton from "@/components/PillButton";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Lorem Ipsum I",
    price: "119 zł",
    period: "/lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor",
      "Ut labore et dolore magna",
      "Quis nostrud exercitation",
    ],
    cta: "Lorem ipsum",
    popular: false,
    variant: "outline" as const,
    tint: "from-pink-mist/60 to-pink-light/40",
  },
  {
    name: "Lorem Ipsum II",
    price: "299 zł",
    period: "/lorem",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore.",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor",
      "Ut labore et dolore magna",
      "Quis nostrud exercitation",
      "Aliquip ex ea commodo",
    ],
    cta: "Lorem ipsum",
    popular: true,
    variant: "cyan" as const,
    tint: "from-white/50 to-pink-mist/50",
  },
  {
    name: "Lorem Ipsum III",
    price: "599 zł",
    period: "/lorem",
    description: "Ut enim ad minim veniam, quis nostrud exercitation.",
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor",
      "Ut labore et dolore magna",
      "Quis nostrud exercitation",
      "Aliquip ex ea commodo",
      "Duis aute irure dolor in",
    ],
    cta: "Lorem ipsum",
    popular: false,
    variant: "pink" as const,
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
      <div className="absolute inset-0 bg-blush-mist" />

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="pricing-heading font-display font-bold text-4xl sm:text-5xl lg:text-6xl gradient-text mb-4">
            Lorem Ipsum
          </h2>
          <p className="pricing-heading font-body text-base sm:text-lg text-charcoal/70 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pt-5 pb-8 md:pt-0 md:pb-0 -mx-4 px-4 md:ml-auto md:mr-auto md:px-0"
        >
          {plans.map((plan) => (
            <GlassCard
              key={plan.name}
              className={`pricing-card relative p-6 sm:p-8 bg-gradient-to-b ${plan.tint} flex flex-col justify-between flex-shrink-0 w-[85vw] sm:w-[350px] md:w-auto snap-center`}
              hover={true}
              tilt={true}
            >
              {/* Upper Content */}
              <div>
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-cyan text-white font-body text-xs font-semibold px-4 py-1.5 rounded-pill glow-cyan">
                      Lorem Ipsum
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
              </div>

              {/* CTA Button at bottom */}
              <div>
                <PillButton
                  variant={plan.variant}
                  className={`w-full ${plan.popular ? "glow-cyan" : ""}`}
                  onClick={() => {
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {plan.cta}
                </PillButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
