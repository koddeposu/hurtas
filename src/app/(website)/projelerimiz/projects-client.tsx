"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  CheckCircle2,
  Home,
  MapPin,
  Play,
  Ruler,
} from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Modal } from "@/components/ui/modal";
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

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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

      <section className="w-full bg-[#fdfdfd] mb-28">
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none  min-h-[90vh]" />
        <div
          className="absolute bottom-0 left-0 w-full h-full opacity-[0.02] pointer-events-none  min-h-[90vh]"
          style={{
            backgroundImage:
              "linear-gradient(#49202d 1px, transparent 1px), linear-gradient(90deg, #49202d 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </section>

      <section className="relative flex items-center w-full max-w-[1280px]">
        <div className="container relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-8 relative z-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">
                    30 GÜNDE ANAHTAR TESLİM
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  Sınırları Aşan <br />
                  <span className="text-secondary/90">Yapılar</span>
                </h1>
                <p className="mt-6 text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
                  Sadece bir ev değil, doğayla barışık, yüksek mühendislik
                  içeren ve estetiği merkeze alan modüler yaşamlar kuruyoruz.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => setModal(true)}
                  className="cursor-pointer px-8 py-4 bg-white text-slate-900 border border-slate-100 rounded-[1.5rem] font-bold text-sm flex items-center gap-3 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <div className="w-8 h-8 bg-secondary/15 rounded-full flex items-center justify-center">
                    <Play size={14} className="text-secondary fill-secondary" />
                  </div>
                  Canlı Önizleme
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                {[
                  "Deprem Dayanımlı",
                  "A++ Enerji Verimliliği",
                  "Özel Mimari Çizim",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-bold text-slate-400"
                  >
                    <CheckCircle size={14} className="text-secondary" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-6 relative h-[600px] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2 }}
                className="relative w-[85%] h-[80%] z-10"
              >
                <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-[12px] border-white">
                  <video
                    src="/proje-video.webm"
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#49202d]/40 to-transparent" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 left-0 bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white z-20 flex items-center gap-5"
              >
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Ruler size={28} />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">
                    Hassas Ölçüm
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Milimetrik Çelik Yapı
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-20 right-0 bg-white/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white z-20 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={24} />
                </div>
                <span className="font-bold text-slate-800 tracking-tight pr-4">
                  Depreme Dayanıklı
                </span>
              </motion.div>
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
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Don't render if no images
  if (project.img.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onProjectClick(index)}
      className="relative cursor-pointer group"
    >
      <Carousel
        setApi={setApi}
        className="w-full overflow-hidden rounded-[1rem] md:rounded-[2rem] border-white bg-white"
      >
        <CarouselContent>
          {project.img.map((item, imgIndex) => (
            <CarouselItem key={imgIndex} className="basis-full relative">
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot Göstergeleri */}
      {project.img.length > 1 && (
        <div className="absolute bottom-5 md:bottom-10 z-20 flex w-full justify-center gap-2">
          {project.img.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={(e) => {
                e.stopPropagation(); // Kartın click eventini tetiklemesin
                api?.scrollTo(dotIdx);
              }}
              className="p-1" // Tıklama alanını genişletmek için
            >
              <motion.div
                animate={{ width: current === dotIdx ? 22 : 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`h-2.5 rounded-full transition-colors ${
                  current === dotIdx ? "bg-secondary" : "bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Overlay Bilgileri */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#49202d]/60 via-[#49202d]/10 to-transparent p-4 flex flex-col justify-end pointer-events-none rounded-[1rem] md:rounded-[2rem]">
        <h3 className="text-white text-xl font-black mb-4">{project.title}</h3>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-1">
            <Ruler className="text-white/60" size={18} />
            <span className="text-white font-bold text-sm">{project.area}</span>
          </div>
          <div className="w-[1px] h-8 bg-white/20" />
          <div className="flex flex-col items-center gap-1">
            <Home className="text-white/60" size={18} />
            <span className="text-white font-bold text-sm">{project.room}</span>
          </div>
          <div className="w-[1px] h-8 bg-white/20" />
          <div className="flex flex-col items-center gap-1">
            <MapPin className="text-white/60" size={18} />
            <span className="text-white font-bold text-sm">{project.loc}</span>
          </div>
        </div>
      </div>
    </motion.div>
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
      setCurrent(0);
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
                        priority
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
