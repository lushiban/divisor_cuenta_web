# UI and module contracts: Dividir cuenta

**Feature**: `001-dividir-cuenta` | **Source**: [spec.md](../spec.md)

## Contrato visible para el usuario

Una sola pantalla ofrece entradas etiquetadas de monto total, número de personas y porcentaje de propina; selector de modo exacto o hacia arriba; botón «Calcular»; y una zona de resultado o un mensaje de error. Los controles serán accesibles por su nombre para pruebas con Testing Library. El pago se muestra con exactamente dos decimales.

| Escenario de aceptación original | Entrada y modo | Respuesta visible exigida |
|---|---|---|
| 1 | 100.00; 4 personas; 10%; exacto | 27.50 por persona |
| 2 | 90.00; 3 personas; 0%; exacto | 30.00 por persona |
| 3 | 10.00; 3 personas; 0%; exacto | 3.33 por persona |
| 4 | 10.00; 3 personas; 0%; hacia arriba | 4.00 por persona |
| 5 | 50.00; 0 personas | «Debe haber al menos una persona» y ningún resultado |
| 6 | «abc» como monto | «Monto inválido» y ningún resultado |

Los mensajes adicionales exigidos son «Propina inválida» para propina negativa/no numérica, «Monto inválido» para monto vacío/cero/negativo y «Debe haber al menos una persona» para personas negativas/decimales/no numéricas. Cuando coincidan errores, se muestra exactamente uno con prioridad monto → personas → propina. Un cálculo válido nuevo sustituye el resultado anterior.

## Contratos entre módulos

- `validarEntrada(entrada)`, en `src/domain/validarEntrada.js`: recibe los valores de pantalla; devuelve `Cuenta` válida o el mensaje literal del primer error. No calcula ni formatea.
- `calcularDivision(cuenta, estrategia)`, en `src/domain/calcularDivision.js`: recibe `Cuenta` validada y un objeto que satisface `aplicar(valor)`; aplica propina, divide y devuelve `Resultado`. No conoce React, DOM ni el tipo concreto de estrategia.
- `estrategia.aplicar(valor)`: recibe la parte individual como racional exacto no negativo y devuelve centavos `BigInt`. Ambas implementaciones de `src/data/` cumplen el mismo contrato; el consumidor no inspecciona su tipo.
- `formateadorMoneda(pagoCentavos)`, en `src/presentation/formateadorMoneda.js`: devuelve texto con exactamente dos decimales; no decide el modo ni vuelve a redondear.
- `useDivisor(dependencias)`, en `src/presentation/useDivisor.js`: recibe validación, cálculo y estrategias inyectadas; usa `useState` para entradas, modo, error y resultado. No importa `src/data/`.
- `PantallaDivisor` recibe dependencias desde `src/main.jsx` y presenta la interacción; no calcula la propina ni implementa reglas de redondeo.

## Pruebas previstas, aún no creadas

`test/division.test.js` comprobará los seis escenarios, los demás bordes y mensajes críticos, prioridad de errores, 2.345 → 2.35, sustitución LSP y dos decimales. `test/pantalla.test.jsx` tendrá tres pruebas: cálculo exacto visible; error de monto sin resultado; cambio a modo hacia arriba y reemplazo del resultado previo. `test/casosDePrueba.js` queda reservado para escritura manual del estudiante y no será creado por el agente.

## Disponibilidad

Ninguna interacción de ingreso, selección o cálculo requiere fetch, API, servidor de aplicación ni base de datos. Los recursos de producción deben estar disponibles localmente para que estas interacciones continúen tras desconectar. La primera entrega de recursos se trata como riesgo de distribución en [research.md](../research.md).
