"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Modal } from "./ui/modal";

export interface ProjectImage {
  id: string | number;
  img: any;
  title?: string;
}

interface ProjectGalleryModalProps {
  projects: ProjectImage[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ProjectGalleryModal({
  projects,
  isOpen,
  onClose,
  initialIndex = 0,
}: ProjectGalleryModalProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(initialIndex);

  // --- KRİTİK EKSİK BURASI: CAROUSEL HAREKETİNİ DİNLE ---
  useEffect(() => {
    if (!api) return;

    // Carousel her değiştiğinde (kaydığında) çalışacak fonksiyon
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // 'select' olayına abone ol
    api.on("select", onSelect);

    // İlk açılışta mevcut durumu eşitle
    onSelect();

    // Temizlik: Bileşen kapanınca dinleyiciyi kaldır
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  // ---------------------------------------------------

  useEffect(() => {
    if (!api || !isOpen) return;

    const timer = setTimeout(() => {
      api.scrollTo(initialIndex, true); // true: animasyonsuz hızlı git
      setCurrent(initialIndex);
    }, 50);

    return () => clearTimeout(timer);
  }, [api, initialIndex, isOpen]);

  return (
    <Modal isShow={isOpen} onClose={onClose}>
      <div className="h-screen flex items-center justify-center p-5">
        <div className="max-w-[1000px] w-full">
          {/* MAIN SLIDER */}
          <div className="relative">
            <Carousel
              setApi={setApi}
              className="w-full overflow-hidden rounded-[1rem] md:rounded-[2rem]
              shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]
              border-2 md:border-[8px] border-white"
            >
              <CarouselContent>
                {projects.map((project) => (
                  <CarouselItem key={project.id} className="basis-full">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={project.img}
                        alt={project.title ?? ""}
                        fill
                        className="object-cover"
                        // Görselin kalitesini artırmak ve yüklemeyi zorlamak için:
                        sizes="(max-width: 1000px) 100vw, 1000px"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* DOTS */}
            {projects.length > 1 && (
              <div className="absolute bottom-5 md:bottom-10 z-20 flex w-full justify-center gap-2">
                {projects.map((_, index) => (
                  <motion.div
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    animate={{ width: current === index ? 22 : 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`h-2.5 rounded-full cursor-pointer transition-colors ${
                      current === index ? "bg-secondary" : "bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          {projects.length > 1 && (
            <div className="relative flex items-center flex-wrap gap-3 mt-4 justify-center">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => {
                    api?.scrollTo(index);
                    // Burada setCurrent(index) demenize artık gerek yok,
                    // yukarıdaki api.on('select') bu işi otomatik yapıyor.
                  }}
                  className={`border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                    current === index
                      ? "border-secondary scale-110 shadow-lg"
                      : "border-white opacity-40 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={project.img}
                      alt={project.title ?? ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
