# Constitución de Divisor de Cuenta Web

## Core Principles

### I. Responsabilidad Única (SRP)

Cada unidad de código DEBE tener una sola razón de cambio. El cálculo DEBE limitarse a calcular: no
DEBE validar entradas ni formatear resultados. La validación y el formato DEBEN residir en
responsabilidades separadas y comprobables.

### II. Abierto/Cerrado (OCP)

El diseño DEBE permitir agregar una nueva regla de redondeo mediante una nueva
implementación, sin modificar las funciones o módulos de cálculo existentes.

### III. Sustitución de Liskov (LSP)

Todas las estrategias de redondeo DEBEN cumplir el mismo contrato de entradas, salida y errores
y DEBEN poder sustituirse entre sí. El código consumidor NO DEBE consultar la implementación
concreta ni cambiar su comportamiento según la estrategia recibida.

### IV. Segregación de Interfaces (ISP)

Los contratos DEBEN ser pequeños y contener únicamente las operaciones que requieren sus
consumidores. Ninguna unidad de código DEBE depender de operaciones que no utiliza.
Los contratos PUEDEN expresarse mediante funciones, parámetros o módulos de JavaScript;
no se exigen interfaces formales de TypeScript.

### V. Inversión de Dependencias (DIP)

La capa `presentation` DEBE depender de abstracciones o contratos definidos en `domain` y NUNCA de
implementaciones concretas de `data`. Las dependencias concretas DEBEN inyectarse desde
`src/main.jsx`, el punto de composición del proyecto.

## Arquitectura y seguridad

- El código DEBE organizarse en las capas `presentation`, `domain` y `data`.
- La dirección de dependencias DEBE ser `presentation -> domain <- data`.
- Las capas DEBEN ubicarse en `src/presentation/`, `src/domain/` y `src/data/`, respectivamente.
- Los archivos de `src/domain/` DEBEN ser JavaScript puro: NO DEBEN importar React, contener JSX,
  depender del DOM, importar componentes de `presentation` ni depender de implementaciones concretas
  de `data`.
- `src/main.jsx` DEBE ser el único punto donde se instancian e inyectan implementaciones concretas.
- El repositorio NUNCA DEBE contener secretos ni claves de API.

## Calidad, pruebas y explicabilidad

- Toda funcionalidad crítica DEBE contar con pruebas ejecutables.
- Cada criterio de aceptación definido en una especificación DEBE convertirse en una
  prueba ejecutable.
- El estudiante DEBE poder explicar cada función generada por el agente: qué hace, por qué
  existe, qué recibe, qué devuelve y qué errores produce.
- La implementación DEBE respetar `specs/001-dividir-cuenta/spec.md` sin cambiar sus requisitos:
  los seis escenarios de aceptación, los mensajes exactos de validación, los dos modos de redondeo,
  el caso 2.345 → 2.35, la presentación con dos decimales, la prioridad monto → personas → propina
  y el funcionamiento sin conexión, sin red ni base de datos. Esta regla no añade funcionalidades.

## Governance

Esta constitución prevalece sobre las decisiones de implementación que la contradigan. Toda
enmienda DEBE documentar el cambio, actualizar la versión y verificar nuevamente el
cumplimiento. La versión sigue SemVer: MAYOR para cambios incompatibles en las reglas, MENOR
para principios o secciones nuevas y PARCHE para aclaraciones sin cambio semántico. Toda
revisión de especificaciones, planes, tareas y código DEBE comprobar estas reglas antes de
considerar el trabajo terminado.

Adaptación de Flutter a React realizada el 2026-10-09 a partir de la Constitution Flutter
versión 1.0.0, ratificada el 2026-10-01. Los cinco principios SOLID y el gobierno se conservan.
La versión React es 2.0.0 porque las obligaciones tecnológicas de lenguaje, rutas y punto de
composición cambiaron de manera incompatible con la implementación Flutter. La aprobación
de esta Constitution React todavía no está documentada.

**Version**: 2.0.0 | **Ratified**: TODO(RATIFICATION_DATE): aprobación React pendiente | **Last Amended**: 2026-10-09
