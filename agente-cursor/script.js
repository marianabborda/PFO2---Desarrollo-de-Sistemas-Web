/**
 * Free Time — Landing Page Interactivity
 */

(function () {
  'use strict';

  const header = document.querySelector('.header');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav__link');
  const searchForm = document.getElementById('searchForm');
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const fechaInput = document.getElementById('fecha');

  const sections = document.querySelectorAll('section[id]');

  /* Set minimum date for travel search to today */
  if (fechaInput) {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', today);
  }

  /* Header scroll effect */
  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    updateActiveNav();
  }

  /* Mobile navigation toggle */
  function toggleNav() {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isOpen);
    mainNav.classList.toggle('nav--open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('nav--open');
    document.body.style.overflow = '';
  }

  /* Active nav link on scroll */
  function updateActiveNav() {
    const scrollPos = window.scrollY + header.offsetHeight + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  /* Toast notification */
  function showToast(message) {
    toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + message;
    toast.classList.add('toast--visible');

    setTimeout(function () {
      toast.classList.remove('toast--visible');
    }, 4000);
  }

  /* Search form handler */
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const origen = document.getElementById('origen').value.trim();
      const destino = document.getElementById('destino').value.trim();
      const fecha = document.getElementById('fecha').value;

      if (!origen || !destino || !fecha) return;

      const fechaFormateada = new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      showToast('Buscando paquetes de ' + origen + ' a ' + destino + ' para el ' + fechaFormateada + '…');
      searchForm.reset();
    });
  }

  /* Contact form handler */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const destinoSelect = document.getElementById('destino-interes');
      const destinoTexto = destinoSelect.options[destinoSelect.selectedIndex].text;

      showToast('¡Gracias ' + nombre + '! Te contactaremos pronto con opciones para ' + destinoTexto + '.');
      contactForm.reset();
    });
  }

  /* Event listeners */
  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', function (e) {
    if (
      mainNav.classList.contains('nav--open') &&
      !mainNav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) {
      closeNav();
    }
  });

  handleScroll();
})();
