// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio loaded successfully');
  
  // Initialize Lucide icons
  initializeIcons();
  
  // Set current year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Initialize theme
  initializeTheme();
  
  // Initialize typed text
  initializeTypedText();
  
  // Initialize animations
  initializeAnimations();
  
  // Initialize interactions
  initializeInteractions();
  
  // Load content with stagger effect
  setTimeout(() => {
    document.querySelectorAll('.loading').forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('loaded');
      }, index * 200);
    });
  }, 300);
});

// Initialize Lucide Icons
function initializeIcons() {
  if (typeof lucide !== 'undefined') {
    try {
      lucide.createIcons();
      console.log('Lucide icons initialized successfully');
    } catch (error) {
      console.warn('Lucide icons error:', error);
    }
  } else {
    console.warn('Lucide library not loaded');
  }
}

// Theme Management
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let savedTheme;
  
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (e) {
    console.warn('LocalStorage not available');
    savedTheme = null;
  }
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      console.warn('Could not save theme preference');
    }
  });
  
  function setTheme(theme) {
    const darkIcon = themeToggle.querySelector('.dark-icon');
    const lightIcon = themeToggle.querySelector('.light-icon');
    
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (darkIcon) darkIcon.style.display = 'none';
      if (lightIcon) lightIcon.style.display = 'block';
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (darkIcon) darkIcon.style.display = 'block';
      if (lightIcon) lightIcon.style.display = 'none';
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
    }

    // Ensure header background immediately reflects the active theme
    updateHeaderBackground();
  }
}

// Typed Text Animation
function initializeTypedText() {
  const typedElement = document.getElementById('typedText');
  if (!typedElement) return;

  // Check if Typed.js is available
  if (typeof Typed !== 'undefined') {
    try {
      new Typed('#typedText', {
        strings: [
          'responsive websites',
          'modern web applications',
          'user-friendly interfaces',
          'interactive experiences',
          'beautiful designs',
          'innovative IoT solutions',
          'embedded systems',
          'smart applications',
          'connected devices'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        smartBackspace: true,
        cursorChar: '|'
      });
    } catch (error) {
      console.warn('Typed.js error:', error);
      typedElement.textContent = 'innovative IoT solutions';
    }
  } else {
    // Simple fallback animation
    const texts = [
      'innovative IoT solutions',
      'embedded systems',
      'smart applications',
      'connected devices',
      'modern web applications'
    ];
    let currentIndex = 0;
    
    setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      typedElement.textContent = texts[currentIndex];
    }, 3000);
  }
}

// GSAP Animations
function initializeAnimations() {
  // Check if GSAP is available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    try {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate skill progress bars
      gsap.utils.toArray('.skill-progress').forEach(bar => {
        const progress = bar.dataset.progress;
        gsap.fromTo(bar, 
          { width: '0%' },
          {
            width: progress + '%',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 80%',
              once: true
            }
          }
        );
      });

      // Animate project cards
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true
            }
          }
        );
      });



      // Animate contact links
      gsap.utils.toArray('.contact-link').forEach((link, index) => {
        gsap.fromTo(link,
          { 
            opacity: 0,
            x: -30
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: link,
              start: 'top 85%',
              once: true
            }
          }
        );
      });

    } catch (error) {
      console.warn('GSAP animation error:', error);
      fallbackAnimations();
    }
  } else {
    fallbackAnimations();
  }
}

// Fallback animations without GSAP
function fallbackAnimations() {
  // Simple progress bar animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.skill-progress');
        if (progressBar) {
          const progress = progressBar.dataset.progress;
          setTimeout(() => {
            progressBar.style.width = progress + '%';
          }, 200);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill-category').forEach(skill => {
    observer.observe(skill);
  });


}

// Interactive Elements
function initializeInteractions() {
  // Project card interactions
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  const closeModal = document.getElementById('closeModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalTech = document.getElementById('modalTech');

  projectCards.forEach(card => {
    // Click to open modal
    card.addEventListener('click', () => {
      openProjectModal(card);
    });

    // Keyboard support
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(card);
      }
    });
  });

  // Modal functionality
  function openProjectModal(card) {
    if (modalTitle) modalTitle.textContent = card.dataset.title || 'Project';
    if (modalDescription) modalDescription.textContent = card.dataset.description || 'No description available.';
    if (modalTech) modalTech.textContent = card.dataset.tech || 'Technologies not specified';
    
    if (modal) {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      if (closeModal) closeModal.focus();
      
      // Add entrance animation
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
        setTimeout(() => {
          modalContent.style.transform = 'scale(1)';
          modalContent.style.opacity = '1';
        }, 10);
      }
    }
  }

  function closeProjectModal() {
    if (modal) {
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
      }
      
      setTimeout(() => {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
      }, 200);
    }
  }

  // Close modal event listeners
  if (closeModal) {
    closeModal.addEventListener('click', closeProjectModal);
  }
  
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  // Keyboard support for modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeProjectModal();
    }
  });

  // Download CV functionality
  const downloadBtn = document.getElementById('downloadCV');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const originalText = downloadBtn.textContent;
      
      // Show loading state
      downloadBtn.textContent = 'Downloading...';
      downloadBtn.disabled = true;
      downloadBtn.classList.add('btn-loading');
      
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Ray_Avila_CV.pdf';
      link.style.display = 'none';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success notification and reset button
      setTimeout(() => {
        showNotification('CV downloaded successfully!', 'success');
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
        downloadBtn.classList.remove('btn-loading');
      }, 1000);
    });
  }

  // View My Work button functionality
  const viewWorkBtn = document.querySelector('.btn-primary');
  if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', () => {
      // Add click animation
      viewWorkBtn.classList.add('btn-clicked');
      setTimeout(() => {
        viewWorkBtn.classList.remove('btn-clicked');
      }, 200);
      
      // Smooth scroll to projects section
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header scroll effect
  // Initialize and keep header background in sync with theme + scroll
  updateHeaderBackground();
  window.addEventListener('scroll', updateHeaderBackground);

  // Add hover effects to contact links
  document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const icon = link.querySelector('.contact-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    link.addEventListener('mouseleave', () => {
      const icon = link.querySelector('.contact-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Mouse tracking for glass cards
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
      
      card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });

  // Parallax scroll effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Smooth parallax for background elements
  const bgGradient = document.querySelector('.bg-gradient');
  if (bgGradient) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.1;
      bgGradient.style.transform = `translateY(${rate}px)`;
    });
  }

  // Interactive skill bars with mouse tracking
  document.querySelectorAll('.skill-category').forEach(skill => {
    skill.addEventListener('mousemove', (e) => {
      const rect = skill.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      
      skill.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });
    
    skill.addEventListener('mouseleave', () => {
      skill.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// Utility function for notifications
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });

  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Hide and remove notification
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Performance optimization: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--transition-smooth', '0.01s');
  document.documentElement.style.setProperty('--transition-fast', '0.01s');
}

// Error handling for external scripts
window.addEventListener('error', function(e) {
  console.warn('Script error:', e.filename, e.lineno, e.message);
  // Continue with fallback functionality
});

// Add smooth transitions for theme changes
document.addEventListener('DOMContentLoaded', function() {
  // Add transition class after initial load
  setTimeout(() => {
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, 100);
});

// Keep header background consistent across theme/scroll states
function updateHeaderBackground() {
  const header = document.querySelector('.header');
  if (!header) return;

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const scrolled = window.scrollY > 100;

  if (isLight) {
    header.style.background = scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
  } else {
    header.style.background = scrolled ? 'rgba(10, 10, 10, 0.98)' : 'rgba(10, 10, 10, 0.95)';
  }
}




