import Banner from "@/components/Banner";
import ProjectsTable, { Project } from "@/components/ProjectsTable";
import { prisma } from "@/lib/prisma";
import MotionHeading from "../components/MotionHeading";

export const dynamic = "force-dynamic";

export default async function Home() {
  const rawProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  const projects: Project[] = rawProjects.map((p) => ({
    id: p.id,
    joueur: p.joueur,
    etat: p.etat as Project["etat"],
    monde: p.monde as Project["monde"],
    projet: p.projet,
    description: p.description,
    coords: p.coords ?? "",
    tags: p.tags,
  }));

  return (
    <>
      <Banner />
      <MotionHeading />
      <ProjectsTable data={projects} />
    </>
  );
}