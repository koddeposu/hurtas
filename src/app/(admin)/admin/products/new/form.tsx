"use client";

import { createProduct } from "@/actions/productActions";
import { uploadImage } from "@/actions/uploadActions";
import { AltTextEditDialog } from "@/components/admin/alt-text-edit-dialog";
import { AdminHeader } from "@/components/admin/header";
import { ProductDetailContentEditor } from "@/components/admin/product-detail-content-editor";
import { AdminSidebar } from "@/components/admin/sidebar";
import {
  SortableImageGrid,
  type SortableImage,
} from "@/components/admin/sortable-image-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { buildCategoryOptions } from "@/lib/categoryTree";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PendingImage {
  tempId: string;
  url: string;
  alt: string;
  altEn?: string | null;
  altAr?: string | null;
  order: number;
}

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  order: number;
}

interface NewProductFormProps {
  categories: Category[];
}

export function NewProductForm({ categories }: NewProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [editingImage, setEditingImage] = useState<{
    id: string;
    alt: string;
    altEn?: string | null;
    altAr?: string | null;
  } | null>(null);
  const [formData, setFormData] = useState({
    categoryIds: [] as string[],
    name: "",
    nameEn: "",
    nameAr: "",
    area: "-",
    room: "-",
    floor: "-",
    bath: "-",
    height: "-",
    detailContent: "",
    metaDescription: "",
    metaDescriptionEn: "",
    metaDescriptionAr: "",
    isActive: true,
  });
  const categoryOptions = buildCategoryOptions(categories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // detailContent içinden tr/en/ar'ı parse edip ilgili action alanlarına dağıt
      let parsedDetail: {
        descriptions?: Record<string, string>;
        tables?: Record<string, unknown>;
      } = {};
      try {
        parsedDetail = formData.detailContent
          ? JSON.parse(formData.detailContent)
          : {};
      } catch {}

      await createProduct({
        ...formData,
        categoryIds:
          formData.categoryIds.length > 0 ? formData.categoryIds : undefined,
        description: parsedDetail.descriptions?.tr || undefined,
        descriptionEn: parsedDetail.descriptions?.en || undefined,
        descriptionAr: parsedDetail.descriptions?.ar || undefined,
        metaDescription: formData.metaDescription.trim() || undefined,
        metaDescriptionEn: formData.metaDescriptionEn.trim() || undefined,
        metaDescriptionAr: formData.metaDescriptionAr.trim() || undefined,
        pendingImages: pendingImages.map(
          ({ url, alt, altEn, altAr, order }) => ({
            url,
            alt,
            altEn,
            altAr,
            order,
          }),
        ),
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
              altEn: "",
              altAr: "",
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
        altEn: img.altEn,
        altAr: img.altAr,
        order: index,
      })),
    );
  };

  const handleEditPendingAlt = (id: string, currentAlt: string) => {
    const image = pendingImages.find((item) => item.tempId === id);
    setEditingImage({
      id,
      alt: currentAlt,
      altEn: image?.altEn,
      altAr: image?.altAr,
    });
  };

  const handleSavePendingAlt = async (values: {
    alt: string;
    altEn?: string | null;
    altAr?: string | null;
  }) => {
    if (!editingImage) return;

    setPendingImages((prev) =>
      prev.map((img) =>
        img.tempId === editingImage.id ? { ...img, ...values } : img,
      ),
    );
    setEditingImage(null);
    toast.success("Alt metin güncellendi");
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

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nameEn">Ürün Adı (İngilizce)</Label>
                        <Input
                          id="nameEn"
                          value={formData.nameEn}
                          onChange={(e) =>
                            setFormData({ ...formData, nameEn: e.target.value })
                          }
                          placeholder="Product name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nameAr">Ürün Adı (Arapça)</Label>
                        <Input
                          id="nameAr"
                          dir="rtl"
                          value={formData.nameAr}
                          onChange={(e) =>
                            setFormData({ ...formData, nameAr: e.target.value })
                          }
                          placeholder="اسم المنتج"
                        />
                      </div>
                    </div>

                    <hr className="h-[3px] w-full bg-secondary" />

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
                        Ürün kartlarında ve ürün detay sayfası meta
                        etiketlerinde kullanılabilir.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="metaDescriptionEn">
                          Meta Description (İngilizce)
                        </Label>
                        <Textarea
                          id="metaDescriptionEn"
                          value={formData.metaDescriptionEn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              metaDescriptionEn: e.target.value,
                            })
                          }
                          placeholder="Short SEO description in English"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metaDescriptionAr">
                          Meta Description (Arapça)
                        </Label>
                        <Textarea
                          id="metaDescriptionAr"
                          dir="rtl"
                          value={formData.metaDescriptionAr}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              metaDescriptionAr: e.target.value,
                            })
                          }
                          placeholder="وصف قصير للسيو"
                          rows={4}
                        />
                      </div>
                    </div>
                    <hr className="h-[3px] w-full bg-secondary" />

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
                            altEn: img.altEn,
                            altAr: img.altAr,
                            order: img.order,
                          }))}
                          onReorder={handleReorderPendingImages}
                          onDelete={handleDeletePendingImage}
                          onUpload={handleImageUpload}
                          isUploading={isUploading}
                          onEditAlt={handleEditPendingAlt}
                        />
                      </CardContent>
                    </Card>
                    <hr className="h-[3px] w-full bg-secondary" />

                    <div className="space-y-2">
                      <Label>Kategoriler</Label>
                      <div className="flex flex-wrap gap-2">
                        {categoryOptions.map(({ category: cat, depth }) => {
                          const selected = formData.categoryIds.includes(
                            cat.id,
                          );
                          return (
                            <Button
                              key={cat.id}
                              type="button"
                              variant={selected ? "default" : "outline"}
                              onClick={() => toggleCategory(cat.id)}
                              className={
                                selected ? "bg-primary hover:bg-[#3a1924]" : ""
                              }
                            >
                              {depth > 0 ? `${"-- ".repeat(depth)}` : ""}
                              {cat.name}
                            </Button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-slate-500">
                        Birden fazla kategori seçebilirsiniz. İlk seçilen
                        kategori ana kategori olarak kullanılır.
                      </p>
                      {formData.categoryIds.length > 0 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-auto px-0 text-xs text-slate-500 hover:text-slate-700"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              categoryIds: [],
                            }))
                          }
                        >
                          Seçimi temizle
                        </Button>
                      ) : null}
                    </div>

                    {/* TEK editor — TR/EN/AR içinde */}
                    <div className="space-y-2">
                      <Label>Ürün Detay İçeriği</Label>
                      <ProductDetailContentEditor
                        content={formData.detailContent}
                        onChange={(json) =>
                          setFormData({ ...formData, detailContent: json })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
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

          <AltTextEditDialog
            open={!!editingImage}
            onOpenChange={(open) => !open && setEditingImage(null)}
            currentAlt={editingImage?.alt || ""}
            currentAltEn={editingImage?.altEn || ""}
            currentAltAr={editingImage?.altAr || ""}
            onSave={handleSavePendingAlt}
            isLoading={false}
          />
        </main>
      </div>
    </div>
  );
}
