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
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createProduct } from "@/actions/productActions";
import { uploadImage } from "@/actions/uploadActions";
import { toast } from "sonner";
import { BlogContentEditor } from "@/components/admin/blog-content-editor";
import {
  SortableImageGrid,
  type SortableImage,
} from "@/components/admin/sortable-image-grid";
import { hasRichContent, toTipTapDocJson } from "@/lib/richContent";

interface PendingImage {
  tempId: string;
  url: string;
  alt: string;
  order: number;
}

interface Category {
  id: string;
  name: string;
}

interface NewProductFormProps {
  categories: Category[];
}

export function NewProductForm({ categories }: NewProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [formData, setFormData] = useState({
    categoryIds: [] as string[],
    name: "",
    area: "",
    room: "",
    floor: "1",
    bath: "1",
    height: "2.5",
    price: "",
    oldPrice: "",
    description: toTipTapDocJson(""),
    metaDescription: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createProduct({
        ...formData,
        categoryIds:
          formData.categoryIds.length > 0 ? formData.categoryIds : undefined,
        price: formData.price || undefined,
        oldPrice: formData.oldPrice || undefined,
        description: hasRichContent(formData.description)
          ? formData.description
          : undefined,
        metaDescription: formData.metaDescription.trim() || undefined,
        pendingImages: pendingImages.map(({ url, alt, order }) => ({
          url,
          alt,
          order,
        })),
      });
      toast.success("Ürün oluşturuldu");
      router.push("/admin/products");
    } catch {
      toast.error("Ürün oluşturulurken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "products");

        const result = await uploadImage(formData);
        if (result.error) {
          toast.error(result.error);
          continue;
        }

        if (result.url) {
          setPendingImages((prev) => [
            ...prev,
            {
              tempId: crypto.randomUUID(),
              url: result.url,
              alt: file.name.replace(/\.[^/.]+$/, ""),
              order: prev.length,
            },
          ]);
        }
      }
      toast.success("Görseller yüklendi");
    } catch {
      toast.error("Görsel yüklenirken hata oluştu");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePendingImage = (tempId: string) => {
    setPendingImages((prev) => prev.filter((img) => img.tempId !== tempId));
  };

  const handleReorderPendingImages = (reorderedImages: SortableImage[]) => {
    setPendingImages(
      reorderedImages.map((img, index) => ({
        tempId: img.id,
        url: img.url,
        alt: img.alt,
        order: index,
      }))
    );
  };

  const toggleCategory = (categoryId: string) => {
    setFormData((prev) => {
      const isSelected = prev.categoryIds.includes(categoryId);
      return {
        ...prev,
        categoryIds: isSelected
          ? prev.categoryIds.filter((id) => id !== categoryId)
          : [...prev.categoryIds, categoryId],
      };
    });
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader
          title="Yeni Ürün"
          description="Yeni bir prefabrik ev modeli ekleyin"
        />

        <main className="p-6">
          <div className="mb-6">
            <Link href="/admin/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Ürünlere Dön
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Temel Bilgiler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ürün Adı *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Örn: 2+1 Tek Katlı Prefabrik Ev 65 m2"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Kategoriler</Label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => {
                          const selected = formData.categoryIds.includes(cat.id);
                          return (
                            <Button
                              key={cat.id}
                              type="button"
                              variant={selected ? "default" : "outline"}
                              onClick={() => toggleCategory(cat.id)}
                              className={
                                selected
                                  ? "bg-primary hover:bg-[#3a1924]"
                                  : ""
                              }
                            >
                              {cat.name}
                            </Button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-slate-500">
                        Birden fazla kategori seçebilirsiniz. İlk seçilen kategori
                        ana kategori olarak kullanılır.
                      </p>
                      {formData.categoryIds.length > 0 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-auto px-0 text-xs text-slate-500 hover:text-slate-700"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, categoryIds: [] }))
                          }
                        >
                          Seçimi temizle
                        </Button>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Açıklama</Label>
                      <BlogContentEditor
                        content={formData.description}
                        onChange={(json) =>
                          setFormData({
                            ...formData,
                            description: json,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            metaDescription: e.target.value,
                          })
                        }
                        placeholder="SEO için kısa açıklama (öneri: 140-160 karakter)"
                        rows={4}
                      />
                      <p className="text-xs text-slate-500">
                        Ürün kartlarında ve ürün detay sayfası meta etiketlerinde kullanılabilir.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Özellikler</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="area">Alan (m²) *</Label>
                        <Input
                          id="area"
                          value={formData.area}
                          onChange={(e) =>
                            setFormData({ ...formData, area: e.target.value })
                          }
                          placeholder="65"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="room">Oda *</Label>
                        <Input
                          id="room"
                          value={formData.room}
                          onChange={(e) =>
                            setFormData({ ...formData, room: e.target.value })
                          }
                          placeholder="2+1"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="floor">Kat *</Label>
                        <Input
                          id="floor"
                          value={formData.floor}
                          onChange={(e) =>
                            setFormData({ ...formData, floor: e.target.value })
                          }
                          placeholder="1"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bath">Banyo *</Label>
                        <Input
                          id="bath"
                          value={formData.bath}
                          onChange={(e) =>
                            setFormData({ ...formData, bath: e.target.value })
                          }
                          placeholder="1"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Yükseklik (m) *</Label>
                        <Input
                          id="height"
                          value={formData.height}
                          onChange={(e) =>
                            setFormData({ ...formData, height: e.target.value })
                          }
                          placeholder="2.5"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Görseller</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SortableImageGrid
                      images={pendingImages.map((img) => ({
                        id: img.tempId,
                        url: img.url,
                        alt: img.alt,
                        order: img.order,
                      }))}
                      onReorder={handleReorderPendingImages}
                      onDelete={handleDeletePendingImage}
                      onUpload={handleImageUpload}
                      isUploading={isUploading}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fiyatlandırma</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Fiyat (₺)</Label>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="650000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oldPrice">Eski Fiyat (₺)</Label>
                      <Input
                        id="oldPrice"
                        value={formData.oldPrice}
                        onChange={(e) =>
                          setFormData({ ...formData, oldPrice: e.target.value })
                        }
                        placeholder="700000"
                      />
                      <p className="text-xs text-slate-500">
                        İndirim göstermek için
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Durum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isActive">Aktif</Label>
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isActive: checked })
                        }
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Pasif ürünler sitede görünmez
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
                  ) : (
                    "Ürün Oluştur"
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

