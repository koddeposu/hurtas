import { requireAuth } from "@/lib/requireAuth";
import { getBlogPostById } from "@/actions/blogActions";
import { getCategories } from "@/actions/categoryActions";
import { notFound } from "next/navigation";
import { EditBlogForm } from "./edit-form";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  await requireAuth();
  const { id } = await params;
  const [post, productCategories] = await Promise.all([
    getBlogPostById(id),
    getCategories(),
  ]);

  if (!post) {
    notFound();
  }

  return <EditBlogForm post={post} productCategories={productCategories} />;
}
