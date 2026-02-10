import React from 'react'
import { IoMdClose } from "react-icons/io";


export default function AboutPanel({ onClose, className = '' }) {
  return (
    <div
      className={`rounded-lg border border-white/10 bg-black/70 backdrop-blur-md p-3 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="m-0 text-sm font-semibold tracking-wide text-white/90">About</h4>
        <button
          className="text-xs uppercase tracking-widest text-slate-300 hover:text-white px-2 py-1 rounded-md hover:bg-white/5"
          onClick={onClose}
        >
          <IoMdClose className="text-lg" />
        </button>
      </div>

      <div className="text-sm text-slate-300 leading-relaxed max-h-56 overflow-y-auto pr-1">
        <p className="mb-2">
          Mars Missions - interface de visualisation experimentale. Cette version
          est une maquette interactive : la vue centrale affiche Mars et les
          objets en orbite (Spacekit pour la suite). Le panneau de gauche liste
          les missions disponibles a parcourir.
        </p>
        <p className="mb-2">
          Tech stack : React + Vite, Spacekit.js pour la dynamique orbitale,
          extension possible avec Three.js pour les modeles 3D.
        </p>
        <p className="text-xs text-slate-400">
          Le texte peut defiler si necessaire.
        </p>
      </div>
    </div>
  )
}
