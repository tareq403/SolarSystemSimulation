import { CAMERA_CONFIG } from '../core/Constants.js';
import { Planet } from '../entities/Planet.js';

// InputManager handles all user input (mouse and keyboard)
export class InputManager {
    constructor(canvas, camera, app) {
        this.canvas = canvas;
        this.camera = camera;
        this.app = app;

        // Mouse state
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseDown = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.isDragging = false;

        // Keyboard state
        this.keys = {};

        this.init();
    }

    // Initialize event listeners
    init() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('wheel', this.onMouseWheel.bind(this), { passive: false });
        this.canvas.addEventListener('dblclick', this.onDoubleClick.bind(this));

        // Keyboard events
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));

        // Prevent context menu on right-click
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // Mouse down event
    onMouseDown(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;
        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;
        this.isMouseDown = true;
        this.dragStartX = this.mouseX;
        this.dragStartY = this.mouseY;
    }

    // Mouse move event
    onMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;

        if (this.isMouseDown) {
            const dx = this.mouseX - this.lastMouseX;
            const dy = this.mouseY - this.lastMouseY;

            // Check if we've moved enough to consider it a drag
            const totalDx = this.mouseX - this.dragStartX;
            const totalDy = this.mouseY - this.dragStartY;
            const dragDistance = Math.sqrt(totalDx * totalDx + totalDy * totalDy);

            if (dragDistance > 5) {
                this.isDragging = true;
            }

            // Pan camera
            if (this.isDragging) {
                this.camera.pan(-dx, -dy);
            }
        }

        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;
    }

    // Mouse up event
    onMouseUp(event) {
        if (!this.isDragging) {
            // This was a click, not a drag
            this.handleClick(this.mouseX, this.mouseY);
        }

        this.isMouseDown = false;
        this.isDragging = false;
    }

    // Handle click on canvas
    handleClick(screenX, screenY) {
        const world = this.camera.screenToWorld(screenX, screenY);
        const activeSystem = this.app.getActiveSystem();

        if (!activeSystem) return;

        const clickedBody = activeSystem.getBodyAtPosition(world.x, world.y);

        if (clickedBody && clickedBody instanceof Planet) {
            this.app.handlePlanetClick(clickedBody);
        }
    }

    // Mouse wheel event (zoom)
    onMouseWheel(event) {
        event.preventDefault();

        const zoomDelta = -event.deltaY * CAMERA_CONFIG.SCROLL_ZOOM_FACTOR;

        // Zoom at mouse position
        this.camera.zoomAt(this.mouseX, this.mouseY, zoomDelta);
    }

    // Double-click event (zoom to point)
    onDoubleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const screenX = event.clientX - rect.left;
        const screenY = event.clientY - rect.top;

        // Zoom in at this point
        this.camera.zoomAt(screenX, screenY, CAMERA_CONFIG.DOUBLE_CLICK_ZOOM);

        // Also center on this point
        const world = this.camera.screenToWorld(screenX, screenY);
        this.camera.setTarget(world.x, world.y, this.camera.targetZoom);
    }

    // Key down event
    onKeyDown(event) {
        this.keys[event.key] = true;

        switch(event.key) {
            case 'Escape':
                // Return to solar system view
                this.app.switchToSolarView();
                break;

            case 'ArrowUp':
                event.preventDefault();
                this.camera.zoomIn(CAMERA_CONFIG.ZOOM_STEP);
                break;

            case 'ArrowDown':
                event.preventDefault();
                this.camera.zoomOut(CAMERA_CONFIG.ZOOM_STEP);
                break;

            case ' ':
                event.preventDefault();
                // Could add pause functionality here
                break;
        }
    }

    // Key up event
    onKeyUp(event) {
        this.keys[event.key] = false;
    }

    // Check if a key is pressed
    isKeyPressed(key) {
        return this.keys[key] || false;
    }

    // Clean up event listeners
    destroy() {
        // Remove all event listeners if needed
    }
}
