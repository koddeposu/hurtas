"use client";

import { PROJECTS_FAQS } from "@/components/page-faq-content";
import { SeoFaqSection } from "@/components/seo-faq-section";
import { BookOpenText, Building2, Images, Link2, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ImageType {
  src: string;
  alt: string;
}

interface Project {
  id: string;
  img: ImageType[];
  title: string;
  area: string;
  room: string;
  loc: string;
}

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center pt-10 lg:pt-14">
      <div className="max-w-[1280px] w-full ">
        <section className="pb-32">
          <div className="">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">
                  Henüz proje bulunmamaktadır.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="pb-24">
          <div className="mb-14 rounded-[1rem] border border-slate-300 bg-white p-6 shadow-[0_22px_48px_-38px_rgba(15,23,42,0.14)] md:p-8">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
                <Link2 className="h-4 w-4" />
                İlgili Sayfalar
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                Galeriyi İncelerken Ürün ve Blog Sayfalarına da Geçin
              </h2>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600 md:text-base">
                Ürün görselleri ile birlikte kategori sayfaları ve blog
                içeriklerini incelemek; doğru ürün, doğru adet ve teslim planını
                daha hızlı netleştirmenize yardımcı olur.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Beton Ürün Kategorileri",
                  description:
                    "Altyapı, üst yapı ve çevre düzenleme ürünlerini kategori bazında inceleyin.",
                  href: "/prefabrik-evler",
                  icon: Building2,
                },
                {
                  title: "Blog Rehberlerine Geçin",
                  description:
                    "Beton boru, parke taşı, bordür ve saha ürünleri hakkındaki içeriklere ulaşın.",
                  href: "/blog",
                  icon: BookOpenText,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[0.9rem] border border-slate-300 bg-[#f8f7f3] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-[0_18px_42px_-34px_rgba(15,23,42,0.16)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-black text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                      <Play className="mt-1 h-5 w-5 shrink-0 rotate-[-45deg] text-secondary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <SeoFaqSection
            title="Galeri Sayfası İçin"
            accent="En Çok Aranan Sorular"
            description="Beton elemanları, saha uygulamaları, ürün görselleri ve tedarik planlaması hakkında kullanıcıların en çok aradığı soruları bu bölümde topladık."
            items={PROJECTS_FAQS}
          />
        </section>
      </div>
    </main>
  );
}

const ProjectCard = ({ project }: { project: Project; index: number }) => {
  // Don't render if no images
  if (project.img.length === 0) return null;
  const coverImage = project.img[0];

  return (
    <div className="group relative cursor-pointer">
      <div className="relative overflow-hidden rounded-[3px] border border-slate-300 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:-translate-y-1 group-hover:border-slate-400 group-hover:shadow-[0_22px_46px_-28px_rgba(15,23,42,0.18)]">
        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/9]">
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="space-y-4 p-5 md:p-6">
          <h3 className="text-xl font-black text-slate-900 md:text-2xl">
            {project.title}
          </h3>

          {project.img.length > 1 ? (
            <div className="inline-flex items-center gap-2 rounded-xs border border-slate-300 bg-[#f8f7f3] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
              <Images className="h-3.5 w-3.5 text-secondary" />
              {project.img.length} Görsel
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

interface ProjectGalleryModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}
