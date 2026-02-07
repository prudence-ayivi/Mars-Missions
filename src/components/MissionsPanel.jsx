import React from 'react'
import missions from '../data/mars-missions.json'

export default function MissionsPanel({ onClose }) {
  return (
    <aside className="missions-panel">
      <div className="panel-header">
        <h3>Missions</h3>
        <div>
          <button className="link" onClick={onClose}>Close</button>
        </div>
      </div>

      <div className="missions-list">
        {missions.map((m) => (
          <div key={m.id} className="mission-item">
            <img
              src={m.images && m.images[0] ? m.images[0] : '/src/assets/mars_nasa.jpg'}
              alt={m.mission_name}
            />
            <div>
              <div style={{fontWeight:700}}>{m.mission_name}</div>
              <div className="muted">{m.agency?.name}</div>
              <p style={{margin:6,fontSize:13,color:'#d7e0e8'}}>{m.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
