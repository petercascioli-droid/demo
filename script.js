document.addEventListener("DOMContentLoaded", () => {
    const orb = document.getElementById('cursorOrb');
    
    // --- Configurazione Scia Curva (Effetto Centrifuga) ---
    const tailSegments = 7; // Numero di punti nella scia
    const tailDots = [];
    
    for (let i = 0; i < tailSegments; i++) {
        const dot = document.createElement('div');
        dot.className = 'meteor-tail-dot';
        // Dimensione decrescente dal cursore alla fine della scia
        const size = Math.max(3, 13 - i * 1.6);
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        // Opacità decrescente
        dot.style.opacity = `${0.6 - (i / tailSegments) * 0.5}`;
        document.body.appendChild(dot);
        tailDots.push({ x: window.innerWidth / 2, y: window.innerHeight / 2, el: dot });
    }

    // --- Variabili di Stato ---
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX;
    let orbY = mouseY;
    let angle = 0; // Angolo di rotazione dell'orbita
    
    let isHovering = false;
    let targetElement = null;

    // --- Event Listeners ---
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Elementi che triggerano l'effetto snap
    const interactiveSelectors = '.service-card, .btn-primary, .btn-secondary, .btn-social, .nav-links a';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(el => {
        // Quando il
