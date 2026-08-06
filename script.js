document.addEventListener("DOMContentLoaded", () => {
    const orb = document.getElementById('cursorOrb');
    const tail = document.createElement('div');
    tail.className = 'meteor-tail';
    document.body.appendChild(tail);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX;
    let orbY = mouseY;
    let angle = 0;
    
    let isHovering = false;
    let targetElement = null;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Rileva quando il cursore entra ed esce dalle card dei servizi
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            isHovering = true;
            targetElement = card;
            orb.style.borderRadius = '14px';
            orb.style.background = 'rgba(0, 243, 255, 0.05)';
            orb.style.border = '2px solid var(--accent)';
            orb.style.boxShadow = '0 0 25px rgba(0, 243, 255, 0.4)';
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            targetElement = null;
            orb.style.borderRadius = '50%';
            orb.style.background = 'var(--accent)';
            orb.style.border = 'none';
            orb.style.boxShadow = '0 0 20px var(--accent), 0 0 40px var(--accent)';
        });
    });

    function animate() {
        if (isHovering && targetElement) {
            // Aggancia la card con precisione magnetica
            const rect = targetElement.getBoundingClientRect();
            orb.style.width = `${rect.width + 12}px`;
            orb.style.height = `${rect.height + 12}px`;
            orbX = rect.left + rect.width / 2;
            orbY = rect.top + rect.height / 2;
            tail.style.opacity = '0';
            
            orb.style.left = `${orbX}px`;
            orb.style.top = `${orbY}px`;
            orb.style.transform = `translate(-50%, -50%) rotate(0deg) scale(1)`;
        } else {
            // Modalità Meteorite Fluido
            orb.style.width = '14px';
            orb.style.height = '14px';
            
            let distX = mouseX - orbX;
            let distY = mouseY - orbY;
            orbX += distX * 0.12;
            orbY += distY * 0.12;
            
            angle += 0.04;
            let speed = Math.sqrt(distX * distX + distY * distY);
            let stretch = Math.min(speed * 0.15, 35);
            let currentAngleDeg = Math.atan2(distY, distX) * (180 / Math.PI);

            orb.style.left = `${orbX}px`;
            orb.style.top = `${orbY}px`;
            
            let scaleX = 1 + (stretch / 15);
            let scaleY = Math.max(1 - (stretch / 40), 0.7);
            orb.style.transform = `translate(-50%, -50%) rotate(${currentAngleDeg}deg) scale(${scaleX}, ${scaleY})`;

            tail.style.left = `${orbX}px`;
            tail.style.top = `${orbY}px`;
            tail.style.width = `${stretch + 10}px`;
            tail.style.transform = `translate(0, -50%) rotate(${currentAngleDeg}deg)`;
            tail.style.opacity = Math.min(speed / 20, 0.7);
        }

        requestAnimationFrame(animate);
    }

    animate();
});
