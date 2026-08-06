document.addEventListener("DOMContentLoaded", () => {
    // 1. Attivazione link navbar corrente
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        const hrefAttr = link.getAttribute("href");
        if (hrefAttr && currentPath.includes(hrefAttr)) {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        }
    });

    // 2. Animazione circuito che segue il cursore/tocco e orbita all'arrivo
    const canvas = document.getElementById("circuitCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Posizione iniziale al centro dello schermo
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    let angle = 0;
    const orbitRadius = 35; // Raggio dell'orbita quando si ferma sul punto

    window.addEventListener("mousemove", (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            targetX = e.touches[0].clientX;
            targetY = e.touches[0].clientY;
        }
    }, {passive: true});

    window.addEventListener("touchstart", (e) => {
        if (e.touches.length > 0) {
            targetX = e.touches[0].clientX;
            targetY = e.touches[0].clientY;
        }
    }, {passive: true});

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Movimento fluido verso il cursore (Lerp)
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        // Calcola movimento orbitale circolare attorno al punto puntato
        angle += 0.04;
        const orbX = currentX + Math.cos(angle) * orbitRadius;
        const orbY = currentY + Math.sin(angle) * orbitRadius;

        // Disegna la scia / linea elettrica dal centro dello schermo o da un angolo verso il cursore
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = "rgba(0, 243, 255, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Disegna il punto luminoso principale che segue il cursore
        ctx.beginPath();
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#00f3ff";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00f3ff";
        ctx.fill();

        // Disegna l'orbita che gira attorno al cursore/tocco
        ctx.beginPath();
        ctx.arc(orbX, orbY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#9d00ff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#9d00ff";
        ctx.fill();

        ctx.shadowBlur = 0; // reset ombra
        requestAnimationFrame(animate);
    }

    animate();
});
