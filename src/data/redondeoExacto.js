import { exigirRacional } from '../domain/estrategiaRedondeo.js'

export const redondeoExacto = Object.freeze({
  aplicar(valor) {
    exigirRacional(valor)
    const centavos = valor.numerador * 100n
    const cociente = centavos / valor.denominador
    const residuo = centavos % valor.denominador
    return cociente + (residuo * 2n >= valor.denominador ? 1n : 0n)
  },
})
