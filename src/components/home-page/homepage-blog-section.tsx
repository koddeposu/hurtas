import { getBlogPostsPaginated } from "@/actions/blogActions";
import { getDictionary, getLocalizedUrl } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { LatestBlogPosts } from "./latest-blog-posts";

export async function HomepageBlogSection() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const blogData = await getBlogPostsPaginated({
    page: 1,
    limit: 4,
    publishedOnly: true,
  });

  if (!blogData.posts.length) {
    return null;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: dict.blog.itemListName,
            itemListElement: blogData.posts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: getLocalizedUrl(`/blog/${post.slug}`, locale),
              name: post.title,
            })),
          }),
        }}
      />

      <section className="flex justify-center pt-8 lg:pt-10">
        <div className="max-w-[1280px] w-full">
          <LatestBlogPosts posts={blogData.posts} />
        </div>
      </section>
    </>
  );
}
