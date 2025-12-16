# Solar System Visualization

An interactive, realistic Solar System visualization built with vanilla JavaScript and Canvas2D. Features accurate relative orbital velocities, clickable planets to explore moon systems, and comprehensive controls.

## Features

- **8 Planets**: All planets from Mercury to Neptune with accurate relative orbital periods
- **26 Major Moons**: Including Earth's Moon, Mars' Phobos & Deimos, Jupiter's Galilean moons, Saturn's Titan, and more
- **Accurate Orbital Mechanics**: Relative orbital velocities are scientifically accurate (Mercury: 88 days, Neptune: 60,190 days)
- **Interactive Controls**:
  - Click any planet to zoom into its moon system
  - Mouse scroll to zoom in/out
  - Drag to pan when zoomed in
  - Double-click to center zoom at point
  - ESC key to return to solar system view
  - Arrow keys for zoom control
- **Animation Speed Controls**: Speed up or slow down time (1 second = X days display)
- **Distance Units**: Toggle between AU, Light Minutes, Million km, and Million miles
- **Label Toggle**: Show/hide names of all celestial bodies
- **Smooth Transitions**: Fluid camera movements between views
- **Realistic Visuals**: Supports NASA imagery with fallback to procedurally generated graphics

## Quick Start

1. **Start a local server**:
   ```bash
   cd /Users/mahmudal-noortareq/Workspace/Web/SimpleSolarSystem
   python3 -m http.server 8000
   ```

2. **Open in browser**:
   ```
   http://localhost:8000
   ```

3. **That's it!** The application works without any build step.

## Project Structure

```
SimpleSolarSystem/
├── index.html              # Entry point
├── css/
│   ├── main.css           # Main styles
│   └── controls.css       # UI controls styling
├── js/
│   ├── main.js            # Application entry point
│   ├── core/
│   │   ├── Application.js  # Main controller
│   │   ├── Renderer.js     # Canvas rendering
│   │   ├── Camera.js       # Viewport management
│   │   ├── AnimationLoop.js
│   │   └── Constants.js    # Configuration
│   ├── entities/
│   │   ├── CelestialBody.js # Base class
│   │   ├── Sun.js
│   │   ├── Planet.js
│   │   └── Moon.js
│   ├── systems/
│   │   ├── OrbitalSystem.js # Base system
│   │   ├── SolarSystem.js
│   │   └── PlanetarySystem.js
│   ├── managers/
│   │   ├── StateManager.js
│   │   ├── InputManager.js
│   │   ├── AssetManager.js
│   │   └── TransitionManager.js
│   ├── utils/
│   │   ├── MathUtils.js
│   │   └── UnitConverter.js
│   └── data/
│       ├── solarSystemData.js # Planet orbital data
│       └── moonData.js        # Moon orbital data
└── assets/
    ├── README.md          # Image download guide
    └── images/
        ├── planets/       # Place planet images here
        └── moons/         # Place moon images here
```

## Adding Images

The application works with colored circles as fallbacks, but for the best experience:

1. Visit https://www.solarsystemscope.com/textures/ or https://images.nasa.gov/
2. Download images for planets and moons
3. Place them in `assets/images/planets/` and `assets/images/moons/`
4. Name them exactly as: `mercury.png`, `earth.png`, `moon.png`, etc. (lowercase)

See `assets/README.md` for detailed instructions.

## Controls

### Mouse
- **Click** on a planet to zoom into its moon system
- **Drag** to pan the view
- **Scroll** to zoom in/out
- **Double-click** to zoom and center on a point

### Keyboard
- **ESC**: Return to solar system view / zoom out
- **↑/↓**: Zoom in/out

### UI Buttons
- **Speed +/-**: Increase/decrease animation speed
- **Zoom +/-**: Zoom in/out
- **Distance Units**: Change distance measurement units
- **Show Labels**: Toggle celestial body labels

## Technical Details

### Architecture
- **Vanilla JavaScript** with ES6 modules (no build step required)
- **Canvas2D** for rendering
- **Object-Oriented** design with clean separation of concerns
- **Event-driven** state management
- **60 FPS** animation loop

### Orbital Mechanics
- Planets update positions based on real orbital periods
- Angular velocity calculated as: `(2π / period) * timeScale`
- Positions calculated from polar coordinates: `(radius, angle) → (x, y)`

### Scaling
- **Inner planets** (Mercury-Mars): Linear scale
- **Outer planets** (Jupiter-Neptune): Logarithmic scale
- This balanced approach keeps all planets visible while maintaining relative distances

### Camera System
- Smooth interpolation for position and zoom
- World-to-screen and screen-to-world coordinate transformations
- Support for panning and zooming at specific points

## Browser Compatibility

Works in all modern browsers that support:
- ES6 modules
- Canvas2D
- RequestAnimationFrame

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance

- Renders at 60 FPS on modern hardware
- Efficient culling of off-screen objects
- Minimal memory footprint
- No external dependencies

## Customization

### Adjust Animation Speed
Edit `ANIMATION_CONFIG` in `js/core/Constants.js`:
```javascript
export const ANIMATION_CONFIG = {
    DEFAULT_TIME_SCALE: 1,    // 1 second = 1 day
    MIN_TIME_SCALE: 0.1,
    MAX_TIME_SCALE: 1000,
    TIME_SCALE_STEP: 2
};
```

### Adjust Camera Settings
Edit `CAMERA_CONFIG` in `js/core/Constants.js`:
```javascript
export const CAMERA_CONFIG = {
    DEFAULT_ZOOM: 1.0,
    MIN_ZOOM: 0.3,
    MAX_ZOOM: 20.0,
    ZOOM_STEP: 0.2
};
```

### Add More Moons
Edit `js/data/moonData.js` and add moon data for any planet.

## Future Enhancements

Possible additions:
- Asteroid belt visualization
- Dwarf planets (Pluto, Ceres, etc.)
- Comet trajectories
- Real-time date/time display
- Planet rotation (on axis)
- Enhanced ring systems
- Touch controls for mobile
- Save/load view preferences

## License

This project is open source. Feel free to use, modify, and distribute.

## Credits

- Orbital data from NASA
- Inspired by real solar system mechanics
- Built with vanilla JavaScript for educational purposes

## Support

For issues or questions, please check:
1. Browser console for error messages
2. Asset loading (check `assets/README.md`)
3. Server is running correctly

Enjoy exploring the Solar System! 🚀🌍🪐
