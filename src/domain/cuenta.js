export function crearCuenta(monto, personas, propinaPorcentaje) {
  return Object.freeze({
    monto: Object.freeze({ ...monto }),
    personas,
    propinaPorcentaje: Object.freeze({ ...propinaPorcentaje }),
  })
}
