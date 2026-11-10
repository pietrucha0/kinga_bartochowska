import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, Dumbbell, Info, Laptop, Sparkles, type LucideIcon } from "lucide-react";
import PillButton from "@/components/PillButton";
import { getLenis } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

interface Package {
  id: string;
  name: string;
  price?: number;
  regularPrice?: number;
  promoPrice?: number;
  savings?: number;
  unitPrice?: string;
  subtitle?: string;
  badge?: string;
  isPopular?: boolean;
  highlights?: string[];
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
  note: string;
  packagesHeader?: string;
}

const offerCategories: Record<"personal" | "online", CategoryData> = {
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
      {
        id: "5_trainings",
        name: "5 TRENINGÓW",
        price: 850,
        unitPrice: "170 zł / trening",
      },
      {
        id: "10_trainings",
        name: "10 TRENINGÓW",
        price: 1600,
        unitPrice: "160 zł / trening",
        isPopular: true,
        badge: "Najczęściej wybierany",
      },
      {
        id: "20_trainings",
        name: "20 TRENINGÓW",
        price: 3000,
        unitPrice: "150 zł / trening",
      },
    ],
    tint: "from-pink-mist/60 to-pink-light/40",
    note: "Możliwość płatności za każdy trening osobno, bez konieczności opłacania całego pakietu z góry. Szczegóły współpracy ustalamy w umowie.",
    packagesHeader: "Wybierz preferowany pakiet",
  },
  /*
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
  */
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
      {
        id: "1_month",
        name: "1 MIESIĄC",
        regularPrice: 350,
        promoPrice: 250,
        savings: 100,
      },
      {
        id: "3_months",
        name: "3 MIESIĄCE",
        regularPrice: 900,
        promoPrice: 700,
        savings: 200,
        isPopular: true,
        badge: "Najczęściej wybierany",
      },
      {
        id: "6_months",
        name: "6 MIESIĘCY",
        regularPrice: 1500,
        promoPrice: 1000,
        savings: 500,
      },
    ],
    tint: "from-pink-light/50 to-pink-soft/40",
    note: "Możliwość płatności za każdy miesiąc współpracy osobno, bez konieczności opłacania całego pakietu z góry. Szczegóły współpracy ustalamy w umowie.",
    packagesHeader: "Wybierz preferowany pakiet (ceny promocyjne)",
  },
};

type TabId = "personal" | "group" | "online";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  personal: Dumbbell,
  group: Dumbbell,
  online: Laptop,
};

const MOBILE_TAB_LABEL: Record<string, string> = {
  personal: "1:1",
  group: "Grupa",
  online: "Online",
};

function PackageCard({ pack, onSelect }: { pack: Package; onSelect: () => void }) {
  const hasPromo = Boolean(pack.promoPrice && pack.regularPrice);
  const displayPrice = hasPromo ? pack.promoPrice : (pack.price ?? pack.regularPrice);
  const popular = Boolean(pack.isPopular);

  return (
    <div
      className={`relative flex flex-col rounded-[28px] p-5 sm:p-6 lg:p-7 text-charcoal transition-all duration-300 hover:-translate-y-1 ${
        popular
          ? "bg-gradient-to-b from-white to-pink-mist/70 border-2 border-pink-hot/30 shadow-glass hover:shadow-glass-lg"
          : "bg-white/85 border-2 border-white shadow-glass hover:shadow-glass-lg"
      }`}
    >
      {/* Badge */}
      {pack.badge && (
        <span className="absolute -top-3 right-5 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 inline-flex items-center gap-1 whitespace-nowrap rounded-pill bg-pink-mist border border-pink-hot/25 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-pink-hot">
          <Sparkles className="w-3 h-3" strokeWidth={2.5} />
          {pack.badge}
        </span>
      )}

      {/* Name */}
      <h4 className="mb-4 sm:mb-5 font-display font-bold text-sm lg:text-[15px] uppercase tracking-[0.12em] text-charcoal/80">
        {pack.name}
      </h4>

      {/* Price */}
      <div className="flex items-end justify-between gap-3 sm:flex-col sm:items-start sm:justify-start">
        <div>
          {hasPromo && pack.regularPrice ? (
            <div className="flex items-center gap-2 mb-1">
              <span className="font-body text-sm line-through text-charcoal/40">{pack.regularPrice} zł</span>
              {pack.savings ? (
                <span className="font-body text-[11px] font-bold px-2 py-0.5 rounded-pill bg-pink-mist text-pink-hot">
                  -{pack.savings} zł
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-4xl lg:text-5xl tracking-tight leading-none text-charcoal">
              {displayPrice}
            </span>
            <span className="font-display font-semibold text-lg text-charcoal/50">zł</span>
          </div>
        </div>

        {pack.unitPrice && (
          <span className="sm:mt-3 inline-flex items-center rounded-pill px-3 py-1 font-body text-xs font-semibold whitespace-nowrap bg-cyan/10 text-cyan">
            {pack.unitPrice}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-5 sm:mt-auto sm:pt-7">
        <PillButton
          variant={popular ? "pink" : "cyan"}
          className="w-full text-sm py-3 px-4 justify-center gap-2 font-semibold shadow-sm"
          onClick={onSelect}
        >
          Zacznij teraz
          <ArrowRight className="w-4 h-4" />
        </PillButton>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("personal");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".category-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animacja przy zmianie zakładki szczegółów oferty
  useEffect(() => {
    if (detailsRef.current) {
      gsap.fromTo(detailsRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
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

  const categories = Object.values(offerCategories) as CategoryData[];
  const activeData = offerCategories[activeTab as keyof typeof offerCategories] || offerCategories.personal;

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full py-16 sm:py-24 lg:py-24 xl:py-28 overflow-clip"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-blush-mist pointer-events-none" />
      <div className="hidden lg:block absolute -right-40 top-20 w-[460px] h-[460px] rounded-full bg-white/50 blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute -left-40 bottom-20 w-[460px] h-[460px] rounded-full bg-pink-light/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 section-container w-full">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="pricing-heading font-display font-bold text-4xl sm:text-5xl lg:text-5xl xl:text-6xl gradient-text mb-4">
            Oferta
          </h2>
          <p className="pricing-heading font-body text-base sm:text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Wybierz formę współpracy dopasowaną do Twoich potrzeb, możliwości i stylu życia.
            Niezależnie od tego, gdzie jesteś — wspólnie stworzymy plan, który przybliży Cię do Twojego celu.
          </p>
        </div>

        {/* Mobile Tab Selector */}
        <div className="flex md:hidden bg-white/60 backdrop-blur-xl border border-white p-1.5 rounded-pill max-w-sm mx-auto mb-8 shadow-sm">
          {categories.map((category) => {
            const isSelected = activeTab === category.id;
            const Icon = CATEGORY_ICONS[category.id];
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveTab(category.id)}
                className={`flex-1 inline-flex items-center justify-center gap-2 font-display font-bold text-sm py-2.5 px-3 rounded-pill transition-all duration-300 uppercase tracking-wide ${
                  isSelected ? "bg-gradient-to-r from-pink to-pink-hot text-white shadow-md" : "text-charcoal/60"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.25} />
                {MOBILE_TAB_LABEL[category.id]}
              </button>
            );
          })}
        </div>

        {/* Desktop Category Selector */}
        <div ref={cardsRef} className="hidden md:grid grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto mb-10 lg:mb-12">
          {categories.map((category) => {
            const isSelected = activeTab === category.id;
            const Icon = CATEGORY_ICONS[category.id];
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveTab(category.id)}
                aria-pressed={isSelected}
                className={`category-card group relative flex gap-5 text-left rounded-[28px] p-6 lg:p-7 border-2 transition-all duration-300 ${
                  isSelected
                    ? "bg-white border-pink-hot/70 shadow-[0_18px_40px_rgba(224,17,95,0.16)]"
                    : "bg-white/50 border-white/70 hover:bg-white/80 hover:-translate-y-0.5 shadow-sm"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 shrink-0 rounded-2xl transition-colors duration-300 ${
                    isSelected
                      ? "bg-gradient-to-br from-pink to-pink-hot text-white shadow-md"
                      : "bg-pink-mist text-pink-hot"
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </span>

                <div className="flex-1 pr-6">
                  <h3 className="font-display font-bold text-lg xl:text-xl text-charcoal leading-snug mb-1">
                    {category.title}
                  </h3>
                  <p className="font-display font-semibold text-sm text-pink-hot mb-2">{category.subtitle}</p>
                  <p className="font-body text-sm text-charcoal/65 leading-relaxed">{category.description}</p>
                </div>

                {/* Radio indicator */}
                <span
                  className={`absolute top-6 right-6 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                    isSelected ? "bg-pink-hot border-pink-hot text-white" : "border-charcoal/20 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Details panel */}
        <div
          ref={detailsRef}
          className="max-w-6xl mx-auto rounded-[32px] lg:rounded-[40px] bg-white/45 backdrop-blur-xl border border-white/80 shadow-glass p-5 sm:p-8 lg:p-10 xl:p-12"
        >
          {/* About the offer + features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col">
              <span className="font-body text-[11px] lg:text-xs font-bold text-pink-hot uppercase tracking-[0.2em] mb-3">
                O ofercie
              </span>
              <h3 className="font-display font-bold text-[28px] leading-tight sm:text-4xl xl:text-[42px] text-charcoal mb-4 lg:mb-5">
                {activeData.title}
              </h3>
              <p className="font-body text-[15px] lg:text-base xl:text-[17px] text-charcoal/75 leading-[1.75] mb-6">
                {activeData.intro}
              </p>

              <blockquote className="pl-4 lg:pl-5 border-l-[3px] border-pink-hot">
                <p className="font-display font-semibold text-base lg:text-lg text-pink-hot leading-snug">
                  „{activeData.callout}”
                </p>
              </blockquote>
            </div>

            <div className="lg:col-span-6 xl:col-span-5">
              <div className="h-full rounded-[24px] bg-white/80 border border-white p-5 sm:p-6 lg:p-7 shadow-sm">
                <span className="font-body text-[11px] lg:text-xs font-bold text-cyan uppercase tracking-[0.2em] block mb-4">
                  Co zawiera współpraca
                </span>
                <ul className="space-y-3">
                  {activeData.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 font-body text-sm lg:text-[15px] text-charcoal/80 leading-snug">
                      <span className="flex items-center justify-center w-5 h-5 shrink-0 rounded-full bg-cyan/15 mt-0.5">
                        <Check className="w-3 h-3 text-cyan" strokeWidth={3} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="mt-10 lg:mt-14">
            <div className="flex items-center gap-4 mb-6 lg:mb-10">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-hot/30" />
              <h4 className="font-display font-bold text-xs lg:text-sm text-charcoal/70 uppercase tracking-[0.18em] text-center">
                {activeData.packagesHeader || "Wybierz preferowany pakiet"}
              </h4>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-hot/30" />
            </div>

            <div
              className={`grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 items-stretch ${
                activeData.packages.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {activeData.packages.map((pack) => (
                <PackageCard key={pack.id} pack={pack} onSelect={() => selectPackage(activeData.id, pack.id)} />
              ))}
            </div>
          </div>

          {/* Payment Note */}
          <div className="mt-8 lg:mt-10 flex justify-center">
            <div className="flex items-start sm:items-center gap-3 max-w-3xl rounded-2xl bg-white/70 border border-white px-4 sm:px-5 py-3.5 text-left">
              <Info className="w-5 h-5 shrink-0 text-pink-hot mt-0.5 sm:mt-0" strokeWidth={2} />
              <p className="font-body text-[13px] sm:text-sm text-charcoal/75 leading-relaxed">{activeData.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
