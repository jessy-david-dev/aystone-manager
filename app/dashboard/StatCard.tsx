"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon?: ReactNode;
};

export default function StatCard({ title, value, icon }: Props) {
  return (
    <motion.div
      whileHover={{ translateY: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
      className="relative rounded-lg bg-white/5 p-6 backdrop-blur
                 ring-1 ring-white/10 transition"
    >
      {icon && (
        <div className="absolute -top-4 right-4 text-4xl opacity-20">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-medium text-amber-50/70">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-amber-50">{value}</p>
    </motion.div>
  );
}