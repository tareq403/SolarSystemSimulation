import { RENDER_CONFIG } from './Constants.js';

// Renderer handles all canvas drawing operations
export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.stars = this.generateStars();
    }

    // Generate random stars for background
    generateStars() {
        const stars = [];
        for (let i = 0; i < RENDER_CONFIG.STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * 2000 - 1000,
                y: Math.random() * 2000 - 1000,
                radius: Math.random() * 1.5 + 0.5,
                brightness: Math.random() * 0.5 + 0.5
            });
        }
        return stars;
    }

    // Clear the canvas
    clear() {
        this.ctx.fillStyle = RENDER_CONFIG.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    // Draw starry background
    drawBackground(camera) {
        this.stars.forEach(star => {
            const screen = camera.worldToScreen(star.x, star.y);

            // Only draw if on screen
            if (screen.x >= 0 && screen.x <= this.ctx.canvas.width &&
                screen.y >= 0 && screen.y <= this.ctx.canvas.height) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
                this.ctx.beginPath();
                this.ctx.arc(screen.x, screen.y, star.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
    }

    // Draw an orbit circle
    drawOrbit(centerX, centerY, radius, camera, highlight = false) {
        const center = camera.worldToScreen(centerX, centerY);
        const screenRadius = radius * camera.zoom;

        // Don't draw if radius is too small or too large
        if (screenRadius < 10 || screenRadius > 5000) return;

        this.ctx.strokeStyle = highlight ?
            RENDER_CONFIG.ORBIT_HIGHLIGHT_COLOR :
            RENDER_CONFIG.ORBIT_COLOR;
        this.ctx.lineWidth = RENDER_CONFIG.ORBIT_LINE_WIDTH;
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, screenRadius, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    // Draw an image centered at (x, y) with given size
    drawImage(image, x, y, size) {
        this.ctx.drawImage(
            image,
            x - size,
            y - size,
            size * 2,
            size * 2
        );
    }

    // Draw a circle
    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    // Draw a label with background
    drawLabel(text, x, y) {
        this.ctx.font = RENDER_CONFIG.LABEL_FONT;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';

        const metrics = this.ctx.measureText(text);
        const padding = RENDER_CONFIG.LABEL_PADDING;
        const height = 16;

        // Background
        this.ctx.fillStyle = RENDER_CONFIG.LABEL_BACKGROUND;
        this.ctx.fillRect(
            x - metrics.width / 2 - padding,
            y,
            metrics.width + padding * 2,
            height
        );

        // Text
        this.ctx.fillStyle = RENDER_CONFIG.LABEL_COLOR;
        this.ctx.fillText(text, x, y + 2);
    }

    // Draw distance marker on orbit
    drawDistanceMarker(distance, x, y, unit, abbreviation) {
        const text = `${distance.toFixed(2)} ${abbreviation}`;
        this.drawLabel(text, x, y);
    }
}
