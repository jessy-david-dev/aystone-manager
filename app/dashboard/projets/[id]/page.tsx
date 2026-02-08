import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import EditProjectForm from "./EditProjectForm";

type Props = { params: { id: string } };

// Définition stricte du schéma
const ProjectSchema = z.object({
  id: z.string(),
  joueur: z.string(),
  projet: z.string(),
  description: z.string(),
  coords: z.string().nullable().transform((val) => val ?? ""),
  tags: z.string().array(),
  etat: z.enum(["En cours", "Terminé", "Pause"]),
  monde: z.enum(["Overworld", "Nether", "End"]),
  createdAt: z.date(),
});

export default async function EditProjectPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/");

  const data = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!data) notFound();

  // ✅ Cast via zod
  const project = ProjectSchema.parse(data);

  return (
    <section className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Modifier le projet</h1>
      <EditProjectForm project={project} />
    </section>
  );
}
