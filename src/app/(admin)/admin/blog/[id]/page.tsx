import { requireAuth } from "@/lib/requireAuth";
import { getBlogPostById } from "@/actions/blogActions";
import { notFound } from "next/navigation";
import { EditBlogForm } from "./edit-form";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  await requireAuth();
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return <EditBlogForm post={post} />;
}
