"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  MessageSquare,
  Phone,
  Send,
  User,
  Check,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContactForm } from "@/actions/contactActions";

export const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    website: "", // honeypot field
  });
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldLoadTurnstile, setShouldLoadTurnstile] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || shouldLoadTurnstile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldLoadTurnstile(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [shouldLoadTurnstile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate turnstile token
    if (!turnstileToken) {
      setError("Lütfen doğrulamayı bekleyin ve tekrar deneyin.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitContactForm({
        ...formData,
        turnstileToken,
      });
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", message: "", website: "" });
        setTurnstileToken("");
      } else {
        setError("Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      setError("Bir bağlantı hatası oluştu. Lütfen tekrar deneyin.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section ref={sectionRef} className="lg:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[3rem] border border-slate-50 bg-white shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* SOL TARAF: Bilgilendirme Alanı */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-secondary p-8 md:p-12 lg:col-span-5">
              {/* Arka plan dekoratif halka */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-black leading-tight tracking-tighter text-white md:text-4xl">
                    Ücretsiz <br />
                    <span className="text-emerald-300 italic">
                      Danışmanlık
                    </span>{" "}
                    Alın.
                  </h2>
                  <p className="mt-4 text-sm font-medium leading-7 text-white/90">
                    Hayalinizdeki prefabrik ev projesini uzman ekibimizle
                    planlayın. Size en uygun çözümü ve bütçeyi birlikte
                    belirleyelim.
                  </p>
                </motion.div>

                <div className="space-y-4 pt-4">
                  {[
                    "Kişiye özel mimari çizim",
                    "Detaylı maliyet analizi",
                    "Zemin ve arazi danışmanlığı",
                  ].map((item, i) => (
                    <div
                      key={i}
                    className="flex items-center gap-3 text-sm font-semibold text-white/90"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-emerald-400 shrink-0"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SAĞ TARAF: Form Alanı */}
            <div className="relative bg-white p-4 md:p-12 lg:col-span-7">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex h-full flex-col items-center justify-center space-y-5 py-10 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <Check size={40} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Mesajınız Alındı!
                      </h3>
                      <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                        En kısa sürede uzman ekibimiz sizinle iletişime
                        geçecektir. İlginiz için teşekkürler.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-[#165b39] font-bold text-sm tracking-widest hover:underline"
                    >
                      YENİ FORM GÖNDER
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      {/* Ad Soyad */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-600 uppercase tracking-widest ml-1">
                          Adınız Soyadınız
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#165b39] transition-colors">
                            <User size={18} />
                          </div>
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Örn: Ahmet Yılmaz"
                            className="w-full rounded-2xl border border-transparent bg-slate-50 py-3.5 pl-12 pr-4 font-medium text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-[#165b39]/30 focus:bg-white focus:ring-4 focus:ring-[#165b39]/5"
                          />
                        </div>
                      </div>

                      {/* Telefon */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-600 uppercase tracking-widest ml-1">
                          Telefon Numaranız
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#165b39] transition-colors">
                            <Phone size={18} />
                          </div>
                          <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="0 (5xx) 000 00 00"
                            className="w-full rounded-2xl border border-transparent bg-slate-50 py-3.5 pl-12 pr-4 font-medium text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-[#165b39]/30 focus:bg-white focus:ring-4 focus:ring-[#165b39]/5"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mesaj */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-600 uppercase tracking-widest ml-1">
                        Mesajınız / Hayalinizdeki Ev
                      </label>
                      <div className="relative group">
                        <div className="absolute top-4 left-4 pointer-events-none text-slate-300 group-focus-within:text-[#165b39] transition-colors">
                          <MessageSquare size={18} />
                        </div>
                        <textarea
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Projenizden kısaca bahsedin..."
                          className="w-full resize-none rounded-2xl border border-transparent bg-slate-50 py-3.5 pl-12 pr-4 font-medium text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-[#165b39]/30 focus:bg-white focus:ring-4 focus:ring-[#165b39]/5"
                        ></textarea>
                      </div>
                    </div>

                    {/* Honeypot field - hidden from humans, bots will fill it */}
                    <div
                      style={{ position: "absolute", left: "-9999px" }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Cloudflare Turnstile - invisible CAPTCHA */}
                    {shouldLoadTurnstile ? (
                      <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                        onSuccess={setTurnstileToken}
                        onError={() => setTurnstileToken("")}
                        onExpire={() => setTurnstileToken("")}
                        options={{ size: "invisible" }}
                      />
                    ) : null}

                    {error && (
                      <p className="text-red-500 text-sm font-medium ml-1">
                        {error}
                      </p>
                    )}

                    {/* Buton */}
                    <motion.button
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-sm font-bold tracking-[0.16em] text-white shadow-xl transition-all disabled:cursor-not-allowed disabled:opacity-70"
                      style={{ backgroundColor: "#165b39" }}
                    >
                      {isSubmitting ? (
                        <>
                          GÖNDERİLİYOR...{" "}
                          <Loader2 size={18} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          TEKLİFİ GÖNDER <Send size={18} />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[10px] text-slate-600 font-medium">
                      Verileriniz KVKK kapsamında korunmaktadır. Formu
                      göndererek{" "}
                      <span className="underline cursor-pointer">
                        aydınlatma metnini
                      </span>{" "}
                      kabul etmiş sayılırsınız.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
