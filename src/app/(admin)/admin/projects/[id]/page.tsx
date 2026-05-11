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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <EditProjectForm project={project as any} />;
}
