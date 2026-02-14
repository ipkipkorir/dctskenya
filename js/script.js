// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Testimonials Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

// Auto-rotate testimonials
if (testimonialCards.length > 0) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(index);
        });
    });
}

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Pricing Toggle (Monthly/Yearly)
const pricingToggle = document.getElementById('pricingToggle');
if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
        const monthlyPrices = document.querySelectorAll('.monthly-price');
        const yearlyPrices = document.querySelectorAll('.yearly-price');
        
        if (pricingToggle.checked) {
            monthlyPrices.forEach(price => price.style.display = 'none');
            yearlyPrices.forEach(price => price.style.display = 'inline');
        } else {
            monthlyPrices.forEach(price => price.style.display = 'inline');
            yearlyPrices.forEach(price => price.style.display = 'none');
        }
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQs
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const formData = new FormData(contactForm);
        
        // Simulate form submission
        formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        formMessage.className = 'form-message success';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            formMessage.style.display = 'none';
        }, 3000);
        
        // In a real application, you would send the data to a server:
        /*
        fetch('/api/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            formMessage.textContent = data.message;
            formMessage.className = 'form-message success';
            contactForm.reset();
        })
        .catch(error => {
            formMessage.textContent = 'Something went wrong. Please try again.';
            formMessage.className = 'form-message error';
        });
        */
    });
}

// Simple AOS (Animate On Scroll) Implementation
function initAOS() {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    aosElements.forEach(element => {
        aosObserver.observe(element);
    });
}

// Initialize AOS on page load
document.addEventListener('DOMContentLoaded', initAOS);

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form Validation Feedback
const formInputs = document.querySelectorAll('input[required], textarea[required], select[required]');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#10b981';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.style.borderColor = '#10b981';
        }
    });
});

// Add loading animation when navigating between pages
document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Optional: Add page transition effect
        document.body.style.opacity = '0.8';
    });
});

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('TechSolutions website loaded successfully!');
    document.body.style.opacity = '1';
});
