document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById('stars-container');
    const numStars = 70;
    const stars = [];

    // Generazione delle "stelle/costellazioni" di sfondo
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
        stars.push({ el: star, x: initialX, y: initialY, depth: Math.random() * 0.04 + 0.01 });
    }

    // Movimento fluido delle stelle in base al mouse (Parallasse)
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
