# Implementation Plan: Dividir cuenta de restaurante en React

**Branch**: `main` (feature activo `001-dividir-cuenta`) | **Date**: 2026-10-09 | **Spec**: [spec.md](spec.md)

**Input**: Especificación original reutilizada de `specs/001-dividir-cuenta/spec.md`. El metadato `Feature Branch: sdd` pertenece al archivo original y permanece intacto; no describe la rama Git actual de React.

## Summary

Aplicación de una sola pantalla para dividir una cuenta con propina entre personas, con modos exacto y hacia arriba, validaciones y mensajes literales de la spec. Se desarrollará con React, Vite y JavaScript; `useState` mantendrá el estado local. La lógica de dominio será JavaScript puro y las estrategias de redondeo se inyectarán desde `src/main.jsx`. Los cálculos decimales usarán una representación exacta antes de aplicar el redondeo, para cumplir 2.345 → 2.35. La operación no usará backend, base de datos ni solicitudes externas. La distribución deberá permitir uso sin conexión, con precache de los recursos de producción.

## Technical Context

**Language/Version**: JavaScript ES modules; Node.js local v24.20.0. Sin TypeScript.

**Primary Dependencies**: React 19 y Vite 8 ya declarados; `vite-plugin-pwa` se prevé como dependencia de construcción para precache sin conexión. Sin gestor externo de estado.

**Storage**: Sin persistencia de datos, historial, cuentas ni base de datos. El caché del service worker guarda únicamente recursos estáticos de la aplicación para que la interfaz pueda abrirse después de la instalación sin conexión.

**Testing**: Vitest compatible con Vite 8; React Testing Library, `@testing-library/dom` y `jsdom` para interfaz; `@testing-library/jest-dom` para aserciones DOM. El archivo manual `test/casosDePrueba.js` será escrito exclusivamente por el estudiante en una etapa posterior.

**Target Platform**: Navegador moderno con soporte de ES modules, BigInt y service worker en contexto seguro (HTTPS o `localhost`); paquete web estático generado por Vite.

**Project Type**: Aplicación web React de una pantalla, sin backend.

**Performance Goals**: Cumplir SC-001: el usuario podrá completar un cálculo válido en menos de 30 segundos desde que la pantalla está lista; validar ese resultado con prueba de uso, sin atribuirlo todavía a mediciones.

**Constraints**: Seis escenarios de aceptación; mensajes exactos; dos decimales; prioridad monto → personas → propina; sin red ni base de datos para ingresar, seleccionar o calcular; resultado nuevo reemplaza el anterior; sin dependencias de React, JSX o DOM en `src/domain/`.

**Scale/Scope**: Una pantalla, una operación de cálculo a la vez, sin historial ni autenticación.

## Constitution Check

*GATE: Evaluado antes de Phase 0 y de nuevo después de Phase 1. El diseño no presenta violaciones conocidas; el cumplimiento ejecutable queda pendiente de implementación y pruebas.*

| Regla | Comprobación previa | Comprobación tras diseño |
|---|---|---|
| SRP | Validación, cálculo y formato tienen módulos distintos | `validarEntrada.js`, `calcularDivision.js` y `formateadorMoneda.js` separados |
| OCP y LSP | `aplicar(valor)` permite ampliar y sustituir estrategias | El cálculo solo recibe el contrato; exacto y hacia arriba no requieren ramificar por tipo concreto |
| ISP | Contrato de redondeo mínimo, sin interfaz formal TypeScript | Solo se exige `aplicar(valor)` |
| DIP | Presentación depende de dominio; composición en `src/main.jsx` | `useDivisor.js` recibe dependencias; no importa `src/data/` |
| Arquitectura | `presentation → domain ← data`; dominio puro | Árbol y contratos de Phase 1 respetan la dirección |
| Calidad | Se prevén pruebas para lo crítico y cada escenario | Seis casos, sustitución LSP, tres pruebas de pantalla y validación offline documentados |
| Seguridad y gobierno | Sin secretos, red funcional ni base de datos | Sin servicios externos ni cambios a la spec o la Constitution |

No se detectaron motivos para excepciones a la Constitution. El riesgo de primera carga totalmente desconectada se registra en [research.md](research.md); la solución prevista cubre recarga y uso sin conexión después de disponer localmente de los recursos.

## Project Structure

### Documentation (this feature)

```text
specs/001-dividir-cuenta/
├── spec.md                 # Original reutilizada; no se modifica
├── plan.md                 # Este plan (Phase 0/1)
├── research.md             # Decisiones y riesgos (Phase 0)
├── data-model.md           # Entidades y validación (Phase 1)
├── quickstart.md           # Guía de comprobación futura (Phase 1)
├── contracts/
│   └── ui.md               # Contrato de interacción y módulos (Phase 1)
└── tasks.md                # Tareas generadas por speckit-tasks
```

### Source Code (repository root; estructura prevista, sin crearla en esta etapa)

```text
src/
├── domain/
│   ├── cuenta.js
│   ├── resultado.js
│   ├── estrategiaRedondeo.js
│   ├── calcularDivision.js
│   └── validarEntrada.js
├── data/
│   ├── redondeoExacto.js
│   └── redondeoHaciaArriba.js
├── presentation/
│   ├── useDivisor.js
│   ├── formateadorMoneda.js
│   └── PantallaDivisor.jsx
└── main.jsx               # Único punto de composición e inyección

test/
├── setup.js               # Preparación de matchers DOM para Vitest
├── casosDePrueba.js        # Reservado al estudiante; no crear por el agente
├── division.test.js        # Seis escenarios y sustitución LSP
└── pantalla.test.jsx       # Tres pruebas de interfaz

vite.config.js              # Configuración futura de Vitest y precache
bitacora.md                 # Registro futuro de evidencias React
```

**Structure Decision**: Proyecto React único. `src/domain/` no importa React, JSX, DOM ni implementaciones de `data`. `src/data/` implementa el contrato del dominio. `src/presentation/` solo usa contratos/funciones del dominio y las dependencias recibidas; `src/main.jsx` construye las estrategias e inyecta validación y cálculo. Las carpetas de código y `test/` son previstas, no artefactos creados por este plan.

## Design and verification approach

1. `validarEntrada.js` valida en orden monto, personas y propina, devuelve una `Cuenta` válida o un único mensaje literal. No calcula ni formatea resultados.
2. `calcularDivision.js` recibe la cuenta válida y una estrategia `aplicar(valor)`. Calcula primero la propina sobre el monto y luego divide entre personas; no valida ni formatea.
3. Las estrategias convierten la parte individual a centavos: exacto aplica redondeo decimal de mitad hacia arriba a dos decimales; hacia arriba eleva primero al entero y devuelve sus centavos. El cálculo evita depender de los empates de coma flotante binaria.
4. `formateadorMoneda.js` presenta el resultado con exactamente dos decimales, sin alterar su valor. `useDivisor.js` coordina `useState`, validación, cálculo, error y reemplazo del resultado anterior.
5. `PantallaDivisor.jsx` ofrece monto, personas, propina, selector de modo y acción «Calcular». Los textos, seis resultados/mensajes y ausencia de resultado inválido se verifican contra [contracts/ui.md](contracts/ui.md).
6. Más adelante, Vitest comprobará los seis escenarios y la sustitución de estrategias; Testing Library comprobará tres comportamientos de pantalla. La verificación de uso offline incluirá recarga sin conexión después de instalar el caché de recursos.
7. No se crearán pruebas, código ni `test/casosDePrueba.js` en esta etapa. No se ejecutará `npm run build` durante la planificación.
