import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Dumbbell,
  Footprints,
  HeartHandshake,
  Salad,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

type BioBlock = {
  icon: LucideIcon;
  text: string;
};

// Treść 1:1 od klientki — nie zmieniać bez jej zgody.
const STORY: BioBlock[] = [
  {
    icon: Footprints,
    text: "Nazywam się Kinga i od zawsze sport był ważną częścią mojego życia. Swoją przygodę z aktywnością rozpoczęłam od tańca towarzyskiego, który nauczył mnie dyscypliny, precyzji, świadomości własnego ciała i konsekwencji w dążeniu do celu.",
  },
  {
    icon: Dumbbell,
    text: "Z czasem zamieniłam parkiet na sztangę, a trening siłowy szybko stał się nie tylko moją największą pasją, ale również sposobem na życie.",
  },
  {
    icon: Award,
    text: "Jestem trenerką personalną i instruktorką z 5-letnim doświadczeniem, a swoją wiedzę buduję nie tylko na edukacji, ale również doświadczeniu zawodniczym i codziennej pracy z podopiecznymi.",
  },
  {
    icon: Sparkles,
    text: "Doskonale wiem, ile można osiągnąć dzięki odpowiedniej strategii, konsekwencji i mądremu prowadzeniu. Dziś wykorzystuję swoje doświadczenie, aby pomagać innym odkrywać własną siłę, przekraczać granice i osiągać rezultaty, które wcześniej wydawały się poza ich zasięgiem.",
  },
];

const APPROACH: BioBlock[] = [
  {
    icon: Target,
    text: "Moim celem jest pokazanie Ci, że prawdziwa zmiana sylwetki to coś więcej niż sam trening. Dlatego dbam o cały proces — od indywidualnie dopasowanego planu treningowego, przez budowanie zdrowych nawyków, aż po wsparcie w zakresie odżywiania.",
  },
  {
    icon: Salad,
    text: "Pomagam uporządkować sposób odżywiania i dopasować go do Twojego celu, stylu życia oraz możliwości. Bez głodówek, skrajnych restrykcji i ciągłego zaczynania od poniedziałku. Zależy mi na rozwiązaniach, które są skuteczne, ale jednocześnie możliwe do utrzymania na co dzień.",
  },
  {
    icon: HeartHandshake,
    text: "W swojej pracy stawiam na indywidualne podejście, poprawną technikę, świadomy ruch i przemyślaną strategię działania. Chcę, żeby moi podopieczni nie tylko osiągali wymarzoną sylwetkę, ale również budowali siłę, sprawność i pewność siebie.",
  },
];

const CLOSING = "Ty masz cel. Ja pomogę Ci stworzyć plan i przeprowadzę Cię przez cały proces — krok po kroku.";

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
      {/* Portrait */}
      <div className="relative mb-6">
        <div className="absolute -top-3 -left-3 w-full h-full rounded-[28px] bg-gradient-to-br from-pink-light/40 to-pink-soft/30 -z-10" />
        <div className="relative p-2 rounded-[28px] bg-white/60 backdrop-blur-lg border border-white shadow-xl">
          <img
            src="/assets/about-kinga.webp"
            alt="Kinga Bartochowska – trenerka personalna i zawodniczka trójboju siłowego"
            width={800}
            height={1200}
            loading="lazy"
            decoding="async"
            className="w-[200px] sm:w-[240px] h-auto object-contain rounded-[20px] bg-gradient-to-tr from-pink-light/20 via-white/40 to-pink-soft/20"
          />
        </div>
      </div>

      {/* Achievements */}
      <blockquote className="w-full max-w-sm mb-8 pl-4 border-l-[3px] border-pink-hot text-left">
        <p className="font-display font-semibold text-base text-pink-hot leading-snug">
          Sport nauczył mnie, że granice istnieją po to, by je przekraczać.
        </p>
        <p className="mt-2 font-body text-sm text-charcoal/75 leading-relaxed">
          Jako zawodniczka trójboju siłowego zdobyłam tytuł <strong className="text-charcoal font-semibold">Mistrzyni Polski Juniorów</strong> oraz ustanowiłam <strong className="text-charcoal font-semibold">rekord Polski w Martwym Ciągu</strong>.
        </p>
        <p className="mt-2 font-body text-[13px] text-charcoal/55 italic leading-relaxed">
          Za tymi osiągnięciami stoją lata ciężkiej pracy, dyscypliny i nieustannego doskonalenia techniki.
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

      {/* Bio cards — one paragraph per card */}
      <div key={tab} className="w-full max-w-sm space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {visible.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex gap-3 rounded-[20px] bg-white/75 border border-white shadow-sm p-4 text-left"
          >
            <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-pink-mist text-pink-hot">
              <Icon className="w-4 h-4" strokeWidth={2} />
            </span>
            <p className="font-body text-[14px] text-charcoal/80 leading-[1.65]">{text}</p>
          </div>
        ))}

        {hiddenCount > 0 ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="w-full font-display font-semibold text-sm text-pink-hot py-3 rounded-[20px] border border-dashed border-pink/40 bg-white/30"
          >
            Czytaj dalej ↓
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
              {tab === "story" ? "Moje podejście →" : "← Moja historia"}
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
  const portraitRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);

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

      // Desktop-only reveals (these blocks are hidden on mobile)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          portraitRef.current,
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
          storyRef.current?.querySelectorAll("[data-reveal]") ?? [],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: storyRef.current, start: "top 80%" },
          }
        );
        gsap.fromTo(
          approachRef.current?.querySelectorAll("[data-reveal]") ?? [],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: approachRef.current, start: "top 85%" },
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
      className="relative w-full py-16 sm:py-24 lg:py-24 xl:py-28 overflow-clip bg-gradient-to-b from-white via-pink-light/5 to-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-light/10 to-transparent pointer-events-none" />
      {/* Soft decorative glows (desktop) */}
      <div className="hidden lg:block absolute -left-40 top-24 w-[420px] h-[420px] rounded-full bg-pink-light/25 blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute -right-40 bottom-10 w-[480px] h-[480px] rounded-full bg-pink-soft/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 section-container w-full">
        <h2
          ref={headingRef}
          className="font-display font-bold text-center text-4xl sm:text-5xl lg:text-5xl xl:text-6xl gradient-text mb-10 lg:mb-16"
        >
          O mnie
        </h2>

        {/* Mobile / tablet layout */}
        <MobileAbout />

        {/* Desktop layout */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          {/* Row 1: portrait + story timeline */}
          <div className="grid grid-cols-12 gap-12 xl:gap-16 items-start">
            <div ref={portraitRef} className="col-span-5 sticky top-28">
              <div className="relative pb-48 xl:pb-40">
                <div className="absolute top-6 -left-6 right-6 bottom-52 xl:bottom-44 rounded-[36px] bg-gradient-to-br from-pink-light/50 to-pink-soft/30 -z-10" />
                <div className="relative p-3 rounded-[36px] bg-white/60 backdrop-blur-lg border border-white shadow-xl">
                  <img
                    src="/assets/about-kinga.webp"
                    alt="Kinga Bartochowska – trenerka personalna i zawodniczka trójboju siłowego"
                    width={800}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[560px] object-contain rounded-[28px] bg-gradient-to-tr from-pink-light/20 via-white/40 to-pink-soft/20"
                  />
                </div>

                {/* Achievements card overlapping the photo */}
                <GlassCard
                  className="absolute left-6 right-[-1.5rem] bottom-0 p-6 bg-white/85 backdrop-blur-xl border border-white rounded-[24px] shadow-glass-lg text-left"
                  hover={true}
                >
                  <div className="flex gap-4">
                    <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-pink to-pink-hot text-white shadow-md">
                      <Trophy className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-lg text-pink-hot leading-snug mb-2">
                        Sport nauczył mnie, że granice istnieją po to, by je przekraczać.
                      </p>
                      <p className="font-body text-sm text-charcoal/80 leading-relaxed mb-1.5">
                        Jako zawodniczka trójboju siłowego zdobyłam tytuł <strong className="text-charcoal font-semibold">Mistrzyni Polski Juniorów</strong> oraz ustanowiłam <strong className="text-charcoal font-semibold">rekord Polski w Martwym Ciągu</strong>.
                      </p>
                      <p className="font-body text-xs xl:text-[13px] text-charcoal/55 italic leading-relaxed">
                        Za tymi osiągnięciami stoją lata ciężkiej pracy, dyscypliny i nieustannego doskonalenia techniki.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            <div ref={storyRef} className="col-span-7 pt-2">
              <SectionLabel>Moja historia</SectionLabel>

              <ol className="relative mt-8">
                {/* Timeline line */}
                <span className="absolute left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-pink-hot/60 via-pink-light to-transparent" />
                {STORY.map(({ icon: Icon, text }) => (
                  <li key={text} data-reveal className="relative flex gap-6 pb-8 last:pb-0">
                    <span className="relative z-10 flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-white border border-pink-light text-pink-hot shadow-sm">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <p className="pt-1.5 font-body text-base xl:text-[17px] text-charcoal/80 leading-[1.75]">
                      {text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Row 2: approach */}
          <div ref={approachRef} className="mt-20 xl:mt-24">
            <div className="flex justify-center">
              <SectionLabel>Moje podejście</SectionLabel>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 xl:gap-8">
              {APPROACH.map(({ icon: Icon, text }) => (
                <div key={text} data-reveal>
                <GlassCard
                  className="h-full p-7 xl:p-8 bg-white/75 border border-white rounded-[28px] shadow-glass text-left"
                  hover={true}
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-mist text-pink-hot mb-5">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <p className="font-body text-[15px] xl:text-base text-charcoal/80 leading-[1.75]">{text}</p>
                </GlassCard>
                </div>
              ))}
            </div>

            <div
              data-reveal
              className="mt-10 mx-auto max-w-4xl rounded-[28px] bg-gradient-to-r from-pink to-pink-hot px-10 py-7 text-center shadow-glass-lg"
            >
              <p className="font-display font-semibold text-xl xl:text-2xl text-white leading-snug">{CLOSING}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-pink-hot" />
      <span className="font-display font-bold text-sm uppercase tracking-[0.2em] text-pink-hot">{children}</span>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-pink-hot" />
    </div>
  );
}
