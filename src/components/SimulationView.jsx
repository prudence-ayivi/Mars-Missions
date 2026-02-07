import React, { useEffect, useRef, useState } from 'react'

export default function SimulationView({ simulationSpeed = 1 }) {
  const containerRef = useRef(null)
  const [initialized, setInitialized] = useState(false)
  const bg = '/src/assets/galaxy_starfield.png'
  const marsTex = '/src/assets/mars_1k_color.jpg'

  useEffect(() => {
    let cancelled = false

    async function initSpacekit() {
      try {
        // Try dynamic import of spacekit.js — if present, initialize a basic scene
        const sk = await import('spacekit.js')
        const Spacekit = sk?.default || sk
        // Many builds attach a global; try to use available API safely
        const API = Spacekit || window.Spacekit || window.SpaceKit

        if (!API) throw new Error('Spacekit API not found')

        // Best-effort initialization: create a basic container and add Mars.
        // Different builds expose different constructors; attempt common patterns.
        const container = containerRef.current
        if (!container) return

        // If the package exposes a Scene or SpaceScene constructor
        if (API.Scene) {
          const scene = new API.Scene({ container })
          // create planet if helper exists
          if (scene.createPlanet) {
            scene.createPlanet({ id: 'mars', textureUrl: marsTex })
          }
        } else if (API.createScene) {
          const scene = API.createScene(container)
          if (scene && scene.addPlanet) scene.addPlanet({ texture: marsTex })
        } else {
          // fallback: attach any known init function
          if (typeof API.init === 'function') {
            API.init({ container, backgroundUrl: bg })
          }
        }

        if (!cancelled) setInitialized(true)
      } catch (err) {
        // If spacekit isn't available or initialization fails, we'll use CSS fallback
        console.warn('Spacekit init failed — using fallback:', err.message)
        if (!cancelled) setInitialized(false)
      }
    }

    initSpacekit()
    return () => {
      cancelled = true
    }
  }, [marsTex, bg])

  // CSS fallback: render a sphere using background image and rotate on Y axis (self-rotation)
  return (
    <div className="sim-container" style={{ backgroundImage: `url(${bg})` }} ref={containerRef}>
      {!initialized && (
        <div
          className="mars-sphere"
          style={{
            backgroundImage: `url(${marsTex})`,
            animationDuration: `${30 / Math.max(0.1, simulationSpeed)}s`,
            transformStyle: 'preserve-3d',
          }}
          title="Mars fallback"
        />
      )}
    </div>
  )
}
