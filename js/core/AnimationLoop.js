// AnimationLoop manages the request animation frame loop
export class AnimationLoop {
    constructor(app) {
        this.app = app;
        this.lastTime = 0;
        this.isRunning = false;
        this.rafId = null;
    }

    // Start the animation loop
    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this.loop.bind(this));
    }

    // Stop the animation loop
    stop() {
        this.isRunning = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    // Main animation loop
    loop(currentTime) {
        if (!this.isRunning) return;

        // Calculate delta time in seconds
        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        // Update and render
        try {
            this.app.update(deltaTime);
            this.app.render();
        } catch (error) {
            console.error('Error in animation loop:', error);
            this.stop();
            return;
        }

        // Request next frame
        this.rafId = requestAnimationFrame(this.loop.bind(this));
    }
}
