document.addEventListener("DOMContentLoaded", () => {
    // Selezioniamo il contenitore principale del cursore
    const cursorWrapper = document.getElementById('cursor-wrapper');
    const cursorOrbit = document.querySelector('.cursor-orbit');

    // Il cursore segue esattamente il mouse ovunque
    window.addEventListener('mousemove', (e) => {
        cursorWrapper.style.left = `${e.clientX}px`;
        cursorWrapper.style.top = `${e.clientY}px`;
    });

    // Effetto Hover sui link e le card del sito
    const interactiveSelectors = '.service-card, .info-card, .btn-primary, .btn-secondary, .btn-social, .nav-links a, .logo-container';
    const interactables = document.querySelectorAll(interactiveSelectors);

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Quando passi su un elemento interattivo, l'orbita si allarga
            cursorOrbit.style.width = '65px';
            cursorOrbit.style.height = '65px';
            cursorOrbit.style.backgroundColor = 'rgba(0, 243, 255, 0.05)';
            cursorOrbit.style.border = '1px solid rgba(0, 243, 255, 0.4)';
        });
        
        el.addEventListener('mouseleave', () => {
            // Quando esci, torna normale
            cursorOrbit.style.width = '45px';
            cursorOrbit.style.height = '45px';
            cursorOrbit.style.backgroundColor = 'transparent';
            cursorOrbit.style.border = 'none';
        });
    });
});
