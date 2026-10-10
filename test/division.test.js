// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { casos } from './casosDePrueba.js'
import { validarEntrada } from '../src/domain/validarEntrada.js'
import { calcularDivision } from '../src/domain/calcularDivision.js'
import { redondeoExacto } from '../src/data/redondeoExacto.js'
import { redondeoHaciaArriba } from '../src/data/redondeoHaciaArriba.js'
import { formateadorMoneda } from '../src/presentation/formateadorMoneda.js'
import { useDivisor } from '../src/presentation/useDivisor.js'

const estrategias = {
  exacto: redondeoExacto,
  'hacia-arriba': redondeoHaciaArriba,
}

// El archivo original usa "arriba"; la pantalla React identifica ese modo como "hacia-arriba".
const modoReact = (modo) => modo === 'arriba' ? 'hacia-arriba' : modo

describe('seis casos de aceptación de la spec', () => {
  for (const caso of casos) {
    it(caso.nombre, () => {
      const entrada = {
        monto: caso.monto,
        personas: caso.personas,
        propina: caso.propina,
      }
      const validacion = validarEntrada(entrada)
      const calcularEspia = vi.fn(calcularDivision)
      const { result } = renderHook(() => useDivisor({
        validarEntrada,
        calcularDivision: calcularEspia,
        estrategias,
        formateadorMoneda,
      }))

      act(() => {
        result.current.setMonto(String(caso.monto))
        result.current.setPersonas(String(caso.personas))
        result.current.setPropina(String(caso.propina))
        result.current.setModo(modoReact(caso.modo))
      })
      act(() => result.current.calcular())

      if (caso.errorEsperado !== undefined) {
        expect(validacion).toBe(caso.errorEsperado)
        expect(result.current.respuesta).toEqual({ error: caso.errorEsperado })
        expect(result.current.respuesta.pago).toBeUndefined()
        expect(calcularEspia).not.toHaveBeenCalled()
      } else {
        expect(typeof validacion).toBe('object')
        expect(calcularEspia).toHaveBeenCalledTimes(1)
        expect(Number(result.current.respuesta.pago)).toBeCloseTo(Number(caso.esperado), 2)
        expect(result.current.respuesta.pago).toBe(caso.esperado)
      }
    })
  }
})

it('LSP: sustituir la estrategia conserva el contrato del consumidor', () => {
  const cuenta = validarEntrada({ monto: '10.00', personas: 3, propina: 0 })
  const consumir = (estrategia) => calcularDivision(cuenta, estrategia)
  const exacto = consumir(redondeoExacto)
  const arriba = consumir(redondeoHaciaArriba)

  expect(typeof exacto.pagoCentavos).toBe('bigint')
  expect(typeof arriba.pagoCentavos).toBe('bigint')
  expect(Object.keys(arriba)).toEqual(Object.keys(exacto))
  expect(exacto.pagoCentavos).toBe(333n)
  expect(arriba.pagoCentavos).toBe(400n)
})

it('redondea 2.345 a 2.35 y conserva dos decimales', () => {
  const cuenta = validarEntrada({ monto: '2.345', personas: 1, propina: 0 })
  const resultado = calcularDivision(cuenta, redondeoExacto)
  expect(formateadorMoneda(resultado.pagoCentavos)).toBe('2.35')
})

it('prioriza monto, personas y propina y rechaza cada entrada inválida', () => {
  const entradas = [
    [{ monto: '0', personas: 0, propina: 'abc' }, 'Monto inválido'],
    [{ monto: '50', personas: 0, propina: 'abc' }, 'Debe haber al menos una persona'],
    [{ monto: '50', personas: 2, propina: 'abc' }, 'Propina inválida'],
  ]
  for (const [entrada, mensaje] of entradas) {
    expect(validarEntrada(entrada)).toBe(mensaje)
  }
})

it('un cálculo válido reemplaza el resultado anterior', () => {
  const { result } = renderHook(() => useDivisor({
    validarEntrada, calcularDivision, estrategias, formateadorMoneda,
  }))
  act(() => {
    result.current.setMonto('100.00')
    result.current.setPersonas('4')
    result.current.setPropina('10')
  })
  act(() => result.current.calcular())
  expect(result.current.respuesta.pago).toBe('27.50')

  act(() => {
    result.current.setMonto('10.00')
    result.current.setPersonas('3')
    result.current.setPropina('0')
  })
  act(() => result.current.calcular())
  expect(result.current.respuesta).toEqual({ pago: '3.33', modo: 'exacto' })
})
it('rechaza todos los bordes inválidos descritos sin calcular', () => {
  const invalidos = [
    [{ monto: '', personas: 2, propina: 0 }, 'Monto inválido'],
    [{ monto: '0', personas: 2, propina: 0 }, 'Monto inválido'],
    [{ monto: '-1', personas: 2, propina: 0 }, 'Monto inválido'],
    [{ monto: 'abc', personas: 2, propina: 0 }, 'Monto inválido'],
    [{ monto: '50', personas: 0, propina: 0 }, 'Debe haber al menos una persona'],
    [{ monto: '50', personas: -1, propina: 0 }, 'Debe haber al menos una persona'],
    [{ monto: '50', personas: '1.5', propina: 0 }, 'Debe haber al menos una persona'],
    [{ monto: '50', personas: 'abc', propina: 0 }, 'Debe haber al menos una persona'],
    [{ monto: '50', personas: 2, propina: -1 }, 'Propina inválida'],
    [{ monto: '50', personas: 2, propina: 'abc' }, 'Propina inválida'],
    [{ monto: '', personas: 0, propina: 'abc' }, 'Monto inválido'],
  ]

  for (const [entrada, mensaje] of invalidos) {
    const calcularEspia = vi.fn(calcularDivision)
    const { result, unmount } = renderHook(() => useDivisor({
      validarEntrada, calcularDivision: calcularEspia,
      estrategias, formateadorMoneda,
    }))
    act(() => {
      result.current.setMonto(String(entrada.monto))
      result.current.setPersonas(String(entrada.personas))
      result.current.setPropina(String(entrada.propina))
    })
    act(() => result.current.calcular())
    expect(result.current.respuesta).toEqual({ error: mensaje })
    expect(calcularEspia).not.toHaveBeenCalled()
    unmount()
  }
})