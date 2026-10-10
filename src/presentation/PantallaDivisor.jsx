import { useDivisor } from './useDivisor.js'

export function PantallaDivisor({ dependencias }) {
  const {
    monto, setMonto, personas, setPersonas, propina, setPropina,
    modo, setModo, respuesta, calcular,
  } = useDivisor(dependencias)

  return (
    <main className="app-shell">
      <header className="app-header">
        <span className="eyebrow">DIVISOR DE CUENTA</span>
        <h1>Compartir la cuenta, sin complicaciones.</h1>
        <p>Ingresa el total, las personas y la propina. Calcula cuánto paga cada una.</p>
      </header>

      <section className="calculator-card" aria-labelledby="form-title">
        <div className="card-heading">
          <div>
            <span className="step-label">01 / DATOS DE LA CUENTA</span>
            <h2 id="form-title">Tu cuenta</h2>
          </div>
          <div className="card-mark" aria-hidden="true">÷</div>
        </div>

        <form onSubmit={calcular} noValidate>
          <div className="field-grid">
            <label className="field">
              <span>Monto total</span>
              <span className="input-wrap"><span className="input-prefix" aria-hidden="true">$</span><input value={monto} onChange={(e) => setMonto(e.target.value)} inputMode="decimal" type="text" placeholder="0.00" autoComplete="off" /></span>
            </label>
            <label className="field">
              <span>Número de personas</span>
              <span className="input-wrap"><input value={personas} onChange={(e) => setPersonas(e.target.value)} inputMode="numeric" type="text" placeholder="Ej. 4" autoComplete="off" /></span>
            </label>
            <label className="field">
              <span>Porcentaje de propina</span>
              <span className="input-wrap"><input value={propina} onChange={(e) => setPropina(e.target.value)} inputMode="decimal" type="text" placeholder="0" autoComplete="off" /><span className="input-suffix" aria-hidden="true">%</span></span>
            </label>
          </div>

          <fieldset className="mode-group">
            <legend>Modo de redondeo</legend>
            <div className="mode-options">
              <label className={modo === 'exacto' ? 'mode-option selected' : 'mode-option'}>
                <input type="radio" name="modo" value="exacto" checked={modo === 'exacto'} onChange={() => setModo('exacto')} />
                <span><strong>Exacto</strong><small>Hasta dos decimales</small></span>
              </label>
              <label className={modo === 'hacia-arriba' ? 'mode-option selected' : 'mode-option'}>
                <input type="radio" name="modo" value="hacia-arriba" checked={modo === 'hacia-arriba'} onChange={() => setModo('hacia-arriba')} />
                <span><strong>Hacia arriba</strong><small>Al entero superior</small></span>
              </label>
            </div>
          </fieldset>
          <button className="calculate-button" type="submit">Calcular <span aria-hidden="true">→</span></button>
        </form>

        {respuesta?.error && <div className="feedback error" role="alert">{respuesta.error}</div>}
        {respuesta?.pago && (
          <div className="feedback result" role="status">
            <span className="result-label">PAGO POR PERSONA</span>
            <strong>{respuesta.pago}</strong>
            <span className="result-note">por persona · modo {respuesta.modo === 'exacto' ? 'exacto' : 'hacia arriba'}</span>
          </div>
        )}
      </section>
      <footer>Una cuenta. Cada quien sabe cuánto pagar.</footer>
    </main>
  )
}
