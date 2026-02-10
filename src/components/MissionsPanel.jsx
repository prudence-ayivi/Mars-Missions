import React, { useEffect, useMemo, useState } from 'react'
import missions from '../data/mars-missions.json'
import marsNasa from '../assets/mars_nasa.jpg'
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const STATUS_STYLES = {
  active: { text: 'text-green-400', pill: 'bg-green-500/80' },
  completed: { text: 'text-blue-400', pill: 'bg-blue-500/80' },
  failed: { text: 'text-red-400', pill: 'bg-red-500/80' },
  planned: { text: 'text-amber-400', pill: 'bg-amber-500/80' },
}

const getYear = (dateStr) => (dateStr ? dateStr.slice(0, 4) : 'N/A')

const getStatusLabel = (state) => {
  if (!state) return 'Unknown'
  return state.charAt(0).toUpperCase() + state.slice(1)
}

const getStatusStyle = (state) => {
  const key = (state || '').toLowerCase()
  return STATUS_STYLES[key] || { text: 'text-slate-300', pill: 'bg-slate-500/60' }
}

const formatDateRange = (start, end) => {
  if (!start && !end) return 'Dates: N/A'
  if (start && !end) return `Dates: ${start} - Ongoing`
  if (!start && end) return `Dates: N/A - ${end}`
  return `Dates: ${start} - ${end}`
}

function MissionHoverCard({ mission }) {
  const image = mission.images?.[0] || marsNasa
  const status = mission.status?.state || 'unknown'
  const statusStyle = getStatusStyle(status)
  const year = getYear(mission.launch?.launch_date || mission.arrival?.arrival_date)
  const country = mission.agency?.country || 'Unknown'

  return (
    <div className="pointer-events-none absolute left-full top-0 ml-3 w-60 rounded-md border border-white/15 bg-black/80 backdrop-blur-md shadow-lg">
      <div className="relative h-24">
        <img
          src={image}
          alt={mission.mission_name}
          onError={(e) => {
            e.currentTarget.src = marsNasa
          }}
          className="h-24 w-full object-cover"
        />
        <span
          className={`absolute top-1 left-1 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/90 rounded ${statusStyle.pill}`}
        >
          {getStatusLabel(status)}
        </span>
      </div>
      <div className="h-px bg-white/10" />
      <div className="p-2 flex items-start justify-between gap-2">
        <div className="text-xs font-semibold text-white/90 leading-snug">
          {mission.mission_name}
        </div>
        <div className="text-[10px] text-slate-300 text-right">
          <div>{year}</div>
          <div>{country}</div>
        </div>
      </div>
    </div>
  )
}

export default function MissionsPanel({ onClose }) {
  const [selectedMission, setSelectedMission] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setActiveImageIndex(0)
  }, [selectedMission?.id])

  const images = useMemo(() => {
    if (!selectedMission) return []
    const list = (selectedMission.images || []).filter(Boolean)
    return list.length ? list : [marsNasa]
  }, [selectedMission])

  const detailStatus = selectedMission?.status?.state || 'unknown'
  const detailStatusStyle = getStatusStyle(detailStatus)
  const detailCountry = selectedMission?.agency?.country || 'Unknown'
  const detailDates = selectedMission
    ? formatDateRange(selectedMission.duration?.start, selectedMission.duration?.end)
    : 'Dates : N/A'

  return (
    <aside className="fixed top-12 left-3 bottom-10 w-80 max-w-[90vw] z-40 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-lg overflow-y-auto overflow-x-visible">
      <div className="flex items-center justify-between mb-3">
        {selectedMission ? (
          <button
            className="text-xs uppercase tracking-widest text-slate-200 hover:text-white px-2 py-1 rounded-md hover:bg-white/5"
            onClick={() => setSelectedMission(null)}
          >
            <FaArrowLeftLong className="text-lg" />
          </button>
        ) : (
          <h3 className="m-0 text-sm font-semibold tracking-wide text-white/90">
            Missions
          </h3>
        )}
        <button
          className="text-xs uppercase tracking-widest text-slate-300 hover:text-white px-2 py-1 rounded-md hover:bg-white/5"
          onClick={onClose}
        >
          <IoMdClose className="text-lg" />
        </button>
      </div>

      {!selectedMission && (
        <div className="space-y-3">
          {missions.map((m) => (
            <div
              key={m.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedMission(m)}
            >
              <div className="flex gap-3 p-2 rounded-md bg-white/5 border border-white/5 hover:bg-white/10">
                <img
                  src={marsNasa}
                  alt={m.mission_name}
                  className="w-16 h-12 object-cover rounded-md"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    {m.mission_name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {m.agency?.name || 'Agency'}
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    {m.summary}
                  </p>
                </div>
              </div>

              <div className="hidden group-hover:block">
                <MissionHoverCard mission={m} />
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMission && (
        <div className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
            <div className="relative h-36">
              <img
                src={images[activeImageIndex]}
                alt={selectedMission.mission_name}
                onError={(e) => {
                  e.currentTarget.src = marsNasa
                }}
                className="w-full h-36 object-cover"
              />
              <span
                className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/90 rounded ${detailStatusStyle.pill}`}
              >
                {getStatusLabel(detailStatus)}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2">
              {images.map((_, idx) => (
                <button
                  key={`${selectedMission.id}-dot-${idx}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-2 w-2 rounded-full ${idx === activeImageIndex ? 'bg-white' : 'bg-white/30'}`}
                  aria-label={`Image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-lg font-semibold text-white/95">
            {selectedMission.mission_name}
          </div>

          <div className="flex items-center justify-between text-xs font-black text-slate-300">
            <div>{detailCountry}</div>
            <div className={`uppercase tracking-widest text-[10px] ${detailStatusStyle.text}`}>
              {getStatusLabel(detailStatus)}
            </div>
          </div>

          <div className="text-xs text-slate-400">{detailDates}</div>

          <div className="text-sm text-slate-200">
            {selectedMission.summary}
          </div>

          <div className="text-xs text-slate-400">
            Objectives: {(selectedMission.operations || []).join(' / ') || 'N/A'}
          </div>

          <div className="pt-3 border-t border-white/10 text-xs text-slate-300 space-y-2">
            <div>Type : {selectedMission.mission_type || 'N/A'}</div>
            <div>Agency : {selectedMission.agency?.name || 'N/A'}</div>
            <div>Launch : {selectedMission.launch?.launch_date || 'N/A'}</div>
            <div>Vehicule : {selectedMission.launch?.launch_vehicle || 'N/A'}</div>
            <div>Launching site : {selectedMission.launch?.launch_site || 'N/A'}</div>
            <div>Arrival date : {selectedMission.arrival?.arrival_date || 'N/A'}</div>
            <div>Arrival type : {selectedMission.arrival?.arrival_type || 'N/A'}</div>
            <div>
              Landing Site :{' '}
              {selectedMission.arrival?.landing_site?.name || 'N/A'}
            </div>
            <div>Duration (days) : {selectedMission.duration?.total_days ?? 'N/A'}</div>
            <div>Statut detail : {selectedMission.status?.reason || 'N/A'}</div>
            <div>Participants : N/A</div>
          </div>
        </div>
      )}
    </aside>
  )
}
