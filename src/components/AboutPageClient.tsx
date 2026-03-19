import AboutHeroImage from "@/assets/hakkimizda-2.jpg";
import MissionImage from "@/assets/mission.webp";
import VisionImage from "@/assets/vizyon.webp";
import { ABOUT_FAQS } from "@/components/page-faq-content";
import { SeoFaqSection } from "@/components/seo-faq-section";
import { Stats } from "@/components/stats";
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Factory,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HIGHLIGHTS = [
  {
    title: "Planlı Süreç Yönetimi",
    text: "Keşiften projelendirmeye, üretimden montaja kadar tüm adımları tek akışta yönetiyoruz.",
    icon: ClipboardCheck,
  },
  {
    title: "Güvenilir Üretim Disiplini",
    text: "Prefabrik ev, çelik ev ve konteyner çözümlerinde teknik kaliteyi ve uygulama standardını önceliyoruz.",
    icon: Factory,
  },
  {
    title: "Türkiye Geneli Hizmet",
    text: "Sakarya çıkışlı güçlü saha planlamasıyla Türkiye'nin farklı bölgelerine teslim ve kurulum organizasyonu yapıyoruz.",
    icon: Truck,
  },
];

const PRINCIPLES = [
  {
    title: "Güvenilir Prefabrik Firma Yaklaşımı",
    text: "CT Prefabrik, kullanıcıyı sadece satış anında değil keşif, proje, teklif, üretim ve teslim aşamalarının tamamında doğru bilgilendirmeyi hedefler. Bu yaklaşım, güvenilir prefabrik firma arayan kullanıcılar için en kritik konulardan biridir.",
  },
  {
    title: "Prefabrik Ev Üreticisi Olarak Teknik Odak",
    text: "Prefabrik ev üreticisi olarak önceliğimiz; doğru taşıyıcı sistem, uygun malzeme, güçlü yalıtım çözümü ve kontrollü montaj kalitesidir. Bu sayede estetik ile teknik güvenliği aynı çizgide tutuyoruz.",
  },
  {
    title: "Sakarya'dan Türkiye'ye Ölçeklenebilir Çözümler",
    text: "Sakarya prefabrik ev taleplerinde daha yakın koordinasyon sunarken, Türkiye geneline de planlı sevkiyat ve uygulama akışı kuruyoruz. Yerel güç ile ulusal hizmet kabiliyetini birlikte taşıyoruz.",
  },
];

const PROCESS = [
  "İhtiyaç analizi ve arsa değerlendirmesi",
  "Modele uygun plan ve teklif hazırlanması",
  "Kontrollü üretim ve malzeme organizasyonu",
  "Sevkiyat, montaj ve teslim koordinasyonu",
];

export default function AboutPageClient() {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex justify-center pt-10 md:pt-12">
        <div className="w-full max-w-[1280px]">
          <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-lg border border-secondary/20 bg-secondary/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-secondary">
                <BadgeCheck className="h-4 w-4" />
                Hakkımızda
              </div>

              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                CT Prefabrik,
                <br />
                <span className="text-primary">
                  Güvenli ve Planlı Yapı Üretimi
                </span>
              </h1>

              <p className="mt-4 text-sm font-medium leading-7 text-slate-600 md:text-base">
                CT Prefabrik olarak <strong>prefabrik ev</strong>,{" "}
                <strong>çelik ev</strong>, <strong>dubleks prefabrik</strong>,{" "}
                <strong>prefabrik villa</strong> ve{" "}
                <strong>konteyner ev</strong> çözümlerinde keşiften montaja
                kadar tek merkezden ilerleyen bir yapı yönetimi kuruyoruz.
                Amacımız, kullanıcıya yalnızca bir yapı değil; net planlanan,
                doğru üretilen ve güvenle teslim edilen bir yaşam alanı sunmak.
              </p>

              <p className="mt-4 text-sm font-medium leading-7 text-slate-600 md:text-base">
                Sakarya merkezli operasyon gücümüzle Türkiye geneline hizmet
                verirken, her projede şeffaf teklif, kontrollü üretim ve teknik
                kalite dengesini korumaya odaklanıyoruz. Bu yaklaşım, bizi
                sadece üretici değil, aynı zamanda güvenilir bir çözüm ortağı
                haline getiriyor.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/prefabrik-evler"
                  prefetch={false}
                  className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-black text-white transition-colors hover:bg-primary/90"
                >
                  Modelleri İncele
                </Link>
                <Link
                  href="/iletisim"
                  prefetch={false}
                  className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Teklif Alın
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-[300px] overflow-hidden rounded-[1rem] border border-slate-300 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.18)] sm:row-span-2">
                <Image
                  src={AboutHeroImage}
                  alt="CT Prefabrik hakkında sayfasında prefabrik ev ve çelik ev üretim yaklaşımı"
                  fill
                  preload
                  fetchPriority="high"
                  loading="eager"
                  className="object-cover"
                  sizes="(min-width: 1024px) 32vw, 100vw"
                />
              </div>

              <div className="relative min-h-[142px] overflow-hidden rounded-[1rem] border border-slate-300 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.16)]">
                <Image
                  src={MissionImage}
                  alt="Anahtar teslim prefabrik ev ve çelik konstrüksiyon ev planlama süreci"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 18vw, 50vw"
                />
              </div>

              <div className="relative min-h-[142px] overflow-hidden rounded-[1rem] border border-slate-300 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.16)]">
                <Image
                  src={VisionImage}
                  alt="Prefabrik villa, dubleks prefabrik ev ve konteyner yapı çözümleri planlama görseli"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 18vw, 50vw"
                />
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[1rem] border border-slate-300 bg-[#f8f7f3] p-5 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.12)]"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-xl font-black tracking-tight text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="mt-12 rounded-[1rem] border border-slate-300 bg-[#f7f5ef] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="max-w-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
                  Biz Nasıl Çalışıyoruz
                </p>
                <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
                  Prefabrik Ev, Çelik Ev ve
                  <br />
                  <span className="text-primary">
                    Anahtar Teslim Yapılarda Net İş Modeli
                  </span>
                </h2>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-600 md:text-base">
                  Hakkımızda sayfasında yalnızca kurumsal bilgi vermeyi değil,
                  kullanıcıya gerçekten nasıl ilerlediğimizi göstermeyi
                  önemsiyoruz. Çünkü güvenilir prefabrik firma arayan bir kişi,
                  sadece “biz kimiz” değil, “süreç nasıl işliyor” sorusunun da
                  cevabını görmek ister.
                </p>
              </div>

              <div className="grid gap-3">
                {PROCESS.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-[0.9rem] border border-slate-300 bg-white p-4"
                  >
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm font-bold leading-6 text-slate-800 md:text-base">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 grid gap-5 lg:grid-cols-3">
            {PRINCIPLES.map((item) => (
              <article
                key={item.title}
                className="rounded-[1rem] border border-slate-300 bg-white p-6 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.12)]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-black leading-snug tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-12 rounded-[1rem] border border-slate-300 bg-white p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/8 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  SEO Odaklı Hakkımızda İçeriği
                </div>
                <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
                  Neden CT Prefabrik?
                </h2>
              </div>

              <div className="space-y-4 text-sm font-medium leading-7 text-slate-600 md:text-base">
                <p>
                  CT Prefabrik; <strong>prefabrik ev üreticisi</strong>,{" "}
                  <strong>çelik ev firması</strong> ve{" "}
                  <strong>anahtar teslim yapı çözüm ortağı</strong> arayan
                  kullanıcılar için planlı, okunur ve güven veren bir iş modeli
                  sunar. Tek katlı prefabrik ev, çift katlı prefabrik ev,
                  dubleks prefabrik, prefabrik villa ve konteyner ev alanlarında
                  farklı ihtiyaçlara cevap verebilecek ölçeklenebilir çözümler
                  geliştirir.
                </p>
                <p>
                  Üretim kalitesini yalnızca malzeme başlığında değil; teklif
                  netliği, teslim planı, saha koordinasyonu ve satış sonrası
                  yaklaşımda da korumaya çalışır. Bu yüzden kullanıcı için
                  önemli olan yalnızca fiyat değil,{" "}
                  <strong>güvenilir prefabrik firma</strong> ile çalışma
                  deneyimidir.
                </p>
                <p>
                  Özellikle <strong>Sakarya prefabrik ev</strong> aramalarında
                  yerel operasyon gücümüzle öne çıkarken, Türkiye geneline
                  hizmet verebilen kurumsal yapımız sayesinde farklı şehirlerde
                  de planlı teslim ve montaj akışı kurabiliyoruz.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12 pb-8">
            <Stats />
          </section>

          <section className="pb-16 pt-4">
            <SeoFaqSection
              title="Hakkımızda Sayfası İçin"
              accent="En Çok Aranan Sorular"
              description="CT Prefabrik hakkında, güvenilir prefabrik firma seçimi, prefabrik ev üreticisi yaklaşımı, Sakarya prefabrik ev hizmeti ve anahtar teslim yapı süreçleri gibi en çok aranan soruları burada topladık."
              items={ABOUT_FAQS}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
