// Base class for systems with a central body and orbiting bodies
export class OrbitalSystem {
    constructor(centralBody) {
        this.centralBody = centralBody;
        this.orbitingBodies = [];
        this.boundingRadius = 0;  // Maximum orbital radius for camera calculations
    }

    // Add an orbiting body to the system
    addOrbitingBody(body) {
        this.orbitingBodies.push(body);
        // Update bounding radius
        if (body.orbitalRadius > this.boundingRadius) {
            this.boundingRadius = body.orbitalRadius;
        }
    }

    // Get all bodies in the system (central + orbiting)
    getAllBodies() {
        return [this.centralBody, ...this.orbitingBodies];
    }

    // Update all bodies in the system
    update(deltaTime, timeScale) {
        // Update central body (usually stationary, but call it anyway)
        this.centralBody.update(deltaTime, timeScale);

        // Update all orbiting bodies
        this.orbitingBodies.forEach(body => {
            body.update(deltaTime, timeScale);
        });
    }

    // Draw the system
    draw(ctx, camera, renderer, showLabels, distanceUnit) {
        // Draw orbits first
        this.drawOrbits(ctx, camera, renderer);

        // Draw central body
        this.centralBody.draw(ctx, camera, renderer);

        // Draw orbiting bodies
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

    // Draw orbital paths
    drawOrbits(ctx, camera, renderer) {
        const center = this.centralBody.getPosition();

        this.orbitingBodies.forEach(body => {
            renderer.drawOrbit(center.x, center.y, body.orbitalRadius, camera);
        });
    }

    // Draw distance labels on orbits (to be overridden by subclasses)
    drawDistanceLabels(ctx, camera, renderer, distanceUnit) {
        // Subclasses will implement this with specific distance calculations
    }

    // Draw labels for all bodies
    drawLabels(ctx, camera, renderer) {
        // Label central body
        const centralPos = this.centralBody.getPosition();
        const centralScreen = camera.worldToScreen(centralPos.x, centralPos.y);
        const centralSize = this.centralBody.radius * camera.zoom;
        renderer.drawLabel(
            this.centralBody.name,
            centralScreen.x,
            centralScreen.y + centralSize + 5
        );

        // Label orbiting bodies
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

    // Find which body (if any) is at the given world coordinates
    getBodyAtPosition(worldX, worldY) {
        // Check central body first
        if (this.centralBody.contains(worldX, worldY)) {
            return this.centralBody;
        }

        // Check orbiting bodies (in reverse order for front-to-back)
        for (let i = this.orbitingBodies.length - 1; i >= 0; i--) {
            const body = this.orbitingBodies[i];
            if (body.contains(worldX, worldY)) {
                return body;
            }
        }

        return null;
    }

    // Get the bounding radius of this system
    getBoundingRadius() {
        return this.boundingRadius;
    }
}
