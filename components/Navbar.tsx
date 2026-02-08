/* components/Navbar.tsx */
"use client";

import McSplash from "@/components/McSplash";
import RedstoneParticles from "@/components/RedstoneParticles";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Home,
  Info,
  MapPin,
  Megaphone,
  Menu,
  X,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Accueil", href: "/", Icon: Home },
  { name: "Wiki Aystone", href: "https://wiki.aystone.fr", Icon: BookOpen },
  { name: "BlueMap", href: "/maps", Icon: MapPin },
  { name: "Espace Publicitaire", href: "/ads", Icon: Megaphone },
  { name: "Outils", href: "/outils", Icon: Info },
  { name: "À Propos", href: "/a-propos", Icon: Info },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 text-amber-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#18181b]/80 backdrop-blur-md shadow-md"
          : "bg-[#18181b]"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="min-w-[130px]">
          <McSplash />
        </div>

        <Link href="/" className="flex items-center gap-2 relative">
          <Image
            src="/aystone.png"
            alt="Logo Aystone"
            width={32}
            height={32}
            priority
          />
          <span className="text-red-600 relative font-extrabold text-lg flex items-center gap-1">
            Aystone
            <RedstoneParticles
              className="absolute -left-1 top-0 h-full w-full z-0"
              density={15}
              maxRadius={2}
            />
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map(({ name, href, Icon }) => (
            <li key={name} className="flex items-center gap-1">
              <Icon size={14} aria-hidden="true" />
              <Link href={href} className="hover:text-red-400">
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {!session ? (
          <button
            onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
            className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-sm font-medium shadow hover:opacity-90"
          >
            Se connecter
          </button>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "avatar"}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}

            <Link
              href="/dashboard"
              className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium hover:bg-green-700"
            >
              Dashboard
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full bg-red-600 px-3 py-2 text-sm font-medium hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>
        )}

        <button
          className="md:hidden flex items-center"
          onClick={() => setOpen((p) => !p)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden flex flex-col gap-4 bg-[#0e0e10] px-6 pb-6"
          >
            {navLinks.map(({ name, href, Icon }) => (
              <li
                key={name}
                className="flex items-center gap-2 border-b border-white/10 py-2"
              >
                <Icon size={16} aria-hidden="true" />
                <Link href={href} onClick={() => setOpen(false)}>
                  {name}
                </Link>
              </li>
            ))}

            {!session ? (
              <li>
                <button
                  onClick={() =>
                    signIn("discord", { callbackUrl: "/dashboard" })
                  }
                  className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium"
                >
                  Se connecter
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-md bg-green-600 py-2 text-center text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full rounded-md bg-red-600 py-2 text-sm font-medium"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
