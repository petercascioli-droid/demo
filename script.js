document.addEventListener("DOMContentLoaded", () => {
    const ball = document.getElementById('cursorBall');

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: mouse.x, y: mouse.y };
    let velocity = { x: 0, y: 0 };
    
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
            // Reset immediato della velocità per evitare bug nei passaggi rapidi
            velocity.x = 0;
            velocity.y = 0;
            
            ball.style.background = 'rgba(0, 243, 255, 0.15)';
            ball.style.border = '2px solid var(--accent)';
            ball.style.boxShadow = '0 0 25px rgba(0, 243, 255, 0.5)';
        });

        el.addEventListener('mouseleave', () => {
            setTimeout(() => {
                const hoveredNow = document.querySelector(':hover');
                if (!hoveredNow || !hoveredNow.closest(interactiveSelectors)) {
                    targetElement = null;
                    velocity.x = 0;
                    velocity.y = 0;
                    
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
            // --- SNAP FLUIDO SUI BOTTONI (Smorzato e pulito) ---
            const rect = targetElement.getBoundingClientRect();
            let targetX = rect.left + rect.width / 2;
            let targetY = rect.top + rect.height / 2;
            let targetW = rect.width + 10;
            let targetH = rect.height + 10;

            pos.x = lerp(pos.x, targetX, 0.18);
            pos.y = lerp(pos.y, targetY, 0.18);

            let currentW = parseFloat(ball.style.width) || 14;
            let currentH = parseFloat(ball.style.height) || 14;

            ball.style.width = `${lerp(currentW, targetW, 0.18)}px`;
            ball.style.height = `${lerp(currentH, targetH, 0.18)}px`;
            ball.style.borderRadius = '14px';
            ball.style.transform = `translate(-50%, -50%) rotate(0deg)`;

        } else {
            // --- FISICA FLUIDA E RILASSATA (Niente rimbalzi) ---
            let mouseVx = mouse.x - lastMouse.x;
            let mouseVy = mouse.y - lastMouse.y;

            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;

            // Parametri calibrati: molla più morbida (0.08) e attrito alto (0.65) per zero rimbalzi
            let springK = 0.08; 
            let friction = 0.65; 

            let ax = (mouse.x - pos.x) * springK;
            let ay = (mouse.y - pos.y) * springK;

            velocity.x = (velocity.x + ax) * friction;
            velocity.y = (velocity.y + ay) * friction;

            pos.x += velocity.x;
            pos.y += velocity.y;

            let speed = Math.hypot(velocity.x, velocity.y);
            let angle = Math.atan2(velocity.y, velocity.x);

            let baseSize = 14;
            // Allungamento controllato e vellutato
            let stretchFactor = Math.min(speed * 0.3, 14); 
            
            let width = baseSize + stretchFactor;
            let height = Math.max(10, baseSize - stretchFactor * 0.3);

            ball.style.width = `${width}px`;
            ball.style.height = `${height}px`;
            ball.style.borderRadius = '50%';
            ball.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        }

        ball.style.left = `${pos.x}px`;
        ball.style.top = `${pos.y}px`;

        requestAnimationFrame(renderPhysics);
    }

    renderPhysics();
});
