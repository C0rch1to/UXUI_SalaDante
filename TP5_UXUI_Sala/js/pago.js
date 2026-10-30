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
export function simularPago(numero) {
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
export function generarPoliza() {
  const anio = new Date().getFullYear();
  const contador = obtenerSiguienteNumeroPoliza();
  return `POL-${anio}-${String(contador).padStart(6, '0')}`;
}

/**
 * Devuelve la fecha actual formateada en DD/MM/AAAA para la vigencia
 * @returns {string}
 */
export function obtenerFechaHoyFormateada() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();
  return `${dia}/${mes}/${anio}`;
}
