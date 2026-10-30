/**
 * js/cotizador.js — Cálculo de cuotas y formateo de monedas
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 */

export const FACTORES_ANTIGUEDAD = {
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
export function calcularCuota(valor, tasaAnual, antiguedad) {
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
export function formatearMoneda(monto) {
  if (typeof monto !== 'number' || isNaN(monto)) {
    return '$ 0';
  }
  return formateadorARS.format(monto);
}
