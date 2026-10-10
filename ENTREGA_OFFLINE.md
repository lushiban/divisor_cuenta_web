# Entrega local sin conexión

La aplicación tiene dos formas de entrega:

- `npm.cmd run build` genera la versión web PWA en `dist/`. Después de una primera carga, el service worker permite recargar y calcular sin conexión. Una primera visita a su URL sin recursos guardados devolvió `ERR_INTERNET_DISCONNECTED` en la prueba manual.
- `npm.cmd run build:offline` genera una copia local en `dist-offline/`. `vite-plugin-singlefile` incluye JavaScript y CSS en `index.html`; `favicon.svg` e `icons.svg` permanecen como archivos locales. Se debe copiar o comprimir **toda la carpeta**, conservando los tres archivos juntos. Esta copia abre mediante `file:///` y no necesita servidor para el cálculo.

## Preparación

Desde la raíz del proyecto React, con Node.js y las dependencias instaladas:

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run build
npm.cmd run build:offline
```

Para distribuirla, comprimir el contenido de `dist-offline/` manteniendo `index.html`, `favicon.svg` e `icons.svg` en la misma carpeta. La carpeta generada está ignorada por Git; el código fuente y la configuración permiten reconstruirla.

## Comprobación de primera apertura

1. Copiar la carpeta generada al equipo de prueba antes de desconectarlo.
2. Abrir un perfil de Chrome sin datos anteriores de la aplicación. Desactivar la conexión a internet de Windows; no usar `Offline` de DevTools para sustituir esta comprobación.
3. Abrir `index.html` desde Chrome y confirmar que la dirección empieza por `file:///`.
4. Calcular 100.00 entre 4 personas con 10 % de propina en modo exacto: debe mostrarse 27.50.
5. Calcular 10.00 entre 3 personas con 0 % de propina en modo hacia arriba: debe mostrarse 4.00.
6. Recargar con F5 y comprobar que la pantalla vuelve a abrirse.

El 2026-10-10, el estudiante informó que la apertura local, ambos resultados y F5 funcionaron siguiendo el procedimiento indicado. También informó que F5 restableció los valores iniciales de los campos; el estado del formulario no se conserva entre recargas y la spec no exige esa persistencia. Esta evidencia procede de su reporte manual; no se recibieron capturas ni se observó directamente su navegador durante la prueba.

La URL web hospedada sigue necesitando una obtención inicial de sus recursos. La entrega local proporciona esos recursos por archivo antes de la primera apertura, sin cambiar `spec.md`, los casos de aceptación ni la lógica de cálculo.
