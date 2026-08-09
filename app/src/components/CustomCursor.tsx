import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sprawdź czy to nie urządzenie typowo dotykowe
    const isTouchDevice = "ontouchstart" in window && !window.matchMedia("(pointer: fine)").matches;
    if (isTouchDevice) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    if (!dot) return;

    // Szybkie pozycjonowanie GSAP z najwyższą wydajnością
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
    };

    const handleMouseDown = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.15, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
    };

    const handleMouseLeave = () => {
      gsap.to(dot, { opacity: 0, duration: 0.3 });
    };

    const handleMouseEnter = () => {
      gsap.to(dot, { opacity: 1, duration: 0.3 });
    };

    // Reakcja na najechanie na elementy interaktywne
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "a, button, input, select, textarea, [role='button'], .cursor-pointer, .category-card, .glass-card"
      );

      if (interactiveEl) {
        gsap.to(dot, {
          scale: 1.8,
          backgroundColor: "#00c2cb",
          boxShadow: "0 0 20px rgba(0, 194, 203, 0.9)",
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "a, button, input, select, textarea, [role='button'], .cursor-pointer, .category-card, .glass-card"
      );

      if (interactiveEl) {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#ff007f",
          boxShadow: "0 0 12px rgba(255, 0, 127, 0.8)",
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="hidden sm:block pointer-events-none">
      {/* Różowa kropka z poświatą */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-pink-hot rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(255,0,127,0.8)] transition-colors duration-200"
      />
    </div>
  );
}
