"use client";
import { motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  MousePointer2,
} from "lucide-react";
import { useEffect } from "react";

// Resim Çiftleri: left -> Teknik/Plan (-k), right -> Gerçek Resim
const catalogPairs = [
  { left: "2+1-celik-prefabrik-ev-k", right: "2+1-celik-prefabrik-ev-resim" },
  { left: "2+1-prefabrik-ev-1-k", right: "2+1-prefabrik-ev-1" },
  { left: "3+1-prefabrik-ev-k", right: "3+1-prefabrik-ev-1" },
  { left: "cift-katli-prefabrik-ev-1-k", right: "cift-katli-prefabrik-ev-1" },
  { left: "cift-katli-prefabrik-ev-2-k", right: "cift-katli-prefabrik-ev-2" },
];

export const pageAtom = atom(0);

// Sayfa Dizilimi Mantığı
export const pages: { front: string; back: string }[] = [
  {
    front: "katolog/prefabrik-ev-katolog-kapagi", // Ön Kapak (Sağda başlar)
    back: `katolog/${catalogPairs[0].left}`, // Kapak açılınca soldaki ilk teknik çizim
  },
];

for (let i = 0; i < catalogPairs.length; i++) {
  const currentPair = catalogPairs[i];
  const nextPair = catalogPairs[i + 1];

  if (nextPair) {
    pages.push({
      front: `katolog/${currentPair.right}`, // Sağ sayfa (Resim)
      back: `katolog/${nextPair.left}`, // Çevrilince sol sayfa (Sonraki Teknik)
    });
  } else {
    // Son resim ve Arka Kapak
    pages.push({
      front: `katolog/${currentPair.right}`,
      back: "katolog/prefabrik-katolog-arka",
    });
  }
}

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  // Sayfa çevrildiğinde ses çalma
  useEffect(() => {
    if (page > 0 && page <= pages.length) {
      const audio = new Audio("/audios/page-flip-01a.mp3");
      audio.play().catch(() => {
        /* Kullanıcı etkileşimi öncesi hatayı görmezden gel */
      });
    }
  }, [page]);

  return (
    <>
      <main className="pointer-events-none select-none z-20 fixed inset-0 flex flex-col justify-between mt-16 p-5 md:p-12">
        {/* --- ÜST KISIM: LOGO & SAYFA BİLGİSİ --- */}
        <div className="flex justify-between items-start w-full pointer-events-auto mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#201915]/75 backdrop-blur-xl px-6 py-3 rounded-2xl border border-[#e6c997]/35 shadow-[0_20px_55px_-35px_rgba(40,22,12,0.8)] flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#49202d]/20">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-[10px] font-black text-[#f4dcb8]/70 uppercase tracking-[0.3em] leading-none">
                Proje Kataloğu
              </h2>
              <p className="text-sm font-black text-[#fff4e3] mt-1 uppercase">
                CT Prefabrik 2025
              </p>
            </div>
          </motion.div>

          <div className="hidden md:flex flex-col items-end">
            <div className="text-[4rem] font-black text-[#49202d]/20 leading-none select-none">
              {String(page).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* --- ALT KISIM: NAVİGASYON --- */}
        <div className="w-full flex flex-col items-center gap-6 pointer-events-auto  md:mb-0">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-2 text-[10px] font-bold text-[#efddc0]/85 uppercase tracking-widest"
          >
            <MousePointer2 size={12} /> Sayfaları çevirmek için tıklayın
          </motion.div>

          <div className="bg-[#221b17]/80 backdrop-blur-2xl p-3 rounded-[2.5rem] border border-[#efd5ab]/30 shadow-[0_28px_65px_-35px_rgba(22,12,6,0.85)] flex items-center gap-2 max-w-full overflow-hidden">
            {/* Geri Butonu */}
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-full hover:bg-[#f0d8b4]/10 transition-colors text-[#e6cba4] hover:text-[#f8e0bb]"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Sayfa Slotları / Noktalar */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 max-w-[60vw]">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`relative shrink-0 cursor-pointer transition-all duration-500 rounded-full ${
                    index === page
                      ? "px-6 py-2 bg-primary text-white shadow-lg shadow-[#49202d]/30"
                      : "w-3 h-3 bg-[#efd7b1]/30 hover:bg-[#efd7b1]/60"
                  }`}
                >
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${index === page ? "block" : "hidden"}`}
                  >
                    {index === 0 ? "Kapak" : `S. ${index}`}
                  </span>
                </button>
              ))}

              {/* Arka Kapak Butonu */}
              <button
                onClick={() => setPage(pages.length)}
                className={`relative shrink-0 cursor-pointer transition-all duration-500 rounded-full ${
                  page === pages.length
                    ? "px-6 py-2 bg-primary text-white shadow-lg shadow-[#49202d]/30"
                    : "w-3 h-3 bg-[#efd7b1]/30 hover:bg-[#efd7b1]/60"
                }`}
              >
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${page === pages.length ? "block" : "hidden"}`}
                >
                  Son
                </span>
              </button>
            </div>

            {/* İleri Butonu */}
            <button
              onClick={() => setPage(Math.min(pages.length, page + 1))}
              className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-full hover:bg-[#f0d8b4]/10 transition-colors text-[#e6cba4] hover:text-[#f8e0bb]"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </main>

      {/* Arka Plan Dekorasyonu */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(255,245,224,0.95),transparent_42%),radial-gradient(circle_at_88%_20%,rgba(73,32,45,0.18),transparent_46%),linear-gradient(165deg,#eadcc7_0%,#d2bea1_52%,#bea17f_100%)]" />
      <div className="fixed top-[-120px] right-[-120px] h-[520px] w-[520px] rounded-full bg-[#f7e3c2]/45 blur-[110px] -z-10" />
      <div className="fixed bottom-[-160px] left-[-140px] h-[560px] w-[560px] rounded-full bg-primary/20 blur-[130px] -z-10" />
    </>
  );
};
