# Preguntas de cierre - EC1 F3 A4

Gerard Andrei Hincapié Méndez

Respuestas de apoyo para revisar y adaptar después de realizar la práctica personal.

## 1. ¿Qué diferencia existe entre una operación síncrona y una asíncrona?

Una operación síncrona entrega su resultado antes de continuar con la siguiente instrucción. Por ejemplo, mapGiphyGif transforma un objeto que ya está en memoria. Una operación asíncrona puede terminar después: fetch espera una respuesta de internet mientras el navegador sigue atendiendo otros eventos. Con await se suspende la función que espera, sin congelar toda la página.

## 2. ¿Cuáles son los estados de una promesa y qué relación tienen con async/await?

Los estados son pending, fulfilled y rejected: pendiente, cumplida y rechazada. Una función async siempre devuelve una promesa; await permite obtener su resultado o propagar su rechazo. En GIFinder se muestra Loading mientras esperamos y después Success, Empty o Error. Estos estados de interfaz no son los mismos estados de la promesa: una respuesta vacía puede ser una promesa cumplida.

## 3. ¿Qué devuelve fetch y qué devuelve response.json()?

fetch devuelve una Promise<Response>. La Response contiene el estado HTTP, las cabeceras y acceso al cuerpo. response.json() devuelve otra promesa que lee ese cuerpo y lo interpreta como JSON. Se necesitan los dos await porque recibir la respuesta y leer su contenido son operaciones distintas. La afirmación as GiphyResponse ayuda al compilador, pero no valida automáticamente el contenido real.

## 4. ¿Por qué es necesario comprobar response.ok?

Fetch no rechaza automáticamente una respuesta HTTP 401, 404 o 500. Por eso el servicio revisa response.ok, que indica si el estado está entre 200 y 299. Si es falso, lanza un Error con el código HTTP antes de intentar mapear los GIF. Así una respuesta de error no se trata como una búsqueda correcta.

## 5. ¿Cómo se utilizan try, catch y unknown para manejar errores en GIFinder?

loadTrending y el manejador del formulario ejecutan la consulta dentro de try. Si falla la red, la comprobación HTTP o el procesamiento de la respuesta, catch recibe un valor unknown. showRequestError comprueba error instanceof Error antes de leer message, limpia la galería y muestra Error.

## 6. ¿Qué diferencia existe entre GiphyGif y Gif, y qué responsabilidad tiene mapGiphyGif?

GiphyGif describe los campos externos que leemos de GIPHY, como images.original, images.fixed_width y alt_text. Gif es el modelo interno que consumen nuestros componentes: url, detailUrl, altText, título y autor. mapGiphyGif convierte entre ambos modelos, usa la imagen moderada para la galería y la original para el detalle. También establece textos alternativos cuando faltan título o autor y deja tags vacío porque no se consume ese dato.

## 7. ¿Por qué se utiliza URLSearchParams al construir la solicitud?

URLSearchParams codifica los parámetros y evita concatenar manualmente signos de interrogación, espacios y caracteres especiales. Por ejemplo, una búsqueda de hola mundo puede enviarse como q=hola+mundo. El servicio incorpora api_key, limit y rating, y agrega q y lang cuando corresponde al endpoint search. Esto conserva correctamente el valor de la consulta.

## 8. ¿Qué significa Promise<Gif[]> en el tipo de retorno?

Indica que la función no entrega inmediatamente un arreglo, sino una promesa cuyo resultado exitoso será un arreglo de Gif. getTrendingGifs y searchGifs usan este retorno porque esperan una respuesta HTTP. El consumidor necesita await para trabajar con la colección; si la promesa se rechaza, debe manejar el error con catch.

## 9. ¿Qué diferencia existe entre .env.local y .env.example, y por qué una variable VITE_ no debe considerarse secreta?

.env.local contiene la clave individual y queda fuera del seguimiento de Git. .env.example se publica con la variable vacía para explicar la configuración. Vite incluye las variables VITE_ utilizadas en el código que ejecuta el navegador, por lo que la clave puede observarse en las solicitudes. Ignorar el archivo evita publicarlo en el repositorio, pero no oculta el valor del cliente.

## 10. ¿Cómo comprobaste que .env.local no está versionado?

La comprobación se realiza con git check-ignore -v .env.local, que debe mostrar la regla que lo excluye, y git ls-files .env.local, que no debe devolver ninguna ruta. También se revisa git status antes de preparar el commit. En la copia de trabajo se verificaron estas reglas; debo repetir los comandos en mi repositorio después de configurar la clave local y antes de publicar.

## 11. ¿Por qué Loading puede observarse con mayor claridad al consultar una API?

La red introduce un tiempo de espera que no existía al filtrar un arreglo pequeño en memoria. El navegador puede dibujar Consultando GIPHY mientras fetch sigue pendiente. Con una conexión rápida puede durar muy poco; para observarlo en la revisión puedo usar una velocidad reducida en Network, sin agregar retrasos artificiales al programa.

## 12. ¿Qué dificultad se presentó durante la integración y cómo comprobaste que quedó resuelta?

El proyecto anterior usaba gif.services.ts y gif_detail.ts, mientras que la guía utiliza gif.service.ts y gif-detail.ts. Fue necesario unificar los nombres y actualizar las importaciones para evitar módulos duplicados o rutas incorrectas. También se corrigió gif-card_content a gif-card__content para que coincidiera con el CSS existente. La compilación y las pruebas controladas permiten revisar estos cambios. La consulta real con mi clave de GIPHY y la inspección de esa respuesta quedan pendientes de ejecutarse en mi equipo; completaré esta respuesta con lo que observe.
