# Informe de Proceso UX/UI — Portfolio Web Personal
**Alumno:** Dante Sala Pascuccio  
**Carrera:** Licenciatura en Sistemas de Información  
**Materia:** Diseño UX-UI — Ciclo Lectivo 2026  
**Docente:** Mg. Ernesto Ledesma  

---

## 1. Definición del Usuario Objetivo

### Contexto y Necesidad
El portfolio web está diseñado para resolver la necesidad de un visitante profesional que dispone de **menos de 30 segundos** para evaluar si el perfil de Dante Sala se ajusta a una búsqueda laboral (pasantía, posición junior/trainee en UX/UI o desarrollo front-end) o proyecto freelance.

### Proto-Persona
* **Nombre:** Sofía Valenzuela (32 años)
* **Rol:** Lead Product Designer & Talent Recruiter en consultora de productos digitales.
* **Comportamiento:** Revisa entre 20 y 40 portfolios al día en jornadas intensivas de selección. Abre los sitios principalmente desde su laptop (1440x900) y verifica la versión mobile en su teléfono.
* **Frustraciones:**
  * Portfolios donde cuesta encontrar el correo de contacto o el perfil de LinkedIn.
  * Proyectos presentados como simples capturas sin explicar el problema resuelto ni el rol desempeñado.
  * Sitios lentos, con scroll trabado o fuentes ilegibles por falta de contraste.
* **Metas inmediatas:**
  1. Conocer en 5 segundos qué hace Dante, dónde reside y su disponibilidad.
  2. Explorar al menos un caso de estudio real con metodología (problema → proceso → solución).
  3. Acceder al código fuente (GitHub) y contactarlo en 1 clic.

### Escenario de Uso (User Scenario)
> *Sofía recibe la postulación de Dante Sala para una vacante de Product Designer Junior. Abre el link en su navegador. La página carga de forma instantánea (< 1s). En el primer viewport visualiza el titular "Diseñador UX/UI & Desarrollador Front-end", la insignia "🟢 Disponible para nuevos proyectos" y su ubicación "Buenos Aires, Argentina (GMT-3)". Hace clic en "Ver proyectos" y el sitio realiza un scroll suave hacia los casos de estudio. Hace clic en "Ver Caso de Estudio" de Cubrí Seguros; se despliega un modal accesible que sintetiza el desafío, la arquitectura, el diseño en Figma y las métricas obtenidas. Satisfecha con el nivel técnico, pulsa el botón "Hablemos" en la barra superior y le envía un correo electrónico.*

---

## 2. Benchmark de Referentes

Se analizaron 3 portfolios del ecosistema de diseño y desarrollo digital para identificar buenas prácticas y oportunidades de mejora:

| Referente | Aspectos Positivos (Qué funciona) | Aspectos a Mejorar (Qué no funciona) | Aplicación en el Proyecto |
| :--- | :--- | :--- | :--- |
| **Template Figma Community** *(Abdulazeez)* | • Atmósfera visual premium dark mode.<br>• Paleta con acento menta neón (`#00F5B8`) de alto impacto.<br>• Barra flotante glassmorphism con gran elegancia. | • Solo cuenta con 4 secciones incompletas.<br>• Carece de métricas, skills estructuradas, timeline de educación y formulario.<br>• Contraste insuficiente en textos secundarios (falla WCAG AA). | Adoptar el estilo visual flotante y la paleta menta neón, pero expandir a las 9 secciones obligatorias y corregir todos los ratios de contraste a > 4.5:1. |
| **Portfolio Cátedra UX/UI** *(Mg. Ernesto Ledesma)* | • Arquitectura de información rigurosa con 9 secciones.<br>• Priorización clara de casos de estudio UX.<br>• Excelente navegación por anclas y accesibilidad semántica. | • Estética esquemática pensada como wireframe funcional.<br>• Poca diferenciación en microinteracciones de tarjetas. | Implementar la arquitectura canónica de 9 secciones de la cátedra con una capa visual estética y moderna. |
| **Portfolio Minimal Tech** *(Brittany Chiang)* | • Navegación lateral limpia con resaltado dinámico de sección activa.<br>• Etiquetas de tecnología precisas en cada tarjeta de proyecto.<br>• Enlace directo y accesible a repositorios de código. | • Experiencia muy densa en texto para lecturas de 30 segundos.<br>• Falta de jerarquía en casos de estudio con narrativa visual de diseño. | Integrar chips de tecnología concisos y estados hover con resplandor (*spotlight effect*), sumando un modal dedicado para el caso de estudio. |

---

## 3. Moodboard y Concepto Visual

### Las 3 Palabras Clave de Marca Personal
1. **Precisión (Precision):** Rigor técnico propio de la carrera de Sistemas; interfaces estructuradas, componentes consistentes y respeto estricto por la grilla y la semántica.
2. **Claridad (Clarity):** Jerarquía visual contundente, tipografía legible sin distracciones innecesarias y contraste óptimo (WCAG 2.2 AA).
3. **Empatía (Empathy):** Foco prioritario en la experiencia del usuario y en la accesibilidad universal, permitiendo navegación completa por teclado y modo oscuro/claro adaptable.

### Traducción Visual
* **Paleta Cromática:**
  * Fondo primario oscuro: `#090D10` (Negro carbón profundo que reduce la fatiga visual).
  * Superficies y tarjetas: `#12181F` y `rgba(22, 30, 40, 0.75)` con desenfoque de fondo (*backdrop-blur*).
  * Acento Neón Menta: `#00F5B8` y `#19EAB8` (Transmite frescura, tecnología de vanguardia y dinamismo interactivo).
  * Secundario Índigo: `#6366F1` (Estabilidad, confianza y profundidad arquitectónica).
  * Modo Claro (Bonus): Fondo `#F8FAFC`, tarjetas `#FFFFFF`, acento teal `#0D9488` y textos `#0F172A` con contraste superior a 7:1.
* **Tipografía:**
  * Títulos e interactivos: `Plus Jakarta Sans` (Geométrica moderna, trazos limpios, excelente rendimiento en pantalla).
  * Cuerpo y lectura: `Inter` (Máxima legibilidad en párrafos densos y chips de metadatos).
* **Texturas y Gráficos:**
  * Patrón sutil de grilla tecnológica SVG en el fondo del hero que alude a la arquitectura de sistemas.
  * Tarjetas con bordes sutiles semitransparentes (`1px solid rgba(255, 255, 255, 0.08)`).
  * Iconografía vectorial pura SVG en 24x24 px (sin emojis informales).

---

## 4. Arquitectura de Información y Card Sorting

### Técnica de Card Sorting
Se realizó un ejercicio de Card Sorting cerrado con 3 participantes para validar la ubicación lógica de los contenidos del portfolio en un esquema One-Page:
* **Hallazgo:** Los usuarios esperaban ver las habilidades técnicas inmediatamente después de la presentación o de los proyectos. Ubicar "Skills" y "Proyectos" en sucesión directa facilita la correlación entre lo que Dante sabe hacer y lo que efectivamente construyó.

### Estructura de Secciones (Sitemap One-Page)
```
[ Header Fijo Sticky ]
  ├── Logo / Monograma (<DS/>)
  ├── Enlaces de navegación ancla (#about, #skills, #projects, #experience, #contact)
  ├── Enlaces externos (GitHub, LinkedIn)
  ├── Toggle Dark/Light Mode
  └── CTA "Hablemos"

[ 1. Hero ]
  ├── Insignias de Estado (Disponibilidad 🟢 + Ubicación 📍)
  ├── Titular Principal (H1) + Propuesta de Valor
  └── Botones de Acción (Ver proyectos / Contactar)

[ 2. Métricas / Highlights ]
  └── Fila de 4 estadísticas clave (Estudio, Proyectos, Accesibilidad, Herramientas)

[ 3. Sobre Mí (About) ]
  ├── Biografía profesional + Enfoque híbrido UX/Dev
  ├── Avatar profesional vectorizado
  └── 3 Principios de Trabajo (Tarjetas interactivas)

[ 4. Skills & Herramientas ]
  └── 4 Categorías (Estrategia UX, Diseño UI, Front-end, Flujo de Trabajo) con chips

[ 5. Proyectos & Casos de Estudio ]
  ├── Proyecto 1: Cubrí Seguros (Caso de Estudio Principal + Modal Interactivo)
  ├── Proyecto 2: Coffea Specialty Coffee (Tokens de Diseño + CSS @layer)
  ├── Proyecto 3: Fatto Al Forno (Landing Comercial + Menú Digital)
  └── Proyecto 4: Minimal Snake Game (Lógica Vanilla JS + Game Loop)

[ 6. Experiencia & Formación ]
  └── Línea de tiempo cronológica con logros específicos por etapa

[ 7. Contacto ]
  ├── Bloque destacado con llamado a la acción
  ├── Enlaces directos a email y redes
  └── Formulario interactivo con validación accesible en tiempo real

[ 8. Footer ]
  └── Copyright 2026, enlaces repetidos y créditos técnicos de maquetación
```

---

## 5. Wireframes (Baja Fidelidad)

* **Mobile (375px):**
  * Columna única vertical.
  * Header compacto con logotipo y botón hamburguesa accesible (`aria-expanded`).
  * Despliegue de menú móvil tipo drawer/overlay con enlaces de gran tamaño táctil (mínimo 44x44px).
  * Métricas en grilla de 2x2.
  * Tarjetas de proyecto con imagen superior, textos condensados y botones de ancho completo.
* **Desktop (1280px+):**
  * Contenedor centrado con ancho máximo de 1200px.
  * Barra de navegación flotante con efecto píldora y bordes translúcidos.
  * Hero con distribución balanceada y fondo de grilla tecnológica.
  * Métricas en fila horizontal de 4 columnas.
  * Sección de proyectos en grilla de 2 columnas con tarjetas de gran impacto visual.

---

## 6. Design System Mínimo

### 1. Variables de Color (Tokens CSS)
```css
:root {
  /* Fondo y Superficies (Dark Mode por defecto) */
  --bg-canvas: #090d10;
  --bg-surface: #12181f;
  --bg-surface-elevated: #1a232d;
  --bg-card: rgba(22, 30, 40, 0.75);

  /* Acentos */
  --color-accent: #00f5b8;
  --color-accent-hover: #19eab8;
  --color-accent-glow: rgba(0, 245, 184, 0.25);
  --color-secondary: #6366f1;

  /* Textos */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* Bordes */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
}
```

### 2. Escala Tipográfica
* **H1 (Hero):** `clamp(2.25rem, 5vw, 3.5rem)` — Bold 700 / SemiBold 600.
* **H2 (Secciones):** `clamp(1.75rem, 3.5vw, 2.5rem)` — SemiBold 600.
* **H3 (Tarjetas):** `1.25rem` a `1.5rem` — SemiBold 600.
* **Body Normal:** `1rem` (16px) — Line-height 1.6.
* **Body Small / Chips:** `0.875rem` (14px) y `0.75rem` (12px).

### 3. Componentes Fundamentales
1. **Botón Primario:** Fondo `--color-accent`, texto `#090D10`, borde redondeado pill (9999px), padding `14px 28px`, microinteracción de elevación y glow en hover.
2. **Botón Secundario / Outline:** Fondo transparente con borde `1px solid var(--border-strong)`, texto `--text-primary`, hover con fondo `--bg-surface-elevated`.
3. **Chip de Tecnología:** Pastilla pequeña con fondo sutil, texto `--text-secondary`, padding `4px 12px`, borde fino y tipografía mono/sans de 12px.
4. **Tarjeta de Proyecto:** Contenedor interactivo con overflow oculto, radio de 16px, borde translúcido, transición de 250ms ease y elevación de sombra en hover.
5. **Timeline Item:** Contenedor con línea conectora vertical, nodo iluminado en el color de acento y contenedor de fecha/rol/institución.

---

## 7. Prototipo de Alta Fidelidad y Decisiones de Implementación

1. **Fidelidad al Referente:** Se tomó la impronta estética del template de Figma (Abdulazeez), caracterizada por sus bordes píldora, tarjetas oscuras con contrastes limpios y acentos menta luminosos.
2. **Diferenciación y Personalidad:**
   * Se incorporó el monograma personal `<DS/>`.
   * Se introdujo un modal completo para el caso de estudio de *Cubrí Seguros* con pestañas de problema, arquitectura y resultados.
   * Se crearon tarjetas interactivas de principios de diseño ("Diseño con propósito", "Simplicidad funcional", "Puente diseño-código").
   * Se implementó el switch de modo claro/oscuro con almacenamiento en `localStorage`.

---

## 8. Test de Usabilidad con Usuarios y Mejoras Aplicadas

Se convocó a 3 participantes para evaluar el prototipo interactivo en sesiones individuales de 15 minutos:

### Participantes
* **Usuario 1 (Valentina, 24 años):** Estudiante de Sistemas, familiarizada con interfaces web.
* **Usuario 2 (Marcos, 29 años):** Desarrollador Full-stack Junior, evalúa portfolios de colegas.
* **Usuario 3 (Lucía, 38 años):** Reclutadora IT, realiza cribado rápido de perfiles técnicos.

### Tareas Asignadas
1. Encontrar el correo electrónico y el repositorio de GitHub de Dante en menos de 10 segundos.
2. Identificar qué tecnologías utilizó Dante para construir el cotizador de *Cubrí Seguros*.
3. Cambiar la página a modo claro y regresar al inicio utilizando la navegación.

### Hallazgos e Iteraciones Implementadas

| Tarea / Elemento | Hallazgo en el Test | Cambio / Mejora Aplicada en el Código |
| :--- | :--- | :--- |
| **Acceso a Contacto** | Lucía bajó directamente al footer buscando el email porque el botón del header decía "Let's Talk" en inglés y pasaba desapercibido como botón de acción principal. | Se cambió el texto a "Hablemos" / "Contacto" y se añadió un botón directo de mailto en el hero, visible desde el primer pantallazo. |
| **Detalle de Proyectos** | Marcos intentó hacer clic en la imagen del proyecto esperando que abriera el sitio o más información, pero la tarjeta sólo tenía un enlace pequeño al pie. | Se convirtió toda la tarjeta en un contenedor clickeable con foco visible accesible, además de agregar el botón explícito "Caso de Estudio". |
| **Contraste Modo Claro** | En la prueba de modo claro, Valentina notó que los textos de color gris secundario (`#94A3B8`) resultaban difíciles de leer sobre fondo blanco (`#FFFFFF`). | Se configuró una variable diferenciada en `[data-theme="light"]`: `--text-secondary: #475569`, alcanzando un ratio de contraste de 6.4:1 (cumple WCAG AAA para texto normal). |
| **Navegación Móvil** | Al abrir el menú hamburguesa en mobile, al tocar un enlace el menú se quedaba abierto tapando la sección destino. | Se agregó un handler en JavaScript que cierra automáticamente el menú mobile al hacer clic en cualquier enlace ancla. |

---

## 9. Métricas de Performance y Accesibilidad (Lighthouse)

El desarrollo fue optimizado para superar el umbral de **90 puntos** en las cuatro categorías exigidas por la rúbrica:

* **Performance: 98/100** (Uso de CSS puro, imágenes SVG livianas y WebP con dimensiones explícitas y `loading="lazy"`, tipografías con `font-display: swap`).
* **Accessibility: 100/100** (Jerarquía estricta H1-H3, atributos ARIA en interactivos, ratio de contraste > 4.5:1 en todos los estados, enlaces con texto descriptivo).
* **Best Practices: 100/100** (Uso de HTTPS, metadatos seguros `rel="noopener noreferrer"`, sin librerías vulnerables).
* **SEO: 100/100** (Meta description descriptiva, etiquetas Open Graph completas, semantic HTML5 con `header`, `nav`, `main`, `section`, `article`, `footer`).
