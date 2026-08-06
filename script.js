document.addEventListener("DOMContentLoaded", () => {
    const orb = document.getElementById('cursorOrb');
    
    // Configurazione Scia Curva
    const tailSegments = 8;
    const tailDots = [];
    
    for (let i = 0; i < tailSegments; i++) {
        const dot = document.createElement('div');
        dot.className = 'meteor-tail-dot';
        document.body.appendChild(dot);
        // Setup iniziale
        tailDots.push({ 
            x: window.innerWidth / 2, 
            y: window.innerHeight / 2, 
            el: dot,
            size: Math.max(2, 12 - i * 1.5),
            opacity: 0.6 - (i / tailSegments) * 0.5
        });
    }

    // --- Stato Fisico ---
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    // Stato corrente dell'orbita
    let current = { x: mouse.x, y: mouse.y, w: 14, h: 14, radius: 50 };
    // Stato target dell'orbita (dove deve andare)
    let target = { x: mouse.x, y: mouse.y, w: 14, h: 14, radius: 50 };
    
    let angle = 0;
    let targetElement = null;

    // Track Mouse
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Selettori interattivi
    const interactiveSelectors = '.service-card, .info-card, .btn-primary, .btn-secondary, .btn-social, .nav-links a, .logo-container';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            targetElement = el;
            orb.style.background = 'rgba(0, 243, 255, 0.05)';
            orb.style.border = '2px solid var(--accent)';
            orb.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.4)';
        });

        el.addEventListener('mouseleave', () => {
            setTimeout(() => {
                const hoveredNow = document.querySelector(':hover');
                if (!hoveredNow || !hoveredNow.closest(interactiveSelectors)) {
                    targetElement = null;
                    orb.style.background = 'var(--accent)';
                    orb.style.border = '0px solid transparent';
                    orb.style.boxShadow = '0 0 20px var(--accent), 0 0 40px var(--accent)';
                }
            }, 10); // Micro delay per evitare drop durante lo spostamento veloce
        });
    });

    // Lerp Helper (Linear Interpolation per fluidità assoluta)
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    function renderFrame() {
        if (targetElement) {
            // SNAP MOD: Calcola la bounding box dell'elemento target
            const rect = targetElement.getBoundingClientRect();
            
            // Imposta i target esattamente sulle dimensioni dell'elemento + padding
            target.w = rect.width + 12;
            target.h = rect.height + 12;
            target.x = rect.left + rect.width / 2;
            target.y = rect.top + rect.height / 2;
            target.radius = 16; // Border radius arrotondato da CSS (16px)

            // Lerp molto veloce verso l'elemento
            current.x = lerp(current.x, target.x, 0.25);
            current.y = lerp(current.y, target.y, 0.25);
            current.w = lerp(current.w, target.w, 0.25);
            current.h = lerp(current.h, target.h, 0.25);
            current.radius = lerp(current.radius, target.radius, 0.25);
            
            // Nasconde la scia scalando opacità
            tailDots.forEach(d => d.el.style.opacity = '0');

        } else {
            // ORBIT MODE: Ritorna piccolo e orbita
            target.w = 14;
            target.h = 14;
            target.radius = 50; // 50% circle
            
            // L'ancora di base segue il mouse dolcemente
            let anchorX = lerp(current.x, mouse.x, 0.15);
            let anchorY = lerp(current.y, mouse.y, 0.15);

            // Calcola l'orbita attorno all'ancora
            angle += 0.08;
            let radius = 18;
            current.x = anchorX + Math.cos(angle) * radius;
            current.y = anchorY + Math.sin(angle) * radius;
            
            // Lerp per le dimensioni quando esce dallo snap
            current.w = lerp(current.w, target.w, 0.2);
            current.h = lerp(current.h, target.h, 0.2);
            current.radius = lerp(current.radius, target.radius, 0.2);

            // Fisica della Scia (Centrifuga)
            let prevX = current.x;
            let prevY = current.y;

            tailDots.forEach((dot, index) => {
                let speed = 0.3 + (index * 0.05);
                dot.x += (prevX - dot.x) * speed;
                dot.y += (prevY - dot.y) * speed;
                
                dot.el.style.left = `${dot.x}px`;
                dot.el.style.top = `${dot.y}px`;
                dot.el.style.width = `${dot.size}px`;
                dot.el.style.height = `${dot.size}px`;
                dot.el.style.transform = `translate(-50%, -50%)`;
                dot.el.style.opacity = dot.opacity;
                
                prevX = dot.x;
                prevY = dot.y;
            });
        }

        // Applica i valori finali in un'unica volta all'orbita (NO CSS TRANSITIONS SU QUESTI)
        orb.style.width = `${current.w}px`;
        orb.style.height = `${current.h}px`;
        orb.style.left = `${current.x}px`;
        orb.style.top = `${current.y}px`;
        
        // Se target.radius == 50, usa '%', altrimenti usa 'px'
        orb.style.borderRadius = current.radius > 40 ? `${current.radius}%` : `${current.radius}px`;
        orb.style.transform = `translate(-50%, -50%)`;

        requestAnimationFrame(renderFrame);
    }

    renderFrame();
});
