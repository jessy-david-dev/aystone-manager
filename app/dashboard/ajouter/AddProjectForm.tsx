"use client";

import { motion } from "framer-motion";
import { Layers3, MapPin, Plus, Tags, User, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { createProject } from "../actions";

const PREDEF = ["build", "usine", "spawn"] as const;
type TagColor = (typeof PREDEF)[number];

const palette: Record<TagColor, string> = {
  build: "bg-emerald-600/90",
  usine: "bg-orange-600/90",
  spawn: "bg-fuchsia-700/90",
};

const isValidCoord = (value: string) => /^-?\d*$/.test(value);

export default function AddProjectForm() {
  const { data: session } = useSession();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setInput] = useState("");

  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [z, setZ] = useState("");

  const addTag = (t: string) => {
    const val = t.trim().toLowerCase();
    if (!val || tags.includes(val) || tags.length >= 5) return;
    setTags([...tags, val]);
  };

  const del = (t: string) => setTags(tags.filter((x) => x !== t));

  const getTagClass = (t: string) => {
    return palette[t as TagColor] ?? "bg-gray-600";
  };

  return (
    <motion.form
      action={createProject}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto bg-gray-800/60 rounded-xl shadow-lg p-6 space-y-6"
    >
      {/* nom */}
      <div className="relative">
        <Layers3 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          name="projet"
          placeholder="Nom du projet"
          required
          className="w-full rounded-lg bg-gray-700 py-2 pl-10 pr-3 text-amber-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* joueur */}
      {session?.user?.email === "ultralionfr@gmail.com" && (
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            name="joueur"
            placeholder="Pseudo Minecraft"
            required
            className="w-full rounded-lg bg-gray-700 py-2 pl-10 pr-3 text-amber-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      {/* coords */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: "x", value: x, setValue: setX },
          { name: "y", value: y, setValue: setY },
          { name: "z", value: z, setValue: setZ },
        ].map(({ name, value, setValue }) => (
          <div className="relative" key={name}>
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              name={name}
              placeholder={name.toUpperCase()}
              value={value}
              onChange={(e) => {
                if (isValidCoord(e.target.value)) setValue(e.target.value);
              }}
              className="w-full rounded-lg bg-gray-700 py-2 pl-9 pr-3 text-amber-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="flex items-center gap-1 text-sm text-gray-300">
          <Tags size={16} /> Tags <span className="text-xs text-gray-400">(max 5)</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => del(t)}
              className={`rounded-full px-3 py-1 text-xs ${getTagClass(t)} text-amber-50 flex items-center gap-1 hover:opacity-80`}
            >
              {t} <X size={12} />
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            onChange={(e) => {
              addTag(e.target.value);
              e.target.value = "";
            }}
            className="w-full sm:w-1/2 rounded-lg bg-gray-700 py-2 px-3 text-amber-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue=""
          >
            <option value="">Choisir un tag pré-défini</option>
            {PREDEF.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <div className="relative flex-1">
            <input
              value={tagInput}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag(tagInput), setInput(""))
              }
              placeholder="Ajouter un tag personnalisé"
              className="w-full rounded-lg bg-gray-700 py-2 pl-3 pr-12 text-amber-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => {
                addTag(tagInput);
                setInput("");
              }}
              className="absolute right-1 top-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 p-1"
            >
              <Plus size={16} className="text-amber-50" />
            </button>
          </div>
        </div>
      </div>

      {/* description */}
      <textarea
        name="description"
        rows={4}
        placeholder="Description du projet"
        className="w-full rounded-lg bg-gray-700 p-3 text-amber-50 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* état + monde */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select name="etat" className="input-style bg-gray-700 text-amber-50">
          <option>En cours</option>
          <option>Terminé</option>
          <option>Pause</option>
        </select>
        <select name="monde" className="input-style bg-gray-700 text-amber-50">
          <option>Overworld</option>
          <option>Nether</option>
          <option>End</option>
        </select>
      </div>

      {/* hidden */}
      <input type="hidden" name="tags" value={tags.join(",")} />
      <input type="hidden" name="coords" id="coordsField" value="" />

      {/* submit */}
      <button
        type="submit"
        className="cursor-pointer w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 py-3 text-amber-50 font-semibold shadow-md hover:shadow-lg transition duration-300"
        onClick={(e) => {
          const form = (e.target as HTMLButtonElement).form!;
          const coordsField = form.coords as HTMLInputElement;
          coordsField.value = [form.x.value, form.y.value, form.z.value].filter(Boolean).join(" ");
        }}
      >
        Ajouter le projet
      </button>
    </motion.form>
  );
}