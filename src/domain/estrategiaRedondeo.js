// Contrato común de todas las estrategias: racional no negativo -> centavos BigInt.
export function exigirRacional(valor) {
  if (typeof valor?.numerador !== 'bigint' ||
      typeof valor?.denominador !== 'bigint' ||
      valor.numerador < 0n || valor.denominador <= 0n) {
    throw new RangeError('Se requiere un racional no negativo')
  }
}

export function exigirEstrategia(estrategia) {
  if (typeof estrategia?.aplicar !== 'function') {
    throw new TypeError('La estrategia debe implementar aplicar(valor)')
  }
}
