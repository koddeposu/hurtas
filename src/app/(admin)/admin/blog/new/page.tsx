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
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createBlogPost } from "@/actions/blogActions";
import { uploadImage } from "@/actions/uploadActions";
import { toast } from "sonner";

export default function NewBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    imageAlt: "",
    readTime: "",
    isPublished: false,
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
    if (!imageUrl) {
      toast.error("Lütfen kapak görseli yükleyin");
      return;
    }
    setIsLoading(true);

    try {
      await createBlogPost({
        ...formData,
        imageUrl,
      });
      toast.success("Blog yazısı oluşturuldu");
      router.push("/admin/blog");
    } catch {
      toast.error("Blog yazısı oluşturulurken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader
          title="Yeni Blog Yazısı"
          description="Yeni bir yazı ekleyin"
        />

        <main className="p-6">
          <div className="mb-6">
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Bloga Dön
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>İçerik</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Başlık *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Blog yazısı başlığı"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Özet *</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) =>
                          setFormData({ ...formData, excerpt: e.target.value })
                        }
                        placeholder="Yazının kısa özeti (liste görünümünde gösterilir)"
                        rows={2}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">İçerik</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        placeholder="Yazının tam içeriği..."
                        rows={12}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Kapak Görseli</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {imageUrl && (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                        <Image
                          src={imageUrl}
                          alt="Kapak görseli"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      {isUploading ? (
                        <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-slate-400 mb-2" />
                          <span className="text-sm text-slate-500">
                            {imageUrl
                              ? "Görseli Değiştir"
                              : "Kapak Görseli Yükle"}
                          </span>
                        </>
                      )}
                    </label>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detaylar</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        placeholder="Örn: Teknik Bilgiler"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="readTime">Okuma Süresi</Label>
                      <Input
                        id="readTime"
                        value={formData.readTime}
                        onChange={(e) =>
                          setFormData({ ...formData, readTime: e.target.value })
                        }
                        placeholder="Örn: 5 dk"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Yayın</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isPublished">Yayınla</Label>
                      <Switch
                        id="isPublished"
                        checked={formData.isPublished}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isPublished: checked })
                        }
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {formData.isPublished
                        ? "Yazı hemen yayınlanacak"
                        : "Yazı taslak olarak kaydedilecek"}
                    </p>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-[#3a1924]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : formData.isPublished ? (
                    "Yayınla"
                  ) : (
                    "Taslak Olarak Kaydet"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
