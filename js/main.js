var $ = require("jquery"),
    Globe = require("encom-globe");
// #################### GLOBE ####################

var main = $("#main-content")
globe = new Globe(window.innerWidth, window.innerHeight, {
    font: "monospace",
    data: [],
    tiles: grid.tiles,
    baseColor: "#000",
    markerColor: "#0e44ad",
    pinColor: "#aacfd1",

    satelliteColor: "#aacfd1",
    scale: 1,
    dayLength: 14000,
    introLinesDuration: 2000,
    maxPins: 500,
    maxMarkers: 4,
    viewAngle: 0.1
});

let c = globe.domElement;
c.style = "filter: invert(1)";

$('#details').append(c);

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
            coreColor: "#ff0000",
            numWaves: 8,
            size: 0.6,
        });
}
window.addEventListener('resize', () => {
    let h = window.innerHeight;
    globe.camera.aspect = window.innerWidth / h;
    globe.camera.updateProjectionMatrix();
    globe.renderer.setSize(window.innerWidth, h);
})

initGlobe()
