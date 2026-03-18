import { getProjectsWithImages } from "@/actions/projectActions";
import { PROJECTS_FAQS } from "@/components/page-faq-content";
import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title:
    "Projelerimiz | Prefabrik Ev Modelleri, Çelik Ev ve Dubleks Prefabrik Uygulamaları | CT Prefabrik",
  description:
    "CT Prefabrik projelerimizi inceleyin. Prefabrik ev modelleri, prefabrik villa, çelik konstrüksiyon ev, dubleks prefabrik ev ve anahtar teslim yapı uygulamalarında tamamlanan örneklerle fikir alın.",
  keywords: [
    "prefabrik ev projeleri",
    "prefabrik ev modelleri",
    "prefabrik ev fiyatları",
    "anahtar teslim prefabrik ev",
    "çelik konstrüksiyon ev",
    "çelik ev projeleri",
    "dubleks prefabrik ev",
    "prefabrik villa projeleri",
    "konteyner ev fiyatları",
    "Sakarya prefabrik ev projeleri",
    "CT Prefabrik projeler",
  ],
  openGraph: {
    title:
      "Projelerimiz | CT Prefabrik Tamamlanan Prefabrik Ev ve Çelik Ev Uygulamaları",
    description:
      "Tek katlı prefabrik ev, çift katlı prefabrik ev, çelik ev ve prefabrik villa projelerimizi inceleyerek yaşam alanı planları hakkında fikir alın.",
    url: "https://ctprefabrik.com/projelerimiz",
    siteName: "CT Prefabrik",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CT Prefabrik projelerimiz sayfasında prefabrik ev ve çelik ev uygulamaları",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projelerimiz | CT Prefabrik Referans Yapılar",
    description:
      "Prefabrik ev modelleri, dubleks prefabrik ev ve çelik ev uygulamalarında tamamlanan CT Prefabrik projelerini keşfedin.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://ctprefabrik.com/projelerimiz",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ProjectsPage() {
  const dbProjects = await getProjectsWithImages(true);

  // Transform database format to UI format
  const projects = dbProjects.map((project) => ({
    id: project.id,
    img: project.images.map((img, index) => ({
      src: img.url,
      alt:
        img.alt?.trim()
          ? img.alt
          : `${project.title} prefabrik ev projesi${project.location ? ` ${project.location}` : ""} görseli ${index + 1}`,
    })),
    title: project.title,
    area: project.area,
    room: project.room,
    loc: project.location,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Ana Sayfa",
                item: "https://ctprefabrik.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Projelerimiz",
                item: "https://ctprefabrik.com/projelerimiz",
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PROJECTS_FAQS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <ProjectsClient projects={projects} />
    </>
  );
}
