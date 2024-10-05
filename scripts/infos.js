document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    const infoBox = createInfoBox();
    const detailsBox = createDetailsBox();
    let activePlanet = null; // Suivre la planète active actuelle

    fetch('./infoPlanet.json')
        .then(response => response.json())
        .then(data => {
            const planetData = data.planets;
            planets.forEach(planet => {
                const planetClass = planet.classList[1].toLowerCase();
                const currentPlanetData = planetData.find(p => p.name.toLowerCase() === planetClass);

                if (currentPlanetData) {
                    planet.addEventListener('mouseover', (e) => {
                        e.stopPropagation();
                        const displayName = planet.classList.contains('moon') ? 'Moon' : currentPlanetData.name;
                        showInfoBox(e, { name: displayName }, infoBox);
                    });

                    planet.addEventListener('mousemove', (e) => updateInfoBoxPosition(e, infoBox));
                    planet.addEventListener('mouseout', (e) => {
                        e.stopPropagation();
                        hideInfoBox(infoBox);
                    });

                    planet.addEventListener('click', () => {
                        if (activePlanet === planet) {
                            detailsBox.style.display = 'none';
                            planet.parentElement.classList.remove('active-orbit');
                            activePlanet = null; // Réinitialiser la planète active
                        } else {
                            if (activePlanet) {
                                activePlanet.parentElement.classList.remove('active-orbit'); // Retirer l'orbite active
                                detailsBox.style.display = 'none'; // Cacher les détails de la planète précédente
                            }
                            toggleDetailsBox(currentPlanetData, detailsBox, planet);
                            activePlanet = planet; // Mettre à jour la planète active
                        }
                    });
                }
            });
        });
});

function createInfoBox() {
    const infoBox = document.createElement('div');
    Object.assign(infoBox.style, {
        position: 'absolute',
        backgroundColor: 'blue',
        padding: '5px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        display: 'none',
        color: '#fff',
        fontSize: '20px',
        fontWeight: '600'
    });
    document.body.appendChild(infoBox);
    return infoBox;
}

function createDetailsBox() {
    const detailsBox = document.createElement('div');
    Object.assign(detailsBox.style, {
        position: 'absolute',
        width: '400px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
        color: '#fff',
        fontSize: '16px',
        display: 'none',
        zIndex: '1000'
    });
    document.body.appendChild(detailsBox);
    return detailsBox;
}

function showInfoBox(e, currentPlanetData, infoBox) {
    infoBox.textContent = currentPlanetData.name;
    infoBox.style.display = 'block';
    updateInfoBoxPosition(e, infoBox);
}

function updateInfoBoxPosition(e, infoBox) {
    infoBox.style.left = `${e.pageX + 10}px`;
    infoBox.style.top = `${e.pageY + 10}px`;
}

function hideInfoBox(infoBox) {
    infoBox.style.display = 'none';
}

function showDetailsBox(planetData, detailsBox) {
    detailsBox.innerHTML = `
        <div style="margin-bottom: 10px;"><strong>Name:</strong> ${planetData.name}</div>
        <div style="margin-bottom: 10px;"><strong>Nickname:</strong> ${planetData.nickname}</div>
        <div style="margin-bottom: 10px;"><strong>Size:</strong> ${planetData.size}</div>
        <div style="margin-bottom: 10px;"><strong>Orbit size:</strong> ${planetData.orbit_size}</div>
        <div style="margin-bottom: 10px;"><strong>Surface area:</strong> ${planetData.surface_area}</div>
        <div style="margin-bottom: 10px;"><strong>Description:</strong> ${planetData.description}</div>
        <div style="margin-bottom: 10px;"><strong>Orbital speed:</strong> ${planetData.orbital_speed}</div>
        <div><strong>Age:</strong> ${planetData.age}</div>
    `;
    detailsBox.style.display = 'block';
    detailsBox.style.left = '10px';
    detailsBox.style.top = '100px';
}

function toggleDetailsBox(currentPlanetData, detailsBox, planet) {
    const orbit = planet.parentElement;
    document.querySelectorAll('.orbit').forEach(o => o.classList.remove('active-orbit'));
    showDetailsBox(currentPlanetData, detailsBox);
    orbit.classList.add('active-orbit');
}

document.addEventListener('click', (e) => {
    const detailsBox = document.querySelector('div');
    if (detailsBox.style.display === 'block' && !detailsBox.contains(e.target)) {
        detailsBox.style.display = 'none';
        document.querySelectorAll('.orbit').forEach(o => o.classList.remove('active-orbit'));
        activePlanet = null;
    }
});
