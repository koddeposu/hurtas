"use client";

import { PROJECTS_FAQS } from "@/components/page-faq-content";
import { SeoFaqSection } from "@/components/seo-faq-section";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Modal } from "@/components/ui/modal";
import {
  CheckCircle,
  CheckCircle2,
  Images,
  Home,
  MapPin,
  Play,
  Ruler,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [modal, setModal] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);
  const selectedProject =
    selectedProjectIndex !== null ? projects[selectedProjectIndex] : null;
  const heroImage = projects[0]?.img[0];

  return (
    <main className="bg-white min-h-screen flex items-center justify-center flex-col w-full">
      <Modal isShow={modal} onClose={() => setModal(false)}>
        <div className="h-screen flex items-center justify-center p-5">
          <div className="max-h-[600px] max-w-[600px] w-full h-full bg-transparent rounded-xl overflow-hidden">
            <iframe
              title="Prefabrik Ev 3D"
              src="https://sketchfab.com/models/489302e595ce444ab5f696e2db29b763/embed?autospin=1&ui_theme=dark"
              className="w-full h-full bg-transparent"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>
        </div>
      </Modal>

      {selectedProject && (
        <ProjectGalleryModal
          project={selectedProject}
          isOpen={selectedProjectIndex !== null}
          onClose={() => setSelectedProjectIndex(null)}
        />
      )}

      <section className="relative mb-12 w-full overflow-hidden bg-[#f8f7f3]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(#49202d_1px,transparent_1px),linear-gradient(90deg,#49202d_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="mx-auto flex w-full max-w-[1280px] items-center px-4 py-10 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-14 lg:px-8 lg:py-14">
          <div className="relative z-10 space-y-7 lg:col-span-6">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
                  <span className="inline-flex h-2 w-2 rounded-full bg-secondary" />
                  <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">
                    30 GÜNDE ANAHTAR TESLİM
                  </span>
                </div>

                <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
                  Sınırları Aşan <br />
                  <span className="text-secondary/90">Yapılar</span>
                </h1>
                <p className="mt-5 max-w-xl text-base font-medium leading-8 text-slate-500 md:text-lg">
                  Sadece bir ev değil, doğayla barışık, yüksek mühendislik
                  içeren ve estetiği merkeze alan modüler yaşamlar kuruyoruz.
                </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModal(true)}
                className="cursor-pointer rounded-[1.5rem] border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/15">
                    <Play size={14} className="fill-secondary text-secondary" />
                  </span>
                  Canlı Önizleme
                </span>
              </button>
            </div>

            <div className="flex flex-wrap gap-5 pt-1">
              {[
                "Deprem Dayanımlı",
                "A++ Enerji Verimliliği",
                "Özel Mimari Çizim",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-bold text-slate-500"
                >
                  <CheckCircle size={14} className="text-secondary" />
                  {item}
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: `${projects.length}+`, label: "Tamamlanan Proje" },
                { value: "Türkiye", label: "Geneli Hizmet" },
                { value: "Tek Ekip", label: "Keşif ve Montaj" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.12)]"
                >
                  <div className="text-lg font-black tracking-tight text-slate-900">
                    {item.value}
                  </div>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 lg:col-span-6 lg:mt-0">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.22)]">
              <div className="relative aspect-[16/11] w-full">
                {heroImage ? (
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    preload
                    fetchPriority="high"
                    loading="eager"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#f1ede4] via-white to-[#eef6f1]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#49202d]/45 via-[#49202d]/10 to-transparent" />
              </div>

              <div className="grid gap-3 border-t border-slate-200 bg-white p-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-[1.25rem] border border-slate-200 bg-[#f8f7f3] px-4 py-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                    <Ruler size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black tracking-tight text-slate-900">
                      Hassas Ölçüm
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Milimetrik proje disiplini
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-[1.25rem] border border-slate-200 bg-[#f8f7f3] px-4 py-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black tracking-tight text-slate-900">
                      Güvenli Uygulama
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Depreme dayanıklı çözümler
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] w-full mt-20">
        <section className="pb-32">
          <div className="">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onProjectClick={(idx) => setSelectedProjectIndex(idx)}
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
          <SeoFaqSection
            title="Projelerimiz Sayfası İçin"
            accent="En Çok Aranan Sorular"
            description="Prefabrik ev projeleri, çelik ev referansları, dubleks prefabrik uygulamalar ve tamamlanan yaşam alanları hakkında kullanıcıların en çok aradığı soruları bu bölümde topladık."
            items={PROJECTS_FAQS}
          />
        </section>
      </div>
    </main>
  );
}

const ProjectCard = ({
  project,
  index,
  onProjectClick,
}: {
  project: Project;
  index: number;
  onProjectClick: (idx: number) => void;
}) => {
  // Don't render if no images
  if (project.img.length === 0) return null;
  const coverImage = project.img[0];

  return (
    <div
      onClick={() => onProjectClick(index)}
      className="group relative cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-[1rem] border border-slate-200 bg-white shadow-[0_20px_44px_-34px_rgba(15,23,42,0.16)] transition-all duration-200 group-hover:-translate-y-1 group-hover:border-slate-200 group-hover:shadow-[0_24px_52px_-34px_rgba(15,23,42,0.22)] md:rounded-[2rem]">
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
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-black text-slate-900 md:text-2xl">
              {project.title}
            </h3>
            {project.img.length > 1 ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#f8f7f3] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
                <Images className="h-3.5 w-3.5 text-secondary" />
                {project.img.length} Görsel
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <Ruler className="text-secondary" size={16} />
              <span>{project.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="text-secondary" size={16} />
              <span>{project.room}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-secondary" size={16} />
              <span>{project.loc}</span>
            </div>
          </div>
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

function ProjectGalleryModal({
  project,
  isOpen,
  onClose,
}: ProjectGalleryModalProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  // Resim değiştiğinde index'i güncelle
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Modal her açıldığında ilk resme dön
  useEffect(() => {
    if (isOpen && api) {
      api.scrollTo(0, true);
    }
  }, [isOpen, api]);

  return (
    <Modal isShow={isOpen} onClose={onClose}>
      <div className="h-screen flex items-center justify-center p-5">
        <div className="max-w-[1000px] w-full">
          {/* ANA SLIDER - Seçili projenin resimlerini döner */}
          <div className="relative">
            <Carousel
              setApi={setApi}
              className="w-full overflow-hidden rounded-[1rem] md:rounded-[2rem] border-white border-4 md:border-[8px] bg-white shadow-2xl"
            >
              <CarouselContent>
                {project.img.map((image, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* FOTOĞRAF SAYACI (Örn: 1/3) */}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold">
              {current + 1} / {project.img.length}
            </div>
          </div>

          {/* KÜÇÜK RESİMLER (THUMBNAILS) */}
          {project.img.length > 1 && (
            <div className="relative flex items-center flex-wrap gap-3 mt-4 justify-center">
              {project.img.map((image, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                    current === index
                      ? "border-secondary scale-110 shadow-lg"
                      : "border-white/50 opacity-40 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* BAŞLIK BİLGİSİ */}
          <div className="text-center mt-6">
            <h2 className="text-2xl font-black text-white drop-shadow-md">
              {project.title}
            </h2>
            <p className="text-white/80 font-medium">
              {project.loc} - {project.area}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
