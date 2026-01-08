import { requireAuth } from "@/lib/requireAuth";
import { getProjectByIdWithImages } from "@/actions/projectActions";
import { notFound } from "next/navigation";
import { EditProjectForm } from "./edit-form";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  await requireAuth();
  const { id } = await params;
  const project = await getProjectByIdWithImages(id);

  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}
