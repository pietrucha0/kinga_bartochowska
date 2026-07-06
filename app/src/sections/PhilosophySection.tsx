import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const [activeBioTab, setActiveBioTab] = useState<"story" | "approach">("story");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const middleColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Left column reveal
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Right column reveal
      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Middle column reveal (image + highlight card)
      gsap.fromTo(
        middleColRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-12 sm:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-white via-pink-light/5 to-white"
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-light/10 to-transparent pointer-events-none" />

      <div className="relative z-10 section-container">
        {/* Header */}
        <h2
          ref={headingRef}
          className="font-display font-bold text-center text-4xl sm:text-5xl lg:text-6xl gradient-text mb-16 sm:mb-20"
        >
          O mnie
        </h2>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column */}
          <div
            ref={leftColRef}
            className={`lg:col-span-4 space-y-4 lg:space-y-6 font-body text-sm sm:text-base lg:text-lg text-charcoal/80 leading-relaxed text-center lg:text-left transition-all duration-500 transform ${
              activeBioTab === "story"
                ? "opacity-100 translate-y-0 h-auto"
                : "opacity-0 -translate-y-4 h-0 overflow-hidden pointer-events-none lg:opacity-100 lg:translate-y-0 lg:h-auto lg:pointer-events-auto lg:overflow-visible"
            }`}
          >
            <p>
              Nazywam się Kinga i od zawsze sport był ważną częścią mojego życia. Swoją przygodę z aktywnością rozpoczęłam od tańca towarzyskiego, który nauczył mnie dyscypliny, precyzji, świadomości własnego ciała i konsekwencji w dążeniu do celu.
            </p>
            <p>
              Z czasem zamieniłam parkiet na sztangę, a trening siłowy szybko stał się nie tylko moją największą pasją, ale również sposobem na życie.
            </p>
            <p>
              Jestem trenerką personalną i instruktorką z 5-letnim doświadczeniem, a swoją wiedzę buduję nie tylko na edukacji, ale również doświadczeniu zawodniczym i codziennej pracy z podopiecznymi.
            </p>
            <p>
              Doskonale wiem, ile można osiągnąć dzięki odpowiedniej strategii, konsekwencji i mądremu prowadzeniu. Dziś wykorzystuję swoje doświadczenie, aby pomagać innym odkrywać własną siłę, przekraczać granice i osiągać rezultaty, które wcześniej wydawały się poza ich zasięgiem.
            </p>
            
            {/* Small Mobile Link to Switch to the opposite tab */}
            <div className="flex lg:hidden justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveBioTab("approach");
                }}
                className="font-display font-bold text-xs text-pink hover:text-pink-hot flex items-center gap-1.5 px-4 py-2 border border-pink/30 rounded-pill bg-white/20"
              >
                Czytam dalej (Moje Podejście) ➔
              </button>
            </div>
          </div>

          {/* Middle Column (Portrait & Highlight Card) */}
          <div
            ref={middleColRef}
            className="lg:col-span-4 flex flex-col items-center gap-8 px-4 sm:px-0 order-first lg:order-none mb-6 lg:mb-0"
          >
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-[32px] bg-gradient-to-br from-pink-light/30 to-pink-soft/30 -z-10 animate-pulse" />
              
              <div className="relative p-3 rounded-[32px] bg-white/50 backdrop-blur-lg border border-white shadow-xl">
                <img
                  src="/assets/o-mnie.png"
                  alt="Kinga Bartochowska - O mnie"
                  loading="lazy"
                  className="w-full max-w-[280px] h-auto object-contain rounded-2xl bg-gradient-to-tr from-pink-light/20 via-white/40 to-pink-soft/20"
                />
              </div>
            </div>

            {/* Achievements Highlight Card */}
            <GlassCard className="p-6 bg-gradient-to-br from-white/80 to-white/40 border border-white/80 rounded-[24px] text-center shadow-lg w-full max-w-sm" hover={true}>
              <p className="font-display font-semibold text-lg text-pink-hot mb-3 leading-snug">
                Sport nauczył mnie, że granice istnieją po to, by je przekraczać.
              </p>
              <p className="font-body text-sm text-charcoal/90 leading-relaxed mb-3">
                Jako zawodniczka trójboju siłowego zdobyłam tytuł <strong className="text-pink font-semibold">Mistrzyni Polski Juniorów</strong> oraz ustanowiłam <strong className="text-pink font-semibold">rekord Polski w Martwym Ciągu</strong>.
              </p>
              <p className="font-body text-xs text-charcoal/60 italic leading-relaxed">
                Za tymi osiągnięciami stoją lata ciężkiej pracy, dyscypliny i nieustannego doskonalenia techniki.
              </p>
            </GlassCard>

            {/* Mobile Tab Selector for Bio (placed under achievements on mobile, hidden on lg and up) */}
            <div className="flex lg:hidden bg-white/30 backdrop-blur-xl border border-white/60 p-1 rounded-[999px] w-full max-w-xs mx-auto shadow-sm relative z-20">
              <button
                type="button"
                onClick={() => setActiveBioTab("story")}
                className={`flex-1 font-display font-bold text-xs py-2 px-4 rounded-[999px] transition-all duration-300 text-center uppercase tracking-wider ${
                  activeBioTab === "story"
                    ? "bg-gradient-to-r from-pink to-pink-hot text-white shadow-sm"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                Moja Historia
              </button>
              <button
                type="button"
                onClick={() => setActiveBioTab("approach")}
                className={`flex-1 font-display font-bold text-xs py-2 px-4 rounded-[999px] transition-all duration-300 text-center uppercase tracking-wider ${
                  activeBioTab === "approach"
                    ? "bg-gradient-to-r from-pink to-pink-hot text-white shadow-sm"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                Moje Podejście
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div
            ref={rightColRef}
            className={`lg:col-span-4 space-y-4 lg:space-y-6 font-body text-sm sm:text-base lg:text-lg text-charcoal/80 leading-relaxed text-center lg:text-left transition-all duration-500 transform ${
              activeBioTab === "approach"
                ? "opacity-100 translate-y-0 h-auto"
                : "opacity-0 -translate-y-4 h-0 overflow-hidden pointer-events-none lg:opacity-100 lg:translate-y-0 lg:h-auto lg:pointer-events-auto lg:overflow-visible"
            }`}
          >
            <p>
              Moim celem jest pokazanie Ci, że prawdziwa zmiana sylwetki to coś więcej niż sam trening. Dlatego dbam o cały proces — od indywidualnie dopasowanego planu treningowego, przez budowanie zdrowych nawyków, aż po wsparcie w zakresie odżywiania.
            </p>
            <p>
              Pomagam uporządkować sposób odżywiania i dopasować go do Twojego celu, stylu życia oraz możliwości. Bez głodówek, skrajnych restrykcji i ciągłego zaczynania od poniedziałku. Zależy mi na rozwiązaniach, które są skuteczne, ale jednocześnie możliwe do utrzymania na co dzień.
            </p>
            <p>
              W swojej pracy stawiam na indywidualne podejście, poprawną technikę, świadomy ruch i przemyślaną strategię działania. Chcę, żeby moi podopieczni nie tylko osiągali wymarzoną sylwetkę, ale również budowali siłę, sprawność i pewność siebie.
            </p>
            <p className="font-semibold text-pink-hot">
              Ty masz cel. Ja pomogę Ci stworzyć plan i przeprowadzę Cię przez cały proces — krok po kroku.
            </p>

            {/* Small Mobile Link to Switch to the opposite tab */}
            <div className="flex lg:hidden justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveBioTab("story");
                }}
                className="font-display font-bold text-xs text-pink hover:text-pink-hot flex items-center gap-1.5 px-4 py-2 border border-pink/30 rounded-pill bg-white/20"
              >
                Czytam dalej (Moja Historia) ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
