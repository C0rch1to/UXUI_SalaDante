/**
 * PORTFOLIO WEB PERSONAL — DANTE SALA
 * Materia: Diseño UX-UI (2026) | Mg. Ernesto Ledesma
 * Archivo: main.js — Interactividad, Accesibilidad y Gestión de Estados
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileMenu();
  initActiveNavObserver();
  initCaseStudyModal();
  initContactForm();
});

/* ==========================================================================
   1. GESTOR DE TEMA (DARK / LIGHT MODE CON PERSISTENCIA)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  // 1. Obtener preferencia guardada o del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const currentTheme = savedTheme || (prefersLight ? 'light' : 'dark');

  // 2. Aplicar tema inicial
  applyTheme(currentTheme);

  // 3. Listener del botón
  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // 4. Escuchar cambios de preferencia del sistema en vivo
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    toggleBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
    toggleBtn.title = isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro';
  }
}

/* ==========================================================================
   2. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. MENÚ MOBILE ACCESIBLE (DRAWER / OVERLAY)
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav-link') : [];

  if (!menuBtn || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    menuBtn.focus();
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Cerrar al pulsar enlaces ancla
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   4. INTERSECTION OBSERVER PARA NAVEGACIÓN ACTIVA
   ========================================================================== */
function initActiveNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !desktopLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'true');
          } else {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   5. CASO DE ESTUDIO MODAL ACCESIBLE (CUBRÍ SEGUROS)
   ========================================================================== */
function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const openBtns = document.querySelectorAll('.open-case-study-btn');
  const closeBtn = document.getElementById('modal-close-btn');
  let lastActiveElement = null;

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      lastActiveElement = document.activeElement;
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    });
  });

  function closeModal() {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Cerrar al hacer clic en el backdrop exterior
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Cerrar con Escape en navegadores nativos
  modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  });
}

/* ==========================================================================
   6. FORMULARIO DE CONTACTO ACCESIBLE CON VALIDACIÓN
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status');
  if (!form || !statusBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    // Validación básica accesible
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showStatus('Por favor, completá todos los campos obligatorios.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showStatus('Por favor, ingresá una dirección de correo electrónico válida.', 'error');
      emailInput.focus();
      return;
    }

    // Feedback visual de éxito
    showStatus('¡Mensaje recibido! Gracias por contactarme, te responderé a la brevedad.', 'success');
    form.reset();
  });

  function showStatus(text, type) {
    statusBox.textContent = text;
    statusBox.className = `form-status is-visible ${type === 'success' ? 'is-success' : 'is-error'}`;
    statusBox.setAttribute('role', 'alert');
  }
}
