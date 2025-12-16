import { OrbitalSystem } from './OrbitalSystem.js';
import { UnitConverter } from '../utils/UnitConverter.js';

// SolarSystem manages the Sun and all planets
export class SolarSystem extends OrbitalSystem {
    constructor(sun, planets) {
        super(sun);

        // Add all planets to the system
        planets.forEach(planet => {
            this.addOrbitingBody(planet);
        });
    }

    // Get a planet by name
    getPlanet(name) {
        return this.orbitingBodies.find(planet => planet.name === name);
    }

    // Get all planets
    getPlanets() {
        return this.orbitingBodies;
    }

    // Draw distance labels from Sun (overrides base class)
    drawDistanceLabels(ctx, camera, renderer, distanceUnit) {
        const center = this.centralBody.getPosition();

        this.orbitingBodies.forEach(planet => {
            // Only draw label if orbit is visible and not too small/large
            const screenRadius = planet.orbitalRadius * camera.zoom;
            if (screenRadius < 5 || screenRadius > 5000) return;

            // Calculate distance in chosen unit using ACTUAL distance in km
            const distanceKm = planet.actualDistanceKm;
            const distance = UnitConverter.convert(distanceKm, distanceUnit);

            // Position label at top of orbit
            const labelPos = {
                x: center.x,
                y: center.y - planet.orbitalRadius
            };
            const screen = camera.worldToScreen(labelPos.x, labelPos.y);

            renderer.drawDistanceMarker(
                distance,
                screen.x,
                screen.y - 10,
                distanceUnit.name,
                distanceUnit.abbreviation
            );
        });
    }
}
