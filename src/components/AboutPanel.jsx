import React from 'react'

export default function AboutPanel({ onClose }) {
  return (
    <div className="dropdown about-panel">
      <div className="flex justify-between items-center mb-2">
        <h4 className="m-0">About</h4>
        <button className="link" onClick={onClose}>Close</button>
      </div>

      <div className="about-content">
        <p>
          Mars Missions — interface de visualisation expérimentale. Cette
          version est une maquette interactive : la vue centrale affichera
          Mars et les objets en orbite (Spacekit prévu pour la suite). Le
          panneau de gauche liste les missions disponibles à parcourir.
        </p>
        <p>
          Tech stack prévu : React + Vite, Spacekit.js pour la dynamique
          orbitale, extension possible avec Three.js pour modèles 3D.
        </p>
        <p className="text-sm text-slate-400">
          (Lorem ipsum) — Le texte peut défiler si nécessaire.
        </p>
      </div>
    </div>
  )
}
