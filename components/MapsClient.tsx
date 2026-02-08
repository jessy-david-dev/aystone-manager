"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MapsClient() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-red-500"
      >
        Carte dynamique de l’instance
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-2 text-amber-50/80"
      >
        Explore la carte interactive ci-dessous ou ouvre-la dans un nouvel onglet.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex justify-end"
      >
        <Link
          href="https://maps.aystone.fr/cobble"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition"
        >
          Ouvrir la carte dans un nouvel onglet
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-4 relative w-full pb-[56.25%] overflow-hidden rounded-2xl border border-white/10"
      >
        <iframe
          src="https://maps.aystone.fr/cobble"
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
          loading="lazy"
          title="Carte Aystone Cobble"
        />
      </motion.div>
    </section>
  );
}
