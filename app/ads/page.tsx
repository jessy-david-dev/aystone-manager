import AdsGalleryClient from "@/components/AdsGalleryClient";
import { getAdFiles } from "@/lib/getAds";

export const metadata = {
  title: "Galerie des publicités – Aystone",
};

export default async function AdsGalleryPage() {
  const files = await getAdFiles();
  return <AdsGalleryClient files={files} />;
}