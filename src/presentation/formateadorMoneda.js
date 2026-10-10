export function formateadorMoneda(pagoCentavos) {
  if (typeof pagoCentavos !== 'bigint' || pagoCentavos < 0n) {
    throw new RangeError('El pago debe ser un entero de centavos no negativo')
  }
  const enteros = pagoCentavos / 100n
  const decimales = (pagoCentavos % 100n).toString().padStart(2, '0')
  return `${enteros}.${decimales}`
}
