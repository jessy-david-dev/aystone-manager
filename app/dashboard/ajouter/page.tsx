import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AddProjectForm from "./AddProjectForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ajouter un projet | Dashboard" };

export default async function AddProjectPage() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <section className="mx-auto max-w-xl px-4 py-10">
      <div className="">
        <h1 className="text-xl font-semibold text-red-400">
          Ajouter un projet
        </h1><br />
        <AddProjectForm />
      </div>
    </section>
  );
}