import ArgeImage1 from "@/assets/arge/1.jpg";
import ArgeImage2 from "@/assets/arge/2.jpg";
import ArgeImage3 from "@/assets/arge/3.jpg";
import ArgeImage4 from "@/assets/arge/4.jpg";
import { RandomProductsSliderSection } from "@/components/random-products-slider-section";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arge | Hürtaş Beton",
  description:
    "Hürtaş Beton'un beton elemanlarında üretim geliştirme, kalite kontrol ve saha ihtiyaçlarına uygun çözüm yaklaşımı hakkında bilgi alın.",
  alternates: {
    canonical: "https://www.hurtasbeton.com/arge",
  },
};

const ARGE_IMAGES = [
  {
    src: ArgeImage1,
    alt: "Hürtaş Beton arge ve laboratuvar çalışması",
  },
  {
    src: ArgeImage2,
    alt: "Hürtaş Beton beton elemanı kalite kontrol süreci",
  },
  {
    src: ArgeImage3,
    alt: "Hürtaş Beton üretim geliştirme çalışması",
  },
  {
    src: ArgeImage4,
    alt: "Hürtaş Beton altyapı ürünleri arge kontrolü",
  },
];

const FOCUS_AREAS = [
  "Yüksek mukavemetli, uzun ömürlü beton formülleri",
  "Su sızdırmazlığı yüksek kanalizasyon ve altyapı ürünleri",
  "Çevre dostu üretim süreçleri ve geri dönüştürülebilir malzeme kullanımı",
  "Montaj kolaylığı sağlayan tasarım optimizasyonları",
  "Yeni nesil beton boru, muayene baca grubu, şev taşı, parke ve bariyer sistemleri",
];

export default function ArgePage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="border-y border-slate-200 bg-[#f6f8fb] px-4 py-6 sm:px-5 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#d6a94a]" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
              Araştırma ve Geliştirme
            </span>
          </div>
          <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-tight text-[#152f51] sm:text-3xl">
            Beton elemanlarında daha güçlü üretim ve daha net saha çözümleri.
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600">
            Arge yaklaşımımız; ürün kalitesini, üretim sürekliliğini ve
            projelerin sahadaki ihtiyaçlarına uygun tedarik planını geliştirmeye
            odaklanır.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {ARGE_IMAGES.map((image, index) => (
            <div
              key={image.alt}
              className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-slate-100"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </section>

        <section className="mt-8 border-y border-slate-200 bg-white py-8 lg:grid lg:grid-cols-[0.7fr_1.3fr] lg:gap-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
              Arge Yaklaşımımız
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#152f51]">
              Sahadan gelen ihtiyaçları mühendislik verileriyle geliştiriyoruz.
            </h2>
          </div>
          <div className="mt-5 space-y-5 text-sm font-medium leading-7 text-slate-600 lg:mt-0">
            <p>
              HÜRTAŞ BETON sektördeki güçlü konumunu sadece kaliteli üretimle
              değil aynı zamanda araştırma ve geliştirmeye verdiği önemle de
              pekiştiriyor.
            </p>
            <p>
              Sahadan gelen ihtiyaçları, mühendislik verilerini ve teknolojik
              gelişmeleri dikkate alarak beton elemanlarının her aşamasında
              inovatif çözümler geliştiriyoruz.
            </p>
            <p>Geliştirme çalışmalarımızda özellikle şu alanlara odaklanıyoruz.</p>

            <ul className="space-y-3">
              {FOCUS_AREAS.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#152f51]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p>
              Arge merkezimizde gerçekleştirilen laboratuvar testleriyle her
              ürünümüzün kalite performansı, ulusal ve uluslararası standartlara
              uygunluğu titizlikle denetlenmektedir. Bu yaklaşımımız hem kamu hem
              özel sektör projelerinde tercih edilmemizi sağlayan temel
              unsurlardan biridir.
            </p>
          </div>
        </section>

        <section className="mt-8 border border-slate-200 bg-[#0d1f36] p-5 text-white sm:p-6 lg:flex lg:items-center lg:justify-between lg:gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
              Proje Desteği
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Projenize uygun ürün çözümü için bizimle görüşün.
            </h2>
          </div>
          <Link
            href="/iletisim"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-[2px] bg-[#d6a94a] px-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#152f51] transition-colors hover:bg-[#bf943b] lg:mt-0"
          >
            İletişime Geç
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        <RandomProductsSliderSection />
      </div>
    </main>
  );
}
