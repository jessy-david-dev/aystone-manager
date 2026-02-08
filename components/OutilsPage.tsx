"use client";

import { motion } from "framer-motion";
import { BookText, ExternalLink, Map, Users, Wrench } from "lucide-react";

const outils = [
  {
    label: "Wiki Aystone",
    href: "https://wiki.aystone.fr/",
    icon: Map,
    description: "Wiki du serveur Minecraft Aystone.",
  },
  {
    label: "DynMap",
    href: "/maps",
    icon: Map,
    description: "Carte dynamique de l'instance Cobble.",
  },
  {
    label: "Liste Colorants Minecraft",
    href: "/couleurs",
    icon: BookText,
    description: "Charte des couleurs Minecraft pour les colorants.",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BookText,
    description: "Tableau de bord pour gérer vos projets.",
  },
  {
    label: "Discord d'Aypierre",
    href: "https://discord.gg/aypierre",
    icon: Users,
    description: "Rejoignez la communauté d'aypierre pour discuter avec nous ! :)",
  },
  {
    label: "Espace Publicitaire",
    href: "/ads",
    icon: Users,
    description: "Espace des publicités (Merci Terrone1 pour les pubs :p)",
  },
];

export default function OutilsPage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-amber-50 px-4 sm:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-center text-4xl sm:text-5xl font-extrabold mb-14 flex items-center justify-center gap-3 text-amber-50">
          <Wrench className="text-red-500" size={36} />
          Outils & Liens Utiles
        </h1>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {outils.map((outil, i) => (
          <motion.a
            key={outil.label}
            href={outil.href}
            target={outil.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-[#1a1c2a] hover:bg-[#252735] border border-white/10 hover:border-red-500 transition-colors rounded-2xl p-5 flex flex-col gap-3 shadow-lg group"
          >
            <div className="flex items-center gap-2 text-red-400">
              <outil.icon size={22} className="group-hover:text-red-400 transition" />
              <span className="text-lg font-semibold text-blue-400 group-hover:underline flex items-center gap-1">
                {outil.label}
                <ExternalLink size={14} />
              </span>
            </div>
            <p className="text-sm text-amber-50/70">{outil.description}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
