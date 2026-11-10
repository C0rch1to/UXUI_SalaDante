## Licenciatura en Sistemas de Información

# Diseño UX-UI - 2026 ** ** **Trabajo Final UX/UI - Portfolio Web Personal **

## Fecha límite de entrega: 10 de Noviembre de 2026 · Mg. Ernesto Ledesma

## Presentación y objetivos

## Cada alumno diseña, desarrolla y publica su portfolio web personal como trabajo final de la materia. El diseño

visual es libre y propio; la **arquitectura de información** sigue la del portfolio de referencia. El sitio debe quedar desplegado en una URL pública.

## Modalidad: individual · Tecnologías: HTML5 + CSS3 y/o Tailwind CSS (JavaScript vanilla opcional) · Peso sugerido nota final de la materia.

## Al terminar, el alumno debe poder demostrar que sabe

## 1. ​ Investigar referentes y definir un concepto visual propio (moodboard, estilo, tono).

## 2. ​ Prototipar en Figma (u otra herramienta) en mobile y desktop antes de codear.

## 3. ​ Maquetar con HTML semántico y CSS/Tailwind, responsive y accesible.

## 4. ​ Versionar con Git y desplegar en una plataforma de hosting.

## Estructura de información obligatoria

## Es un one-page con navegación por anclas ( #skills, #projects, etc.). Se puede cambiar el orden de las

secciones si se justifica, pero **todas deben estar presentes**. Los textos pueden estar en español o inglés; el contenido debe ser real (o ficticio pero verosímil si el alumno aún no tiene experiencia).

**#** **Sección** **Contenido mínimo obligatorio** **Patrón UI en la referencia**

| Header / | Navegación |
|:--- |:--- |
| Logo o iniciales, links ancla a cada sección, CTA de | contacto, link a GitHub o Behance |
| Barra fija (sticky); menú hamburguesa | en mobile |

Logo o iniciales, links ancla a cada sección, CTA de contacto, link a GitHub o Behance Barra fija (sticky); menú hamburguesa en mobile

Hero Nombre, rol, propuesta de valor en 1-2 líneas, 2 CTAs (ver trabajos / contacto), badge de disponibilidad, ubicación o zona horaria

| Título grande + subtítulo + botones | primario y secundario |
|:--- |:--- |
| Métricas / | highlights |
| 3 a 4 cifras o logros (años de estudio, proyectos, | herramientas, cursos) |
| Fila de tarjetas con número grande y | etiqueta | Métricas / highlights

3 a 4 cifras o logros (años de estudio, proyectos, herramientas, cursos) Fila de tarjetas con número grande y etiqueta

Skills Al menos 3 categorías (ej. Diseño UX, UI, Front-end, Herramientas), cada una con descripción breve y lista de herramientas Grilla de tarjetas con chips/tags

Proyectos Mínimo 3 proyectos: imagen o mockup, título, año, descripción, resultado o aprendizaje, tags de herramientas, link (caso de estudio, Figma, demo o repo) Grilla de tarjetas clickeables Experiencia / Formación

Línea de tiempo con período, rol, institución o empresa y 2 logros por ítem (puede incluir cursos, pasantías o voluntariado) Lista ordenada tipo timeline Trabajo Final UX/UI · Página 1
## Licenciatura en Sistemas de Información Diseño UX-UI - 2026

**#** **Sección** **Contenido mínimo obligatorio** **Patrón UI en la referencia**

Sobre mí Párrafo de presentación, foto o ilustración (con texto alternativo), 3 principios o valores de trabajo Texto + 3 tarjetas de principios + retrato

Contacto Llamado a la acción, email ( mailto: ), LinkedIn y al menos otra red; formulario opcional Bloque destacado con CTA

Footer Copyright con año, links sociales, navegación repetida, crédito de tecnología Pie de página simple

**Metadatos obligatorios** (como tiene la referencia): \<title\> descriptivo, meta description, Open Graph ( og:title, og:description, og:image ), theme-color, favicon y viewport.

**Adaptación para UX/UI:** se sugiere que la sección Proyectos priorice **casos de estudio** (problema → proceso → solución → resultado) en vez de repositorios de código. Al menos 1 proyecto debe tener su propio caso de estudio desarrollado (página interna o modal).

## Requisitos técnicos

El sitio es estático: HTML + CSS (puro o Tailwind). No se permiten frameworks JS (React, Vue, Next.js) ni constructores visuales (Wix, Webflow, Framer). Se pueden usar templates de ejemplo como punto de partida **siempre que se declare la fuente en el README y se modifique sustancialmente** el diseño. **HTML semántico **

- ​ Uso correcto de header, nav, main, section (con id para las anclas), article, footer.

- ​ Un solo h1; jerarquía de encabezados sin saltos (h2 por sección, h3 en tarjetas). - ​ Imágenes con alt significativo; decorativas con alt="".

- ​ Links externos con target="\_blank" rel="noopener noreferrer". **CSS / Tailwind **

- ​ Variables CSS (:root ) o tailwind.config con la paleta, tipografías y espaciados del design system.

- ​ Layout con Flexbox y CSS Grid (no tablas ni floats para maquetar).

- ​ Mobile-first, con al menos 3 breakpoints probados: 375 px, 768 px y 1280 px. Sin scroll horizontal.

- ​ Estados:hover,:focus-visible y:active en todos los elementos interactivos.

- ​ scroll-behavior: smooth y scroll-margin-top para que el header fijo no tape los títulos.

- ​ Si usan Tailwind: compilado con CLI (no el CDN de Play en producción) o justificar el uso del CDN. **Accesibilidad (WCAG 2.2 nivel AA) **

- ​ Contraste mínimo 4.5:1 en texto normal y 3:1 en texto grande.

- ​ Navegable 100% con teclado, con foco visible. Link "Saltar al contenido".

- ​ Atributo lang en \<html\>; menú mobile con aria-expanded y aria-controls. - ​ Respetar prefers-reduced-motion si hay animaciones. **Performance y SEO **

- ​ Lighthouse en mobile: **≥** ** 90** en Performance, Accessibility, Best Practices y SEO (captura en la entrega).

- ​ Imágenes optimizadas (WebP/AVIF, con width / height y loading="lazy" debajo del pliegue). Trabajo Final UX/UI · Página 2
## Licenciatura en Sistemas de Información

Diseño UX-UI - 2026 - ​ Fuentes con font-display: swap; máximo 2 familias tipográficas. - ​ Metadatos y Open Graph completos (ver sección anterior). **Repositorio **

- ​ Repo público en GitHub con commits incrementales (mínimo 10, con mensajes descriptivos).

- ​ README.md con: link al sitio, link al Figma, stack, fuentes de templates/recursos y capturas.

## Requisitos de diseño y proceso UX/UI

El diseño visual es decisión de cada alumno: **no se acepta copiar el estilo de la referencia** (paleta oscura, tipografía y layout idénticos). Lo que se evalúa es que cada decisión esté justificada por el proceso.

1. ​ ** ** **Definición del usuario objetivo:** quién va a visitar el portfolio (reclutador, cliente, estudio de diseño) y qué  necesita encontrar en menos de 30 segundos. Un proto-persona y un escenario de uso.

2. ​ ** ** **Benchmark:** análisis de 3 portfolios de referencia (puede incluir el del docente), con qué funciona y qué no  en cada uno.

3. ​ ** ** **Moodboard y concepto visual:** 3 palabras clave que definan la personalidad de la marca personal, y cómo  se traducen en color, tipografía e imágenes.

4. ​ ** ** **Arquitectura de información:** sitemap o diagrama de secciones y card sorting simple del contenido propio.

5. ​ ** ** **Wireframes de baja fidelidad:** mobile y desktop de la página completa.

6. ​ ** ** **Design system mínimo en Figma:** paleta (primario, secundario, neutros, estados), escala tipográfica, grilla  y espaciado (múltiplos de 4 u 8), componentes (botón en 4 estados, tag, tarjeta de proyecto, item de timeline, input si hay formulario).

7. ​ ** ** **Prototipo de alta fidelidad:** mobile + desktop, con navegación entre secciones y menú mobile  prototipados.

8. ​ ** ** **Validación:** test de usabilidad con al menos 3 personas (tareas como "encontrá el email" o "abrí el  proyecto más reciente"), con hallazgos y cambios aplicados.

**Elementos obligatorios de UI:** modo responsive con menú mobile, al menos una microinteracción (hover en tarjetas, transición de scroll, etc.) y consistencia entre lo diseñado en Figma y lo implementado (se compara en la corrección).

## Despliegue

El sitio debe estar publicado en una URL pública con HTTPS, desplegado **desde el repositorio de GitHub** (no subiendo archivos a mano). La plataforma es a elección del alumno, y debe documentar los pasos en el README.

**Plataforma** **Cómo se conecta** **Ventajas para el alumno** **Dificultad** GitHub Pages Settings → Pages, rama main o GitHub Actions Todo queda en GitHub; ideal para HTML puro Baja Netlify Importar repo desde el panel; deploy en cada push

Formularios de contacto sin backend (Netlify Forms), deploy previews Baja Vercel Importar repo; preset "Other" para sitio estático Preview por cada pull request; muy rápido Baja

Firebase Hosting firebase init hosting + GitHub Action de deploy Configuración de headers y CI/CD explícito; más didáctico Media Trabajo Final UX/UI · Página 3
## Licenciatura en Sistemas de Información

## Diseño UX-UI - 2026

## Requisitos del despliegue

## • ​ Deploy automático en cada push a main (CI/CD).

## • ​

La URL final se agrega en el README y en la descripción del repo.

## • ​ Página 404 personalizada (opcional, suma puntos).

## • ​

Si usan Tailwind compilado: el comando de build configurado en la plataforma, o el CSS compilado commiteado.

## Bonus: dominio propio, headers de seguridad o formulario funcional (Netlify Forms, Formspree).

## Entregables y cronograma

## El test de usabilidad se hace sobre el prototipo y la revisión entre pares sobre el sitio ya maquetado, para que haya tiempo de aplicar cambios antes del deploy.

## Entrega final (todo junto)

## ☐ ​ URL pública del portfolio desplegado.

## ☐ ​ Link al repositorio de GitHub con README completo.

## ☐ ​ Link al archivo de Figma (con permiso de visualización): research, wireframes, design system y prototipo.

## ☐ ​ PDF o slide breve del proceso (máx. 10 slides): usuario, benchmark, concepto, decisiones y hallazgos del

## test.

## ☐ ​ Captura del reporte Lighthouse (mobile).

## Rúbrica de evaluación

## Se aprueba con 60/100, con un mínimo de 50% en cada criterio. Sin sitio desplegado o sin la estructura de información completa, el trabajo no se califica.

**Criterio** **Peso** **Excelente (100%)** **Suficiente (60%)** Insuficiente (< 50%)

| Proceso UX (usuario, | benchmark, | arquitectura, test) |
|:--- |:--- |:--- |
| Research claro, test con 3+ | personas y cambios aplicados | y documentados |
| Research superficial; test | con menos usuarios o sin | cambios |

Research claro, test con 3+ personas y cambios aplicados y documentados Research superficial; test con menos usuarios o sin cambios Sin evidencia de proceso Diseño visual y design system

Concepto propio y coherente; sistema en Figma aplicado de forma consistente Diseño correcto pero genérico o muy cercano al template Inconsistente, copiado o sin sistema Estructura de información

Las 9 secciones completas, jerarquía clara, contenido de calidad Todas las secciones, algunas pobres en contenido Faltan secciones Maquetación HTML/CSS

Semántico, responsive en los 3 breakpoints, código limpio y fiel al Figma Funciona con fallas menores de responsive o semántica Rompe en mobile o maquetación incorrecta Accesibilidad y performance Lighthouse ≥ 90 en las 4 métricas; teclado y contraste OK Lighthouse 75-89 o fallas menores de accesibilidad Lighthouse \< 75 o no navegable con teclado Trabajo Final UX/UI · Página 4
## Licenciatura en Sistemas de Información Diseño UX-UI - 2026

**Criterio** **Peso** **Excelente (100%)** **Suficiente (60%)** Insuficiente (< 50%) Despliegue y repositorio CI/CD desde GitHub, README completo, commits incrementales Desplegado pero con README o historial pobre Sin desplegar o subido a mano Presentación oral No aplica No Aplica No Aplica

**Bonus** +10 Dominio propio, modo oscuro/claro, formulario funcional, caso de estudio extra, animaciones accesibles

## Recursos y sugerencias **Recursos para los alumnos **

- ​ Templates como punto de partida: HTML5 UP, Tailwind UI free components, Flowbite, Preline, Basecoat.

- ​ Inspiración de portfolios: Bestfolios, Awwwards - portfolios, Dribbble.

- ​ Contraste y accesibilidad: WebAIM Contrast Checker, Lighthouse en Chrome DevTools, extensión axe DevTools.

- ​ Paletas y tipografía: Realtime Colors, Google Fonts, Type Scale. - ​ Imágenes: Squoosh para comprimir a WebP/AVIF. **Sugerencias para la cursada **

1. ​ ** ** **Evitar "portfolios clonados".** Pedí el moodboard y las 3 palabras clave en el Hito 1, antes de que elijan  template; así el template se adapta al concepto y no al revés.

2. ​ ** ** **Contenido antes que diseño.** Muchos alumnos junior no tienen proyectos reales: permití incluir los  trabajos prácticos de la materia como proyectos, siempre presentados como caso de estudio.

3. ​ ** ** **Revisión entre pares.** Cada alumno testea el portfolio de dos compañeros con la misma lista de tareas;  sirve como test de usabilidad y les entrena el ojo crítico.

4. ​ ** ** **Corrección asistida.** Antes de corregir, corré Lighthouse y WAVE sobre cada URL; te ahorra tiempo y  objetiva el criterio de accesibilidad.

5. ​ ** ** **Comparación Figma vs sitio.** Pedí una captura lado a lado (Figma / sitio) de 2 secciones en la presentación;  deja en evidencia la fidelidad de implementación.

6. ​ ** ** **Plantilla de README.** Dales un README modelo con secciones fijas (URL, Figma, stack, créditos, proceso  de deploy, capturas): estandariza la entrega y facilita la corrección.

7. ​ ** ** **Uso de IA.** Definí una política explícita: se permite usar IA para código o textos si se declara en el README  qué se generó y cómo se revisó.

8. ​ ** ** **Variante avanzada (opcional).** Para alumnos más adelantados: modo oscuro/claro con  prefers-color-scheme y toggle, o una segunda página de caso de estudio con navegación entre proyectos.

Trabajo Final UX/UI · Página 5

**Images from page 1:**
- ![p1-1](Trabajo_Final_UXUI_Portfolio_Web_assets/img_001_01.png)

**Images from page 2:**
- ![p2-1](Trabajo_Final_UXUI_Portfolio_Web_assets/img_002_01.png)

**Images from page 3:**
- ![p3-1](Trabajo_Final_UXUI_Portfolio_Web_assets/img_003_01.png)

**Images from page 4:**
- ![p4-1](Trabajo_Final_UXUI_Portfolio_Web_assets/img_004_01.png)

**Images from page 5:**
- ![p5-1](Trabajo_Final_UXUI_Portfolio_Web_assets/img_005_01.png)
