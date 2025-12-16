// Base class for all celestial objects (Sun, Planets, Moons)
export class CelestialBody {
    constructor({
        name,
        radius,              // Visual radius in pixels (base size)
        color,               // Fallback color if no image
        imageUrl = null,     // Optional image path
        orbitalRadius = 0,   // Distance from parent in PIXELS (scaled for display)
        actualDistanceKm = 0, // Actual distance in kilometers (for distance labels)
        orbitalPeriod = 0,   // Days to complete one orbit (0 = stationary)
        angle = 0,           // Initial angle in radians
        parent = null        // What this body orbits (null for Sun)
    }) {
        this.name = name;
        this.radius = radius;
        this.color = color;
        this.imageUrl = imageUrl;
        this.image = null;           // Will be loaded by AssetManager

        this.orbitalRadius = orbitalRadius;  // Scaled pixels for rendering
        this.actualDistanceKm = actualDistanceKm; // Actual km for distance labels
        this.orbitalPeriod = orbitalPeriod;
        this.currentAngle = angle;
        this.parent = parent;

        // Cached position
        this.position = { x: 0, y: 0 };
        this.updatePosition();
    }

    // Update orbital position based on time
    update(deltaTime, timeScale) {
        if (this.orbitalPeriod === 0) return; // Stationary (Sun)

        // Convert orbital period to angular velocity
        const radiansPerDay = (2 * Math.PI) / this.orbitalPeriod;
        const angularVelocity = radiansPerDay * timeScale;

        // Update angle
        this.currentAngle += angularVelocity * deltaTime;

        // Normalize angle to 0-2π
        if (this.currentAngle > Math.PI * 2) {
            this.currentAngle -= Math.PI * 2;
        } else if (this.currentAngle < 0) {
            this.currentAngle += Math.PI * 2;
        }

        this.updatePosition();
    }

    // Calculate and cache position based on current angle
    updatePosition() {
        // Get parent position (or origin if no parent)
        const parentPos = this.parent ? this.parent.position : { x: 0, y: 0 };

        // Convert polar coordinates (angle, radius) to cartesian (x, y)
        this.position.x = parentPos.x + Math.cos(this.currentAngle) * this.orbitalRadius;
        this.position.y = parentPos.y + Math.sin(this.currentAngle) * this.orbitalRadius;
    }

    // Get current position
    getPosition() {
        return this.position;
    }

    // Check if a point is inside this body (for click detection)
    contains(worldX, worldY) {
        const dx = worldX - this.position.x;
        const dy = worldY - this.position.y;
        const distanceSquared = dx * dx + dy * dy;
        return distanceSquared <= this.radius * this.radius;
    }

    // Draw this celestial body on the canvas
    draw(ctx, camera, renderer) {
        const screen = camera.worldToScreen(this.position.x, this.position.y);
        const size = this.radius * camera.zoom;

        // Skip if off-screen
        if (screen.x < -size || screen.x > ctx.canvas.width + size ||
            screen.y < -size || screen.y > ctx.canvas.height + size) {
            return;
        }

        // Draw image if available, otherwise draw colored circle
        if (this.image && this.image.complete && this.image.naturalHeight > 0) {
            renderer.drawImage(this.image, screen.x, screen.y, size);
        } else {
            renderer.drawCircle(screen.x, screen.y, size, this.color);
        }
    }

    // Set the loaded image
    setImage(image) {
        this.image = image;
    }

    // Get orbital velocity in radians per day
    getOrbitalVelocity() {
        if (this.orbitalPeriod === 0) return 0;
        return (2 * Math.PI) / this.orbitalPeriod;
    }
}
