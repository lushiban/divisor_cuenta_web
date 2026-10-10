# Bitácora de evidencia — React (Deber 2 SDD)

La tabla comparativa principal está en `../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/bitacora.md`. Este archivo conserva la evidencia técnica prevista en `specs/001-dividir-cuenta/plan.md` sin estimar datos personales.

| Comprobación | Resultado verificado |
|---|---|
| `npm test` | 13 aprobadas, 0 fallidas: seis casos del arreglo `casos`, una prueba LSP, tres de pantalla y tres comprobaciones complementarias. |
| `npm run build` | Código 0; Vite 8.3.4 generó HTML, CSS y JS; PWA 2.0.0 generó `dist/sw.js`, Workbox y 8 entradas de precache (246.40 KiB). |
| Spec Flutter frente a React | SHA-256 igual `0AAD31E32AB01BB5C4A138364004297A5390F2D2532FF5FFDE1914EA8C00F6C9`; bytes iguales; `git diff --no-index --exit-code` = 0. |
| Aislamiento de capas | `src/domain/` no importa React ni DOM; `calcularDivision.js` no valida ni formatea; `src/data/` implementa `aplicar(valor)`; `src/presentation/` no importa `src/data/`; `src/main.jsx` compone las implementaciones. |
| Uso web inicial | Chrome headless mostró la pantalla con `vite preview` en `127.0.0.1:4173`. |
| Uso sin servidor | Después de detener preview, un intento de recarga devolvió `net::ERR_CONNECTION_REFUSED`; otros intentos no entregaron DOM útil. No se confirmó funcionamiento offline ni primera apertura sin red. |
| Medición SC-001 | Pendiente de medición de uso humano desde pantalla lista hasta resultado. |
| Primer build y seis casos | El estudiante detuvo el cronómetro tras los seis casos; los minutos exactos están pendientes de registrar por él. |

No se creó backend, base de datos ni solicitud funcional a API/CDN. El precache es evidencia de construcción, no una prueba suficiente de recarga sin conexión.
