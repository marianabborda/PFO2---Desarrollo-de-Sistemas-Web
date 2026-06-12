// ============================================
// FREE TIME - Landing Page JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon between menu and close
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Search button functionality
    const searchBtn = document.querySelector('.btn-search');
    const searchFields = document.querySelectorAll('.search-field input');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            let hasValues = false;
            searchFields.forEach(field => {
                if (field.value.trim() !== '') {
                    hasValues = true;
                }
            });

            if (hasValues) {
                // Simulate search - in a real app, this would make an API call
                searchBtn.innerHTML = '<i class="ri-loader-4-line"></i> Buscando...';
                searchBtn.disabled = true;
                
                setTimeout(() => {
                    searchBtn.innerHTML = '<i class="ri-check-line"></i> ¡Buscado!';
                    setTimeout(() => {
                        searchBtn.innerHTML = '<i class="ri-search-line"></i> Buscar Viajes';
                        searchBtn.disabled = false;
                    }, 1500);
                }, 1000);
            } else {
                // Shake animation for empty fields
                searchFields.forEach(field => {
                    field.style.borderColor = '#ef4444';
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 2000);
                });
            }
        });
    }

    // Package buttons functionality
    const packageButtons = document.querySelectorAll('.btn-package');

    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.destination-card');
            const destination = card.querySelector('.destination-title').textContent;
            
            // Scroll to contact section and pre-fill destination
            const contactSection = document.querySelector('#contacto');
            const destinationSelect = document.querySelector('#destino');
            
            if (contactSection && destinationSelect) {
                const headerHeight = header.offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Try to match destination
                const options = destinationSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].text.toLowerCase().includes(destination.toLowerCase().split(' ')[0])) {
                        destinationSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Validate form
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const destino = document.getElementById('destino').value;
            
            if (!nombre || !email || !destino) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }
            
            // Simulate form submission
            submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="ri-check-line"></i> ¡Enviado!';
                submitBtn.style.backgroundColor = '#22c55e';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                    
                    alert('¡Gracias por tu solicitud! Te contactaremos pronto.');
                }, 1500);
            }, 1500);
        });
    }

    // Reservations button functionality
    const reservasBtn = document.querySelector('.btn-reservas');

    if (reservasBtn) {
        reservasBtn.addEventListener('click', function() {
            alert('Función de Mis Reservas - En desarrollo');
        });
    }

    // Add animation on scroll for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards, destination cards, and testimonial cards
    const animateElements = document.querySelectorAll('.feature-card, .destination-card, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Set minimum date for date picker to today
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navLinks && menuToggle) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    }
});
