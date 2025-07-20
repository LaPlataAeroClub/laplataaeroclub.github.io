// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced Intersection Observer for smoother animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on element position
            setTimeout(() => {
                entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Enhanced scroll animations with performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations for all cards
    const animatedElements = document.querySelectorAll('.about-card, .project-card, .resource-category, .founder-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // Add parallax effect to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        observer.observe(header);
    });
});

// Enhanced navbar scroll behavior
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (scrollY > lastScrollY && scrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

function requestNavbarUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

window.addEventListener('scroll', requestNavbarUpdate);

// Enhanced rocket animation with modern interactions
document.addEventListener('DOMContentLoaded', () => {
    const rocket = document.querySelector('.rocket');
    const rocketAnimation = document.querySelector('.rocket-animation');
    
    if (rocket && rocketAnimation) {
        let isHovering = false;
        let animationId;
        
        // Enhanced hover interactions
        rocketAnimation.addEventListener('mouseenter', () => {
            isHovering = true;
            rocket.style.animationPlayState = 'paused';
            rocket.style.transform = 'translate(-50%, -50%) scale(1.3) rotate(15deg)';
            rocket.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Add sparkle effect
            createSparkles(rocketAnimation);
        });
        
        rocketAnimation.addEventListener('mouseleave', () => {
            isHovering = false;
            rocket.style.animationPlayState = 'running';
            rocket.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
            
            // Remove sparkles
            const sparkles = rocketAnimation.querySelectorAll('.sparkle');
            sparkles.forEach(sparkle => sparkle.remove());
        });
        
        // Click animation
        rocketAnimation.addEventListener('click', () => {
            rocket.style.animation = 'none';
            rocket.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(360deg)';
            
            setTimeout(() => {
                rocket.style.animation = 'float 4s ease-in-out infinite';
                rocket.style.transform = 'translate(-50%, -50%)';
            }, 600);
        });
        
        // Random subtle movements when not hovering
        function subtleMovement() {
            if (!isHovering) {
                const randomX = (Math.random() - 0.5) * 15;
                const randomY = (Math.random() - 0.5) * 15;
                const randomRotation = (Math.random() - 0.5) * 8;
                
                rocket.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px)) rotate(${randomRotation}deg)`;
                
                setTimeout(() => {
                    if (!isHovering) {
                        rocket.style.transform = 'translate(-50%, -50%) rotate(0deg)';
                    }
                }, 1500);
            }
            
            animationId = setTimeout(subtleMovement, Math.random() * 4000 + 3000);
        }
        
        subtleMovement();
    }
});

// Create sparkle effect
function createSparkles(container) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkleFloat 2s ease-out infinite;
            animation-delay: ${Math.random() * 1}s;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        `;
        container.appendChild(sparkle);
    }
}

// Enhanced star animations with random positioning
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        // More dynamic positioning
        const randomTop = Math.random() * 70 + 15;
        const randomLeft = Math.random() * 70 + 15;
        star.style.top = randomTop + '%';
        star.style.left = randomLeft + '%';
        
        // Varied animation properties
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Add random movement
        star.addEventListener('animationiteration', () => {
            const newTop = Math.random() * 70 + 15;
            const newLeft = Math.random() * 70 + 15;
            star.style.transition = 'all 2s ease-in-out';
            star.style.top = newTop + '%';
            star.style.left = newLeft + '%';
        });
    });
});

// Add sparkle animation CSS
const sparkleStyles = document.createElement('style');
sparkleStyles.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyles);

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #007aff;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            removeNotification(notification);
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Navbar background
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);
