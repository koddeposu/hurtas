import { RandomProductsSliderSection } from "@/components/random-products-slider-section";
import { Building2, CheckCircle2, Factory, Handshake } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çalıştığımız Markalar | Hürtaş Beton",
  description:
    "Hürtaş Beton'un beton elemanları tedarikinde çalıştığı sektörler, proje tipleri ve iş ortaklığı yaklaşımı hakkında bilgi alın.",
  alternates: {
    canonical: "https://www.hurtasbeton.com/calistigimiz-markalar",
  },
};

const PARTNER_GROUPS = [
  {
    title: "Belediye ve Kamu Projeleri",
    text: "Altyapı, yol ve çevre düzenleme işleri için beton elemanı tedarik süreçlerinde düzenli planlama sağlıyoruz.",
    icon: Building2,
  },
  {
    title: "Şantiye ve Müteahhit Ekipleri",
    text: "Saha programına uygun beton boru, bordür, parke taşı ve tamamlayıcı ürün sevkiyatı planlıyoruz.",
    icon: Factory,
  },
  {
    title: "Peyzaj ve Çevre Düzenleme",
    text: "Kaldırım, bahçe, saha ve yol düzenleme işlerinde ihtiyaç duyulan beton ürünleri için çözüm sunuyoruz.",
    icon: Handshake,
  },
];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="border-y border-slate-200 bg-[#f6f8fb] px-4 py-6 sm:px-5 lg:px-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#d6a94a]" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
              İş Birlikleri
            </span>
          </div>
          <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-tight text-[#152f51] sm:text-3xl">
            Farklı ölçeklerdeki projeler için beton elemanı tedariki.
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600">
            Hürtaş Beton, marka ve kurum iş birliklerinde ürün standardı,
            zamanında teslim ve açık iletişim başlıklarını önceliklendirir.
          </p>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {PARTNER_GROUPS.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="border border-slate-200 bg-white p-5 shadow-[0_16px_34px_-30px_rgba(15,23,42,0.18)]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] bg-[#152f51] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                  {item.text}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mt-8 border border-slate-200 bg-[#0d1f36] p-5 text-white sm:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {["Standart ürün seçimi", "Planlı sevkiyat", "Takip edilebilir iletişim"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#d6a94a]" />
                  <span className="text-sm font-black uppercase tracking-[0.12em]">
                    {item}
                  </span>
                </div>
              ),
            )}
          </div>
        </section>

        <RandomProductsSliderSection />
      </div>
    </main>
  );
}
