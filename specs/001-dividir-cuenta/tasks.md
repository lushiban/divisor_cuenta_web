---
description: "Tareas de implementación para 001-dividir-cuenta en React"
---

# Tasks: Dividir cuenta de restaurante en React

**Input**: `specs/001-dividir-cuenta/spec.md`, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/ui.md` y `.specify/memory/constitution.md`.

**Organization**: Fase 1 prepara el proyecto; fase 2 establece el dominio compartido; fases 3–5 completan, en prioridad P1→P2→P3, una historia de usuario cada una; fase 6 verifica el conjunto. Las fases solicitadas A–F quedan cubiertas así: A=T001–T005; B=T007–T011 y T029; C=T014 y T022; D=T015–T018, T023–T025 y T030–T031; E=T006, T012–T013, T019–T021, T026–T028, T032 y T037; F=T033–T042.

**Regla humana obligatoria**: T006 pertenece exclusivamente al estudiante. Ningún agente debe crear, completar, reemplazar ni modificar `test/casosDePrueba.js`. T012, T020 y T027 no pueden ejecutarse hasta que el estudiante entregue ese archivo manual con los seis casos originales. Las tareas de código y el primer build pueden ejecutarse mientras T006 siga pendiente; no se ejecutan ni se afirman pruebas de aceptación en ese intervalo. El código de prueba del agente debe adaptarse al contrato de exportación que el estudiante haya escrito, sin reescribir sus datos.

## Format: `[ID] [P?] [Story] Description`

- `[P]` indica archivos distintos y ausencia de dependencia inmediata entre esas tareas.
- `[US1]`, `[US2]` y `[US3]` corresponden a las tres historias de la spec.
- Cada tarea tiene un archivo o ruta exacta, referencias a requisitos y un resultado verificable. Todas las casillas permanecen abiertas; esta etapa no implementa tareas.

## Phase 1: Fase A — Preparación (Setup)

**Goal**: Disponer de estructura y herramientas de prueba, sin alterar la spec ni la Constitution.

- [X] T001 Instalar como dependencias de desarrollo Vitest compatible con Vite 8, `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`, `jsdom` y `vite-plugin-pwa` en `package.json` y `package-lock.json`; comprobar que no se añade TypeScript ni gestor externo de estado.
- [X] T002 Configurar Vitest en `vite.config.js` con entorno Node para dominio y jsdom para `test/pantalla.test.jsx`; comprobar que la configuración conserva React con Vite.
- [X] T003 Crear `test/setup.js` para registrar los matchers de `@testing-library/jest-dom/vitest`; comprobar que Vitest carga el archivo de preparación.
- [X] T004 Preparar las rutas `src/domain/`, `src/data/`, `src/presentation/` y `test/` conforme a `specs/001-dividir-cuenta/plan.md`; comprobar que no se crea backend, base de datos ni carpeta TypeScript.
- [X] T005 Añadir el script de ejecución única de Vitest en `package.json`; comprobar que el comando futuro de pruebas apunta a Vitest y no ejecuta el servidor en modo watch.

**Checkpoint**: El entorno permite escribir pruebas y el árbol previsto existe. T006 requiere T001–T005.

---

## Phase 2: Fase B — Domain compartido y bloqueo humano (Foundational)

**Goal**: Preparar valores y contratos JavaScript puros que usan las tres historias. La implementación del dominio puede avanzar mientras el estudiante escribe T006, pero ninguna prueba que importe sus casos puede avanzar sin él.

- [X] T006 **SOLO ESTUDIANTE, ESCRITURA MANUAL**: Escribir personalmente `test/casosDePrueba.js` con los seis escenarios de aceptación de `specs/001-dividir-cuenta/spec.md`, conservando entradas, modo y salida/mensaje exactos; dejar una exportación legible para `test/division.test.js`. Ningún agente ejecuta ni marca esta tarea.
- [X] T007 [P] Crear `src/domain/cuenta.js` como valor de cuenta validada con monto decimal positivo, personas enteras positivas y propina decimal no negativa, representando decimales exactamente con `BigInt`; comprobar que no importa React, JSX ni DOM.
- [X] T008 [P] Crear `src/domain/resultado.js` para representar `pagoCentavos` como `BigInt` no negativo y el modo aplicado, sin formato ni historial; comprobar que no contiene UI.
- [X] T009 [P] Definir en `src/domain/estrategiaRedondeo.js` el contrato mínimo `aplicar(valor)`: racional no negativo de entrada y centavos `BigInt` de salida, con comportamiento y errores iguales para cualquier estrategia; comprobar que no exige interfaz TypeScript ni inspección de tipo concreto.
- [X] T010 Crear en `src/domain/validarEntrada.js` la conversión de textos a `Cuenta` válida y la ruta de validación para los datos correctos; dejar la cobertura completa de errores y prioridad FR-006–FR-008/FR-011 para T029, sin cálculo ni formato. Depende de T007.
- [X] T011 Crear en `src/domain/calcularDivision.js` el cálculo sobre `Cuenta` válida: aplicar propina al monto antes de dividir por personas y entregar el racional individual a `aplicar(valor)` para construir `Resultado`; no validar ni formatear, ni consultar la implementación concreta (FR-003; depende de T007–T009).

**Checkpoint**: Los contratos y el cálculo puro están disponibles. Las historias requieren T007–T011; las pruebas basadas en los seis casos requieren además T006.

---

## Phase 3: User Story 1 — Dividir una cuenta exactamente (P1, MVP)

**Goal**: Mostrar el pago exacto con propina y dos decimales en una sola pantalla (FR-001, FR-003, FR-004; escenarios 1–3).

**Independent Test**: 100.00/4 con 10% → 27.50; 90.00/3 con 0% → 30.00; 10.00/3 con 0% → 3.33. El resultado usa dos decimales. Escribir y observar fallar las pruebas nuevas antes de implementar esta historia.

### Fase E — Pruebas de US1 antes de la implementación

- [X] T012 [P] [US1] Crear `test/division.test.js` importando el archivo manual terminado `test/casosDePrueba.js` y ejecutar primero los escenarios originales 1–3; exigir 27.50, 30.00 y 3.33 sin cambiar los datos manuales (SC-002; depende de T006 y T011).
- [X] T013 [P] [US1] Añadir la primera prueba de pantalla en `test/pantalla.test.jsx`: ingresar 100.00, 4 personas, 10% y modo exacto, activar «Calcular» y ver 27.50 (FR-001/FR-003; depende de T002–T003).

### Fases C y D — Data y Presentation de US1

- [X] T014 [P] [US1] Implementar `src/data/redondeoExacto.js` con `aplicar(valor)` que redondea racionales a centavos con mitad decimal hacia arriba, incluido 2.345 → 2.35, sin `Number.toFixed` como algoritmo (FR-004; depende de T009).
- [X] T015 [P] [US1] Implementar `src/presentation/formateadorMoneda.js` para convertir centavos `BigInt` a texto de exactamente dos decimales sin segundo redondeo ni símbolo monetario obligatorio (FR-004, SC-004; depende de T008).
- [X] T016 [US1] Implementar `src/presentation/useDivisor.js` con `useState` local y dependencias recibidas para validación, cálculo y estrategia exacta; un cálculo válido reemplaza el pago anterior y no guarda historial (FR-003/FR-010; depende de T010–T011 y T014).
- [X] T017 [US1] Implementar `src/presentation/PantallaDivisor.jsx` con entradas etiquetadas de monto, personas y propina, modo exacto y botón «Calcular», mostrando el pago formateado en una sola pantalla (FR-001/FR-003/FR-004; depende de T015–T016).
- [X] T018 [US1] Configurar `src/main.jsx` como único punto de composición que crea la estrategia exacta e inyecta validación, cálculo y formato en la presentación; comprobar `presentation → domain ← data` (DIP; depende de T014–T017).
- [X] T019 [US1] Ejecutar los escenarios 1–3 de `test/division.test.js` y la primera prueba de `test/pantalla.test.jsx`; cerrar US1 solo si ambos conjuntos pasan y el resultado tiene dos decimales (SC-002/SC-004; depende de T012–T018).

**Checkpoint**: MVP exacto verificable sin modo hacia arriba. T019 debe completarse antes de integrar US2.

---

## Phase 4: User Story 2 — Redondear el pago hacia arriba (P2)

**Goal**: Permitir seleccionar el modo hacia arriba y elevar la parte individual después de aplicar propina (FR-002, FR-005; escenario 4).

**Independent Test**: 10.00/3 con 0% y modo hacia arriba → 4.00; al sustituir la estrategia, el consumidor mantiene el mismo contrato. Escribir y observar fallar las pruebas nuevas antes de integrar el modo.

### Fase E — Pruebas de US2 antes de la implementación

- [X] T020 [P] [US2] Ampliar `test/division.test.js` con el escenario original 4 tomado de `test/casosDePrueba.js` y una prueba LSP que intercambie estrategias mediante `aplicar(valor)` sin inspeccionar tipos concretos; exigir 4.00 y el mismo contrato de salida (FR-005, OCP/LSP; depende de T006 y T019).
- [X] T021 [P] [US2] Añadir la tercera prueba de pantalla en `test/pantalla.test.jsx`: calcular 3.33 en exacto con 10.00/3/0%, cambiar a hacia arriba y recalcular para ver solo 4.00, sin el resultado anterior (FR-002/FR-005/FR-010; depende de T019).

### Fases C y D — Data y Presentation de US2

- [X] T022 [P] [US2] Implementar `src/data/redondeoHaciaArriba.js` con `aplicar(valor)`: techo de la parte individual racional ya calculada y salida en centavos `BigInt`, sin modificar `src/domain/calcularDivision.js` (FR-005, OCP; depende de T009; T020 queda pendiente hasta la escritura manual).
- [X] T023 [P] [US2] Ampliar `src/presentation/useDivisor.js` para seleccionar entre estrategias inyectadas y sustituir el resultado anterior al recalcular, sin importar `src/data/` (FR-002/FR-010, DIP; depende de T016 y T022; T020–T021 se ejecutarán después del archivo manual).
- [X] T024 [P] [US2] Ampliar `src/presentation/PantallaDivisor.jsx` con selector accesible de modo exacto/hacia arriba, manteniendo la misma pantalla y acción «Calcular» (FR-001/FR-002; depende de T017; T020–T021 se ejecutarán después del archivo manual).
- [X] T025 [US2] Instanciar e inyectar ambas estrategias exclusivamente en `src/main.jsx` y comprobar que ninguna implementación concreta se instancia en `src/presentation/` (DIP/ISP; depende de T022–T024).
- [X] T026 [US2] Ejecutar el escenario 4, la prueba LSP en `test/division.test.js` y la prueba de cambio de modo en `test/pantalla.test.jsx`; cerrar US2 solo con 4.00 y sustitución real del pago visible (SC-002/SC-004; depende de T020–T025).

**Checkpoint**: Ambos modos funcionan y se sustituyen por el mismo contrato; US1 sigue pasando.

---

## Phase 5: User Story 3 — Corregir entradas inválidas (P3)

**Goal**: Mostrar un solo mensaje exacto, sin pago, para entradas inválidas; priorizar monto → personas → propina (FR-006–FR-008/FR-011; escenarios 5–6).

**Independent Test**: 50.00 con 0 personas → «Debe haber al menos una persona» sin resultado; monto «abc» → «Monto inválido» sin resultado. Verificar también los demás bordes de la spec. Escribir y observar fallar las pruebas nuevas antes de completar esta historia.

### Fase E — Pruebas de US3 antes de la implementación

- [X] T027 [P] [US3] Ampliar `test/division.test.js` con escenarios originales 5–6 desde `test/casosDePrueba.js` y bordes: monto vacío/cero/negativo, personas negativas/decimales/no numéricas, propina negativa/no numérica y errores simultáneos; exigir mensaje literal único, prioridad monto → personas → propina y ausencia de resultado (FR-006–FR-008/FR-011, SC-003; depende de T006 y T026).
- [X] T028 [P] [US3] Añadir la segunda prueba de pantalla en `test/pantalla.test.jsx`: monto «abc», activar «Calcular», ver «Monto inválido» y ningún pago visible (FR-007; depende de T026).

### Fases B y D — Domain y Presentation de US3

- [X] T029 [US3] Completar `src/domain/validarEntrada.js`: monto vacío/cero/negativo/no numérico → «Monto inválido»; personas cero/negativas/decimales/no numéricas → «Debe haber al menos una persona»; propina negativa/no numérica → «Propina inválida»; retornar solo el primer error en orden monto → personas → propina, sin calcular (FR-006–FR-008/FR-011; depende de T010; T027 queda pendiente hasta la escritura manual).
- [X] T030 [US3] Ajustar `src/presentation/useDivisor.js` para limpiar pago previo y conservar solo el mensaje de error recibido cuando la validación falla; no fabricar ni reformular mensajes (FR-006–FR-008/FR-010; depende de T023 y T029).
- [X] T031 [US3] Ajustar `src/presentation/PantallaDivisor.jsx` para mostrar el único mensaje exacto y ocultar cualquier resultado ante entrada inválida (FR-006–FR-008/FR-011; depende de T024 y T030).
- [X] T032 [US3] Ejecutar `test/division.test.js` y `test/pantalla.test.jsx`; cerrar US3 solo si pasan los seis escenarios originales, la prueba LSP, los bordes de validación y exactamente tres pruebas de pantalla (SC-002/SC-003; depende de T027–T031).

**Checkpoint**: Las tres historias cumplen sus pruebas independientes y los errores no dejan pagos visibles.

---

## Phase 6: Fase F — Verificaciones finales y evidencia (Polish & Cross-Cutting)

**Goal**: Confirmar cumplimiento del conjunto sin cambiar los requisitos. Los resultados se registran con evidencia real, no con estimaciones.

- [X] T033 Preparar `bitacora.md` dentro del repositorio React para registrar evidencias y métricas de esta implementación, manteniendo intacta la bitácora Flutter; no inventar tiempos, iteraciones ni líneas manuales.
- [X] T034 Configurar en `vite.config.js` el precache de HTML, JS y CSS con `vite-plugin-pwa` y registrar el service worker desde `src/main.jsx`; comprobar que ingreso, selección y cálculo no realizan solicitudes a API/CDN/backend ni usan base de datos (FR-009/SC-005; depende de T025 y T031).
- [X] T035 Auditar `src/domain/`, `src/data/`, `src/presentation/` y `src/main.jsx` para confirmar SRP, OCP, LSP, ISP, DIP y `presentation → domain ← data`: dominio JavaScript puro, contrato `aplicar(valor)`, dependencias inyectadas y composición solo en `main.jsx`; registrar resultado en `bitacora.md` (depende de T032–T033).
- [X] T036 Ejecutar en `test/division.test.js` y `test/pantalla.test.jsx` comprobaciones de 2.345 → 2.35, mensajes exactos, prioridad, dos decimales y sustitución del resultado; registrar fallos concretos sin modificar `specs/001-dividir-cuenta/spec.md` (FR-004/FR-006–FR-008/FR-010–FR-011, SC-003/SC-004; depende de T032).
- [X] T037 Ejecutar toda la suite con el script de `package.json`, contar aprobadas/fallidas y documentar en `bitacora.md` la evidencia de seis escenarios, LSP y tres pruebas de pantalla; no afirmar éxito antes de ejecutarla (SC-002/SC-003/SC-004; depende de T032 y T036).
- [X] T038 Ejecutar `npm.cmd run build` desde la raíz React, comprobar salida de Vite y recursos de precache, e informar inmediatamente al estudiante la primera compilación exitosa para que registre el tiempo sin detener el cronómetro (depende de T034 y de los módulos implementados T007–T011, T014–T018, T022–T025 y T029–T031; no depende de T006 ni de las pruebas de aceptación T037).
- [X] T039 Seguir `specs/001-dividir-cuenta/quickstart.md` para comprobar, después de recibir los recursos, recarga e ingreso/selección/cálculo sin conexión; registrar en `bitacora.md` la evidencia y cualquier limitación de primera entrega web, sin declarar FR-009 cumplido sin verificación (FR-009/SC-005; depende de T033–T034 y T038).
- [X] T040 Comparar byte por byte `specs/001-dividir-cuenta/spec.md` con `C:\Users\eduta\Documents\Universidad\Semestre 3\Programacion de Apps\Programacion_asistida_de_apps\actividadsem7\divisor_cuenta\specs\001-dividir-cuenta\spec.md` y verificar SHA-256 `0AAD31E32AB01BB5C4A138364004297A5390F2D2532FF5FFDE1914EA8C00F6C9`; registrar resultado en `bitacora.md` sin modificar Flutter.
- [ ] T041 Medir desde pantalla lista hasta resultado visible para un cálculo válido y registrar tiempo real menor de 30 segundos o incumplimiento en `bitacora.md`, conforme a `specs/001-dividir-cuenta/quickstart.md` (SC-001; depende de T038).
- [ ] T042 Completar en `bitacora.md` solo las métricas sustentadas por evidencia, incluidos minutos hasta seis casos en verde, iteraciones reales y líneas escritas manualmente por el estudiante; detener el cronómetro solo cuando los seis casos React pasen y dejar `no registrado` donde corresponda (depende de T035–T041).

**Checkpoint**: FR-001–FR-011, escenarios 1–6, SC-001–SC-005 y los cinco principios SOLID tienen evidencia rastreable. Ninguna tarea autoriza cambiar la spec ni la Constitution.

---

## Trazabilidad de requisitos, escenarios y principios

| Origen | Tareas que lo implementan o verifican |
|---|---|
| FR-001 | T017, T024 |
| FR-002 | T023, T024, T025 |
| FR-003 | T011, T016, T017 |
| FR-004 | T014, T015, T036 |
| FR-005 | T022, T024, T026 |
| FR-006 | T027, T029, T030, T031 |
| FR-007 | T027, T028, T029, T031 |
| FR-008 | T027, T029, T030, T031 |
| FR-009 | T034, T039 |
| FR-010 | T016, T021, T023, T030 |
| FR-011 | T027, T029, T031 |
| Escenario 1 (100.00/4/10%, exacto → 27.50) | T006, T012, T013, T019 |
| Escenario 2 (90.00/3/0%, exacto → 30.00) | T006, T012, T019 |
| Escenario 3 (10.00/3/0%, exacto → 3.33) | T006, T012, T019 |
| Escenario 4 (10.00/3/0%, hacia arriba → 4.00) | T006, T020, T026 |
| Escenario 5 (50.00/0 personas → «Debe haber al menos una persona», sin resultado) | T006, T027, T032 |
| Escenario 6 (monto «abc» → «Monto inválido», sin resultado) | T006, T027, T028, T032 |
| SC-001 | T041 |
| SC-002 | T012, T020, T027, T032, T037 |
| SC-003 | T027, T028, T032, T036 |
| SC-004 | T015, T019, T026, T036 |
| SC-005 | T034, T039 |
| SRP | T010, T011, T015, T035 |
| OCP | T009, T022, T035 |
| LSP | T009, T020, T035 |
| ISP | T009, T025, T035 |
| DIP | T016, T018, T025, T035 |

## Dependencies & Execution Order

### Phase dependencies

1. Phase 1 (T001–T005) → Phase 2. T006 es una tarea humana dependiente del entorno de Phase 1.
2. T007–T011 establecen el dominio compartido. T012/T020/T027 requieren T006 terminado; ningún agente puede suplirlo. La implementación de código y T038 pueden avanzar sin T006.
3. El código de US1 → US2 → US3 avanza en orden de prioridad por los archivos compartidos `useDivisor.js` y `PantallaDivisor.jsx`; las tareas de pruebas T012–T013, T019–T021, T026–T028 y T032 esperan el archivo manual T006.
4. T034 y T038 pueden ejecutarse después de implementar el código, aunque T006 y la aceptación sigan pendientes. Las verificaciones de aceptación esperan T006; T039 requiere build T038 y recursos locales disponibles.

### User Story dependencies

| Story | Prerrequisitos | Comprobación independiente |
|---|---|---|
| US1, P1 | Código: T001–T005 y T007–T011; pruebas: T006 | Escenarios 1–3 y primera prueba de pantalla; T019 |
| US2, P2 | Código: T018; pruebas: T006 y T019 | Escenario 4, LSP y cambio visible de modo; T026 |
| US3, P3 | Código: T025; pruebas: T006 y T026 | Escenarios 5–6, demás invalidaciones y mensaje único; T032 |

### Parallel opportunities

- Foundation: T007, T008 y T009 pueden trabajarse en paralelo después de T004; T006 la realiza únicamente el estudiante.
- US1: T012 y T013 prueban archivos distintos cuando T006 exista; T014 y T015 implementan archivos distintos y pueden avanzar ahora.
- US2: T020 y T021 prueban archivos distintos cuando T006 exista; T022, T023 y T024 modifican archivos distintos y pueden avanzar ahora.
- US3: T027 y T028 agregan pruebas en archivos distintos cuando T006 exista; T029–T031 pueden avanzar ahora.
- No se marcan como paralelas tareas que editan `src/main.jsx`, `vite.config.js`, `useDivisor.js` o `PantallaDivisor.jsx` en fases diferentes.

## Parallel Example: User Story 1

```text
Tras T006 y T011:
T012: test/division.test.js — escenarios 1–3 desde casosDePrueba.js
T013: test/pantalla.test.jsx — primer escenario visual

Para la implementación actual, con contratos definidos y aunque T006 siga pendiente:
T014: src/data/redondeoExacto.js — aplicar(valor)
T015: src/presentation/formateadorMoneda.js — dos decimales
```

## Parallel Example: User Story 2

```text
Tras T019:
T020: test/division.test.js — escenario 4 y sustitución LSP
T021: test/pantalla.test.jsx — modo hacia arriba y reemplazo visible

Para la implementación actual, aunque T006 siga pendiente:
T022: src/data/redondeoHaciaArriba.js
T023: src/presentation/useDivisor.js
T024: src/presentation/PantallaDivisor.jsx
```

## Parallel Example: User Story 3

```text
Tras T026 y T006:
T027: test/division.test.js — escenarios 5–6 y prioridad de errores
T028: test/pantalla.test.jsx — «Monto inválido» sin pago
Para la implementación actual: T029 → T030 → T031. Después de T006: T027/T028 → T032.
```

## Implementation Strategy

**MVP first**: completar preparación y dominio; la escritura manual T006 y las pruebas quedan como puerta humana. La autorización actual permite implementar el código completo y compilar T038 antes de T006; T019/T026/T032 esperan los casos manuales y pruebas posteriores.

**Incremental delivery**: US2 agrega una nueva estrategia sin modificar el cálculo del dominio; US3 completa validaciones y presentación de errores. Cada historia conserva las pruebas de las anteriores. El cronómetro del deber continúa durante todas estas fases y solo se detendrá con los seis casos de aceptación React en verde.

**Alcance**: Ninguna tarea agrega autenticación, historial, persistencia, backend, base de datos, funcionalidad de red o requisitos fuera de la spec. La bitácora futura de React documentará evidencia sin tocar el proyecto Flutter.

## Phase 7: Convergence

- [ ] T043 Verificar en un navegador real la recarga, el ingreso, la selección y el cálculo sin conexión tras recibir los recursos; documentar el límite de primera apertura y, si se exige abrir por primera vez sin red, definir una entrega local compatible sin cambiar la spec, per FR-009/SC-005 (partial).
- [X] T044 Añadir una comprobación ejecutable del empate decimal 2.345 → 2.35 en modo exacto y del formato de dos decimales, per FR-004/SC-004 (partial).
- [X] T045 Completar comprobaciones ejecutables de propina inválida, prioridad monto → personas → propina y sustitución del resultado anterior, sin alterar los seis casos originales, per FR-006–FR-011/SC-003 (partial).
- [X] T046 Crear la bitácora React prevista por el plan y registrar solo evidencia verificable, remitiendo a la bitácora comparativa Flutter para métricas personales pendientes, per plan: Project Structure/T033 (missing).