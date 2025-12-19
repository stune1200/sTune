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

// ===== String Button Animation =====
const stringButtons = document.querySelectorAll('.string-btn');
let currentBtn = 0;

function animateStringButtons() {
    stringButtons.forEach((btn, index) => {
        btn.classList.remove('active');
        
        if (index === currentBtn) {
            btn.classList.add('active');
        }
    });
    currentBtn = (currentBtn + 1) % stringButtons.length;
}

// Animate string buttons every 1.5 seconds
if (stringButtons.length > 0) {
    setInterval(animateStringButtons, 1500);
}

// ===== Toggle Switch Animation =====
const toggleSwitch = document.querySelector('.toggle-switch');
if (toggleSwitch) {
    setInterval(() => {
        toggleSwitch.classList.toggle('active');
    }, 4000);
}

// ===== Interactive Phone Tab Switching =====
const tabItems = document.querySelectorAll('.app-tab-bar .tab-item');
const tabContents = document.querySelectorAll('.tab-content');

tabItems.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetTab = tab.getAttribute('data-tab');
        console.log('Tab clicked:', targetTab);
        
        // Remove active from all tabs and contents
        tabItems.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked tab and corresponding content
        tab.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
            console.log('Content activated:', targetTab);
        }
    });
});

// Also add touch event for mobile
tabItems.forEach(tab => {
    tab.addEventListener('touchend', (e) => {
        e.preventDefault();
        tab.click();
    });
});

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

// ===== Scale Selection System =====
const allScales = [
    { id: 'scaleA', name: 'Scale A (AEAD)', desc: 'Scale A tuning', notes: ['A3 (216Hz)', 'E3 (162Hz)', 'A3 (216Hz)', 'D4 (288Hz)'], strings: 'A-E-A-D' },
    { id: 'scaleASharp', name: 'Scale A# (AFAD)', desc: 'Scale A# tuning', notes: ['A#3 (229Hz)', 'F3 (171Hz)', 'A#3 (229Hz)', 'D#4 (305Hz)'], strings: 'A#-F-A#-D#' },
    { id: 'scaleB', name: 'Scale B (BFBE)', desc: 'Scale B tuning', notes: ['B3 (242Hz)', 'F#3 (182Hz)', 'B3 (242Hz)', 'E4 (324Hz)'], strings: 'B-F#-B-E' },
    { id: 'scaleC', name: 'Scale C (CGCF)', desc: 'Scale C tuning', notes: ['C4 (257Hz)', 'G3 (192Hz)', 'C4 (257Hz)', 'F4 (343Hz)'], strings: 'C-G-C-F' },
    { id: 'scaleCSharp', name: 'Scale C# (CGCF)', desc: 'Scale C# tuning', notes: ['C#4 (272Hz)', 'G#3 (204Hz)', 'C#4 (272Hz)', 'F#4 (363Hz)'], strings: 'C#-G#-C#-F#' },
    { id: 'scaleD', name: 'Scale D (DADG)', desc: 'Scale D tuning', notes: ['D4 (288Hz)', 'A3 (216Hz)', 'D4 (288Hz)', 'G4 (385Hz)'], strings: 'D-A-D-G' },
    { id: 'scaleDSharp', name: 'Scale D# (DADG)', desc: 'Scale D# tuning', notes: ['D#4 (305Hz)', 'A#3 (229Hz)', 'D#4 (305Hz)', 'G#4 (408Hz)'], strings: 'D#-A#-D#-G#' },
    { id: 'scaleE', name: 'Scale E (EBEG)', desc: 'Scale E tuning', notes: ['E4 (324Hz)', 'B3 (242Hz)', 'E4 (324Hz)', 'A4 (432Hz)'], strings: 'E-B-E-A' },
    { id: 'scaleF', name: 'Scale F (FCFA)', desc: 'Scale F tuning', notes: ['F4 (343Hz)', 'C4 (257Hz)', 'F4 (343Hz)', 'A#4 (458Hz)'], strings: 'F-C-F-A#' },
    { id: 'scaleG', name: 'Scale G (GCEA)', desc: 'Standard tuning', notes: ['G4 (392Hz)', 'C4 (262Hz)', 'E4 (330Hz)', 'A4 (440Hz)'], strings: 'G-C-E-A' }
];

let favoriteScales = JSON.parse(localStorage.getItem('favoriteScales')) || ['scaleD', 'scaleCSharp', 'scaleASharp'];
let currentScale = localStorage.getItem('currentScale') || 'scaleD';

// Render scale list
function renderScaleList(containerId, scales, showDragHandle = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = scales.map(scale => {
        const isFavorite = favoriteScales.includes(scale.id);
        const isSelected = currentScale === scale.id;
        return `
            <div class="scale-item ${isSelected ? 'selected' : ''}" data-scale-id="${scale.id}">
                <div class="scale-item-header">
                    <div class="scale-item-left">
                        <span class="scale-item-name">${scale.name}</span>
                    </div>
                    <div class="scale-item-actions">
                        ${isSelected ? '<span class="scale-selected-icon">✓</span>' : ''}
                        <span class="scale-favorite-btn ${isFavorite ? 'favorited' : ''}" data-scale-id="${scale.id}">♥</span>
                    </div>
                </div>
                <div class="scale-item-desc">${scale.desc}</div>
                <div class="scale-item-notes">
                    ${scale.notes.map(note => `<span class="scale-note-tag">${note}</span>`).join('')}
                </div>
                ${showDragHandle ? '<div class="scale-drag-handle"><span></span><span></span><span></span><span></span><span></span><span></span></div>' : ''}
            </div>
        `;
    }).join('');
    
    // Add click events
    container.querySelectorAll('.scale-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('scale-favorite-btn')) return;
            selectScale(item.dataset.scaleId);
        });
    });
    
    container.querySelectorAll('.scale-favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(btn.dataset.scaleId);
        });
    });
}

function selectScale(scaleId) {
    currentScale = scaleId;
    localStorage.setItem('currentScale', scaleId);
    
    const scale = allScales.find(s => s.id === scaleId);
    if (scale) {
        // Update tuner display
        const scaleName = document.getElementById('currentScaleName');
        const scaleStrings = document.getElementById('currentScaleStrings');
        if (scaleName) scaleName.textContent = scale.name.split(' (')[0];
        if (scaleStrings) scaleStrings.textContent = scale.strings;
        
        // Update string buttons
        const strings = scale.strings.split('-');
        const btn1 = document.getElementById('stringBtn1');
        const btn2 = document.getElementById('stringBtn2');
        const btn3 = document.getElementById('stringBtn3');
        const btn4 = document.getElementById('stringBtn4');
        if (btn1) btn1.textContent = strings[1] || 'A';
        if (btn2) btn2.textContent = strings[0] || 'D';
        if (btn3) btn3.textContent = strings[2] || 'D';
        if (btn4) btn4.textContent = strings[3] || 'G';
    }
    
    // Go back to tuner
    goBackToTuner();
    
    // Re-render lists
    renderAllScaleLists();
}

function toggleFavorite(scaleId) {
    const index = favoriteScales.indexOf(scaleId);
    if (index > -1) {
        favoriteScales.splice(index, 1);
    } else {
        favoriteScales.push(scaleId);
    }
    localStorage.setItem('favoriteScales', JSON.stringify(favoriteScales));
    renderAllScaleLists();
}

function renderAllScaleLists() {
    const favScales = allScales.filter(s => favoriteScales.includes(s.id));
    renderScaleList('favoriteScaleList', favScales, true);
    renderScaleList('allScaleList', allScales, false);
}

function goBackToTuner() {
    const tunerTab = document.getElementById('tunerTab');
    const scaleTab = document.getElementById('scaleSelectionTab');
    if (tunerTab) tunerTab.classList.add('active');
    if (scaleTab) scaleTab.classList.remove('active');
}

// Scale selector click
const scaleSelector = document.getElementById('scaleSelector');
if (scaleSelector) {
    scaleSelector.addEventListener('click', () => {
        const tunerTab = document.getElementById('tunerTab');
        const scaleTab = document.getElementById('scaleSelectionTab');
        if (tunerTab) tunerTab.classList.remove('active');
        if (scaleTab) scaleTab.classList.add('active');
        renderAllScaleLists();
    });
}

// Back button
const scaleBackBtn = document.getElementById('scaleBackBtn');
if (scaleBackBtn) {
    scaleBackBtn.addEventListener('click', goBackToTuner);
}

// Scale tabs
document.querySelectorAll('.scale-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.scale-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.scale-tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const targetId = tab.dataset.scaleTab === 'favorites' ? 'favoritesContent' : 'allScalesContent';
        document.getElementById(targetId)?.classList.add('active');
    });
});

// Initialize scale display
window.addEventListener('load', () => {
    const scale = allScales.find(s => s.id === currentScale);
    if (scale) {
        const scaleName = document.getElementById('currentScaleName');
        const scaleStrings = document.getElementById('currentScaleStrings');
        if (scaleName) scaleName.textContent = scale.name.split(' (')[0];
        if (scaleStrings) scaleStrings.textContent = scale.strings;
    }
});

// ===== Course Modal System =====
const courseModal = document.getElementById('courseModal');
const courseModalClose = document.getElementById('courseModalClose');
const courseModalDownload = document.getElementById('courseModalDownload');

// Open modal on course card click
document.querySelectorAll('.clickable-course').forEach(card => {
    card.addEventListener('click', () => {
        if (courseModal) {
            courseModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
if (courseModalClose) {
    courseModalClose.addEventListener('click', () => {
        courseModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close on overlay click
if (courseModal) {
    courseModal.addEventListener('click', (e) => {
        if (e.target === courseModal) {
            courseModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Download button in modal
if (courseModalDownload) {
    courseModalDownload.addEventListener('click', () => {
        courseModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// ===== Fullscreen Demo Button =====
const fullscreenBtn = document.getElementById('openFullscreenDemo');
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.open('full_screen_view.html', '_blank');
    });
}

// ===== Phone Course Item Click (for in-phone modal) =====
const phoneModal = document.getElementById('phoneModal');
const phoneModalClose = document.getElementById('phoneModalClose');
const phoneModalDownload = document.getElementById('phoneModalDownload');

document.querySelectorAll('.phone-course-item').forEach(item => {
    item.addEventListener('click', () => {
        if (phoneModal) {
            phoneModal.classList.add('active');
        }
    });
});

if (phoneModalClose) {
    phoneModalClose.addEventListener('click', () => {
        phoneModal.classList.remove('active');
    });
}

if (phoneModal) {
    phoneModal.addEventListener('click', (e) => {
        if (e.target === phoneModal) {
            phoneModal.classList.remove('active');
        }
    });
}

if (phoneModalDownload) {
    phoneModalDownload.addEventListener('click', () => {
        phoneModal.classList.remove('active');
    });
}

// ===== Console Easter Egg =====
console.log('%c🎸 sTune - ইউকুলেলে শিখুন ও টিউন করুন', 'font-size: 24px; font-weight: bold; color: #FF6B35;');
console.log('%cইউকুলেলে প্রেমীদের জন্য ❤️ দিয়ে তৈরি', 'font-size: 14px; color: #7B2CBF;');


// ===== Image Zoom Modal for Shop Products =====
const imageZoomModal = document.getElementById('imageZoomModal');
const imageZoomClose = document.getElementById('imageZoomClose');
const zoomedImage = document.getElementById('zoomedImage');

// Add click event to all shop item images
document.querySelectorAll('.shop-item .item-image img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (imageZoomModal && zoomedImage) {
            zoomedImage.src = img.src;
            imageZoomModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close zoom modal
if (imageZoomClose) {
    imageZoomClose.addEventListener('click', () => {
        imageZoomModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close on overlay click
if (imageZoomModal) {
    imageZoomModal.addEventListener('click', (e) => {
        if (e.target === imageZoomModal) {
            imageZoomModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageZoomModal && imageZoomModal.classList.contains('active')) {
        imageZoomModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
