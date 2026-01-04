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
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { createProject } from "@/actions/projectActions";
import { uploadImage } from "@/actions/uploadActions";
import { toast } from "sonner";
import Image from "next/image";

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    area: "",
    room: "",
    location: "",
    imageAlt: "",
    isActive: true,
    order: 0,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "projects");

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
      toast.error("Lütfen bir görsel yükleyin");
      return;
    }
    setIsLoading(true);

    try {
      await createProject({
        ...formData,
        imageUrl,
      });
      toast.success("Proje oluşturuldu");
      router.push("/admin/projects");
    } catch {
      toast.error("Proje oluşturulurken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
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
                    <CardTitle>Görsel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {imageUrl ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                        <Image
                          src={imageUrl}
                          alt="Proje görseli"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#49202d] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                      {isUploading ? (
                        <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-slate-400 mb-2" />
                          <span className="text-sm text-slate-500">
                            {imageUrl ? "Görseli Değiştir" : "Görsel Yükle"}
                          </span>
                        </>
                      )}
                    </label>
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
