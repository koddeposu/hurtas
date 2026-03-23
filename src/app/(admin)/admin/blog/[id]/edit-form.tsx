"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Info, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { updateBlogPost } from "@/actions/blogActions";
import { uploadImage } from "@/actions/uploadActions";
import { toast } from "sonner";
import { BlogContentEditor } from "@/components/admin/blog-content-editor";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  category: string;
  imageUrl: string;
  imageAlt: string | null;
  readTime: number | null;
  isPublished: boolean;
}

export function EditBlogForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [formData, setFormData] = useState({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content || "",
    category: post.category,
    imageAlt: post.imageAlt || "",
    readTime: post.readTime?.toString() || "",
    isPublished: post.isPublished,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "blog");

      const result = await uploadImage(fd);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      if (result.url) {
        setImageUrl(result.url);
        toast.success("Görsel yüklendi");
      }
    } catch {
      toast.error("Görsel yüklenemedi");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateBlogPost(post.id, {
        ...formData,
        readTime: formData.readTime ? parseInt(formData.readTime, 10) : null,
        imageUrl,
      });
      toast.success("Blog yazısı güncellendi");
      router.push("/admin/blog");
    } catch {
      toast.error("Blog yazısı güncellenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader title="Blog Yazısı Düzenle" description={post.title} />

        <main className="p-6">
          <div className="mb-6">
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Bloga Dön
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top Bar: Details, Cover Image, Publishing, Submit */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-end gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="title">Başlık *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="w-[160px]">
                    <Label htmlFor="category">Kategori *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="w-[100px]">
                    <div className="flex items-center gap-1.5">
                      <Label htmlFor="readTime">Okuma Süresi</Label>
                      <span title="Tahmini okuma süresi (dakika olarak)">
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </span>
                    </div>
                    <Input
                      id="readTime"
                      type="number"
                      min={1}
                      value={formData.readTime}
                      onChange={(e) =>
                        setFormData({ ...formData, readTime: e.target.value })
                      }
                      placeholder="5"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Kapak Görseli</Label>
                    <label className="mt-1 flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg cursor-pointer hover:border-primary transition-colors bg-white">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />
                      ) : imageUrl ? (
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded overflow-hidden">
                            <Image src={imageUrl} alt="Kapak" fill className="object-cover" />
                          </div>
                          <span className="text-xs text-slate-600">Değiştir</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 text-slate-400" />
                          <span className="text-xs text-slate-500">Yükle</span>
                        </>
                      )}
                    </label>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg">
                    <Label htmlFor="isPublished" className="text-sm">Yayında</Label>
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isPublished: checked })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-[#3a1924]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Kaydediliyor...
                      </>
                    ) : (
                      "Değişiklikleri Kaydet"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Area - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle>Özet</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={2}
                  required
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>İçerik</CardTitle>
              </CardHeader>
              <CardContent>
                <BlogContentEditor
                  content={formData.content}
                  onChange={(json) =>
                    setFormData({ ...formData, content: json })
                  }
                />
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
}

