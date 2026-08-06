// Selezioniamo gli elementi del cursore personalizzato
const dot = document.querySelector('.cursor-dot');
const orbit = document.querySelector('.cursor-orbit');

// Ascoltiamo il movimento del mouse ovunque nello schermo
window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // La pallina centrale (dot) segue esattamente e istantaneamente il mouse
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Anche il contenitore dell'orbita segue il mouse esattamente
    // (La rotazione continua è gestita dal CSS tramite @keyframes spin)
    orbit.style.left = `${posX}px`;
    orbit.style.top = `${posY}px`;
});

// Aggiungiamo un feedback visivo al cursore quando passa sopra link o card
const interactables = document.querySelectorAll('a, button, .card');

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        // Quando entri in un elemento cliccabile, l'orbita si allarga
        orbit.style.width = '60px';
        orbit.style.height = '60px';
    });
    
    el.addEventListener('mouseleave', () => {
        // Quando esci, torna alla dimensione normale
        orbit.style.width = '45px';
        orbit.style.height = '45px';
    });
});
