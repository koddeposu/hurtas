"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Loader2, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { DeleteProjectButton } from "./delete-button";
import { updateProjectsOrder } from "@/actions/projectActions";
import {
  SortableTableWrapper,
  SortableRow,
  useSortableTable,
  SortableItem,
} from "@/components/admin/sortable-table";
import { toast } from "sonner";

interface Project extends SortableItem {
  id: string;
  title: string;
  slug: string;
  area: string;
  room: string;
  location: string;
  isActive: boolean;
  order: number;
}

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({
  projects: initialProjects,
}: ProjectsClientProps) {
  const [isPending, startTransition] = useTransition();
  const {
    items: projects,
    isEditMode,
    hasChanges,
    handleOrderChange,
    startEditMode,
    cancelEditMode,
    setIsEditMode,
    setHasChanges,
    getOrderedItems,
  } = useSortableTable(initialProjects);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateProjectsOrder(getOrderedItems());
        toast.success("Sıralama kaydedildi");
        setIsEditMode(false);
        setHasChanges(false);
      } catch {
        toast.error("Sıralama kaydedilemedi");
      }
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-600">Toplam {projects.length} proje</p>
        <div className="flex gap-2">
          {isEditMode ? (
            <>
              <Button variant="outline" onClick={cancelEditMode}>
                İptal
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isPending}
                className="bg-primary hover:bg-[#3a1924]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  "Kaydet"
                )}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={startEditMode}>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sırayı düzenle
              </Button>
              <Link href="/admin/projects/new">
                <Button className="bg-primary hover:bg-[#3a1924]">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Proje
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <SortableTableWrapper
        items={projects}
        isEditMode={isEditMode}
        onOrderChange={handleOrderChange}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {isEditMode && <TableHead className="w-10"></TableHead>}
                  <TableHead>Başlık</TableHead>
                  <TableHead>Konum</TableHead>
                  <TableHead>Alan</TableHead>
                  <TableHead>Oda</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={isEditMode ? 7 : 6}
                      className="text-center py-8 text-slate-500"
                    >
                      Henüz proje eklenmemiş
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <SortableRow key={project.id} id={project.id}>
                      <TableCell className="font-medium">
                        {project.title}
                      </TableCell>
                      <TableCell>{project.location}</TableCell>
                      <TableCell>{project.area}</TableCell>
                      <TableCell>{project.room}</TableCell>
                      <TableCell>
                        <Badge
                          variant={project.isActive ? "default" : "secondary"}
                        >
                          {project.isActive ? "Aktif" : "Pasif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/projects/${project.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isEditMode}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteProjectButton
                            id={project.id}
                            title={project.title}
                            disabled={isEditMode}
                          />
                        </div>
                      </TableCell>
                    </SortableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </SortableTableWrapper>
    </>
  );
}
