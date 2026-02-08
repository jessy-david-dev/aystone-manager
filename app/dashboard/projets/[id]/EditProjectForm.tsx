"use client";

import { motion } from "framer-motion";
import { Layers3, MapPin, Tags } from "lucide-react";
import { useState } from "react";
import { Project } from "../../../../components/ProjectsTable";
import { updateProject } from "../../actions";

type Props = {
  project: Project;
};

/** Formulaire client pour éditer un projet existant */
export default function EditProjectForm({ project }: Props) {
  const [tags, setTags] = useState<string[]>(project.tags ?? []);
  const [customTag, setCustomTag] = useState("");

  const PREDEF = ["build", "usine", "spawn"] as const;

  const addTag = (t: string) => {
    const val = t.trim().toLowerCase();
    if (!val || tags.includes(val) || tags.length >= 5) return;
    setTags([...tags, val]);
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((x) => x !== t));
  };

  const coordsParts = (project.coords ?? "").split(" ");

  return (
    <motion.form
      action={(formData: FormData) => updateProject(project.id!, formData)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Titre du projet */}
      <div className="relative">
        <Layers3 size={18} className="absolute left-3 top-3 text-amber-50/40" />
        <input
          name="projet"
          defaultValue={project.projet}
          placeholder="Titre du projet"
          required
          className="input pl-10"
        />
      </div>

      {/* Coordonnées X Y Z */}
      <div className="grid grid-cols-3 gap-4">
        {["X", "Y", "Z"].map((axis, idx) => (
          <div key={axis} className="relative">
            <MapPin size={16} className="absolute left-3 top-3 text-amber-50/40" />
            <input
              name={axis.toLowerCase()}
              defaultValue={coordsParts[idx] ?? ""}
              placeholder={axis}
              className="input pl-10"
            />
          </div>
        ))}
      </div>

      {/* Description */}
      <textarea
        name="description"
        defaultValue={project.description}
        rows={4}
        placeholder="Description détaillée"
        className="input w-full resize-y"
      />

      {/* État & Monde */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="etat" defaultValue={project.etat} className="input">
          <option>En cours</option>
          <option>Terminé</option>
          <option>Pause</option>
        </select>
        <select name="monde" defaultValue={project.monde} className="input">
          <option>Overworld</option>
          <option>Nether</option>
          <option>End</option>
        </select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-amber-50/70">
          <Tags size={16} /> Tags (max 5)
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => removeTag(t)}
              className="rounded-full bg-slate-700/70 px-2 py-0.5 text-xs hover:bg-red-600/80"
            >
              {t} ✕
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <select
            onChange={(e) => {
              addTag(e.target.value);
              e.target.value = "";
            }}
            className="input flex-1"
            defaultValue=""
          >
            <option value="">Tag prédéfini</option>
            {PREDEF.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <input
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              (e.preventDefault(), addTag(customTag), setCustomTag(""))
            }
            placeholder="Ajouter tag..."
            className="input flex-1"
          />
          <button
            type="button"
            onClick={() => {
              addTag(customTag);
              setCustomTag("");
            }}
            className="rounded bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-700"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Champs cachés */}
      <input type="hidden" name="tags" value={tags.join(",")} />
      <input type="hidden" name="coords" value="" />

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 py-2.5 font-semibold shadow hover:brightness-110"
        onClick={(e) => {
          const f = (e.target as HTMLButtonElement).form!;
          const x = (f.x as HTMLInputElement).value;
          const y = (f.y as HTMLInputElement).value;
          const z = (f.z as HTMLInputElement).value;
          (f.coords as HTMLInputElement).value = [x, y, z]
            .filter(Boolean)
            .join(" ");
        }}
      >
        Mettre à jour le projet
      </button>
    </motion.form>
  );
}
