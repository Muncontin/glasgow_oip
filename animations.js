// Enhanced Animation System for Glasgow Botanic Gardens Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    // initPageLoader(); // Commented out - remove loading screen entirely
    initScrollAnimations();
    initHoverEffects();
    initParallaxEffects();
    initCounterAnimations();
    initTypewriterEffect();
});

// Page Loader Animation - Only show on first visit or slow connections
function initPageLoader() {
    // Only show loader if page is actually loading (not from cache)
    if (document.readyState === 'loading') {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <h3>Loading Glasgow Botanic Gardens</h3>
                <p>Preparing accessibility solutions...</p>
            </div>
        `;
        document.body.prepend(loader);
        
        // Hide loader much faster
        const hideLoader = () => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 300);
        };
        
        // Hide immediately if already loaded, otherwise wait for load event
        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
        }
    }
}

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const elementsToAnimate = [
        { selector: 'section h2', animation: 'animate-on-scroll' },
        { selector: '.solution-card', animation: 'animate-scale' },
        { selector: '.highlight', animation: 'animate-on-scroll' },
        { selector: '.team-member', animation: 'animate-on-scroll' },
        { selector: '.stat-item', animation: 'animate-slide-left' },
        { selector: '.pillar', animation: 'animate-slide-right' },
        { selector: '.justification-item', animation: 'animate-on-scroll' },
        { selector: '.existing-solution', animation: 'animate-on-scroll' },
        { selector: '.expertise-item', animation: 'animate-scale' }
    ];

    elementsToAnimate.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add(animation);
            element.classList.add(`animate-delay-${Math.min(index + 1, 6)}`);
            observer.observe(element);
        });
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Solution cards enhanced hover
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02) rotateY(5deg)';
            this.style.boxShadow = '0 20px 50px rgba(74, 124, 89, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Team member cards
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.member-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
                avatar.style.background = 'linear-gradient(135deg, #4a7c59, #6b9b7a)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.member-avatar');
            if (avatar) {
                avatar.style.transform = '';
                avatar.style.background = '';
            }
        });
    });

    // Navigation links enhanced animation
    const navLinks = document.querySelectorAll('.header-nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        // Only apply parallax to team photos, not hero content
        const parallaxElements = document.querySelectorAll('.team-photo');
        
        parallaxElements.forEach(element => {
            const speed = 0.3; // Reduced speed for smoother effect
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Animated counters for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-item h4, .stat h3');
    
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    
    if (number && number > 0) {
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = text;
                clearInterval(timer);
            } else {
                const suffix = text.replace(/[\d,]/g, '');
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, 30);
    }
}

// Typewriter effect for hero titles
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #4a7c59';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30); // Faster typing
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 500); // Shorter cursor display
            }
        };
        
        setTimeout(typeWriter, 500); // Start sooner
    }
}

// Smooth scroll for navigation links
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

// Add floating animation to background elements
function createFloatingElements() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.querySelector('.floating-bg')) {
            const floatingBg = document.createElement('div');
            floatingBg.className = 'floating-bg';
            floatingBg.innerHTML = '🌿';
            section.appendChild(floatingBg);
        }
    });
}

// Initialize floating elements
setTimeout(createFloatingElements, 2000);

// Add CSS for floating elements
const floatingCSS = `
.floating-bg {
    position: absolute;
    top: 20%;
    right: 10%;
    font-size: 3rem;
    opacity: 0.1;
    animation: float-gentle 8s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
}

@keyframes float-gentle {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}
`;

const style = document.createElement('style');
style.textContent = floatingCSS;
document.head.appendChild(style);