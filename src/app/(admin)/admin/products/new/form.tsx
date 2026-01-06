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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createProduct } from "@/actions/productActions";
import { toast } from "sonner";

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
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    area: "",
    room: "",
    floor: "1",
    bath: "1",
    height: "2.5",
    price: "",
    oldPrice: "",
    description: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createProduct({
        ...formData,
        categoryId: formData.categoryId || undefined,
        price: formData.price || undefined,
        oldPrice: formData.oldPrice || undefined,
        description: formData.description || undefined,
      });
      toast.success("Ürün oluşturuldu");
      router.push("/admin/products");
    } catch {
      toast.error("Ürün oluşturulurken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
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

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Kategori</Label>
                        <Select
                          value={formData.categoryId}
                          onValueChange={(value) =>
                            setFormData({ ...formData, categoryId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Açıklama</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Ürün hakkında detaylı bilgi"
                        rows={4}
                      />
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

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-[#3a1924]"
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

                <p className="text-xs text-slate-500 text-center">
                  Görselleri ürün oluşturduktan sonra ekleyebilirsiniz
                </p>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
