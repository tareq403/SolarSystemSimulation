// Moon data organized by planet with real orbital information
export const MOON_DATA = {
    Mercury: [],  // Mercury has no moons
    Venus: [],    // Venus has no moons

    Earth: [
        {
            name: "Moon",
            radius: 3,
            color: "#C0C0C0",
            imageUrl: "assets/images/moons/moon.png",
            orbitalRadius: 384400,      // km from Earth
            orbitalPeriod: 27.3,        // days
            angle: 0
        }
    ],

    Mars: [
        {
            name: "Phobos",
            radius: 1.5,
            color: "#A0A0A0",
            imageUrl: "assets/images/moons/phobos.png",
            orbitalRadius: 9376,
            orbitalPeriod: 0.32,
            angle: 0
        },
        {
            name: "Deimos",
            radius: 1,
            color: "#B0B0B0",
            imageUrl: "assets/images/moons/deimos.png",
            orbitalRadius: 23460,
            orbitalPeriod: 1.26,
            angle: Math.PI
        }
    ],

    Jupiter: [
        {
            name: "Io",
            radius: 3,
            color: "#FFD700",
            imageUrl: "assets/images/moons/io.png",
            orbitalRadius: 421700,
            orbitalPeriod: 1.77,
            angle: 0
        },
        {
            name: "Europa",
            radius: 2.8,
            color: "#DEB887",
            imageUrl: "assets/images/moons/europa.png",
            orbitalRadius: 671100,
            orbitalPeriod: 3.55,
            angle: Math.PI / 2
        },
        {
            name: "Ganymede",
            radius: 4,
            color: "#8B7355",
            imageUrl: "assets/images/moons/ganymede.png",
            orbitalRadius: 1070400,
            orbitalPeriod: 7.15,
            angle: Math.PI
        },
        {
            name: "Callisto",
            radius: 3.8,
            color: "#696969",
            imageUrl: "assets/images/moons/callisto.png",
            orbitalRadius: 1882700,
            orbitalPeriod: 16.69,
            angle: Math.PI * 1.5
        }
    ],

    Saturn: [
        {
            name: "Titan",
            radius: 4.5,
            color: "#FFA500",
            imageUrl: "assets/images/moons/titan.png",
            orbitalRadius: 1221870,
            orbitalPeriod: 15.95,
            angle: 0
        },
        {
            name: "Rhea",
            radius: 2,
            color: "#D3D3D3",
            imageUrl: "assets/images/moons/rhea.png",
            orbitalRadius: 527108,
            orbitalPeriod: 4.52,
            angle: Math.PI / 4
        },
        {
            name: "Iapetus",
            radius: 2,
            color: "#A9A9A9",
            imageUrl: "assets/images/moons/iapetus.png",
            orbitalRadius: 3560820,
            orbitalPeriod: 79.33,
            angle: Math.PI / 2
        },
        {
            name: "Dione",
            radius: 1.8,
            color: "#E0E0E0",
            imageUrl: "assets/images/moons/dione.png",
            orbitalRadius: 377396,
            orbitalPeriod: 2.74,
            angle: Math.PI
        },
        {
            name: "Tethys",
            radius: 1.8,
            color: "#F0F0F0",
            imageUrl: "assets/images/moons/tethys.png",
            orbitalRadius: 294619,
            orbitalPeriod: 1.89,
            angle: Math.PI * 1.25
        },
        {
            name: "Enceladus",
            radius: 1.5,
            color: "#FFFFFF",
            imageUrl: "assets/images/moons/enceladus.png",
            orbitalRadius: 237948,
            orbitalPeriod: 1.37,
            angle: Math.PI * 1.5
        },
        {
            name: "Mimas",
            radius: 1.5,
            color: "#DCDCDC",
            imageUrl: "assets/images/moons/mimas.png",
            orbitalRadius: 185539,
            orbitalPeriod: 0.94,
            angle: Math.PI * 1.75
        }
    ],

    Uranus: [
        {
            name: "Titania",
            radius: 2.5,
            color: "#C0C0C0",
            imageUrl: "assets/images/moons/titania.png",
            orbitalRadius: 435910,
            orbitalPeriod: 8.71,
            angle: 0
        },
        {
            name: "Oberon",
            radius: 2.4,
            color: "#A8A8A8",
            imageUrl: "assets/images/moons/oberon.png",
            orbitalRadius: 583520,
            orbitalPeriod: 13.46,
            angle: Math.PI / 3
        },
        {
            name: "Umbriel",
            radius: 1.8,
            color: "#808080",
            imageUrl: "assets/images/moons/umbriel.png",
            orbitalRadius: 266000,
            orbitalPeriod: 4.14,
            angle: Math.PI * 2 / 3
        },
        {
            name: "Ariel",
            radius: 1.9,
            color: "#B8B8B8",
            imageUrl: "assets/images/moons/ariel.png",
            orbitalRadius: 190900,
            orbitalPeriod: 2.52,
            angle: Math.PI
        },
        {
            name: "Miranda",
            radius: 1.5,
            color: "#D0D0D0",
            imageUrl: "assets/images/moons/miranda.png",
            orbitalRadius: 129900,
            orbitalPeriod: 1.41,
            angle: Math.PI * 1.5
        }
    ],

    Neptune: [
        {
            name: "Triton",
            radius: 3.5,
            color: "#FFB6C1",
            imageUrl: "assets/images/moons/triton.png",
            orbitalRadius: 354759,
            orbitalPeriod: 5.88,
            angle: 0
        },
        {
            name: "Nereid",
            radius: 1.5,
            color: "#C0C0C0",
            imageUrl: "assets/images/moons/nereid.png",
            orbitalRadius: 5513818,
            orbitalPeriod: 360.14,
            angle: Math.PI
        },
        {
            name: "Proteus",
            radius: 2,
            color: "#A9A9A9",
            imageUrl: "assets/images/moons/proteus.png",
            orbitalRadius: 117647,
            orbitalPeriod: 1.12,
            angle: Math.PI / 2
        }
    ]
};
