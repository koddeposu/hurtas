import { requireAuth } from "@/lib/requireAuth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { getCategories } from "@/actions/categoryActions";
import { CategoriesClient } from "./categories-client";

export default async function CategoriesPage() {
  const session = await requireAuth();
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader
          title="Kategoriler"
          description="Prefabrik ev kategorilerini yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <CategoriesClient categories={categories} />
        </main>
      </div>
    </div>
  );
}

