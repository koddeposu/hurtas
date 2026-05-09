import { requireAuth } from "@/lib/requireAuth";
import { getCategories, getCategoryById } from "@/actions/categoryActions";
import { notFound } from "next/navigation";
import { EditCategoryForm } from "./edit-form";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  await requireAuth();
  const { id } = await params;
  const [category, categories] = await Promise.all([
    getCategoryById(id),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return <EditCategoryForm category={category} categories={categories} />;
}
