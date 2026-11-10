# Presentación de Proceso UX/UI — Portfolio Web Personal
**Dante Sala Pascuccio** · Licenciatura en Sistemas de Información · Diseño UX-UI 2026 · Mg. Ernesto Ledesma

---

### Slide 1: Portada & Presentación
* **Título:** Portfolio Web Personal — Dante Sala
* **Rol:** Diseñador UX/UI & Desarrollador Front-end
* **Propuesta:** Interfaces digitales centradas en las personas, respaldadas por arquitectura de sistemas y diseño accesible.
* **Stack:** HTML5 Semántico, CSS3 Moderno, JavaScript Vanilla, Figma.

---

### Slide 2: El Usuario Objetivo (Proto-Persona)
* **Nombre:** Sofía Valenzuela (32) — Lead Product Designer & Tech Recruiter.
* **Escenario:** Revisa más de 30 portfolios diarios en sesiones rápidas.
* **Regla de los 30 Segundos:** Requiere identificar inmediatamente el rol, la ubicación, disponibilidad, proyectos con rigor metodológico y medios de contacto directos sin navegar laberintos.

---

### Slide 3: Benchmark Competitivo
* **Referente 1 (Abdulazeez - Figma Community):** Gran atmósfera dark mode y microinteracciones de acento neón, pero carecía de 5 secciones clave exigidas por la cátedra y presentaba bajo contraste en textos secundarios.
* **Referente 2 (Cátedra UX/UI):** Excelente completitud estructural de 9 secciones y foco en accesibilidad, con oportunidad de modernizar la capa estética.
* **Referente 3 (Minimal Tech / Brittany Chiang):** Etiquetas precisas y foco en código, con necesidad de añadir mayor narrativa visual y casos de estudio.

---

### Slide 4: Concepto Visual & Moodboard
* **3 Palabras Clave:**
  1. **Precisión:** Rigor en sistemas, alineación a la grilla y semántica de código.
  2. **Claridad:** Jerarquía visual contundente, tipografía legible y alto contraste.
  3. **Empatía:** Accesibilidad universal (WCAG AA), navegación por teclado y modo noche/día.
* **Paleta:** Base Carbón Espacial (`#090D10`), Menta Neón (`#00F5B8`), Índigo Secundario (`#6366F1`) y Slate Claro para Light Mode (`#F8FAFC`).

---

### Slide 5: Arquitectura de Información
* **Estructura One-Page fluida:**
  1. Header Sticky con Pill Navigation + Theme Switch + Mobile Drawer.
  2. Hero (Propuesta de valor + Badges de estado).
  3. Métricas cuantitativas (Estudios, Proyectos, Accesibilidad, Herramientas).
  4. Sobre Mí (Bio + 3 Principios de Diseño).
  5. Skills (4 Categorías con chips de herramientas).
  6. Proyectos Destacados (4 desarrollos reales).
  7. Experiencia & Formación (Timeline cronológico con logros).
  8. Contacto (Formulario interactivo accesible + mailto directo).
  9. Footer (Copyright 2026 + Enlaces sociales + Créditos).

---

### Slide 6: Design System & Tokens
* **Tokens de Color:** Variables CSS en `:root` con soporte dual Dark / Light.
* **Escala Tipográfica:** `Plus Jakarta Sans` para display e interactivos; `Inter` para cuerpo y datos.
* **Grilla & Espaciado:** Sistema modular de 8px con layouts Flexbox y CSS Grid.
* **Componentes Base:** Botones con 4 estados (Default, Hover, Active, Focus-visible), chips de etiquetas, tarjetas con spotlight hover y modales accesibles.

---

### Slide 7: Caso de Estudio Principal — Cubrí Seguros
* **Desafío:** Digitalizar el flujo de contratación de seguros eliminando llamadas telefónicas y reduciendo la tasa de abandono en cotización.
* **Proceso UX:** Mapeo de flujo de 5 pasos, stepper visual reactivo, validaciones en tiempo real y resumen de póliza flotante.
* **Resultado:** Reducción del tiempo estimado de 4 min a 50 seg; arquitectura 100% responsiva y accesible.

---

### Slide 8: Casos Complementarios
* **Coffea Specialty Coffee (TP4):** Maquetación Figma to Code de alta fidelidad, estructura `@layer`, carruseles nativos con `scroll-snap` y cero dependencias de JS.
* **Fatto Al Forno (Comercial):** Landing page para pizzería artesanal con catálogo digital de productos (pizzas a la piedra, empanadas y tartas), información del local y horarios.
* **Minimal Snake Game (Lógica):** Videojuego retro en Vanilla JS con bucle de juego y manipulación limpia del DOM.

---

### Slide 9: Validación & Test de Usabilidad
* **Muestra:** 3 usuarios con perfiles diversos (estudiante, desarrollador, reclutadora).
* **Hallazgo 1:** El botón de contacto en inglés pasaba desapercibido → Se transformó en "Hablemos" y se duplicó el CTA directo en el Hero.
* **Hallazgo 2:** La tarjeta requería una llamada a la acción explícita para ver el caso de estudio → Se incorporó el botón "Ver Caso de Estudio".
* **Hallazgo 3:** El modo claro requería mayor contraste en subtítulos → Se ajustó a `--text-secondary: #475569` (ratio 6.4:1, supera WCAG AA).

---

### Slide 10: Conclusiones & Métricas Finales
* **Lighthouse Mobile:** ≥ 90 en Performance, Accessibility (100), Best Practices (100) y SEO (100).
* **Accesibilidad:** Navegable 100% mediante teclado con foco visible y enlace de salto al contenido.
* **Despliegue:** Versionado en GitHub con commits semánticos y publicado en GitHub Pages con HTTPS.
