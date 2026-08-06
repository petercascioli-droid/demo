document.addEventListener("DOMContentLoaded", () => {
    // 1. Gestione Link Attivo nella Navbar
    const currentPath = window.location.pathname;
    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href") && currentPath.includes(link.getAttribute("href"))) {
            document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active-link"));
            link.classList.add("active-link");
        }
    });

    // 2. Logica Orbita Cursore (Inconsistente, ritardata, invertita)
    const orb = document.getElementById('cursorOrb');
    if (!orb) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX;
    let orbY = mouseY;
    let angle = 0;
    let isMoving = false;
    let moveTimer;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        clearTimeout(moveTimer);
        moveTimer = setTimeout(() => { isMoving = false; }, 400);
    });

    function animateOrb() {
        // Movimento "pigro" e inconsistente (ritardo alto)
        orbX += (mouseX - orbX) * 0.06;
        orbY += (mouseY - orbY) * 0.06;

        // Rotazione invertita: Antiorario in movimento, Orario se fermo
        if (isMoving) {
            angle -= 0.12; // Antiorario
        } else {
            angle += 0.04; // Orario (orbita)
        }

        const radius = isMoving ? 12 : 28;
        const x = orbX + Math.cos(angle) * radius;
        const y = orbY + Math.sin(angle) * radius;

        orb.style.left = `${x}px`;
        orb.style.top = `${y}px`;

        requestAnimationFrame(animateOrb);
    }

    animateOrb();
});
