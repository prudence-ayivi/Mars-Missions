import React, { useMemo } from 'react'
import missions from '../data/mars-missions.json'
import { IoMdClose } from "react-icons/io";


export default function ControlsPanel({
  simulationSpeed,
  onChangeSpeed,
  filters,
  onChangeFilters,
  onClose,
  className = '',
}) {
  const years = useMemo(() => {
    const list = missions
      .map((m) => m.launch?.launch_date || m.arrival?.arrival_date)
      .filter(Boolean)
      .map((date) => date.slice(0, 4))
    return Array.from(new Set(list)).sort((a, b) => Number(a) - Number(b))
  }, [])

  const countries = useMemo(() => {
    const list = missions.map((m) => m.agency?.country).filter(Boolean)
    return Array.from(new Set(list)).sort()
  }, [])

  const updateFilter = (key, value) => {
    onChangeFilters({ ...filters, [key]: value })
  }

  const isMissionType = (value) => filters.missionType === value

  return (
    <div
      className={`rounded-lg border border-white/10 bg-black/75 backdrop-blur-md p-3 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="m-0 text-sm font-semibold tracking-wide text-white/90">Controls</h4>
        <button
          className="text-xs uppercase tracking-widest text-slate-300 hover:text-white px-2 py-1 rounded-md hover:bg-white/5"
          onClick={onClose}
        >
          <IoMdClose className="text-lg" />
        </button>
      </div>

      <div className="space-y-3 text-sm text-slate-200">
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
            Simulation speed
          </label>
          <div className="flex items-center gap-3">
            <input
              className="w-44 accent-orange-400"
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={simulationSpeed}
              onChange={(e) => onChangeSpeed(Number(e.target.value))}
            />
            <div className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">
              x{Number(simulationSpeed).toFixed(1)}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
            Year
          </label>
          <select
            className="w-full px-2 py-1 rounded-md bg-black border border-white/10 text-slate-100"
            value={filters.year}
            onChange={(e) => updateFilter('year', e.target.value)}
          >
            <option value="all">All years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
            Status
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                className="accent-orange-400"
                type="radio"
                name="status"
                checked={filters.status === 'past'}
                onChange={() => updateFilter('status', 'past')}
              />
              Past
            </label>
            <label className="flex items-center gap-2">
              <input
                className="accent-orange-400"
                type="radio"
                name="status"
                checked={filters.status === 'current'}
                onChange={() => updateFilter('status', 'current')}
              />
              Current
            </label>
            <label className="flex items-center gap-2">
              <input
                className="accent-orange-400"
                type="radio"
                name="status"
                checked={filters.status === 'planned'}
                onChange={() => updateFilter('status', 'planned')}
              />
              Planned
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
            Country
          </label>
          <select
            className="w-full px-2 py-1 rounded-md bg-black border border-white/10 text-slate-100"
            value={filters.country}
            onChange={(e) => updateFilter('country', e.target.value)}
          >
            <option value="all">All countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
            Crew
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                className="accent-orange-400"
                type="radio"
                name="crew"
                checked={filters.crew === 'human'}
                onChange={() => updateFilter('crew', 'human')}
              />
              Human
            </label>
            <label className="flex items-center gap-2">
              <input
                className="accent-orange-400"
                type="radio"
                name="crew"
                checked={filters.crew === 'robotic'}
                onChange={() => updateFilter('crew', 'robotic')}
              />
              Robotic
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
            Operator
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                className="accent-orange-400"
                type="radio"
                name="operator"
                checked={filters.operator === 'public'}
                onChange={() => updateFilter('operator', 'public')}
              />
              Public
            </label>
            <label className="flex items-center gap-2">
              <input
                className="accent-orange-400"
                type="radio"
                name="operator"
                checked={filters.operator === 'private'}
                onChange={() => updateFilter('operator', 'private')}
              />
              Private
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
            Mission type
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              className={`text-xs uppercase tracking-widest px-3 py-1 rounded-md border ${
                isMissionType('orbital') ? 'border-white/30 bg-white/15' : 'border-white/10 bg-white/5'
              } hover:bg-white/10`}
              onClick={() => updateFilter('missionType', 'orbital')}
            >
              Orbital
            </button>
            <button
              className={`text-xs uppercase tracking-widest px-3 py-1 rounded-md border ${
                isMissionType('landing') ? 'border-white/30 bg-white/15' : 'border-white/10 bg-white/5'
              } hover:bg-white/10`}
              onClick={() => updateFilter('missionType', 'landing')}
            >
              Landing
            </button>
            <button
              className={`text-xs uppercase tracking-widest px-3 py-1 rounded-md border ${
                isMissionType('rover') ? 'border-white/30 bg-white/15' : 'border-white/10 bg-white/5'
              } hover:bg-white/10`}
              onClick={() => updateFilter('missionType', 'rover')}
            >
              Rover
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
