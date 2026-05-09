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
import {
  updateProduct,
  addProductImage,
  deleteProductImage,
  updateProductImagesOrder,
  updateProductImageAlt,
} from "@/actions/productActions";
import { uploadImage } from "@/actions/uploadActions";
import { toast } from "sonner";
import {
  SortableImageGrid,
  type SortableImage,
} from "@/components/admin/sortable-image-grid";
import { AltTextEditDialog } from "@/components/admin/alt-text-edit-dialog";
import { ProductDetailContentEditor } from "@/components/admin/product-detail-content-editor";
import {
  hasProductDetailContent,
  toProductDetailContentJson,
} from "@/lib/productDetailContent";
import { buildCategoryOptions } from "@/lib/categoryTree";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface Product {
  id: string;
  categoryId: string | null;
  categoryIds?: string[];
  name: string;
  slug: string;
  area: string;
  room: string;
  floor: string;
  bath: string;
  height: string;
  price: string | null;
  oldPrice: string | null;
  description: string | null;
  metaDescription: string | null;
  isActive: boolean;
  order: number;
  images: ProductImage[];
}

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  order: number;
}

interface EditProductFormProps {
  product: Product;
  categories: Category[];
}

export function EditProductForm({ product, categories }: EditProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<ProductImage[]>(product.images);
  const [editingImage, setEditingImage] = useState<{
    id: string;
    alt: string;
  } | null>(null);
  const [isUpdatingAlt, setIsUpdatingAlt] = useState(false);
  const [formData, setFormData] = useState({
    categoryIds:
      product.categoryIds && product.categoryIds.length > 0
        ? product.categoryIds
        : product.categoryId
          ? [product.categoryId]
          : [],
    name: product.name,
    area: product.area,
    room: product.room,
    floor: product.floor,
    bath: product.bath,
    height: product.height,
    description: toProductDetailContentJson(product.description || ""),
    metaDescription: product.metaDescription || "",
    isActive: product.isActive,
  });
  const categoryOptions = buildCategoryOptions(categories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProduct(product.id, {
        ...formData,
        categoryIds: formData.categoryIds,
        description: hasProductDetailContent(formData.description)
          ? formData.description
          : null,
        metaDescription: formData.metaDescription.trim() || null,
      });
      toast.success("Ürün güncellendi");
      router.push("/admin/products");
    } catch {
      toast.error("Ürün güncellenirken hata oluştu");
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
          const imageAlt = file.name.replace(/\.[^/.]+$/, "");
          const { id } = await addProductImage(product.id, {
            url: result.url,
            alt: imageAlt,
            order: images.length,
          });
          setImages([
            ...images,
            { id, url: result.url, alt: imageAlt, order: images.length },
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

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteProductImage(imageId);
      setImages(images.filter((img) => img.id !== imageId));
      toast.success("Görsel silindi");
    } catch {
      toast.error("Görsel silinirken hata oluştu");
    }
  };

  const handleReorderImages = async (reorderedImages: SortableImage[]) => {
    const previousImages = [...images];
    setImages(reorderedImages);

    try {
      await updateProductImagesOrder(
        reorderedImages.map((img, index) => ({
          id: img.id,
          order: index,
        }))
      );
      toast.success("Sıralama kaydedildi");
    } catch {
      setImages(previousImages);
      toast.error("Sıralama kaydedilemedi");
    }
  };

  const handleEditAlt = (id: string, currentAlt: string) => {
    setEditingImage({ id, alt: currentAlt });
  };

  const handleSaveAlt = async (newAlt: string) => {
    if (!editingImage) return;
    setIsUpdatingAlt(true);
    try {
      await updateProductImageAlt(editingImage.id, newAlt);
      setImages(
        images.map((img) =>
          img.id === editingImage.id ? { ...img, alt: newAlt } : img
        )
      );
      toast.success("Alt metin güncellendi");
      setEditingImage(null);
    } catch {
      toast.error("Alt metin güncellenemedi");
    } finally {
      setIsUpdatingAlt(false);
    }
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
        <AdminHeader title="Ürün Düzenle" description={product.name} />

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
                        required
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

                    <div className="space-y-2">
                      <Label>Kategoriler</Label>
                      <div className="flex flex-wrap gap-2">
                        {categoryOptions.map(({ category: cat, depth }) => {
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
                              {depth > 0 ? `${"-- ".repeat(depth)}` : ""}
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
                      <Label htmlFor="description">Ürün Detay İçeriği</Label>
                      <ProductDetailContentEditor
                        content={formData.description}
                        onChange={(json) =>
                          setFormData({
                            ...formData,
                            description: json,
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Görseller</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SortableImageGrid
                      images={images}
                      onReorder={handleReorderImages}
                      onDelete={handleDeleteImage}
                      onUpload={handleImageUpload}
                      isUploading={isUploading}
                      onEditAlt={handleEditAlt}
                    />
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
                    "Değişiklikleri Kaydet"
                  )}
                </Button>
              </div>
            </div>
          </form>

          <AltTextEditDialog
            open={!!editingImage}
            onOpenChange={(open) => !open && setEditingImage(null)}
            currentAlt={editingImage?.alt || ""}
            onSave={handleSaveAlt}
            isLoading={isUpdatingAlt}
          />
        </main>
      </div>
    </div>
  );
}

