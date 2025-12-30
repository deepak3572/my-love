// ===== ROMANTIC ANNIVERSARY WEBSITE JAVASCRIPT =====

// Wait for DOM to load samjha tu 
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    generateTimeline();
    generateGallery();
    loadLoveLetter();
    initializeTimer();
    initializeMusicControls();
    loadSurpriseContent();
    initializeScrollAnimations();
    initializeNavigation();
    initializeMobileNav();
    initializeImageModal();
    updateHeroStats();
}

// Generate Timeline from config data
function generateTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    
    // Clear existing timeline items first
    timelineContainer.innerHTML = '';
    
    CONFIG.timeline.forEach((event, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-date">${event.date}</div>
                <h3 class="timeline-title">${event.title}</h3>
                <p class="timeline-description">${event.description}</p>
                <img src="${event.image}" alt="${event.title}" class="timeline-image" 
                     onerror="this.style.display='none'">
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Generate Gallery from config data
function generateGallery() {
    try {
        const galleryContainer = document.getElementById('gallery-container');
        
        if (!galleryContainer) {
            console.error('Gallery container not found');
            return;
        }
        
        // Clear existing gallery items first
        galleryContainer.innerHTML = '';
        
        if (!CONFIG.gallery || !Array.isArray(CONFIG.gallery)) {
            console.error('Gallery data not found or invalid');
            return;
        }
        
        CONFIG.gallery.forEach((photo, index) => {
            if (!photo.src) {
                console.warn(`Photo at index ${index} has no src`);
                return;
            }
            
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <img src="${photo.src}" alt="Memory ${index + 1}" class="gallery-image" 
                     data-index="${index}" onclick="openImageModal(${index})"
                     onerror="this.style.display='none'" style="cursor: pointer;">
                <div class="gallery-caption">${photo.caption || ''}</div>
            `;
            
            galleryContainer.appendChild(galleryItem);
        });
        
        console.log('Gallery generated with', CONFIG.gallery.length, 'images');
    } catch (error) {
        console.error('Error generating gallery:', error);
    }
}

// Load Love Letter content
function loadLoveLetter() {
    const letterElement = document.getElementById('love-letter');
    letterElement.textContent = CONFIG.loveLetter;
}

// Initialize Together Timer
function initializeTimer() {
    const timerDisplay = document.getElementById('timer-display');
    
    function updateTimer() {
        const startDate = new Date(CONFIG.dates.relationshipStart);
        const now = new Date();
        
        // Calculate time together
        const timeDiff = now - startDate;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
        
        let displayText = '';
        if (years > 0) {
            const remainingMonths = Math.floor((days % 365) / 30);
            displayText = `
                <div class="timer-number">${years}</div>
                <div class="timer-label">Year${years > 1 ? 's' : ''}</div>
                <div class="timer-number">${remainingMonths}</div>
                <div class="timer-label">Month${remainingMonths > 1 ? 's' : ''} Together</div>
            `;
        } else if (months > 0) {
            const remainingDays = days % 30;
            displayText = `
                <div class="timer-number">${months}</div>
                <div class="timer-label">Month${months > 1 ? 's' : ''}</div>
                <div class="timer-number">${remainingDays}</div>
                <div class="timer-label">Day${remainingDays > 1 ? 's' : ''} Together</div>
            `;
        } else {
            displayText = `
                <div class="timer-number">${days}</div>
                <div class="timer-label">Beautiful Day${days > 1 ? 's' : ''} Together</div>
            `;
        }
        
        timerDisplay.innerHTML = displayText;
    }
    
    updateTimer();
    // Update every hour
    setInterval(updateTimer, 3600000);
}

// Initialize Music Controls
function initializeMusicControls() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;
    
    // Set music source from config
    backgroundMusic.src = CONFIG.music.file;
    backgroundMusic.volume = 0.3; // Set a comfortable volume
    
    // Add loading event listener
    backgroundMusic.addEventListener('loadeddata', function() {
        console.log('Music loaded successfully');
    });
    
    backgroundMusic.addEventListener('error', function(e) {
        console.log('Music loading error:', e);
        musicToggle.style.display = 'none'; // Hide button if music fails to load
    });
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<span class="music-icon">♪</span>';
            musicToggle.title = 'Play music';
        } else {
            // Try to play music
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Music started successfully
                    musicToggle.classList.add('playing');
                    musicToggle.innerHTML = '<span class="music-icon">⏸</span>';
                    musicToggle.title = 'Pause music';
                    isPlaying = true;
                }).catch(error => {
                    // Auto-play was prevented
                    console.log('Playback failed:', error);
                    alert('Please click the music button to start playing our song ♡');
                });
            }
        }
        
        if (isPlaying) {
            isPlaying = false;
        }
    });
    
    // Handle music ending
    backgroundMusic.addEventListener('ended', function() {
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<span class="music-icon">♪</span>';
        musicToggle.title = 'Play music';
        isPlaying = false;
    });
    
    // Auto-play if enabled (requires user interaction first)
    if (CONFIG.music.autoplay) {
        // Wait for first user interaction
        const enableAutoplay = function() {
            musicToggle.click();
            document.removeEventListener('click', enableAutoplay);
            document.removeEventListener('touchstart', enableAutoplay);
        };
        
        document.addEventListener('click', enableAutoplay, { once: true });
        document.addEventListener('touchstart', enableAutoplay, { once: true });
    }
}

// Load Surprise Content
function loadSurpriseContent() {
    const surpriseContent = document.getElementById('surprise-content');
    
    surpriseContent.innerHTML = `
        <h3 class="surprise-title">${CONFIG.surprise.title}</h3>
        <div class="surprise-message">${CONFIG.surprise.message}</div>
    `;
}

// Initialize Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe letter and surprise sections
    observer.observe(document.getElementById('love-letter'));
    observer.observe(document.getElementById('surprise-content'));
}

// Initialize Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    // Subtle parallax effect for floating hearts
    const hearts = document.querySelectorAll('.heart');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    hearts.forEach((heart, index) => {
        const speed = (index + 1) * 0.5;
        const x = mouseX * speed;
        const y = mouseY * speed;
        heart.style.transform += ` translate(${x}px, ${y}px)`;
    });
});

// Add click effect to images
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('gallery-image') || e.target.classList.contains('timeline-image')) {
        // Create a temporary heart animation
        const heart = document.createElement('div');
        heart.innerHTML = '♡';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.color = '#f472b6';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'heartPop 1s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
});

// Add CSS for heart pop animation
const style = document.createElement('style');
style.textContent = `
    @keyframes heartPop {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) translateY(-20px);
            opacity: 1;
        }
        100% {
            transform: scale(0.8) translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        CONFIG.hero.heroImage,
        ...CONFIG.timeline.map(event => event.image),
        ...CONFIG.gallery.map(photo => photo.src)
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);
// Image Modal Functionality
let currentImageIndex = 0;

function initializeImageModal() {
    try {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const modalCaption = document.getElementById('modal-caption');
        const closeBtn = document.querySelector('.modal-close');
        const prevBtn = document.getElementById('modal-prev');
        const nextBtn = document.getElementById('modal-next');

        if (!modal || !modalImg || !modalCaption || !closeBtn || !prevBtn || !nextBtn) {
            console.error('Some modal elements not found');
            return;
        }

        // Close modal events
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeImageModal();
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeImageModal();
            }
        });

        // Navigation events
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (CONFIG.gallery && CONFIG.gallery.length > 0) {
                currentImageIndex = (currentImageIndex - 1 + CONFIG.gallery.length) % CONFIG.gallery.length;
                updateModalImage();
            }
        });

        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (CONFIG.gallery && CONFIG.gallery.length > 0) {
                currentImageIndex = (currentImageIndex + 1) % CONFIG.gallery.length;
                updateModalImage();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modal.style.display === 'block') {
                if (e.key === 'Escape') {
                    closeImageModal();
                } else if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                }
            }
        });
        
        console.log('Image modal initialized successfully');
    } catch (error) {
        console.error('Error initializing image modal:', error);
    }
}

function openImageModal(index) {
    try {
        currentImageIndex = index;
        const modal = document.getElementById('image-modal');
        
        if (!modal) {
            console.error('Modal element not found');
            return;
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        updateModalImage();
        
        console.log('Modal opened for image index:', index);
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

function closeImageModal() {
    try {
        const modal = document.getElementById('image-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        console.log('Modal closed');
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

function updateModalImage() {
    try {
        const modalImg = document.getElementById('modal-image');
        const modalCaption = document.getElementById('modal-caption');
        
        if (!modalImg || !modalCaption) {
            console.error('Modal image or caption element not found');
            return;
        }
        
        if (!CONFIG.gallery || !CONFIG.gallery[currentImageIndex]) {
            console.error('Gallery data not found or invalid index');
            return;
        }
        
        const currentPhoto = CONFIG.gallery[currentImageIndex];
        modalImg.src = currentPhoto.src;
        modalCaption.textContent = currentPhoto.caption;
        
        console.log('Modal image updated:', currentPhoto.src);
    } catch (error) {
        console.error('Error updating modal image:', error);
    }
}
// Make toggle function globally available
window.toggleMobileMenu = function() {
    console.log('Global toggle mobile menu called');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    console.log('Elements found:', {
        navToggle: !!navToggle,
        navMenu: !!navMenu
    });
    
    if (navToggle && navMenu) {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            console.log('Menu closed');
        } else {
            navToggle.classList.add('active');
            navMenu.classList.add('active');
            console.log('Menu opened');
        }
        
        // Log current classes
        console.log('Current classes:', {
            navToggle: navToggle.className,
            navMenu: navMenu.className
        });
    } else {
        console.error('Nav elements not found');
    }
};

// Simple mobile menu toggle function
function toggleMobileMenu() {
    window.toggleMobileMenu();
}

// Initialize Mobile Navigation
function initializeMobileNav() {
    console.log('Initializing mobile navigation...');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    console.log('Nav toggle element:', navToggle);
    console.log('Nav menu element:', navMenu);
    console.log('Nav links found:', navLinks.length);

    if (navToggle && navMenu) {
        console.log('Adding click event to hamburger menu');
        
        // Backup event listener (in case inline onclick doesn't work)
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach((link, index) => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked:', index);
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navToggle.classList.contains('active')) {
                    console.log('Clicking outside, closing menu');
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
        
        console.log('Mobile navigation initialized successfully');
    } else {
        console.error('Mobile nav elements not found!');
        console.error('navToggle:', navToggle);
        console.error('navMenu:', navMenu);
    }
}

// Update Hero Stats
function updateHeroStats() {
    const startDate = new Date(CONFIG.dates.relationshipStart);
    const now = new Date();
    const timeDiff = now - startDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Animate the days counter
    const daysElement = document.getElementById('days-together');
    if (daysElement) {
        animateCounter('days-together', Math.abs(days));
    }
    
    // Set memories count to gallery length
    setTimeout(() => {
        const memoriesElement = document.getElementById('memories-count');
        if (memoriesElement) {
            animateCounter('memories-count', CONFIG.gallery.length);
        }
    }, 500);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = targetValue / 50; // 50 steps
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 30);
}
// Debug function to test modal
function testModal() {
    console.log('Testing modal...');
    console.log('CONFIG.gallery:', CONFIG.gallery);
    console.log('Modal element:', document.getElementById('image-modal'));
    openImageModal(0);
}

// Enhanced DOM ready handler
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing website...');
    
    // Add a small delay to ensure everything is loaded
    setTimeout(() => {
        console.log('Starting website initialization...');
        // Only call initializeWebsite once
        // initializeWebsite(); // This was causing duplicate timeline
        
        // Test if gallery images are clickable
        const galleryImages = document.querySelectorAll('.gallery-image');
        console.log('Found gallery images:', galleryImages.length);
        
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Image clicked:', index);
                openImageModal(index);
            });
        });
        
        // Test hamburger menu after initialization
        setTimeout(() => {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            console.log('After init - Nav toggle:', navToggle);
            console.log('After init - Nav menu:', navMenu);
            
            if (navToggle) {
                console.log('Hamburger menu is ready for clicking');
                // Add visual indicator that it's clickable
                navToggle.style.cursor = 'pointer';
                navToggle.title = 'Open Menu';
            }
        }, 500);
        
    }, 100);
});
// Manual test function for hamburger menu
function testHamburgerMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        console.log('Manual test - Menu toggled');
    } else {
        console.error('Elements not found for manual test');
    }
}

// Add window click test
window.testMenu = testHamburgerMenu;
message.txt
