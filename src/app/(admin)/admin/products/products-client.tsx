"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Loader2, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { DeleteProductButton } from "./delete-button";
import { updateProductsOrder } from "@/actions/productActions";
import {
  SortableTableWrapper,
  SortableRow,
  useSortableTable,
  SortableItem,
} from "@/components/admin/sortable-table";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface Product extends SortableItem {
  id: string;
  categoryId: string | null;
  name: string;
  slug: string;
  area: string;
  room: string;
  price: string | null;
  isActive: boolean;
  order: number;
}

interface ProductsClientProps {
  products: {
    product: Product;
    category: Category | null;
    categories?: Category[];
  }[];
}

export function ProductsClient({
  products: initialProducts,
}: ProductsClientProps) {
  const [isPending, startTransition] = useTransition();

  // Transform products for sortable table
  const initialItems = initialProducts.map((p) => ({
    ...p.product,
    _category: p.category,
    _categories: p.categories ?? [],
  }));

  const {
    items: products,
    isEditMode,
    hasChanges,
    handleOrderChange,
    startEditMode,
    cancelEditMode,
    setIsEditMode,
    setHasChanges,
    getOrderedItems,
  } = useSortableTable(initialItems);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateProductsOrder(getOrderedItems());
        toast.success("Sıralama kaydedildi");
        setIsEditMode(false);
        setHasChanges(false);
      } catch {
        toast.error("Sıralama kaydedilemedi");
      }
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-600">Toplam {products.length} ürün</p>
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
              <Button variant="outline" onClick={startEditMode}>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sırayı düzenle
              </Button>
              <Link href="/admin/products/new">
                <Button className="bg-primary hover:bg-[#3a1924]">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Ürün
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <SortableTableWrapper
        items={products}
        isEditMode={isEditMode}
        onOrderChange={handleOrderChange}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {isEditMode && <TableHead className="w-10"></TableHead>}
                  <TableHead>Ürün</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Alan</TableHead>
                  <TableHead>Oda</TableHead>
                  <TableHead>Fiyat</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={isEditMode ? 8 : 7}
                      className="text-center py-8 text-slate-500"
                    >
                      Henüz ürün eklenmemiş
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <SortableRow key={product.id} id={product.id}>
                      <TableCell>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-slate-500">
                          {product.slug}
                        </div>
                      </TableCell>
                      <TableCell>
                        {product._categories && product._categories.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {product._categories.map((item: Category) => (
                              <Badge key={item.id} variant="secondary">
                                {item.name}
                              </Badge>
                            ))}
                          </div>
                        ) : product._category ? (
                          <Badge variant="secondary">{product._category.name}</Badge>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{product.area} m²</TableCell>
                      <TableCell>{product.room}</TableCell>
                      <TableCell>
                        {product.price ? (
                          <span className="font-medium">
                            ₺{parseInt(product.price).toLocaleString("tr-TR")}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={product.isActive ? "default" : "secondary"}
                        >
                          {product.isActive ? "Aktif" : "Pasif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/products/${product.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isEditMode}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteProductButton
                            id={product.id}
                            name={product.name}
                            disabled={isEditMode}
                          />
                        </div>
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
