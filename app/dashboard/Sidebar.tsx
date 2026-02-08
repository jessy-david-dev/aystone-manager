"use client";

import {
  LayoutDashboard,
  PlusCircle,
  TableProperties,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { name: "Tableau",     href: "/dashboard",         icon: LayoutDashboard },
  { name: "Profil",      href: "/dashboard/profil",  icon: User },
  { name: "Ajouter",     href: "/dashboard/ajouter", icon: PlusCircle },
  { name: "Mes Projets", href: "/dashboard/projets", icon: TableProperties },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-56 bg-[#0e0e10]/80 backdrop-blur-lg border-r border-white/10">
      {/* Liens de navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {LINKS.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`
                group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition
                ${active
                  ? "bg-white/10 border-l-4 border-red-500"
                  : "hover:bg-white/10"}
              `}
            >
              <Icon
                size={18}
                className={`
                  flex-shrink-0 transition
                  ${active
                    ? "text-red-500"
                    : "text-amber-50/60 group-hover:text-amber-50"}
                `}
              />
              <span
                className={`transition ${
                  active
                    ? "text-red-500"
                    : "text-amber-50/60 group-hover:text-amber-50"
                }`}
              >
                {name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}