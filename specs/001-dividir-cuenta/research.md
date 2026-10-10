# Research: Dividir cuenta en React

**Feature**: `001-dividir-cuenta` | **Date**: 2026-10-09

## Decisión 1: React, Vite y estado local

**Decision**: Conservar React 19 y Vite 8 declarados en `package.json`, usar módulos JavaScript y `useState` en `useDivisor.js`. No añadir TypeScript ni gestor externo de estado.

**Rationale**: Una pantalla y un cálculo a la vez no requieren estado global; el dominio puede permanecer independiente de React. El entorno local reportó Node v24.20.0, suficiente para los requisitos actuales de Vite/Vitest.

**Alternatives considered**: Redux/Zustand y TypeScript; no corresponden a las restricciones de este deber. [Vite 8 y requisitos de Node](https://vite.dev/blog/announcing-vite8).

## Decisión 2: Pruebas automáticas e interfaz

**Decision**: Preparar Vitest compatible con Vite 8 para `test/division.test.js` y React Testing Library con `@testing-library/dom`, `jsdom` y `@testing-library/jest-dom` para `test/pantalla.test.jsx`. Usar entorno Node para dominio y jsdom solo para pantalla. `test/casosDePrueba.js` queda reservado a la escritura manual del estudiante; `division.test.js` podrá consumir esos casos cuando existan.

**Rationale**: Vitest 4.1 anunció soporte de Vite 8 y reutiliza la configuración de Vite. Testing Library prueba la interfaz desde lo que observa el usuario. El archivo manual no coincide por sí solo con el patrón `*.test.js` de descubrimiento.

**Alternatives considered**: Jest con configuración paralela; añade configuración innecesaria. [Vitest 4.1](https://vitest.dev/blog/vitest-4-1.html), [configuración de Vitest](https://vitest.dev/config/), [entornos de Vitest](https://vitest.dev/config/environment), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Decisión 3: Aritmética decimal y contrato de redondeo

**Decision**: Convertir entradas decimales de texto a valores racionales exactos con enteros `BigInt` dentro del dominio. `calcularDivision.js` opera sobre esos valores sin redondeo intermedio. Cada estrategia implementa `aplicar(valor)` con `valor` racional positivo o cero y devuelve centavos enteros `BigInt`. Exacto redondea a centavos con regla decimal mitad hacia arriba; hacia arriba eleva la parte individual al siguiente entero antes de expresarla en centavos. `formateadorMoneda.js` convierte centavos a texto de dos decimales.

**Rationale**: El punto flotante binario y `toFixed` no garantizan todos los empates decimales; la spec exige 2.345 → 2.35. La misma forma de entrada/salida permite sustitución LSP y mantiene separado el formato.

**Alternatives considered**: `Number.toFixed(2)`, insuficiente como algoritmo de redondeo; librería decimal externa, innecesaria para este alcance. [MDN: toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed).

## Decisión 4: Disponibilidad sin conexión

**Decision**: Mantener el cálculo y los recursos de la interfaz sin llamadas a red, backend ni base de datos. Planificar precache de HTML, JavaScript y CSS de producción mediante service worker generado por `vite-plugin-pwa`, compatible con Vite 8 según su paquete actual. Validar ingreso, selección, cálculo y recarga tras activar el caché y desconectar la red. No cargar recursos de CDN.

**Rationale**: `vite build` produce recursos estáticos, pero una recarga offline necesita que esos recursos estén disponibles localmente. El precache cumple SC-005 después de la instalación. La compatibilidad concreta y el contenido del precache deben confirmarse al implementar y probar.

**Alternatives considered**: Solo cálculo en memoria, que no asegura recarga offline; servidor remoto o base de datos, contrarios a FR-009. [Vite: build](https://vite.dev/guide/build.html), [Vite PWA: precache](https://vite-pwa-org.netlify.app/guide/service-worker-precache), [Vite PWA: compatibilidad Vite 8](https://github.com/vite-pwa/vite-plugin-pwa/blob/main/package.json), [MDN: service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).

**Riesgo explícito**: Un usuario que nunca recibió los archivos no puede abrir un sitio remoto por primera vez sin conexión. La spec no define el medio de distribución. El plan no cambia FR-009: exige entregar previamente los recursos en el dispositivo o distribuir un paquete local y comprobar el uso íntegro sin conexión. El service worker solo resuelve recargas después de esa entrega; la modalidad concreta de entrega debe validarse antes de declarar FR-009 cumplido.

## Estado de aclaraciones

No quedan decisiones de arquitectura o comportamiento marcadas como `NEEDS CLARIFICATION`. La distribución inicial sin red es un riesgo de entrega documentado, no una autorización para reducir la exigencia offline.
