import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom spring ease function
function createBouncyEase(
  velocity = 500,
  mass = 1.5,
  stiffness = 300,
  damping = 20
) {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    const bouncyAffect =
      (zeta * w0 + wd) / (wd * velocity * 100);
    return (t: number) =>
      1 -
      bouncyAffect *
        Math.exp(-zeta * w0 * t) *
        Math.sin(wd * t + Math.atan(wd / (zeta * w0)));
  } else {
    return (t: number) =>
      1 - (1 / (velocity * 100)) * Math.exp(-w0 * t);
  }
}

const floatingIcons = [
  { src: "/assets/dumbbell.png", alt: "Dumbbell" },
  { src: "/assets/kettlebell.png", alt: "Kettlebell" },
  { src: "/assets/barbell.png", alt: "Barbell" },
  { src: "/assets/clips.png", alt: "Clips" },
];

export default function CommunityMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textEl = textRef.current;
      if (!textEl) return;

      // Split text into individual character spans
      const words = textEl.querySelectorAll(".bouncy-word");
      const allChars: HTMLSpanElement[] = [];

      words.forEach((word) => {
        const text = word.textContent || "";
        word.textContent = "";
        const chars = text.split("");
        chars.forEach((char) => {
          const span = document.createElement("span");
          span.className = "bouncy-char";
          span.style.display = "inline-block";
          span.style.willChange = "transform";
          span.textContent = char;
          word.appendChild(span);
          allChars.push(span);
        });
      });

      // Select the subtext element
      const subtext = textEl.querySelector(".font-accent");

      // Set initial state to avoid flash
      gsap.set(allChars, {
        opacity: 0,
        x: (index: number) => (index % 2 === 0 ? -150 : 150),
        y: (index: number) => (index % 2 === 0 ? -80 : 80),
        rotation: (index: number) => (index % 2 === 0 ? -15 : 15),
        scale: 0.8,
      });

      if (subtext) {
        gsap.set(subtext, {
          opacity: 0,
          y: 20,
        });
      }

      // Create timeline
      const tl = gsap.timeline({ paused: true });

      tl.to(allChars, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: createBouncyEase(),
        stagger: 0.05,
      });

      if (subtext) {
        tl.to(
          subtext,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8"
        );
      }

      // Animate on scroll (replays every time user enters the section)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        animation: tl,
        toggleActions: "play reset play reset",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative w-full py-32 sm:py-40 lg:py-52 overflow-hidden bg-charcoal"
    >
      {/* Floating icons marquee background */}
      <div className="absolute inset-0 flex items-center overflow-hidden opacity-20 pointer-events-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-32 px-16">
              {floatingIcons.map((icon, i) => (
                <img
                  key={`${setIndex}-${i}`}
                  src={icon.src}
                  alt=""
                  className="w-16 sm:w-20 md:w-24 h-auto flex-shrink-0"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main bouncy text */}
      <div className="relative z-10 section-container">
        <div
          ref={textRef}
          className="text-center"
        >
          <h2 className="font-display font-bold text-[clamp(4rem,15vw,12rem)] leading-[0.9] text-white uppercase tracking-tight">
            <span className="block">
              <span className="bouncy-word">SILNIEJSZE</span>
            </span>
            <span className="block mt-2">
              <span className="bouncy-word">RAZEM</span>
            </span>
          </h2>

          {/* Subtext */}
          <p className="font-accent text-2xl sm:text-3xl text-pink-light mt-8 italic">
            Dołącz do kobiet, które zmieniają swoje życie
          </p>
        </div>
      </div>
    </section>
  );
}
