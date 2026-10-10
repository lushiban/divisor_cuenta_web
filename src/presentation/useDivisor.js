import { useState } from 'react'

export function useDivisor({ validarEntrada, calcularDivision, estrategias, formateadorMoneda }) {
  const [monto, setMonto] = useState('')
  const [personas, setPersonas] = useState('')
  const [propina, setPropina] = useState('0')
  const [modo, setModo] = useState('exacto')
  const [respuesta, setRespuesta] = useState(null)

  function calcular(evento) {
    evento?.preventDefault()
    const cuenta = validarEntrada({ monto, personas, propina })
    if (typeof cuenta === 'string') {
      setRespuesta({ error: cuenta })
      return
    }
    const resultado = calcularDivision(cuenta, estrategias[modo], modo)
    setRespuesta({ pago: formateadorMoneda(resultado.pagoCentavos), modo })
  }

  return {
    monto, setMonto, personas, setPersonas, propina, setPropina,
    modo, setModo, respuesta, calcular,
  }
}
