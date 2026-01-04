import { requireAuth } from "@/lib/requireAuth";
import { getCategories } from "@/actions/categoryActions";
import { NewProductForm } from "./form";

export default async function NewProductPage() {
  await requireAuth();
  const categories = await getCategories();

  return <NewProductForm categories={categories} />;
}
