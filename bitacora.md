# Bitácora de evidencia — React (Deber 2 SDD)

La tabla comparativa principal está en `../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/bitacora.md`. Este archivo conserva la evidencia técnica prevista en `specs/001-dividir-cuenta/plan.md` sin estimar datos personales.

| Comprobación | Resultado verificado |
|---|---|
| `npm test` | 14 aprobadas, 0 fallidas: seis casos del arreglo `casos`, una prueba LSP, tres de pantalla (la primera también verifica cambio de modo y reemplazo) y cuatro comprobaciones complementarias. |
| `npm run build` | Código 0; Vite 8.3.4 generó HTML, CSS y JS; PWA 2.0.0 generó `dist/sw.js`, Workbox y 8 entradas de precache (246.40 KiB). |
| Spec Flutter frente a React | SHA-256 igual `0AAD31E32AB01BB5C4A138364004297A5390F2D2532FF5FFDE1914EA8C00F6C9`; bytes iguales; `git diff --no-index --exit-code` = 0. |
| Aislamiento de capas | `src/domain/` no importa React ni DOM; `calcularDivision.js` no valida ni formatea; `src/data/` implementa `aplicar(valor)`; `src/presentation/` no importa `src/data/`; `src/main.jsx` compone las implementaciones. |
| Uso web inicial | Chrome headless mostró la pantalla con `vite preview` en `127.0.0.1:4173`. |
| Uso sin conexión tras la carga inicial | Chrome 156 con service worker activo y `Network.emulateNetworkConditions(offline=true)` recargó la app; `navigator.onLine` fue `false`, la pantalla y cinco controles permanecieron visibles, y calculó 27.50 y luego 4.00 al cambiar de modo. El estudiante reprodujo manualmente la recarga y obtuvo 27.50 y 4.00 con Offline marcado. |
| Medición SC-001 | El estudiante informó 0:08.23 (8,23 segundos) desde la pantalla lista hasta mostrar 27.50 en un cálculo válido; una medición manual por debajo del límite de 30 segundos. |
| Primer build y seis casos | La bitácora comparativa Flutter contiene 12 minutos hasta el primer build, 31 minutos hasta los seis casos y 0 iteraciones, valores registrados por el estudiante. |

No se creó backend, base de datos ni solicitud funcional a API/CDN. Un primer intento de recarga con el servidor detenido devolvió `net::ERR_CONNECTION_REFUSED`; después de confirmar el service worker activo, la prueba CDP con red emulada offline sí comprobó recarga e interacción. En la prueba manual del 2026-10-10, después de seguir los pasos indicados para limpiar los datos del sitio y recargar con Offline marcado, el estudiante reportó `ERR_INTERNET_DISCONNECTED`. La primera apertura de esta entrega web sin recursos previos no funcionó en esa comprobación; FR-009/SC-005 no se declaran plenamente cumplidos y T043 permanece abierta hasta definir y verificar una entrega local si se exige esa apertura.
