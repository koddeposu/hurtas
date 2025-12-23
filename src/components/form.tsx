"use client";
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquare, Phone, Send, User } from 'lucide-react';

export const LeadForm = () => {
  return (
    <section className="py-24 px-6 font-[family-name:var(--font-poppins)] overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* SOL TARAF: Bilgilendirme Alanı */}
            <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden" style={{ backgroundColor: '#165b39' }}>
              {/* Arka plan dekoratif halka */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#49202d]/20 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                    Ücretsiz <br />
                    <span className="text-emerald-300 italic">Danışmanlık</span> Alın.
                  </h2>
                  <p className="mt-6 text-emerald-50/70 font-medium leading-relaxed">
                    Hayalinizdeki prefabrik ev projesini uzman ekibimizle planlayın. Size en uygun çözümü ve bütçeyi birlikte belirleyelim.
                  </p>
                </motion.div>

                <div className="space-y-4 pt-4">
                  {[
                    "Kişiye özel mimari çizim",
                    "Detaylı maliyet analizi",
                    "Zemin ve arazi danışmanlığı"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90 font-semibold text-sm">
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SAĞ TARAF: Form Alanı */}
            <div className="lg:col-span-7 p-10 md:p-16 bg-white">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ad Soyad */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Adınız Soyadınız</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#165b39] transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#165b39]/30 focus:ring-4 focus:ring-[#165b39]/5 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  {/* Telefon */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Telefon Numaranız</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#165b39] transition-colors">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        placeholder="0 (5xx) 000 00 00"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#165b39]/30 focus:ring-4 focus:ring-[#165b39]/5 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Mesaj */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mesajınız / Hayalinizdeki Ev</label>
                  <div className="relative group">
                    <div className="absolute top-4 left-4 pointer-events-none text-slate-300 group-focus-within:text-[#165b39] transition-colors">
                      <MessageSquare size={18} />
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Projenizden kısaca bahsedin..."
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#165b39]/30 focus:ring-4 focus:ring-[#165b39]/5 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Buton */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-2xl text-white font-bold text-sm tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl transition-all"
                  style={{ backgroundColor: '#165b39' }}
                >
                  TEKLİFİ GÖNDER <Send size={18} />
                </motion.button>

                <p className="text-center text-[10px] text-slate-400 font-medium">
                  Verileriniz KVKK kapsamında korunmaktadır. Formu göndererek <span className="underline cursor-pointer">aydınlatma metnini</span> kabul etmiş sayılırsınız.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

