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
        colors: ["#e0115f", "#ff007f", "#00c2cb", "#ffb6c1"]
      });

      // Delayed second burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#00c2cb", "#ffb6c1"]
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#e0115f", "#ff007f"]
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

      // Animate checkmark SVG path drawing
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
  disabled?: boolean;
}

function CustomSelect({ id, value, onChange, options, disabled = false }: CustomSelectProps) {
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
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`input-minimal flex items-center justify-between text-left transition-all duration-300 w-full bg-transparent ${
          disabled ? "opacity-40 cursor-not-allowed border-charcoal/10" : "cursor-pointer"
        } ${
          isOpen && !disabled ? "border-cyan shadow-[0_2px_8px_rgba(0,194,203,0.15)]" : ""
        }`}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown
          className={`w-5 h-5 text-charcoal/50 transition-transform duration-300 pointer-events-none ${
            isOpen && !disabled ? "transform rotate-180 text-cyan" : ""
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl overflow-hidden py-1 max-h-60 overflow-y-auto origin-top animate-in fade-in slide-in-from-top-2 duration-200">
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

const cooperationOptions = [
  { value: "", label: "Wybierz formę współpracy" },
  { value: "personal", label: "Treningi personalne 1:1" },
  { value: "group", label: "Treningi w parach i grupowe" },
  { value: "online", label: "Współpraca online" },
];

const packageOptionsMap: Record<string, Option[]> = {
  "": [{ value: "", label: "Wybierz najpierw formę współpracy" }],
  personal: [
    { value: "", label: "Wybierz interesujący Cię pakiet" },
    { value: "1_training", label: "1 trening (180 zł)" },
    { value: "5_trainings", label: "Pakiet 5 treningów (700 zł)" },
    { value: "10_trainings", label: "Pakiet 10 treningów (1300 zł)" },
    { value: "20_trainings", label: "Pakiet 20 treningów (2400 zł)" },
  ],
  group: [
    { value: "", label: "Wybierz interesujący Cię pakiet" },
    { value: "1_training", label: "1 trening (300 zł)" },
    { value: "5_trainings", label: "Pakiet 5 treningów (1000 zł)" },
    { value: "10_trainings", label: "Pakiet 10 treningów (2000 zł)" },
    { value: "20_trainings", label: "Pakiet 20 treningów (3600 zł)" },
  ],
  online: [
    { value: "", label: "Wybierz interesujący Cię pakiet" },
    { value: "1_month", label: "1 miesiąc współpracy (250 zł)" },
    { value: "3_months", label: "3 miesiące współpracy (700 zł)" },
    { value: "6_months", label: "6 miesięcy współpracy (1000 zł)" },
  ],
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [botcheck, setBotcheck] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cooperationType: "",
    packageType: "",
    experience: "beginner",
    goal: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card-wrapper",
        { opacity: 0, y: 50, scale: 0.98 },
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

  // Listen to select package events from Pricing section
  useEffect(() => {
    const handleSelectPackage = (e: Event) => {
      const customEvent = e as CustomEvent<{ cooperationType: string; packageType: string }>;
      if (customEvent.detail) {
        setFormData((prev) => ({
          ...prev,
          cooperationType: customEvent.detail.cooperationType,
          packageType: customEvent.detail.packageType,
        }));
      }
    };

    window.addEventListener("select-package", handleSelectPackage);
    return () => window.removeEventListener("select-package", handleSelectPackage);
  }, []);

  const handleCooperationChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      cooperationType: val,
      packageType: "", // reset package when category changes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setErrors({});

    // Honeypot check
    if (botcheck) {
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    // Client-side validations
    const validationErrors: { [key: string]: string } = {};

    const nameTrimmed = formData.name.trim();
    if (nameTrimmed.length < 3) {
      validationErrors.name = "Imię i nazwisko musi zawierać co najmniej 3 znaki.";
    } else if (nameTrimmed.length > 60) {
      validationErrors.name = "Imię i nazwisko nie może przekraczać 60 znaków.";
    } else if (!/^[A-Za-zŻżÓóŁłĆćĘęĄąŚśŹźŻżŃńa-pr-u-y-z\s-]+$/i.test(nameTrimmed)) {
      validationErrors.name = "Imię i nazwisko może zawierać tylko litery i spacje.";
    }

    const emailTrimmed = formData.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      validationErrors.email = "Podaj poprawny adres e-mail.";
    } else if (emailTrimmed.length > 100) {
      validationErrors.email = "Adres e-mail jest zbyt długi (maks. 100 znaków).";
    }

    const phoneTrimmed = formData.phone.trim();
    if (phoneTrimmed) {
      if (!/^[+0-9\s()-,]+$/.test(phoneTrimmed)) {
        validationErrors.phone = "Numer telefonu zawiera niedozwolone znaki.";
      } else if (phoneTrimmed.length < 7 || phoneTrimmed.length > 20) {
        validationErrors.phone = "Numer telefonu musi mieć od 7 do 20 znaków.";
      }
    }

    if (!formData.cooperationType) {
      validationErrors.cooperationType = "Wybierz formę współpracy.";
    }

    if (!formData.packageType) {
      validationErrors.packageType = "Wybierz preferowany pakiet.";
    }

    const goalTrimmed = formData.goal.trim();
    if (!goalTrimmed) {
      validationErrors.goal = "Opis celu jest wymagany.";
    } else if (goalTrimmed.length > 1000) {
      validationErrors.goal = "Cel i oczekiwania mogą mieć maksymalnie 1000 znaków.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const coopLabel = cooperationOptions.find(o => o.value === formData.cooperationType)?.label || "";
    const currentPackages = packageOptionsMap[formData.cooperationType] || [];
    const packLabel = currentPackages.find(o => o.value === formData.packageType)?.label || "";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "320c65d1-85e2-496a-8135-71ae133e259f",
          name: nameTrimmed,
          email: emailTrimmed,
          phone: phoneTrimmed || "Nie podano",
          cooperationType: coopLabel,
          packageType: packLabel,
          experience: formData.experience === "beginner"
            ? "Początkujący (brak stażu / < 6 msc)"
            : formData.experience === "intermediate"
              ? "Średniozaawansowany (6 msc - 2 lata)"
              : "Zaawansowany (powyżej 2 lat)",
          subject: `Nowe zgłoszenie od ${nameTrimmed} - Kinga Bartochowska Fitness`,
          message: `Forma współpracy: ${coopLabel}\nPakiet: ${packLabel}\nStaż treningowy: ${formData.experience === "beginner" ? "Początkujący" : formData.experience === "intermediate" ? "Średniozaawansowany" : "Zaawansowany"}\n\nCel i oczekiwania: ${goalTrimmed}\nTelefon: ${phoneTrimmed || 'Nie podano'}`,
          from_name: "Kinga Bartochowska Fitness",
          botcheck: botcheck
        }),
      });

      const result = await response.json();
      if (response.status === 200 && result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          cooperationType: "",
          packageType: "",
          experience: "beginner",
          goal: "",
        });
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

  const currentPackages = packageOptionsMap[formData.cooperationType] || packageOptionsMap[""];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 sm:py-32 lg:py-40 overflow-hidden bg-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-blush-mist pointer-events-none" />

      {/* Decorative shapes */}
      <img
        src="/assets/dumbbell.webp"
        alt=""
        loading="lazy"
        className="absolute top-[10%] left-[5%] w-20 sm:w-28 opacity-50 animate-float-slow pointer-events-none"
      />
      <img
        src="/assets/kettlebell.webp"
        alt=""
        loading="lazy"
        className="absolute bottom-[15%] right-[8%] w-16 sm:w-24 opacity-40 animate-float pointer-events-none"
      />

      <div className="relative z-10 section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-4">
            Zacznij swoją przygodę
          </h2>
          <p className="font-body text-base text-charcoal/70 max-w-xl mx-auto">
            Wypełnij poniższy formularz kontaktowy, aby omówić szczegóły i rozpocząć współpracę. Odpowiem w ciągu 24 godzin!
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="contact-card-wrapper grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Column 1: Contact Form (7 cols) */}
          <div className="lg:col-span-7 h-full flex flex-col">
            <GlassCard className="p-6 sm:p-10 lg:p-12 w-full flex-grow flex flex-col justify-between" hover={false}>
              {submitted ? (
                <ContactSuccess />
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col justify-between">
                  {/* Honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={botcheck}
                    onChange={(e) => setBotcheck(e.target.checked)}
                    className="hidden"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block font-body text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-2">
                        Imię i nazwisko
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`input-minimal font-body text-base ${errors.name ? "border-pink-hot" : ""}`}
                        placeholder="np. Anna Kowalska"
                      />
                      {errors.name && (
                        <p className="text-xs text-pink-hot font-body mt-1.5">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block font-body text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-2">
                        Adres e-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`input-minimal font-body text-base ${errors.email ? "border-pink-hot" : ""}`}
                        placeholder="np. anna@przyklad.pl"
                      />
                      {errors.email && (
                        <p className="text-xs text-pink-hot font-body mt-1.5">{errors.email}</p>
                      )}
                    </div>

                    {/* Cooperation Type */}
                    <div>
                      <label htmlFor="cooperationType" className="block font-body text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-2">
                        Forma współpracy
                      </label>
                      <CustomSelect
                        id="cooperationType"
                        value={formData.cooperationType}
                        onChange={handleCooperationChange}
                        options={cooperationOptions}
                      />
                      {errors.cooperationType && (
                        <p className="text-xs text-pink-hot font-body mt-1.5">{errors.cooperationType}</p>
                      )}
                    </div>

                    {/* Preferred Package */}
                    <div>
                      <label htmlFor="packageType" className="block font-body text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-2">
                        Preferowany pakiet
                      </label>
                      <CustomSelect
                        id="packageType"
                        value={formData.packageType}
                        onChange={(val) => setFormData({ ...formData, packageType: val })}
                        options={currentPackages}
                        disabled={!formData.cooperationType}
                      />
                      {errors.packageType && (
                        <p className="text-xs text-pink-hot font-body mt-1.5">{errors.packageType}</p>
                      )}
                    </div>

                    {/* Experience */}
                    <div>
                      <label htmlFor="experience" className="block font-body text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-2">
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
                      <label htmlFor="phone" className="block font-body text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>Numer telefonu</span>
                        <span className="text-[10px] text-charcoal/40 font-normal lowercase">opcjonalnie</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`input-minimal font-body text-base ${errors.phone ? "border-pink-hot" : ""}`}
                        placeholder="np. +48 123 456 789"
                      />
                      {errors.phone && (
                        <p className="text-xs text-pink-hot font-body mt-1.5">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Goal (Description) */}
                  <div className="mt-6">
                    <label htmlFor="goal" className="block font-body text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-2">
                      Twój główny cel i oczekiwania
                    </label>
                    <textarea
                      id="goal"
                      required
                      rows={3}
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className={`input-minimal font-body text-base resize-none ${errors.goal ? "border-pink-hot" : ""}`}
                      placeholder="np. redukcja wagi o 5 kg, budowa pośladków, poprawa kondycji, powrót do sprawności..."
                    />
                    {errors.goal && (
                      <p className="text-xs text-pink-hot font-body mt-1.5">{errors.goal}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <PillButton
                      variant="cyan"
                      className="w-full py-4 text-base flex justify-center items-center gap-2 font-semibold"
                      disabled={isSubmitting}
                      magnetic={false}
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
                        "Wyślij zgłoszenie"
                      )}
                    </PillButton>
                  </div>

                  {submitError && (
                    <p className="text-center font-body text-sm text-pink-hot font-medium mt-3">
                      {submitError}
                    </p>
                  )}
                </form>
              )}
            </GlassCard>
          </div>

          {/* Column 2: Contact Info Card (5 cols) */}
          <div className="lg:col-span-5 h-full flex flex-col">
            <GlassCard className="p-6 sm:p-10 lg:p-12 w-full flex-grow flex flex-col justify-between bg-gradient-to-br from-white/70 to-pink-mist/30 border border-white/60" hover={true}>
              <div>
                <span className="font-body text-[10px] font-bold text-pink uppercase tracking-widest block mb-2">
                  Dane kontaktowe
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal mb-8">
                  Skontaktuj się bezpośrednio
                </h3>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center text-cyan mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <span className="font-body text-xs font-semibold text-charcoal/50 block">Telefon</span>
                      <a href="tel:500547580" className="font-display font-bold text-lg text-charcoal hover:text-pink transition-colors">
                        500-547-580
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-full bg-pink/10 flex items-center justify-center text-pink mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <span className="font-body text-xs font-semibold text-charcoal/50 block">E-mail</span>
                      <a href="mailto:kingsquadt@gmail.com" className="font-display font-bold text-lg text-charcoal hover:text-pink transition-colors break-all">
                        kingsquadt@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center text-cyan mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <div>
                      <span className="font-body text-xs font-semibold text-charcoal/50 block">Lokalizacja treningów stacjonarnych</span>
                      <span className="font-body text-base font-semibold text-charcoal block mb-0.5">
                        Calypso Łomianki
                      </span>
                      <span className="font-body text-sm text-charcoal/70 block leading-relaxed">
                        Warszawska 201/203,<br />
                        05-092 Kiełpin Poduchowny
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}
