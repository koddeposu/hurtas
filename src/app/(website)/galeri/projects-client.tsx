"use client";

import { PROJECTS_FAQS } from "@/components/page-faq-content";
import {
  useDictionary,
  useLocalizedPath,
} from "@/components/i18n-provider";
import { SeoFaqSection } from "@/components/seo-faq-section";
import { ALL_PRODUCTS_PATH } from "@/lib/productRoutes";
import {
  ArrowUpRight,
  Building2,
  Images,
  PhoneCall,
  Ruler,
  Search,
  ShieldCheck,
  Waves,
} from "lucide-react";
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
}

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();

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
                  {dict.gallery.empty}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="pb-24">
          <div className="mb-14 overflow-hidden rounded-[3px] border border-slate-300 bg-[#f8f7f3] shadow-[0_22px_48px_-38px_rgba(15,23,42,0.18)]">
            <div className="grid lg:grid-cols-[1.02fr_1fr]">
              <div className="bg-primary p-6 text-white md:p-8 lg:p-10">
                <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
                  <Search className="h-4 w-4" />
                  {dict.gallery.visualToProduct}
                </p>
                <h2 className="mt-4 max-w-2xl text-2xl font-black tracking-tight md:text-3xl">
                  {dict.gallery.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-200 md:text-base">
                  {dict.gallery.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={localizedPath(ALL_PRODUCTS_PATH)}
                    className="inline-flex items-center gap-2 rounded-[2px] bg-secondary px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-primary transition-all hover:-translate-y-0.5 hover:bg-secondary/90"
                  >
                    {dict.common.viewProducts}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={localizedPath("/iletisim")}
                    prefetch={false}
                    className="inline-flex items-center gap-2 rounded-[2px] border border-white/25 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
                  >
                    <PhoneCall className="h-4 w-4" />
                    {dict.gallery.quote}
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-2">
                {[Waves, Building2, Ruler, ShieldCheck].map((Icon, index) => {
                  const item = dict.gallery.groups[index] ?? dict.gallery.groups[0];

                  return (
                    <div
                      key={item.title}
                      className={`border-slate-300 p-5 md:p-6 ${
                        index > 0 ? "border-t sm:border-t-0" : ""
                      } ${index % 2 === 1 ? "sm:border-l" : ""} ${
                        index > 1 ? "sm:border-t" : ""
                      }`}
                    >
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-black text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <SeoFaqSection
            title={dict.gallery.faqTitle}
            accent={dict.gallery.faqAccent}
            description={dict.gallery.faqDescription}
            items={PROJECTS_FAQS}
          />
        </section>
      </div>
    </main>
  );
}

const ProjectCard = ({ project }: { project: Project; index: number }) => {
  const dict = useDictionary();
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
              {project.img.length} {dict.gallery.imageCount}
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
