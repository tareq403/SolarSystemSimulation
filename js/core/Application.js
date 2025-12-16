import { Renderer } from './Renderer.js';
import { Camera } from './Camera.js';
import { AnimationLoop } from './AnimationLoop.js';
import { VIEW_MODES, CAMERA_CONFIG } from './Constants.js';
import { StateManager } from '../managers/StateManager.js';
import { AssetManager } from '../managers/AssetManager.js';
import { InputManager } from '../managers/InputManager.js';
import { TransitionManager } from '../managers/TransitionManager.js';
import { Sun } from '../entities/Sun.js';
import { Planet } from '../entities/Planet.js';
import { Moon } from '../entities/Moon.js';
import { SolarSystem } from '../systems/SolarSystem.js';
import { PlanetarySystem } from '../systems/PlanetarySystem.js';
import { SOLAR_SYSTEM_DATA } from '../data/solarSystemData.js';
import { MOON_DATA } from '../data/moonData.js';
import { MathUtils } from '../utils/MathUtils.js';
import { UnitConverter } from '../utils/UnitConverter.js';

// Main Application class - orchestrates everything
export class Application {
    constructor(canvasId) {
        // Get canvas and context
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Set canvas size
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));

        // Core components
        this.renderer = new Renderer(this.ctx);
        this.camera = new Camera(this.canvas);
        this.stateManager = new StateManager();
        this.assetManager = new AssetManager();
        this.transitionManager = new TransitionManager(this.camera);

        // Systems
        this.solarSystem = null;
        this.planetarySystems = new Map(); // Map of planet name to planetary system

        // Animation loop
        this.animationLoop = new AnimationLoop(this);

        // Input manager (initialized after systems are created)
        this.inputManager = null;
    }

    // Initialize the application
    async init() {
        console.log('Initializing Solar System...');

        // Load all assets
        await this.loadAssets();

        // Create solar system and planetary systems
        this.createSolarSystem();

        // Initialize input manager
        this.inputManager = new InputManager(this.canvas, this.camera, this);

        // Setup UI controls
        this.setupUIControls();

        // Start at solar system view, zoomed in on inner planets
        // Calculate zoom to show inner planets (Mercury through Mars/Jupiter)
        const marsOrbit = this.solarSystem.getPlanet('Mars').orbitalRadius;
        const initialZoom = MathUtils.calculateFitZoom(this.canvas, marsOrbit * 2.5);
        this.camera.setImmediate(0, 0, initialZoom);

        console.log('Initialization complete!');
    }

    // Load all image assets
    async loadAssets() {
        const assets = [];

        // Sun
        assets.push({
            key: 'sun',
            url: SOLAR_SYSTEM_DATA.sun.imageUrl
        });

        // Planets
        SOLAR_SYSTEM_DATA.planets.forEach(planetData => {
            assets.push({
                key: planetData.name,
                url: planetData.imageUrl
            });
        });

        // Moons
        Object.values(MOON_DATA).flat().forEach(moonData => {
            assets.push({
                key: moonData.name,
                url: moonData.imageUrl
            });
        });

        await this.assetManager.loadAll(assets);
    }

    // Create solar system with all planets and moons
    createSolarSystem() {
        // Create Sun
        const sunData = SOLAR_SYSTEM_DATA.sun;
        const sun = new Sun({
            ...sunData,
            image: this.assetManager.getImage('sun')
        });

        if (this.assetManager.hasImage('sun')) {
            sun.setImage(this.assetManager.getImage('sun'));
        }

        // Create planets
        const planets = SOLAR_SYSTEM_DATA.planets.map((planetData, index) => {
            // Scale orbital radius for display
            const scaledRadius = MathUtils.scaleOrbitalRadius(
                planetData.orbitalRadius,
                planetData.name
            );

            const planet = new Planet({
                name: planetData.name,
                radius: planetData.radius,
                color: planetData.color,
                imageUrl: planetData.imageUrl,
                orbitalRadius: scaledRadius,         // Scaled pixels for rendering
                actualDistanceKm: planetData.orbitalRadius, // Actual km for distance labels
                orbitalPeriod: planetData.orbitalPeriod,
                angle: planetData.angle,
                hasRings: planetData.hasRings || false,
                parent: sun
            });

            if (this.assetManager.hasImage(planetData.name)) {
                planet.setImage(this.assetManager.getImage(planetData.name));
            }

            // Add moons to this planet
            const moonDataList = MOON_DATA[planetData.name] || [];

            // Extract all moon distances for this planet (for even distribution)
            const allMoonDistances = moonDataList.map(m => m.orbitalRadius);

            moonDataList.forEach((moonData, moonIndex) => {
                // Scale moon orbital radius for planetary view with even distribution
                const scaledMoonRadius = MathUtils.scaleMoonOrbitalRadius(
                    moonData.orbitalRadius,
                    allMoonDistances
                );

                const moon = new Moon({
                    name: moonData.name,
                    radius: moonData.radius,
                    color: moonData.color,
                    imageUrl: moonData.imageUrl,
                    orbitalRadius: scaledMoonRadius,         // Scaled pixels for rendering
                    actualDistanceKm: moonData.orbitalRadius, // Actual km for distance labels
                    orbitalPeriod: moonData.orbitalPeriod,
                    angle: moonData.angle,
                    parent: planet
                });

                if (this.assetManager.hasImage(moonData.name)) {
                    moon.setImage(this.assetManager.getImage(moonData.name));
                }

                planet.addMoon(moon);
            });

            // Create planetary system for this planet
            const planetarySystem = new PlanetarySystem(planet);
            planet.setPlanetarySystem(planetarySystem);
            this.planetarySystems.set(planet.name, planetarySystem);

            return planet;
        });

        // Create solar system
        this.solarSystem = new SolarSystem(sun, planets);

        console.log(`Created solar system with ${planets.length} planets`);
    }

    // Setup UI control event listeners
    setupUIControls() {
        // Speed controls
        document.getElementById('speedUp').addEventListener('click', () => {
            this.stateManager.increaseTimeScale();
            this.updateTimeDisplay();
        });

        document.getElementById('speedDown').addEventListener('click', () => {
            this.stateManager.decreaseTimeScale();
            this.updateTimeDisplay();
        });

        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => {
            this.camera.zoomIn();
        });

        document.getElementById('zoomOut').addEventListener('click', () => {
            this.camera.zoomOut();
        });

        // Unit selector
        document.getElementById('unitSelector').addEventListener('change', (e) => {
            const unit = UnitConverter.getUnit(e.target.value);
            this.stateManager.setDistanceUnit(unit);
        });

        // Label toggle
        document.getElementById('labelToggle').addEventListener('change', (e) => {
            this.stateManager.setShowLabels(e.target.checked);
        });

        // Initialize time display
        this.updateTimeDisplay();
    }

    // Update time scale display
    updateTimeDisplay() {
        const timeScale = this.stateManager.getTimeScale();
        const display = document.getElementById('timeDisplay');
        display.textContent = `1 second = ${timeScale.toFixed(1)} day${timeScale !== 1 ? 's' : ''}`;
    }

    // Start the application
    start() {
        this.animationLoop.start();
    }

    // Update (called every frame)
    update(deltaTime) {
        // Update transition manager
        this.transitionManager.update(deltaTime);

        // Update camera (smooth interpolation)
        if (!this.transitionManager.isActive()) {
            this.camera.update();
        }

        // Update active system
        const activeSystem = this.getActiveSystem();
        if (activeSystem) {
            activeSystem.update(deltaTime, this.stateManager.getTimeScale());
        }
    }

    // Render (called every frame)
    render() {
        // Clear canvas
        this.renderer.clear();

        // Draw starry background
        this.renderer.drawBackground(this.camera);

        // Draw active system
        const activeSystem = this.getActiveSystem();
        if (activeSystem) {
            const showLabels = this.stateManager.getShowLabels();
            const distanceUnit = this.stateManager.getDistanceUnit();

            activeSystem.draw(
                this.ctx,
                this.camera,
                this.renderer,
                showLabels,
                distanceUnit
            );
        }
    }

    // Get currently active system
    getActiveSystem() {
        if (this.stateManager.getViewMode() === VIEW_MODES.SOLAR_SYSTEM) {
            return this.solarSystem;
        } else {
            const planet = this.stateManager.getSelectedPlanet();
            return planet ? planet.getPlanetarySystem() : null;
        }
    }

    // Handle planet click
    handlePlanetClick(planet) {
        if (this.stateManager.getViewMode() === VIEW_MODES.SOLAR_SYSTEM) {
            this.switchToPlanetaryView(planet);
        }
    }

    // Switch to planetary view
    switchToPlanetaryView(planet) {
        console.log(`Switching to planetary view: ${planet.name}`);

        this.stateManager.selectPlanet(planet);
        this.stateManager.setViewMode(VIEW_MODES.PLANETARY_SYSTEM);

        // Get planet position
        const pos = planet.getPosition();

        // Calculate zoom to fit planetary system
        const planetarySystem = planet.getPlanetarySystem();
        const boundingRadius = planetarySystem.getBoundingRadius();
        const targetZoom = MathUtils.calculateFitZoom(this.canvas, boundingRadius * 1.5);

        // Smooth transition
        this.transitionManager.transitionTo(pos.x, pos.y, targetZoom);
    }

    // Switch to solar system view
    switchToSolarView() {
        if (this.stateManager.getViewMode() === VIEW_MODES.PLANETARY_SYSTEM) {
            console.log('Switching to solar system view');

            this.stateManager.setViewMode(VIEW_MODES.SOLAR_SYSTEM);
            this.stateManager.selectPlanet(null);

            // Transition back to solar system, focused on inner planets
            const marsOrbit = this.solarSystem.getPlanet('Mars').orbitalRadius;
            const innerPlanetsZoom = MathUtils.calculateFitZoom(this.canvas, marsOrbit * 2.5);
            this.transitionManager.transitionTo(0, 0, innerPlanetsZoom);
        }
    }

    // Resize canvas to fill window
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}
