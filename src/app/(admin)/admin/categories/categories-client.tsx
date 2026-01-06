"use client";

import { useTransition } from "react";
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
import { Plus, Pencil, Loader2, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { DeleteCategoryButton } from "./delete-button";
import { updateCategoriesOrder } from "@/actions/categoryActions";
import {
  SortableTableWrapper,
  SortableRow,
  useSortableTable,
  SortableItem,
} from "@/components/admin/sortable-table";
import { toast } from "sonner";

interface Category extends SortableItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
}

interface CategoriesClientProps {
  categories: Category[];
}

export function CategoriesClient({
  categories: initialCategories,
}: CategoriesClientProps) {
  const [isPending, startTransition] = useTransition();
  const {
    items: categories,
    isEditMode,
    hasChanges,
    handleOrderChange,
    startEditMode,
    cancelEditMode,
    setIsEditMode,
    setHasChanges,
    getOrderedItems,
  } = useSortableTable(initialCategories);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateCategoriesOrder(getOrderedItems());
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
        <div>
          <p className="text-slate-600">Toplam {categories.length} kategori</p>
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
              <Link href="/admin/categories/new">
                <Button className="bg-primary hover:bg-[#3a1924]">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Kategori
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <SortableTableWrapper
        items={categories}
        isEditMode={isEditMode}
        onOrderChange={handleOrderChange}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {isEditMode && <TableHead className="w-10"></TableHead>}
                  <TableHead>Ad</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Açıklama</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={isEditMode ? 5 : 4}
                      className="text-center py-8 text-slate-500"
                    >
                      Henüz kategori eklenmemiş
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <SortableRow key={category.id} id={category.id}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {category.slug}
                      </TableCell>
                      <TableCell className="text-slate-500 max-w-xs truncate">
                        {category.description || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/categories/${category.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isEditMode}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteCategoryButton
                            id={category.id}
                            name={category.name}
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
