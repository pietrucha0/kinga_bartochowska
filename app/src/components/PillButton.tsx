import { cn } from "@/lib/utils";
import { type ReactNode, useRef, useCallback } from "react";
import gsap from "gsap";

interface PillButtonProps {
  children: ReactNode;
  variant?: "cyan" | "pink" | "outline";
  className?: string;
  onClick?: () => void;
  magnetic?: boolean;
  disabled?: boolean;
}

export default function PillButton({
  children,
  variant = "cyan",
  className,
  onClick,
  magnetic = true,
  disabled = false,
}: PillButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !btnRef.current || disabled) return;
      const btn = btnRef.current;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [magnetic, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    if (!magnetic || !btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, [magnetic]);

  const variantClasses = {
    cyan: "btn-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
    pink: "btn-pink disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
    outline:
      "border-2 border-white/60 text-charcoal font-semibold px-8 py-3 rounded-pill transition-all duration-300 hover:border-cyan hover:text-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
  };

  return (
    <button
      ref={btnRef}
      className={cn(variantClasses[variant], className)}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
