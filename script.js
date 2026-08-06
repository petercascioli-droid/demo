document.addEventListener("DOMContentLoaded", () => {
    const orb = document.getElementById('cursorOrb');
    
    // --- Configurazione Scia Curva (Effetto Centrifuga) ---
    const tailSegments = 7; // Numero di punti nella scia
    const tailDots = [];
    
    for (let i = 0; i < tailSegments; i++) {
        const dot = document.createElement('div');
        dot.className = 'meteor-tail-dot';
        const size = Math.max(3, 13 - i * 1.6);
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = `${0.6 - (i / tailSegments) * 0.5}`;
        document.body.appendChild(dot);
        tailDots.push({ x: window.innerWidth / 2, y: window.innerHeight / 2, el: dot });
    }

    // --- Variabili di Stato ---
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX;
    let orbY = mouseY;
    let angle = 0;
    
    let isHovering = false;
    let targetElement = null;

    // --- Event Listeners ---
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const interactiveSelectors = '.service-card, .btn-primary, .btn-secondary, .btn-social, .nav-links a';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            targetElement = el;
            // Snap immediato e fluido
            orb.style.transition = 'all 0.15s cubic-bezier(0.25, 1, 0.5, 1)';
            orb.style.borderRadius = '12px';
            orb.style.background = 'rgba(0, 243, 255, 0.05)';
            orb.style.border = '2px solid var(--accent)';
            orb.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.5)';
            
            // Nasconde la scia quando si attiva lo snap sulla card/bottone
            tailDots.forEach(d => d.el.style.opacity = '0');
        });

        el.addEventListener('mouseleave', () => {
            setTimeout(() => {
                const hoveredNow = document.querySelector(':hover');
                if (!hoveredNow || !hoveredNow.closest(interactiveSelectors)) {
                    isHovering = false;
                    targetElement = null;
                    orb.style.transition = 'none';
                    orb.style.borderRadius = '50%';
                    orb.style.background = 'var(--accent)';
                    orb.style.border = 'none';
                    orb.style.boxShadow = '0 0 20px var(--accent), 0 0 40px var(--accent)';
                }
            }, 5);
        });
    });

    function animate() {
        if (isHovering && targetElement) {
            // Snap geometrico perfetto sull'elemento attivo
            const rect = targetElement.getBoundingClientRect();
            orb.style.width = `${rect.width + 10}px`;
            orb.style.height = `${rect.height + 10}px`;
            orbX = rect.left + rect.width / 2;
            orbY = rect.top + rect.height / 2;
        } else {
            // Orbita fluida con inerzia e fisica centrifuga della scia
            orb.style.width = '14px';
            orb.style.height = '14px';
            
            let distX = mouseX - orbX;
            let distY = mouseY - orbY;
            orbX += distX * 0.2;
            orbY += distY * 0.2;
            
            angle += 0.08;
            let radius = 18;
            let finalX = orbX + Math.cos(angle) * radius;
            let finalY = orbY + Math.sin(angle) * radius;

            orb.style.left = `${finalX}px`;
            orb.style.top = `${finalY}px`;
            orb.style.transform = 'translate(-50%, -50%)';

            // Gestione della scia curva a spirale (effetto centrifuga)
            let prevX = finalX;
            let prevY = finalY;

            tailDots.forEach((dot, index) => {
                let speedFactor = 0.3 + (index * 0.04);
                dot.x += (prevX - dot.x) * speedFactor;
                dot.y += (prevY - dot.y) * speedFactor;
                
                dot.el.style.left = `${dot.x}px`;
                dot.el.style.top = `${dot.y}px`;
                dot.el.style.opacity = `${0.5 - (index / tailSegments) * 0.4}`.toString();
                
                prevX = dot.x;
                prevY = dot.y;
            });
            
            requestAnimationFrame(animate);
            return;
        }

        orb.style.left = `${orbX}px`;
        orb.style.top = `${orbY}px`;
        orb.style.transform = 'translate(-50%, -50%)';

        requestAnimationFrame(animate);
    }

    animate();
});
