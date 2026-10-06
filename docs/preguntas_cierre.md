Responde en docs/preguntas-cierre.md. No contestes únicamente “sí” o “no”; explica cada respuesta con
base en la práctica realizada.
1. ¿Qué función cumple Node.js en el entorno de desarrollo de una aplicación frontend?
Este es como un motor local que ejecuta las herramientas, los gestores de paquetes y los sistemas de compilación necesarios para crear aplicaciones frontend. Este mismo al ser el motor de javascript v8 de google es bastante rapido, por eso es muy utilizado para proyectos, ademas de su backend y frontend, ya que este gestiona y ejecuta proyectos de una manera rapida y estable
2. ¿Qué es PNPM y qué responsabilidad tiene dentro del proyecto?
Comencemos con que PNPM (Performant Node Package Manager) es una alternativa npm(Node Package Manager
), la cual se enfoca en ofrecer una instalacion de dependencias de maneras rapidas y eficientes en el uso del almacenamiento.Este mismo se encarga de administrar las librerias, dependencias y herramientas que necesita el proyecto para su buen funcionamieto y los comandos que necesita para inicializar, desarrollar, probar y contruir la aplicacion  
3. ¿Qué problema resuelve Vite durante el desarrollo?
Este automatiza la configuracion de muchas herramientas, para el desarrollo de proyectos frontend; este proporciona un entorno que permite inicialiar rapidamente el proyecto, el proceso de los archivos y ademas de ofrecer un servidor local con actualizacion rapida durante la programacion.
4. ¿Por qué se seleccionó la plantilla Vanilla con TypeScript?
Permite el trabajo directamente con HTML, CSS y Typesctipt sin agregar un frameworks como React, Vue o Angular. Typescript se selecciona porque genera un tipado estatico a Javascript, lo cual ayuda a detectar errores en el desarrollo, facilidad de la compresion del codigo  y permite trabajar de una manera mas organizada en proyectos de gran tamaño.
5. ¿Cuál es la diferencia entre pnpm install, pnpm dev y pnpm build?
principalente es porque pnpm dev inicia el servidor de desarrollo de Vite, la cual se ejecuta localmente y permite trabajar en ella mientras se realizan cambios en el codigo fuente.
Mientras que pnpm build genera una version optimizada, no usa los archivos de desarollo si no que vite los procesa y prepara los recursos de la aplicacion, colocando los resultados dentro de la carpeta dist
6. ¿Qué información contiene package.json?
contienen scripts que son fundamentales para el proyecto, ademas de la version del proyecto, las dependencias y asi
7. ¿Por qué debe conservarse pnpm-lock.yaml en el repositorio?
Este registra las versiones exactas de las dependencias que se usan y permite que todo el equipo instale el mismo paquete en conjunto.
Esto es importante porque recordemos que las dependencias van actualizandose y se agregan nuevas funciones o por el contrario se restan, haciendo que al ejecutar el proyecto en otro equipo y que si este tiene dependencias mas actuales se pueda general un fallo.
8. ¿Por qué node_modules no debe subirse a GitHub?
Principalmente es un archivo muy pesado ya que tiene todas las dependeciasdel proyectos, y a su vez estas son faciles de descargar nuevamente, por esto mismo no se debe subir a git
9. ¿Cuál es la función de main.ts?
es el punto principal de la aplicacion, este inicia y conecta diferentes partes necesarias para el funcionamiento del proyecto.
10. ¿Qué ventaja ofrece separar el código en components, models, services, styles y utils?
Se separa el codigo aplicando la organizacion basada en responsabilidades, ademas, lleva la regla no escrita de los tres click, facilitando encontrar archivos, poder realizar modificaciones y mantener el proyecto.
11. ¿Qué diferencia existe entre el código fuente almacenado en src y los archivos generados en dist?
src tiene toda la codificacion de nosotros en el codigo, y dist contiene los archivos generados por Vite
12. ¿Qué error o dificultad encontraste durante la configuración y cómo lo resolviste?
en la instalacion de pnpm en los equipos de la universidad y del mio estando conectado a la red de la uni, pero se soluciono realizando la instalacion desde casa
13. ¿Cómo comprobaste que el repositorio puede ejecutarse en otro equipo?
Le pase el link del repositorio a un roomie, se hicieron las cofiguraciones en el equipo de el y funciono
14. ¿Qué aprendizaje de esta actividad será necesario para continuar desarrollando GIFinder?
La práctica permitió comprender la relación entre Node.js, PNPM, Vite y TypeScript, además de la función de archivos importantes como package.json, pnpm-lock.yaml y main.ts. También permitió comprender la diferencia entre el código fuente de src, las dependencias de node_modules y los archivos generados en dist.
Estos conocimientos serán necesarios para continuar desarrollando GIFinder porque, a medida que se agreguen funcionalidades, APIs, componentes y nuevas características, será importante mantener una estructura organizada y un entorno reproducible. Además, comprender Git  y GitHub, herramientas que nunca habia manejado, esto  permitirá compartir los avances con mis compañeros, trabajar con diferentes versiones del proyecto y colaborar de manera más segura con otros integrantes.