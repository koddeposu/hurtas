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
import {
  updateProject,
  addProjectImage,
  deleteProjectImage,
  updateProjectImagesOrder,
} from "@/actions/projectActions";
import { uploadImage } from "@/actions/uploadActions";
import { toast } from "sonner";
import {
  SortableImageGrid,
  type SortableImage,
} from "@/components/admin/sortable-image-grid";

interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface Project {
  id: string;
  title: string;
  area: string;
  room: string;
  location: string;
  isActive: boolean;
  order: number;
  images: ProjectImage[];
}

export function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<ProjectImage[]>(project.images);
  const [formData, setFormData] = useState({
    title: project.title,
    area: project.area,
    room: project.room,
    location: project.location,
    isActive: project.isActive,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", "projects");

        const result = await uploadImage(fd);
        if (result.error) {
          toast.error(result.error);
          continue;
        }

        if (result.url) {
          const { id } = await addProjectImage(project.id, {
            url: result.url,
            alt: file.name.replace(/\.[^/.]+$/, ""),
            order: images.length,
          });
          setImages((prev) => [
            ...prev,
            { id, url: result.url, alt: file.name, order: prev.length },
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
      await deleteProjectImage(imageId);
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
      await updateProjectImagesOrder(
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProject(project.id, formData);
      toast.success("Proje güncellendi");
      router.push("/admin/projects");
    } catch {
      toast.error("Proje güncellenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Proje Düzenle" description={project.title} />

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
                      images={images}
                      onReorder={handleReorderImages}
                      onDelete={handleDeleteImage}
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
                    "Değişiklikleri Kaydet"
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
