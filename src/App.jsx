import React, { useState } from 'react'
import Header from './components/Header'
import MissionsPanel from './components/MissionsPanel'
import AboutPanel from './components/AboutPanel'
import ControlsPanel from './components/ControlsPanel'
import SimulationView from './components/SimulationView'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [showMissions, setShowMissions] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [filters, setFilters] = useState({})

  return (
    <div className="app-root">
      <Header
        onToggleMenu={() => setShowMissions((s) => !s)}
        onToggleAbout={() => setShowAbout((s) => !s)}
        onToggleControls={() => setShowControls((s) => !s)}
      />

      {showMissions && (
        <MissionsPanel onClose={() => setShowMissions(false)} />
      )}

      {showAbout && <AboutPanel onClose={() => setShowAbout(false)} />}
      {showControls && (
        <ControlsPanel
          simulationSpeed={simulationSpeed}
          onChangeSpeed={(v) => setSimulationSpeed(v)}
          filters={filters}
          onChangeFilters={(f) => setFilters(f)}
          onClose={() => setShowControls(false)}
        />
      )}

      <main className="main-view">
        <SimulationView simulationSpeed={simulationSpeed} />
      </main>

      <Footer />
    </div>
  )
}

export default App
