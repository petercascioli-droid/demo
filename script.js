document.addEventListener("DOMContentLoaded", () => {
    const ball = document.getElementById('cursorBall');

    // Posizione del mouse reale
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    // Posizione fisica della pallina
    let pos = { x: mouse.x, y: mouse.y };
    
    // Velocità e accelerazione per la fisica a molla (Spring Physics)
    let velocity = { x: 0, y: 0 };
    
    // Stato precedente per calcolare la direzione e l'allungamento
    let lastMouse = { x: mouse.x, y: mouse.y };
    let targetElement = null;

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const interactiveSelectors = '.service-card, .info-card, .btn-primary, .btn-secondary, .btn-social, .nav-links a, .logo-container';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            targetElement = el;
            ball.style.background = 'rgba(0, 243, 255, 0.15)';
            ball.style.border = '2px solid var(--accent)';
            ball.style.boxShadow = '0 0 25px rgba(0, 243, 255, 0.5)';
        });

        el.addEventListener('mouseleave', () => {
            setTimeout(() => {
                const hoveredNow = document.querySelector(':hover');
                if (!hoveredNow || !hoveredNow.closest(interactiveSelectors)) {
                    targetElement = null;
                    ball.style.background = 'var(--accent)';
                    ball.style.border = '0px solid transparent';
                    ball.style.boxShadow = '0 0 12px var(--accent), 0 0 25px var(--accent)';
                }
            }, 10);
        });
    });

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    function renderPhysics() {
        if (targetElement) {
            // --- MODALITÀ SNAP FLUIDO SUI BOTTONI ---
            const rect = targetElement.getBoundingClientRect();
            let targetX = rect.left + rect.width / 2;
            let targetY = rect.top + rect.height / 2;
            let targetW = rect.width + 10;
            let targetH = rect.height + 10;

            pos.x = lerp(pos.x, targetX, 0.2);
            pos.y = lerp(pos.y, targetY, 0.2);

            let currentW = parseFloat(ball.style.width) || 14;
            let currentH = parseFloat(ball.style.height) || 14;

            ball.style.width = `${lerp(currentW, targetW, 0.2)}px`;
            ball.style.height = `${lerp(currentH, targetH, 0.2)}px`;
            ball.style.borderRadius = '14px';
            ball.style.transform = `translate(-50%, -50%) rotate(0deg)`;

        } else {
            // --- MODALITÀ FISICA ORGANICA (Spring Dynamics & Stretch) ---
            
            // Calcolo della velocità del mouse
            let mouseVx = mouse.x - lastMouse.x;
            let mouseVy = mouse.y - lastMouse.y;
            let mouseSpeed = Math.hypot(mouseVx, mouseVy);

            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;

            // Forza elastica (Spring Force) che tira la pallina verso il mouse
            let springK = 0.15; // Rigidità della molla
            let friction = 0.78; // Attrito per smorzare l'oscillazione ed evitare rimbalzi infiniti

            let ax = (mouse.x - pos.x) * springK;
            let ay = (mouse.y - pos.y) * springK;

            velocity.x = (velocity.x + ax) * friction;
            velocity.y = (velocity.y + ay) * friction;

            pos.x += velocity.x;
            pos.y += velocity.y;

            // Calcolo dell'allungamento dinamico basato sulla velocità reale della pallina
            let speed = Math.hypot(velocity.x, velocity.y);
            let angle = Math.atan2(velocity.y, velocity.x);

            let baseSize = 14;
            // Più va veloce, più si allunga come una goccia/elastico
            let stretchFactor = Math.min(speed * 0.45, 22); 
            
            let width = baseSize + stretchFactor;
            let height = Math.max(8, baseSize - stretchFactor * 0.4);

            ball.style.width = `${width}px`;
            ball.style.height = `${height}px`;
            ball.style.borderRadius = '50%';
            
            // Ruota perfettamente nella direzione in cui si sta muovendo
            ball.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        }

        ball.style.left = `${pos.x}px`;
        ball.style.top = `${pos.y}px`;

        requestAnimationFrame(renderPhysics);
    }

    renderPhysics();
});
