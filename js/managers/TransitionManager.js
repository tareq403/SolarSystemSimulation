import { CAMERA_CONFIG } from '../core/Constants.js';
import { MathUtils } from '../utils/MathUtils.js';

// TransitionManager handles smooth camera transitions
export class TransitionManager {
    constructor(camera) {
        this.camera = camera;
        this.isTransitioning = false;
        this.duration = CAMERA_CONFIG.TRANSITION_DURATION;
        this.elapsed = 0;
        this.startState = null;
        this.endState = null;
        this.onComplete = null;
    }

    // Start a transition to target position and zoom
    transitionTo(targetX, targetY, targetZoom, duration = null, callback = null) {
        this.isTransitioning = true;
        this.duration = duration || CAMERA_CONFIG.TRANSITION_DURATION;
        this.elapsed = 0;
        this.onComplete = callback;

        // Save start state
        this.startState = {
            x: this.camera.x,
            y: this.camera.y,
            zoom: this.camera.zoom
        };

        // Save end state
        this.endState = {
            x: targetX,
            y: targetY,
            zoom: Math.max(
                CAMERA_CONFIG.MIN_ZOOM,
                Math.min(CAMERA_CONFIG.MAX_ZOOM, targetZoom)
            )
        };
    }

    // Update transition
    update(deltaTime) {
        if (!this.isTransitioning) return;

        this.elapsed += deltaTime * 1000; // Convert to ms

        // Calculate progress (0-1)
        const t = Math.min(this.elapsed / this.duration, 1.0);

        // Apply easing
        const eased = MathUtils.easeInOutCubic(t);

        // Interpolate camera values
        this.camera.x = MathUtils.lerp(this.startState.x, this.endState.x, eased);
        this.camera.y = MathUtils.lerp(this.startState.y, this.endState.y, eased);
        this.camera.zoom = MathUtils.lerp(this.startState.zoom, this.endState.zoom, eased);

        // Also update target values to match
        this.camera.targetX = this.camera.x;
        this.camera.targetY = this.camera.y;
        this.camera.targetZoom = this.camera.zoom;

        // Check if transition is complete
        if (t >= 1.0) {
            this.isTransitioning = false;
            if (this.onComplete) {
                this.onComplete();
                this.onComplete = null;
            }
        }
    }

    // Check if currently transitioning
    isActive() {
        return this.isTransitioning;
    }

    // Cancel current transition
    cancel() {
        this.isTransitioning = false;
        this.onComplete = null;
    }
}
