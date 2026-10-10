# Quickstart de validación futura

**Feature**: `001-dividir-cuenta` | **Estado**: guía de comprobación para después de implementar. Ningún comando de esta guía se ejecutó durante la etapa de planificación.

## Prerrequisitos

Node.js compatible con Vite 8 y Vitest; el equipo local mostró v24.20.0. Al implementar, añadir Vitest, React Testing Library, `@testing-library/dom`, `jsdom`, `@testing-library/jest-dom` y soporte de precache; definir un script de pruebas en `package.json`. El estudiante escribirá personalmente `test/casosDePrueba.js` antes de usarlo como fuente de casos. Consultar [research.md](research.md) y [data-model.md](data-model.md).

## Comprobación futura

1. Instalar dependencias según `package-lock.json`: `npm.cmd ci` en Windows.
2. Ejecutar las pruebas futuras: `npm.cmd run test` (script por definir durante implementación). Confirmar seis escenarios de aceptación, sustitución LSP, bordes críticos y tres pruebas de pantalla.
3. Ejecutar `npm.cmd run build` y comprobar que Vite genera el paquete y los recursos necesarios para precache. Este será el primer build que se medirá para la bitácora; todavía no se ha ejecutado.
4. Iniciar `npm.cmd run preview` y abrir la dirección local que informe Vite. Comprobar los seis escenarios de [contracts/ui.md](contracts/ui.md) mediante los controles de la pantalla.
5. Hacer un cálculo exacto 2.345 → 2.35 y comprobar la prioridad cuando monto, personas y propina son inválidos simultáneamente.
6. Confirmar que el service worker ha guardado HTML, JS y CSS; desconectar la red en el navegador, recargar de forma normal y verificar ingreso, selección y cálculo. Revisar que no haya solicitudes a backend, CDN o base de datos. No declarar FR-009 cumplido si la distribución inicial no permite disponer de los recursos sin red.
7. Realizar una comprobación de uso para SC-001: medir desde la pantalla lista hasta resultado visible en un cálculo válido y comparar con el límite de 30 segundos; registrar evidencia real.

Al terminar la comprobación futura, detener `preview` de forma ordenada. No guardar datos de usuario entre sesiones ni crear historial.

## Resultados esperados

- Seis casos: 27.50, 30.00, 3.33, 4.00, «Debe haber al menos una persona» sin resultado y «Monto inválido» sin resultado.
- Propina inválida: «Propina inválida» sin resultado.
- Cada pago válido usa exactamente dos decimales; el siguiente cálculo válido reemplaza el anterior.
- La interfaz y el cálculo siguen disponibles sin conexión después de disponer localmente de los recursos.

Estos resultados son criterios de aceptación previstos, no pruebas ya ejecutadas.
