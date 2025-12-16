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

    // Override draw to add rings for Saturn
    draw(ctx, camera, renderer) {
        const screen = camera.worldToScreen(this.position.x, this.position.y);
        const size = this.radius * camera.zoom;

        // Draw rings before planet if it has them
        if (this.hasRings && size > 3) {
            this.drawRings(ctx, screen.x, screen.y, size);
        }

        // Draw planet body (image or circle)
        if (this.image && this.image.complete && this.image.naturalHeight > 0) {
            renderer.drawImage(this.image, screen.x, screen.y, size);
        } else {
            renderer.drawCircle(screen.x, screen.y, size, this.color);

            // If no image and has rings, draw procedural rings
            if (this.hasRings && size > 3) {
                this.drawRings(ctx, screen.x, screen.y, size);
            }
        }
    }

    // Draw Saturn's rings
    drawRings(ctx, x, y, size) {
        ctx.save();
        ctx.strokeStyle = 'rgba(218, 165, 32, 0.7)';
        ctx.lineWidth = Math.max(1, size * 0.15);

        // Outer ring
        ctx.beginPath();
        ctx.ellipse(x, y, size * 1.8, size * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Inner ring (slightly darker)
        ctx.strokeStyle = 'rgba(184, 134, 11, 0.5)';
        ctx.lineWidth = Math.max(1, size * 0.1);
        ctx.beginPath();
        ctx.ellipse(x, y, size * 1.5, size * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }
}
