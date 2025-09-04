// Effects module: parallax, cube, hover, particles, cursor trail

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function shouldReduceEffects() {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmall = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    return prefersReduced || isTouch || isSmall;
}

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-speed]');
    if (!parallaxElements.length) return;

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let ticking = false;

    function applyParallax() {
        const scrolled = lastScrollY;
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        ticking = false;
    }

    function onScroll() {
        lastScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (!ticking) {
            window.requestAnimationFrame(applyParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once to set initial positions
    applyParallax();
}

function init3DCube() {
    const cube = document.querySelector('.tech-cube');
    if (!cube || shouldReduceEffects()) return;

    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        cube.style.transform = `rotateY(${mouseX * 30}deg) rotateX(${mouseY * 30}deg)`;
    }, { passive: true });

    document.addEventListener('mousedown', () => { isMouseDown = true; }, { passive: true });
    document.addEventListener('mouseup', () => { isMouseDown = false; }, { passive: true });
}

function initHovers() {
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
            item.style.boxShadow = '0 10px 25px rgba(0, 217, 255, 0.3)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = 'none';
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 217, 255, 0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });

    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', () => { link.style.transform = 'translateX(10px)'; });
        link.addEventListener('mouseleave', () => { link.style.transform = 'translateX(0)'; });
    });
}

function createParticles() {
    if (shouldReduceEffects()) return;
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden;`;
    document.body.appendChild(particleContainer);
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `position: absolute; width: 2px; height: 2px; background: rgba(0, 217, 255, 0.6); border-radius: 50%; animation: particle-float ${5 + Math.random() * 10}s linear infinite; left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; animation-delay: ${Math.random() * 5}s;`;
        particleContainer.appendChild(particle);
    }
}

function ensureParticleKeyframes() {
    if (document.getElementById('particle-style')) return;
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `@keyframes particle-float {0%{transform: translateY(100vh) rotate(0deg); opacity: 0;}10%{opacity:1;}90%{opacity:1;}100%{transform: translateY(-100px) rotate(360deg); opacity:0;}}`;
    document.head.appendChild(style);
}

function createCursorTrail() {
    if (shouldReduceEffects()) return;
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `position: fixed; width: 20px; height: 20px; background: radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%); border-radius: 50%; pointer-events: none; z-index: 9999; transition: all 0.1s ease; opacity: 0;`;
    document.body.appendChild(trail);
    let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; trail.style.opacity = '1'; }, { passive: true });
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        trail.style.left = (trailX - 10) + 'px';
        trail.style.top = (trailY - 10) + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    document.addEventListener('mouseleave', () => { trail.style.opacity = '0'; }, { passive: true });
}

export function initEffects() {
    ensureParticleKeyframes();
    initParallax();
    init3DCube();
    initHovers();
    createParticles();
    createCursorTrail();
}


