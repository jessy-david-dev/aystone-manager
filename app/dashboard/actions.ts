"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(form: FormData) {
  const session = await auth();
  if (!session) throw new Error("unauth");

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });

  const joueur =
    (form.get("joueur") as string | null)?.trim() ||
    currentUser?.mcName ||
    session.user!.name!;

  const coords = form.get("coords")?.toString().trim();
  const tagsRaw = form.get("tags")?.toString() ?? "";

  const data = {
    joueur,
    etat: (form.get("etat") as string) ?? "En cours",
    monde: (form.get("monde") as string) ?? "Overworld",
    projet: (form.get("projet") as string).trim(),
    description: (form.get("description") as string).trim(),
    coords: coords && coords.length > 0 ? coords : null,
    tags: tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };

  await prisma.project.create({ data });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProject(projectId: string, form: FormData) {
  const session = await auth();
  if (!session) throw new Error("unauth");

  const coords = form.get("coords")?.toString().trim();
  const tagsRaw = form.get("tags")?.toString() ?? "";

  const data = {
    etat: (form.get("etat") as string),
    monde: (form.get("monde") as string),
    projet: (form.get("projet") as string).trim(),
    description: (form.get("description") as string).trim(),
    coords: coords && coords.length > 0 ? coords : null,
    tags: tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };

  await prisma.project.update({
    where: { id: projectId },
    data,
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateMinecraftName(form: FormData) {
  const session = await auth();
  if (!session) throw new Error("unauth");

  const mcName = (form.get("mcName") as string).trim();
  if (!/^[A-Za-z0-9_]{3,16}$/.test(mcName)) throw new Error("invalid");

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        email: session.user!.email!,
        name: session.user!.name,
        image: session.user!.image,
        mcName,
      },
    });
  } else {
    if (user.mcName) {
      throw new Error("Le pseudo Minecraft ne peut pas être modifié après avoir été défini.");
    }

    await prisma.user.update({
      where: { email: session.user!.email! },
      data: { mcName },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/");
}
