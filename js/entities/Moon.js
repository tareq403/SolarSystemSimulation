import { CelestialBody } from './CelestialBody.js';

// Moon class - orbits a Planet
export class Moon extends CelestialBody {
    constructor(config) {
        super(config);
        // Moons are just celestial bodies that orbit planets
        // No additional functionality needed beyond the base class
    }

    // Could add moon-specific methods here if needed in the future
    // For example: tidal locking, special rendering, etc.
}
