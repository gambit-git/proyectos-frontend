# GIFinder
Aplicación frontend desarrollada con Vite y TypeScript para consultar,
buscar y visualizar contenido multimedia mediante la API de Giphy.
## Tecnologías
HTML
CSS
TypeScript
Vite
PNPM
## Requisitos
- Node.js LTS
- PNPM
## Instalación
```bash
pnpm install
```
## Ejecución
```bash
pnpm dev
```
## Compilación
```bash
pnpm build
```
## Autor
Gerard Andrei Hincapie Mendez

## Funcionalidad EC1 F2 A3

El proyecto fue refactorizado en módulos para separar:
modelos y tipos;
datos locales;
servicios de búsqueda;
componentes de interfaz;
funciones auxiliares.

La aplicación permite buscar GIFs, consultar su detalle, cerrar el detalle y comunicar los estados de la interfaz.

## Verificación

## Funcionalidad EC1 F3 A4

GIFinder consulta GIPHY API para mostrar hasta 12 tendencias al iniciar,
realizar búsquedas y consultar el detalle de un GIF con la imagen original.
Enviar una búsqueda vacía recupera las tendencias. La interfaz muestra los
estados Initial, Loading, Success, Empty y Error.

Se conserva el proyecto anterior con Vite y TypeScript, sin React.
Los módulos se llaman ahora `gif.service.ts` y `gif-detail.ts`, como en la guía.
Al copiar estos archivos sobre el proyecto existente, retirar los antiguos
`src/services/gif.services.ts` y `src/components/gif_detail.ts`.

## Configuración de la API

1. Crear una clave individual en https://developers.giphy.com/.
2. Copiar `.env.example` como `.env.local`, junto a `package.json`.
3. Agregar la clave exclusivamente en `.env.local`:

```dotenv
VITE_GIPHY_API_KEY=TU_CLAVE
```

4. Reiniciar el servidor de Vite.

`.env.local` no debe publicarse. `.env.example` contiene la variable vacía.
Una variable `VITE_` se incluye en el código del cliente y puede observarse
en el navegador; no debe considerarse secreta.

## Verificación EC1 F3 A4

```bash
pnpm install
pnpm dev
pnpm build
git check-ignore -v .env.local
git ls-files .env.local
```

`git check-ignore` debe mostrar la regla de exclusión; `git ls-files` no debe
mostrar nada. No publicar `node_modules`, `dist` ni archivos con credenciales.

Comprobar tendencias, búsqueda, campo vacío, detalle, cierre, ausencia de
resultados, falta de clave, modo sin red y recuperación. En Network/Red revisar
GET, los endpoints `trending` y `search`, el estado HTTP y las secciones `data`,
`pagination` y `meta`. Para depurar, poner un punto de interrupción después de
`await fetch` en `requestGifs`, inspeccionar `response.ok` y `response.status`,
y avanzar hasta el mapeo y `showResults`.

La compilación fue verificada. La consulta real requiere configurar la clave
individual. Cuando funcione, eliminar `src/data/gifs.ts` y `src/utils/text.ts`,
como indica el paso 17; ya no se importan en la aplicación.

## Registro y entrega

Continuar en la rama `ec1-f3-a4-giphy-api`, que ya aparece en el proyecto recibido.
Conservar la carpeta `.git` del repositorio existente al copiar la actualización.
Después de realizar las pruebas y retirar los módulos obsoletos:

```bash
git status
git check-ignore -v .env.local
git ls-files .env.local
git add .env.example .gitignore src/vite-env.d.ts
git add src/models src/utils src/services
git commit -m "feat: configurar modelos y acceso a GIPHY API"
git add -A src public
git commit -m "feat: consumir GIPHY con Fetch y async await"
git add README.MD docs
git commit -m "docs: documentar integración con GIPHY API"
git push -u origin ec1-f3-a4-giphy-api
```

La publicación remota queda pendiente. Entregar el enlace al repositorio
accesible y explicar el flujo completo en la revisión presencial.
Las doce respuestas están en `docs/preguntas-cierre-f3-a4.md`.

## Referencias

- Guía EC1 F3 A4 proporcionada por el docente.
- https://developers.giphy.com/docs/api/
- https://developers.giphy.com/docs/api/schema/
- https://vite.dev/guide/env-and-mode
- Marca oficial: https://media.giphy.com/giphy-attribution-marks.zip
