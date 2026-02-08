"use client";

import { motion } from "framer-motion";

export default function McSplash() {
  return (
    <motion.span
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: -15 }}
      transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.3 }}
      className="
      pointer-events-none absolute left-4
      top-1/2 -translate-y-1/2
      -rotate-[3deg]
      select-none whitespace-nowrap
      text-[clamp(12px,3vw,18px)] font-extrabold italic
      text-yellow-300 drop-shadow-[2px_2px_0_#000]
    "
    >
      Instance&nbsp;Cobble
    </motion.span>
  );
}