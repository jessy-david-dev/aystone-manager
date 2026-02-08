import fs from "node:fs/promises";
import path from "node:path";

const IMG_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

export async function getAdFiles(): Promise<string[]> {
  const dir = path.join(process.cwd(), "public", "ads");
  const files = await fs.readdir(dir);
  return files.filter((f) => IMG_EXT.test(f));
}