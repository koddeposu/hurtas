"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createProject } from "@/actions/projectActions";
import { uploadImage } from "@/actions/uploadActions";
import { toast } from "sonner";
import {
  SortableImageGrid,
  type SortableImage,
} from "@/components/admin/sortable-image-grid";

interface PendingImage {
  tempId: string;
  url: string;
  alt: string;
  order: number;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    area: "",
    room: "",
    location: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createProject({
        ...formData,
        pendingImages: pendingImages.map(({ url, alt, order }) => ({
          url,
          alt,
          order,
        })),
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
        </main>
      </div>
    </div>
  );
}

