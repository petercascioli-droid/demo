document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SFONDO ANIMATO CANVAS (Circuito Nanotech Autonomo) ---
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


    // --- 2. COSTELLAZIONI IN PARALLASSE (Movimento col mouse) ---
    const starsContainer = document.getElementById('stars-container');
    const numStars = 60;
    const stars = [];

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2.5 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        const initialX = Math.random() * window.innerWidth;
        const initialY = Math.random() * window.innerHeight;
        
        star.style.left = `${initialX}px`;
        star.style.top = `${initialY}px`;
        
        starsContainer.appendChild(star);
        stars.push({ el: star, x: initialX, y: initialY, depth: Math.random() * 0.03 + 0.005 });
    }

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let currentMouse = { x: mouse.x, y: mouse.y };

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    function animateStars() {
        currentMouse.x = lerp(currentMouse.x, mouse.x, 0.08);
        currentMouse.y = lerp(currentMouse.y, mouse.y, 0.08);

        const offsetX = (currentMouse.x - window.innerWidth / 2);
        const offsetY = (currentMouse.y - window.innerHeight / 2);

        stars.forEach(star => {
            const moveX = offsetX * star.depth;
            const moveY = offsetY * star.depth;
            star.el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();
});
