import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import { updateMinecraftName } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Profil | Dashboard" };

export default async function ProfilPage() {
  const session = await auth();
  if (!session) redirect("/");

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });

  return (
    <section className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Profil</h1>

      <div className="card space-y-8">
        {/* avatar Discord */}
        <div className="flex items-center gap-4">
          <Image
            src={session.user?.image ?? ""}
            alt=""
            width={56}
            height={56}
            className="rounded-full"
          />
          <div>
            <p className="text-lg font-semibold">{session.user?.name}</p>
            <p className="text-sm text-white/60">{session.user?.email}</p>
          </div>
        </div>

        {/* pseudo Minecraft */}
        <form action={updateMinecraftName} className="space-y-4">
          <label className="mb-1 block text-sm text-white/70">
            Pseudo Minecraft
          </label>

          <div className="relative w-full max-w-md">
            {user?.mcName && (
              <Image
                src={`https://mc-heads.net/avatar/${user.mcName}/28`}
                alt=""
                width={28}
                height={28}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded"
                unoptimized
              />
            )}

            {/* padding-left 48 px pour laisser la place à l’avatar */}
            <input
              name="mcName"
              defaultValue={user?.mcName ?? ""}
              placeholder="Pseudo MC"
              required
              pattern="[A-Za-z0-9_]{3,16}"
              disabled={Boolean(user?.mcName)}
              className="input pl-12 disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={Boolean(user?.mcName)}
            className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </section>
  );
}
