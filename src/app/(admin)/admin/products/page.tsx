import { requireAuth } from "@/lib/requireAuth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { getProducts } from "@/actions/productActions";
import { getCategories } from "@/actions/categoryActions";
import { ProductsClient } from "./products-client";

export default async function ProductsPage() {
  const session = await requireAuth();
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader
          title="Ürünler"
          description="Ürünleri yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <ProductsClient products={products} categories={categories} />
        </main>
      </div>
    </div>
  );
}
