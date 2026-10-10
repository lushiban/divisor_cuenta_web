import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { validarEntrada } from './domain/validarEntrada.js'
import { calcularDivision } from './domain/calcularDivision.js'
import { redondeoExacto } from './data/redondeoExacto.js'
import { redondeoHaciaArriba } from './data/redondeoHaciaArriba.js'
import { formateadorMoneda } from './presentation/formateadorMoneda.js'
import { PantallaDivisor } from './presentation/PantallaDivisor.jsx'
import './index.css'

const dependencias = {
  validarEntrada,
  calcularDivision,
  estrategias: {
    exacto: redondeoExacto,
    'hacia-arriba': redondeoHaciaArriba,
  },
  formateadorMoneda,
}

registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <StrictMode><PantallaDivisor dependencias={dependencias} /></StrictMode>,
)
