document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const hrefAttr = link.getAttribute("href");
        if (hrefAttr && currentPath.includes(hrefAttr)) {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        }
    });
});
