// Sticky Header Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to Top Button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.id = 'back-to-top';
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Enhanced Intersection Observer with Stagger
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a small delay for child items to create a staggered effect
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, entry.target.dataset.delay || 0);
            revealOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.service-card, .why-choose-us, .contact-info, .fade-up, .section-header, .reveal, .footer-col').forEach((el, i) => {
    // Optionally add a delay based on index for grid items
    if (el.classList.contains('service-card') || el.classList.contains('footer-col')) {
        el.dataset.delay = (i % 3) * 100; // Stagger by 100ms
    }
    revealOnScroll.observe(el);
});

// Carousel Logic
const track = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.getElementById('carousel-next');
const prevBtn = document.getElementById('carousel-prev');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;
const intervalTime = 5000;
let slideInterval;

const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentIndex);
    });
};

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
};

const prevSlide = () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
};

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
}

indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        resetInterval();
    });
});

const startInterval = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
};

const resetInterval = () => {
    clearInterval(slideInterval);
    startInterval();
};

if (track) startInterval();

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

const toggleMenu = () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
};

if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMenu();
    }
});

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! GLCN Construction will get back to you shortly.');
        contactForm.reset();
    });
}

// Mobile Dropdown Toggle
const mobileDropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
const mobileSubmenu = document.querySelector('.mobile-submenu');

if (mobileDropdownTrigger) {
    mobileDropdownTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        mobileSubmenu.classList.toggle('active');
        const icon = mobileDropdownTrigger.querySelector('i');
        if (icon) {
            icon.style.transform = mobileSubmenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    });
}
