'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ADS_IMAGES = [
  '/ads/riseofkinkdom.jpeg',
  '/ads/voat.png'
];

export default function PopupAd() {
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState<string>(ADS_IMAGES[0]);

  /* choix aléatoire + délai d’apparition */
  useEffect(() => {
    setSrc(ADS_IMAGES[Math.floor(Math.random() * ADS_IMAGES.length)]);
    const id = setTimeout(() => setVisible(true), 5000); // 5 s
    return () => clearTimeout(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 hidden md:block z-50 animate-in fade-in slide-in-from-bottom-4">
      <div className="relative w-[420px] rounded-lg overflow-hidden shadow-2xl ring-1 ring-black/20">
        {/* bouton fermer */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Fermer la pub"
          className="absolute right-2 top-2 z-10 rounded-full bg-black/40 p-1 hover:bg-black/60"
        >
          <X className="h-4 w-4 text-amber-50" />
        </button>

        {/* image de la pub */}
        <Image
          src={src}
          alt="Publicité fictive"
          width={420}
          height={1080}
          priority
          className="object-cover select-none"
          unoptimized
        />
      </div>
    </div>
  );
}
