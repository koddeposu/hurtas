import { requireAuth } from "@/lib/requireAuth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
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
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/actions/categoryActions";
import { DeleteCategoryButton } from "./delete-button";

export default async function CategoriesPage() {
  const session = await requireAuth();
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader
          title="Kategoriler"
          description="Prefabrik ev kategorilerini yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-slate-600">
                Toplam {categories.length} kategori
              </p>
            </div>
            <Link href="/admin/categories/new">
              <Button className="bg-primary hover:bg-[#3a1924]">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Kategori
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sıra</TableHead>
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
                        colSpan={5}
                        className="text-center py-8 text-slate-500"
                      >
                        Henüz kategori eklenmemiş
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          {category.order}
                        </TableCell>
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
                              <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <DeleteCategoryButton
                              id={category.id}
                              name={category.name}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
