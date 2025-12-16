import { CelestialBody } from './CelestialBody.js';
import { RENDER_CONFIG } from '../core/Constants.js';

// Sun class - the center of the solar system
export class Sun extends CelestialBody {
    constructor(config) {
        super({
            ...config,
            orbitalRadius: 0,
            orbitalPeriod: 0,  // Sun doesn't move
            parent: null,
            angle: 0
        });
    }

    // Sun doesn't move, so override update to do nothing
    update(deltaTime, timeScale) {
        // Sun is stationary
    }

    // Draw Sun with glow effect
    draw(ctx, camera, renderer) {
        const screen = camera.worldToScreen(this.position.x, this.position.y);
        const size = this.radius * camera.zoom;

        // Draw glow effect
        const glowRadius = size * RENDER_CONFIG.SUN_GLOW_RADIUS_MULTIPLIER;
        const gradient = ctx.createRadialGradient(
            screen.x, screen.y, size * 0.5,
            screen.x, screen.y, glowRadius
        );
        gradient.addColorStop(0, 'rgba(253, 184, 19, 0.8)');
        gradient.addColorStop(0.5, 'rgba(253, 184, 19, 0.3)');
        gradient.addColorStop(1, 'rgba(253, 184, 19, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.arc(screen.x, screen.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        // Draw Sun body (image or circle)
        if (this.image && this.image.complete && this.image.naturalHeight > 0) {
            renderer.drawImage(this.image, screen.x, screen.y, size);
        } else {
            renderer.drawCircle(screen.x, screen.y, size, this.color);
        }
    }
}
