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
import { useState } from "react";
import { submitContactForm } from "@/actions/contactActions";

export const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", message: "" });
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
    <section className="lg:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-[3.5rem] shadow-md border border-slate-50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* SOL TARAF: Bilgilendirme Alanı */}
            <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden bg-secondary">
              {/* Arka plan dekoratif halka */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                    Ücretsiz <br />
                    <span className="text-emerald-300 italic">
                      Danışmanlık
                    </span>{" "}
                    Alın.
                  </h2>
                  <p className="mt-6 text-emerald-50/70 font-medium leading-relaxed">
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
                      className="flex items-center gap-3 text-white/90 font-semibold text-sm"
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
            <div className="lg:col-span-7 p-4 md:p-16 bg-white relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <Check size={40} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">
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
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Ad Soyad */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
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
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#165b39]/30 focus:ring-4 focus:ring-[#165b39]/5 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      {/* Telefon */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
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
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#165b39]/30 focus:ring-4 focus:ring-[#165b39]/5 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mesaj */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
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
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#165b39]/30 focus:ring-4 focus:ring-[#165b39]/5 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300 resize-none"
                        ></textarea>
                      </div>
                    </div>

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
                      className="w-full py-5 rounded-2xl text-white font-bold text-sm tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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

                    <p className="text-center text-[10px] text-slate-400 font-medium">
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
