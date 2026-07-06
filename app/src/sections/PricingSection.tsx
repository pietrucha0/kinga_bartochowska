import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillButton from "@/components/PillButton";
import GlassCard from "@/components/GlassCard";
import { getLenis } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

interface Package {
  id: string;
  name: string;
  regularPrice: number;
  promoPrice: number;
  savings: number;
}

interface CategoryData {
  id: "personal" | "group" | "online";
  title: string;
  subtitle: string;
  description: string;
  intro: string;
  callout: string;
  features: string[];
  packages: Package[];
  tint: string;
}

const offerCategories: Record<"personal" | "group" | "online", CategoryData> = {
  personal: {
    id: "personal",
    title: "TRENINGI PERSONALNE 1:1",
    subtitle: "Pełne skupienie na Tobie i Twoim celu.",
    description: "Indywidualnie dopasowane treningi, podczas których zadbam o Twoją technikę, bezpieczeństwo i skuteczny progres.",
    intro: "To coś więcej niż wspólny trening. To indywidualnie zaplanowany proces, w którym każdy element dopasowany jest do Twojego celu, możliwości i aktualnego poziomu.",
    callout: "Ty skupiasz się na działaniu. Ja dbam o plan, technikę i kierunek Twojego progresu.",
    features: [
      "pełne skupienie trenerki na Tobie",
      "indywidualnie dopasowany trening",
      "nauka i doskonalenie techniki ćwiczeń",
      "progres dostosowany do Twoich możliwości",
      "regularna kontrola postępów",
      "wsparcie i motywacja na każdym etapie",
      "wskazówki dotyczące odżywiania i codziennych nawyków",
    ],
    packages: [
      { id: "1_training", name: "1 TRENING", regularPrice: 250, promoPrice: 180, savings: 70 },
      { id: "5_trainings", name: "5 TRENINGÓW", regularPrice: 900, promoPrice: 700, savings: 200 },
      { id: "10_trainings", name: "10 TRENINGÓW", regularPrice: 1700, promoPrice: 1300, savings: 400 },
      { id: "20_trainings", name: "20 TRENINGÓW", regularPrice: 3000, promoPrice: 2400, savings: 600 },
    ],
    tint: "from-pink-mist/60 to-pink-light/40",
  },
  group: {
    id: "group",
    title: "TRENINGI W PARACH I GRUPOWE",
    subtitle: "Wspólny trening. Wspólna motywacja. Świetna energia.",
    description: "Trenuj z bliską osobą lub w grupie, realizując swoje cele w motywującej atmosferze i pod moim okiem.",
    intro: "Trening w grupie nie oznacza przypadkowych ćwiczeń i braku kontroli. Każde zajęcia prowadzę z naciskiem na poprawną technikę, świadomy ruch i skuteczny progres, dbając o to, aby każdy uczestnik trenował na miarę swoich możliwości.",
    callout: "To idealna opcja dla osób, które chcą pracować nad siłą, sylwetką i sprawnością, a jednocześnie czerpać motywację i energię ze wspólnego treningu.",
    features: [
      "treningi prowadzone pod moim okiem",
      "nacisk na poprawną technikę ćwiczeń",
      "ćwiczenia dopasowane do poziomu grupy",
      "budowanie siły, sprawności i kondycji",
      "motywująca atmosfera i wspólna energia",
      "regularność, progres i konkretne cele",
    ],
    packages: [
      { id: "1_training", name: "1 TRENING", regularPrice: 350, promoPrice: 300, savings: 50 },
      { id: "5_trainings", name: "5 TRENINGÓW", regularPrice: 1300, promoPrice: 1000, savings: 300 },
      { id: "10_trainings", name: "10 TRENINGÓW", regularPrice: 2400, promoPrice: 2000, savings: 400 },
      { id: "20_trainings", name: "20 TRENINGÓW", regularPrice: 4600, promoPrice: 3600, savings: 1000 },
    ],
    tint: "from-white/50 to-pink-mist/50",
  },
  online: {
    id: "online",
    title: "WSPÓŁPRACA ONLINE",
    subtitle: "Twój cel. Twój plan. Moje wsparcie.",
    description: "Indywidualne prowadzenie treningowe i wsparcie w zakresie odżywiania — niezależnie od tego, gdzie jesteś i gdzie trenujesz.",
    intro: "Chcesz poprawić sylwetkę, zbudować siłę i w końcu trenować według konkretnego planu? Współpraca online to kompleksowe prowadzenie dopasowane do Twojego celu, możliwości i codziennego życia — niezależnie od tego, gdzie jesteś i gdzie trenujesz.",
    callout: "Stały kontakt, moje wsparcie i motywacja przez cały okres współpracy.",
    features: [
      "indywidualny plan treningowy dopasowany do Twojego celu i możliwości",
      "wsparcie w zakresie odżywiania oraz pomoc w organizacji codziennych posiłków",
      "regularna kontrola postępów i analiza efektów",
      "modyfikacje planu treningowego wraz z Twoim progresem",
      "analiza techniki ćwiczeń na podstawie przesłanych nagrań",
      "regularne raporty i bieżące wskazówki dotyczące dalszego działania",
      "stały kontakt, moje wsparcie i motywacja przez cały okres współpracy",
    ],
    packages: [
      { id: "1_month", name: "1 MIESIĄC", regularPrice: 350, promoPrice: 250, savings: 100 },
      { id: "3_months", name: "3 MIESIĄCE", regularPrice: 900, promoPrice: 700, savings: 200 },
      { id: "6_months", name: "6 MIESIĘCY", regularPrice: 1500, promoPrice: 1000, savings: 500 },
    ],
    tint: "from-pink-light/50 to-pink-soft/40",
  },
};

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "group" | "online" >("personal");

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollPackages = (direction: "left" | "right") => {
    if (packagesRef.current) {
      const scrollAmount = window.innerWidth * 0.75;
      packagesRef.current.scrollBy({
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
    if (packagesRef.current) {
      packagesRef.current.scrollLeft = 0;
      setShowLeftArrow(false);
      const timer = setTimeout(() => {
        if (packagesRef.current) {
          const { scrollWidth, clientWidth } = packagesRef.current;
          setShowRightArrow(scrollWidth > clientWidth);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

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

      // Category cards reveal
      const cards = cardsRef.current?.querySelectorAll(".category-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
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

  // Animacja przy zmianie zakładki szczegółów oferty
  useEffect(() => {
    if (detailsRef.current) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const selectPackage = (coopType: string, packType: string) => {
    // Wyślij CustomEvent do formularza kontaktowego
    const event = new CustomEvent("select-package", {
      detail: { cooperationType: coopType, packageType: packType },
    });
    window.dispatchEvent(event);

    // Przewiń płynnie do kontaktu
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo("#contact", { duration: 1.2 });
    } else {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeData = offerCategories[activeTab];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full py-12 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-blush-mist pointer-events-none" />

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="pricing-heading font-display font-bold text-4xl sm:text-5xl lg:text-6xl gradient-text mb-4">
            Oferta
          </h2>
          <p className="pricing-heading font-body text-base sm:text-lg text-charcoal/70 max-w-2xl mx-auto">
            Wybierz formę współpracy dopasowaną do Twoich potrzeb, możliwości i stylu życia.
            Niezależnie od tego, gdzie jesteś — wspólnie stworzymy plan, który przybliży Cię do Twojego celu.
          </p>
        </div>

        {/* Mobile Tab Selector (hidden on md and up) */}
        <div className="flex md:hidden bg-white/30 backdrop-blur-xl border border-white/60 p-1.5 rounded-[999px] max-w-sm mx-auto mb-10 shadow-sm relative z-20">
          {(Object.values(offerCategories) as CategoryData[]).map((category) => {
            const isSelected = activeTab === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveTab(category.id)}
                className={`flex-1 font-display font-extrabold text-[13px] sm:text-sm py-2.5 px-3 rounded-[999px] transition-all duration-300 text-center uppercase tracking-wide ${
                  isSelected
                    ? "bg-gradient-to-r from-pink to-pink-hot text-white shadow-md scale-100"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {category.id === "personal" ? "1:1" : category.id === "group" ? "Grupa" : "Online"}
              </button>
            );
          })}
        </div>

        {/* Desktop 3 Category Cards (hidden on mobile) */}
        <div
          ref={cardsRef}
          className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch mb-16"
        >
          {(Object.values(offerCategories) as CategoryData[]).map((category) => {
            const isSelected = activeTab === category.id;
            return (
              <div
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className="cursor-pointer h-full transition-all duration-300"
              >
                <GlassCard
                  className={`category-card relative p-6 sm:p-8 h-full bg-gradient-to-b ${category.tint} flex flex-col justify-between transition-all duration-300 ${
                    isSelected
                      ? "border-pink shadow-[0_15px_35px_rgba(224,17,95,0.2)] scale-[1.03] ring-2 ring-pink/20"
                      : "opacity-85 hover:opacity-100 hover:scale-[1.01]"
                  }`}
                  hover={!isSelected}
                >
                  <div className="text-center pt-2">
                    {/* Selected Indicator Badge */}
                    {isSelected && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-pink-hot text-white font-body text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-pill glow-pink">
                          Wybrana opcja
                        </span>
                      </div>
                    )}
                    
                    <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal mb-3 leading-snug">
                      {category.title}
                    </h3>
                    <h4 className="font-display font-semibold text-sm text-pink-hot mb-4 leading-normal">
                      {category.subtitle}
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <span className={`font-body text-xs font-semibold px-4 py-2 rounded-pill transition-colors duration-300 ${
                      isSelected ? "bg-pink text-white" : "bg-black/5 text-charcoal/70 hover:bg-black/10"
                    }`}>
                      {isSelected ? "Przeglądasz pakiety" : "Zobacz pakiety"}
                    </span>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        <div ref={detailsRef} className="max-w-6xl mx-auto mt-12 bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-5 sm:p-10 lg:p-12 shadow-glass">
          {/* Top Row: Category Info and Features Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-10 border-b border-charcoal/5">
            {/* Left side: Category Intro and Callout */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <span className="font-body text-[10px] font-bold text-pink uppercase tracking-widest block mb-2">
                  O ofercie
                </span>
                <h3 className="font-display font-bold text-3xl text-charcoal mb-4">
                  {activeData.title}
                </h3>
                <p className="font-body text-base text-charcoal/80 leading-relaxed mb-6">
                  {activeData.intro}
                </p>
              </div>

              {/* Callout box */}
              <div className="p-4 rounded-xl bg-pink-light/10 border border-pink-light/25 text-center sm:text-left">
                <p className="font-body font-medium text-xs sm:text-sm text-pink-hot/90 leading-relaxed">
                  "{activeData.callout}"
                </p>
              </div>
            </div>

            {/* Right side: Features Checklist */}
            <div className="lg:col-span-5">
              <span className="font-body text-[10px] font-bold text-cyan uppercase tracking-widest block mb-4">
                Co zawiera współpraca
              </span>
              <ul className="space-y-3.5">
                {activeData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-body text-sm text-charcoal/85">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan/15 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Row: Dynamic Packages Grid */}
          <div className="pt-10">
            <h4 className="font-display font-semibold text-charcoal text-center mb-8 block uppercase tracking-wider text-xs">
              Wybierz preferowany pakiet (ceny promocyjne)
            </h4>
            
            {/* Scroll Wrapper with Mobile Indicators */}
            <div className="relative">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={() => scrollPackages("left")}
                className={`absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-glass sm:hidden transition-all duration-300 hover:bg-white/45 active:scale-90 ${
                  showLeftArrow ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
                }`}
                aria-label="Poprzedni"
              >
                <svg className="w-5 h-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div
                ref={packagesRef}
                onScroll={handleScroll}
                className={`flex overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none gap-6 pb-6 sm:pb-0 px-4 sm:px-0 -mx-4 sm:mx-0 scrollbar-none sm:grid sm:gap-6 ${
                  activeData.packages.length === 3 
                    ? "sm:grid-cols-3" 
                    : "sm:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {activeData.packages.map((pack) => (
                  <GlassCard
                    key={pack.id}
                    className="w-[80vw] sm:w-auto shrink-0 sm:shrink snap-center p-6 bg-gradient-to-b from-white/70 to-white/40 border border-white/80 rounded-2xl flex flex-col justify-between shadow-sm relative group hover:border-cyan/50 hover:shadow-md transition-all duration-300 min-h-[300px]"
                    hover={true}
                  >
                  {/* Promo Badge */}
                  <div className="absolute top-4 right-4 bg-cyan text-white font-body text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase shadow-sm">
                    Promocja
                  </div>

                  <div className="text-center pt-4">
                    <h4 className="font-display font-bold text-base text-charcoal/90 mb-4 tracking-wide uppercase">
                      {pack.name}
                    </h4>

                    <div className="flex flex-col items-center justify-center gap-1 mb-4">
                      {/* Regular price (crossed out) */}
                      <span className="font-body text-xs text-charcoal/45 line-through">
                        {pack.regularPrice} zł
                      </span>
                      {/* Promo price */}
                      <span className="font-display font-extrabold text-3xl gradient-text">
                        {pack.promoPrice} zł
                      </span>
                    </div>

                    {/* Savings pill */}
                    <div className="mb-6 py-1 px-4 bg-cyan/10 border border-cyan/15 rounded-pill inline-block">
                      <span className="font-body text-[10px] font-bold text-cyan uppercase tracking-wider whitespace-nowrap">
                        Oszczędzasz {pack.savings} zł
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <PillButton
                    variant="cyan"
                    className="w-full text-xs py-2.5 px-3 justify-center text-center font-semibold mt-auto"
                    onClick={() => selectPackage(activeData.id, pack.id)}
                  >
                    Zacznij teraz
                  </PillButton>
                  </GlassCard>
                ))}
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={() => scrollPackages("right")}
                className={`absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-glass sm:hidden transition-all duration-300 hover:bg-white/45 active:scale-90 ${
                  showRightArrow ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
                }`}
                aria-label="Następny"
              >
                <svg className="w-5 h-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
