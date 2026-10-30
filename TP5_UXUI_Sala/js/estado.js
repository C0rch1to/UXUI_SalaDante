/**
 * js/estado.js — Único objeto de estado global para todo el flujo
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 */

export const solicitud = {
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
export function registrarRender(fn) {
  callbackRender = fn;
}

/**
 * Cambia el paso activo del flujo y vuelve a renderizar la vista.
 * @param {number} n - Nuevo índice de paso (0..6)
 */
export function irAPaso(n) {
  solicitud.paso = n;
  guardarEnStorage();
  if (typeof callbackRender === 'function') {
    callbackRender();
  }
}

/**
 * Reinicia la solicitud a los valores predeterminados y vuelve al inicio.
 */
export function reiniciarSolicitud() {
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
export function guardarEnStorage() {
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

export function cargarDeStorage() {
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

export function limpiarStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Ignorar
  }
}
