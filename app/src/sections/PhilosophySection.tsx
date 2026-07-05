import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
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
      className="relative w-full py-24 sm:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-white via-pink-light/5 to-white"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column */}
          <div
            ref={leftColRef}
            className="lg:col-span-4 space-y-6 font-body text-base sm:text-lg text-charcoal/80 leading-relaxed text-center lg:text-left"
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
          </div>

          {/* Middle Column (Portrait & Highlight Card) */}
          <div
            ref={middleColRef}
            className="lg:col-span-4 flex flex-col items-center gap-8 px-4 sm:px-0 order-first lg:order-none"
          >
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-[32px] bg-gradient-to-br from-pink-light/30 to-pink-soft/30 -z-10 animate-pulse" />
              
              <div className="relative p-3 rounded-[32px] bg-white/50 backdrop-blur-lg border border-white shadow-xl">
                <img
                  src="/assets/kinga2.webp"
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
          </div>

          {/* Right Column */}
          <div
            ref={rightColRef}
            className="lg:col-span-4 space-y-6 font-body text-base sm:text-lg text-charcoal/80 leading-relaxed text-center lg:text-left"
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
          </div>
        </div>
      </div>
    </section>
  );
}
