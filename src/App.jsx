import React, { useState } from 'react'
import Header from './components/Header'
import MissionsPanel from './components/MissionsPanel'
import SimulationView from './components/SimulationView'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [showMissions, setShowMissions] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [filters, setFilters] = useState({
    year: 'all',
    country: 'all',
    status: 'current',
    crew: 'robotic',
    operator: 'public',
    missionType: 'orbital',
  })

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header
        onToggleMenu={() => setShowMissions((s) => !s)}
        onToggleAbout={() => setShowAbout((s) => !s)}
        onToggleControls={() => setShowControls((s) => !s)}
        showAbout={showAbout}
        showControls={showControls}
        simulationSpeed={simulationSpeed}
        onChangeSpeed={(v) => setSimulationSpeed(v)}
        filters={filters}
        onChangeFilters={(f) => setFilters(f)}
      />

      {showMissions && (
        <MissionsPanel onClose={() => setShowMissions(false)} />
      )}

      <main className="fixed inset-0">
        <SimulationView simulationSpeed={simulationSpeed} />
      </main>

      <Footer />
    </div>
  )
}

export default App
