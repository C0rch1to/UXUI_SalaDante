/**
 * js/render.js — Funciones de renderizado reactivo a partir del estado
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 */

import { solicitud, irAPaso } from './estado.js';
import { calcularCuota, formatearMoneda } from './cotizador.js';
import {
  validarPaso1Completo,
  validarPaso3Completo,
  validarPaso4Completo,
} from './validaciones.js';

let cachePlanes = [];

/**
 * Establece los planes cargados desde el JSON local
 * @param {Array} planes 
 */
export function setPlanes(planes) {
  cachePlanes = planes;
}

export function getPlanes() {
  return cachePlanes;
}

/**
 * Función principal de renderizado: actualiza vistas, stepper y resúmenes.
 */
export function render() {
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

  // 2. Control de visibilidad del header y scroll
  window.scrollTo({ top: 0, behavior: 'smooth' });

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
export function renderStepper() {
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
      const line = item.querySelector('.step-line');

      if (idx < solicitud.paso) {
        // Estado: Completo (verde con check)
        circle.className = 'step-circle w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm bg-emerald-600 text-white shadow-sm transition-all duration-300';
        circle.innerHTML = `
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        `;
        if (label) {
          label.className = 'step-label text-xs sm:text-sm font-semibold text-emerald-600 transition-colors duration-300';
        }
        if (line) {
          line.className = 'step-line flex-1 h-0.5 bg-emerald-600 transition-colors duration-300';
        }
      } else if (idx === solicitud.paso) {
        // Estado: Activo (azul índigo)
        circle.className = 'step-circle w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm bg-indigo-600 text-white shadow-sm ring-4 ring-indigo-100 transition-all duration-300';
        circle.textContent = idx;
        if (label) {
          label.className = 'step-label text-xs sm:text-sm font-bold text-indigo-600 transition-colors duration-300';
        }
        if (line) {
          line.className = 'step-line flex-1 h-0.5 bg-slate-200 transition-colors duration-300';
        }
      } else {
        // Estado: Pendiente (gris)
        circle.className = 'step-circle w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm bg-white border border-slate-300 text-slate-400 transition-all duration-300';
        circle.textContent = idx;
        if (label) {
          label.className = 'step-label text-xs sm:text-sm font-medium text-slate-400 transition-colors duration-300';
        }
        if (line) {
          line.className = 'step-line flex-1 h-0.5 bg-slate-200 transition-colors duration-300';
        }
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
export function renderResumen() {
  const planActual = obtenerPlanSeleccionado();
  const cuota = planActual
    ? calcularCuota(solicitud.equipo.valor, planActual.tasaAnual, solicitud.equipo.antiguedad)
    : 0;

  const nombreEquipo = [solicitud.equipo.marca, solicitud.equipo.modelo]
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
