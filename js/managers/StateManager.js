import { VIEW_MODES, ANIMATION_CONFIG, DISTANCE_UNITS } from '../core/Constants.js';

// StateManager handles application state and events
export class StateManager {
    constructor() {
        this.viewMode = VIEW_MODES.SOLAR_SYSTEM;
        this.selectedPlanet = null;
        this.timeScale = ANIMATION_CONFIG.DEFAULT_TIME_SCALE;
        this.distanceUnit = DISTANCE_UNITS.AU;
        this.showLabels = true;
        this.isPaused = false;

        // Event listeners
        this.listeners = new Map();
    }

    // Set view mode
    setViewMode(mode) {
        if (this.viewMode !== mode) {
            this.viewMode = mode;
            this.emit('viewChange', mode);
        }
    }

    // Get view mode
    getViewMode() {
        return this.viewMode;
    }

    // Select a planet
    selectPlanet(planet) {
        this.selectedPlanet = planet;
        this.emit('planetSelect', planet);
    }

    // Get selected planet
    getSelectedPlanet() {
        return this.selectedPlanet;
    }

    // Set time scale
    setTimeScale(scale) {
        this.timeScale = Math.max(
            ANIMATION_CONFIG.MIN_TIME_SCALE,
            Math.min(ANIMATION_CONFIG.MAX_TIME_SCALE, scale)
        );
        this.emit('timeScaleChange', this.timeScale);
    }

    // Get time scale
    getTimeScale() {
        return this.timeScale;
    }

    // Increase time scale
    increaseTimeScale() {
        this.setTimeScale(this.timeScale * ANIMATION_CONFIG.TIME_SCALE_STEP);
    }

    // Decrease time scale
    decreaseTimeScale() {
        this.setTimeScale(this.timeScale / ANIMATION_CONFIG.TIME_SCALE_STEP);
    }

    // Set distance unit
    setDistanceUnit(unit) {
        // unit is already a unit object from UnitConverter.getUnit()
        this.distanceUnit = unit;
        this.emit('unitChange', this.distanceUnit);
    }

    // Get distance unit
    getDistanceUnit() {
        return this.distanceUnit;
    }

    // Toggle labels
    toggleLabels() {
        this.showLabels = !this.showLabels;
        this.emit('labelToggle', this.showLabels);
    }

    // Set labels visibility
    setShowLabels(show) {
        this.showLabels = show;
        this.emit('labelToggle', this.showLabels);
    }

    // Get labels visibility
    getShowLabels() {
        return this.showLabels;
    }

    // Toggle pause
    togglePause() {
        this.isPaused = !this.isPaused;
        this.emit('pauseToggle', this.isPaused);
    }

    // Event emitter pattern
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    // Remove event listener
    off(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    // Emit event
    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => callback(data));
        }
    }

    // Get full state
    getState() {
        return {
            viewMode: this.viewMode,
            selectedPlanet: this.selectedPlanet,
            timeScale: this.timeScale,
            distanceUnit: this.distanceUnit,
            showLabels: this.showLabels,
            isPaused: this.isPaused
        };
    }
}
