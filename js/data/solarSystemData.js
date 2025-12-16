// Solar system data with real orbital information
export const SOLAR_SYSTEM_DATA = {
    sun: {
        name: "Sun",
        radius: 4,                   // Visual radius in pixels (scaled down for true distance rendering)
        color: "#FDB813",
        imageUrl: "assets/images/sun.png"
    },

    planets: [
        {
            name: "Mercury",
            radius: 1.5,                 // Scaled down for true distance rendering
            color: "#8C7853",
            imageUrl: "assets/images/planets/mercury.png",
            orbitalRadius: 57.9e6,      // km from Sun
            orbitalPeriod: 88,          // days
            distanceAU: 0.39,
            angle: 0                     // Starting angle in radians
        },
        {
            name: "Venus",
            radius: 2.5,
            color: "#FFC649",
            imageUrl: "assets/images/planets/venus.png",
            orbitalRadius: 108.2e6,
            orbitalPeriod: 225,
            distanceAU: 0.72,
            angle: Math.PI / 4
        },
        {
            name: "Earth",
            radius: 3,
            color: "#4A90E2",
            imageUrl: "assets/images/planets/earth.png",
            orbitalRadius: 149.6e6,
            orbitalPeriod: 365.25,
            distanceAU: 1.0,
            angle: Math.PI / 2
        },
        {
            name: "Mars",
            radius: 2,
            color: "#E27B58",
            imageUrl: "assets/images/planets/mars.png",
            orbitalRadius: 227.9e6,
            orbitalPeriod: 687,
            distanceAU: 1.52,
            angle: Math.PI
        },
        {
            name: "Jupiter",
            radius: 6,
            color: "#C88B3A",
            imageUrl: "assets/images/planets/jupiter.png",
            orbitalRadius: 778.5e6,
            orbitalPeriod: 4333,
            distanceAU: 5.2,
            angle: Math.PI * 1.5
        },
        {
            name: "Saturn",
            radius: 5,
            color: "#FAD5A5",
            imageUrl: "assets/images/planets/saturn.png",
            orbitalRadius: 1434e6,
            orbitalPeriod: 10759,
            distanceAU: 9.58,
            angle: 0.3,
            hasRings: true               // Special rendering flag
        },
        {
            name: "Uranus",
            radius: 3.5,
            color: "#4FD0E7",
            imageUrl: "assets/images/planets/uranus.png",
            orbitalRadius: 2871e6,
            orbitalPeriod: 30687,
            distanceAU: 19.22,
            angle: 1.2
        },
        {
            name: "Neptune",
            radius: 3.5,
            color: "#4166F5",
            imageUrl: "assets/images/planets/neptune.png",
            orbitalRadius: 4495e6,
            orbitalPeriod: 60190,
            distanceAU: 30.05,
            angle: 2.5
        }
    ]
};
