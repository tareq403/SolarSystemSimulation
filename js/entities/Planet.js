import { CelestialBody } from './CelestialBody.js';

// Planet class - orbits the Sun and can have moons
export class Planet extends CelestialBody {
    constructor(config) {
        super(config);
        this.moons = [];
        this.planetarySystem = null;  // Will be set when PlanetarySystem is created
        this.hasRings = config.hasRings || false;
    }

    // Add a moon to this planet
    addMoon(moon) {
        this.moons.push(moon);
        moon.parent = this;  // Set this planet as the moon's parent
    }

    // Get all moons
    getMoons() {
        return this.moons;
    }

    // Get planetary system
    getPlanetarySystem() {
        return this.planetarySystem;
    }

    // Set planetary system
    setPlanetarySystem(system) {
        this.planetarySystem = system;
    }

    // Override draw to use base class behavior (rings are in the image)
    draw(ctx, camera, renderer) {
        // Use base class draw method
        super.draw(ctx, camera, renderer);
    }
}
