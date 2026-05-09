import { requireAuth } from "@/lib/requireAuth";
import { getCategories } from "@/actions/categoryActions";
import { NewCategoryForm } from "./new-category-form";

export default async function NewCategoryPage() {
  await requireAuth();
  const categories = await getCategories();

  return <NewCategoryForm categories={categories} />;
}
