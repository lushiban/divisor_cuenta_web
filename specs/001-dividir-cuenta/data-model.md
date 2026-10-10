# Data Model: Dividir cuenta de restaurante

**Feature**: `001-dividir-cuenta` | **Source**: [spec.md](spec.md), FR-001–FR-011

Este documento describe valores y estados previstos. No crea código ni amplía las reglas de la spec.

## Cuenta (`src/domain/cuenta.js`)

| Campo | Representación planificada | Regla de validez |
|---|---|---|
| `monto` | Decimal exacto normalizado desde el texto de entrada | Numérico y mayor que cero; vacío, cero, negativo o no numérico → «Monto inválido» |
| `personas` | Entero positivo | Cero, negativo, decimal o no numérico → «Debe haber al menos una persona» |
| `propinaPorcentaje` | Decimal exacto normalizado | Numérico y no negativo; negativo o no numérico → «Propina inválida» |

`Cuenta` existe solo después de pasar validación. El monto y la propina se normalizan como racionales exactos con enteros `BigInt` (numerador/denominador), sin redondear el valor que introdujo el usuario. El dominio no conoce campos HTML ni eventos React.

## Representación decimal interna

Un racional usa `numerador: bigint` y `denominador: bigint > 0`. Se aplica la propina al monto antes de dividir entre `personas`. El valor individual exacto se entrega al contrato `aplicar(valor)` sin conversión previa a `Number` ni redondeo intermedio. Las estrategias producen centavos enteros `BigInt`; el formateador los presenta como dos dígitos decimales. Esta representación evita que el caso 2.345 → 2.35 dependa del formato binario del número.

## Modo de redondeo (`src/domain/estrategiaRedondeo.js`)

| Modo | Implementación prevista en `src/data/` | Operación exigida |
|---|---|---|
| Exacto | `redondeoExacto.js` | `aplicar(valor)`: redondear la parte individual a centavos, con mitad decimal hacia arriba |
| Hacia arriba | `redondeoHaciaArriba.js` | `aplicar(valor)`: elevar la parte individual al entero superior y expresarlo en centavos |

Las estrategias comparten entrada, salida y manejo de errores. `calcularDivision.js` no pregunta qué implementación recibió.

## Resultado de división (`src/domain/resultado.js`)

| Campo | Representación | Significado |
|---|---|---|
| `pagoCentavos` | Entero `BigInt` no negativo | Pago individual después de aplicar la estrategia |
| `modo` | Identificador del modo usado | Contexto del cálculo mostrado, sin historial |

`resultado.js` representa el dato calculado. `src/presentation/formateadorMoneda.js` recibe `pagoCentavos` y produce texto con exactamente dos decimales, sin aplicar otro redondeo ni agregar requisitos de símbolo monetario.

## Validación y prioridad

`src/domain/validarEntrada.js` recibe valores de entrada y comprueba, en este orden:

1. Monto: si es inválido, devuelve solo «Monto inválido».
2. Personas: si son inválidas, devuelve solo «Debe haber al menos una persona».
3. Propina: si es inválida, devuelve solo «Propina inválida».

No se muestra resultado cuando hay un error. Una propina de 0% conserva el monto original. No se fija un límite superior de propina porque la spec no lo fija. La validación no ejecuta el cálculo ni da formato al pago.

## Estado de pantalla (`src/presentation/useDivisor.js`)

| Estado | Contenido | Transición |
|---|---|---|
| Edición | Textos de monto, personas y propina; modo elegido | El usuario modifica una entrada o el modo |
| Error | Un mensaje literal; ningún pago visible | «Calcular» con entrada inválida |
| Resultado | Pago formateado con dos decimales; sin error | «Calcular» con entrada válida |
| Nuevo resultado | Sustituye al pago anterior | Otro «Calcular» válido |

`useState` mantiene únicamente estado local de la pantalla. Cada cálculo válido reemplaza el resultado anterior; no hay historial ni persistencia. La acción «Calcular» orquesta validación y cálculo a través de dependencias inyectadas, sin implementar esas responsabilidades dentro del hook.

## Relaciones

`Cuenta` validada → `calcularDivision` → `EstrategiaRedondeo.aplicar(valor)` → `Resultado` → `formateadorMoneda` → pantalla. La dirección de dependencias sigue `presentation → domain ← data`; `src/main.jsx` ensambla las dependencias concretas.
