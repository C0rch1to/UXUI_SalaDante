# Coffea — Landing Page (HTML5 + CSS3)

Landing page estática y responsiva para la cafetería **Coffea**, desarrollada en el marco de la cátedra **Diseño UX-UI (2026)** de la **Licenciatura en Sistemas de Información**.

Replicación fiel del diseño de Figma Community (*Coffea — Free Responsive Coffee Shop Website Template*), adaptada en **español rioplatense** y con precios en **Pesos Argentinos (ARS)**. Implementada exclusivamente con **HTML5 semántico** y **CSS3 moderno**, sin JavaScript, sin preprocesadores ni dependencias de compilación.

---

## 1. Stack Tecnológico

- **HTML5 Semántico:** Landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), `<article>`, `<figure>`, `<blockquote>`, `<figcaption>`, `<data>`, `<picture>`, formularios accesibles con validación nativa.
- **CSS3 Moderno:**
  - Control de cascada mediante `@layer tokens, base, layout, components, utilities;`.
  - Design Tokens centralizados en variables CSS (`--color-*`, `--font-*`, `--fs-*`, `--radius-*`, `--space-*`).
  - Maquetación adaptable con **CSS Flexbox** y **CSS Grid**.
  - Tipografía fluida con funciones `clamp()` y unidades relativas (`rem`).
  - Carruseles nativos con `scroll-snap-type: x mandatory` y `scroll-snap-align: start`, adaptados para pantallas delgadas.
  - Interacciones 100% CSS (menú hamburguesa con `<details>/<summary>`, favoritos con `<input type="checkbox">` y selector `:checked`, validación nativa con `:user-invalid`, botón flotante *Volver arriba* con scroll-driven animation).
  - Accesibilidad visual `:focus-visible` y soporte para `prefers-reduced-motion`.
- **0% JavaScript:** Totalmente desacoplado de scripts en el cliente para máxima velocidad, accesibilidad y ligereza.

---

## 2. Arquitectura de Archivos

```
TP4_UXUI_Sala/
├── index.html                   # Documento principal con las 9 secciones semánticas
├── 404.html                     # Página de error para Netlify con mismo header y footer
├── netlify.toml                 # Configuración de despliegue, seguridad y caché inmutable
├── README.md                    # Documentación del proyecto
├── css/
│   ├── main.css                 # @import de las capas en orden (@layer)
│   ├── tokens.css               # Design tokens (colores, fuentes, escalas, radios, espacios)
│   ├── base.css                 # Reset moderno, botón flotante back-to-top, :focus-visible
│   ├── layout.css               # .container responsivo y franjas temáticas
│   ├── components/
│   │   ├── header.css           # Header posicionado absoluto, logo, nav y menú móvil CSS
│   │   ├── hero.css             # Hero desktop 1000px, background espresso y texto
│   │   ├── categories.css       # Franja de categorías (845px desktop, grid 2x2 mobile)
│   │   ├── product-card.css     # Tarjeta de producto BEM fluida para pantallas delgadas
│   │   ├── carousel.css         # Carrusel con scroll-snap y soporte touch swipe
│   │   ├── promo.css            # Banner CTA de granos con fotos laterales decorativas
│   │   ├── testimonial-card.css # Testimonios (card central destacada, rating accesible)
│   │   ├── newsletter.css       # Formulario con validación :user-invalid y granos espejados
│   │   └── footer.css           # Footer horizontal optimizado y redes sociales
│   └── utilities.css            # Clases accesibles (.visually-hidden, .sr-only)
└── assets/
    ├── img/                     # Imágenes en WebP de alta fidelidad y fallbacks JPG/PNG (1x y 2x)
    └── icons/                   # 15 íconos SVG vectoriales limpios y optimizados
```

---

## 3. Inventario de Secciones

| # | Sección | Elemento HTML | Alto Figma | Fondo | Comportamiento Clave |
|---|---|---|---|---|---|
| 1 | **Header / Navegación** | `<header> + <nav>` | Superpuesto | Transparente | Posicionado a 55px superior sobre el hero; menú hamburguesa accesible CSS en móvil |
| 2 | **Hero** | `<section class="hero">` | 1000 px | Foto espresso + overlay | Único `<h1>`, bloque de texto a 238px de izq., botón "Pedí ahora" blanco |
| 3 | **Categorías** | `<section class="categories">` | 220 px | `--color-sand` | 4 categorías (Café Caliente, Café Frío, Café al Paso, Pastelería), íconos de 82px |
| 4 | **Nuestro Café Especial** | `<section class="products">` | ≈ 740 px | `--color-bg` | Carrusel expandido a 7 cafés (Lungo, Espresso, Cappuccino, Mocha Latte, Flat White, Caramel Macchiato, Cold Brew), scroll-snap nativo con navegación por anclas `#coffee-5`, precios en ARS |
| 5 | **Nuestros Postres Especiales**| `<section class="products">` | ≈ 740 px | `--color-bg` | Carrusel expandido a 7 postres gourmet reales (Torta de Chocolate, Tiramisú, Medialuna, Cheesecake Frutos Rojos, Muffin de Arándanos, Alfajor de Almendras, Lemon Pie) |
| 6 | **CTA Granos de Café** | `<section class="promo">` | 335 px | `--color-sand` | Mano con granos (izq.) y granos dispersos (der.); botón pill con doble chevron |
| 7 | **Testimonios** | `<section class="testimonials">` | ≈ 470 px | `--color-bg` | Subtítulo "Vení y sumate", 3 cards semánticas (central destacada 441×235px), rating accesible |
| 8 | **Newsletter** | `<section class="newsletter">` | 320 px | `--color-sand` | Granos laterales (derecho con `scaleX(-1)`), input pill y botón "Suscribirme" |
| 9 | **Footer** | `<footer class="footer">` | Compacto | `--color-espresso` | Logo "Coffea", diseño horizontal balanceado y redes sociales (touch target ≥ 44×44px) |

---

## 4. Mejoras Implementadas

1. **Limpieza Absoluta de la Imagen del Hero:**
   - La imagen de fondo (`hero.webp` / `hero.jpg`) fue recortada con precisión a partir del archivo 2x de Figma preservando la calidad fotográfica original y erradicando todo texto pre-impreso del template (*home, coffee, bakery, etc.*) sin estirar ni deformar la imagen.
2. **Localización a Español Rioplatense y Moneda Argentina:**
   - Todo el copy fue adaptado al tono rioplatense (*"Pedí ahora"*, *"Mirá nuestros mejores granos"*, *"Sumate y llevate"*, *"Vení y sumate"*).
   - Precios adaptados a Pesos Argentinos mediante etiquetas semánticas `<data value="...">$ 4.500</data>`.
3. **Navegación Total del Carrusel (7 Cards) y Flechas Persistentes en Mobile:**
   - Se implementó un sistema de navegación multi-paso 100% CSS mediante el selector `:has()` y `:target`, permitiendo recorrer secuencialmente las 7 tarjetas hacia adelante y hacia atrás (1 ↔ 2 ↔ 3 ↔ 4 ↔ 5 ↔ 6 ↔ 7 con retorno cíclico) tanto en cafés como en postres.
   - Las flechas ahora son **persistentes en todos los anchos de pantalla**, adaptándose a 44 px en móviles (cumpliendo con el estándar de touch target accesible WCAG) y flotando a los laterales para no desaparecer nunca en pantallas estrechas.
   - Se incorporaron barras de paginación directa por puntos (`.carousel__pagination`), permitiendo saltar a cualquier tarjeta con un toque y visualizando el ítem activo en tiempo real.
4. **Soporte de Pantallas Delgadas para Carruseles:**
   - Tarjetas de producto adaptables con `width: clamp(260px, 80vw, 320px)` y `aspect-ratio` nativo en imágenes.
   - Desplazamiento táctil y swipe nativo fluido en teléfonos de 360 px en adelante.
   - Control de márgenes de anclaje con `scroll-margin-top: 130px` y `scroll-margin-inline-start: 16px`, evitando saltos bruscos verticales sobre los títulos de sección.
5. **Imágenes Gourmet para la Sección de Postres:**
   - Sustitución de fotos duplicadas por fotografías de repostería artesanal de alta calidad (Torta de chocolate, Tiramisú italiano, Medialuna de manteca, Cheesecake de frutos del bosque, Muffin de arándanos, Alfajor de almendras, Lemon pie).
6. **Footer Horizontal y Compacto:**
   - Reducción del desarrollo vertical y distribución horizontal de columnas para una lectura mucho más ligera.
7. **Botón Flotante "Volver Arriba" (100% CSS):**
   - Botón accesible flotante con animación guiada por scroll (`animation-timeline: scroll()`), que aparece automáticamente al scrollear hacia abajo y permite volver al inicio suavemente.
8. **Optimización de Carga y Rendimiento (≤ 1.5 MB):**
   - Carga total de primera visita (HTML + CSS + imágenes 1x) optimizada a 1.25 MB, cumpliendo holgadamente el umbral estricto del PRD.

---

## 5. Cómo Levantar el Proyecto en Local

```bash
# Servidor local con Python:
python -m http.server 8000
```
Abrir en el navegador: [http://localhost:8000](http://localhost:8000)
