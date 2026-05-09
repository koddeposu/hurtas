import { getCategories } from "@/actions/categoryActions";
import { NewBlogForm } from "./new-blog-form";

export default async function NewBlogPage() {
  const productCategories = await getCategories();

  return <NewBlogForm productCategories={productCategories} />;
}
