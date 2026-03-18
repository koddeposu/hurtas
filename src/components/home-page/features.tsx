import { Gem, Ruler, Shield, Smile, Star, Zap } from "lucide-react";

export const Features = () => {
  const features = [
    {
      id: "01",
      title: "Sektöründe Öncü",
      icon: <Star size={20} />,
      color: "#165b39",
    },
    {
      id: "02",
      title: "Güvenilir Yapı",
      icon: <Shield size={20} />,
      color: "#49202d",
    },
    {
      id: "03",
      title: "Yüksek Kalite",
      icon: <Gem size={20} />,
      color: "#165b39",
    },
    {
      id: "04",
      title: "Modern Tasarımlar",
      icon: <Ruler size={20} />,
      color: "#49202d",
    },
    {
      id: "05",
      title: "Fiyat Performans",
      icon: <Zap size={20} />,
      color: "#165b39",
    },
    {
      id: "06",
      title: "Mutlu Müşteriler",
      icon: <Smile size={20} />,
      color: "#49202d",
    },
  ];

  return (
    <section className="relative  font-[family-name:var(--font-poppins)]">
      {/* Arka Plan Büyük Yazı Efekti (Mimari Dergi Hissi) */}
      <div className="absolute top-10 left-[0%] text-[15vw] font-black text-slate-100/80 select-none leading-none z-0">
        CT PREFABRİK
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* SOL TARAF: Sabit Başlık Alanı (Dikey Çizgili) */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-32">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-secondary" />
                <span className="text-secondary font-bold text-xs uppercase tracking-[0.2em]">
                  Ayrıcalıklarımız
                </span>
              </div>

              <h2 className="mb-6 text-2xl font-black leading-[1.1] tracking-tighter text-slate-900 md:text-5xl">
                Neden <br />
                <span style={{ color: "#49202d" }}>CT</span> Prefabrik Ev?
              </h2>

              <div className="relative space-y-5 border-l-2 border-slate-100 pl-7">
                <p className="text-lg font-medium italic leading-relaxed text-slate-500">
                  &quot;Güven ve kalite üzerine inşa edilmiş bir gelecek
                  sunuyoruz.&quot;
                </p>
                <p className="max-w-sm text-sm leading-6 text-slate-400">
                  Geleneksel yapıların hantallığından uzak, modern yaşamın tüm
                  ihtiyaçlarını karşılayan bütünsel bir deneyim.
                </p>
              </div>
            </div>
          </div>

          {/* SAĞ TARAF: Merdiven Tipi (Staggered) Özellik Listesi */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-2">
              {features.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative pt-10  ${index % 2 !== 0 ? "md:mt-12" : ""}`}
                >
                  {/* Sayısal Gösterge ve İnce Çizgi */}
                  <div className="absolute top-0 left-0 flex items-center gap-4 w-full">
                    <span
                      className="text-4xl font-black opacity-10 group-hover:opacity-100 transition-all duration-500"
                      style={{ color: item.color }}
                    >
                      {item.id}
                    </span>
                    <div className="h-[1px] flex-grow bg-slate-100 group-hover:bg-slate-200 transition-all" />
                  </div>

                  {/* Soft Box İçerik */}
                  <div className="border-slate-200 shadow-md rounded-bl-[2.5rem] rounded-tr-[2.5rem] border border-slate-50 bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
                    <div
                      className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      CT Standartları
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dekoratif Yan Çizgiler (Technical Drawing Style) */}
      <div className="absolute right-0 top-0 h-full w-24 border-l border-slate-50 hidden xl:block" />
    </section>
  );
};
