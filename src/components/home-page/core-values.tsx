import { Hammer, Leaf, Users, Wrench } from "lucide-react";

export const CoreValues = () => {
  const values = [
    {
      title: "Yerinde Kurulum",
      desc: "Hızlı ve titiz montaj.",
      icon: <Hammer size={28} />,
      brandColor: "#152f51",
      lightBg: "bg-primary/5",
      borderColor: "group-hover:border-[#152f51]/30",
    },
    {
      title: "Deneyimli Ustalar",
      desc: "Uzman kadro, tam güven.",
      icon: <Users size={28} />,
      brandColor: "#d6a94a",
      lightBg: "bg-[#d6a94a]/10",
      borderColor: "group-hover:border-[#d6a94a]/40",
    },
    {
      title: "Kolay Bakım",
      desc: "Zahmetsiz ve uzun ömürlü.",
      icon: <Wrench size={28} />,
      brandColor: "#152f51",
      lightBg: "bg-primary/5",
      borderColor: "group-hover:border-[#152f51]/30",
    },
    {
      title: "Çevre Dostu",
      desc: "Doğaya saygılı üretim.",
      icon: <Leaf size={28} />,
      brandColor: "#d6a94a",
      lightBg: "bg-[#d6a94a]/10",
      borderColor: "group-hover:border-[#d6a94a]/40",
    },
  ];

  return (
    <section className="font-[family-name:var(--font-poppins)]  overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Minimalist Başlık */}
        <div className="mb-4 space-y-2 text-center lg:mb-12">
          <h2
            className="text-xl font-black tracking-tighter md:text-3xl"
            style={{ color: "#d6a94a" }}
          >
            PREFABRİK EVLERDE DEĞERLERİMİZ{" "}
            <span style={{ color: "#152f51" }}>& GÜCÜMÜZ</span>
          </h2>
          <div className="h-1 bg-slate-200 mx-auto rounded-full w-[60px]" />
        </div>

        {/* Yan Yana Soft Box Yapısı */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={i}
              className={` group relative bg-white border border-slate-200 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] transition-all duration-500 flex gap-4 lg:gap-0 lg:flex-col items-center lg:text-center ${v.borderColor}`}
            >
              {/* Arka Plan Glow (Sadece Hover'da Kendi Renginde) */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 rounded-[1.5rem] lg:rounded-[2.5rem]"
                style={{ backgroundColor: v.brandColor }}
              />

              {/* İkon Alanı */}
              <div
                className={`w-10 h-10 lg:w-16 lg:h-16 ${v.lightBg} rounded-[0.75rem] lg:rounded-[1.5rem] flex items-center justify-center lg:mb-5 transition-all duration-500 group-hover:scale-110 shadow-sm`}
                style={{ color: v.brandColor }}
              >
                {v.icon}
              </div>
              <div className="">
                {/* Yazı Alanı */}
                <h3 className="text-sm lg:text-base font-bold text-slate-900 mb-1.5 leading-tight">
                  {v.title}
                </h3>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {v.desc}
                </p>
              </div>

              {/* Kibar Alt Çizgi Detayı (Sadece Hover'da Kendi Renginde) */}
              <div
                className="w-0 h-1 mt-6 rounded-full transition-all duration-500 group-hover:w-10"
                style={{ backgroundColor: v.brandColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
