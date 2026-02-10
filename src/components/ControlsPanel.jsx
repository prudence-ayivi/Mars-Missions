import React from 'react'

export default function ControlsPanel({ simulationSpeed, onChangeSpeed, filters, onChangeFilters, onClose }) {
  return (
    <div className="dropdown controls-panel p-3 w-96">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-montserrat">Controls</h4>
        <button className="link text-sm text-white px-2 py-1 rounded hover:bg-white/5" onClick={onClose}>Close</button>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-300 mb-1">Simulation speed</label>
        <div className="flex items-center gap-3">
          <input
            className="w-40"
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={simulationSpeed}
            onChange={(e) => onChangeSpeed(Number(e.target.value))}
          />
          <div className="speed-box text-sm">x{simulationSpeed}</div>
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-300 mb-1">Year</label>
        <input className="w-full p-2 rounded bg-white/5" type="number" placeholder="e.g. 2020" />
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-300 mb-1">Status</label>
        <div className="flex gap-3 text-sm text-slate-200">
          <label className="flex items-center gap-1"><input type="radio" name="status" /> Past</label>
          <label className="flex items-center gap-1"><input type="radio" name="status" /> Current</label>
          <label className="flex items-center gap-1"><input type="radio" name="status" /> Planned</label>
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-300 mb-1">Country</label>
        <select className="w-full p-2 rounded bg-white/5">
          <option>All</option>
          <option>United States</option>
          <option>China</option>
          <option>Russia / USSR</option>
          <option>ESA</option>
        </select>
      </div>

      <div className="mb-1">
        <label className="block text-sm text-gray-300 mb-1">Mission type</label>
        <div className="flex gap-2">
          <button className="link text-sm text-white px-3 py-1 rounded hover:bg-white/5">Orbital</button>
          <button className="link text-sm text-white px-3 py-1 rounded hover:bg-white/5">Landing</button>
          <button className="link text-sm text-white px-3 py-1 rounded hover:bg-white/5">Rover</button>
        </div>
      </div>
    </div>
  )
}
