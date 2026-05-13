"use client";

import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { buildCategoryOptions } from "@/lib/categoryTree";

const ALL_CATEGORIES = "__all_categories__";

interface Category {
  id: string;
  name: string;
  parentId: string | null;
  order: number;
}

interface Product extends SortableItem {
  id: string;
  categoryId: string | null;
  name: string;
  slug: string;
  area: string;
  room: string;
  isActive: boolean;
  order: number;
}

type ProductListItem = Product & {
  _category: Category | null;
  _categories: Category[];
};

interface ProductsClientProps {
  products: {
    product: Product;
    category: Category | null;
    categories?: Category[];
  }[];
  categories: Category[];
}

export function ProductsClient({
  products: initialProducts,
  categories,
}: ProductsClientProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORIES);

  // Transform products for sortable table
  const initialItems: ProductListItem[] = initialProducts.map((p) => ({
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
  } = useSortableTable<ProductListItem>(initialItems);

  const categoryOptions = useMemo(
    () => buildCategoryOptions(categories),
    [categories],
  );

  const selectedCategoryIds = useMemo(() => {
    if (selectedCategoryId === ALL_CATEGORIES) return null;

    const childrenByParent = new Map<string | null, Category[]>();

    for (const category of categories) {
      const key = category.parentId ?? null;
      const children = childrenByParent.get(key) ?? [];
      children.push(category);
      childrenByParent.set(key, children);
    }

    const ids = new Set<string>();
    const visit = (categoryId: string) => {
      if (ids.has(categoryId)) return;

      ids.add(categoryId);

      for (const child of childrenByParent.get(categoryId) ?? []) {
        visit(child.id);
      }
    };

    visit(selectedCategoryId);

    return ids;
  }, [categories, selectedCategoryId]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategoryIds) return products;

    return products.filter((product) => {
      if (product.categoryId && selectedCategoryIds.has(product.categoryId)) {
        return true;
      }

      if (
        product._category?.id &&
        selectedCategoryIds.has(product._category.id)
      ) {
        return true;
      }

      return product._categories.some((category) =>
        selectedCategoryIds.has(category.id),
      );
    });
  }, [products, selectedCategoryIds]);

  const handleFilteredOrderChange = (newFilteredProducts: ProductListItem[]) => {
    if (!selectedCategoryIds) {
      handleOrderChange(newFilteredProducts);
      return;
    }

    let filteredIndex = 0;
    const filteredProductIds = new Set(
      newFilteredProducts.map((product) => product.id),
    );

    handleOrderChange(
      products.map((product) =>
        filteredProductIds.has(product.id)
          ? newFilteredProducts[filteredIndex++]
          : product,
      ),
    );
  };

  const productCountText = selectedCategoryIds
    ? `${filteredProducts.length} / ${products.length} ürün gösteriliyor`
    : `Toplam ${products.length} ürün`;
  const emptyMessage = selectedCategoryIds
    ? "Seçili kategoride ürün bulunamadı"
    : "Henüz ürün eklenmemiş";

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
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <p className="text-slate-600">{productCountText}</p>
          <div className="flex items-center gap-2">
            <Label
              htmlFor="category-filter"
              className="text-sm font-medium text-slate-700"
            >
              Kategori
            </Label>
            <Select
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
            >
              <SelectTrigger id="category-filter" className="w-60">
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent align="start" position="popper">
                <SelectItem value={ALL_CATEGORIES}>Tüm kategoriler</SelectItem>
                {categoryOptions.map(({ category, label }) => (
                  <SelectItem key={category.id} value={category.id}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
        items={filteredProducts}
        isEditMode={isEditMode}
        onOrderChange={handleFilteredOrderChange}
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
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={isEditMode ? 7 : 6}
                      className="text-center py-8 text-slate-500"
                    >
                      {emptyMessage}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
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
