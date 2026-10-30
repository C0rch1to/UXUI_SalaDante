/**
 * js/validaciones.js — Funciones puras de validación
 * Licenciatura en Sistemas de Información · Diseño UX-UI (2026)
 *
 * Cada función recibe un valor y devuelve un string con el mensaje de error o null si es válido.
 */

export function validarMarca(marca, marcaOtro = '') {
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

export function validarModelo(modelo) {
  if (!modelo || typeof modelo !== 'string') {
    return 'Ingresá el modelo del equipo';
  }
  const limpio = modelo.trim();
  if (limpio.length < 2 || limpio.length > 40) {
    return 'Ingresá el modelo del equipo';
  }
  return null;
}

export function validarValor(valor) {
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

export function validarAntiguedad(antiguedad) {
  const permitidas = ['menos_1', '1_a_2', 'mas_2'];
  if (!antiguedad || !permitidas.includes(antiguedad)) {
    return 'Indicá la antigüedad';
  }
  return null;
}

export function validarNombre(nombre) {
  if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
    return 'Ingresá tu nombre';
  }
  return null;
}

export function validarApellido(apellido) {
  if (!apellido || typeof apellido !== 'string' || apellido.trim().length < 2) {
    return 'Ingresá tu apellido';
  }
  return null;
}

export function validarDNI(dni) {
  if (!dni) {
    return 'El DNI debe tener 7 u 8 números';
  }
  const limpio = String(dni).replace(/\D/g, '');
  if (!/^\d{7,8}$/.test(limpio)) {
    return 'El DNI debe tener 7 u 8 números';
  }
  return null;
}

export function validarFechaNacimiento(fecha) {
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

export function validarEmail(email) {
  if (!email || typeof email !== 'string') {
    return 'Ingresá un email válido';
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) {
    return 'Ingresá un email válido';
  }
  return null;
}

export function validarCelular(celular) {
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

export function validarTerminos(terminos) {
  if (!terminos) {
    return 'Tenés que aceptar los términos';
  }
  return null;
}

export function validarTarjeta(tarjeta) {
  if (!tarjeta) {
    return 'Número de tarjeta inválido';
  }
  const limpio = String(tarjeta).replace(/\s/g, '');
  if (!/^\d{16}$/.test(limpio)) {
    return 'Número de tarjeta inválido';
  }
  return null;
}

export function validarVencimiento(vencimiento) {
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

export function validarCVV(cvv) {
  if (!cvv) {
    return 'CVV inválido';
  }
  const limpio = String(cvv).replace(/\D/g, '');
  if (limpio.length !== 3) {
    return 'CVV inválido';
  }
  return null;
}

export function validarTitular(titular) {
  if (!titular || typeof titular !== 'string' || titular.trim().length < 2) {
    return 'Ingresá el nombre del titular';
  }
  return null;
}

// Helpers para evaluar la validez completa de un paso
export function validarPaso1Completo(equipo) {
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

export function validarPaso3Completo(titular) {
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

export function validarPaso4Completo(pago) {
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
