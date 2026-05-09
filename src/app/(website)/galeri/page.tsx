import { getProjectsWithImages } from "@/actions/projectActions";
import { PROJECTS_FAQS } from "@/components/page-faq-content";
import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Galeri | Hürtaş Beton Ürün ve Saha Görselleri",
  description:
    "Hürtaş Beton galerisini inceleyin. Beton boru, parke taşı, bordür, menhol ve saha beton elemanlarına ait ürün ve uygulama görsellerini görün.",
  keywords: [
    "Hürtaş Beton galeri",
    "beton ürünleri galeri",
    "beton boru görselleri",
    "parke taşı görselleri",
    "bordür görselleri",
    "menhol görselleri",
    "saha beton elemanları",
  ],
  openGraph: {
    title: "Galeri | Hürtaş Beton Ürün Görselleri",
    description:
      "Beton boru, parke taşı, bordür ve altyapı beton ürünleri için ürün ve saha görsellerini inceleyin.",
    url: "https://ctprefabrik.com/projelerimiz",
    siteName: "Hürtaş Beton",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hürtaş Beton galeri sayfasında beton ürünleri görselleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeri | Hürtaş Beton",
    description:
      "Beton ürünleri ve saha uygulamalarında Hürtaş Beton galerisini keşfedin.",
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
          : `${project.title} beton ürünü${project.location ? ` ${project.location}` : ""} görseli ${index + 1}`,
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
                name: "Galeri",
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
