# Portfolio Web Personal — Dante Sala (TP Final UX/UI)

Sitio web personal desarrollado como **Trabajo Final Integrador** para la materia **Diseño UX-UI (2026)** de la **Licenciatura en Sistemas de Información**.

* **Alumno:** Dante Sala Pascuccio (GitHub: [@C0rch1to](https://github.com/C0rch1to))
* **Docente Titular:** Mg. Ernesto Ledesma
* **Fecha de Entrega:** 10 de Noviembre de 2026
* **URL Pública Desplegada:** [https://c0rch1to.github.io/UXUI_SalaDante/TP%20Final%20Portfolio%20Web/index.html](https://c0rch1to.github.io/UXUI_SalaDante/TP%20Final%20Portfolio%20Web/index.html)
* **Archivo de Figma (Referencia Visual):** [Product Design Portfolio Template (Community)](https://www.figma.com/design/qgaTIhPDFVgxQe2G2RyyA1/Product-Design-Portfolio-Template--Community-?node-id=1-2&t=t4JZrvfhKkOWWuxT-0)

---

## 🚀 Stack Tecnológico

* **HTML5 Semántico:** Estructura accesible (`header`, `nav`, `main`, `section`, `article`, `footer`, `dialog`) con atributos ARIA y un único encabezado `<h1>`.
* **CSS3 Moderno:**
  * Variables de diseño (`:root` y `[data-theme="light"]`) para soporte nativo de Modo Oscuro y Modo Claro.
  * Layout con **CSS Grid** y **Flexbox** (sin tablas ni floats).
  * Enfoque **Mobile-First** probado rigurosamente en breakpoints de 375px, 768px y 1280px+.
  * Respeto por preferencias de movimiento (`prefers-reduced-motion`).
  * Microinteracciones en CSS: foco visible accesible, elevación de tarjetas y transiciones fluidas.
* **JavaScript Vanilla (ES6+):**
  * Control del Drawer / Menú hamburguesa mobile con accesibilidad completa (`aria-expanded`, bloqueo de scroll de fondo y cierre automático al pulsar enlaces o tecla `Escape`).
  * Modal accesible para el caso de estudio de *Cubrí Seguros* con trampa de foco y retorno de foco al elemento disparador.
  * Selector de tema Dark / Light persistente en `localStorage` con detección inicial de `prefers-color-scheme`.
  * Validación interactiva del formulario de contacto y feedback visual accesible.

---

## 🎨 Fuentes de Inspiración y Declaración de Recursos

Conforme a las pautas de honestidad académica de la consigna:
* **Template de Inspiración:** [Product Design Portfolio Template (Figma Community)](https://www.figma.com/design/qgaTIhPDFVgxQe2G2RyyA1/Product-Design-Portfolio-Template--Community-?node-id=1-2&t=t4JZrvfhKkOWWuxT-0) por Abdulazeez.
* **Modificaciones Sustanciales Realizadas:**
  1. Se expandió el diseño de 4 secciones básicas a la arquitectura canónica de **9 secciones obligatorias** de la cátedra.
  2. Se diseñó un **Design System propio** con paleta ajustada a contrastes WCAG AA (> 4.5:1), eliminando textos con contraste deficiente presentes en el template original.
  3. Se incorporó soporte dual de **Modo Claro (Light Mode)** y **Modo Oscuro (Dark Mode)** con toggle interactivo (Bonus +10).
  4. Se integró un **Caso de Estudio UX modal completo** con desglose metodológico (Problema → Proceso → Solución → Resultados).
  5. Se crearon componentes inexistentes en la referencia: timeline de trayectoria, métricas numéricas destacadas, cuadrícula de habilidades en 4 categorías y formulario de contacto accesible.
  6. Se reemplazaron todos los contenidos ficticios por proyectos reales desarrollados por el alumno (*Cubrí Seguros*, *Coffea*, *Fatto Pizzeria*, *Minimal Snake*).

---

## 📐 Estructura de Información Obligatoria (9 Secciones)

1. **Header / Navegación:** Logo monograma `<DS/>`, enlaces ancla a cada sección, toggle Dark/Light, botón CTA "Hablemos" y menú hamburguesa mobile accesible.
2. **Hero:** Nombre, rol, propuesta de valor en 2 líneas, badges de disponibilidad ("🟢 Disponible") y ubicación ("📍 Buenos Aires, Argentina"), botones primario y secundario.
3. **Métricas / Highlights:** 4 cifras destacadas (+3 Años de Estudio, 5+ Proyectos Desarrollados, 100% Accesibilidad WCAG AA, 15+ Herramientas).
4. **Sobre Mí:** Párrafo de presentación, avatar vectorial y 3 principios de trabajo (Diseño centrado en personas, Simplicidad funcional, Puente diseño-código).
5. **Skills:** 4 categorías (Investigación UX, Diseño UI, Desarrollo Front-end, Flujo de Trabajo) con chips de herramientas.
6. **Proyectos:** 4 proyectos con imagen, año, descripción, tags, enlace a demo/repo y modal de caso de estudio en profundidad para *Cubrí Seguros*.
7. **Experiencia / Formación:** Línea de tiempo ordenada con período, rol, institución y 2 logros específicos por hito.
8. **Contacto:** Bloque destacado con llamado a la acción, email directo, redes sociales y formulario de contacto interactivo.
9. **Footer:** Copyright © 2026 Dante Sala, navegación repetida, enlaces sociales y créditos técnicos.

---

## ♿ Accesibilidad y Métricas de Rendimiento (Lighthouse)

El portfolio cumple con los estándares **WCAG 2.2 nivel AA**:
* **Contraste de Color:** Ratios superiores a 4.5:1 en texto estándar y 3:1 en títulos grandes (verificado en ambos temas).
* **Navegación por Teclado:** Elemento skip-link ("Saltar al contenido principal"), indicador `:focus-visible` de alto contraste en todos los controles interactivos y captura de tecla `Escape` en modales y menú mobile.
* **Semántica y ARIA:** Roles correctos, etiquetas descriptivas en enlaces externos (`target="_blank"` con aviso para lectores de pantalla) e imágenes con textos alternativos significativos.

### Resultados de Auditoría Lighthouse (Mobile):
* **Performance:** 98 / 100
* **Accessibility:** 100 / 100
* **Best Practices:** 100 / 100
* **SEO:** 100 / 100

---

## 📦 Instrucciones para Ejecución Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/C0rch1to/UXUI_SalaDante.git
   cd UXUI_SalaDante
   ```
2. Abrir el archivo `TP Final Portfolio Web/index.html` en cualquier navegador moderno (Chrome, Edge, Firefox, Safari) o utilizar la extensión *Live Server* en VS Code.

---

## 📄 Documentación Adicional del Proceso UX

* **Informe Completo de Proceso UX:** [PROCESO_UX.md](./PROCESO_UX.md) (Proto-persona, Benchmark, Moodboard, Card Sorting, Design System y Test de Usabilidad con 3 usuarios).
* **Presentación en Slides (10 láminas):** [SLIDES_PROCESO_UX.md](./SLIDES_PROCESO_UX.md).
