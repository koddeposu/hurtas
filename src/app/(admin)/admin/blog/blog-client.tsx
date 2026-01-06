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
import { DeleteBlogButton } from "./delete-button";
import { updateBlogPostsOrder } from "@/actions/blogActions";
import {
  SortableTableWrapper,
  SortableRow,
  useSortableTable,
  SortableItem,
} from "@/components/admin/sortable-table";
import { toast } from "sonner";

interface BlogPost extends SortableItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string | null;
  isPublished: boolean;
  order: number;
}

interface BlogClientProps {
  posts: BlogPost[];
}

export function BlogClient({ posts: initialPosts }: BlogClientProps) {
  const [isPending, startTransition] = useTransition();
  const {
    items: posts,
    isEditMode,
    hasChanges,
    handleOrderChange,
    startEditMode,
    cancelEditMode,
    setIsEditMode,
    setHasChanges,
    getOrderedItems,
  } = useSortableTable(initialPosts);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateBlogPostsOrder(getOrderedItems());
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
        <p className="text-slate-600">Toplam {posts.length} yazı</p>
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
              <Link href="/admin/blog/new">
                <Button className="bg-primary hover:bg-[#3a1924]">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Yazı
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <SortableTableWrapper
        items={posts}
        isEditMode={isEditMode}
        onOrderChange={handleOrderChange}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {isEditMode && <TableHead className="w-10"></TableHead>}
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
                      colSpan={isEditMode ? 6 : 5}
                      className="text-center py-8 text-slate-500"
                    >
                      Henüz blog yazısı eklenmemiş
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <SortableRow key={post.id} id={post.id}>
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
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isEditMode}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteBlogButton
                            id={post.id}
                            title={post.title}
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
