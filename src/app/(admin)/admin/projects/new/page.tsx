"use client";

import { createProject } from "@/actions/projectActions";
import { uploadImage } from "@/actions/uploadActions";
import { AltTextEditDialog } from "@/components/admin/alt-text-edit-dialog";
import { AdminHeader } from "@/components/admin/header";
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

export default function NewProjectPage() {
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
    title: "",
    titleEn: "",
    titleAr: "",
    area: "",
    room: "",
    location: "",
    locationEn: "",
    locationAr: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createProject({
        ...formData,
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
      toast.success("Proje oluşturuldu");
      router.push("/admin/projects");
    } catch {
      toast.error("Proje oluşturulurken hata oluştu");
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
        formData.append("folder", "projects");

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

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader title="Yeni Proje" description="Yeni bir proje ekleyin" />

        <main className="p-6">
          <div className="mb-6">
            <Link href="/admin/projects">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Projelere Dön
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Proje Bilgileri</CardTitle>
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
                        placeholder="Örn: Sapanca Modern Villa"
                        required
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="titleEn">Başlık (İngilizce)</Label>
                        <Input
                          id="titleEn"
                          value={formData.titleEn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              titleEn: e.target.value,
                            })
                          }
                          placeholder="Project title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="titleAr">Başlık (Arapça)</Label>
                        <Input
                          id="titleAr"
                          dir="rtl"
                          value={formData.titleAr}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              titleAr: e.target.value,
                            })
                          }
                          placeholder="عنوان المشروع"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="area">Alan *</Label>
                        <Input
                          id="area"
                          value={formData.area}
                          onChange={(e) =>
                            setFormData({ ...formData, area: e.target.value })
                          }
                          placeholder="145m²"
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
                          placeholder="3+1"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Konum *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          placeholder="Sakarya"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="locationEn">Konum (İngilizce)</Label>
                        <Input
                          id="locationEn"
                          value={formData.locationEn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              locationEn: e.target.value,
                            })
                          }
                          placeholder="Location"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="locationAr">Konum (Arapça)</Label>
                        <Input
                          id="locationAr"
                          dir="rtl"
                          value={formData.locationAr}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              locationAr: e.target.value,
                            })
                          }
                          placeholder="الموقع"
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
                    "Proje Oluştur"
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
