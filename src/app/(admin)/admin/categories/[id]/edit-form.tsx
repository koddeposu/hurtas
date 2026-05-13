"use client";

import { updateCategory } from "@/actions/categoryActions";
import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildCategoryOptions } from "@/lib/categoryTree";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  title: string | null;
  titleEn: string | null;
  titleAr: string | null;
  description: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  subtitle: string | null;
  subtitleEn: string | null;
  subtitleAr: string | null;
  subdescription: string | null;
  subdescriptionEn: string | null;
  subdescriptionAr: string | null;
  order: number;
}

interface EditCategoryFormProps {
  category: Category;
  categories: Category[];
}

export function EditCategoryForm({
  category,
  categories,
}: EditCategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category.name,
    parentId: category.parentId || "",
    title: category.title || "",
    titleEn: category.titleEn || "",
    titleAr: category.titleAr || "",
    description: category.description || "",
    descriptionEn: category.descriptionEn || "",
    descriptionAr: category.descriptionAr || "",
    subtitle: category.subtitle || "",
    subtitleEn: category.subtitleEn || "",
    subtitleAr: category.subtitleAr || "",
    subdescription: category.subdescription || "",
    subdescriptionEn: category.subdescriptionEn || "",
    subdescriptionAr: category.subdescriptionAr || "",
  });
  const categoryOptions = buildCategoryOptions(categories, category.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateCategory(category.id, {
        name: formData.name,
        parentId: formData.parentId || null,
        title: formData.title,
        titleEn: formData.titleEn,
        titleAr: formData.titleAr,
        description: formData.description,
        descriptionEn: formData.descriptionEn,
        descriptionAr: formData.descriptionAr,
        subtitle: formData.subtitle,
        subtitleEn: formData.subtitleEn,
        subtitleAr: formData.subtitleAr,
        subdescription: formData.subdescription,
        subdescriptionEn: formData.subdescriptionEn,
        subdescriptionAr: formData.subdescriptionAr,
      });
      toast.success("Kategori güncellendi");
      router.push("/admin/categories");
    } catch {
      toast.error("Kategori güncellenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader title="Kategori Düzenle" description={category.name} />

        <main className="p-6">
          <div className="mb-6">
            <Link href="/admin/categories">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kategorilere Dön
              </Button>
            </Link>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Kategori Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="parentId">Üst Kategori</Label>
                  <select
                    id="parentId"
                    value={formData.parentId}
                    onChange={(e) =>
                      setFormData({ ...formData, parentId: e.target.value })
                    }
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <option value="">Ana kategori</option>
                    {categoryOptions.map((option) => (
                      <option
                        key={option.category.id}
                        value={option.category.id}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">url</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Örn: Tek Katlı"
                    required
                  />
                </div>

                <hr className="h-[3px] w-full bg-secondary" />

                <div className="space-y-2">
                  <Label htmlFor="title">Kategori İsmi</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Sayfa üst başlığı"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="titleEn">Kategori İsmi (İngilizce)</Label>
                    <Input
                      id="titleEn"
                      value={formData.titleEn}
                      onChange={(e) =>
                        setFormData({ ...formData, titleEn: e.target.value })
                      }
                      placeholder="Top page title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="titleAr">Kategori İsmi (Arapça)</Label>
                    <Input
                      id="titleAr"
                      dir="rtl"
                      value={formData.titleAr}
                      onChange={(e) =>
                        setFormData({ ...formData, titleAr: e.target.value })
                      }
                      placeholder="عنوان الصفحة"
                    />
                  </div>
                </div>
                <hr className="h-[3px] w-full bg-secondary" />

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Kategori İsmi Üst Açıklama
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Sayfa üst açıklaması"
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="descriptionEn">
                      Kategori İsmi Üst Açıklama (İngilizce)
                    </Label>
                    <Textarea
                      id="descriptionEn"
                      value={formData.descriptionEn}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          descriptionEn: e.target.value,
                        })
                      }
                      placeholder="Top page description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descriptionAr">
                      Kategori İsmi Üst Açıklama (Arapça)
                    </Label>
                    <Textarea
                      id="descriptionAr"
                      dir="rtl"
                      value={formData.descriptionAr}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          descriptionAr: e.target.value,
                        })
                      }
                      placeholder="وصف الصفحة"
                      rows={3}
                    />
                  </div>
                </div>
                <hr className="h-[3px] w-full bg-secondary" />

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Kategori Alt Başlık Açıklama</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    placeholder="Ürünlerden sonra gösterilecek başlık"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subtitleEn">
                      Kategori Alt Başlık Açıklama (İngilizce)
                    </Label>
                    <Input
                      id="subtitleEn"
                      value={formData.subtitleEn}
                      onChange={(e) =>
                        setFormData({ ...formData, subtitleEn: e.target.value })
                      }
                      placeholder="Title shown after products"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitleAr">
                      Kategori Alt Başlık Açıklama (Arapça)
                    </Label>
                    <Input
                      id="subtitleAr"
                      dir="rtl"
                      value={formData.subtitleAr}
                      onChange={(e) =>
                        setFormData({ ...formData, subtitleAr: e.target.value })
                      }
                      placeholder="العنوان بعد المنتجات"
                    />
                  </div>
                </div>
                <hr className="h-[3px] w-full bg-secondary" />

                <div className="space-y-2">
                  <Label htmlFor="subdescription">Kategori Alt Açıklama</Label>
                  <Textarea
                    id="subdescription"
                    value={formData.subdescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subdescription: e.target.value,
                      })
                    }
                    placeholder="Ürünlerden sonra gösterilecek açıklama"
                    rows={4}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subdescriptionEn">
                      Kategori Alt Açıklama (İngilizce)
                    </Label>
                    <Textarea
                      id="subdescriptionEn"
                      value={formData.subdescriptionEn}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subdescriptionEn: e.target.value,
                        })
                      }
                      placeholder="Description shown after products"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subdescriptionAr">
                      Kategori Alt Açıklama (Arapça)
                    </Label>
                    <Textarea
                      id="subdescriptionAr"
                      dir="rtl"
                      value={formData.subdescriptionAr}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subdescriptionAr: e.target.value,
                        })
                      }
                      placeholder="الوصف بعد المنتجات"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
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
                  <Link href="/admin/categories">
                    <Button type="button" variant="outline">
                      İptal
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
