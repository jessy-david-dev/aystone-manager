"use client";

import { motion } from "framer-motion";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <div className="mb-4 flex justify-center">
          <Frown className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-amber-50 mb-2">404 — Page introuvable</h1>
        <p className="text-amber-50/70 mb-6">
          La page que tu cherches n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-amber-50 transition hover:bg-red-600"
        >
          Retour à l&apos;accueil
        </Link>
      </motion.div>
    </div>
  );
}
