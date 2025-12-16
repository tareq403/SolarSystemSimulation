import { OrbitalSystem } from './OrbitalSystem.js';
import { UnitConverter } from '../utils/UnitConverter.js';

// PlanetarySystem manages a planet and its moons
export class PlanetarySystem extends OrbitalSystem {
    constructor(planet) {
        super(planet);

        // Add all moons to the system
        const moons = planet.getMoons();
        moons.forEach(moon => {
            this.addOrbitingBody(moon);
        });
    }

    // Get the planet
    getPlanet() {
        return this.centralBody;
    }

    // Get all moons
    getMoons() {
        return this.orbitingBodies;
    }

    // Draw distance labels from planet (overrides base class)
    drawDistanceLabels(ctx, camera, renderer, distanceUnit) {
        // Only draw if there are moons
        if (this.orbitingBodies.length === 0) return;

        const center = this.centralBody.getPosition();

        this.orbitingBodies.forEach(moon => {
            // Only draw label if orbit is visible and not too small/large
            const screenRadius = moon.orbitalRadius * camera.zoom;
            if (screenRadius < 5 || screenRadius > 5000) return;

            // Calculate distance in chosen unit using ACTUAL distance in km
            const distanceKm = moon.actualDistanceKm;
            const distance = UnitConverter.convert(distanceKm, distanceUnit);

            // Position label at top of orbit
            const labelPos = {
                x: center.x,
                y: center.y - moon.orbitalRadius
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
