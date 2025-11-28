// 1. MENÚ HAMBURGUESA Y SOLUCIÓN SCROLL FIX
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const body = document.body; // Referencia al body

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.classList.toggle('no-scroll'); // 🛠️ AÑADIDO: Bloquea/Desbloquea el scroll del body
    });

    // Cerrar al hacer clic en enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('no-scroll'); // 🛠️ AÑADIDO: Desbloquea el scroll al navegar
        });
    });
}

// 2. AÑO FOOTER
document.getElementById('year').textContent = new Date().getFullYear();

// 3. ANIMACIONES Y LAZY LOAD (Sin cambios necesarios)
const observerOptions = { root: null, threshold: 0.1 };

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('inview');
            
            const src = el.getAttribute('data-src');
            if (src) {
                if (el.tagName !== 'IFRAME') {
                    el.style.backgroundImage = `url('${src}')`;
                } else {
                    el.src = src;
                }
                el.removeAttribute('data-src');
            }
            // Iframe dentro de div
            const iframe = el.querySelector('iframe');
            if (iframe && iframe.getAttribute('data-src')) {
                iframe.src = iframe.getAttribute('data-src');
                iframe.removeAttribute('data-src');
            }
            obs.unobserve(el);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-target, .menu-img, .map-full-width').forEach(el => observer.observe(el));