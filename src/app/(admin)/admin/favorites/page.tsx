import { requireAuth } from "@/lib/requireAuth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import {
  getFavorites,
  getProductsForFavoriteDropdown,
} from "@/actions/favoriteActions";
import { FavoritesClient } from "./favorites-client";

export default async function FavoritesPage() {
  const session = await requireAuth();
  const favorites = await getFavorites();
  const availableProducts = await getProductsForFavoriteDropdown();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader
          title="Favoriler"
          description="Ana sayfada gösterilecek favori ürünleri yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <FavoritesClient
            favorites={favorites}
            availableProducts={availableProducts}
          />
        </main>
      </div>
    </div>
  );
}

