import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Dumbbell,
  Footprints,
  HeartHandshake,
  Medal,
  Salad,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

type BioBlock = {
  title: string;
  icon: LucideIcon;
  text: string;
};

const STORY: BioBlock[] = [
  {
    title: "Od tańca do sztangi",
    icon: Footprints,
    text: "Nazywam się Kinga i od zawsze sport był ważną częścią mojego życia. Swoją przygodę z aktywnością rozpoczęłam od tańca towarzyskiego, który nauczył mnie dyscypliny, precyzji, świadomości własnego ciała i konsekwencji w dążeniu do celu.",
  },
  {
    title: "Pasja i sposób na życie",
    icon: Dumbbell,
    text: "Z czasem zamieniłam parkiet na sztangę, a trening siłowy szybko stał się nie tylko moją największą pasją, ale również sposobem na życie.",
  },
  {
    title: "5 lat doświadczenia",
    icon: Award,
    text: "Jestem trenerką personalną i instruktorką z 5-letnim doświadczeniem, a swoją wiedzę buduję nie tylko na edukacji, ale również doświadczeniu zawodniczym i codziennej pracy z podopiecznymi.",
  },
  {
    title: "Pomagam odkryć Twoją siłę",
    icon: Sparkles,
    text: "Doskonale wiem, ile można osiągnąć dzięki odpowiedniej strategii, konsekwencji i mądremu prowadzeniu. Dziś wykorzystuję swoje doświadczenie, aby pomagać innym odkrywać własną siłę, przekraczać granice i osiągać rezultaty, które wcześniej wydawały się poza ich zasięgiem.",
  },
];

const APPROACH: BioBlock[] = [
  {
    title: "Więcej niż trening",
    icon: Target,
    text: "Moim celem jest pokazanie Ci, że prawdziwa zmiana sylwetki to coś więcej niż sam trening. Dlatego dbam o cały proces — od indywidualnie dopasowanego planu treningowego, przez budowanie zdrowych nawyków, aż po wsparcie w zakresie odżywiania.",
  },
  {
    title: "Odżywianie bez głodówek",
    icon: Salad,
    text: "Pomagam uporządkować sposób odżywiania i dopasować go do Twojego celu, stylu życia oraz możliwości. Bez głodówek, skrajnych restrykcji i ciągłego zaczynania od poniedziałku. Zależy mi na rozwiązaniach, które są skuteczne, ale jednocześnie możliwe do utrzymania na co dzień.",
  },
  {
    title: "Indywidualne podejście",
    icon: HeartHandshake,
    text: "W swojej pracy stawiam na indywidualne podejście, poprawną technikę, świadomy ruch i przemyślaną strategię działania. Chcę, żeby moi podopieczni nie tylko osiągali wymarzoną sylwetkę, ale również budowali siłę, sprawność i pewność siebie.",
  },
];

const CLOSING = "Ty masz cel. Ja pomogę Ci stworzyć plan i przeprowadzę Cię przez cały proces — krok po kroku.";

const MOBILE_FACTS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Award, value: "5 lat", label: "doświadczenia" },
  { icon: Trophy, value: "Mistrzyni", label: "Polski Juniorów" },
  { icon: Medal, value: "Rekord", label: "Polski w MC" },
];

function MobileAbout() {
  const [tab, setTab] = useState<"story" | "approach">("story");
  const [expanded, setExpanded] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const blocks = tab === "story" ? STORY : APPROACH;
  const visible = expanded ? blocks : blocks.slice(0, 2);
  const hiddenCount = blocks.length - visible.length;

  const switchTab = (next: "story" | "approach") => {
    setTab(next);
    setExpanded(false);
  };

  return (
    <div className="lg:hidden flex flex-col items-center">
      {/* Portrait + floating badge */}
      <div className="relative mb-8">
        <div className="absolute -top-3 -left-3 w-full h-full rounded-[28px] bg-gradient-to-br from-pink-light/40 to-pink-soft/30 -z-10" />
        <div className="relative p-2 rounded-[28px] bg-white/60 backdrop-blur-lg border border-white shadow-xl">
          <img
            src="/assets/about-kinga.png"
            alt="Kinga Bartochowska - O mnie"
            loading="lazy"
            className="w-[200px] sm:w-[240px] h-auto object-contain rounded-[20px] bg-gradient-to-tr from-pink-light/20 via-white/40 to-pink-soft/20"
          />
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-pill bg-gradient-to-r from-pink to-pink-hot text-white font-display font-semibold text-xs shadow-glass">
          Trenerka personalna
        </div>
      </div>

      {/* Lead */}
      <p className="font-display font-semibold text-xl leading-snug text-charcoal text-center max-w-[320px] mb-6">
        Cześć, jestem <span className="text-pink-hot">Kinga</span>. Pomagam odkrywać własną siłę i przekraczać granice.
      </p>

      {/* Quick facts */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-sm mb-6">
        {MOBILE_FACTS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-1 rounded-2xl bg-white/70 border border-white shadow-sm px-2 py-3"
          >
            <Icon className="w-5 h-5 text-pink-hot" strokeWidth={2} />
            <span className="font-display font-bold text-sm text-charcoal leading-tight">{value}</span>
            <span className="font-body text-[11px] text-charcoal/60 leading-tight">{label}</span>
          </div>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="relative w-full max-w-sm mb-8 pl-4 border-l-[3px] border-pink-hot">
        <p className="font-display font-semibold text-base text-pink-hot leading-snug">
          „Sport nauczył mnie, że granice istnieją po to, by je przekraczać.”
        </p>
        <p className="mt-2 font-body text-sm text-charcoal/70 leading-relaxed">
          Jako zawodniczka trójboju siłowego zdobyłam tytuł <strong className="text-charcoal font-semibold">Mistrzyni Polski Juniorów</strong> oraz
          ustanowiłam <strong className="text-charcoal font-semibold">rekord Polski w Martwym Ciągu</strong>.
        </p>
      </blockquote>

      {/* Tabs */}
      <div
        ref={tabsRef}
        className="flex bg-white/50 backdrop-blur-xl border border-white/80 p-1 rounded-pill w-full max-w-sm shadow-sm mb-5 scroll-mt-28"
      >
        {(
          [
            ["story", "Moja historia"],
            ["approach", "Moje podejście"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => switchTab(key)}
            className={`flex-1 font-display font-bold text-xs py-2.5 px-3 rounded-pill transition-all duration-300 uppercase tracking-wider ${
              tab === key
                ? "bg-gradient-to-r from-pink to-pink-hot text-white shadow-sm"
                : "text-charcoal/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Bio cards */}
      <div key={tab} className="w-full max-w-sm space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {visible.map(({ title, icon: Icon, text }) => (
          <div
            key={title}
            className="rounded-[20px] bg-white/75 border border-white shadow-sm p-4 text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-pink-mist text-pink-hot">
                <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
              </span>
              <h3 className="font-display font-bold text-[15px] text-charcoal leading-tight">{title}</h3>
            </div>
            <p className="font-body text-[14px] text-charcoal/75 leading-[1.65]">{text}</p>
          </div>
        ))}

        {hiddenCount > 0 ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="w-full font-display font-semibold text-sm text-pink-hot py-3 rounded-[20px] border border-dashed border-pink/40 bg-white/30"
          >
            Czytaj dalej ({hiddenCount}) ↓
          </button>
        ) : (
          <>
            {tab === "approach" && (
              <p className="pt-2 font-display font-semibold text-base text-center text-pink-hot leading-snug">
                {CLOSING}
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                switchTab(tab === "story" ? "approach" : "story");
                tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full font-display font-semibold text-sm text-pink-hot py-3"
            >
              {tab === "story" ? "Zobacz moje podejście →" : "← Wróć do mojej historii"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const middleColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Column reveals only on desktop (columns are hidden on mobile)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
        gsap.fromTo(
          middleColRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.1)",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full lg:min-h-screen py-16 sm:py-24 lg:py-16 xl:py-20 flex items-center overflow-hidden bg-gradient-to-b from-white via-pink-light/5 to-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-light/10 to-transparent pointer-events-none" />

      <div className="relative z-10 section-container w-full">
        <h2
          ref={headingRef}
          className="font-display font-bold text-center text-4xl sm:text-5xl lg:text-5xl xl:text-6xl gradient-text mb-10 lg:mb-14"
        >
          O mnie
        </h2>

        {/* Mobile / tablet layout */}
        <MobileAbout />

        {/* Desktop: 3-column layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-10 items-center">
          <div
            ref={leftColRef}
            className="col-span-4 space-y-4 xl:space-y-5 font-body text-base xl:text-lg text-charcoal/80 leading-relaxed text-left"
          >
            {STORY.map((b) => (
              <p key={b.title}>{b.text}</p>
            ))}
          </div>

          <div ref={middleColRef} className="col-span-4 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full rounded-[32px] bg-gradient-to-br from-pink-light/30 to-pink-soft/30 -z-10 animate-pulse" />
              <div className="relative p-2.5 rounded-[32px] bg-white/50 backdrop-blur-lg border border-white shadow-xl">
                <img
                  src="/assets/about-kinga.png"
                  alt="Kinga Bartochowska - O mnie"
                  loading="lazy"
                  className="w-full max-w-[290px] xl:max-w-[330px] h-auto object-contain rounded-2xl bg-gradient-to-tr from-pink-light/20 via-white/40 to-pink-soft/20"
                />
              </div>
            </div>

            <GlassCard className="p-6 bg-gradient-to-br from-white/80 to-white/40 border border-white/80 rounded-[24px] text-center shadow-lg w-full max-w-md" hover={true}>
              <p className="font-display font-semibold text-lg xl:text-xl text-pink-hot mb-2 leading-snug">
                Sport nauczył mnie, że granice istnieją po to, by je przekraczać.
              </p>
              <p className="font-body text-sm xl:text-base text-charcoal/90 leading-relaxed mb-2">
                Jako zawodniczka trójboju siłowego zdobyłam tytuł <strong className="text-pink font-semibold">Mistrzyni Polski Juniorów</strong> oraz ustanowiłam <strong className="text-pink font-semibold">rekord Polski w Martwym Ciągu</strong>.
              </p>
              <p className="font-body text-xs xl:text-sm text-charcoal/60 italic leading-relaxed">
                Za tymi osiągnięciami stoją lata ciężkiej pracy, dyscypliny i nieustannego doskonalenia techniki.
              </p>
            </GlassCard>
          </div>

          <div
            ref={rightColRef}
            className="col-span-4 space-y-4 xl:space-y-5 font-body text-base xl:text-lg text-charcoal/80 leading-relaxed text-left"
          >
            {APPROACH.map((b) => (
              <p key={b.title}>{b.text}</p>
            ))}
            <p className="font-semibold text-pink-hot">{CLOSING}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
