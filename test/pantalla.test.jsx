import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { PantallaDivisor } from '../src/presentation/PantallaDivisor.jsx'
import { validarEntrada } from '../src/domain/validarEntrada.js'
import { calcularDivision } from '../src/domain/calcularDivision.js'
import { redondeoExacto } from '../src/data/redondeoExacto.js'
import { redondeoHaciaArriba } from '../src/data/redondeoHaciaArriba.js'
import { formateadorMoneda } from '../src/presentation/formateadorMoneda.js'

afterEach(cleanup)

const dependencias = {
  validarEntrada,
  calcularDivision,
  estrategias: { exacto: redondeoExacto, 'hacia-arriba': redondeoHaciaArriba },
  formateadorMoneda,
}

function completar({ monto, personas, propina = '0' }) {
  render(<PantallaDivisor dependencias={dependencias} />)
  fireEvent.change(screen.getByLabelText(/Monto total/), { target: { value: monto } })
  fireEvent.change(screen.getByLabelText(/Número de personas/), { target: { value: personas } })
  fireEvent.change(screen.getByLabelText(/Porcentaje de propina/), { target: { value: propina } })
  fireEvent.click(screen.getByRole('button', { name: /Calcular/ }))
}

describe('pantalla del divisor', () => {
  it('muestra 27.50 para 100, 4 personas y 10% de propina', () => {
    completar({ monto: '100', personas: '4', propina: '10' })
    expect(within(screen.getByRole('status')).getByText('27.50')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Monto total/), { target: { value: '10' } })
    fireEvent.change(screen.getByLabelText(/Número de personas/), { target: { value: '3' } })
    fireEvent.change(screen.getByLabelText(/Porcentaje de propina/), { target: { value: '0' } })
    fireEvent.click(screen.getByRole('button', { name: /Calcular/ }))
    expect(within(screen.getByRole('status')).getByText('3.33')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('radio', { name: /Hacia arriba/ }))
    fireEvent.click(screen.getByRole('button', { name: /Calcular/ }))
    expect(within(screen.getByRole('status')).getByText('4.00')).toBeInTheDocument()
    expect(screen.queryByText('3.33')).not.toBeInTheDocument()
  })

  it('muestra el error exacto y ningún resultado con cero personas', () => {
    completar({ monto: '50', personas: '0' })
    expect(screen.getByRole('alert')).toHaveTextContent('Debe haber al menos una persona')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('muestra el error exacto y ningún resultado con monto abc', () => {
    completar({ monto: 'abc', personas: '4' })
    expect(screen.getByRole('alert')).toHaveTextContent('Monto inválido')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
