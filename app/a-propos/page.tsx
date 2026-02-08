'use client';

import { motion } from 'framer-motion';

const TAGS = [
  { id: 'spawn',  label: 'Spawn',         cls: 'bg-purple-700/30  text-purple-300' },
  { id: 'build',  label: 'Build',         cls: 'bg-emerald-600/25 text-emerald-300' },
  { id: 'usine',  label: 'Usine',         cls: 'bg-orange-600/20  text-orange-300' },
];

export default function AProposPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0e0e10]">
      <section className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 text-gray-200">
        <motion.h1
          className="relative mb-10 text-4xl font-extrabold tracking-tight text-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
        >
          À&nbsp;propos
        </motion.h1>

        <motion.div
          className="space-y-6 leading-relaxed text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15, duration: .6 }}
        >
          <p>
            Cette application&nbsp;web permet à la communauté du serveur&nbsp;
            <strong className="text-red-600">Aystone</strong> de référencer, suivre
            et partager ses projets&nbsp;Minecraft dans les différents mondes&nbsp;:
            <span className="ml-1 rounded-full bg-emerald-600/25 px-2 py-0.5 text-xs font-semibold text-emerald-300">Overworld</span>,
            <span className="mx-1 rounded-full bg-red-700/25 px-2 py-0.5 text-xs font-semibold text-red-300">Nether</span>,
            <span className="rounded-full bg-purple-700/30 px-2 py-0.5 text-xs font-semibold text-purple-300">End</span>.
          </p>

          <p>
            Le tableau liste&nbsp;: joueur, état, monde, nom, description,
            coordonnées et tags personnalisés. L’interface responsive et
            épurée garantit une expérience fluide sur mobile comme sur desktop.
          </p>

          <p>
            Sous le capot&nbsp;: <strong>Next&nbsp;15</strong>, <strong>React&nbsp;19</strong>,
            <strong> Tailwind&nbsp;4</strong> et <strong>Framer&nbsp;Motion</strong> pour les
            animations. Aucune donnée sensible n’est stockée : on se connecte
            simplement via discord&nbsp;.
            <br />
            Sur le dashboard, vous pouvez ajouter votre pseudo Minecraft dans la section <strong>Infos du compte</strong>
          </p>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">Légende des tags</h2>
            <div className="flex flex-wrap gap-3">
              {TAGS.map(t => (
                <span
                  key={t.id}
                  className={`${t.cls} inline-block rounded-full px-3 py-1 text-sm font-semibold`}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">Code source</h2>
            <p>
              Le projet est entièrement open-source&nbsp;:{" "}
              <a
                href="https://github.com/UltraLionfr/aystone-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 underline hover:text-orange-500"
              >
                dépôt&nbsp;GitHub
              </a>.
              Déployé sur&nbsp;<strong>Coolify</strong>.
            </p>
          </section>
        </motion.div>
      </section>
    </main>
  );
}
