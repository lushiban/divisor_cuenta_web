import { crearResultado } from './resultado.js'
import { exigirEstrategia } from './estrategiaRedondeo.js'

export function calcularDivision(cuenta, estrategia, modo) {
  exigirEstrategia(estrategia)
  const { monto, personas, propinaPorcentaje } = cuenta
  const valorIndividual = {
    numerador: monto.numerador *
      (100n * propinaPorcentaje.denominador + propinaPorcentaje.numerador),
    denominador: monto.denominador * propinaPorcentaje.denominador * 100n * personas,
  }
  return crearResultado(estrategia.aplicar(valorIndividual), modo)
}
