import { RENDER_CONFIG, CAMERA_CONFIG } from '../core/Constants.js';

// Math utilities for orbital calculations and scaling
export class MathUtils {
    // Scale orbital radius from km to screen pixels
    // Uses consistent linear scale for all planets to show true relative distances
    static scaleOrbitalRadius(actualKm, planetName) {
        // Linear scale for ALL planets to demonstrate actual relative distances
        // Scale factor: 1 pixel per ~10 million km
        // Neptune at 4495M km will be at ~450 pixels
        const scaleFactor = 0.1; // pixels per million km
        const scaledRadius = (actualKm / 1e6) * scaleFactor;

        // Ensure minimum readable distance
        return Math.max(RENDER_CONFIG.MIN_ORBITAL_RADIUS, scaledRadius);
    }

    // Scale moon orbital radius for planetary system view
    static scaleMoonOrbitalRadius(actualKm, allMoonDistances) {
        // Map actual distances to evenly distributed visual orbits
        // First moon starts close to planet, others are well-spaced

        const minVisualRadius = 70;  // First moon starts at 70px from planet (to avoid overlap with enlarged planet)
        const maxVisualRadius = 300; // Last moon at 300px
        const visualRange = maxVisualRadius - minVisualRadius;

        // Sort distances to find min/max
        const sortedDistances = [...allMoonDistances].sort((a, b) => a - b);
        const minActualDistance = sortedDistances[0];
        const maxActualDistance = sortedDistances[sortedDistances.length - 1];
        const actualRange = maxActualDistance - minActualDistance;

        // Handle single moon case
        if (actualRange === 0) {
            return minVisualRadius + visualRange / 2;
        }

        // Linear interpolation for even distribution
        const normalizedPosition = (actualKm - minActualDistance) / actualRange;
        return minVisualRadius + (normalizedPosition * visualRange);
    }

    // Calculate zoom level to fit a system within view
    static calculateFitZoom(canvas, boundingRadius, margin = 100) {
        const availableSpace = Math.min(
            canvas.width - margin * 2,
            canvas.height - margin * 2
        );

        const zoom = availableSpace / (boundingRadius * 2);
        return Math.max(CAMERA_CONFIG.MIN_ZOOM, Math.min(CAMERA_CONFIG.MAX_ZOOM, zoom));
    }

    // Linear interpolation
    static lerp(start, end, t) {
        return start + (end - start) * t;
    }

    // Ease-in-out cubic easing function
    static easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Distance between two points
    static distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Clamp a value between min and max
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    // Normalize angle to 0-2π
    static normalizeAngle(angle) {
        while (angle < 0) angle += Math.PI * 2;
        while (angle > Math.PI * 2) angle -= Math.PI * 2;
        return angle;
    }
}
