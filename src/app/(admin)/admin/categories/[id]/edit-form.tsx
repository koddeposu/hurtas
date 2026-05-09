"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { updateCategory } from "@/actions/categoryActions";
import { toast } from "sonner";
import { buildCategoryOptions } from "@/lib/categoryTree";

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  title: string | null;
  description: string | null;
  subtitle: string | null;
  subdescription: string | null;
  order: number;
}

interface EditCategoryFormProps {
  category: Category;
  categories: Category[];
}

export function EditCategoryForm({ category, categories }: EditCategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category.name,
    parentId: category.parentId || "",
    title: category.title || "",
    description: category.description || "",
    subtitle: category.subtitle || "",
    subdescription: category.subdescription || "",
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
        description: formData.description,
        subtitle: formData.subtitle,
        subdescription: formData.subdescription,
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
                  <Label htmlFor="name">Kategori Adı *</Label>
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
                      <option key={option.category.id} value={option.category.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Kategori Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Sayfa üst başlığı"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Kategori Description</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Kategori Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    placeholder="Ürünlerden sonra gösterilecek başlık"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subdescription">Kategori Subdescription</Label>
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

