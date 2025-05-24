// This file contains JavaScript functionality for the OneWorld SatNet landing page.
// It includes interactive elements, form validation, and dynamic content updates.

document.addEventListener('DOMContentLoaded', function() {
    // FAQ toggle functionality
    document.querySelectorAll('.faq-question').forEach(function(q) {
        q.addEventListener('click', function() {
            q.parentElement.classList.toggle('open');
        });
    });

    // Cookie/Privacy bar logic
    if (!localStorage.getItem('cookieAccepted')) {
        document.getElementById('cookie-bar').style.display = 'block';
    }
    document.getElementById('cookie-accept').onclick = function() {
        localStorage.setItem('cookieAccepted', 'yes');
        document.getElementById('cookie-bar').style.display = 'none';
    };

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const message = contactForm.querySelector('textarea[name="message"]');

            if (!name.value || !email.value || !message.value) {
                e.preventDefault();
                alert('يرجى ملء جميع الحقول المطلوبة.');
            }
        });
    }
});