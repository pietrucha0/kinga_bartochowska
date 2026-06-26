import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillButton from "@/components/PillButton";
import GlassCard from "@/components/GlassCard";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", goal: "" });
    }, 3000);
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
        <div className="w-full max-w-xl">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-4">
              Zacznij swoją przygodę
            </h2>
            <p className="font-body text-base text-charcoal/70">
              Wypełnij poniższy formularz, a skontaktuję się z Tobą w ciągu 24
              godzin.
            </p>
          </div>

          {/* Form Card */}
          <GlassCard className="contact-card p-8 sm:p-10 lg:p-12" hover={false}>
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyan/20 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-cyan"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-2xl text-charcoal mb-2">
                  Wiadomość wysłana!
                </h3>
                <p className="font-body text-charcoal/70">
                  Dziękuję za kontakt. Skontaktuję się z Tobą wkrótce!
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block font-body text-sm font-medium text-charcoal/70 mb-2"
                  >
                    Twoje imię
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
                    placeholder="Wpisz swoje imię"
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
                    placeholder="twoj@email.com"
                  />
                </div>

                {/* Goal */}
                <div>
                  <label
                    htmlFor="goal"
                    className="block font-body text-sm font-medium text-charcoal/70 mb-2"
                  >
                    Twój cel
                  </label>
                  <select
                    id="goal"
                    required
                    value={formData.goal}
                    onChange={(e) =>
                      setFormData({ ...formData, goal: e.target.value })
                    }
                    className="input-minimal font-body text-base bg-transparent cursor-pointer appearance-none"
                  >
                    <option value="" disabled>
                      Wybierz swój główny cel
                    </option>
                    <option value="lose-weight">Redukcja wagi</option>
                    <option value="build-muscle">Budowa masy mięśniowej</option>
                    <option value="tone-body">Rzeźba i ujędrnianie</option>
                    <option value="improve-health">Poprawa ogólnego zdrowia</option>
                    <option value="postpartum">Powrót do formy po ciąży</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <PillButton variant="cyan" className="w-full py-4 text-base">
                    Wyślij wiadomość
                  </PillButton>
                </div>

                <p className="text-center font-body text-xs text-charcoal/50">
                  Wysyłając formularz, wyrażasz zgodę na otrzymywanie wskazówek
                  fitness i e-maili promocyjnych. Możesz zrezygnować w każdej chwili.
                </p>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
