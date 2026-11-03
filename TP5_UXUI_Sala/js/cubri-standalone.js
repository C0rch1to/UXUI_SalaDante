/**
 * js/cubri-standalone.js - Fallback universal para protocolo local file:///
 * Se ejecuta unicamente cuando index.html se abre por doble clic en Windows Explorer
 * ya que Chromium bloquea scripts type=module por CORS origin null.
 * Contiene exactamente la misma logica pura vanilla que los modulos originales.
 */
(function() {
  if (typeof window !== "undefined") {
    if (window.__cubriIniciado) return;
    window.__cubriIniciado = true;
  }

// ==================== cotizador.js ====================
/**
 * js/cotizador.js — Cálculo de cuotas y formateo de monedas
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 */

const FACTORES_ANTIGUEDAD = {
  menos_1: 1.0,  // Menos de 1 año
  '1_a_2': 1.1,  // 1 a 2 años
  mas_2: 1.25,   // Más de 2 años
};

/**
 * Calcula la cuota mensual de un plan según la fórmula oficial:
 * cuota = Math.round(valor * tasaAnual / 12 * factorAntiguedad)
 *
 * @param {number|string} valor - Valor comercial del equipo asegurado
 * @param {number} tasaAnual - Tasa anual del plan (ej. 0.04, 0.06, 0.09)
 * @param {string} antiguedad - Identificador ('menos_1', '1_a_2', 'mas_2')
 * @returns {number} Cuota mensual redondeada
 */
function calcularCuota(valor, tasaAnual, antiguedad) {
  const numValor = typeof valor === 'number' 
    ? valor 
    : Number(String(valor).replace(/\D/g, ''));

  if (!numValor || isNaN(numValor) || numValor <= 0) {
    return 0;
  }

  const factor = FACTORES_ANTIGUEDAD[antiguedad] ?? 1.0;
  return Math.round((numValor * tasaAnual / 12) * factor);
}

/**
 * Formateador de moneda en pesos argentinos (ARS) sin decimales.
 */
const formateadorARS = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

/**
 * Convierte un número a string formateado como moneda: "$ 600.000"
 * @param {number} monto 
 * @returns {string}
 */
function formatearMoneda(monto) {
  if (typeof monto !== 'number' || isNaN(monto)) {
    return '$ 0';
  }
  return formateadorARS.format(monto);
}


// ==================== estado.js ====================
/**
 * js/estado.js — Único objeto de estado global para todo el flujo
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 */

const solicitud = {
  paso: 0, // 0 = inicio, 1 = cotizar, 2 = plan, 3 = datos, 4 = pago, 5 = éxito, 6 = error
  producto: 'celular',
  equipo: {
    marca: '',
    marcaOtro: '',
    modelo: '',
    valor: 0,
    antiguedad: '',
  },
  plan: 'plus', // Plus viene preseleccionado
  titular: {
    nombre: '',
    apellido: '',
    dni: '',
    nacimiento: '',
    email: '',
    celular: '',
    terminos: false,
  },
  pago: {
    metodo: 'credito', // 'credito' | 'debito'
    tarjeta: '',
    vencimiento: '',
    cvv: '',
    titular: '',
  },
  poliza: null,
  fechaEmision: null,
};

let callbackRender = null;

/**
 * Registra la función render para invocarla tras cada mutación del estado.
 * @param {Function} fn 
 */
function registrarRender(fn) {
  callbackRender = fn;
}

/**
 * Cambia el paso activo del flujo y vuelve a renderizar la vista.
 * @param {number} n - Nuevo índice de paso (0..6)
 */
function irAPaso(n) {
  solicitud.paso = n;
  guardarEnStorage();
  if (typeof callbackRender === 'function') {
    callbackRender();
  }
}

/**
 * Reinicia la solicitud a los valores predeterminados y vuelve al inicio.
 */
function reiniciarSolicitud() {
  solicitud.paso = 0;
  solicitud.producto = 'celular';
  solicitud.equipo = { marca: '', marcaOtro: '', modelo: '', valor: 0, antiguedad: '' };
  solicitud.plan = 'plus';
  solicitud.titular = {
    nombre: '',
    apellido: '',
    dni: '',
    nacimiento: '',
    email: '',
    celular: '',
    terminos: false,
  };
  solicitud.pago = {
    metodo: 'credito',
    tarjeta: '',
    vencimiento: '',
    cvv: '',
    titular: '',
  };
  solicitud.poliza = null;
  solicitud.fechaEmision = null;

  limpiarStorage();
  if (typeof callbackRender === 'function') {
    callbackRender();
  }
}

const STORAGE_KEY = 'cubri_solicitud_estado_v1';

/**
 * Persistencia en localStorage (Bonus)
 */
function guardarEnStorage() {
  try {
    // No guardamos el CVV por buenas prácticas de seguridad
    const datosSeguros = {
      ...solicitud,
      pago: {
        ...solicitud.pago,
        cvv: '',
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datosSeguros));
  } catch (e) {
    // Ignorar si cookies/storage están deshabilitados
  }
}

function cargarDeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const guardado = JSON.parse(raw);
    if (guardado && typeof guardado === 'object') {
      // Fusionar preservando estructura
      Object.assign(solicitud, guardado);
      return true;
    }
  } catch (e) {
    // Ignorar error de parsing
  }
  return false;
}

function limpiarStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Ignorar
  }
}


// ==================== validaciones.js ====================
/**
 * js/validaciones.js — Funciones puras de validación
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 *
 * Cada función recibe un valor y devuelve un string con el mensaje de error o null si es válido.
 */

function validarMarca(marca, marcaOtro = '') {
  if (!marca || String(marca).trim() === '') {
    return 'Elegí una marca';
  }
  if (marca === 'Otro') {
    if (!marcaOtro || String(marcaOtro).trim().length < 2) {
      return 'Especificá la marca (mínimo 2 letras)';
    }
  }
  return null;
}

function validarModelo(modelo) {
  if (!modelo || typeof modelo !== 'string') {
    return 'Ingresá el modelo del equipo';
  }
  const limpio = modelo.trim();
  if (limpio.length < 2 || limpio.length > 40) {
    return 'Ingresá el modelo del equipo';
  }
  return null;
}

function validarValor(valor) {
  if (valor === undefined || valor === null || valor === '') {
    return 'El valor debe estar entre $100.000 y $2.500.000';
  }
  const limpio = typeof valor === 'number' 
    ? valor 
    : Number(String(valor).replace(/\D/g, ''));

  if (isNaN(limpio) || limpio < 100000 || limpio > 2500000) {
    return 'El valor debe estar entre $100.000 y $2.500.000';
  }
  return null;
}

function validarAntiguedad(antiguedad) {
  const permitidas = ['menos_1', '1_a_2', 'mas_2'];
  if (!antiguedad || !permitidas.includes(antiguedad)) {
    return 'Indicá la antigüedad';
  }
  return null;
}

function validarNombre(nombre) {
  if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
    return 'Ingresá tu nombre';
  }
  return null;
}

function validarApellido(apellido) {
  if (!apellido || typeof apellido !== 'string' || apellido.trim().length < 2) {
    return 'Ingresá tu apellido';
  }
  return null;
}

function validarDNI(dni) {
  if (!dni) {
    return 'El DNI debe tener 7 u 8 números';
  }
  const limpio = String(dni).replace(/\D/g, '');
  if (!/^\d{7,8}$/.test(limpio)) {
    return 'El DNI debe tener 7 u 8 números';
  }
  return null;
}

function validarFechaNacimiento(fecha) {
  if (!fecha || String(fecha).trim() === '') {
    return 'Ingresá tu fecha de nacimiento';
  }

  // Soporta tanto DD/MM/AAAA (input texto formateado) como YYYY-MM-DD
  let anio, mes, dia;
  if (fecha.includes('-')) {
    const partes = fecha.split('-');
    anio = parseInt(partes[0], 10);
    mes = parseInt(partes[1], 10) - 1;
    dia = parseInt(partes[2], 10);
  } else if (fecha.includes('/')) {
    const partes = fecha.split('/');
    if (partes.length !== 3 || partes[0].length !== 2 || partes[1].length !== 2 || partes[2].length !== 4) {
      return 'Ingresá una fecha completa (DD/MM/AAAA)';
    }
    dia = parseInt(partes[0], 10);
    mes = parseInt(partes[1], 10) - 1;
    anio = parseInt(partes[2], 10);
  } else {
    return 'Ingresá una fecha válida (DD/MM/AAAA)';
  }

  if (isNaN(dia) || isNaN(mes) || isNaN(anio) || mes < 0 || mes > 11 || dia < 1 || dia > 31 || anio < 1800) {
    return 'Ingresá una fecha válida';
  }

  const fechaNac = new Date(anio, mes, dia);
  if (isNaN(fechaNac.getTime()) || fechaNac.getMonth() !== mes || fechaNac.getDate() !== dia) {
    return 'Fecha inexistente';
  }

  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const m = hoy.getMonth() - fechaNac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  if (edad < 18) {
    return 'Tenés que ser mayor de edad';
  }
  if (edad > 120) {
    return 'Fecha de nacimiento inválida';
  }

  return null;
}

function validarEmail(email) {
  if (!email || typeof email !== 'string') {
    return 'Ingresá un email válido';
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) {
    return 'Ingresá un email válido';
  }
  return null;
}

function validarCelular(celular) {
  if (!celular) {
    return 'Ej.: 11 5555-1234';
  }
  // Se ignoran espacios y guiones
  const limpio = String(celular).replace(/\D/g, '');
  // 10 dígitos sin 0 ni 15: no debe empezar con 0 ni con 15
  if (limpio.length !== 10 || limpio.startsWith('0') || limpio.startsWith('15')) {
    return 'Ej.: 11 5555-1234';
  }
  return null;
}

function validarTerminos(terminos) {
  if (!terminos) {
    return 'Tenés que aceptar los términos';
  }
  return null;
}

function validarTarjeta(tarjeta) {
  if (!tarjeta) {
    return 'Número de tarjeta inválido';
  }
  const limpio = String(tarjeta).replace(/\s/g, '');
  if (!/^\d{16}$/.test(limpio)) {
    return 'Número de tarjeta inválido';
  }
  return null;
}

function validarVencimiento(vencimiento) {
  if (!vencimiento || typeof vencimiento !== 'string') {
    return 'Vencimiento inválido';
  }
  const match = vencimiento.trim().match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
  if (!match) {
    return 'Vencimiento inválido';
  }

  const mes = parseInt(match[1], 10);
  const anio = 2000 + parseInt(match[2], 10);

  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1; // 1..12

  if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
    return 'Vencimiento inválido';
  }
  if (anio > anioActual + 20) {
    return 'Vencimiento inválido';
  }

  return null;
}

function validarCVV(cvv) {
  if (!cvv) {
    return 'CVV inválido';
  }
  const limpio = String(cvv).replace(/\D/g, '');
  if (limpio.length !== 3) {
    return 'CVV inválido';
  }
  return null;
}

function validarTitular(titular) {
  if (!titular || typeof titular !== 'string' || titular.trim().length < 2) {
    return 'Ingresá el nombre del titular';
  }
  return null;
}

// Helpers para evaluar la validez completa de un paso
function validarPaso1Completo(equipo) {
  const eMarca = validarMarca(equipo.marca, equipo.marcaOtro);
  const eModelo = validarModelo(equipo.modelo);
  const eValor = validarValor(equipo.valor);
  const eAntiguedad = validarAntiguedad(equipo.antiguedad);

  return {
    esValido: !eMarca && !eModelo && !eValor && !eAntiguedad,
    errores: {
      marca: eMarca,
      marcaOtro: equipo.marca === 'Otro' ? eMarca : null,
      modelo: eModelo,
      valor: eValor,
      antiguedad: eAntiguedad,
    },
  };
}

function validarPaso3Completo(titular) {
  const eNombre = validarNombre(titular.nombre);
  const eApellido = validarApellido(titular.apellido);
  const eDNI = validarDNI(titular.dni);
  const eNacimiento = validarFechaNacimiento(titular.nacimiento);
  const eEmail = validarEmail(titular.email);
  const eCelular = validarCelular(titular.celular);
  const eTerminos = validarTerminos(titular.terminos);

  return {
    esValido: !eNombre && !eApellido && !eDNI && !eNacimiento && !eEmail && !eCelular && !eTerminos,
    errores: {
      nombre: eNombre,
      apellido: eApellido,
      dni: eDNI,
      nacimiento: eNacimiento,
      email: eEmail,
      celular: eCelular,
      terminos: eTerminos,
    },
  };
}

function validarPaso4Completo(pago) {
  const eTarjeta = validarTarjeta(pago.tarjeta);
  const eVencimiento = validarVencimiento(pago.vencimiento);
  const eCVV = validarCVV(pago.cvv);
  const eTitular = validarTitular(pago.titular);

  return {
    esValido: !eTarjeta && !eVencimiento && !eCVV && !eTitular,
    errores: {
      tarjeta: eTarjeta,
      vencimiento: eVencimiento,
      cvv: eCVV,
      titular: eTitular,
    },
  };
}


// ==================== pago.js ====================
/**
 * js/pago.js — Simulación de pago y generación de pólizas
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 */

/**
 * Simula el procesamiento de un pago con promesa asíncrona (1.5 segundos).
 * Si el número limpio es '4000000000000002', es rechazado.
 * Cualquier otro número válido es aprobado.
 *
 * @param {string} numero - Número de tarjeta (con o sin espacios)
 * @returns {Promise<{ ok: boolean, motivo?: string }>}
 */
function simularPago(numero) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const limpio = String(numero).replace(/\s/g, '');
      if (limpio === '4000000000000002') {
        resolve({ ok: false, motivo: 'Tarjeta rechazada' });
      } else {
        resolve({ ok: true });
      }
    }, 1500);
  });
}

// Contador persistente en sessionStorage/localStorage para correlatividad
let contadorMemoria = 123;

function obtenerSiguienteNumeroPoliza() {
  if (typeof localStorage !== 'undefined') {
    try {
      const guardado = localStorage.getItem('cubri_contador_poliza');
      let contador = guardado ? parseInt(guardado, 10) : 123;
      localStorage.setItem('cubri_contador_poliza', String(contador + 1));
      return contador;
    } catch (e) {
      // fallback a memoria
    }
  }
  return contadorMemoria++;
}

/**
 * Genera un número de póliza con el formato estipulado: POL-AAAA-NNNNNN
 * Ej.: POL-2026-000123
 * @returns {string}
 */
function generarPoliza() {
  const anio = new Date().getFullYear();
  const contador = obtenerSiguienteNumeroPoliza();
  return `POL-${anio}-${String(contador).padStart(6, '0')}`;
}

/**
 * Devuelve la fecha actual formateada en DD/MM/AAAA para la vigencia
 * @returns {string}
 */
function obtenerFechaHoyFormateada() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();
  return `${dia}/${mes}/${anio}`;
}


// ==================== render.js ====================
/**
 * js/render.js — Funciones de renderizado reactivo a partir del estado
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 */

let cachePlanes = [];

/**
 * Establece los planes cargados desde el JSON local
 * @param {Array} planes 
 */
function setPlanes(planes) {
  cachePlanes = planes;
}

function getPlanes() {
  return cachePlanes;
}

let ultimoPasoRenderizado = null;

/**
 * Función principal de renderizado: actualiza vistas, stepper y resúmenes.
 */
function render() {
  const pasoCambio = ultimoPasoRenderizado !== solicitud.paso;
  ultimoPasoRenderizado = solicitud.paso;

  // 1. Mostrar/ocultar secciones según solicitud.paso
  document.querySelectorAll('[data-paso]').forEach((sec) => {
    const pasoSec = Number(sec.dataset.paso);
    const visible = pasoSec === solicitud.paso;
    sec.hidden = !visible;
    if (visible) {
      sec.classList.remove('hidden');
    } else {
      sec.classList.add('hidden');
    }
  });

  // 1b. Control del contenedor general del checkout (pasos 1 a 4)
  const checkoutContainer = document.getElementById('contenedor-checkout');
  if (checkoutContainer) {
    const enCheckout = solicitud.paso >= 1 && solicitud.paso <= 4;
    checkoutContainer.hidden = !enCheckout;
    if (enCheckout) {
      checkoutContainer.classList.remove('hidden');
    } else {
      checkoutContainer.classList.add('hidden');
    }
  }

  // 2. Control de scroll: solo ir arriba cuando realmente hay un cambio de paso
  if (pasoCambio) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Actualizar etiquetas de producto según selección
  const nombreProducto = solicitud.producto === 'bicicleta' ? 'Bicicleta' : 'Celular';
  document.querySelectorAll('[data-tag-producto]').forEach((el) => {
    el.textContent = `Seguro de ${nombreProducto}`;
  });
  const tituloPaso1 = document.querySelector('[data-titulo-paso1]');
  if (tituloPaso1) {
    tituloPaso1.textContent = `Contanos sobre tu ${nombreProducto.toLowerCase()}`;
  }
  renderStepper();
  renderResumen();
  renderPasoActual();
}

/**
 * Renderiza el Stepper de 4 pasos (solo visible en los pasos 1, 2, 3 y 4)
 */
function renderStepper() {
  const steppers = document.querySelectorAll('.componente-stepper');
  const enCheckout = solicitud.paso >= 1 && solicitud.paso <= 4;

  steppers.forEach((stepper) => {
    if (!enCheckout) {
      stepper.hidden = true;
      stepper.classList.add('hidden');
      return;
    }

    stepper.hidden = false;
    stepper.classList.remove('hidden');

    const pasoItems = stepper.querySelectorAll('[data-step-index]');
    pasoItems.forEach((item) => {
      const idx = Number(item.dataset.stepIndex);
      const circle = item.querySelector('.step-circle');
      const label = item.querySelector('.step-label');
      const desc = item.querySelector('.step-desc');

      if (idx < solicitud.paso) {
        // Estado: Completo (verde con check)
        circle.className = 'step-circle w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm bg-emerald-600 text-white shadow-sm transition-all duration-300 shrink-0';
        circle.innerHTML = `
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        `;
        if (label) {
          label.className = 'step-label text-xs sm:text-sm font-semibold text-emerald-600 transition-colors duration-300';
        }
        if (desc) {
          desc.className = 'step-desc text-[11px] text-emerald-600/70 hidden sm:block';
        }
      } else if (idx === solicitud.paso) {
        // Estado: Activo (azul índigo)
        circle.className = 'step-circle w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm bg-indigo-600 text-white shadow-sm ring-4 ring-indigo-100 transition-all duration-300 shrink-0';
        circle.textContent = idx;
        if (label) {
          label.className = 'step-label text-xs sm:text-sm font-bold text-indigo-600 transition-colors duration-300';
        }
        if (desc) {
          desc.className = 'step-desc text-[11px] text-slate-400 hidden sm:block';
        }
      } else {
        // Estado: Pendiente (gris)
        circle.className = 'step-circle w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-400 transition-all duration-300 shrink-0';
        circle.textContent = idx;
        if (label) {
          label.className = 'step-label text-xs sm:text-sm font-medium text-slate-400 transition-colors duration-300';
        }
        if (desc) {
          desc.className = 'step-desc text-[11px] text-slate-400 hidden sm:block';
        }
      }
    });

    // Actualizar líneas conectoras horizontales entre pasos
    const lines = stepper.querySelectorAll('.step-line');
    lines.forEach((line, index) => {
      if (solicitud.paso > index + 1) {
        line.className = 'step-line flex-1 h-0.5 bg-emerald-600 mx-2 sm:mx-6 transition-colors duration-300';
      } else {
        line.className = 'step-line flex-1 h-0.5 bg-slate-200 dark:bg-slate-700 mx-2 sm:mx-6 transition-colors duration-300';
      }
    });
  });
}

/**
 * Obtiene el plan seleccionado actual o el fallback a Plus
 */
function obtenerPlanSeleccionado() {
  if (!cachePlanes.length) return null;
  return cachePlanes.find((p) => p.id === solicitud.plan) || cachePlanes[1] || cachePlanes[0];
}

/**
 * Renderiza el Resumen en desktop (card lateral) y en mobile (barra o card)
 */
function renderResumen() {
  const planActual = obtenerPlanSeleccionado();
  const cuota = planActual
    ? calcularCuota(solicitud.equipo.valor, planActual.tasaAnual, solicitud.equipo.antiguedad)
    : 0;

  const marcaDisplay = solicitud.equipo.marca === 'Otro'
    ? (solicitud.equipo.marcaOtro || 'Otro')
    : solicitud.equipo.marca;

  const nombreEquipo = [marcaDisplay, solicitud.equipo.modelo]
    .filter(Boolean)
    .join(' ') || '—';

  const nombreTitular = [solicitud.titular.nombre, solicitud.titular.apellido]
    .filter(Boolean)
    .join(' ') || '—';

  // --- 1. Resumen Lateral Desktop ---
  const aside = document.getElementById('resumen-lateral');
  if (aside) {
    if (solicitud.paso >= 1 && solicitud.paso <= 4) {
      aside.classList.remove('hidden');
      aside.hidden = false;

      const elSeguro = aside.querySelector('[data-resumen="seguro"]');
      if (elSeguro) elSeguro.textContent = solicitud.producto === 'bicicleta' ? 'Bicicleta' : 'Celular';

      // Nombre del equipo
      const elEquipo = aside.querySelector('[data-resumen="equipo"]');
      if (elEquipo) elEquipo.textContent = nombreEquipo;

      // Fila de Valor (visible en paso 1)
      const filaValor = aside.querySelector('[data-resumen-fila="valor"]');
      const elValor = aside.querySelector('[data-resumen="valor"]');
      if (filaValor && elValor) {
        if (solicitud.paso === 1) {
          filaValor.classList.remove('hidden');
          elValor.textContent = solicitud.equipo.valor > 0 
            ? formatearMoneda(solicitud.equipo.valor) 
            : '—';
        } else {
          filaValor.classList.add('hidden');
        }
      }

      // Fila de Plan (visible en pasos 2, 3, 4)
      const filaPlan = aside.querySelector('[data-resumen-fila="plan"]');
      const elPlan = aside.querySelector('[data-resumen="plan"]');
      if (filaPlan && elPlan) {
        if (solicitud.paso >= 2) {
          filaPlan.classList.remove('hidden');
          elPlan.textContent = planActual ? planActual.nombre : 'Plus';
        } else {
          filaPlan.classList.add('hidden');
        }
      }

      // Fila de Titular (visible en paso 4)
      const filaTitular = aside.querySelector('[data-resumen-fila="titular"]');
      const elTitular = aside.querySelector('[data-resumen="titular"]');
      if (filaTitular && elTitular) {
        if (solicitud.paso === 4 && nombreTitular !== '—') {
          filaTitular.classList.remove('hidden');
          elTitular.textContent = nombreTitular;
        } else {
          filaTitular.classList.add('hidden');
        }
      }

      // Cuota total
      const elTotal = aside.querySelector('[data-resumen="total"]');
      const elAvisoPaso1 = aside.querySelector('[data-resumen="aviso-paso1"]');
      const bloqueTotal = aside.querySelector('[data-resumen-bloque="total"]');

      if (solicitud.paso === 1) {
        if (elAvisoPaso1) elAvisoPaso1.classList.remove('hidden');
        if (bloqueTotal) bloqueTotal.classList.add('hidden');
      } else {
        if (elAvisoPaso1) elAvisoPaso1.classList.add('hidden');
        if (bloqueTotal) bloqueTotal.classList.remove('hidden');
        if (elTotal) elTotal.textContent = formatearMoneda(cuota);
      }
    } else {
      aside.classList.add('hidden');
      aside.hidden = true;
    }
  }

  // --- 2. Barra Móvil en Paso 2 (Elegir plan) ---
  const barraMobilePlan = document.getElementById('resumen-mobile-plan');
  if (barraMobilePlan) {
    const textoPlan = barraMobilePlan.querySelector('[data-resumen-mobile="plan-info"]');
    const textoPrecio = barraMobilePlan.querySelector('[data-resumen-mobile="precio"]');
    if (textoPlan) {
      textoPlan.textContent = `Plan ${planActual?.nombre || 'Plus'} · ${solicitud.equipo.modelo || 'Celular'}`;
    }
    if (textoPrecio) {
      textoPrecio.textContent = `${formatearMoneda(cuota)}/mes`;
    }
  }

  // --- 3. Card Móvil en Paso 4 (Pago) ---
  const cardMobilePago = document.getElementById('resumen-mobile-pago');
  if (cardMobilePago) {
    const elSeguro = cardMobilePago.querySelector('[data-pago-resumen="seguro"]');
    const elEquipo = cardMobilePago.querySelector('[data-pago-resumen="equipo"]');
    const elTitular = cardMobilePago.querySelector('[data-pago-resumen="titular"]');
    const elTotal = cardMobilePago.querySelector('[data-pago-resumen="total"]');

    if (elSeguro) elSeguro.textContent = `Celular · Plan ${planActual?.nombre || 'Plus'}`;
    if (elEquipo) elEquipo.textContent = nombreEquipo;
    if (elTitular) elTitular.textContent = nombreTitular;
    if (elTotal) elTotal.textContent = formatearMoneda(cuota);
  }
}

/**
 * Renderiza los elementos específicos del paso activo
 */
function renderPasoActual() {
  switch (solicitud.paso) {
    case 1:
      renderPaso1();
      break;
    case 2:
      renderPaso2();
      break;
    case 3:
      renderPaso3();
      break;
    case 4:
      renderPaso4();
      break;
    case 5:
      renderPaso5Exito();
      break;
    case 6:
      renderPaso6Error();
      break;
  }
}

/**
 * Paso 1: Cotizar
 */
function renderPaso1() {
  const selectMarca = document.getElementById('marca');
  const inputModelo = document.getElementById('modelo');
  const inputValor = document.getElementById('valor');
  const btnContinuar = document.getElementById('btn-paso1-continuar');

  if (selectMarca && selectMarca.value !== solicitud.equipo.marca) {
    selectMarca.value = solicitud.equipo.marca;
  }
  const campoMarcaOtro = document.getElementById('campo-marca-otro');
  const inputMarcaOtro = document.getElementById('marca-otro');
  if (campoMarcaOtro) {
    if (solicitud.equipo.marca === 'Otro') {
      campoMarcaOtro.classList.remove('hidden');
      if (inputMarcaOtro && inputMarcaOtro.value !== (solicitud.equipo.marcaOtro || '')) {
        inputMarcaOtro.value = solicitud.equipo.marcaOtro || '';
      }
    } else {
      campoMarcaOtro.classList.add('hidden');
    }
  }
  if (inputModelo && inputModelo.value !== solicitud.equipo.modelo) {
    inputModelo.value = solicitud.equipo.modelo;
  }
  if (inputValor && !inputValor.matches(':focus')) {
    inputValor.value = solicitud.equipo.valor > 0 
      ? formatearMoneda(solicitud.equipo.valor) 
      : '';
  }

  // Antigüedad chips
  document.querySelectorAll('input[name="antiguedad"]').forEach((radio) => {
    radio.checked = radio.value === solicitud.equipo.antiguedad;
    const parentChip = radio.closest('.chip-antiguedad');
    if (parentChip) {
      if (radio.checked) {
        parentChip.classList.add('border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'font-semibold');
        parentChip.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');
      } else {
        parentChip.classList.remove('border-indigo-600', 'bg-indigo-50', 'text-indigo-700', 'font-semibold');
        parentChip.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
      }
    }
  });

  // Habilitar o deshabilitar botón "Ver planes"
  const val = validarPaso1Completo(solicitud.equipo);
  if (btnContinuar) {
    btnContinuar.disabled = !val.esValido;
  }
}

/**
 * Paso 2: Elegir plan
 */
function renderPaso2() {
  const contenedor = document.getElementById('contenedor-planes');
  if (!contenedor || !cachePlanes.length) return;

  contenedor.innerHTML = cachePlanes.map((plan) => {
    const esSeleccionado = solicitud.plan === plan.id;
    const cuota = calcularCuota(solicitud.equipo.valor, plan.tasaAnual, solicitud.equipo.antiguedad);
    const cuotaStr = formatearMoneda(cuota);

    // Mapeo exhaustivo de características del diseño
    const coberturasHTML = `
      <ul class="mt-4 space-y-2 text-xs sm:text-sm text-slate-600">
        <li class="flex items-center gap-2">
          <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-slate-800 font-medium">Robo con violencia</span>
        </li>
        <li class="flex items-center gap-2">
          ${plan.id === 'plus' || plan.id === 'premium' ? `
            <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-slate-800 font-medium">${plan.id === 'premium' ? 'Rotura total' : 'Rotura de pantalla'}</span>
          ` : `
            <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="text-slate-400 line-through">Rotura de pantalla</span>
          `}
        </li>
        <li class="flex items-center gap-2">
          ${plan.id === 'premium' ? `
            <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-slate-800 font-medium">Hurto / pérdida</span>
          ` : `
            <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="text-slate-400 line-through">Hurto / pérdida</span>
          `}
        </li>
      </ul>
    `;

    return `
      <label class="card relative p-5 cursor-pointer transition-all duration-200 border-2 ${
        esSeleccionado 
          ? 'border-indigo-600 bg-white ring-2 ring-indigo-100 shadow-md' 
          : 'border-slate-200 bg-white hover:border-slate-300'
      }">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-lg text-slate-900">${plan.nombre}</h3>
            ${plan.recomendado ? `
              <span class="badge bg-indigo-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                Recomendado
              </span>
            ` : ''}
          </div>
          <input 
            type="radio" 
            name="plan" 
            value="${plan.id}" 
            ${esSeleccionado ? 'checked' : ''} 
            class="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
          >
        </div>

        <div class="mt-3 flex items-baseline gap-1">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900">${cuotaStr}</span>
          <span class="text-xs sm:text-sm text-slate-500">/ mes</span>
        </div>

        ${coberturasHTML}
      </label>
    `;
  }).join('');
}

/**
 * Paso 3: Datos personales
 */
function renderPaso3() {
  const campos = ['nombre', 'apellido', 'dni', 'nacimiento', 'email', 'celular'];
  campos.forEach((campo) => {
    const input = document.getElementById(campo);
    if (input && input.value !== solicitud.titular[campo]) {
      input.value = solicitud.titular[campo] || '';
    }
  });

  const checkTerminos = document.getElementById('terminos');
  if (checkTerminos) {
    checkTerminos.checked = Boolean(solicitud.titular.terminos);
  }

  // Habilitar/deshabilitar botón continuar
  const val = validarPaso3Completo(solicitud.titular);
  const btnContinuar = document.getElementById('btn-paso3-continuar');
  const avisoInvalido = document.getElementById('aviso-formulario-invalido');

  if (btnContinuar) {
    btnContinuar.disabled = !val.esValido;
  }
  if (avisoInvalido) {
    if (val.esValido) {
      avisoInvalido.classList.add('hidden');
    } else {
      avisoInvalido.classList.remove('hidden');
    }
  }
}

/**
 * Paso 4: Pago
 */
function renderPaso4() {
  // Métodos de pago (crédito / débito)
  document.querySelectorAll('input[name="metodo-pago"]').forEach((radio) => {
    radio.checked = radio.value === solicitud.pago.metodo;
    const parent = radio.closest('.metodo-pago-card');
    if (parent) {
      if (radio.checked) {
        parent.classList.add('border-indigo-600', 'bg-indigo-50', 'ring-2', 'ring-indigo-100');
        parent.classList.remove('border-slate-200', 'bg-white');
      } else {
        parent.classList.remove('border-indigo-600', 'bg-indigo-50', 'ring-2', 'ring-indigo-100');
        parent.classList.add('border-slate-200', 'bg-white');
      }
    }
  });

  const inputTarjeta = document.getElementById('tarjeta');
  const inputVenc = document.getElementById('vencimiento');
  const inputCVV = document.getElementById('cvv');
  const inputTitular = document.getElementById('titular-tarjeta');

  if (inputTarjeta && inputTarjeta.value !== solicitud.pago.tarjeta) {
    inputTarjeta.value = solicitud.pago.tarjeta;
  }
  if (inputVenc && inputVenc.value !== solicitud.pago.vencimiento) {
    inputVenc.value = solicitud.pago.vencimiento;
  }
  if (inputCVV && inputCVV.value !== solicitud.pago.cvv) {
    inputCVV.value = solicitud.pago.cvv;
  }

  // Prellenar titular si está vacío
  if (inputTitular) {
    if (!solicitud.pago.titular && (solicitud.titular.nombre || solicitud.titular.apellido)) {
      solicitud.pago.titular = `${solicitud.titular.nombre} ${solicitud.titular.apellido}`.trim();
    }
    inputTitular.value = solicitud.pago.titular;
  }
}

/**
 * Paso 5: Pantalla de Confirmación / Éxito
 */
function renderPaso5Exito() {
  const planActual = obtenerPlanSeleccionado();
  const cuota = planActual
    ? calcularCuota(solicitud.equipo.valor, planActual.tasaAnual, solicitud.equipo.antiguedad)
    : 0;

  const elTitulo = document.getElementById('exito-titulo');
  const elEmail = document.getElementById('exito-email');
  const elPoliza = document.getElementById('exito-poliza-badge');
  const elPlan = document.getElementById('exito-plan');
  const elEquipo = document.getElementById('exito-equipo');
  const elFecha = document.getElementById('exito-fecha');
  const elCuota = document.getElementById('exito-cuota');

  if (elTitulo) {
    elTitulo.textContent = `¡Listo, ${solicitud.titular.nombre || 'Juan'}! Tu celular ya está protegido`;
  }
  if (elEmail) {
    elEmail.textContent = `Te enviamos la póliza a ${solicitud.titular.email || 'tu email'}`;
  }
  if (elPoliza) {
    elPoliza.textContent = solicitud.poliza || 'POL-2026-000123';
  }
  if (elPlan) {
    elPlan.textContent = planActual?.nombre || 'Plus';
  }
  if (elEquipo) {
    elEquipo.textContent = `${solicitud.equipo.marca} ${solicitud.equipo.modelo}`.trim() || 'Samsung Galaxy A55';
  }
  if (elFecha) {
    elFecha.textContent = solicitud.fechaEmision || new Date().toLocaleDateString('es-AR');
  }
  if (elCuota) {
    elCuota.textContent = formatearMoneda(cuota);
  }
}

/**
 * Paso 6: Pantalla de Error de pago
 */
function renderPaso6Error() {
  // Asegura que los datos de prueba sugeridos sean visibles
}


// ==================== app.js ====================
/**
 * js/app.js — Orquestación del flujo, eventos, máscaras y lógica de interacción
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 */

// Marcar módulo iniciado para control de compatibilidad
if (typeof window !== 'undefined') {
  window.__cubriIniciado = true;
  window.solicitud = solicitud;
  window.irAPaso = irAPaso;
  window.reiniciarSolicitud = reiniciarSolicitud;
}

// Fallback de planes en memoria según consigna oficial por si falla fetch en file://
const PLANES_DEFAULT = [
  {
    id: 'basico',
    nombre: 'Básico',
    tasaAnual: 0.04,
    coberturas: ['Robo con violencia'],
  },
  {
    id: 'plus',
    nombre: 'Plus',
    tasaAnual: 0.06,
    recomendado: true,
    coberturas: ['Robo con violencia', 'Rotura de pantalla'],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    tasaAnual: 0.09,
    coberturas: ['Robo con violencia', 'Rotura total', 'Hurto / pérdida'],
  },
];

// ============================================================================
// Inicialización de la aplicación
// ============================================================================
async function iniciarApp() {
  if (window.__cubriYaInicializado) return;
  window.__cubriYaInicializado = true;

  // Registrar callback para que mutaciones de estado llamen a render()
  registrarRender(render);

  // Cargar planes vía fetch (con fallback resiliente)
  try {
    const res = await fetch('./data/planes.json');
    if (!res.ok) throw new Error('Error al cargar planes.json');
    const datosPlanes = await res.json();
    setPlanes(datosPlanes);
  } catch (err) {
    console.warn('Usando planes predeterminados en memoria:', err);
    setPlanes(PLANES_DEFAULT);
  }

  // Cargar estado guardado de localStorage (Bonus)
  const teniaDatosPrevios = cargarDeStorage();

  // Inicializar modo oscuro guardado
  inicializarTema();

  // Inicializar eventos del DOM
  inicializarEventos();

  // Primer renderizado
  render();

  if (teniaDatosPrevios && solicitud.paso > 0) {
    mostrarToast('Continuando con tu solicitud anterior guardada', 'info');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarApp);
} else {
  iniciarApp();
}

// ============================================================================
// Manejo de Feedback y Errores en Formularios (en Blur y Submit)
// ============================================================================

/**
 * Marca visualmente un campo como inválido y actualiza su mensaje con accesibilidad
 */
function marcarError(idCampo, mensaje) {
  const input = document.getElementById(idCampo);
  if (!input) return;

  const grupo = input.closest('.field') || input.parentElement;
  if (grupo) {
    grupo.setAttribute('data-invalid', '');
  }
  input.setAttribute('aria-invalid', 'true');

  const pError = document.getElementById(`${idCampo}-error`);
  if (pError) {
    pError.textContent = mensaje;
    pError.classList.remove('hidden');
    input.setAttribute('aria-describedby', `${idCampo}-error`);
  }
}

/**
 * Limpia el estado de error de un campo
 */
function limpiarError(idCampo) {
  const input = document.getElementById(idCampo);
  if (!input) return;

  const grupo = input.closest('.field') || input.parentElement;
  if (grupo) {
    grupo.removeAttribute('data-invalid');
  }
  input.removeAttribute('aria-invalid');

  const pError = document.getElementById(`${idCampo}-error`);
  if (pError) {
    pError.textContent = '';
    pError.classList.add('hidden');
  }
}

// ============================================================================
// Eventos y Delegación
// ============================================================================
function inicializarEventos() {
  // --------------------------------------------------------------------------
  // Navegación General
  // --------------------------------------------------------------------------

  // Logo Cubrí -> Volver al inicio
  document.querySelectorAll('[data-action="volver-inicio"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (solicitud.paso > 0) {
        irAPaso(0);
      }
    });
  });

  // CTAs Inicio (Paso 0 -> 1)
  document.querySelectorAll('[data-action="iniciar-cotizacion"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('[data-producto]') || btn;
      const prod = card.dataset.producto || 'celular';
      solicitud.producto = prod;
      guardarEnStorage();
      irAPaso(1);
    });
  });

  // Botones "Volver"
  document.querySelectorAll('[data-action="volver"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (solicitud.paso === 1) {
        irAPaso(0);
      } else if (solicitud.paso === 2) {
        irAPaso(1);
      } else if (solicitud.paso === 3) {
        irAPaso(2);
      } else if (solicitud.paso === 4) {
        irAPaso(3);
      }
    });
  });

  // Links "Editar" desde el resumen (Bonus)
  document.addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-editar-paso]');
    if (editBtn) {
      e.preventDefault();
      const targetPaso = Number(editBtn.dataset.editarPaso);
      irAPaso(targetPaso);
    }
  });

  // --------------------------------------------------------------------------
  // Paso 1: Cotizar
  // --------------------------------------------------------------------------
  const selectMarca = document.getElementById('marca');
  const campoMarcaOtro = document.getElementById('campo-marca-otro');
  const inputMarcaOtro = document.getElementById('marca-otro');
  const inputModelo = document.getElementById('modelo');
  const inputValor = document.getElementById('valor');
  const btnPaso1 = document.getElementById('btn-paso1-continuar');

  // Marca
  selectMarca?.addEventListener('change', () => {
    const val = selectMarca.value;
    solicitud.equipo.marca = val;
    if (val === 'Otro') {
      campoMarcaOtro?.classList.remove('hidden');
      inputMarcaOtro?.focus();
    } else {
      campoMarcaOtro?.classList.add('hidden');
      if (inputMarcaOtro) inputMarcaOtro.value = '';
      solicitud.equipo.marcaOtro = '';
      limpiarError('marca-otro');
    }
    guardarEnStorage();
    const error = validarMarca(solicitud.equipo.marca, solicitud.equipo.marcaOtro);
    if (!error) {
      limpiarError('marca');
    }
    actualizarBotonPaso1();
    renderResumen();
  });

  selectMarca?.addEventListener('blur', () => {
    const error = validarMarca(solicitud.equipo.marca, solicitud.equipo.marcaOtro);
    if (error && solicitud.equipo.marca !== 'Otro') {
      marcarError('marca', error);
    } else if (!error) {
      limpiarError('marca');
    }
    actualizarBotonPaso1();
  });

  // Campo Marca "Otro" especificado por el usuario
  inputMarcaOtro?.addEventListener('input', (e) => {
    solicitud.equipo.marcaOtro = e.target.value.trim();
    guardarEnStorage();
    if (inputMarcaOtro.getAttribute('aria-invalid') === 'true') {
      const error = validarMarca(solicitud.equipo.marca, solicitud.equipo.marcaOtro);
      if (!error) limpiarError('marca-otro');
    }
    actualizarBotonPaso1();
    renderResumen();
  });

  inputMarcaOtro?.addEventListener('blur', () => {
    const error = validarMarca(solicitud.equipo.marca, solicitud.equipo.marcaOtro);
    if (error) marcarError('marca-otro', error);
    else limpiarError('marca-otro');
    actualizarBotonPaso1();
  });

  // Modelo
  inputModelo?.addEventListener('input', () => {
    solicitud.equipo.modelo = inputModelo.value;
    guardarEnStorage();
    if (inputModelo.getAttribute('aria-invalid') === 'true') {
      const error = validarModelo(solicitud.equipo.modelo);
      if (!error) limpiarError('modelo');
    }
    actualizarBotonPaso1();
    renderResumen();
  });

  inputModelo?.addEventListener('blur', () => {
    const error = validarModelo(solicitud.equipo.modelo);
    if (error) marcarError('modelo', error);
    else limpiarError('modelo');
    actualizarBotonPaso1();
  });

  // Valor del equipo (con máscara y blur formatting)
  inputValor?.addEventListener('input', (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, '');
    const num = Number(soloNumeros);
    solicitud.equipo.valor = num;
    guardarEnStorage();

    if (inputValor.getAttribute('aria-invalid') === 'true') {
      const error = validarValor(num);
      if (!error) limpiarError('valor');
    }
    actualizarBotonPaso1();
    renderResumen();
  });

  inputValor?.addEventListener('focus', () => {
    // Al hacer foco, mostramos los dígitos limpios para fácil edición
    if (solicitud.equipo.valor > 0) {
      inputValor.value = String(solicitud.equipo.valor);
    }
  });

  inputValor?.addEventListener('blur', () => {
    const error = validarValor(solicitud.equipo.valor);
    if (error) {
      marcarError('valor', error);
    } else {
      limpiarError('valor');
      if (solicitud.equipo.valor > 0) {
        inputValor.value = formatearMoneda(solicitud.equipo.valor);
      }
    }
    actualizarBotonPaso1();
  });

  // Antigüedad (Chips)
  document.querySelectorAll('input[name="antiguedad"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      solicitud.equipo.antiguedad = radio.value;
      guardarEnStorage();
      limpiarError('antiguedad');
      actualizarBotonPaso1();
      render(); // re-render para actualizar estilos de chips y resumen
    });
  });

  function actualizarBotonPaso1() {
    const val = validarPaso1Completo(solicitud.equipo);
    if (btnPaso1) btnPaso1.disabled = !val.esValido;
  }

  // Avanzar Paso 1 -> Paso 2
  btnPaso1?.addEventListener('click', (e) => {
    e.preventDefault();
    const val = validarPaso1Completo(solicitud.equipo);
    if (!val.esValido) {
      if (val.errores.marca) {
        if (solicitud.equipo.marca === 'Otro' && val.errores.marcaOtro) {
          marcarError('marca-otro', val.errores.marcaOtro);
        } else {
          marcarError('marca', val.errores.marca);
        }
      }
      if (val.errores.modelo) marcarError('modelo', val.errores.modelo);
      if (val.errores.valor) marcarError('valor', val.errores.valor);
      if (val.errores.antiguedad) marcarError('antiguedad', val.errores.antiguedad);

      // Foco en el primer campo con error
      const primerError = document.querySelector('[data-paso="1"] [aria-invalid="true"]');
      primerError?.focus();
      return;
    }
    irAPaso(2);
  });

  // --------------------------------------------------------------------------
  // Paso 2: Elegir Plan
  // --------------------------------------------------------------------------
  const contenedorPlanes = document.getElementById('contenedor-planes');
  contenedorPlanes?.addEventListener('change', (e) => {
    const radio = e.target.closest('input[name="plan"]');
    if (radio) {
      solicitud.plan = radio.value;
      guardarEnStorage();
      render();
    }
  });

  // Avanzar Paso 2 -> Paso 3
  document.querySelectorAll('[data-action="continuar-paso2"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      irAPaso(3);
    });
  });

  // --------------------------------------------------------------------------
  // Paso 3: Datos Personales
  // --------------------------------------------------------------------------
  const camposPaso3 = [
    { id: 'nombre', validador: validarNombre, prop: 'nombre' },
    { id: 'apellido', validador: validarApellido, prop: 'apellido' },
    { id: 'dni', validador: validarDNI, prop: 'dni' },
    { id: 'nacimiento', validador: validarFechaNacimiento, prop: 'nacimiento' },
    { id: 'email', validador: validarEmail, prop: 'email' },
    { id: 'celular', validador: validarCelular, prop: 'celular' },
  ];

  camposPaso3.forEach(({ id, validador, prop }) => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', (e) => {
      let val = e.target.value;

      // Máscaras convenientes
      if (id === 'celular') {
        val = formatearMascaraCelular(val);
        input.value = val;
      } else if (id === 'dni') {
        val = val.replace(/\D/g, '').slice(0, 8);
        input.value = val;
      } else if (id === 'nacimiento') {
        const raw = val.replace(/\D/g, '').slice(0, 8);
        if (raw.length > 4) {
          val = `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`;
        } else if (raw.length > 2) {
          val = `${raw.slice(0, 2)}/${raw.slice(2)}`;
        } else {
          val = raw;
        }
        input.value = val;
      }

      solicitud.titular[prop] = val;
      guardarEnStorage();

      if (input.getAttribute('aria-invalid') === 'true') {
        const error = validador(solicitud.titular[prop]);
        if (!error) limpiarError(id);
      }
      actualizarBotonPaso3();
      renderResumen();
    });

    input.addEventListener('blur', () => {
      const error = validador(solicitud.titular[prop]);
      if (error) marcarError(id, error);
      else limpiarError(id);
      actualizarBotonPaso3();
    });
  });

  // Checkbox Términos
  const checkTerminos = document.getElementById('terminos');
  checkTerminos?.addEventListener('change', () => {
    solicitud.titular.terminos = checkTerminos.checked;
    guardarEnStorage();
    const error = validarTerminos(solicitud.titular.terminos);
    if (!error) limpiarError('terminos');
    else marcarError('terminos', error);
    actualizarBotonPaso3();
  });

  function actualizarBotonPaso3() {
    const val = validarPaso3Completo(solicitud.titular);
    const btn = document.getElementById('btn-paso3-continuar');
    const aviso = document.getElementById('aviso-formulario-invalido');
    if (btn) btn.disabled = !val.esValido;
    if (aviso) {
      if (val.esValido) aviso.classList.add('hidden');
      else aviso.classList.remove('hidden');
    }
  }

  // Avanzar Paso 3 -> Paso 4
  const btnPaso3 = document.getElementById('btn-paso3-continuar');
  btnPaso3?.addEventListener('click', (e) => {
    e.preventDefault();
    const val = validarPaso3Completo(solicitud.titular);
    if (!val.esValido) {
      camposPaso3.forEach(({ id, validador, prop }) => {
        const err = validador(solicitud.titular[prop]);
        if (err) marcarError(id, err);
      });
      const errTerm = validarTerminos(solicitud.titular.terminos);
      if (errTerm) marcarError('terminos', errTerm);

      const primerError = document.querySelector('[data-paso="3"] [aria-invalid="true"]');
      primerError?.focus();
      return;
    }
    irAPaso(4);
  });

  // --------------------------------------------------------------------------
  // Paso 4: Pago
  // --------------------------------------------------------------------------
  // Cambio de método de pago
  document.querySelectorAll('input[name="metodo-pago"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      solicitud.pago.metodo = radio.value;
      guardarEnStorage();
      render();
    });
  });

  // Tarjeta (máscara de 16 dígitos con grupos de 4)
  const inputTarjeta = document.getElementById('tarjeta');
  inputTarjeta?.addEventListener('input', (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formateado = raw.match(/.{1,4}/g)?.join(' ') || raw;
    inputTarjeta.value = formateado;
    solicitud.pago.tarjeta = raw;
    guardarEnStorage();

    if (inputTarjeta.getAttribute('aria-invalid') === 'true') {
      const error = validarTarjeta(raw);
      if (!error) limpiarError('tarjeta');
    }
  });

  inputTarjeta?.addEventListener('blur', () => {
    const error = validarTarjeta(solicitud.pago.tarjeta);
    if (error) marcarError('tarjeta', error);
    else limpiarError('tarjeta');
  });

  // Vencimiento (máscara MM/AA)
  const inputVenc = document.getElementById('vencimiento');
  inputVenc?.addEventListener('input', (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    inputVenc.value = raw;
    solicitud.pago.vencimiento = raw;
    guardarEnStorage();

    if (inputVenc.getAttribute('aria-invalid') === 'true') {
      const error = validarVencimiento(raw);
      if (!error) limpiarError('vencimiento');
    }
  });

  inputVenc?.addEventListener('blur', () => {
    const error = validarVencimiento(solicitud.pago.vencimiento);
    if (error) marcarError('vencimiento', error);
    else limpiarError('vencimiento');
  });

  // CVV (3 dígitos)
  const inputCVV = document.getElementById('cvv');
  inputCVV?.addEventListener('input', (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 3);
    inputCVV.value = raw;
    solicitud.pago.cvv = raw;

    if (inputCVV.getAttribute('aria-invalid') === 'true') {
      const error = validarCVV(raw);
      if (!error) limpiarError('cvv');
    }
  });

  inputCVV?.addEventListener('blur', () => {
    const error = validarCVV(solicitud.pago.cvv);
    if (error) marcarError('cvv', error);
    else limpiarError('cvv');
  });

  // Titular de la tarjeta
  const inputTitular = document.getElementById('titular-tarjeta');
  inputTitular?.addEventListener('input', (e) => {
    solicitud.pago.titular = e.target.value;
    guardarEnStorage();

    if (inputTitular.getAttribute('aria-invalid') === 'true') {
      const error = validarTitular(solicitud.pago.titular);
      if (!error) limpiarError('titular-tarjeta');
    }
  });

  inputTitular?.addEventListener('blur', () => {
    const error = validarTitular(solicitud.pago.titular);
    if (error) marcarError('titular-tarjeta', error);
    else limpiarError('titular-tarjeta');
  });

  // Botón "Pagar y contratar"
  const btnPagar = document.getElementById('btn-pagar');
  btnPagar?.addEventListener('click', async (e) => {
    e.preventDefault();
    const val = validarPaso4Completo(solicitud.pago);
    if (!val.esValido) {
      if (val.errores.tarjeta) marcarError('tarjeta', val.errores.tarjeta);
      if (val.errores.vencimiento) marcarError('vencimiento', val.errores.vencimiento);
      if (val.errores.cvv) marcarError('cvv', val.errores.cvv);
      if (val.errores.titular) marcarError('titular-tarjeta', val.errores.titular);

      const primerError = document.querySelector('[data-paso="4"] [aria-invalid="true"]');
      primerError?.focus();
      return;
    }

    // Estado cargando: deshabilitar botón y cambiar a "Procesando..." durante 1.5s
    btnPagar.disabled = true;
    const htmlOriginal = btnPagar.innerHTML;
    btnPagar.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Procesando...
    `;

    try {
      const resPago = await simularPago(solicitud.pago.tarjeta);
      if (resPago.ok) {
        solicitud.poliza = generarPoliza();
        solicitud.fechaEmision = obtenerFechaHoyFormateada();
        mostrarToast('¡Pago procesado con éxito!', 'success');
        irAPaso(5); // Éxito
      } else {
        mostrarToast('Tarjeta rechazada por la entidad bancaria', 'error');
        irAPaso(6); // Error de pago
      }
    } catch (err) {
      mostrarToast('Ocurrió un error al procesar el pago', 'error');
      irAPaso(6);
    } finally {
      btnPagar.disabled = false;
      btnPagar.innerHTML = htmlOriginal;
    }
  });

  // --------------------------------------------------------------------------
  // Paso 5: Éxito
  // --------------------------------------------------------------------------
  document.getElementById('btn-exito-reiniciar')?.addEventListener('click', () => {
    reiniciarSolicitud();
    mostrarToast('Solicitud reiniciada para una nueva contratación', 'info');
  });

  document.getElementById('btn-descargar-poliza')?.addEventListener('click', () => {
    descargarComprobantePoliza();
  });

  // --------------------------------------------------------------------------
  // Paso 6: Error de pago
  // --------------------------------------------------------------------------
  document.getElementById('btn-error-reintentar')?.addEventListener('click', () => {
    // Vuelve al Paso 4 conservando todos los datos cargados
    irAPaso(4);
    mostrarToast('Por favor verificá los datos de tu tarjeta', 'info');
  });

  document.getElementById('btn-error-cambiar-medio')?.addEventListener('click', () => {
    // Alterna método y vuelve a paso 4
    solicitud.pago.metodo = solicitud.pago.metodo === 'credito' ? 'debito' : 'credito';
    guardarEnStorage();
    irAPaso(4);
    mostrarToast(`Medio cambiado a tarjeta de ${solicitud.pago.metodo}`, 'info');
  });

  // --------------------------------------------------------------------------
  // Modo Oscuro (Bonus)
  // --------------------------------------------------------------------------
  const btnTema = document.getElementById('btn-toggle-tema');
  btnTema?.addEventListener('click', () => {
    const actual = document.documentElement.getAttribute('data-theme');
    const nuevo = actual === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nuevo);
    document.documentElement.classList.toggle('dark', nuevo === 'dark');
    localStorage.setItem('cubri_theme', nuevo);
    actualizarIconoTema(nuevo);
  });
}

// ============================================================================
// Helpers de Formato y UX
// ============================================================================

function formatearMascaraCelular(val) {
  const limpio = val.replace(/\D/g, '').slice(0, 10);
  if (limpio.length <= 2) return limpio;
  if (limpio.length <= 6) return `${limpio.slice(0, 2)} ${limpio.slice(2)}`;
  return `${limpio.slice(0, 2)} ${limpio.slice(2, 6)}-${limpio.slice(6)}`;
}

/**
 * Sistema de notificaciones Toast (Bonus)
 */
function mostrarToast(mensaje, tipo = 'info') {
  const contenedor = document.getElementById('toast-container');
  if (!contenedor) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  const colores = {
    success: 'text-emerald-600',
    error: 'text-red-600',
    info: 'text-indigo-600',
  };

  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <span class="${colores[tipo] || 'text-indigo-600'} font-bold">●</span>
      <span>${mensaje}</span>
    </div>
    <button class="text-slate-400 hover:text-slate-600 font-bold ml-2 focus:outline-none" aria-label="Cerrar">✕</button>
  `;

  toast.querySelector('button')?.addEventListener('click', () => {
    toast.remove();
  });

  contenedor.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(1rem)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }
  }, 3500);
}

/**
 * Inicializa y sincroniza el tema visual (light / dark)
 */
function inicializarTema() {
  const guardado = localStorage.getItem('cubri_theme') || 'light';
  document.documentElement.setAttribute('data-theme', guardado);
  document.documentElement.classList.toggle('dark', guardado === 'dark');
  actualizarIconoTema(guardado);
}

function actualizarIconoTema(tema) {
  const btn = document.getElementById('btn-toggle-tema');
  if (!btn) return;
  if (tema === 'dark') {
    btn.innerHTML = `
      <svg class="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
      </svg>
    `;
    btn.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    btn.innerHTML = `
      <svg class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    `;
    btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
}

/**
 * Descarga de póliza oficial en archivo de texto o recibo imprimible (Bonus)
 */
function descargarComprobantePoliza() {
  const planActual = getPlanes().find((p) => p.id === solicitud.plan) || { nombre: 'Plus' };
  const cuota = document.getElementById('exito-cuota')?.textContent || '$ 3.000';

  const contenido = `=====================================================
          CUBRÍ SEGUROS — PÓLIZA DIGITAL
=====================================================
Póliza N°:         ${solicitud.poliza || 'POL-2026-000123'}
Fecha de emisión:  ${solicitud.fechaEmision || new Date().toLocaleDateString('es-AR')}
Estado:            ACTIVA / VIGENTE

DATOS DEL TITULAR
Nombre completo:   ${solicitud.titular.nombre} ${solicitud.titular.apellido}
DNI:               ${solicitud.titular.dni}
Email de contacto: ${solicitud.titular.email}
Celular:           ${solicitud.titular.celular}

DATOS DEL EQUIPO ASEGURADO
Producto:          Seguro de Celular
Marca:             ${solicitud.equipo.marca}
Modelo:            ${solicitud.equipo.modelo}
Valor declarado:   ${formatearMoneda(solicitud.equipo.valor)}
Antigüedad:        ${solicitud.equipo.antiguedad}

DETALLES DE COBERTURA
Plan contratado:   ${planActual.nombre}
Cuota mensual:     ${cuota}
Método de pago:    Tarjeta de ${solicitud.pago.metodo} (terminada en ${solicitud.pago.tarjeta.slice(-4)})

=====================================================
Cubrí Seguros S.A. — 100% online, sin papeles ni demoras.
Atención al asegurado: ayuda@cubriseguros.com.ar
=====================================================`;

  const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${solicitud.poliza || 'POL-2026'}_Cubri_Seguros.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  mostrarToast('Descargando comprobante de póliza...', 'success');
}


})();
