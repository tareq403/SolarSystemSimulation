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

        // Scale factor for enlarging the central planet in planetary view
        this.planetScaleFactor = 4;
    }

    // Get the planet
    getPlanet() {
        return this.centralBody;
    }

    // Get all moons
    getMoons() {
        return this.orbitingBodies;
    }

    // Override draw to render the central planet larger
    draw(ctx, camera, renderer, showLabels, distanceUnit) {
        // Draw orbits first
        this.drawOrbits(ctx, camera, renderer);

        // Draw central planet with enlarged size
        this.drawEnlargedPlanet(ctx, camera, renderer);

        // Draw orbiting bodies (moons)
        this.orbitingBodies.forEach(body => {
            body.draw(ctx, camera, renderer);
        });

        // Draw labels and distances if enabled
        if (showLabels) {
            this.drawLabels(ctx, camera, renderer);
            // Draw distance labels if both labels are enabled and unit is provided
            if (distanceUnit) {
                this.drawDistanceLabels(ctx, camera, renderer, distanceUnit);
            }
        }
    }

    // Draw the central planet with enlarged size
    drawEnlargedPlanet(ctx, camera, renderer) {
        const planet = this.centralBody;
        const screen = camera.worldToScreen(planet.position.x, planet.position.y);
        const enlargedSize = planet.radius * this.planetScaleFactor * camera.zoom;

        // Draw planet body (image or circle) - rings are included in Saturn's image
        if (planet.image && planet.image.complete && planet.image.naturalHeight > 0) {
            renderer.drawImage(planet.image, screen.x, screen.y, enlargedSize);
        } else {
            renderer.drawCircle(screen.x, screen.y, enlargedSize, planet.color);
        }
    }

    // Override drawLabels to account for enlarged central planet
    drawLabels(ctx, camera, renderer) {
        // Label central planet with enlarged size
        const centralPos = this.centralBody.getPosition();
        const centralScreen = camera.worldToScreen(centralPos.x, centralPos.y);
        const enlargedSize = this.centralBody.radius * this.planetScaleFactor * camera.zoom;
        renderer.drawLabel(
            this.centralBody.name,
            centralScreen.x,
            centralScreen.y + enlargedSize + 5
        );

        // Label orbiting bodies (moons)
        this.orbitingBodies.forEach(body => {
            const pos = body.getPosition();
            const screen = camera.worldToScreen(pos.x, pos.y);
            const size = body.radius * camera.zoom;
            renderer.drawLabel(
                body.name,
                screen.x,
                screen.y + size + 5
            );
        });
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
