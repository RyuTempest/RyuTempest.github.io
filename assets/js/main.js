// Initialize AOS (Animate On Scroll) lazily to reduce main-thread work
function initAOS() {
    if (window.AOS && typeof AOS.init === 'function') {
        AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
}
if ('requestIdleCallback' in window) {
    requestIdleCallback(initAOS, { timeout: 1500 });
} else {
    setTimeout(initAOS, 800);
}

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
    }
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const texts = [
    '🎓 BET in Computer Engineering Technology',
    '💻 Embedded Systems & IoT Enthusiast',
    '🚀 Building Tomorrow\'s Smart Solutions'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!typingText) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
            e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(13, 17, 23, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}, { passive: true });

// Heavy visual effects are loaded lazily from effects.js

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Counter Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Skill Level Animation
function animateSkillLevels() {
    const levelBars = document.querySelectorAll('.level-bar');
    
    levelBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = level + '%';
        }, 500);
    });
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 2s ease-out';
            bar.style.width = progress + '%';
        }, 500);
    });
}

// Intersection Observer for Skill Animations
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillLevels();
            animateProgressBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// 3D cube and other effects moved to effects.js

// Hover effects moved to effects.js

// Particle/cursor trail moved to effects.js

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00D9FF 0%, #00B8D4 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 217, 255, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Interactive Skill Items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('click', () => {
        const nameNode = item.querySelector('span');
        const levelNode = item.querySelector('.level-bar');
        const skillName = nameNode ? nameNode.textContent : 'Skill';
        const level = levelNode ? levelNode.getAttribute('data-level') : 'N/A';
        showNotification(`${skillName}: ${level}% proficiency`, 'success');
    });
});

// Removed placeholder throttled scroll handler (no-op)

// Lazy-load effects for modern browsers to reduce unused JS on initial load
function loadEffectsLazily() {
    import('./effects.js').then(mod => {
        if (mod && typeof mod.initEffects === 'function') {
            mod.initEffects();
        }
    }).catch(() => {});
}
if ('requestIdleCallback' in window) {
    requestIdleCallback(loadEffectsLazily, { timeout: 2000 });
} else {
    setTimeout(loadEffectsLazily, 1200);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Console welcome message
console.log(`
%c🚀 Welcome to Ray Avila's Portfolio! 🚀
%c
%cComputer Engineering Technology | Embedded Systems & IoT
%c
%cBuilt with modern web technologies and a passion for innovation.
%c
%cFeel free to explore the code and get in touch!
`,
'color: #00D9FF; font-size: 18px; font-weight: bold;',
'',
'color: #4ECDC4; font-size: 14px;',
'',
'color: #FF6B35; font-size: 12px;',
'',
'color: #00D9FF; font-size: 12px;'
);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Portfolio loaded in ${loadTime}ms`);
    }
});
