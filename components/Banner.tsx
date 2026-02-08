"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="w-full bg-[#0e0e10] flex justify-center py-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <div className="transition-transform duration-300 hover:scale-105">
          <Image
            src="/aystone-saison2.png"
            alt="Aystone Saison 2"
            priority
            className="w-full h-auto select-none"
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
            width={512}
            height={200}
          />
        </div>
      </motion.div>
    </section>
  );
}