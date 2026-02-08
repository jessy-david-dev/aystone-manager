"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-[#18181b] py-6 text-center text-sm text-amber-50/80"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4">
        <p>
          © 2025 Aystone Instance Cobble — Projet non affilié à Mojang/Microsoft
        </p>
        <p className="flex items-center gap-1">
          Réalisé avec
          <Heart size={14} className="text-red-500" aria-label="coeur" />
          par
          <Link href="https://ultralion.xyz" className="font-semibold text-indigo-400 hover:underline">
            UltraLion
          </Link>
        </p>
      </div>
    </motion.footer>
  );
}
