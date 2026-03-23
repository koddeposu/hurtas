import { requireAuth } from "@/lib/requireAuth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { getProjects } from "@/actions/projectActions";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const session = await requireAuth();
  const projects = await getProjects();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader
          title="Projeler"
          description="Tamamlanan projeleri yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <ProjectsClient projects={projects} />
        </main>
      </div>
    </div>
  );
}

