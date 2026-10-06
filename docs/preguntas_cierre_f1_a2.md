# Preguntas de cierre EC1 F1 A2

Gerard Andrei Hincapie Mendez

## 1. Modelo Gif
La interfaz `Gif` actúa como un contrato que define la estructura exacta que deben poseer los objetos de tipo GIF en la aplicación. Resuelve el problema de la falta de estructura e inconsistencia en los datos, previniendo errores en tiempo de desarrollo al forzar tipos de datos correctos para propiedades clave  y marcando propiedades opcionales.

## 2. Interfaz y objeto literal
Una interfaz es una estructura/contrato abstracto de TypeScript que define tipos y nombres de propiedades sin almacenar valores en memoria, desapareciendo tras la compilación. Un objeto literal es una instancia de JavaScript en tiempo de ejecución que contiene valores reales asignados a esas propiedades definidas.

## 3. Gif[] y el arreglo local
`Gif[]` especifica que la variable solo puede almacenar un arreglo cuyos elementos cumplan estrictamente con la interfaz Gif. Evita que se agreguen elementos con propiedades faltantes, tipos incorrectos (por ejemplo, números en vez de strings) o tipos no autorizados en rating.

## 4. Propiedades opcionales (`username` y `description`)
Se declaran opcionales porque no todos los GIFs provienen de un autor registrado o cuentan con un texto descriptivo. Esto permite representar con precisión la realidad de los datos sin obligar a usar cadenas vacías o valores ficticios.

## 5. Uso de `let` vs. `const`
En esta práctica se priorizó const porque las referencias a los elementos del DOM y arreglos no se reasignan. Se utilizaría let únicamente si se necesitara reasignar la variable completa de la colección filtrada o un contador mutable en un bucle imperativo tradicional.

## 6. Firma de funciones (Parámetros y Retornos)
normalizeText(value: string): string: Recibe una cadena de texto y devuelve la cadena limpia, en minúsculas y sin espacios a los extremos.

searchGifs(collection: Gif[], value: string): Gif[]: Recibe el arreglo original y el texto de búsqueda; devuelve un nuevo arreglo filtrado de tipo Gif[].

createGifCard(gif: Gif): string: Recibe un objeto de tipo Gif y devuelve una plantilla en cadena HTML que representa la tarjeta.

## 7. Métodos de arreglos
forEach: Ejecuta un callback sobre cada elemento sin retornar nada.
filter: Evalúa cada elemento y regresa un nuevo arreglo con los que cumplan la condición.
map: Transforma cada elemento del arreglo original y devuelve un nuevo arreglo de igual longitud.
find: Recorre el arreglo y devuelve el primer elemento que cumpla la condición (o undefined).

## 8. Manejo de `undefined` en `find`
find devuelve undefined si ningún elemento cumple el criterio dado. En la solución se controló utilizando el operador de encadenamiento opcional ?. y el operador coalescente nulo ?? (firstSafeGif?.title ?? 'Ninguno'), evitando errores de lectura en propiedades nulas.

## 9. Callbacks en la solución
Un callback es una función que se pasa a otra función como argumento para ser ejecutada posteriormente. Dos ejemplos en la solución:
El callback entregado a .filter() en searchGifs: (gif) => matchesQuery(gif, query)
El callback de transformación entregado a .map() en renderGifs: createGifCard

## 10. Ventajas de las Template Strings
Permiten la interpolación limpia de variables (${valor}) y la escritura de cadenas multilínea sin recurrir a concatenaciones complejas con +. Facilitan generar estructuras dinámicas como HTML dentro de JavaScript.

## 11. Destructuración y valores predeterminados
Permite extraer propiedades directamente en variables independientes de forma concisa. Se usó username = 'Autor no disponible' y description = 'Sin descripción' para garantizar que si la propiedad opcional venía como undefined, la interfaz visual mostrase un valor por defecto legible sin romper el maquetado.

## 12. Validación de `querySelector`
querySelector devuelve null si el elemento no existe en el documento HTML. Se validaron mediante una sentencia if (!form || !input || !gallery || !status) lanzando un error expreso; esto asegura a TypeScript que a partir de ese punto las variables son elementos del DOM válidos e interactivos.

## 13. Función de preventDefault
event.preventDefault() detiene el comportamiento por defecto de los formularios en HTML (el cual recarga la página al enviar los datos). Permite procesar la búsqueda de manera asíncrona mediante JavaScript/TypeScript en el cliente sin perder el estado actual.

## 14. Respuesta ante cero coincidencias
La función renderGifs evalúa si el arreglo filtrado tiene length === 0. Si es así, actualiza el estado de la aplicación indicando "0 resultados" en el elemento #search-status y renderiza en la galería un bloque .empty-state con un mensaje amigable indicando intentar con otra búsqueda.

## 15. Cambio futuro al integrar Giphy API
Los datos pasarán de ser un arreglo síncrono local a ser promesas asíncronas (Promise<Gif[]>) obtenidas mediante fetch. Se requerirán funciones async/await, manejo de errores de red (try/catch), estados de carga (*loading*) y un mapeador para transformar la respuesta JSON de la API externa al formato de la interfaz Gif.

## 16. Dificultades y resolución
Un error común durante el desarrollo fue el manejo del tipo posible null al obtener los valores de los elementos HTMLInputElement. Se resolvió agregando la aserción de tipo genérica document.querySelector<HTMLInputElement>('#search-input') y validando su existencia previa, logrando así que pnpm build compilara sin advertencias ni errores.