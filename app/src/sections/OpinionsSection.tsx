import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Katarzyna Zawadzka",
    type: "Treningi personalne 1:1",
    initials: "KZ",
    rating: 5,
    text: "Treningi z Kingą to najlepsza decyzja, jaką mogłam podjąć. Jej profesjonalne podejście, ogromna wiedza na temat techniki trójbojowej oraz nieustanna motywacja sprawiły, że zbudowałam siłę, o której wcześniej mogłam tylko marzyć. Każde zajęcia to ogromna dawka energii i pewność, że ćwiczę bezpiecznie.",
    gradient: "from-pink to-pink-hot"
  },
  {
    name: "Aleksandra Nowak",
    type: "Współpraca online",
    initials: "AN",
    rating: 5,
    text: "Prowadzenie online na najwyższym poziomie! Raporty są szczegółowe, a Kinga analizuje każde nagranie moich bojów z treningu, wyłapując najmniejsze błędy techniczne. Plan dietetyczny jest smaczny, prosty i ułożony pod moje preferencje – zero głodówek, a sylwetka zmienia się z tygodnia na tydzień.",
    gradient: "from-cyan to-pink-hot"
  },
  {
    name: "Monika Wójcik",
    type: "Treningi w parach",
    initials: "MW",
    rating: 5,
    text: "Trenujemy z przyjaciółką pod okiem Kingi i to był strzał w dziesiątkę. Wspólny trening niesamowicie motywuje, a Kinga potrafi wykrzesać z nas maksimum energii, dbając o indywidualne dostosowanie ciężaru dla każdej z nas. Pełen profesjonalizm i świetna atmosfera na każdym treningu!",
    gradient: "from-pink to-pink-light"
  },
  {
    name: "Karolina Mazur",
    type: "Treningi personalne 1:1",
    initials: "KM",
    rating: 5,
    text: "Nigdy wcześniej nie lubiłam ćwiczeń siłowych, ale Kinga odczarowała dla mnie siłownię. Pokazała mi, jak ważny jest świadomy ruch i prawidłowa technika. Moje plecy w końcu przestały boleć, sylwetka wysmuklała, a rekord w martwym ciągu rośnie w oczach. Kinga to najlepsza trenerka!",
    gradient: "from-pink-hot to-pink-soft"
  },
  {
    name: "Joanna Kowalska",
    type: "Współpraca online",
    initials: "JK",
    rating: 5,
    text: "Początkowo obawiałam się współpracy na odległość, ale kontakt z Kingą jest rewelacyjny. Zawsze odpowiada na pytania, wspiera w chwilach kryzysu i na bieżąco modyfikuje plan w zależności od mojego samopoczucia i postępów. Nauczyłam się zdrowych nawyków, które zostaną ze mną na zawsze.",
    gradient: "from-cyan to-pink"
  },
  {
    name: "Magdalena Lis",
    type: "Treningi grupowe",
    initials: "ML",
    rating: 5,
    text: "Zajęcia grupowe z Kingą to czysta przyjemność i ogromny wycisk. Kinga ma oczy dookoła głowy – pilnuje techniki każdego uczestnika, poprawia błędy i dba o to, by nikt nie doznał kontuzji. Świetna energia grupy, doskonała muzyka i mega progres siłowy po zaledwie 3 miesiącach!",
    gradient: "from-pink-soft to-pink-mist"
  }
];

export default function OpinionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".opinions-heading",
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

      // Cards stagger reveal
      const cards = cardsRef.current?.querySelectorAll(".opinion-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
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
      id="opinie"
      className="relative w-full py-24 sm:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-white via-pink-light/5 to-white border-t border-pink-light/20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-light/10 to-transparent pointer-events-none" />

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="opinions-heading font-display font-bold text-4xl sm:text-5xl lg:text-6xl gradient-text mb-4">
            Opinie Podopiecznych
          </h2>
          <p className="opinions-heading font-body text-base sm:text-lg text-charcoal/70 max-w-2xl mx-auto">
            Te niesamowite kobiety podjęły wyzwanie, zaufały moim metodom i zmieniły swoje życie.
            Zobacz, co sądzą o naszej wspólnej pracy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((t, index) => (
            <GlassCard
              key={index}
              className="opinion-card p-6 sm:p-8 bg-gradient-to-b from-white/70 to-white/40 border border-white/80 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-pink/40 transition-all duration-300"
              hover={true}
            >
              <div>
                {/* Star rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-pink-hot fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-body text-sm sm:text-base text-charcoal/80 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-charcoal/5">
                {/* Initials Circle */}
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-display font-bold text-sm shadow-sm flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm sm:text-base text-charcoal leading-tight">
                    {t.name}
                  </h4>
                  <span className="font-body text-xs text-charcoal/50">
                    {t.type}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
