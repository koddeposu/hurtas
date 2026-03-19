import StoryImage1 from "@/assets/hero/home-page-1.webp";
import StoryImage2 from "@/assets/hero/home-page-3.webp";
import StoryImage3 from "@/assets/hero/home-page-5.webp";
import { ClipboardPenLine, MapPinned, WalletCards } from "lucide-react";
import Image from "next/image";

const FEATURES = [
  {
    title: "Size Özel Planlama",
    description:
      "Tek katlı, dubleks ve çelik ev çözümlerini arsa, metrekare ve kullanım amacınıza göre birlikte şekillendiriyoruz.",
    icon: ClipboardPenLine,
  },
  {
    title: "Sakarya Çıkışlı Süreç Yönetimi",
    description:
      "Keşif, üretim ve montaj akışını planlı ilerleterek Türkiye geneline uygun uygulama koordinasyonu kuruyoruz.",
    icon: MapPinned,
  },
  {
    title: "Şeffaf Teklif ve Uygulama",
    description:
      "Fiyat, malzeme kapsamı, teslim planı ve uygulama başlıklarını netleştirerek süreci okunur hale getiriyoruz.",
    icon: WalletCards,
  },
];

export function BrandStory() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#f3f1eb]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(22,91,57,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(73,32,45,0.08),transparent_24%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-9 md:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              Sakarya Prefabrik Ev Üreticisi
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
              Size Uygun Prefabrik ve
              <br />
              <span className="text-secondary">Çelik Ev Çözümlerini</span>
              <br />
              Net Bir Süreçle Planlıyoruz
            </h2>

            <p className="mt-4 max-w-lg text-sm font-medium leading-7 text-slate-700">
              CT Prefabrik olarak <strong>tek katlı prefabrik ev</strong>,{" "}
              <strong>çift katlı prefabrik ev</strong> ve{" "}
              <strong>çelik ev modelleri</strong> için ihtiyaca uygun
              projelendirme yapıyoruz. Keşiften montaja kadar tüm süreci tek
              merkezden yöneterek daha güvenilir, daha hızlı ve daha şeffaf bir
              uygulama akışı kuruyoruz.
            </p>

            <div className="mt-6 space-y-4">
              {FEATURES.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-[0.9rem] border border-slate-300 bg-white/88 p-4 shadow-[0_16px_38px_-34px_rgba(15,23,42,0.28)]"
                  >
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 md:text-[15px]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            <div className="relative hidden min-h-[260px] overflow-hidden  border border-slate-300/80 shadow-[0_22px_58px_-38px_rgba(15,23,42,0.24)] lg:block">
              <Image
                src={StoryImage2}
                alt="Tek katlı ve çift katlı prefabrik ev planlama"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 28vw, 100vw"
              />
            </div>

            <div className="grid gap-4 lg:gap-10">
              <div className="relative min-h-[200px] overflow-hidden border border-slate-300/80 shadow-[0_22px_58px_-38px_rgba(15,23,42,0.24)]">
                <Image
                  src={StoryImage1}
                  alt="Prefabrik ev modelleri"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 22vw, 100vw"
                />
              </div>

              <div className="relative min-h-[200px] overflow-hidden  border border-slate-300/80 shadow-[0_22px_58px_-38px_rgba(15,23,42,0.24)]">
                <Image
                  src={StoryImage3}
                  alt="Çelik ev ve dubleks prefabrik ev çözümleri"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 22vw, 100vw"
                />
              </div>
            </div>

            <div className="relative col-span-2 min-h-[180px] overflow-hidden border border-slate-300/80 shadow-[0_22px_58px_-38px_rgba(15,23,42,0.24)] lg:hidden">
              <Image
                src={StoryImage2}
                alt="Sakarya prefabrik ev üretimi"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
