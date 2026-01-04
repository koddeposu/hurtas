import { requireAuth } from "@/lib/requireAuth";
import { getProductById } from "@/actions/productActions";
import { getCategories } from "@/actions/categoryActions";
import { notFound } from "next/navigation";
import { EditProductForm } from "./edit-form";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  await requireAuth();
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return <EditProductForm product={product} categories={categories} />;
}
