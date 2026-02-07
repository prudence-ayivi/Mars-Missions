import React from 'react'

export default function Header({ onToggleMenu, onToggleAbout, onToggleControls }) {
  return (
    <header className="header">
      <button className="hamburger" onClick={onToggleMenu} aria-label="Menu">
        ☰
      </button>
      <div className="title">MARS MISSIONS</div>
      <div className="header-right">
        <button className="link" onClick={onToggleAbout}>About</button>
        <button className="link" onClick={onToggleControls}>Controls</button>
      </div>
    </header>
  )
}
