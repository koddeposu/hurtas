import { getProjectsWithImages } from "@/actions/projectActions";
import ProjectsClient from "./projects-client";

export default async function ProjectsPage() {
  const dbProjects = await getProjectsWithImages(true);

  // Transform database format to UI format
  const projects = dbProjects.map((project) => ({
    id: project.id,
    img: project.images.map((img, index) => ({
      src: img.url,
      alt: img.alt?.trim() ? img.alt : `${project.title} - ${index + 1}`,
    })),
    title: project.title,
    area: project.area,
    room: project.room,
    loc: project.location,
  }));

  return <ProjectsClient projects={projects} />;
}
