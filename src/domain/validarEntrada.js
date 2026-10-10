import { crearCuenta } from './cuenta.js'

function leerDecimal(texto) {
  const normalizado = String(texto ?? '').trim()
  if (!/^\+?\d+(?:\.\d+)?$/.test(normalizado)) return null
  const sinSigno = normalizado.replace(/^\+/, '')
  const [entero, fraccion = ''] = sinSigno.split('.')
  return {
    numerador: BigInt(entero + fraccion),
    denominador: 10n ** BigInt(fraccion.length),
  }
}

export function validarEntrada({ monto, personas, propina } = {}) {
  const montoDecimal = leerDecimal(monto)
  if (!montoDecimal || montoDecimal.numerador <= 0n) return 'Monto inválido'

  const personasTexto = String(personas ?? '').trim()
  if (!/^\+?\d+$/.test(personasTexto) || BigInt(personasTexto) <= 0n) {
    return 'Debe haber al menos una persona'
  }

  const propinaDecimal = leerDecimal(propina)
  if (!propinaDecimal) return 'Propina inválida'

  return crearCuenta(montoDecimal, BigInt(personasTexto), propinaDecimal)
}
