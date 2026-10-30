# Cubrí Seguros — Flujo de Contratación Digital (HTML5 + Tailwind CSS v4 + Basecoat UI + JavaScript Vanilla)

Checkout digital de contratación de seguros desarrollado en el marco de la cátedra **Diseño UX-UI (2026)** de la **Licenciatura en Sistemas de Información**.

Replicación fiel del diseño de Figma (**Cubrí Seguros**), adaptable tanto para resoluciones móviles (**Mobile · 390**) como para pantallas de escritorio (**Desktop · 1440**), construido con **HTML5 semántico**, **Tailwind CSS v4**, el sistema de componentes **Basecoat UI** (estética *shadcn/ui* sin frameworks) y **JavaScript vanilla** estructurado con arquitectura modular y estado global centralizado.

---

## 1. Stack Tecnológico y Configuración

- **HTML5 Semántico:** Arquitectura SPA de una sola página (`index.html`) con `<header>`, `<main>`, `<section data-paso="...">`, `<aside>`, `<form>`, `<label for="...">`, radio groups accesibles y controles interactivos conformes a los estándares WCAG.
- **Tailwind CSS v4:** Utilidades de layout, flexbox, CSS grid avanzado (`grid lg:grid-cols-[1fr_380px]`), espaciados y diseño *mobile first* reactivo con breakpoints `sm:` y `lg:`.
- **Basecoat UI:** Sistema de diseño CSS moderno con estética *shadcn/ui* sin dependencias de React:
  - `.btn` (primario, `data-variant="outline"`, `data-variant="ghost"`, `:disabled`).
  - `.field` (`data-invalid`, `aria-invalid="true"`, `role="alert"` y `aria-describedby`).
  - `.card`, `.badge`, `.alert` (`data-variant="warning"`, `data-variant="destructive"`).
- **JavaScript Vanilla (ES Modules):**
  - Cero dependencias externas o librerías de terceros (sin React, Vue, jQuery ni librerías de validación).
  - Manejo de flujo y renderizado guiado por un único objeto de estado global (`solicitud`).
  - Módulos desacoplados en `js/` según responsabilidades bien definidas.
  - Formateo monetario internacionalizado con `Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" })`.

---

## 2. Arquitectura del Proyecto

```
TP5_UXUI_Sala/
├── index.html                   # Documento principal con las 7 pantallas del flujo
├── README.md                    # Documentación técnica, decisiones y criterios de aceptación
├── css/
│   └── tokens.css               # Design Tokens, variables CSS de Basecoat UI, cinta de peligro y tema
├── data/
│   └── planes.json              # Datos oficiales de los planes (tasas anuales y coberturas)
├── js/
│   ├── app.js                   # Orquestación, eventos del DOM, máscaras y ciclo de vida
│   ├── estado.js                # Objeto global solicitud, persistencia y mutadores
│   ├── render.js                # Renderizado reactivo de pasos, stepper y resúmenes
│   ├── validaciones.js          # Funciones puras de validación de campos y formularios
│   ├── cotizador.js             # Lógica matemática de cálculo de cuotas y formateo ARS
│   └── pago.js                  # Simulación de pago con Promesa (1.5s) y generación de pólizas
└── Referencias/
    ├── TP5_Contratacion_Digital_Seguros.pdf
    └── assets/                  # Capturas oficiales y esquemas de diseño (Mobile y Desktop)
```

---

## 3. Del Figma a Basecoat UI: Tabla de Mapeo de Componentes

| Elemento en Figma | Implementación Basecoat / HTML | Notas de Implementación |
|---|---|---|
| **Button Primary** | `<button class="btn">` | Botón interactivo primario (`#4F46E5`). |
| **Button Secondary** | `<button class="btn" data-variant="outline">` | Botón "Volver" y "Cambiar medio de pago". |
| **Button Ghost** | `<button class="btn" data-variant="ghost">` | Botón "Volver al inicio" tras confirmar. |
| **Button Disabled** | `<button class="btn" disabled>` | Se habilita/deshabilita dinámicamente según validación. |
| **Input + Label + Ayuda** | `<div role="group" class="field">` | `<label>`, `<input>` y `<p class="help">`. |
| **Input con Error** | `.field[data-invalid]` + `aria-invalid="true"` | Mensaje con `role="alert"` y `aria-describedby`. |
| **Select (Marca)** | `<select>` nativo dentro de `.field` | Opciones: Samsung, Apple, Motorola, Xiaomi. |
| **Chips de Antigüedad** | `<input type="radio" class="sr-only">` + `<label>` | Opciones: Menos de 1 año, 1 a 2 años, +2 años. |
| **Cards de Plan** | `<label class="card">` con radio input | 3 planes interactivos con visualización de coberturas. |
| **Badge "Recomendado"** | `<span class="badge">Recomendado</span>` | Píldora destacada en Plan Plus. |
| **Resumen** | `<aside id="resumen-lateral" class="card">` | Card lateral en desktop y barra/card en mobile. |
| **Aviso de Simulación** | `<div class="alert" data-variant="warning">` | Aviso de datos de prueba para tarjetas. |
| **Checkbox Términos** | `<input type="checkbox">` en `.field` | Validación obligatoria para continuar al pago. |
| **Stepper** | Componente Tailwind a medida (`.componente-stepper`) | 3 estados: Completo (verde check), Activo (índigo), Pendiente (gris). |

---

## 4. Flujo de Navegación y Pantallas

El flujo está compuesto por **7 pantallas** que se activan alternando el atributo `hidden` según el paso registrado en el estado:

1. **01 · Inicio / Catálogo (`paso: 0`):** Presentación del producto, hero con beneficios clave y grilla 2×2 de seguros (Celular activo, Hogar, Bicicleta y Viaje con indicador "Próximamente").
2. **02 · Cotizar (`paso: 1`):** Selección de marca, modelo, valor del equipo asegurado (entre $100.000 y $2.500.000) y chip de antigüedad.
3. **03 · Elegir plan (`paso: 2`):** Tarjetas comparables de los planes **Básico**, **Plus** (recomendado preseleccionado) y **Premium**, con cuota recalculada al instante y lista de coberturas incluidas/excluidas.
4. **04 · Datos personales (`paso: 3`):** Carga y validación de nombre, apellido, DNI, fecha de nacimiento (+18 años), email, celular y aceptación de términos.
5. **05 · Pago (`paso: 4`):** Resumen consolidado del titular y equipo, selección de tarjeta de crédito/débito, máscaras de tarjeta, vencimiento y CVV. Al presionar "Pagar y contratar", se simula la transacción con estado de carga ("Procesando...") durante 1,5 segundos.
6. **06 · Confirmación / Éxito (`paso: 5`):** Póliza emitida en formato `POL-AAAA-NNNNNN`, resumen de vigencia y cuota mensual, con botones para descargar el comprobante oficial o reiniciar la contratación.
7. **07 · Error de pago (`paso: 6`):** Notificación amigable de rechazo cuando se ingresa la tarjeta de prueba `4000 0000 0000 0002`. Permite reintentar o cambiar de medio conservando la totalidad de los datos cargados.

---

## 5. Reglas de Negocio y Casos de Prueba Verificados

La cuota mensual se computa mediante la fórmula canónica requerida:
$$\text{cuota} = \text{Math.round}\left(\frac{\text{valor} \times \text{tasaAnual}}{12} \times \text{factorAntiguedad}\right)$$

### Tasas y Factores
- **Planes:** Básico (4% / `0.04`), Plus (6% / `0.06`), Premium (9% / `0.09`).
- **Antigüedad:** Menos de 1 año (`1.00`), 1 a 2 años (`1.10`), Más de 2 años (`1.25`).

### Verificación de Casos de Prueba Oficiales
| Caso de Prueba | Valor | Antigüedad | Básico (Esperado / Obtenido) | Plus (Esperado / Obtenido) | Premium (Esperado / Obtenido) | Estado |
|---|---|---|---|---|---|:---:|
| **Caso 1** | $ 600.000 | Menos de 1 año | $ 2.000 / **$ 2.000** | $ 3.000 / **$ 3.000** | $ 4.500 / **$ 4.500** | ✅ OK |
| **Caso 2** | $ 600.000 | 1 a 2 años | $ 2.200 / **$ 2.200** | $ 3.300 / **$ 3.300** | $ 4.950 / **$ 4.950** | ✅ OK |
| **Caso 3** | $ 1.200.000 | Más de 2 años | $ 5.000 / **$ 5.000** | $ 7.500 / **$ 7.500** | $ 11.250 / **$ 11.250** | ✅ OK |

---

## 6. Validaciones Implementadas

Todas las validaciones están programadas como funciones puras en `js/validaciones.js` y responden a los criterios estrictos de la cátedra:

| Campo | Regla | Mensaje de Error en Pantalla |
|---|---|---|
| **Marca** | Obligatorio | `Elegí una marca` |
| **Modelo** | De 2 a 40 caracteres | `Ingresá el modelo del equipo` |
| **Valor** | Número entre $100.000 y $2.500.000 | `El valor debe estar entre $100.000 y $2.500.000` |
| **Antigüedad** | Opción única obligatoria | `Indicá la antigüedad` |
| **Nombre / Apellido** | Mínimo 2 letras | `Ingresá tu nombre` / `Ingresá tu apellido` |
| **DNI** | Formato `/^\d{7,8}$/` (7 u 8 dígitos) | `El DNI debe tener 7 u 8 números` |
| **Fecha de nacimiento** | Mayor de edad ($\ge 18$ años) | `Tenés que ser mayor de edad` |
| **Email** | Expresión regular RFC conforme | `Ingresá un email válido` |
| **Celular** | 10 dígitos sin 0 ni 15 | `Ej.: 11 5555-1234` |
| **Términos** | Checkbox aceptado | `Tenés que aceptar los términos` |
| **Tarjeta** | 16 dígitos numéricos | `Número de tarjeta inválido` |
| **Vencimiento** | Formato MM/AA y fecha futura | `Vencimiento inválido` |
| **CVV** | 3 dígitos | `CVV inválido` |
| **Titular** | Obligatorio (no vacío) | `Ingresá el nombre del titular` |

> [!NOTE]
> Las validaciones se ejecutan en el evento `blur` (al salir del campo) para no molestar la digitación inicial del usuario. Si un campo ya tiene error visual, se revalida dinámicamente en el evento `input` para retirar la alerta apenas se corrige.

---

## 7. Funcionalidades Bonus Implementadas (+10 Puntos)

1. **Persistencia del Estado (`localStorage`):** El estado de la solicitud se guarda automáticamente ante cada cambio, permitiendo recargar la página (F5) o volver más tarde sin perder el progreso. Se limpia automáticamente al reiniciar o confirmar.
2. **Edición Directa desde el Resumen:** Links de *"Editar"* en la card lateral de resumen (Equipo, Plan y Titular) que redirigen al paso correspondiente y permiten regresar al pago fluidamente.
3. **Modo Oscuro Integrado:** Selector accesible de modo claro/oscuro en el header que conmuta los tokens CSS (`data-theme="dark"`) preservando la legibilidad y contraste.
4. **Sistema de Notificaciones Toast:** Feedback no intrusivo al alternar métodos de pago, recargar estados o procesar la póliza.
5. **Máscaras de Entrada Inteligentes:**
   - Tarjeta formateada automáticamente en bloques de 4 dígitos (`4111 1111 1111 1111`).
   - Fecha de vencimiento con barra diagonal automática (`MM/AA`).
   - Celular con código de área separado (`11 5555-1234`).
   - Valor monetario con separador de miles (`$ 600.000`).
6. **Descarga de Comprobante de Póliza:** Botón funcional en la pantalla de éxito que genera y descarga un comprobante `.txt` formal con membrete institucional, número de póliza, vigencia y detalles de cobertura.
7. **Soporte Extensible de Producto:** Posibilidad de seleccionar otros productos (ej. Bicicleta) adaptando dinámicamente las etiquetas y resúmenes de la aplicación.

---

## 8. Despliegue en GitHub Pages y Ejecución Local

Este proyecto es un **sitio 100% estático** (sin backend, sin Node.js y sin necesidad de compilación previa). Cumple de forma estricta con la **Opción 3.2 (sin build / CDN)** de la consigna.

### Despliegue Directo a GitHub Pages
1. Subir los archivos del repositorio a la rama `main` en GitHub.
2. En el repositorio de GitHub, ir a **Settings** > **Pages**.
3. En **Branch**, seleccionar `main` y la carpeta `/(root)`.
4. Guardar. El sitio quedará publicado inmediatamente en `https://<usuario>.github.io/<repositorio>/`.

### Ejecución Local
Al ser una aplicación puramente estática sin dependencias de Node.js, puede ejecutarse de dos maneras:
1. **Apertura Directa (Doble Clic):** Hacer doble clic directamente sobre `index.html` en el explorador de archivos de Windows/macOS/Linux. Cuenta con un fallback universal que garantiza interactividad inmediata sin configurar ningún servidor.
2. **Servidor HTTP Local:**
```bash
# Con Python:
python -m http.server 8000

# O con la extensión Live Server de VS Code:
# Clic derecho en index.html -> "Open with Live Server"
```
Abrir en el navegador: [http://localhost:8000](http://localhost:8000)

---

## 9. Checklist de Entrega y Criterios de Aceptación

- [x] Las 7 pantallas existen y se visualizan con alta fidelidad en mobile (390 px) y desktop (1440 px).
- [x] Los 3 casos de prueba matemáticos de la sección 5.1 dan exactamente el valor estipulado.
- [x] No se puede avanzar con datos inválidos y cada campo muestra su mensaje de error correspondiente.
- [x] El botón "Volver" conserva todos los datos ingresados en cualquiera de los pasos.
- [x] La tarjeta `4000 0000 0000 0002` conduce a la pantalla de error y "Reintentar" vuelve al pago con la información guardada.
- [x] El número de póliza cumple estrictamente con el formato `POL-AAAA-NNNNNN`.
- [x] Cero errores en la consola del navegador.
- [x] Documentación exhaustiva en `README.md` con instrucciones y decisiones de diseño.
