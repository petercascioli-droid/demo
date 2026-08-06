document.addEventListener('DOMContentLoaded', () => {
    // Effetto parallasse/3D tilt solo per desktop per mantenere lo scroll touch fluido su mobile
    if (window.innerWidth > 900) {
        const cards = document.querySelectorAll('.card, .tech-card-glass, .service-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                card.style.transform = `perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    console.log("Hardware Lab System with Neon FX active.");
});
