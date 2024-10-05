const solarSystem = document.querySelector('.solar-system');
const planets = document.querySelectorAll('.planet');
let zoomLevel = 1;
const zoomValueDisplay = document.getElementById('zoom-value');
let currentPlanet = null;
let zoomActive = false;

function updateZoomDisplay() {
    zoomValueDisplay.textContent = `Zoom: ${Math.round(zoomLevel * 100)}%`;
}

function updateZoom() {
    const transform = `scale(${zoomLevel})`;
    if (currentPlanet) {
        const { left, top, width, height } = currentPlanet.getBoundingClientRect();
        const centerX = left + width / 2 - window.innerWidth / 2;
        const centerY = top + height / 2 - window.innerHeight / 2;
        solarSystem.style.transform = `${transform} translate(${-centerX * (zoomLevel - 1)}px, ${-centerY * (zoomLevel - 1)}px)`;
    } else {
        solarSystem.style.transform = transform;
    }
    updateZoomDisplay();
}

document.getElementById('zoom-in').addEventListener('click', (e) => {
    e.stopPropagation();
    zoomLevel += 0.1;
    updateZoom();
});

document.getElementById('zoom-out').addEventListener('click', (e) => {
    e.stopPropagation();
    zoomLevel = Math.max(0.5, zoomLevel - 0.1);
    updateZoom();
});

planets.forEach(planet => {
    planet.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentPlanet === planet && zoomActive) {
            currentPlanet = null;
            zoomLevel = 1;
            solarSystem.style.transform = `scale(1)`;
            updateZoomDisplay();
            zoomActive = false;
        } else {
            currentPlanet = planet;
            zoomLevel = 2;
            zoomActive = true;
            updateZoom();
        }
    });
});

function followPlanet() {
    if (currentPlanet) {
        const { left, top, width, height } = currentPlanet.getBoundingClientRect();
        solarSystem.style.transform = `scale(${zoomLevel}) translate(${-left + (window.innerWidth / 2) - (width / 2)}px, ${-top + (window.innerHeight / 2) - (height / 2)}px)`;
    }
}

setInterval(followPlanet, 100);
updateZoomDisplay();
