# Trabajo Práctico N° 3: HTML y CSS

**Carrera:** Licenciatura en Sistemas de Información  
**Materia:** Diseño UX-UI (Ciclo 2026)  
**Institución:** Facultad de Ciencia y Tecnología (FCyT) - Sede Concepción del Uruguay  

---

## 📋 Descripción General

Este repositorio contiene la resolución integral de los **20 ejercicios** correspondientes al Trabajo Práctico N° 3 de HTML y CSS. Cada ejercicio fue resuelto de forma modular y desacoplada en su propia carpeta con sus respectivos archivos `index.html` y `styles.css`, priorizando el uso de **HTML5 semántico**, **CSS3 moderno** (Flexbox, Grid, Custom Properties, `@keyframes`, Pseudo-clases), altos estándares de **accesibilidad web (a11y)** y **diseño responsivo**.

Además, en la raíz del repositorio se dispone de un archivo [`index.html`](index.html) que funciona como un **portal interactivo de navegación** para explorar visualmente cada uno de los 20 ejercicios resueltos.

---

## 📁 Estructura del Repositorio

```text
TP3_UXUI_Sala/
├── README.md                      # Documentación del trabajo práctico y decisiones de diseño
├── index.html                     # Portal / Hub central de acceso a los 20 ejercicios
├── ejercicio-01/                  # Ejercicio 01: Estructura HTML básica
│   ├── index.html
│   └── styles.css
├── ejercicio-02/                  # Ejercicio 02: Listas y enlaces externos seguros
│   ├── index.html
│   └── styles.css
├── ejercicio-03/                  # Ejercicio 03: Tabla de horario semanal (thead, tbody, tfoot)
│   ├── index.html
│   └── styles.css
├── ejercicio-04/                  # Ejercicio 04: Formulario simple accesible
│   ├── index.html
│   └── styles.css
├── ejercicio-05/                  # Ejercicio 05: Primeros estilos CSS (selectores de etiqueta)
│   ├── index.html
│   └── styles.css
├── ejercicio-06/                  # Ejercicio 06: Selectores CSS (clase, ID, descendientes)
│   ├── index.html
│   └── styles.css
├── ejercicio-07/                  # Ejercicio 07: Modelo de caja (box-sizing: border-box explícito)
│   ├── index.html
│   └── styles.css
├── ejercicio-08/                  # Ejercicio 08: Flexbox - Barra de navegación
│   ├── index.html
│   └── styles.css
├── ejercicio-09/                  # Ejercicio 09: Flexbox - Galería de tarjetas (flex-wrap y gap)
│   ├── index.html
│   └── styles.css
├── ejercicio-10/                  # Ejercicio 10: CSS Grid - Layout de página con áreas nombradas
│   ├── index.html
│   └── styles.css
├── ejercicio-11/                  # Ejercicio 11: Pseudo-clases (:hover, :nth-child) y pseudo-elementos (::before, ::after)
│   ├── index.html
│   └── styles.css
├── ejercicio-12/                  # Ejercicio 12: Posicionamiento fixed (volver arriba) y absolute (tooltip)
│   ├── index.html
│   └── styles.css
├── ejercicio-13/                  # Ejercicio 13: Formulario estilizado (:focus, :active, transiciones)
│   ├── index.html
│   └── styles.css
├── ejercicio-14/                  # Ejercicio 14: Variables CSS en :root y switch de modo oscuro
│   ├── index.html
│   └── styles.css
├── ejercicio-15/                  # Ejercicio 15: Diseño responsivo con Media Queries (Mobile-First)
│   ├── index.html
│   └── styles.css
├── ejercicio-16/                  # Ejercicio 16: Animaciones con @keyframes (spinner y fade-in + slide-up)
│   ├── index.html
│   └── styles.css
├── ejercicio-17/                  # Ejercicio 17: Menú responsivo hamburguesa solo CSS (:checked hack)
│   ├── index.html
│   └── styles.css
├── ejercicio-18/                  # Ejercicio 18: Grid avanzado - Galería mosaico masonry con dense
│   ├── index.html
│   └── styles.css
├── ejercicio-19/                  # Ejercicio 19: Formulario multi-step solo CSS con validación visual
│   ├── index.html
│   └── styles.css
└── ejercicio-20/                  # Ejercicio 20: Proyecto integrador - Landing Page completa
    ├── index.html
    └── styles.css
```

---

## 🚀 Resumen de Ejercicios y Decisiones de Diseño

### Bloque 1 — Nivel Básico (Ejercicios 1 a 7)

* **Ejercicio 01 — Estructura HTML básica:**
  * Implementación de documento HTML5 estricto con `<!DOCTYPE html>`, atributos de idioma (`lang="es"`), metadatos de codificación (`<meta charset="UTF-8">`) y viewport.
  * Encabezado jerárquico `<h1>`, párrafo `<p>` y elemento multimedia `<img>` provisto de un atributo `alt` detallado y contextual para garantizar accesibilidad ante lectores de pantalla.

* **Ejercicio 02 — Listas y enlaces:**
  * Lista ordenada `<ol>` de 5 pasos instructivos para la preparación de café en prensa francesa.
  * Lista no ordenada `<ul>` con enlaces externos que abren en nueva pestaña con `target="_blank"` y la directiva de seguridad y privacidad `rel="noopener noreferrer"`.

* **Ejercicio 03 — Tabla de datos:**
  * Estructuración semántica de un horario semanal mediante `<table>`, con título descriptivo `<caption>`, bloque de encabezados `<thead>`, cuerpo de materias `<tbody>` y pie informativo `<tfoot>`.
  * Implementación de celdas combinadas: `rowspan="2"` para una cátedra de bloque doble y `colspan="5"` para el horario de almuerzo/receso universitario y el pie de página. Celdas accesibles con `scope="col"` y `scope="row"`.

* **Ejercicio 04 — Formulario simple:**
  * Formulario de contacto con campos para nombre, correo y mensaje.
  * Accesibilidad reforzada: vinculación unívoca entre cada `<label>` y su control mediante atributos `for` e `id`. Atributo `required` para validación nativa del navegador e `input type="email"` para comprobación de sintaxis.

* **Ejercicio 05 — Primeros estilos CSS:**
  * Vinculación externa de `styles.css` a través de `<link rel="stylesheet">`.
  * Empleo exclusivo de **selectores de tipo/etiqueta** (`body`, `h1`, `p`, `img`) para alterar la tipografía base, color de fondo, paleta tipográfica y dimensiones del `<h1>`.

* **Ejercicio 06 — Selectores CSS:**
  * Código organizado por especificidad CSS demostrando selectores de etiqueta (0-0-1), selectores de clase (0-1-0 como `.card`, `.badge`, `.tag`), selectores de ID (1-0-0 como `#main-banner`, `#featured-card`, `#urgent-status`) y selectores descendientes (como `.card p` y `.alert-box p`).

* **Ejercicio 07 — Modelo de caja (Box Model):**
  * Tres tarjetas de planes dispuestas en fila con márgenes (`margin: 0 15px`), bordes de diferentes grosores (2px, 3px, 4px) y paddings dispares (16px, 28px, 20px 12px).
  * Aplicación explícita de `box-sizing: border-box`, logrando que el padding y los bordes queden contenidos dentro del `width: 320px` sin deformar el ancho visual homogéneo del componente.

---

### Bloque 2 — Nivel Intermedio (Ejercicios 8 a 14)

* **Ejercicio 08 — Flexbox: barra de navegación:**
  * Maquetación de navbar horizontal con logo anclado al margen izquierdo y 4 links de navegación a la derecha.
  * Uso de `display: flex`, distribución perimetral con `justify-content: space-between` y centrado vertical exacto mediante `align-items: center`.

* **Ejercicio 09 — Flexbox: galería de tarjetas:**
  * Galería de catálogo con 6 productos que se acomodan y reorganizan automáticamente al alterar el ancho de ventana.
  * Configuración flexible con `display: flex`, `flex-wrap: wrap`, espaciado fluido con `gap: 1.75rem` y dimensionamiento adaptable mediante `flex-grow: 1`, `flex-shrink: 1` y `flex-basis: 280px`.

* **Ejercicio 10 — CSS Grid: layout de página:**
  * Dashboard administrativo estructurado con CSS Grid y áreas nombradas:
    ```css
    grid-template-areas:
      "header  header"
      "sidebar main"
      "footer  footer";
    ```
  * Distribución de columnas fija-flexible (`240px 1fr`) y filas adaptables (`70px 1fr 60px`), eliminando huecos no deseados y aislando las responsabilidades del header, menú lateral, panel principal y pie.

* **Ejercicio 11 — Pseudo-clases y pseudo-elementos:**
  * Lista de módulos académicos estilizada con pseudo-clases estructurales `:nth-child(odd)` y `:nth-child(even)` para alternar tonalidades sutiles de fondo.
  * Interacción dinámica con `:hover` que desplaza el elemento e intensifica el color.
  * Pseudo-elementos decorativos: `::before` para renderizar viñetas temáticas personalizadas sin ensuciar el marcado HTML, y `::after` para inyectar un indicador de flecha interactivo.

* **Ejercicio 12 — Posicionamiento:**
  * Botón flotante "Volver arriba" anclado en la esquina inferior derecha mediante `position: fixed; bottom: 24px; right: 24px; z-index: 1000;`, manteniéndose visible a lo largo del scroll.
  * Tooltip flotante con `position: absolute; bottom: 125%; left: 50%; z-index: 50;` contenido dentro de un contenedor padre con `position: relative`, activándose suavemente en `:hover`.

* **Ejercicio 13 — Formulario estilizado:**
  * Rediseño estético del formulario con campos de bordes redondeados (`border-radius: 10px`).
  * Estado de interacción accesible `:focus` con realce cromático y anillo exterior translúcido (`box-shadow`), botón de envío con micro-interacciones `:hover` y `:active` (elevación y compresión de clic), coordinadas mediante `transition: all 0.25s ease`.

* **Ejercicio 14 — Variables CSS y temas (Dark Mode):**
  * Definición centralizada de variables (`--color-primario`, `--color-superficie`, `--color-fondo`, `--espaciado-md`, `--radio-borde`, etc.) en `:root`.
  * Aplicación en más de 6 propiedades CSS simultáneas (`color`, `background-color`, `border-color`, `padding`, `margin`, `border-radius`, `box-shadow`).
  * Implementación de cambio de tema claro/oscuro interactivo 100% CSS mediante el truco del checkbox toggle, reasignando dinámicamente los valores de los tokens de color.

---

### Bloque 3 — Nivel Medio/Avanzado (Ejercicios 15 a 20)

* **Ejercicio 15 — Diseño responsivo con Media Queries:**
  * **Justificación de Enfoque Mobile-First:** Se adoptó Mobile-First porque optimiza el rendimiento inicial para la gran mayoría de usuarios móviles, entregando un flujo de lectura vertical natural a una columna sin desbordamiento horizontal (`overflow-x`).
  * **Breakpoints:**
    1. `@media (min-width: 768px)` (Tablet): Se muestra el sidebar (200px) y el grid pasa a 2 columnas.
    2. `@media (min-width: 1024px)` (Desktop): Sidebar expandido a 260px y panel de widgets organizado en 3 columnas independientes.
  * En pantallas menores a 768px el sidebar se oculta con `display: none` y el contenido se expande al ancho completo.

* **Ejercicio 16 — Animaciones con @keyframes:**
  * Implementación de dos tipos de animación:
    1. **Spinner de carga:** animación de rotación continua infinita con `@keyframes spin`, `animation-duration: 0.9s`, `animation-timing-function: linear` y `animation-iteration-count: infinite`.
    2. **Tarjetas en cascada:** animación de entrada `@keyframes fadeInUp` con traslación en eje Y y opacidad, curva `cubic-bezier(0.16, 1, 0.3, 1)`, `animation-fill-mode: forwards` y retardos progresivos (`animation-delay: 0.2s`, `0.45s`, `0.7s`).

* **Ejercicio 17 — Menú responsivo tipo "hamburguesa" (solo CSS):**
  * Menú desplegable interactivo sin recurrir a JavaScript: utiliza un control `input[type="checkbox"]` invisible y un `<label>` accesible con 3 barras.
  * Al hacer clic, el estado `:checked` transforma las barras en una 'X' y despliega el menú con selector general de hermanos (`#menu-toggle:checked ~ .nav-menu`) y transición sobre `max-height` y `opacity`.
  * En pantallas de escritorio (`@media (min-width: 768px)`), el menú se despliega automáticamente en barra horizontal y el botón hamburguesa desaparece.

* **Ejercicio 18 — Grid avanzado: galería tipo mosaico (Masonry-like):**
  * Maquetación de galería fotográfica con `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` y `grid-auto-flow: dense`.
  * Requisito cumplido: elementos destacados con `grid-column: span 2; grid-row: span 2;` y elementos panorámicos (`span 2` en columnas o filas).
  * El algoritmo `dense` rellena de forma armónica los huecos vacíos con las imágenes estándar posteriores, eliminando espacios muertos.

* **Ejercicio 19 — Formulario multi-step con validación visual:**
  * Formulario de registro en dos pasos implementado puramente con HTML/CSS utilizando radio buttons (`#radio-step1` y `#radio-step2`) vinculados a etiquetas de avance y retroceso.
  * Validación nativa con feedback visual instantáneo:
    * `:required:valid` tiñe el borde en color verde y expone el mensaje de verificación.
    * `:required:user-invalid` / `:invalid` tiñe el borde en color rojo y despliega el mensaje de error de formato/longitud mínima.

* **Ejercicio 20 — Proyecto integrador: Landing Page completa (Aura UX Studio):**
  * Landing page moderna de página única con las 6 secciones solicitadas:
    1. **Navbar fija** con efecto translúcido (`backdrop-filter: blur`), logo a la izquierda, enlaces a la derecha, botón CTA y navegación con desplazamiento fluido mediante `scroll-behavior: smooth`.
    2. **Hero section** con imagen de fondo fotográfica de alta resolución, degradado oscuro superpuesto para garantizar contraste WCAG AA+, titular de impacto y botones de acción.
    3. **Sección de servicios** maquetada con **CSS Grid** auto-ajustable (`repeat(auto-fit, minmax(320px, 1fr))`) y efectos de elevación con tarjeta flotante.
    4. **Sección de testimonios** con carrusel horizontal basado en **`scroll-snap` nativo** (`scroll-snap-type: x mandatory` y `scroll-snap-align: center`), permitiendo navegar entre opiniones de clientes sin scripts externos.
    5. **Formulario de contacto** combinando Grid para el bloque informativo y Flexbox para los campos con estados de foco diferenciados.
    6. **Footer semántico** con navegación secundaria, datos institucionales de la cátedra y copyright.
  * **Requisitos técnicos integrados:** CSS Grid + Flexbox combinados, Variables CSS (`:root`), 2 media queries (`max-width: 992px` y `max-width: 768px`), animaciones `@keyframes` (`floatGlow` y `heroPulse`), y código rigurosamente comentado por módulos.

---

## 🛠️ Tecnologías y Criterios de Calidad

* **HTML5 Semántico:** Uso exhaustivo de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<form>`, `<label>`.
* **CSS3 Moderno:** Flexbox (alineación, distribución, flex-wrap), CSS Grid (áreas nombradas, minmax, auto-fill, dense), Custom Properties (Variables CSS), `@keyframes`, transiciones y transformaciones aceleradas por GPU.
* **Accesibilidad (a11y):** Textos alternativos descriptivos en todas las imágenes (`alt`), asociación rigurosa de labels e inputs mediante `for` e `id`, contraste de color legible, indicadores de estado de foco para navegación por teclado y uso de clases para lectores de pantalla (`.sr-only`).
* **Validez W3C:** Código limpio, sin etiquetas obsoletas ni atributos fuera de especificación.
* **Cero JavaScript:** Todos los comportamientos dinámicos (tooltips, toggles de temas, menú hamburguesa, formulario multi-step, carrusel con scroll-snap) fueron logrados aprovechando el poder nativo de CSS3.

---

## 🖥️ Cómo visualizar el trabajo práctico

1. Clona o descarga este repositorio en tu equipo.
2. Abre el archivo [`index.html`](index.html) ubicado en la raíz del proyecto con cualquier navegador moderno (Chrome, Edge, Firefox, Safari).
3. Desde el panel interactivo podrás ingresar y probar directamente cada uno de los 20 ejercicios resueltos.
