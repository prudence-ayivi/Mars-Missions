import React from 'react'

export default function ControlsPanel({ simulationSpeed, onChangeSpeed, filters, onChangeFilters, onClose }) {
  return (
    <div className="dropdown controls-panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <h4 style={{margin:0}}>Controls</h4>
        <button className="link" onClick={onClose}>Close</button>
      </div>

      <div style={{marginBottom:12}}>
        <label>Simulation speed</label>
        <div className="row">
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={simulationSpeed}
            onChange={(e) => onChangeSpeed(Number(e.target.value))}
          />
          <div className="speed-box">x{simulationSpeed}</div>
        </div>
      </div>

      <div style={{marginBottom:12}}>
        <label>Year</label>
        <input type="number" placeholder="e.g. 2020" style={{width:'100%',padding:8,borderRadius:6,border:'none',background:'rgba(255,255,255,0.03)'}} />
      </div>

      <div style={{marginBottom:12}}>
        <label>Status</label>
        <div className="row">
          <label style={{fontSize:13,color:'#cbd6df'}}><input type="radio" name="status"/> Past</label>
          <label style={{fontSize:13,color:'#cbd6df'}}><input type="radio" name="status"/> Current</label>
          <label style={{fontSize:13,color:'#cbd6df'}}><input type="radio" name="status"/> Planned</label>
        </div>
      </div>

      <div style={{marginBottom:12}}>
        <label>Country</label>
        <select style={{width:'100%',padding:8,borderRadius:6,border:'none',background:'rgba(255,255,255,0.03)'}}>
          <option>All</option>
          <option>United States</option>
          <option>China</option>
          <option>Russia / USSR</option>
          <option>ESA</option>
        </select>
      </div>

      <div style={{marginBottom:8}}>
        <label>Mission type</label>
        <div className="row" style={{gap:6}}>
          <button className="link">Orbital</button>
          <button className="link">Landing</button>
          <button className="link">Rover</button>
        </div>
      </div>
    </div>
  )
}
