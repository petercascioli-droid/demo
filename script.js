document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SFONDO ANIMATO CANVAS (Autonomo / Circuito Nanotech) ---
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = Math.floor(window.innerWidth / 35);
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 1.5 + 0.5
        });
    }

    function animateBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(0, 243, 255, 0.35)';
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
        ctx.lineWidth = 1;

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateBackground);
    }
    animateBackground();


    // --- 2. CURSORE CUSTOM CON PALLINA ORBITANTE E SNAP ---
    const cursor = document.getElementById('customCursor');
    const ball = cursor.querySelector('.orbiting-ball');
    
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let current = { x: mouse.x, y: mouse.y, w: 35, h: 35, radius: 50 };
    let target = { x: mouse.x, y: mouse.y, w: 35, h: 35, radius: 50 };
    let targetElement = null;
    let angle = 0;

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const interactiveSelectors = '.service-card, .info-card, .btn-primary, .btn-secondary, .btn-social, .nav-links a, .logo-container';
    
    document.addEventListener('mouseover', (e) => {
        const interactive = e.target.closest(interactiveSelectors);
        if (interactive) {
            targetElement = interactive;
            ball.style.background = '#ffffff';
            ball.style.boxShadow = '0 0 20px #ffffff';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (targetElement && (!e.relatedTarget || !e.relatedTarget.closest(interactiveSelectors))) {
            targetElement = null;
            ball.style.background = '#ffffff';
            ball.style.boxShadow = '0 0 12px #ffffff, 0 0 20px var(--accent)';
        }
    });

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    function renderCursor() {
        // Fa ruotare la pallina attorno al cursore se non è agganciata a un elemento
        if (!targetElement) {
            angle += 0.05;
            let radiusOrbit = 18;
            let ballX = Math.cos(angle) * radiusOrbit;
            let ballY = Math.sin(angle) * radiusOrbit;
            ball.style.transform = `translate(calc(-50% + ${ballX}px), calc(-50% + ${ballY}px))`;
        } else {
            // Quando è sopra un elemento, la pallina si posiziona elegantemente in alto
            ball.style.transform = `translate(-50%, -18px)`;
        }

        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            target.w = rect.width + 12;
            target.h = rect.height + 12;
            target.x = rect.left + rect.width / 2;
            target.y = rect.top + rect.height / 2;
            target.radius = 12;

            current.x = lerp(current.x, target.x, 0.25);
            current.y = lerp(current.y, target.y, 0.25);
            current.w = lerp(current.w, target.w, 0.25);
            current.h = lerp(current.h, target.h, 0.25);
            current.radius = lerp(current.radius, target.radius, 0.25);
        } else {
            target.w = 35;
            target.h = 35;
            target.radius = 50;

            current.x = lerp(current.x, mouse.x, 0.3);
            current.y = lerp(current.y, mouse.y, 0.3);
            current.w = lerp(current.w, target.w, 0.25);
            current.h = lerp(current.h, target.h, 0.25);
            current.radius = lerp(current.radius, target.radius, 0.25);
        }

        cursor.style.width = `${current.w}px`;
        cursor.style.height = `${current.h}px`;
        cursor.style.left = `${current.x}px`;
        cursor.style.top = `${current.y}px`;
        cursor.style.borderRadius = current.radius > 40 ? `50%` : `${current.radius}px`;

        requestAnimationFrame(renderCursor);
    }

    renderCursor();
});
