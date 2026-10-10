# Respuestas — Deber 2 de SDD

Las seis preguntas siguientes fueron proporcionadas literalmente por el estudiante para este cierre. El archivo original `Deber2.md` no estuvo disponible. La evidencia procede de [analisis_spec.md](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/analisis_spec.md), los archivos de ambos proyectos y las verificaciones registradas; no se atribuyen mediciones personales no proporcionadas.

## Pregunta 1

> ¿Qué porcentaje de la spec viajó intacto, qué porcentaje necesitó adaptación y qué porcentaje no pudo reutilizarse? Justifica la clasificación con `analisis_spec.md` y el diff. Si registraste tiempo, inclúyelo como contexto, no como criterio único de calidad.

Según el [análisis manual](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/analisis_spec.md), se evaluaron **70 enunciados**: 70 QUÉ, 0 CÓMO y 0 MIXTO. **70/70 viajaron intactos (100 %), 0/70 necesitaron adaptación (0 %) y 0/70 no pudieron reutilizarse (0 %)**. El análisis cuenta apariciones repetidas y separa obligaciones comprobables dentro de una misma línea; no representa 70 funcionalidades distintas. Las expresiones «toca Calcular» permanecen porque también describen una interacción posible en React.

El [spec.md Flutter](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/specs/001-dividir-cuenta/spec.md) y el [spec.md React](specs/001-dividir-cuenta/spec.md) tienen el mismo SHA-256, `0AAD31E32AB01BB5C4A138364004297A5390F2D2532FF5FFDE1914EA8C00F6C9`, y `git diff --no-index --exit-code` no encontró diferencias. Los minutos hasta el primer build y hasta los seis casos aprobados figuran como **pendiente de registrar** en la [bitácora](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/bitacora.md). Esos tiempos serían contexto del proceso, no criterio único de calidad.

## Pregunta 2

> En la Constitution, clasifica cada regla como idéntica, adaptada en redacción o reemplazada. Explica por qué y cita evidencia de ambas constituciones.

La clasificación que sigue reproduce las decisiones del [análisis manual, sección 2](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/analisis_spec.md) y compara la [Constitution Flutter](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/.specify/memory/constitution.md) con la [Constitution React](.specify/memory/constitution.md). Las líneas L se refieren al archivo Flutter.

| Regla original | Clasificación manual | Evidencia en React |
|---|---|---|
| L007–L009, SRP a): «Cada clase» tiene una razón de cambio | Adaptada en redacción | «Cada unidad de código» conserva la responsabilidad única y cubre funciones y componentes. |
| L007–L009, SRP b) y c): el cálculo no valida ni formatea; validación y formato separados | Idénticas | El apartado I conserva literalmente esas obligaciones. |
| L013–L014, OCP: agregar redondeo sin modificar clases de cálculo | Adaptada en redacción | El apartado II conserva la extensión y habla de «funciones o módulos de cálculo». |
| L018–L020, LSP: sustituir implementaciones sin inspeccionar tipos concretos | Adaptada en redacción | El apartado III exige el mismo contrato de entradas, salida y errores y prohíbe consultar la implementación concreta; elimina la referencia a casts. |
| L024–L025, ISP: contratos pequeños y sin métodos no utilizados | Adaptada en redacción | El apartado IV mantiene contratos pequeños y admite funciones, parámetros o módulos JavaScript, sin exigir interfaces TypeScript. |
| L029–L031, DIP a) y b): `presentation` depende de `domain`, nunca de implementaciones `data` | Idénticas | El apartado V conserva ambas obligaciones. |
| L029–L031, DIP c): inyectar dependencias concretas desde `main.dart` | Adaptada en redacción | El apartado V conserva la inyección y cambia el punto de composición a `src/main.jsx`. |
| L035: capas `presentation`, `domain` y `data` | Idéntica | Arquitectura y seguridad mantiene las tres capas. |
| L036: `presentation -> domain <- data` | Idéntica | Arquitectura y seguridad mantiene la misma dirección. |
| L037–L038 a): `lib/domain/` en Dart puro | Adaptada en redacción | Se exige `src/domain/` en JavaScript puro. |
| L037–L038 b): el dominio no importa `package:flutter` | Adaptada en redacción | El dominio no importa React, JSX, DOM, presentación ni implementaciones `data`. |
| L039: `main.dart` como único punto que instancia implementaciones | Adaptada en redacción | `src/main.jsx` es el único punto de composición. |
| L040: no guardar secretos ni claves API | Idéntica | Arquitectura y seguridad conserva la prohibición literal. |
| L044: pruebas ejecutables para funcionalidad crítica | Idéntica | Calidad y pruebas conserva la regla literal. |
| L045–L046: prueba ejecutable por criterio de aceptación | Idéntica | Calidad y pruebas conserva la regla literal. |
| L047–L048: explicar función, propósito, entradas, salidas y errores | Idéntica | Calidad y pruebas conserva la misma obligación. |
| L052–L057: precedencia, enmiendas documentadas, SemVer y revisión de cumplimiento | Idéntica | Governance conserva el texto y la regla de versionado. |

El análisis manual identifica **ocho apartados atómicos adaptados en redacción** y **ningún principio reemplazado**. L059 es metadato de versión, no una regla clasificada. La Constitution React agrega una referencia explícita a los requisitos de la spec sin cambiarlos. La versión Flutter es 1.0.0, ratificada el 2026-10-01; la React es 2.0.0 por el cambio incompatible de lenguaje, rutas y punto de composición, y su aprobación aún no está documentada.

## Pregunta 3

> ¿Tuviste que modificar algún enunciado de la spec para implementar React? Si sí: transcribe la versión original, explica qué decisión técnica se había mezclado con el QUÉ, muestra la versión corregida y enlaza la evidencia del cambio separado. Si no, explica qué permitió reutilizar la spec sin cambios.

**No se modificó ningún enunciado.** El hash y el diff de los dos [archivos de spec](specs/001-dividir-cuenta/spec.md) confirman identidad byte por byte. Según el [análisis manual](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/analisis_spec.md), los 70 enunciados evaluados describen comportamiento observable; ninguno exige Flutter, Dart o un archivo técnico concreto. «Toca Calcular» tampoco obliga a un framework. El cambio de plataforma se expresó en la [Constitution React](.specify/memory/constitution.md), el [plan React](specs/001-dividir-cuenta/plan.md) y el código, conservando los seis escenarios, mensajes y FR-001–FR-011.

## Pregunta 4

> Compara los seis casos de aceptación de Flutter y React. ¿Cambió algún valor esperado, mensaje o escenario? Si cambió, explica si fue necesario por la tecnología o si fue un error de diseño/implementación.

Los archivos [Flutter](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/test/casos_de_prueba.dart) y [React](test/casosDePrueba.js) mantienen **los mismos seis escenarios, valores esperados y mensajes**:

| Escenario | Flutter y React |
|---|---|
| Reparto normal: 100.00, 4 personas, 10 %, exacto | 27.50 |
| Sin propina: 90.00, 3 personas, 0 %, exacto | 30.00 |
| Cero personas: 50.00, 0 personas | «Debe haber al menos una persona» |
| Monto no numérico, 4 personas | «Monto inválido» |
| Redondeo exacto: 10.00, 3 personas, 0 % | 3.33 |
| Redondeo hacia arriba: 10.00, 3 personas, 0 % | 4.00 |

Solo cambia la **representación en el lenguaje**: Dart usa `double.nan` y números `double`; JavaScript usa `Number.NaN` y cadenas para conservar los dos decimales del esperado. Ambos arreglos usan un no numérico para el escenario cuyo texto de la spec menciona «abc»; esa diferencia respecto del ejemplo textual ya existía en Flutter y no la introdujo React. El identificador del caso sigue siendo `arriba`; el test React lo traduce al selector interno `hacia-arriba` sin alterar el archivo de casos. La última ejecución registrada de `npm test` aprobó 14/14 pruebas, entre ellas los seis casos, LSP y tres pruebas de pantalla.

## Pregunta 5

> ¿Qué partes del plan Flutter dejaron de tener sentido en React? Da al menos tres ejemplos concretos y explica cómo se adaptaron.

La comparación del [plan Flutter](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/specs/001-dividir-cuenta/plan.md) con el [plan React](specs/001-dividir-cuenta/plan.md) muestra diferencias técnicas concretas:

1. **Estado y lenguaje.** Flutter planificó Dart 3.13.1 y `setState`; React planificó JavaScript, React 19, Vite 8 y `useState`, sin TypeScript ni gestor externo de estado. `setState` y Dart no corresponden al proyecto web.
2. **Rutas y composición.** Flutter ubicó el dominio en `lib/domain/` y la inyección en `main.dart`; React usa `src/domain/` y `src/main.jsx`. La dirección `presentation -> domain <- data` sí se conserva.
3. **Herramientas de prueba.** Flutter previó `flutter_test` para pruebas unitarias y widgets; React previó Vitest, Testing Library, jest-dom y jsdom para dominio e interfaz web.
4. **Dependencias y números.** El plan Flutter eliminó paquetes externos y convirtió entradas a números Dart. El plan React incluye dependencias de construcción/prueba y una representación decimal exacta con `BigInt` para el empate 2.345 → 2.35.
5. **Entrega sin conexión.** Flutter se ejecuta como aplicación de sus plataformas configuradas; React produce recursos web y prevé precache mediante `vite-plugin-pwa`. Esto permite comprobar recarga y cálculo offline tras obtener recursos, pero no demuestra una primera apertura sin ellos.

Son planes distintos: el Flutter tiene 159 líneas y el React 102. Un diff textual registró 62 líneas añadidas y 119 eliminadas; no mide tiempo ni líneas escritas manualmente.

## Pregunta 6

> ¿Qué artefacto fue el más reusable y cuál el menos reusable? Justifica ambas respuestas con evidencia del repositorio (diffs, archivos, pruebas o historial de Git).

La **spec fue la más reutilizable**: el análisis manual registra 70/70 enunciados intactos y el SHA-256 y diff confirman que los dos `spec.md` son idénticos byte por byte. Los [seis casos Flutter](../Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/test/casos_de_prueba.dart) y [React](test/casosDePrueba.js) conservan resultados y mensajes.

El **plan fue el menos reutilizable como texto técnico**: los [dos planes](specs/001-dividir-cuenta/plan.md) difieren en lenguaje, estado, herramientas, rutas, punto de composición y solución de entrega offline. El diff textual registró 62 altas y 119 bajas. La Constitution quedó entre ambos: conserva SOLID y gobierno, pero adapta ocho apartados atómicos de redacción tecnológica. Esto no implica pérdida de requisitos de negocio.

## Verificaciones y límites del cierre

La revisión Analyze trazó los 11 FR, 5 SC y seis escenarios. La skill oficial `$speckit-converge` se ejecutó y dejó pendiente la tarea **T043** relacionada con comprobar la primera apertura sin recursos previos. `npm test` aprobó 14/14 pruebas en la ejecución final anterior; `npm run build` terminó con código 0 y generó `dist/sw.js` y ocho entradas de precache.

Chrome 156 mostró un service worker activo. Tras una primera carga con recursos disponibles, se emuló la red desconectada (`Network.emulateNetworkConditions(offline=true)`, `navigator.onLine=false`); la página recargó, conservó sus controles y calculó 27.50 y luego 4.00. Esto verifica recarga, ingreso, selección y cálculo sin red **después** de disponer de recursos locales. Un intento anterior sin servidor devolvió `net::ERR_CONNECTION_REFUSED`. **La primera apertura offline sin recursos previamente obtenidos no se verificó; no se declara cumplimiento completo de ese caso.** Tampoco se midió SC-001 de menos de 30 segundos con una persona usuaria. Los minutos del cronómetro, las iteraciones y otras ediciones manuales siguen pendientes de registro por el estudiante.
