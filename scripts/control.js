const toggleButton = document.getElementById('toggle-animation');
const orbits = document.querySelectorAll('.orbit');
let animationRunning = true;

toggleButton.addEventListener('click', () => {
    animationRunning = !animationRunning;
    const animationState = animationRunning ? 'running' : 'paused';
    const buttonText = animationRunning ? "Arrêter l'animation" : "Démarrer l'animation";

    orbits.forEach(orbit => {
        orbit.style.animationPlayState = animationState;
    });
    
    toggleButton.textContent = buttonText;
});
