export function crearResultado(pagoCentavos, modo) {
  if (typeof pagoCentavos !== 'bigint' || pagoCentavos < 0n) {
    throw new RangeError('El pago debe ser un entero de centavos no negativo')
  }
  return Object.freeze({ pagoCentavos, modo })
}
