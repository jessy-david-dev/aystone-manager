import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().uuid(),
  joueur: z.string(),
  projet: z.string(),
  description: z.string(),
  coords: z.string().nullable(),
  etat: z.enum(["En cours", "Terminé", "Pause"]),
  monde: z.enum(["Overworld", "Nether", "End"]),
  tags: z.array(z.string()),
  createdAt: z.date().or(z.string().transform((s) => new Date(s))),
});

export type SafeProject = z.infer<typeof projectSchema>;