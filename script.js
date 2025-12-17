// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animation Observer =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Add staggered delay for grid items
            const delay = entry.target.getAttribute('data-aos-delay');
            if (delay) {
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===== Tuner Animation =====
const strings = document.querySelectorAll('.string');
let currentString = 0;

function animateStrings() {
    strings.forEach((string, index) => {
        string.classList.remove('active');
        if (index === currentString) {
            string.classList.add('active');
        }
    });
    currentString = (currentString + 1) % strings.length;
}

// Animate strings every 2 seconds
setInterval(animateStrings, 2000);

// ===== Floating Notes Random Movement =====
const notes = document.querySelectorAll('.note');
notes.forEach((note, index) => {
    // Random starting position
    note.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration
    const duration = 15 + Math.random() * 10;
    note.style.animationDuration = `${duration}s`;
});

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString() + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (number && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    // Keep the suffix (K+, etc.)
                    const suffix = text.replace(/[0-9]/g, '');
                    stat.dataset.suffix = suffix;
                    animateCounter(stat, number);
                }
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ===== Testimonial Cards Hover Effect =====
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Feature Cards Tilt Effect =====
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Scroll to top on page load (remove hash from URL)
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
        window.scrollTo(0, 0);
    }
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});

// ===== Ripple Effect on Buttons =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Download Button - GitHub APK Link =====
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // GitHub releases page এ redirect করবে - আপনার GitHub repo link দিন
        window.open('https://github.com/YOUR_USERNAME/sTune/releases/latest', '_blank');
        // অথবা সরাসরি APK link দিতে পারেন:
        // window.location.href = 'https://github.com/YOUR_USERNAME/sTune/releases/download/v1.0.0/sTune.apk';
    });
}

// ===== Theme Toggle (Dark/Light Mode) =====
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Function to toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Add click event to both theme toggles
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// ===== Console Easter Egg =====
console.log('%c🎸 sTune - ইউকুলেলে শিখুন ও টিউন করুন', 'font-size: 24px; font-weight: bold; color: #FF6B35;');
console.log('%cইউকুলেলে প্রেমীদের জন্য ❤️ দিয়ে তৈরি', 'font-size: 14px; color: #7B2CBF;');
