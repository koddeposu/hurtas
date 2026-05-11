"use client";

import { ArrowUpRight, BookOpen, Download, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import img1 from "@/assets/katalog/1.jpg";
import img10 from "@/assets/katalog/10.jpg";
import img11 from "@/assets/katalog/11.jpg";
import img12 from "@/assets/katalog/12.jpg";
import img13 from "@/assets/katalog/13.jpg";
import img14 from "@/assets/katalog/14.jpg";
import img15 from "@/assets/katalog/15.jpg";
import img16 from "@/assets/katalog/16.jpg";
import img17 from "@/assets/katalog/17.jpg";
import img18 from "@/assets/katalog/18.jpg";
import img19 from "@/assets/katalog/19.jpg";
import img2 from "@/assets/katalog/2.jpg";
import img20 from "@/assets/katalog/20.jpg";
import img21 from "@/assets/katalog/21.jpg";
import img22 from "@/assets/katalog/22.jpg";
import img23 from "@/assets/katalog/23.jpg";
import img24 from "@/assets/katalog/24.jpg";
import img25 from "@/assets/katalog/25.jpg";
import img26 from "@/assets/katalog/26.jpg";
import img27 from "@/assets/katalog/27.jpg";
import img28 from "@/assets/katalog/28.jpg";
import img29 from "@/assets/katalog/29.jpg";
import img3 from "@/assets/katalog/3.jpg";
import img30 from "@/assets/katalog/30.jpg";
import img31 from "@/assets/katalog/31.jpg";
import img32 from "@/assets/katalog/32.jpg";
import img4 from "@/assets/katalog/4.jpg";
import img5 from "@/assets/katalog/5.jpg";
import img6 from "@/assets/katalog/6.jpg";
import img7 from "@/assets/katalog/7.jpg";
import img8 from "@/assets/katalog/8.jpg";
import img9 from "@/assets/katalog/9.jpg";

const CATALOG_IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
].map((src, i) => ({
  index: i + 1,
  src,
  alt: `Hürtaş Beton Elemanları Katalog Sayfa ${i + 1}`,
}));

const PDF_PATH = "/hurtas-beton-elemanlari-katalog.pdf";

export default function KatalogPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero / Download Banner ── */}
      <section className="relative overflow-hidden bg-primary -mx-5">
        {/* Decorative accent bar */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-1 w-full bg-[#d6a94a]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Eyebrow */}
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-[#d6a94a]" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#6f9ac0]">
              Ürün Kataloğu
            </span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center justify-center rounded-[2px] border border-[#d6a94a]/30 bg-[#d6a94a]/10 p-2">
                  <BookOpen
                    className="h-4 w-4 text-[#d6a94a]"
                    strokeWidth={1.6}
                  />
                </div>
                <div className="flex gap-2">
                  {[
                    { value: "32", label: "Sayfa" },
                    { value: "PDF", label: "Format" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[2px] border border-white/10 bg-white/5 px-2.5 py-1.5 flex items-center gap-1.5"
                    >
                      <span className="text-xs font-black text-[#d6a94a]">
                        {stat.value}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
                <span className="text-[#d6a94a]">Hürtaş</span> Beton Elemanları{" "}
                <span className="text-slate-300">Kataloğu</span>
              </h1>

              <p className="mt-2 max-w-lg text-xs font-medium leading-5 text-slate-400">
                Tüm beton eleman ürünlerimizi, teknik özelliklerini ve uygulama
                alanlarını içeren kapsamlı kataloğumuzu inceleyin veya indirin.
              </p>
            </div>

            {/* Download CTA */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={PDF_PATH}
                download="Hurtas-Beton-Elemanlari-Katalog.pdf"
                className="group inline-flex items-center gap-2 rounded-[2px] bg-[#d6a94a] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#152f51] shadow-[0_8px_32px_-8px_rgba(214,169,74,0.5)] transition-all hover:bg-[#bf943b] active:scale-[0.98]"
              >
                <Download
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                  strokeWidth={2.2}
                />
                Kataloğu İndir
                <span className="ml-1 rounded-sm bg-[#152f51]/15 px-1.5 py-0.5 text-[9px] tracking-widest">
                  PDF
                </span>
              </a>

              <a
                href={PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[2px] border border-white/20 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
              >
                <FileText className="h-3.5 w-3.5" strokeWidth={1.8} />
                Tarayıcıda Aç
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Catalog Pages Grid ── */}
      <section className="mx-auto max-w-[600px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* Section header */}
        <div className="mb-8 border-y border-slate-200 bg-white px-5 py-4 lg:mb-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-[#d6a94a]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6f839d]">
                Katalog Sayfaları
              </span>
            </div>
            <span className="inline-flex h-9 items-center rounded-[2px] border border-slate-200 px-3 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">
              32 Sayfa
            </span>
          </div>
        </div>

        {/* Single-column page-by-page view */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {CATALOG_IMAGES.map(({ index, src, alt }) => (
            <div
              key={index}
              className="group relative rounded-[2px] border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Page number badge */}
              <div className="absolute left-3 top-3 z-10 flex h-7 items-center rounded-[2px] bg-[#152f51] px-2.5">
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#d6a94a]">
                  {index}
                </span>
              </div>

              <Image
                src={src}
                alt={alt}
                width={1240}
                height={877}
                className="w-full h-auto block"
                loading={index <= 3 ? "eager" : "lazy"}
                quality={85}
                style={{ maxHeight: "none" }}
              />
            </div>
          ))}
        </div>

        {/* Bottom download CTA */}
        <div className="mt-12 border-y border-slate-200 bg-[#152f51] px-6 py-8 text-center sm:py-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d6a94a]">
            Tüm Ürünleri Keşfedin
          </p>
          <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
            Kataloğu Bilgisayarınıza İndirin
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-400">
            Tüm ürün detaylarına çevrimdışı da ulaşın.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PDF_PATH}
              download="Hurtas-Beton-Elemanlari-Katalog.pdf"
              className="group inline-flex items-center gap-2.5 rounded-[2px] bg-[#d6a94a] px-6 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#152f51] transition-all hover:bg-[#bf943b] active:scale-[0.98]"
            >
              <Download className="h-4 w-4" strokeWidth={2.2} />
              PDF İndir
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[2px] border border-white/20 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
            >
              Ürünleri İncele
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
