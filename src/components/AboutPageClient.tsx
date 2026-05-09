import AboutImage from "@/assets/hakkimizda-3.webp";
import { SiteDroneVideo } from "@/components/home-page/site-drone-video";
import Image from "next/image";

const ABOUT_PARAGRAPHS = [
  "Firmamızın temeli 1986 yılında İstanbul'da Nebioğlu İnşaat olarak başladı ve beton boru sektöründe 1996 yılına kadar en iyi hizmeti vermeye çalışırken aynı zamanda sektöre tecrübeli personeller kazandırdı.",
  "1996 yılından sonra Hürtaş İnşaat adıyla revize edilip müşterilerine daha teknolojik makinalarla üretilen ürünleri sunmaya başlamıştır ve müşteri portföyünü büyütmüştür.",
  "Yöneticileri, personelleri ve çalışanlarıyla kalitede ve müşteri memnuniyetinde sınır tanımamayı benimseyen anlayışıyla daima ilerlemekte ve hızla büyümektedir.",
  "Altyapı grubunun yanı sıra çevre düzenleme ürünlerini de büyük titizlikle ve kalitede üreten firmamız müşterilerinin istek ve önerilerini dikkate almış, dostluk sağlamış ve devamlılığını başarmıştır.",
];

const MISSION_TEXT =
  "Firma olarak misyonumuz, İstanbul'da alt yapı ve üst yapı projelerine yüksek kaliteli ve yenilikçi çözümler sunmaktır. Müşterilerimize güvenilir, dayanıklı ve çevre dostu beton ürünlerini temin ederek, projelerinde başarıya ulaşmalarına yardımcı olmayı hedefliyoruz. Müşteri memnuniyetini ön planda tutarak, kaliteli ürünlerimizle sektörde öncü olmak ve uzun vadeli iş ilişkileri kurmak istiyoruz.";

const VISION_TEXT =
  "Firma olarak vizyonumuz, İstanbul'un altyapı ve üst yapı projelerinde lider bir konuma ulaşmaktır. Sektördeki gelişmeleri yakından takip ederek, yenilikçi ürünler ve çözümler sunarak müşterilerimizin beklentilerini aşmayı hedefliyoruz. Kaliteli ürünlerimiz, profesyonel ekip ve sürekli iyileştirme yaklaşımımızla, projelerimizin sürdürülebilirliğini ve topluma katkı sağlamayı amaçlıyoruz. Ayrıca, çevreye duyarlılığımızı koruyarak, sürdürülebilir bir gelecek için çevresel etkileri minimize etmek ve doğal kaynakları korumak için çalışıyoruz.";

const PRODUCT_TEXT =
  "Hürtaş beton elemanları olarak beton ve betonarme boru, muayene baca gövde ve taban elemanları, parsel baca gövde ve taban elemanları, beton baca ve bilezikleri, künk, büz, rögar elemanları, bordür ve parke taşları, şev taşı, flora taşı, terra blok, beton bariyer, oluk taşları, çim taşları ve briketler vb. ürünleri yüksek kalite standartlarına uygun bir şekilde üretip siz değerli müşterilerimize sunmaktayız.";

const STATS = [
  { value: "1986", label: "Kuruluş" },
  { value: "40+", label: "Yıllık Tecrübe" },
  { value: "100+", label: "Ürün Çeşidi" },
];

const REFERENCES = [
  "Belediye ve kamu projeleri",
  "Şantiye ve müteahhit ekipleri",
  "Peyzaj ve çevre düzenleme işleri",
];

const BRAND_SLOTS = [
  "Marka Logosu",
  "Marka Logosu",
  "Marka Logosu",
  "Marka Logosu",
  "Marka Logosu",
  "Marka Logosu",
];

export default function AboutPageClient() {
  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase text-[#d6a94a]">
                Hürtaş Beton Elemanları
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-[#152f51] sm:text-4xl">
                Hakkımızda
              </h1>
              <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-slate-600">
                1986 yılından bu yana beton elemanları üretiminde kalite, güven
                ve müşteri memnuniyeti odaklı çalışıyoruz.
              </p>
            </div>

            <div className="relative min-h-[260px] overflow-hidden border border-slate-200 bg-slate-100">
              <Image
                src={AboutImage}
                alt="Hürtaş Beton üretim alanı"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <section className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
            <div>
              <h2 className="text-2xl font-black text-[#152f51]">Firmamız</h2>
              <div className="mt-4 h-1 w-16 bg-[#d6a94a]" />
            </div>

            <div className="space-y-4">
              {ABOUT_PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm font-medium leading-7 text-slate-600 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="border border-slate-200 p-6">
              <h2 className="text-xl font-black text-[#152f51]">Misyonumuz</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                {MISSION_TEXT}
              </p>
            </article>

            <article className="border border-slate-200 p-6">
              <h2 className="text-xl font-black text-[#152f51]">Vizyonumuz</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                {VISION_TEXT}
              </p>
            </article>
          </section>

          <section className="mt-12 border-y border-slate-200 bg-[#f8fafc] px-5 py-8 sm:px-7">
            <h2 className="text-2xl font-black text-[#152f51]">
              Üretimini Yaptığımız Ürünler
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">
              {PRODUCT_TEXT}
            </p>
          </section>
        </div>
      </section>

      <SiteDroneVideo />

      <section className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <section className="border border-slate-200 p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase text-[#d6a94a]">
                  Tecrübe
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#152f51] sm:text-3xl">
                  40+ yıllık tecrübe ile üretim ve tedarik.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {STATS.map((item) => (
                  <div key={item.label} className="border border-slate-200 p-4">
                    <p className="text-3xl font-black text-[#152f51]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-xs font-bold uppercase text-slate-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 overflow-hidden border-t border-slate-200 pt-8">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-[#152f51]">
                Çalıştığımız Markalar
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Logo görselleri hazır olduğunda bu alana eklenecek.
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="flex w-max animate-marquee gap-4">
                {[...BRAND_SLOTS, ...BRAND_SLOTS].map((slot, index) => (
                  <div
                    key={`${slot}-${index}`}
                    className="flex h-20 w-44 shrink-0 items-center justify-center border border-slate-200 bg-[#f8fafc] text-sm font-black text-slate-400"
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
