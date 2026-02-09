import { useEffect, useRef, useState } from "react";
import * as Spacekit from "spacekit.js";
import missions from "../data/mars-missions.json";

const Simulation = () => {
  const simRef = useRef(null);
  const satellitesRef = useRef([]);
  const [sim, setSim] = useState(null);

  useEffect(() => {
    if (!simRef.current) return;

    const simulation = new Spacekit.Simulation(simRef.current, {
      basePath: "https://typpo.github.io/spacekit/src/",
      unitsPerAu: 0.745,
      maxNumParticles: 2 ** 16,
      camera: {
        initialPosition: [3, 3, 1],
        enableDrift: false,
      },
      startDate: new Date("2026-02-09T00:00:00Z"),
    });

    simulation.createSkybox({
      textureUrl: '../spacekit/galaxy_starfield.png'
    });

    // Add Mars 
    simulation.createSphere("Mars", {
      textureUrl: "../spacekit/mars_1k_color.jpg",
      radius: 1.2, 
      debug: {
        showAxes: false,
      },
      rotation: {
        enable: true,
        speed: 0.1,
      },
    });

    // Parcourir les satellites et les ajouter à la visualisation
    missions.forEach((country) => {
       country.satellites_list?.forEach((sat) => {
        try {
          // Vérifier que orbit_param existe et est un tableau
          if (!sat.orbit_param || !Array.isArray(sat.orbit_param) || sat.orbit_param.length < 7) {
            return;
          }
          const [epoch, a, e, i, om, w, ma] = sat.orbit_param;
          const satObject = simulation.createObject(sat.name, {
            ephem: new Spacekit.Ephem(
              {
                // Exemple TLE ou paramètres orbitaux
                epoch: epoch,
                a: a, // semi-major axis divided by 4000
                e: e,
                i: i,
                om: om, // Right ascension of ascending node
                w: w, // Arg of periapsis
                ma: ma, // mean anomaly
              },
              "deg"
            ),
            particleSize: 30,
            scale: [0.5, 0.5, 0.5],
            orbitPathSettings: {
              leadDurationYears: 0.2,
              trailDurationYears: 0.2,
              numberSamplePoints: 120,
            },
            hideOrbit: false,
            theme: {
              orbitColor: sat.status === "Active" ? 0x00ff00 : 0xff0000,
              color: sat.status === "Active" ? 0x00ff00 : 0xff0000,
            },
            labelText: sat.name,
          });
          satellitesRef.current.push({
            object: satObject,
            status: sat.status,
            country: country.country,
            isVisible: true,
          });

        } catch (satError) {
          console.error(`Error adding satellite ${sat.name}:`, satError);
        }
      });
    });

    setSim(simulation);
  }, []);

  // Controls

  const handleReset = () => {
  if (!sim) return;

  sim.setDate(new Date("2025-01-02T00:00:00Z"));
  sim.setJdPerSecond?.(100);
  sim.start();
};

  return (
    <div id="orbit-section" className="relative w-screen h-screen">
      {/* Simulation */}
      <div ref={simRef} className="absolute inset-0" />
    </div>
  );
};

export default Simulation;