// Enhanced mobile navigation with smoother interactions
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Dark mode functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme based on user preference or system setting
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// Toggle theme function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// Initialize theme on page load
initializeTheme();

// Add event listener to theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link with smooth transition
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Enhanced smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = Math.min(Math.abs(distance) / 2, 1000); // Dynamic duration
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Ease-out cubic function for smoother animation
                const ease = 1 - Math.pow(1 - percentage, 3);
                
                window.scrollTo(0, startPosition + (distance * ease));
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            
            window.requestAnimationFrame(step);
        }
    });
});

// Enhanced scroll handler with performance optimization and parallax effects
let scrollTicking = false;
let lastScrollY = 0;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    // Enhanced navbar styling based on scroll position
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Subtle parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && scrollY < window.innerHeight) {
        const parallaxElements = hero.querySelectorAll('.parallax-element, .rocket-animation, .stars');
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1); // Different speeds for depth
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    lastScrollY = scrollY;
    scrollTicking = false;
}

function requestNavbarUpdate() {
    if (!scrollTicking) {
        requestAnimationFrame(updateNavbar);
        scrollTicking = true;
    }
}

// Throttled scroll listener for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    requestNavbarUpdate();
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Set new timeout for additional scroll effects
    scrollTimeout = setTimeout(() => {
        // Add any scroll-end effects here
    }, 100);
}, { passive: true });

// Enhanced intersection observer for smoother animations
const observerOptions = {
    threshold: [0, 0.1, 0.5],
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add loading class for smoother transition
            entry.target.classList.add('loaded');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            
            // Add stagger effect for multiple elements in same container
            const siblings = Array.from(entry.target.parentNode.children);
            const index = siblings.indexOf(entry.target);
            
            setTimeout(() => {
                entry.target.style.animation = `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
            }, index * 100); // Stagger by 100ms
            
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Enhanced scroll-triggered animations
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add special effects for specific elements
            if (entry.target.classList.contains('section-header')) {
                entry.target.style.animation = 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    // Add loading state to prevent flash
    document.body.classList.add('loading');
    
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 100);
    
    // Setup intersection observers
    const animatedElements = document.querySelectorAll('.about-card, .project-card, .resource-category');
    const scrollElements = document.querySelectorAll('.section-header, .competition-card, .contact-info');
    
    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(32px) scale(0.95)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
    
    scrollElements.forEach((el) => {
        el.classList.add('animate-on-scroll');
        scrollAnimationObserver.observe(el);
    });
    
    // Add parallax class to hero elements
    const heroElements = document.querySelectorAll('.rocket-animation, .stars');
    heroElements.forEach(el => el.classList.add('parallax-element'));
});

// Enhanced rocket animation with more sophisticated interactions
document.addEventListener('DOMContentLoaded', () => {
    const rocket = document.querySelector('.rocket');
    const rocketAnimation = document.querySelector('.rocket-animation');
    const stars = document.querySelectorAll('.star');
    
    if (rocket && rocketAnimation) {
        let isHovering = false;
        let animationFrame;
        
        // Enhanced hover interactions
        rocketAnimation.addEventListener('mouseenter', () => {
            isHovering = true;
            rocket.style.animationPlayState = 'paused';
            rocket.style.transform = 'translate(-50%, -50%) scale(1.1) rotate(5deg)';
            rocket.style.filter = 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3))';
            
            // Enhance stars on hover
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.animationDuration = '1.5s';
                    star.style.transform += ' scale(1.5)';
                }, index * 50);
            });
        });
        
        rocketAnimation.addEventListener('mouseleave', () => {
            isHovering = false;
            rocket.style.animationPlayState = 'running';
            rocket.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
            rocket.style.filter = 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.2))';
            
            // Reset stars
            stars.forEach((star) => {
                star.style.animationDuration = '3s';
                star.style.transform = star.style.transform.replace(' scale(1.5)', '');
            });
        });
        
        // Enhanced click interaction
        rocketAnimation.addEventListener('click', () => {
            if (!isHovering) return;
            
            // Create launch effect
            rocket.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            rocket.style.transform = 'translate(-50%, -50%) scale(0.8) translateY(-100px) rotate(15deg)';
            
            // Reset after animation
            setTimeout(() => {
                rocket.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                rocket.style.transform = 'translate(-50%, -50%) scale(1.1) rotate(5deg)';
            }, 1000);
        });
        
        // Add mouse move parallax effect
        rocketAnimation.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            const rect = rocketAnimation.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 5; // Max 5 degrees
            const rotateY = (x - centerX) / centerX * 5; // Max 5 degrees
            
            rocket.style.transform = `translate(-50%, -50%) scale(1.1) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) rotate(5deg)`;
        });
    }
});

// Enhanced active navigation highlighting with smooth transitions
let activeNavTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(activeNavTimeout);
    activeNavTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }, 10);
}, { passive: true });

// Enhanced keyboard navigation and accessibility
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
    
    // Navigate sections with arrow keys (when not in input)
    if (!e.target.matches('input, textarea, select')) {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        if (currentSection) {
            const index = Array.from(sections).indexOf(currentSection);
            
            if (e.key === 'ArrowDown' && index < sections.length - 1) {
                e.preventDefault();
                sections[index + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (e.key === 'ArrowUp' && index > 0) {
                e.preventDefault();
                sections[index - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
});

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
    
    // Trigger any delayed animations
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('animate');
        });
    }, 200);
});

// Enhanced performance monitoring
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload any heavy resources during idle time
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    });
}
