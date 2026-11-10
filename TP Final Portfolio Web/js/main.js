/**
 * PORTFOLIO WEB PERSONAL — DANTE SALA
 * Materia: Diseño UX-UI (2026) | Mg. Ernesto Ledesma
 * Archivo: main.js — Interactividad, Internacionalización (ES/EN), Carrusel y Accesibilidad
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initThemeToggle();
  initHeaderScroll();
  initMobileMenu();

  // Diferir observadores e interactividades secundarias a tiempo ocioso para dejar el hilo principal 100% libre
  const scheduleIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));
  scheduleIdle(() => {
    initFloatingControls();
    initActiveNavObserver();
    initProjectsCarousel();
    initCaseStudyModal();
    initContactForm();
  });
});

/* ==========================================================================
   1. GESTOR DE IDIOMA (ESPAÑOL / INGLÉS CON DICCIONARIO COMPLETO)
   ========================================================================== */
const translations = {
  es: {
    // Header
    nav_about: "Sobre mí",
    nav_skills: "Skills",
    nav_projects: "Proyectos",
    nav_experience: "Experiencia",
    nav_contact: "Contacto",
    nav_cta: "Hablemos",
    lang_btn_label: "Cambiar a inglés",
    lang_btn_title: "Switch to English",
    lang_btn_text: "EN",
    theme_btn_light: "Cambiar a modo claro",
    theme_btn_dark: "Cambiar a modo oscuro",
    drawer_theme_lbl: "Modo",
    drawer_lang_lbl: "Idioma",

    // Hero
    hero_status: "Disponible para nuevos desafíos",
    hero_location: "Buenos Aires, Argentina (GMT-3)",
    hero_title_1: "Diseñador UX/UI &",
    hero_title_2: "Desarrollador Front-end",
    hero_desc: "Hola, soy <strong>Dante Sala</strong>. Diseño productos digitales intuitivos y accesibles, uniendo el rigor de la arquitectura de sistemas con una cuidada sensibilidad estética moderna.",
    hero_cta_projects: "Explorar Proyectos",
    hero_cta_contact: "Contactar",

    // Métricas
    metric_study_num: "+3",
    metric_study_lbl: "Años de formación en Sistemas",
    metric_proj_num: "5+",
    metric_proj_lbl: "Proyectos digitales desarrollados",
    metric_wcag_num: "100%",
    metric_wcag_lbl: "Accesibilidad WCAG 2.2 AA",
    metric_tools_num: "15+",
    metric_tools_lbl: "Herramientas y tecnologías dominadas",

    // Sobre mí
    about_tag: "Sobre mí",
    about_title: "Tecnología con propósito humano",
    about_lead: "Soy estudiante de la <strong>Licenciatura en Sistemas de Información</strong> con un marcado perfil integrador entre el <strong>diseño de experiencia de usuario (UX/UI)</strong> y la <strong>arquitectura front-end</strong>.",
    about_desc: "Entiendo el diseño no como un mero adorno estético, sino como una herramienta estratégica para resolver problemas complejos de interacción, reducir la fricción cognitiva y garantizar que cualquier persona, independientemente de sus capacidades o dispositivo, pueda interactuar de forma intuitiva.",
    principle_1_title: "Diseño Humano",
    principle_1_desc: "La investigación empírica y los tests de usabilidad superan a las suposiciones teóricas.",
    principle_2_title: "Simplicidad Clara",
    principle_2_desc: "Menos sobrecarga visual, mayor rapidez de decisión y accesibilidad estricta WCAG AA.",
    principle_3_title: "Diseño a Código",
    principle_3_desc: "Diseñar entendiendo la viabilidad técnica garantiza fidelidad exacta en producción.",

    // Skills
    skills_tag: "Habilidades",
    skills_title: "Ecosistema técnico y metodológico",
    skills_desc: "Herramientas y disciplinas aplicadas en cada fase del ciclo de vida del producto.",
    cat_1_title: "Investigación & Estrategia UX",
    cat_1_desc: "Descubrimiento de necesidades de usuarios, evaluación heurística y modelado de flujos.",
    cat_2_title: "Diseño UI & Prototipado",
    cat_2_desc: "Construcción de sistemas de diseño visual, prototipos de alta fidelidad y pautas WCAG.",
    cat_3_title: "Maquetación & Front-end",
    cat_3_desc: "Implementación fiel de interfaces interactivas con tecnologías web estándares y código limpio.",
    cat_4_title: "Herramientas & Calidad",
    cat_4_desc: "Control de versiones colaborativo, auditorías de performance y despliegue continuo.",

    // Proyectos
    projects_tag: "Proyectos destacados",
    projects_title: "Casos de estudio y desarrollos",
    projects_desc: "Soluciones digitales que combinan investigación de usuarios, diseño visual riguroso y código optimizado.",
    
    // Proyecto 1: Cubrí
    p1_type: "Caso de Estudio UX/UI · Proyecto Estrella",
    p1_title: "Cubrí Seguros — Contratación Digital",
    p1_desc: "Flujo de contratación digital 100% online para aseguradora automotriz. Arquitectura SPA de 7 pantallas con stepper reactivo, cotizador en tiempo real, validación de formularios y modo oscuro optimizado.",
    p1_learning: "<strong>Resultado clave:</strong> Reducción del tiempo de cotización a 50 segundos y tasa de completitud de formulario del 88% en pruebas de usabilidad.",
    p1_btn_case: "Ver Caso de Estudio",
    btn_live_demo: "Demo en vivo",

    // Proyecto 2: Coffea
    p2_type: "Figma to Code · Landing Comercial",
    p2_title: "Coffea — Specialty Coffee Shop",
    p2_desc: "Landing page comercial de alta fidelidad maquetada desde especificaciones en Figma. Desarrollo responsivo estructurado con tokens de diseño, capas en cascada (@layer), carruseles nativos con scroll-snap y cero dependencias de JavaScript.",
    p2_learning: "<strong>Aprendizaje:</strong> Implementación de microinteracciones fluidas y componentes interactivos 100% CSS, logrando 99 en rendimiento móvil.",
    btn_explore: "Explorar Sitio",

    // Proyecto 3: Fatto (Ajustado fielmente a la realidad)
    p3_type: "Landing Comercial · Menú Digital",
    p3_title: "Fatto Al Forno — Pizzería Artesanal",
    p3_desc: "Landing page comercial para la pizzería artesanal Fatto Al Forno (Concepción del Uruguay). Diseño y desarrollo web con catálogo digital de productos (pizzas a la piedra, empanadas y tartas), información del local, horarios y enlaces de pedido.",
    p3_learning: "<strong>Experiencia:</strong> Trabajo real de maquetación web independiente: diseño visual adaptado al rubro gastronómico, optimización de recursos y estructura responsive.",
    btn_visit: "Visitar Proyecto",

    // Proyecto 4: Snake
    p4_type: "Desarrollo Web · Lógica Vanilla JS",
    p4_title: "Minimal Snake Game — Arcade Moderno",
    p4_desc: "Reinterpretación minimalista del clásico videojuego de la serpiente, desarrollado como primer desafío de programación web en JavaScript. Bucle de animación (Game Loop), detección precisa de colisiones matriciales y registro de puntaje máximo local.",
    p4_learning: "<strong>Aprendizaje:</strong> Comprensión profunda de la máquina de estados, renderizado en Canvas/DOM y manipulación de eventos de teclado.",
    btn_play: "Jugar Online",

    // Experiencia
    exp_tag: "Trayectoria",
    exp_title: "Experiencia y formación",
    exp_desc: "Evolución académica y proyectos prácticos que consolidan mi perfil profesional.",
    t1_period: "2024 — Presente",
    t1_role: "Licenciatura en Sistemas de Información",
    t1_inst: "Facultad de Ciencias Exactas y Tecnología",
    t1_ach1: "Formación troncal en arquitectura de software, bases de datos relacionales, ingeniería de requerimientos y metodologías ágiles.",
    t1_ach2: "Especialización en desarrollo web full-stack y modelado de datos enfocado en aplicaciones de alto impacto.",
    t2_period: "Ciclo 2026",
    t2_role: "Diseño UX-UI Avanzado & Prototipado",
    t2_inst: "Cátedra Mg. Ernesto Ledesma",
    t2_ach1: "Desarrollo integral de sistemas de diseño en Figma con auto-layout, tokens semánticos, componentes dinámicos y variantes.",
    t2_ach2: "Implementación de flujos SPA reactivos accesibles bajo estándares internacionales WCAG 2.2 nivel AA.",
    t2_link_repo: "Repositorio Cátedra (actividades)",
    t2_link_index: "Índice de Trabajos Prácticos",
    t3_period: "2025 — 2026",
    t3_role: "Desarrollador Web & Diseñador UI Independiente",
    t3_inst: "Clientes Gastronómicos & Proyectos Personales",
    t3_ach1: "Diseño y maquetación del sitio web de Fatto Al Forno con catálogo digital y adaptación responsive para móviles.",
    t3_ach2: "Optimización de accesibilidad y métricas Core Web Vitals (LCP, INP, CLS) en sitios estáticos alojados en GitHub Pages.",

    // Contacto
    contact_tag: "Contacto",
    contact_title: "¿Tenés un proyecto o propuesta en mente?",
    contact_desc: "Estoy disponible para incorporarme a equipos de producto, realizar pasantías formativas o colaborar en proyectos desafiantes de diseño y maquetación web.",
    form_name_lbl: "Tu nombre *",
    form_name_ph: "Ej: Sofía Valenzuela",
    form_email_lbl: "Correo electrónico *",
    form_email_ph: "sofia@empresa.com",
    form_msg_lbl: "Mensaje o propuesta *",
    form_msg_ph: "Contame sobre tu proyecto o búsqueda laboral...",
    form_submit: "Enviar Mensaje",
    form_success: "¡Mensaje recibido! Gracias por contactarme, te responderé a la brevedad.",
    form_err_req: "Por favor, completá todos los campos obligatorios.",
    form_err_email: "Por favor, ingresá una dirección de correo electrónico válida.",

    // Footer
    footer_role: "Licenciatura en Sistemas de Información · Diseño UX-UI 2026",
    footer_repo: "Repositorio Cátedra",
    footer_credit: "© 2026 Dante Sala. Construido con HTML5 Semántico, CSS3 y JS Vanilla.",

    // Modal
    modal_title: "Caso de Estudio: Cubrí Seguros",
    modal_sec1_title: "1. El Problema & Oportunidad",
    modal_sec1_p: "La contratación de seguros automotores en Argentina tradicionalmente exige llamadas telefónicas de ventas, formularios con más de 20 campos obligatorios y falta de claridad en las coberturas. Esto generaba una tasa de abandono de cotización superior al 60% en usuarios menores de 35 años.",
    modal_sec2_title: "2. Investigación & Arquitectura",
    modal_sec2_p: "A través de un benchmarking de 4 aseguradoras líderes y el testeo de un proto-persona (conductor urbano joven que busca agilidad desde su teléfono), se diseñó un flujo de 5 pasos consecutivos:",
    modal_sec3_title: "3. Solución de Diseño & Tokens",
    modal_sec3_p: "El sistema se maquetó desde Figma utilizando un diseño responsivo asistido por tokens en Tailwind CSS y Basecoat UI. Se incorporó un stepper interactivo que informa el progreso en todo momento, reduciendo la ansiedad del usuario, y una barra resumen fija que actualiza el valor mensual en tiempo real.",
    modal_sec4_title: "4. Métricas & Resultados Obtenidos",
    modal_stat_1_lbl: "Tiempo promedio de cotización (vs 4 min previo)",
    modal_stat_2_lbl: "WCAG AA en contraste y teclado",
    modal_stat_3_lbl: "Tasa de completitud en test con usuarios",
    modal_stat_4_lbl: "Sin recargas de página (Arquitectura SPA)",
    modal_btn_full: "Abrir Proyecto en Pantalla Completa"
  },

  en: {
    // Header
    nav_about: "About me",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_contact: "Contact",
    nav_cta: "Let's Talk",
    lang_btn_label: "Cambiar a español",
    lang_btn_title: "Switch to Spanish",
    lang_btn_text: "ES",
    theme_btn_light: "Switch to light mode",
    theme_btn_dark: "Switch to dark mode",
    drawer_theme_lbl: "Theme",
    drawer_lang_lbl: "Language",

    // Hero
    hero_status: "Available for new challenges",
    hero_location: "Buenos Aires, Argentina (GMT-3)",
    hero_title_1: "UX/UI Designer &",
    hero_title_2: "Front-end Developer",
    hero_desc: "Hi, I'm <strong>Dante Sala</strong>. I design intuitive and accessible digital products, blending software architecture rigor with modern aesthetic sensibilities.",
    hero_cta_projects: "Explore Projects",
    hero_cta_contact: "Get in Touch",

    // Metrics
    metric_study_num: "+3",
    metric_study_lbl: "Years studying Systems Information",
    metric_proj_num: "5+",
    metric_proj_lbl: "Digital projects developed",
    metric_wcag_num: "100%",
    metric_wcag_lbl: "WCAG 2.2 AA Accessibility",
    metric_tools_num: "15+",
    metric_tools_lbl: "Tools & technologies mastered",

    // About
    about_tag: "About me",
    about_title: "Technology with human purpose",
    about_lead: "I am a <strong>Systems Information</strong> student with a strong hybrid focus bridging <strong>user experience design (UX/UI)</strong> and <strong>front-end architecture</strong>.",
    about_desc: "I view design not as mere decoration, but as a strategic tool to solve complex interaction problems, minimize cognitive load, and ensure universal accessibility across any device.",
    principle_1_title: "Human-Centered",
    principle_1_desc: "Empirical research and usability testing always triumph over theoretical assumptions.",
    principle_2_title: "Clear Simplicity",
    principle_2_desc: "Lower cognitive friction, faster decision making, and strict WCAG AA compliance.",
    principle_3_title: "Design to Code",
    principle_3_desc: "Designing with code viability in mind guarantees pixel-perfect production fidelity.",

    // Skills
    skills_tag: "Skills",
    skills_title: "Technical & Methodological Ecosystem",
    skills_desc: "Tools and disciplines applied across every stage of the product lifecycle.",
    cat_1_title: "UX Research & Strategy",
    cat_1_desc: "User needs discovery, heuristic evaluation, and user flow modeling.",
    cat_2_title: "UI Design & Prototyping",
    cat_2_desc: "Design systems architecture, high-fidelity prototypes, and WCAG guidelines.",
    cat_3_title: "Front-end Development",
    cat_3_desc: "Faithful interactive UI implementation with standard web technologies and clean code.",
    cat_4_title: "Tools & Workflow",
    cat_4_desc: "Collaborative version control, performance audits, and continuous deployment.",

    // Projects
    projects_tag: "Featured Projects",
    projects_title: "Case Studies & Developments",
    projects_desc: "Digital solutions combining user research, rigorous visual design, and clean code.",
    
    // Project 1: Cubrí
    p1_type: "UX/UI Case Study · Star Project",
    p1_title: "Cubrí Seguros — Digital Insurance Flow",
    p1_desc: "100% online car insurance checkout flow. 7-screen SPA architecture with reactive stepper, real-time quote calculator, form validation, and optimized dark mode.",
    p1_learning: "<strong>Key outcome:</strong> Quote time reduced to 50 seconds and 88% form completion rate during usability testing.",
    p1_btn_case: "View Case Study",
    btn_live_demo: "Live Demo",

    // Project 2: Coffea
    p2_type: "Figma to Code · Commercial Landing",
    p2_title: "Coffea — Specialty Coffee Shop",
    p2_desc: "High-fidelity commercial landing page built from Figma specs. Responsive layout using design tokens, CSS @layer cascade, native scroll-snap carousels, and 0% JavaScript.",
    p2_learning: "<strong>Key learning:</strong> Fluid microinteractions and interactive components built 100% in CSS, achieving 99 mobile performance.",
    btn_explore: "Explore Site",

    // Project 3: Fatto
    p3_type: "Commercial Landing · Digital Menu",
    p3_title: "Fatto Al Forno — Artisan Pizzeria",
    p3_desc: "Commercial landing page for artisan pizzeria Fatto Al Forno (Concepción del Uruguay). Web design and development featuring a digital menu catalogue (pizzas, empanadas, and pies), restaurant info, business hours, and ordering links.",
    p3_learning: "<strong>Experience:</strong> Real-world freelance web project: visual design tailored to gastronomy, asset optimization, and responsive layout.",
    btn_visit: "Visit Project",

    // Project 4: Snake
    p4_type: "Web Development · Vanilla JS Logic",
    p4_title: "Minimal Snake Game — Modern Arcade",
    p4_desc: "Minimalist recreation of the classic snake arcade game, developed as an early JavaScript web project. Features game loop animation, matrix collision detection, and local high score tracking.",
    p4_learning: "<strong>Key learning:</strong> In-depth understanding of finite state machines, Canvas/DOM rendering, and keyboard event loops.",
    btn_play: "Play Online",

    // Experience
    exp_tag: "Career & Education",
    exp_title: "Experience & Education",
    exp_desc: "Academic progress and practical projects shaping my professional journey.",
    t1_period: "2024 — Present",
    t1_role: "Bachelor's Degree in Information Systems",
    t1_inst: "Faculty of Exact Sciences & Technology",
    t1_ach1: "Core curriculum in software architecture, relational databases, requirements engineering, and agile methodologies.",
    t1_ach2: "Specialization in full-stack web development and data modeling for high-impact applications.",
    t2_period: "2026 Academic Term",
    t2_role: "Advanced UX-UI Design & Prototyping",
    t2_inst: "Course by Mg. Ernesto Ledesma",
    t2_ach1: "Comprehensive design systems in Figma with auto-layout, semantic tokens, dynamic components, and variants.",
    t2_ach2: "Implementation of accessible reactive SPA workflows under international WCAG 2.2 AA standards.",
    t2_link_repo: "Course Repository (all coursework)",
    t2_link_index: "Interactive Coursework Index",
    t3_period: "2025 — 2026",
    t3_role: "Independent Web Developer & UI Designer",
    t3_inst: "Gastronomy Clients & Personal Projects",
    t3_ach1: "Design and layout of the Fatto Al Forno website with digital menu and mobile responsiveness.",
    t3_ach2: "Optimization of accessibility and Core Web Vitals metrics (LCP, INP, CLS) on static sites hosted on GitHub Pages.",

    // Contact
    contact_tag: "Contact",
    contact_title: "Have a project or proposal in mind?",
    contact_desc: "I am available to join product teams, take on internships, or collaborate on challenging web design and front-end projects.",
    form_name_lbl: "Your Name *",
    form_name_ph: "e.g. Sophia Valenzuela",
    form_email_lbl: "Email Address *",
    form_email_ph: "sophia@company.com",
    form_msg_lbl: "Message or Proposal *",
    form_msg_ph: "Tell me about your project or role...",
    form_submit: "Send Message",
    form_success: "Message received! Thank you for reaching out, I will reply shortly.",
    form_err_req: "Please fill out all required fields.",
    form_err_email: "Please enter a valid email address.",

    // Footer
    footer_role: "Information Systems Degree · UX-UI Design 2026",
    footer_repo: "Course Repository",
    footer_credit: "© 2026 Dante Sala. Built with Semantic HTML5, CSS3, and Vanilla JS.",

    // Modal
    modal_title: "Case Study: Cubrí Seguros",
    modal_sec1_title: "1. Problem & Opportunity",
    modal_sec1_p: "Car insurance contracting in Argentina traditionally required aggressive sales phone calls, 20+ field forms, and opaque policy terms. This led to a quote drop-off rate exceeding 60% among users under 35.",
    modal_sec2_title: "2. Research & Architecture",
    modal_sec2_p: "Through benchmarking 4 leading insurers and testing a proto-persona (a young urban commuter seeking mobile agility), a 5-step sequential flow was architected:",
    modal_sec3_title: "3. Design Solution & Tokens",
    modal_sec3_p: "The interface was engineered from Figma utilizing responsive design backed by design tokens in Tailwind CSS and Basecoat UI. An interactive stepper keeps users aware of progress at all times, reducing drop-off anxiety, complemented by a sticky summary bar recalculating monthly premiums in real time.",
    modal_sec4_title: "4. Metrics & Quantitative Results",
    modal_stat_1_lbl: "Average quote time (vs 4 min prior)",
    modal_stat_2_lbl: "WCAG AA in contrast and keyboard",
    modal_stat_3_lbl: "Completion rate during usability tests",
    modal_stat_4_lbl: "Zero page reloads (SPA Architecture)",
    modal_btn_full: "Open Project in Fullscreen"
  }
};

function initLanguageToggle() {
  const langBtns = [
    document.getElementById('lang-toggle-btn'),
    document.getElementById('drawer-lang-toggle-btn')
  ].filter(Boolean);

  const savedLang = localStorage.getItem('lang') || 'es';
  // Si el idioma guardado es español (el predeterminado en el HTML), evitamos reescribir destructivamente el DOM en carga
  if (savedLang !== 'es') {
    applyLanguage(savedLang);
  } else {
    syncControlButtons('es');
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentLang = document.documentElement.getAttribute('lang') || 'es';
      const newLang = currentLang === 'es' ? 'en' : 'es';
      applyLanguage(newLang);
      localStorage.setItem('lang', newLang);
    });
  });

  function syncControlButtons(lang) {
    const dict = translations[lang] || translations.es;
    langBtns.forEach(btn => {
      const textSpan = btn.querySelector('.lang-text');
      if (textSpan) textSpan.textContent = dict.lang_btn_text;
      btn.setAttribute('aria-label', dict.lang_btn_label);
      btn.title = dict.lang_btn_title;
    });
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    const dict = translations[lang];
    if (!dict) return;

    // Actualizar botones de idioma (Header y Drawer)
    syncControlButtons(lang);

    // Sincronizar labels de botones de tema según idioma activo
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const isLight = activeTheme === 'light';
    const themeBtns = [
      document.getElementById('theme-toggle-btn'),
      document.getElementById('drawer-theme-toggle-btn')
    ].filter(Boolean);

    themeBtns.forEach(btn => {
      btn.setAttribute('aria-label', isLight ? dict.theme_btn_dark : dict.theme_btn_light);
      btn.title = isLight ? dict.theme_btn_dark : dict.theme_btn_light;
    });

    // Actualizar elementos con atributo data-i18n solo si cambia su contenido
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined && el.innerHTML !== dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Actualizar placeholders con data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key] !== undefined && el.getAttribute('placeholder') !== dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });
  }
}

/* ==========================================================================
   2. GESTOR DE TEMA (DARK / LIGHT MODE CON PERSISTENCIA Y SOPORTE MULTIBOTÓN)
   ========================================================================== */
function initThemeToggle() {
  const themeBtns = [
    document.getElementById('theme-toggle-btn'),
    document.getElementById('drawer-theme-toggle-btn')
  ].filter(Boolean);

  if (!themeBtns.length) return;

  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const currentTheme = savedTheme || (prefersLight ? 'light' : 'dark');

  applyTheme(currentTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    const lang = document.documentElement.getAttribute('lang') || 'es';
    const dict = translations[lang] || translations.es;
    
    themeBtns.forEach(btn => {
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      btn.setAttribute('aria-label', isLight ? dict.theme_btn_dark : dict.theme_btn_light);
      btn.title = isLight ? dict.theme_btn_dark : dict.theme_btn_light;
    });
  }
}

/* ==========================================================================
   3. HEADER SCROLL EFFECT
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
   4. MENÚ MOBILE DRAWER DESDE LA DERECHA (ACCESIBLE Y CON BACKDROP)
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileNav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const navLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav-link') : [];

  if (!mobileNav || !menuBtn) return;

  function openMenu() {
    mobileNav.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
      menuBtn.focus();
    }
  });
}

/* ==========================================================================
   4b. CONTROLES FLOTANTES MÓVILES (ARRASTRE DE MENÚ Y VOLVER ARRIBA)
   ========================================================================== */
function initFloatingControls() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const dock = document.getElementById('mobile-floating-dock');
  const topBtn = document.getElementById('floating-top-btn');

  const handleScroll = () => {
    // Solo activo en móviles (< 900px): arrastra el botón hamburguesa y muestra botón subir
    if (window.innerWidth < 900) {
      if (window.scrollY > 80) {
        if (menuBtn) menuBtn.classList.add('is-scrolled-floating');
        if (dock) dock.classList.add('is-visible');
      } else {
        if (menuBtn) menuBtn.classList.remove('is-scrolled-floating');
        if (dock) dock.classList.remove('is-visible');
      }
    } else {
      if (menuBtn) menuBtn.classList.remove('is-scrolled-floating');
      if (dock) dock.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  handleScroll();

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   5. INTERSECTION OBSERVER PARA NAVEGACIÓN ACTIVA
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
   6. CARRUSEL INTERACTIVO DE PROYECTOS (ALINEACIÓN IZQUIERDA + BOTONES DINÁMICOS + DOTS)
   ========================================================================== */
function initProjectsCarousel() {
  const carousel = document.getElementById('projects-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');
  const cards = carousel ? carousel.querySelectorAll('.project-card') : [];

  if (!carousel || !cards.length) return;

  function updateCarouselState() {
    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    // 1. Mostrar/Ocultar botones dinámicamente según posibilidad de desplazamiento
    if (prevBtn) {
      if (scrollLeft <= 10) {
        prevBtn.classList.add('is-hidden');
      } else {
        prevBtn.classList.remove('is-hidden');
      }
    }

    if (nextBtn) {
      if (scrollLeft >= maxScroll - 10) {
        nextBtn.classList.add('is-hidden');
      } else {
        nextBtn.classList.remove('is-hidden');
      }
    }

    // 2. Actualizar los 4 punticos oscuros inferiores (dot activo)
    // Se determina cuál tarjeta está más alineada con el borde izquierdo del carrusel
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardOffset = card.offsetLeft - carousel.offsetLeft;
      const distance = Math.abs(cardOffset - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      const isActive = index === closestIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  // Desplazamiento con botón anterior (Left)
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth;
      const gap = 24;
      carousel.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    });
  }

  // Desplazamiento con botón siguiente (Right)
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth;
      const gap = 24;
      carousel.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
    });
  }

  // Navegación mediante clic en los 4 punticos oscuros
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      if (cards[targetIndex]) {
        const targetOffset = cards[targetIndex].offsetLeft - carousel.offsetLeft;
        carousel.scrollTo({ left: targetOffset, behavior: 'smooth' });
      }
    });
  });

  // Escuchar eventos de scroll y resize
  carousel.addEventListener('scroll', updateCarouselState, { passive: true });
  window.addEventListener('resize', updateCarouselState, { passive: true });

  // Estado inicial
  setTimeout(updateCarouselState, 150);
}

/* ==========================================================================
   7. CASO DE ESTUDIO MODAL ACCESIBLE (CUBRÍ SEGUROS)
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

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  });
}

/* ==========================================================================
   8. FORMULARIO DE CONTACTO ACCESIBLE CON VALIDACIÓN
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status');
  if (!form || !statusBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const lang = document.documentElement.getAttribute('lang') || 'es';
    const dict = translations[lang] || translations.es;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showStatus(dict.form_err_req, 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showStatus(dict.form_err_email, 'error');
      emailInput.focus();
      return;
    }

    showStatus(dict.form_success, 'success');
    form.reset();
  });

  function showStatus(text, type) {
    statusBox.textContent = text;
    statusBox.className = `form-status is-visible ${type === 'success' ? 'is-success' : 'is-error'}`;
    statusBox.setAttribute('role', 'alert');
  }
}
