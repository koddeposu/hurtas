import { getProjectsWithImages } from "@/actions/projectActions";
import { PROJECTS_FAQS } from "@/components/page-faq-content";
import {
  getDictionary,
  getLocalizedImageAlt,
  getLocalizedProjectTitle,
  getMetadataAlternates,
} from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { Metadata } from "next";
import ProjectsClient from "./projects-client";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.seo.galleryTitle,
    description: dict.seo.galleryDescription,
    keywords: [
      dict.common.companyName,
      "concrete products gallery",
      "beton ürünleri galeri",
      "concrete pipe images",
      "kerb",
      "paving stone",
    ],
    openGraph: {
      title: dict.seo.galleryTitle,
      description: dict.seo.galleryDescription,
      url: getMetadataAlternates("/galeri", locale).canonical,
      siteName: dict.common.companyName,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.seo.galleryTitle,
        },
      ],
      locale: dict.seo.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.galleryTitle,
      description: dict.seo.galleryDescription,
      images: ["/og-image.png"],
    },
    alternates: getMetadataAlternates("/galeri", locale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectsPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const dbProjects = await getProjectsWithImages(true);

  // Transform database format to UI format
  const projects = dbProjects.map((project) => ({
    id: project.id,
    img: project.images.map((img, index) => ({
      src: img.url,
      alt:
        getLocalizedImageAlt(img, locale) ||
        `${dict.common.companyName} ${index + 1}`,
    })),
    title: getLocalizedProjectTitle(project, locale),
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
                name: dict.common.home,
                item: getMetadataAlternates("/", locale).canonical,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: dict.nav.gallery,
                item: getMetadataAlternates("/galeri", locale).canonical,
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
