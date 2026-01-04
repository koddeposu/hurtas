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
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/actions/blogActions";
import { DeleteBlogButton } from "./delete-button";

export default async function BlogPage() {
  const session = await requireAuth();
  const posts = await getBlogPosts();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader
          title="Blog"
          description="Blog yazılarını yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">Toplam {posts.length} yazı</p>
            <Link href="/admin/blog/new">
              <Button className="bg-primary hover:bg-[#3a1924]">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Yazı
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Okuma Süresi</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-slate-500"
                      >
                        Henüz blog yazısı eklenmemiş
                      </TableCell>
                    </TableRow>
                  ) : (
                    posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-xs text-slate-500 max-w-xs truncate">
                            {post.excerpt}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{post.category}</Badge>
                        </TableCell>
                        <TableCell>{post.readTime || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={post.isPublished ? "default" : "secondary"}
                          >
                            {post.isPublished ? "Yayında" : "Taslak"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/blog/${post.id}`}>
                              <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <DeleteBlogButton id={post.id} title={post.title} />
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
