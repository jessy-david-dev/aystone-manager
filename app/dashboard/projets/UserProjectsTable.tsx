"use client";

import { SafeProject } from "@/lib/validators/project";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  FileText,
  Globe,
  MapPin,
  Pencil,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default function UserProjectsTable({ projects }: { projects: SafeProject[] }) {
  const headers = [
    { label: "Projet", icon: FileText },
    { label: "État", icon: BadgeCheck },
    { label: "Monde", icon: Globe },
    { label: "Coordonnées", icon: MapPin },
    { label: "Tags", icon: Tag },
    { label: "Actions", icon: Pencil },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-2xl font-bold text-amber-50">Mes projets</h1>
        <Link
          href="/dashboard/ajouter"
          className="inline-flex items-center gap-2 rounded bg-green-600 px-3 py-1.5 text-sm font-medium hover:bg-green-700"
        >
          ➕ Ajouter un projet
        </Link>
      </motion.div>

      {projects.length === 0 ? (
        <p className="mt-6 text-center text-amber-50/60">Vous n’avez encore créé aucun projet.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="overflow-x-auto rounded-t-2xl"
        >
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="bg-slate-800 text-amber-50 [&>th:first-child]:rounded-tl-xl [&>th:last-child]:rounded-tr-xl">
                {headers.map(({ label, icon: Icon }) => (
                  <th key={label} className="px-3 py-2 font-semibold">
                    <div className="flex items-center gap-1">
                      <Icon size={14} className="opacity-70" />
                      {label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="bg-[#0f111c]">
                  <td className="px-3 py-2">{p.projet}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      p.etat === "En cours" ? "bg-yellow-400/90 text-black" :
                      p.etat === "Terminé" ? "bg-green-600/90" : "bg-red-600/90"
                    }`}>{p.etat}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] ${
                      p.monde === "Overworld" ? "bg-emerald-700/80" :
                      p.monde === "Nether" ? "bg-red-700/80" : "bg-violet-800/90"
                    }`}>{p.monde}</span>
                  </td>
                  <td className="px-3 py-2 font-mono tabular-nums">{p.coords ?? "—"}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((t, i) => (
                        <span key={t + i} className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/dashboard/projets/${p.id}`}
                      className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-indigo-400 hover:bg-white/10"
                    >
                      <Pencil size={12} /> Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </section>
  );
}
