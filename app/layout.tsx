import Providers from "@/app/providers";
import AdsSideBanners from "@/components/AdsSideBanners";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AyStone Instance Cobble",
  description: "Ce petit site est une application de gestion de projets Minecraft, pensée spécialement pour la communauté du serveur Aystone.",
  icons: {
    icon: "/aystone.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <html lang="fr">
      <body className="bg-[#0e0e10] text-amber-50 antialiased">
        <AdsSideBanners />
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}