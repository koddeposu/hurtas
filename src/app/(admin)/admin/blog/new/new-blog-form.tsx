"use client";

import { createBlogPost } from "@/actions/blogActions";
import { uploadImage } from "@/actions/uploadActions";
import { AdminHeader } from "@/components/admin/header";
import { BlogContentEditor } from "@/components/admin/blog-content-editor";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Info, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCategoryOption {
  id: string;
  name: string;
}

interface NewBlogFormProps {
  productCategories: ProductCategoryOption[];
}

const NO_PRODUCT_CATEGORY = "_none";

export function NewBlogForm({ productCategories }: NewBlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    productCategoryId: "",
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
        productCategoryId: formData.productCategoryId || null,
        readTime: formData.readTime
          ? parseInt(formData.readTime, 10)
          : undefined,
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
      <div className="flex-1 lg:ml-64">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-end gap-4">
                  <div className="flex-1 min-w-[220px]">
                    <Label htmlFor="title">Başlık *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Blog yazısı başlığı"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="w-[170px]">
                    <Label htmlFor="category">Blog Kategorisi *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="Örn: Teknik Bilgiler"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="w-[260px]">
                    <Label>Ürün Slider Kategorisi</Label>
                    <Select
                      value={formData.productCategoryId || NO_PRODUCT_CATEGORY}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          productCategoryId:
                            value === NO_PRODUCT_CATEGORY ? "" : value,
                        })
                      }
                    >
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NO_PRODUCT_CATEGORY}>
                          Slider gösterme
                        </SelectItem>
                        {productCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        setFormData({
                          ...formData,
                          readTime: e.target.value,
                        })
                      }
                      placeholder="5"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">
                      Kapak Görseli
                    </Label>
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
                            <Image
                              src={imageUrl}
                              alt="Kapak"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-slate-600">
                            Değiştir
                          </span>
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
                    <Label htmlFor="isPublished" className="text-sm">
                      Yayınla
                    </Label>
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
                    ) : formData.isPublished ? (
                      "Yayınla"
                    ) : (
                      "Taslak Olarak Kaydet"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

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
                  placeholder="Yazının kısa özeti (liste görünümünde gösterilir)"
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
