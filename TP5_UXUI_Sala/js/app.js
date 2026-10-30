/**
 * js/app.js — Orquestación del flujo, eventos, máscaras y lógica de interacción
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 */

import {
  solicitud,
  irAPaso,
  reiniciarSolicitud,
  registrarRender,
  cargarDeStorage,
  guardarEnStorage,
} from './estado.js';
import {
  render,
  setPlanes,
  getPlanes,
  renderResumen,
} from './render.js';
import {
  validarMarca,
  validarModelo,
  validarValor,
  validarAntiguedad,
  validarNombre,
  validarApellido,
  validarDNI,
  validarFechaNacimiento,
  validarEmail,
  validarCelular,
  validarTerminos,
  validarTarjeta,
  validarVencimiento,
  validarCVV,
  validarTitular,
  validarPaso1Completo,
  validarPaso3Completo,
  validarPaso4Completo,
} from './validaciones.js';
import { formatearMoneda } from './cotizador.js';
import { simularPago, generarPoliza, obtenerFechaHoyFormateada } from './pago.js';

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
export function mostrarToast(mensaje, tipo = 'info') {
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
