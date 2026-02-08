import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import StatCard from "./StatCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardHome() {
  const session = await auth();
  if (!session) return redirect("/");

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });

  const joueur = user?.mcName ?? session.user!.name!;

  const [projectCount, userCount] = await Promise.all([
    prisma.project.count({ where: { joueur } }),
    prisma.user.count(),
  ]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Tableau de bord</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="font-semibold text-blue-800">Important</h2>
          <p className="text-blue-700">
            Pensez à compléter votre profil avec votre pseudo Minecraft pour pouvoir créer et associer vos projets à votre compte.
          </p>
            <p className="text-blue-700">
              Vous pouvez mettre qu&apos;une seul fois votre pseudo Minecraft et pas le changer par la suite.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard title="Mes projets" value={projectCount} />
        <StatCard title="Membres inscrits" value={userCount} />
      </div>
    </div>
  );
}