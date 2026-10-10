# Respuestas — Deber 2 de SDD

> **Límite de la fuente:** `Deber2.md` no se encontró en los proyectos ni en las rutas del usuario disponibles en esta sesión. Las seis secciones siguientes responden los seis temas pedidos para el cierre; sus títulos **no** se presentan como transcripción de preguntas que no se pudieron leer.

## 1. Porcentajes de la especificación

El análisis que realizó el estudiante en el proyecto Flutter (`actividadsem7/divisor_cuenta/analisis_spec.md`, sección 3) distingue 70 proposiciones comprobables: 70 QUÉ, 0 CÓMO y 0 MIXTO. Según su clasificación, 70/70 viajan intactas a React (100 %), 0/70 necesitan adaptación (0 %) y 0/70 no son reutilizables (0 %). El análisis cuenta las apariciones repetidas como proposiciones del documento; no las confunde con funciones nuevas. «Toca Calcular» no obliga a usar Flutter, por lo que los escenarios que la contienen permanecen intactos.

## 2. Reglas de la Constitution

Los cinco principios SOLID siguen vigentes. El análisis manual clasifica como idénticas las obligaciones de separar cálculo, validación y formato; la dirección `presentation → domain ← data`; la prohibición de secretos; las pruebas de funcionalidad crítica y de cada criterio de aceptación; la explicabilidad; y las reglas de gobierno y SemVer. Clasifica como adaptadas en redacción las referencias a clases, interfaces formales, casts, Dart, `lib/domain/`, `package:flutter` y `main.dart`. En las filas L007–L009, L013–L014, L018–L020, L024–L025, L029–L031, L037–L038 y L039 hay ocho apartados atómicos adaptados según las letras del análisis manual. No clasifica ninguno como reemplazo del principio. La Constitution React usa unidades de código y contratos JavaScript, `src/domain/` y `src/main.jsx`; su versión 2.0.0 documenta el cambio tecnológico incompatible con la versión Flutter 1.0.0, sin inventar una ratificación React.

## 3. ¿Se modificó la spec para React?

No. El archivo Flutter `Programacion_asistida_de_apps/actividadsem7/divisor_cuenta/specs/001-dividir-cuenta/spec.md` y el React `divisor_cuenta_web/specs/001-dividir-cuenta/spec.md` son idénticos byte por byte. Ambos SHA-256 son `0AAD31E32AB01BB5C4A138364004297A5390F2D2532FF5FFDE1914EA8C00F6C9`; `git diff --no-index --exit-code` devolvió 0. Los seis escenarios, mensajes y FR-001–FR-011 se conservan. La adaptación tecnológica se hizo en Constitution, plan y código.

## 4. Comparación de los seis casos de aceptación

`test/casos_de_prueba.dart` de Flutter y `test/casosDePrueba.js` de React contienen, en el mismo orden, reparto normal → 27.50; sin propina → 30.00; cero personas → «Debe haber al menos una persona»; monto no numérico → «Monto inválido»; redondeo exacto → 3.33; y redondeo hacia arriba → 4.00. Las entradas de monto, personas y propina y los modos `exacto`/`arriba` conservan su significado. Dart representa montos y esperados como `double`; JavaScript conserva importes de entrada y esperados como texto para mantener los dos decimales. Dart usa `double.nan` y JavaScript `Number.NaN` para el caso no numérico. La spec formula ese escenario con el texto `abc`; ambos archivos de casos usan un valor no numérico y esperan el mismo mensaje. El test React adapta el identificador `arriba` al selector interno `hacia-arriba` sin modificar el arreglo del estudiante. `npm test` terminó con 14/14 pruebas: seis casos, LSP, tres de pantalla y cuatro verificaciones complementarias.

## 5. Diferencias concretas entre los planes

1. Flutter planifica Dart 3.13.1, Flutter y `setState`; React planifica JavaScript, React 19, Vite 8 y `useState`, sin TypeScript ni gestor externo de estado.
2. Flutter sitúa el dominio en `lib/domain/` y compone en `main.dart`; React sitúa el dominio en `src/domain/` y compone en `src/main.jsx`. Ambos conservan `presentation → domain ← data`.
3. Flutter prevé `flutter_test` para pruebas unitarias y de widgets; React prevé Vitest, Testing Library, jest-dom y jsdom para dominio e interfaz.
4. El plan Flutter evita paquetes externos y usa números Dart; el React añade dependencias de construcción/prueba y define racionales con `BigInt` para redondear 2.345 → 2.35 sin depender de coma flotante binaria.
5. Flutter se distribuye como app en las plataformas configuradas; React genera recursos web y precache con `vite-plugin-pwa`. El build generó el service worker y Chrome comprobó la recarga y el cálculo con red emulada offline después de la carga inicial; la primera apertura sin recursos previos no se verificó.

Los planes son archivos nuevos de cada tecnología, no ediciones del mismo archivo: Flutter tiene 159 líneas y React 102. Una comparación textual `git diff --no-index --numstat` reportó 62 líneas añadidas y 119 eliminadas; ese conteo depende de la alineación del diff y no mide tiempo de trabajo.

## 6. Artefactos más y menos reutilizables

La **spec** fue el artefacto más reutilizable: los 70 enunciados evaluados viajan intactos según el análisis manual y el archivo se copió byte por byte, con el mismo SHA-256. El **plan de implementación** fue el menos reutilizable como texto técnico: cambia lenguaje, framework, estado, herramientas de prueba, rutas, composición y estrategia numérica, como muestran ambos `plan.md`. La Constitution queda entre los dos: conserva SOLID y gobierno, pero adapta ocho apartados de redacción tecnológica. No se infiere de ello que alguna regla de negocio de la spec dejara de aplicarse.

## Estado verificable y límites

La revisión Analyze trazó los 11 FR, 5 SC y seis escenarios, y corrigió la dependencia que impedía compilar antes de recibir los casos. La skill oficial `$speckit-converge` se ejecutó y añadió cuatro tareas de cierre; las verificaciones de redondeo, prioridad y reemplazo ya pasaron. El build final terminó con código 0 y generó `dist/sw.js` y 8 entradas de precache. Chrome 156 registró un service worker activo. Con `Network.emulateNetworkConditions(offline=true)` y `navigator.onLine=false`, la recarga conservó la pantalla y cinco controles; los cálculos mostraron 27.50 en modo exacto y 4.00 después de cambiar a hacia arriba. Esto verifica ingreso, selección y cálculo offline **después** de recibir y almacenar los recursos. Un intento anterior sin servidor devolvió `net::ERR_CONNECTION_REFUSED`, y no se verificó la primera apertura desde un estado sin recursos. No se midió SC-001 (<30 segundos de uso humano). Los tiempos exactos del cronómetro, iteraciones y otras ediciones manuales permanecen pendientes de registro por el estudiante.
