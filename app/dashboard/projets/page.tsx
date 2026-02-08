import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import UserProjectsTable from "./UserProjectsTable";

// Définition stricte du schéma
const ProjectSchema = z.object({
  id: z.string(),
  joueur: z.string(),
  projet: z.string(),
  description: z.string(),
  coords: z.string().nullable(),
  tags: z.string().array(),
  etat: z.enum(["En cours", "Terminé", "Pause"]),
  monde: z.enum(["Overworld", "Nether", "End"]),
  createdAt: z.date(),
});

export const dynamic = "force-dynamic";

export default async function UserProjectsPage() {
  const session = await auth();
  if (!session) redirect("/");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  const joueur = user?.mcName ?? session.user.name!;

  const projectsRaw = await prisma.project.findMany({
    where: { joueur },
    orderBy: { createdAt: "desc" },
  });

  // ✅ Valide les projets pour forcer le bon typage
  const projects = projectsRaw.map((p) => ProjectSchema.parse(p));

  return <UserProjectsTable projects={projects} />;
}
