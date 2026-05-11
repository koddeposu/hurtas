import { getProjectsWithImages } from "@/actions/projectActions";
import { PROJECTS_FAQS } from "@/components/page-faq-content";
import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Galeri | Hürtaş Beton Boru, Baca, Bordür ve Parke Görselleri",
  description:
    "Hürtaş Beton galerisinde beton boru, betonarme boru, baca elemanları, kutu menfez, bordür, parke taşı, şev taşı ve saha beton ürünleri görsellerini inceleyin.",
  keywords: [
    "Hürtaş Beton galeri",
    "beton ürünleri galeri",
    "beton boru görselleri",
    "betonarme boru görselleri",
    "rögar baca görselleri",
    "muayene baca görselleri",
    "kutu menfez görselleri",
    "parke taşı görselleri",
    "bordür görselleri",
    "şev taşı görselleri",
    "beton bariyer görselleri",
    "yağmur suyu ızgara tabanı",
    "saha beton elemanları",
  ],
  openGraph: {
    title: "Galeri | Hürtaş Beton Ürün ve Saha Görselleri",
    description:
      "Beton boru, baca elemanları, kutu menfez, parke taşı, bordür ve altyapı beton ürünleri için ürün ve saha görsellerini inceleyin.",
    url: "https://www.hurtasbeton.com/galeri",
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
      "Beton boru, baca elemanları, bordür, parke taşı ve saha ürünleri için Hürtaş Beton galerisini keşfedin.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.hurtasbeton.com/galeri",
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
      alt: img.alt?.trim() ? img.alt : `görseli ${index + 1}`,
    })),
    title: project.title,
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
                item: "https://www.hurtasbeton.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Galeri",
                item: "https://www.hurtasbeton.com/galeri",
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
