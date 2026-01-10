"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Loader2, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import {
  addFavorite,
  removeFavorite,
  updateFavoritesOrder,
} from "@/actions/favoriteActions";
import {
  SortableTableWrapper,
  SortableRow,
  useSortableTable,
  SortableItem,
} from "@/components/admin/sortable-table";
import { toast } from "sonner";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  area: string;
  room: string;
  category: Category | null;
  image: ProductImage | null;
}

interface Favorite extends SortableItem {
  id: string;
  order: number;
  product: Product;
}

interface AvailableProduct {
  id: string;
  name: string;
  category: string | null;
}

interface FavoritesClientProps {
  favorites: Favorite[];
  availableProducts: AvailableProduct[];
}

export function FavoritesClient({
  favorites: initialFavorites,
  availableProducts: initialAvailableProducts,
}: FavoritesClientProps) {
  const [isPending, startTransition] = useTransition();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [availableProducts, setAvailableProducts] = useState(
    initialAvailableProducts,
  );

  const {
    items: favorites,
    isEditMode,
    hasChanges,
    handleOrderChange,
    startEditMode,
    cancelEditMode,
    setIsEditMode,
    setHasChanges,
    setItems,
    getOrderedItems,
  } = useSortableTable(initialFavorites);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateFavoritesOrder(getOrderedItems());
        toast.success("Sıralama kaydedildi");
        setIsEditMode(false);
        setHasChanges(false);
      } catch {
        toast.error("Sıralama kaydedilemedi");
      }
    });
  };

  const handleAddFavorite = () => {
    if (!selectedProduct) return;

    setIsAdding(true);
    startTransition(async () => {
      try {
        const result = await addFavorite(selectedProduct);
        if (result.success) {
          toast.success("Ürün favorilere eklendi");
          setSelectedProduct("");
          // Remove from available products
          setAvailableProducts((prev) =>
            prev.filter((p) => p.id !== selectedProduct),
          );
        } else {
          toast.error(result.error || "Ürün eklenemedi");
        }
      } catch {
        toast.error("Ürün eklenemedi");
      } finally {
        setIsAdding(false);
      }
    });
  };

  const handleRemoveFavorite = (favoriteId: string, productId: string) => {
    startTransition(async () => {
      try {
        await removeFavorite(favoriteId);
        toast.success("Ürün favorilerden çıkarıldı");
        // Add back to available products
        const removedFavorite = favorites.find((f) => f.id === favoriteId);
        if (removedFavorite) {
          setAvailableProducts((prev) => [
            ...prev,
            {
              id: productId,
              name: removedFavorite.product.name,
              category: removedFavorite.product.category?.name || null,
            },
          ]);
          // Remove from favorites list
          setItems((prev) => prev.filter((f) => f.id !== favoriteId));
        }
      } catch {
        toast.error("Ürün çıkarılamadı");
      }
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-slate-600">
            Toplam {favorites.length} favori ürün
          </p>
        </div>
        <div className="flex gap-2">
          {isEditMode ? (
            <>
              <Button variant="outline" onClick={cancelEditMode}>
                İptal
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isPending}
                className="bg-primary hover:bg-[#3a1924]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  "Kaydet"
                )}
              </Button>
            </>
          ) : (
            <>
              {favorites.length > 1 && (
                <Button variant="outline" onClick={startEditMode}>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sırayı düzenle
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add Product Section */}
      {!isEditMode && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Favori Ürün Ekle
                </label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ürün seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.length === 0 ? (
                      <div className="px-2 py-4 text-center text-sm text-slate-500">
                        Eklenebilecek ürün kalmadı
                      </div>
                    ) : (
                      availableProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                          {product.category && (
                            <span className="text-slate-400 ml-2">
                              ({product.category})
                            </span>
                          )}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAddFavorite}
                disabled={!selectedProduct || isAdding || isPending}
                className="bg-primary hover:bg-[#3a1924]"
              >
                {isAdding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Ekle
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Favorites Table */}
      <SortableTableWrapper
        items={favorites}
        isEditMode={isEditMode}
        onOrderChange={handleOrderChange}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {isEditMode && <TableHead className="w-10"></TableHead>}
                  <TableHead className="w-20">Görsel</TableHead>
                  <TableHead>Ürün Adı</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Alan</TableHead>
                  <TableHead>Oda</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favorites.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={isEditMode ? 8 : 7}
                      className="text-center py-8 text-slate-500"
                    >
                      Henüz favori ürün eklenmemiş
                    </TableCell>
                  </TableRow>
                ) : (
                  favorites.map((favorite) => (
                    <SortableRow key={favorite.id} id={favorite.id}>
                      <TableCell>
                        {favorite.product.image ? (
                          <div className="relative w-16 h-12 rounded overflow-hidden">
                            <Image
                              src={favorite.product.image.url}
                              alt={favorite.product.image.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-12 rounded bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                            Yok
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {favorite.product.name}
                      </TableCell>
                      <TableCell>
                        {favorite.product.category ? (
                          <Badge variant="secondary">
                            {favorite.product.category.name}
                          </Badge>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {favorite.product.area} m²
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {favorite.product.room}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isEditMode || isPending}
                          onClick={() =>
                            handleRemoveFavorite(
                              favorite.id,
                              favorite.product.id,
                            )
                          }
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </SortableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </SortableTableWrapper>
    </>
  );
}
