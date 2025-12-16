// Distance unit definitions and conversion factors
export const DISTANCE_UNITS = {
    LIGHT_MINUTE: {
        name: 'Light Minute',
        abbreviation: 'lt-min',
        kmConversion: 17987547.48  // km per light minute
    },
    AU: {
        name: 'Astronomical Unit',
        abbreviation: 'AU',
        kmConversion: 149597870.7  // km per AU
    },
    MILLION_KM: {
        name: 'Million Kilometers',
        abbreviation: 'M km',
        kmConversion: 1e6
    },
    MILLION_MILES: {
        name: 'Million Miles',
        abbreviation: 'M mi',
        kmConversion: 1609344  // km per mile * 1 million
    }
};

// Rendering configuration
export const RENDER_CONFIG = {
    // Scaling factors for converting real distances to screen pixels
    SOLAR_SYSTEM_SCALE: 0.0000008,  // Pixels per km for solar system
    PLANETARY_SYSTEM_SCALE: 0.002,   // Pixels per km for planetary system

    // Orbital radius constraints
    MIN_ORBITAL_RADIUS: 5,           // Minimum orbit radius in pixels (lowered for true scale)
    MAX_ORBITAL_RADIUS: 500,         // Maximum for solar system view (increased for outer planets)

    // Visual styling
    ORBIT_LINE_WIDTH: 1,
    ORBIT_COLOR: 'rgba(255, 255, 255, 0.2)',
    ORBIT_HIGHLIGHT_COLOR: 'rgba(255, 255, 255, 0.4)',

    // Labels
    LABEL_FONT: '12px Arial',
    LABEL_COLOR: '#FFFFFF',
    LABEL_BACKGROUND: 'rgba(0, 0, 0, 0.7)',
    LABEL_PADDING: 4,

    // Background
    BACKGROUND_COLOR: '#000000',
    STAR_COLOR: '#FFFFFF',
    STAR_COUNT: 200,

    // Sun glow
    SUN_GLOW_RADIUS_MULTIPLIER: 2.5,
    SUN_GLOW_COLOR: '#FDB813'
};

// Animation configuration
export const ANIMATION_CONFIG = {
    DEFAULT_TIME_SCALE: 1,           // 1 second = 1 day
    MIN_TIME_SCALE: 0.1,
    MAX_TIME_SCALE: 1000,
    TIME_SCALE_STEP: 2,              // Multiply/divide by this amount
    FPS_TARGET: 60
};

// Camera configuration
export const CAMERA_CONFIG = {
    DEFAULT_ZOOM: 0.7,               // Zoomed out to show true scale of solar system
    MIN_ZOOM: 0.2,                   // Allow zooming out further
    MAX_ZOOM: 20.0,
    ZOOM_STEP: 0.2,
    SCROLL_ZOOM_FACTOR: 0.001,
    DOUBLE_CLICK_ZOOM: 2.0,          // How much to zoom on double-click
    TRANSITION_DURATION: 1000,       // ms for smooth transitions
    SMOOTHING: 0.15,                 // Camera interpolation factor (0-1, lower = smoother)

    // Planetary system zoom calculation
    PLANETARY_ZOOM_MARGIN: 1.5       // Multiplier for fitting planetary system
};

// View modes
export const VIEW_MODES = {
    SOLAR_SYSTEM: 'SOLAR_SYSTEM',
    PLANETARY_SYSTEM: 'PLANETARY_SYSTEM'
};

// Event types for state management
export const EVENTS = {
    VIEW_CHANGE: 'viewChange',
    PLANET_SELECT: 'planetSelect',
    TIME_SCALE_CHANGE: 'timeScaleChange',
    ZOOM_CHANGE: 'zoomChange',
    UNIT_CHANGE: 'unitChange',
    LABEL_TOGGLE: 'labelToggle'
};
