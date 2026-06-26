import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import PillButton from "@/components/PillButton";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

function ContactSuccess() {
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Confetti explosion
    import("canvas-confetti").then((module) => {
      const confetti = module.default;
      
      // First burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#22d3ee", "#ec4899", "#a855f7", "#3b82f6"]
      });

      // Delayed second burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#22d3ee", "#3b82f6"]
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ec4899", "#a855f7"]
        });
      }, 250);
    });

    // 2. GSAP animation of the success screen elements
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate checkmark circle scaling up with elastic ease
      tl.fromTo(
        ".success-circle",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );

      // Animate checkmark SVG path drawing (draw SVG path checkmark)
      tl.fromTo(
        ".success-check-path",
        { strokeDashoffset: 50, strokeDasharray: 50 },
        { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // Animate title and description text fading & sliding up
      tl.fromTo(
        ".success-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(
        ".success-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    }, successRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={successRef} className="text-center py-12">
      <div className="success-circle w-20 h-20 mx-auto mb-6 rounded-full bg-cyan/20 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-cyan"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            className="success-check-path"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            style={{ strokeDasharray: 50, strokeDashoffset: 50 }}
          />
        </svg>
      </div>
      <h3 className="success-title font-display font-semibold text-2xl text-charcoal mb-2">
        Wiadomość wysłana!
      </h3>
      <p className="success-desc font-body text-charcoal/70">
        Dziękuję za kontakt. Skontaktuję się z Tobą wkrótce!
      </p>
    </div>
  );
}

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

function CustomSelect({ id, value, onChange, options }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`input-minimal flex items-center justify-between text-left cursor-pointer transition-all duration-300 w-full bg-transparent ${
          isOpen ? "border-cyan shadow-[0_2px_8px_rgba(0,194,203,0.15)]" : ""
        }`}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown
          className={`w-5 h-5 text-charcoal/50 transition-transform duration-300 pointer-events-none ${
            isOpen ? "transform rotate-180 text-cyan" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl overflow-hidden py-1 origin-top animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm font-body transition-colors duration-200 cursor-pointer ${
                option.value === value
                  ? "bg-cyan/10 text-cyan font-medium"
                  : "text-charcoal hover:bg-black/5"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "beginner",
    goal: "",
    healthNotes: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Nie podano",
          experience: formData.experience === "beginner"
            ? "Początkujący (brak stażu / < 6 msc)"
            : formData.experience === "intermediate"
              ? "Średniozaawansowany (6 msc - 2 lata)"
              : "Zaawansowany (powyżej 2 lat)",
          subject: `Nowe zgłoszenie od ${formData.name} - Kinga Bartochowska Fitness`,
          message: `Cel: ${formData.goal}\n\nPrzeciwwskazania zdrowotne: ${formData.healthNotes || 'Brak'}\nTelefon: ${formData.phone || 'Nie podano'}`,
          from_name: "Kinga Bartochowska Fitness",
        }),
      });

      const result = await response.json();
      if (response.status === 200 && result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          experience: "beginner",
          goal: "",
          healthNotes: "",
        });
        // Automatically close checkmark screen after 5 seconds to reset form
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setSubmitError(result.message || "Coś poszło nie tak. Spróbuj ponownie.");
      }
    } catch (err) {
      setSubmitError("Błąd połączenia. Upewnij się, że masz połączenie z internetem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-blush-mist" />

      {/* Decorative shapes */}
      <img
        src="/assets/sphere-pink-3d.png"
        alt=""
        className="absolute top-[10%] left-[5%] w-20 sm:w-28 opacity-50 animate-float-slow"
      />
      <img
        src="/assets/sphere-silver-3d.png"
        alt=""
        className="absolute bottom-[15%] right-[8%] w-16 sm:w-24 opacity-40 animate-float"
      />

      <div className="relative z-10 section-container flex justify-center">
        <div className="w-full max-w-2xl">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-4">
              Zacznij swoją przygodę
            </h2>
            <p className="font-body text-base text-charcoal/70">
              Wypełnij poniższą ankietę kontaktową, a skontaktuję się z Tobą w ciągu 24 godzin.
            </p>
          </div>

          {/* Form Card */}
          <GlassCard className="contact-card p-8 sm:p-10 lg:p-12" hover={false}>
            {submitted ? (
              <ContactSuccess />
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Form fields grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-body text-sm font-medium text-charcoal/70 mb-2"
                    >
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="input-minimal font-body text-base"
                      placeholder="np. Anna Kowalska"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-body text-sm font-medium text-charcoal/70 mb-2"
                    >
                      Adres e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input-minimal font-body text-base"
                      placeholder="np. anna@przyklad.pl"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label
                      htmlFor="experience"
                      className="block font-body text-sm font-medium text-charcoal/70 mb-2"
                    >
                      Staż treningowy
                    </label>
                    <CustomSelect
                      id="experience"
                      value={formData.experience}
                      onChange={(val) => setFormData({ ...formData, experience: val })}
                      options={[
                        { value: "beginner", label: "Początkujący (brak stażu lub < 6 msc)" },
                        { value: "intermediate", label: "Średniozaawansowany (6 msc - 2 lata)" },
                        { value: "advanced", label: "Zaawansowany (powyżej 2 lat)" },
                      ]}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-body text-sm font-medium text-charcoal/70 mb-2 flex items-center justify-between"
                    >
                      <span>Numer telefonu</span>
                      <span className="text-xs text-charcoal/40 font-normal">opcjonalnie</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="input-minimal font-body text-base"
                      placeholder="np. +48 123 456 789"
                    />
                  </div>
                </div>

                {/* Goal */}
                <div>
                  <label
                    htmlFor="goal"
                    className="block font-body text-sm font-medium text-charcoal/70 mb-2"
                  >
                    Twój główny cel i oczekiwania
                  </label>
                  <textarea
                    id="goal"
                    required
                    rows={3}
                    value={formData.goal}
                    onChange={(e) =>
                      setFormData({ ...formData, goal: e.target.value })
                    }
                    className="input-minimal font-body text-base resize-none"
                    placeholder="np. redukcja wagi o 5 kg, budowa pośladków, poprawa kondycji, powrót do sprawności..."
                  />
                </div>

                {/* Health Notes */}
                <div>
                  <label
                    htmlFor="healthNotes"
                    className="block font-body text-sm font-medium text-charcoal/70 mb-2 flex items-center justify-between"
                  >
                    <span>Przeciwwskazania zdrowotne / kontuzje / choroby</span>
                    <span className="text-xs text-charcoal/40 font-normal">opcjonalnie</span>
                  </label>
                  <textarea
                    id="healthNotes"
                    rows={2}
                    value={formData.healthNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, healthNotes: e.target.value })
                    }
                    className="input-minimal font-body text-base resize-none"
                    placeholder="Wpisz wszelkie przebyte urazy, bóle kręgosłupa, problemy z kolanami itp."
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <PillButton
                    variant="cyan"
                    className="w-full py-4 text-base flex justify-center items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Wysyłanie...
                      </>
                    ) : (
                      "Wyślij wiadomość"
                    )}
                  </PillButton>
                </div>

                {submitError && (
                  <p className="text-center font-body text-sm text-pink-hot font-medium mt-2">
                    {submitError}
                  </p>
                )}

                {/* <p className="text-center font-body text-xs text-charcoal/50">
                  Wysyłając formularz, wyrażasz zgodę na otrzymywanie wskazówek
                  fitness i e-maili promocyjnych. Możesz zrezygnować w każdej chwili.
                </p> */}
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
