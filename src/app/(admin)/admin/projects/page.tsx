import { requireAuth } from "@/lib/requireAuth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { getProjects } from "@/actions/projectActions";
import { DeleteProjectButton } from "./delete-button";

export default async function ProjectsPage() {
  const session = await requireAuth();
  const projects = await getProjects();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader
          title="Projeler"
          description="Tamamlanan projeleri yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">Toplam {projects.length} proje</p>
            <Link href="/admin/projects/new">
              <Button className="bg-primary hover:bg-[#3a1924]">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Proje
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
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
                        colSpan={6}
                        className="text-center py-8 text-slate-500"
                      >
                        Henüz proje eklenmemiş
                      </TableCell>
                    </TableRow>
                  ) : (
                    projects.map((project) => (
                      <TableRow key={project.id}>
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
                              <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <DeleteProjectButton
                              id={project.id}
                              title={project.title}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
