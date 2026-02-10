import React from 'react'
import AboutPanel from './AboutPanel'
import ControlsPanel from './ControlsPanel'

export default function Header({
  onToggleMenu,
  onToggleAbout,
  onToggleControls,
  showAbout,
  showControls,
  simulationSpeed,
  onChangeSpeed,
  filters,
  onChangeFilters,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 px-4 flex items-center gap-3 bg-linear-to-b from-black/70 to-black/20 backdrop-blur">
      <button
        className="px-2 py-1 text-white/90 hover:text-white flex flex-col justify-center gap-1"
        onClick={onToggleMenu}
        aria-label="Menu"
      >
        <span className="sr-only">Menu</span>
        <span className="block w-4 h-0.5 bg-white/90" />
        <span className="block w-4 h-0.5 bg-white/90" />
        <span className="block w-4 h-0.5 bg-white/90" />
      </button>

      <div className="font-orbitron font-bold text-xs sm:text-lg tracking-[0.25em] text-white/90">
        MARS MISSIONS
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <button
            className="text-xs font-black uppercase cursor-pointer tracking-widest text-slate-200 hover:text-white px-2 py-1 rounded-md hover:bg-white/5"
            onClick={onToggleAbout}
          >
            About
          </button>
          {showAbout && (
            <AboutPanel
              onClose={onToggleAbout}
              className="absolute right-0 top-full mt-2 w-80 max-w-[90vw]"
            />
          )}
        </div>

        <div className="relative">
          <button
            className="text-xs font-black uppercase cursor-pointer tracking-widest text-slate-200 hover:text-white px-2 py-1 rounded-md hover:bg-white/5"
            onClick={onToggleControls}
          >
            Controls
          </button>
          {showControls && (
            <ControlsPanel
              simulationSpeed={simulationSpeed}
              onChangeSpeed={onChangeSpeed}
              filters={filters}
              onChangeFilters={onChangeFilters}
              onClose={onToggleControls}
              className="absolute right-0 top-full mt-2 w-80 max-w-[92vw]"
            />
          )}
        </div>
      </div>
    </header>
  )
}
