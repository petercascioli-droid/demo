document.addEventListener("DOMContentLoaded", () => {
    const ball = document.getElementById('cursorBall');

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let lastMouse = { x: mouse.x, y: mouse.y };
    let pos = { x: mouse.x, y: mouse.y };
    
    let angle = 0;
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
            ball.style.background = 'rgba(0, 243, 255, 0.1)';
            ball.style.border = '2px solid var(--accent)';
            ball.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.4)';
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
            // SNAP SUI BOTTONI
            const rect = targetElement.getBoundingClientRect();
            let targetX = rect.left + rect.width / 2;
            let targetY = rect.top + rect.height / 2;
            let targetW = rect.width + 10;
            let targetH = rect.height + 10;

            pos.x = lerp(pos.x, targetX, 0.25);
            pos.y = lerp(pos.y, targetY, 0.25);

            let currentW = parseFloat(ball.style.width) || 12;
            let currentH = parseFloat(ball.style.height) || 12;
            
            ball.style.width = `${lerp(currentW, targetW, 0.25)}px`;
            ball.style.height = `${lerp(currentH, targetH, 0.25)}px`;
            ball.style.borderRadius = '14px';
            ball.style.transform = `translate(-50%, -50%) rotate(0deg)`;

        } else {
            // ORBITA + FISICA AVANZATA (Centrifuga & Allungamento)
            let vx = mouse.x - lastMouse.x;
            let vy = mouse.y - lastMouse.y;
            let speed = Math.hypot(vx, vy);

            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;

            angle += 0.07 + (speed * 0.002);
            let orbitRadius = 20;
            let centrifugalForce = Math.min(speed * 0.4, 15);
            let currentRadius = orbitRadius + centrifugalForce;

            let targetOrbX = mouse.x + Math.cos(angle) * currentRadius;
            let targetOrbY = mouse.y + Math.sin(angle) * currentRadius;

            pos.x = lerp(pos.x, targetOrbX, 0.2);
            pos.y = lerp(pos.y, targetOrbY, 0.2);

            let moveAngle = Math.atan2(vy, vx);
            let stretch = Math.min(speed * 0.6, 18);

            let baseSize = 12;
            let width = baseSize + stretch;
            let height = Math.max(6, baseSize - stretch * 0.5);

            ball.style.width = `${width}px`;
            ball.style.height = `${height}px`;
            ball.style.borderRadius = '50%';
            ball.style.transform = `translate(-50%, -50%) rotate(${moveAngle}rad)`;
        }

        ball.style.left = `${pos.x}px`;
        ball.style.top = `${pos.y}px`;

        requestAnimationFrame(renderPhysics);
    }

    renderPhysics();
});
