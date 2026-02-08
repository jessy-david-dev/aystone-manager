"use client";

import { motion } from "framer-motion";
import {
  AlignLeft,
  BadgeCheck,
  Check,
  Copy,
  FileText,
  Globe,
  MapPin,
  Tag,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type Project = {
  id?: string;
  joueur: string;
  etat: "En cours" | "Terminé" | "Pause";
  monde: "Overworld" | "Nether" | "End";
  projet: string;
  description: string;
  coords: string;
  tags: string[];
};

export default function ProjectTable({
  data,
  hidePlayerFilter = false,
}: {
  data: Project[];
  hidePlayerFilter?: boolean;
}) {
  const [copied, setCopied] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [etat, setEtat] = useState("");
  const [monde, setMonde] = useState("");
  const [joueur, setJoueur] = useState("");

  const filtered = useMemo(() => {
    return data.filter((p) => {
      const matchesSearch = p.projet.toLowerCase().includes(search.toLowerCase());
      const matchesEtat = etat ? p.etat === etat : true;
      const matchesMonde = monde ? p.monde === monde : true;
      const matchesJoueur = hidePlayerFilter ? true : joueur ? p.joueur === joueur : true;
      return matchesSearch && matchesEtat && matchesMonde && matchesJoueur;
    });
  }, [data, search, etat, monde, joueur, hidePlayerFilter]);

  const joueurs = [...new Set(data.map((p) => p.joueur))];
  const etats = ["En cours", "Terminé", "Pause"];
  const mondes = ["Overworld", "Nether", "End"];

  const headers = [
    { label: "Joueur", icon: User },
    { label: "État", icon: BadgeCheck },
    { label: "Monde", icon: Globe },
    { label: "Projet", icon: FileText },
    { label: "Description", icon: AlignLeft },
    { label: "Coordonnées", icon: MapPin },
    { label: "Tags", icon: Tag },
  ];

function resolveWorldId(monde: Project["monde"]): string {
  switch (monde) {
    case "Overworld":
      return "world";
    case "Nether":
      return "world_nether";
    case "End":
      return "world_the_end";
    default:
      return "world"; // fallback
  }
}


  if (!data.length) {
    return <p className="mt-8 text-center text-amber-50/60">Aucun projet enregistré pour le moment.</p>;
  }

  return (
    <div className="w-full overflow-x-auto px-2 sm:px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-sm text-amber-50 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {!hidePlayerFilter && (
            <select
              value={joueur}
              onChange={(e) => setJoueur(e.target.value)}
              className="rounded-md bg-slate-800 text-amber-50 px-3 py-1 text-sm"
            >
              <option value="">Tous les joueurs</option>
              {joueurs.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          )}
          <select
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
            className="rounded-md bg-slate-800 text-amber-50 px-3 py-1 text-sm"
          >
            <option value="">Tous les états</option>
            {etats.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          <select
            value={monde}
            onChange={(e) => setMonde(e.target.value)}
            className="rounded-md bg-slate-800 text-amber-50 px-3 py-1 text-sm"
          >
            <option value="">Tous les mondes</option>
            {mondes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="overflow-auto rounded-xl border border-white/10">
          <table className="min-w-[1100px] w-full text-sm text-amber-50">
            <thead className="bg-slate-800 text-amber-50">
              <tr>
                {headers.map(({ label, icon: Icon }) => (
                  <th key={label} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Icon size={14} className="opacity-70" />
                      {label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id ?? i} className="border-t border-white/10 hover:bg-white/5">
                  <Td>
                    <div className="flex items-center gap-2">
                      <Image
                        src={`https://mc-heads.net/avatar/${p.joueur}/20`}
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                        className="rounded"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                      />
                      {hidePlayerFilter ? (
                        <span className="text-amber-50/80">{p.joueur}</span>
                      ) : (
                        <Link
                          href={`/user/${p.joueur}`}
                          className="text-blue-400 hover:underline hover:text-blue-300 transition"
                        >
                          {p.joueur}
                        </Link>
                      )}
                    </div>
                  </Td>
                  <Td><EtatBadge v={p.etat} /></Td>
                  <Td><MondeBadge v={p.monde} /></Td>
                  <Td className="font-medium">{p.projet}</Td>
                  <Td>
                    <div className="max-h-[100px] overflow-auto whitespace-pre-line text-amber-50/80 break-words">
                      {p.description}
                    </div>
                  </Td>
                  <Td>
                    <div className="flex justify-between items-start gap-2 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono tabular-nums">{p.coords}</span>
                        {p.coords && (
                          <a
                            href={`https://maps.aystone.fr/cobble/#${resolveWorldId(p.monde)}:${p.coords.replace(/ /g, ":")}:1500:0:0:0:0:free`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center w-[70px] text-[11px] font-medium rounded-full px-2 py-0.5 border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition"
                          >
                            DynMap
                          </a>
                        )}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          navigator.clipboard.writeText(p.coords);
                          setCopied(i);
                          setTimeout(() => setCopied(null), 1200);
                        }}
                        className="grid h-7 w-7 flex-shrink-0 place-items-center rounded bg-white/10 hover:bg-white/20"
                      >
                        {copied === i ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </motion.button>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex gap-1 overflow-x-auto max-w-xs whitespace-nowrap pr-1">
                      {p.tags.map((t, idx) => <TagBadge key={t + idx} v={t} />)}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-top">{children}</td>;
}

function EtatBadge({ v }: { v: Project["etat"] }) {
  const cls = v === "En cours"
    ? "bg-yellow-400/90 text-black"
    : v === "Terminé"
    ? "bg-green-600/90"
    : "bg-red-600/90";
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${cls}`}>{v}</span>;

}

function MondeBadge({ v }: { v: Project["monde"] }) {
  const map = {
    Overworld: "bg-emerald-700/80",
    Nether: "bg-red-700/80",
    End: "bg-violet-800/90",
  } as const;
  return <span className={`rounded-full px-2 py-0.5 text-[11px] ${map[v]}`}>{v}</span>;
}

function TagBadge({ v }: { v: string }) {
  const palette: Record<string, string> = {
    spawn: "bg-fuchsia-700/90",
    build: "bg-emerald-700/90",
    usine: "bg-orange-600/90",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[11px] ${palette[v] ?? "bg-slate-800/70"}`}>{v}</span>;
}
