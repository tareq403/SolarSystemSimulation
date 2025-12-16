import { Application } from './core/Application.js';

// Entry point for the Solar System application
async function main() {
    try {
        console.log('Starting Solar System Visualization...');

        // Create application
        const app = new Application('solarSystemCanvas');

        // Initialize (loads assets, creates systems)
        await app.init();

        // Start animation loop
        app.start();

        console.log('Solar System Visualization started successfully!');

    } catch (error) {
        console.error('Failed to start application:', error);
        alert('Failed to load Solar System. Please check the console for errors.');
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}
