import assert from 'node:assert';
import fs from 'node:fs';
import { calcularCuota, formatearMoneda } from './js/cotizador.js';
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
} from './js/validaciones.js';
import { simularPago, generarPoliza } from './js/pago.js';

console.log('🧪 Iniciando verificación de reglas de negocio y casos de prueba...');

// 1. Verificar planes.json
const planesRaw = fs.readFileSync('./data/planes.json', 'utf8');
const planes = JSON.parse(planesRaw);
assert.strictEqual(planes.length, 3, 'Deben existir 3 planes');
assert.strictEqual(planes[0].id, 'basico');
assert.strictEqual(planes[1].id, 'plus');
assert.strictEqual(planes[2].id, 'premium');
assert.strictEqual(planes[1].recomendado, true, 'Plus debe ser el recomendado');
console.log('✅ data/planes.json verificado correctamente.');

// 2. Casos de prueba oficiales (Sección 5.1)
// Caso 1: Valor $ 600.000 · menos de 1 año → Básico $ 2.000 · Plus $ 3.000 · Premium $ 4.500
const c1_basico = calcularCuota(600000, 0.04, 'menos_1');
const c1_plus = calcularCuota(600000, 0.06, 'menos_1');
const c1_premium = calcularCuota(600000, 0.09, 'menos_1');
assert.strictEqual(c1_basico, 2000, `Caso 1 Básico falló: esperado 2000, obtenido ${c1_basico}`);
assert.strictEqual(c1_plus, 3000, `Caso 1 Plus falló: esperado 3000, obtenido ${c1_plus}`);
assert.strictEqual(c1_premium, 4500, `Caso 1 Premium falló: esperado 4500, obtenido ${c1_premium}`);
console.log('✅ Caso de prueba 1 verificado ($ 600.000 · menos de 1 año).');

// Caso 2: Valor $ 600.000 · 1 a 2 años → Básico $ 2.200 · Plus $ 3.300 · Premium $ 4.950
const c2_basico = calcularCuota(600000, 0.04, '1_a_2');
const c2_plus = calcularCuota(600000, 0.06, '1_a_2');
const c2_premium = calcularCuota(600000, 0.09, '1_a_2');
assert.strictEqual(c2_basico, 2200, `Caso 2 Básico falló: esperado 2200, obtenido ${c2_basico}`);
assert.strictEqual(c2_plus, 3300, `Caso 2 Plus falló: esperado 3300, obtenido ${c2_plus}`);
assert.strictEqual(c2_premium, 4950, `Caso 2 Premium falló: esperado 4950, obtenido ${c2_premium}`);
console.log('✅ Caso de prueba 2 verificado ($ 600.000 · 1 a 2 años).');

// Caso 3: Valor $ 1.200.000 · más de 2 años → Básico $ 5.000 · Plus $ 7.500 · Premium $ 11.250
const c3_basico = calcularCuota(1200000, 0.04, 'mas_2');
const c3_plus = calcularCuota(1200000, 0.06, 'mas_2');
const c3_premium = calcularCuota(1200000, 0.09, 'mas_2');
assert.strictEqual(c3_basico, 5000, `Caso 3 Básico falló: esperado 5000, obtenido ${c3_basico}`);
assert.strictEqual(c3_plus, 7500, `Caso 3 Plus falló: esperado 7500, obtenido ${c3_plus}`);
assert.strictEqual(c3_premium, 11250, `Caso 3 Premium falló: esperado 11250, obtenido ${c3_premium}`);
console.log('✅ Caso de prueba 3 verificado ($ 1.200.000 · más de 2 años).');

// 3. Validaciones unitarias
assert.strictEqual(validarMarca(''), 'Elegí una marca');
assert.strictEqual(validarMarca('Samsung'), null);

assert.strictEqual(validarModelo('a'), 'Ingresá el modelo del equipo');
assert.strictEqual(validarModelo('Galaxy A55'), null);

assert.strictEqual(validarValor('50.000'), 'El valor debe estar entre $100.000 y $2.500.000');
assert.strictEqual(validarValor('3.000.000'), 'El valor debe estar entre $100.000 y $2.500.000');
assert.strictEqual(validarValor('600.000'), null);
assert.strictEqual(validarValor(600000), null);

assert.strictEqual(validarAntiguedad(''), 'Indicá la antigüedad');
assert.strictEqual(validarAntiguedad('menos_1'), null);

assert.strictEqual(validarNombre('J'), 'Ingresá tu nombre');
assert.strictEqual(validarNombre('Juan'), null);

assert.strictEqual(validarApellido('P'), 'Ingresá tu apellido');
assert.strictEqual(validarApellido('Pérez'), null);

assert.strictEqual(validarDNI('12345'), 'El DNI debe tener 7 u 8 números');
assert.strictEqual(validarDNI('30123456'), null);
assert.strictEqual(validarDNI('7123456'), null);

assert.strictEqual(validarFechaNacimiento('2020-01-01'), 'Tenés que ser mayor de edad');
assert.strictEqual(validarFechaNacimiento('1990-05-15'), null);

assert.strictEqual(validarEmail('juan.perez@'), 'Ingresá un email válido');
assert.strictEqual(validarEmail('juan.perez@mail.com'), null);

assert.strictEqual(validarCelular('11234'), 'Ej.: 11 5555-1234');
assert.strictEqual(validarCelular('011 5555 1234'), 'Ej.: 11 5555-1234');
assert.strictEqual(validarCelular('15 5555 1234'), 'Ej.: 11 5555-1234');
assert.strictEqual(validarCelular('11 5555-1234'), null);

assert.strictEqual(validarTerminos(false), 'Tenés que aceptar los términos');
assert.strictEqual(validarTerminos(true), null);

assert.strictEqual(validarTarjeta('1234'), 'Número de tarjeta inválido');
assert.strictEqual(validarTarjeta('4111 1111 1111 1111'), null);

assert.strictEqual(validarVencimiento('13/28'), 'Vencimiento inválido');
assert.strictEqual(validarVencimiento('01/20'), 'Vencimiento inválido'); // pasado
assert.strictEqual(validarVencimiento('12/28'), null);

assert.strictEqual(validarCVV('12'), 'CVV inválido');
assert.strictEqual(validarCVV('1234'), 'CVV inválido');
assert.strictEqual(validarCVV('123'), null);

assert.strictEqual(validarTitular(''), 'Ingresá el nombre del titular');
assert.strictEqual(validarTitular('Juan Pérez'), null);
console.log('✅ Todas las funciones de validación pasaron las pruebas unitarias.');

// 4. Pago simulado
console.log('⏳ Verificando simulación de pago...');
const resAprobado = await simularPago('4111 1111 1111 1111');
assert.strictEqual(resAprobado.ok, true, '4111... debe aprobarse');

const resRechazado = await simularPago('4000 0000 0000 0002');
assert.strictEqual(resRechazado.ok, false, '4000 0000 0000 0002 debe rechazarse');
assert.strictEqual(resRechazado.motivo, 'Tarjeta rechazada');

// Formato de póliza: POL-AAAA-NNNNNN
const pol = generarPoliza();
assert.match(pol, /^POL-\d{4}-\d{6}$/, `La póliza ${pol} no cumple con POL-AAAA-NNNNNN`);
console.log(`✅ Pago simulado y generación de póliza (${pol}) verificados.`);

console.log('\n🎉 ¡TODAS LAS PRUEBAS PASARON EXITOSAMENTE (100% CUMPLIMIENTO CON LA CONSIGNA)!');
