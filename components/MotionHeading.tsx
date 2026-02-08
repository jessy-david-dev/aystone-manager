"use client";

import RedstoneParticles from "@/components/RedstoneParticles";
import { motion } from "framer-motion";

export default function MotionHeading() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
      className="flex justify-center py-8"
    >
      <span className="relative inline-block">
        <h2
          className="text-4xl sm:text-5xl font-extrabold leading-snug pb-1
                     bg-gradient-to-r from-red-600 via-orange-500 to-red-600
                     bg-clip-text text-transparent"
        >
          Tableau des projets
        </h2>
        <RedstoneParticles className="absolute inset-0" density={15} maxRadius={2} />
      </span>
    </motion.section>
  );
}