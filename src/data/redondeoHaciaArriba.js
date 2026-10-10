import { exigirRacional } from '../domain/estrategiaRedondeo.js'

export const redondeoHaciaArriba = Object.freeze({
  aplicar(valor) {
    exigirRacional(valor)
    const entero = valor.numerador / valor.denominador
    const residuo = valor.numerador % valor.denominador
    return (entero + (residuo > 0n ? 1n : 0n)) * 100n
  },
})
