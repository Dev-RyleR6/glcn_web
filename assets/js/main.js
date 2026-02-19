// Sticky Header Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Remove the hardcoded fade-up classes and use a common animate class if needed
            // For now, the CSS already does the entry animation. 
            // We could add more complex trigger-on-scroll logic here.
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .fade-in, .fade-up').forEach(el => {
    observer.observe(el);
});

// Mobile Menu Toggle (Simplified)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        // Logic for mobile drawer would go here
        alert('Mobile menu functionality coming soon!');
    });
}

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! GLCN Construction will get back to you shortly.');
        contactForm.reset();
    });
}
