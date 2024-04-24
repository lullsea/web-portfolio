var $ = require("jquery"),
    Globe = require("encom-globe");
// #################### GLOBE ####################

let globeScale = .5;

let globeWidth = window.innerWidth * globeScale;
let globeHeight = window.innerHeight * globeScale;

globe = new Globe(globeWidth * 2, globeHeight, {
    font: "monospace",
    data: [],
    tiles: grid.tiles,
    baseColor: "#000",
    markerColor: "#0e44ad",
    pinColor: "#aacfd1",

    satelliteColor: "#aacfd1",
    scale: 1.25,
    dayLength: 14000,
    introLinesDuration: 2000,
    maxPins: 500,
    maxMarkers: 4,
    viewAngle: -0.2
});

let c = globe.domElement;
let FILTER = "filter: invert(1) contrast(0.96);" 
c.style = FILTER;

$('#globe').append(c);

function animate() {
    if (globe) {
            globe.tick();
        }
    requestAnimationFrame(animate);
}
let initGlobe = () => {
    globe.init();
    animate();
    globe.addMarker(3.1319, 101.6841, "Kuala Lumpur", true);
    var constellation = [];
    var alt = 1;

    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 3; j++) {
            constellation.push({
                lat: 50 * i - 30 + 15 * Math.random(),
                lon: 120 * j - 120 + 30 * i,
                altitude: alt
            });
        }
    }

    globe.addConstellation(constellation, {
            coreColor: "#bac",
            numWaves: 8,
            size: 0.8,
        });
}

initGlobe()
