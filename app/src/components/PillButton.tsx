import { cn } from "@/lib/utils";
import { type ReactNode, useRef, useCallback } from "react";
import gsap from "gsap";

interface PillButtonProps {
  children: ReactNode;
  variant?: "cyan" | "pink" | "outline";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  magnetic?: boolean;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export default function PillButton({
  children,
  variant = "cyan",
  className,
  onClick,
  magnetic = true,
  disabled = false,
  href,
  target,
  rel,
}: PillButtonProps) {
  const btnRef = useRef<any>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
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
    cyan: "btn-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center",
    pink: "btn-pink disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center",
    outline:
      "border-2 border-white/60 text-charcoal font-semibold px-8 py-3 rounded-pill transition-all duration-300 hover:border-cyan hover:text-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center justify-center",
  };

  const classes = cn(variantClasses[variant], className);

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        className={classes}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      className={classes}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
