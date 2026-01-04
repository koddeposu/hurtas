import { requireAuth } from "@/lib/requireAuth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/actions/productActions";
import { DeleteProductButton } from "./delete-button";

export default async function ProductsPage() {
  const session = await requireAuth();
  const products = await getProducts();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader
          title="Ürünler"
          description="Prefabrik ev modellerini yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">Toplam {products.length} ürün</p>
            <Link href="/admin/products/new">
              <Button className="bg-primary hover:bg-[#3a1924]">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Ürün
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
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
                        colSpan={7}
                        className="text-center py-8 text-slate-500"
                      >
                        Henüz ürün eklenmemiş
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map(({ product, category }) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-slate-500">
                            {product.slug}
                          </div>
                        </TableCell>
                        <TableCell>
                          {category ? (
                            <Badge variant="secondary">{category.name}</Badge>
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
                              <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <DeleteProductButton
                              id={product.id}
                              name={product.name}
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
