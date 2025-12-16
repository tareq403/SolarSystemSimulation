import { CAMERA_CONFIG } from './Constants.js';

// Camera handles viewport transformations, zoom, and pan
export class Camera {
    constructor(canvas) {
        this.canvas = canvas;

        // Current camera state
        this.x = 0;
        this.y = 0;
        this.zoom = CAMERA_CONFIG.DEFAULT_ZOOM;

        // Target state for smooth transitions
        this.targetX = 0;
        this.targetY = 0;
        this.targetZoom = CAMERA_CONFIG.DEFAULT_ZOOM;

        // Smoothing factor for interpolation
        this.smoothing = CAMERA_CONFIG.SMOOTHING;

        // Zoom limits
        this.minZoom = CAMERA_CONFIG.MIN_ZOOM;
        this.maxZoom = CAMERA_CONFIG.MAX_ZOOM;
    }

    // Update camera position with smooth interpolation
    update() {
        // Interpolate position
        this.x += (this.targetX - this.x) * this.smoothing;
        this.y += (this.targetY - this.y) * this.smoothing;
        this.zoom += (this.targetZoom - this.zoom) * this.smoothing;

        // Clamp zoom
        this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom));
    }

    // Set target position and zoom
    setTarget(x, y, zoom) {
        this.targetX = x;
        this.targetY = y;
        this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
    }

    // Immediately set position and zoom (no interpolation)
    setImmediate(x, y, zoom) {
        this.x = x;
        this.y = y;
        this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
        this.targetX = x;
        this.targetY = y;
        this.targetZoom = zoom;
    }

    // Zoom in
    zoomIn(amount = CAMERA_CONFIG.ZOOM_STEP) {
        this.targetZoom = Math.min(this.maxZoom, this.targetZoom + amount);
    }

    // Zoom out
    zoomOut(amount = CAMERA_CONFIG.ZOOM_STEP) {
        this.targetZoom = Math.max(this.minZoom, this.targetZoom - amount);
    }

    // Zoom at a specific screen position
    zoomAt(screenX, screenY, zoomDelta) {
        // Calculate world position before zoom
        const worldBefore = this.screenToWorld(screenX, screenY);

        // Apply zoom
        const newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom + zoomDelta));

        // Calculate how much the world position would shift
        const zoomRatio = newZoom / this.targetZoom;

        // Adjust camera position to keep the world position under the mouse
        this.targetX = worldBefore.x - (screenX - this.canvas.width / 2) / newZoom;
        this.targetY = worldBefore.y - (screenY - this.canvas.height / 2) / newZoom;
        this.targetZoom = newZoom;
    }

    // Pan the camera
    pan(dx, dy) {
        this.targetX += dx / this.zoom;
        this.targetY += dy / this.zoom;
    }

    // Convert world coordinates to screen coordinates
    worldToScreen(worldX, worldY) {
        const screenX = (worldX - this.x) * this.zoom + this.canvas.width / 2;
        const screenY = (worldY - this.y) * this.zoom + this.canvas.height / 2;
        return { x: screenX, y: screenY };
    }

    // Convert screen coordinates to world coordinates
    screenToWorld(screenX, screenY) {
        const worldX = (screenX - this.canvas.width / 2) / this.zoom + this.x;
        const worldY = (screenY - this.canvas.height / 2) / this.zoom + this.y;
        return { x: worldX, y: worldY };
    }

    // Get visible bounds in world coordinates
    getViewBounds() {
        const topLeft = this.screenToWorld(0, 0);
        const bottomRight = this.screenToWorld(this.canvas.width, this.canvas.height);

        return {
            left: topLeft.x,
            right: bottomRight.x,
            top: topLeft.y,
            bottom: bottomRight.y
        };
    }

    // Check if camera is at target (transition complete)
    isAtTarget() {
        const posThreshold = 0.1;
        const zoomThreshold = 0.01;

        return Math.abs(this.x - this.targetX) < posThreshold &&
               Math.abs(this.y - this.targetY) < posThreshold &&
               Math.abs(this.zoom - this.targetZoom) < zoomThreshold;
    }
}
