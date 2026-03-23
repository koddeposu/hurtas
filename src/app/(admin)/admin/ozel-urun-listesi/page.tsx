import { getProducts } from "@/actions/productActions";
import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { requireAuth } from "@/lib/requireAuth";

export default async function OzelUrunListesiPage() {
  const session = await requireAuth();
  const products = await getProducts();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader
          title="Özel Ürün Listesi"
          description="Sadece yönetim için ürün isim listesi"
          userName={session.user.name}
        />

        <main className="p-6">
          <div className="space-y-2">
            {products.map(({ product }) => (
              <p key={product.id} className="text-slate-900">
                {product.name}
              </p>
            ))}

            {products.length === 0 && (
              <p className="text-slate-500">Kayıtlı ürün bulunamadı.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

