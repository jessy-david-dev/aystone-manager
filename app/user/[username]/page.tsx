import Banner from "@/components/Banner";
import ProjectsTable, { Project } from "@/components/ProjectsTable";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {

  const username = params.username;
  const user = await prisma.user.findUnique({
    where: { mcName: username },
  });
  if (!user) return notFound();

  const rawProjects = await prisma.project.findMany({
    where: { joueur: username },
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
    <section className="p-4">
       <Banner />
      <h1 className="text-2xl font-bold text-amber-50 text-center">
        Projets de <span className="text-yellow-300">{username}</span>
      </h1>

      {projects.length === 0 ? (
        <p className="mt-4 text-amber-50/60">Aucun projet enregistré.</p>
      ) : (
        <ProjectsTable data={projects} hidePlayerFilter />
      )}
    </section>
  );
}
