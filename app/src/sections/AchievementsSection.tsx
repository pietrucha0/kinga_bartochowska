import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    title: "Mistrzyni Polski Juniorów",
    subtitle: "Trójbój Siłowy Klasyczny",
    description: "Złoty medal zdobyty na oficjalnych Mistrzostwach Polski, będący zwieńczeniem restrykcyjnych przygotowań, setek godzin treningów i niezłomnej dyscypliny sportowej.",
  },
  {
    title: "Rekordzistka Polski w Martwym Ciągu",
    subtitle: "Kategoria Juniorów",
    description: "Ustanowiony oficjalny rekord kraju, będący potwierdzeniem perfekcji technicznej, optymalnego przygotowania siłowego oraz niezwykłego skupienia.",
  },
];

const gallery = [
  {
    src: "/assets/kinga3.webp",
    alt: "Kinga na zawodach",
    caption: "Pasja i walka",
    rotation: "rotate-2",
  },
  {
    src: "/assets/kinga4.webp",
    alt: "Kinga Bartochowska martwy ciąg",
    caption: "Droga po rekord",
    rotation: "-rotate-2",
  },
  {
    src: "",
    alt: "Miejsce na Twoje zdjęcie",
    caption: "Twoje efekty",
    rotation: "rotate-3",
  },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
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

      // Achievements cards reveal
      const cards = cardsRef.current?.querySelectorAll(".achievement-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Gallery photos reveal
      const photos = galleryRef.current?.querySelectorAll(".gallery-photo");
      if (photos) {
        gsap.fromTo(
          photos,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: galleryRef.current,
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
      id="achievements"
      className="relative w-full py-24 sm:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-white via-pink-light/5 to-white border-t border-pink-light/20"
    >
      {/* Background decoration */}
      <img
        src="/assets/barbell.webp"
        alt=""
        loading="lazy"
        className="absolute top-[10%] left-[2%] w-24 sm:w-36 opacity-10 animate-float-slow -z-0 pointer-events-none"
      />
      <img
        src="/assets/kettlebell.webp"
        alt=""
        loading="lazy"
        className="absolute bottom-[8%] right-[2%] w-20 sm:w-28 opacity-15 animate-float -z-0 pointer-events-none"
      />

      <div className="relative z-10 section-container">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl gradient-text mb-4">
            Moje Osiągnięcia
          </h2>
          <p className="font-body text-base sm:text-lg text-charcoal/70 max-w-2xl mx-auto">
            Wychodzę z założenia, że skuteczny trener musi być praktykiem. Moje starty na ogólnokrajowych pomostach i zdobyte tytuły są dowodem na to, że metody, którymi pracuję ze swoimi podopiecznymi, przynoszą realne i mierzalne rezultaty.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Achievements Text Cards - left 5 cols */}
          <div ref={cardsRef} className="lg:col-span-5 flex flex-col gap-6">
            {achievements.map((item) => (
              <GlassCard
                key={item.title}
                className="achievement-card p-6 sm:p-8 bg-gradient-to-br from-white/60 to-white/30 border border-white/80 rounded-[24px]"
                hover={true}
              >
                <div>
                  <h3 className="font-display font-bold text-xl text-charcoal mb-1">
                    {item.title}
                  </h3>
                  <h4 className="font-body text-xs font-semibold text-pink uppercase tracking-wider mb-3">
                    {item.subtitle}
                  </h4>
                  <p className="font-body text-sm text-charcoal/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Photo Gallery - right 7 cols */}
          <div
            ref={galleryRef}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch justify-center"
          >
            {gallery.map((photo, i) => (
              <div
                key={i}
                className={`gallery-photo relative p-3 pb-8 rounded-2xl bg-white border border-charcoal/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:rotate-0 transform ${photo.rotation} max-w-[260px] mx-auto w-full flex flex-col`}
              >
                {/* Photo container */}
                <div className="aspect-[4/5] w-full rounded-lg bg-pink-light/10 overflow-hidden relative border border-charcoal/5 flex-grow">
                  {photo.src ? (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-pink-light/20 via-white to-pink-soft/20 gap-1">
                      <span className="font-display text-3xl font-light text-pink-hot mb-1">+</span >
                      <span className="font-display font-semibold text-sm text-charcoal">
                        Miejsce na Twoją przemianę
                      </span>
                      <span className="font-body text-[10px] text-charcoal/50">
                        Zacznijmy już dziś
                      </span>
                    </div>
                  )}
                  {/* Subtle vignette/gradient inside image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Caption / handwritten note */}
                <div className="mt-4 text-center">
                  <span className="font-accent text-2xl text-pink-hot leading-none block">
                    {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
