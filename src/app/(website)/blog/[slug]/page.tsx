import { getBlogPostBySlug } from "@/actions/blogActions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { ShareButtons } from "./share-buttons";
import { convertJsonToHtml } from "@/lib/tiptap-utils";

async function getPostData(slug: string) {
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.isPublished) {
    return null;
  }

  return { post };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostData(slug);

  if (!data) {
    return {
      title: "Blog | CT Prefabrik",
    };
  }

  const { post } = data;

  return {
    title: `${post.title} | CT Prefabrik Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostData(slug);

  if (!data) {
    notFound();
  }

  const { post } = data;

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Background Vectors */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/3 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "radial-gradient(#49202d 0.5px, transparent 0.5px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            Bloga Dön
          </Link>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-primary/5 text-primary border border-primary/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-bold border-b border-slate-100 pb-8">
            {post.createdAt && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime} dk</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <article className="container mx-auto max-w-4xl px-4">
        {/* Featured Image */}
        <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-lg mb-8">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            fill
            preload
            fetchPriority="high"
            loading="eager"
            className="object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="blog-content text-slate-600">
          {post.content && (
            <div dangerouslySetInnerHTML={{ __html: convertJsonToHtml(post.content) }} />
          )}
        </div>

        {/* --- SHARE / FOOTER --- */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-900 font-bold text-lg">
            Bu yazıyı paylaş:
          </div>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </article>
    </main>
  );
}
