import './styles/style.css';
import type { Gif } from './models/gif.interface';

// Dirección base del CDN de Giphy para evitar repetir la URL en cada objeto.
const MEDIA_URL = 'https://media.giphy.com/media';

// Declaramos un arreglo de tipo 'Gif[]' (Arreglo tipado). 
// Esto asegura que cada objeto dentro del arreglo cumpla estrictamente 
// con la estructura definida en la interfaz 'Gif', evitando tipos incorrectos.
const gifs: Gif[] = [
  {
    id: 'cat-01',
    title: 'Gato programando',
    url: `${MEDIA_URL}/JIX9t2j0ZTN9S/giphy.gif`,
    username: 'gifinder',
    description: 'Un divertido gato escribiendo código velozmente en la laptop.',
    tags: ['gato', 'programación', 'computadora'],
    rating: 'g',
  },
  {
    id: 'celebration-01',
    title: 'Celebración del equipo',
    url: `${MEDIA_URL}/g9582DNuQppxC/giphy.gif`,
    tags: ['equipo', 'éxito', 'celebración'],
    rating: 'g',
  },
  {
    id: 'coding-01',
    title: 'Código en progreso',
    url: `${MEDIA_URL}/13HgwGsXF0aiGY/giphy.gif`,
    username: 'developer',
    description: 'Pantalla de terminal con líneas de código compilando.',
    tags: ['código', 'desarrollo', 'teclado'],
    rating: 'pg',
  },
  {
    id: 'idea-01',
    title: 'Nueva idea',
    url: `${MEDIA_URL}/10HlRnAWXxn0MhKLK/giphy.gif`,
    tags: ['idea', 'creatividad', 'solución'],
    rating: 'g',
  },
  {
    id: 'coffee-01',
    title: 'Café matutino',
    url: `${MEDIA_URL}/3o72F8t9T1zK/giphy.gif`,
    username: 'coffeelover',
    description: 'Taza de café humeante para arrancar el desarrollo.',
    tags: ['café', 'mañana', 'energía'],
    rating: 'g',
  },
  {
    id: 'bug-01',
    title: 'Error de sintaxis',
    url: `${MEDIA_URL}/d2A2/giphy.gif`,
    username: 'tester',
    description: 'Reacción al encontrar un bug inesperado en producción.',
    tags: ['bug', 'error', 'debugging'],
    rating: 'pg-13',
  },
];

// Usamos el método '.forEach()' para recorrer el arreglo e imprimir en consola 
// cada título. Servirá de comprobación durante el desarrollo.
gifs.forEach((gif, index) => {
  console.log(`${index + 1}. ${gif.title}`);
});

// Seleccionamos el contenedor raíz '#app' con un parámetro de tipo genérico
// '<HTMLDivElement>' y validamos su existencia para evitar errores si no está en el HTML.
const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
  throw new Error('No se encontró el elemento #app.');
}

// Inyectamos dinámicamente la maqueta base: encabezado, formulario de búsqueda,
// párrafo de estado y contenedor para la galería de GIFs.
app.innerHTML = `
  <main class="app-shell">
    <header class="hero">
      <p class="eyebrow">EC1 — Fundamentos de TypeScript</p>
      <h1>GIFinder</h1>
      <p>Explora una colección local de GIFs.</p>
    </header>

    <form id="search-form" class="search-form">
      <label for="search-input">
        Buscar por título, autor, etiqueta o descripción
      </label>
      <div class="search-row">
        <input id="search-input" name="query"
          type="search" placeholder="Ejemplo: gato o café"
          autocomplete="off" />
        <button type="submit">Buscar</button>
      </div>
    </form>

    <p id="search-status" class="status" aria-live="polite"></p>

    <section id="gif-gallery" class="gallery" aria-label="Resultados"></section>
  </main>
`;

// Obtenemos las referencias del DOM usando tipos explícitos para cada elemento
// (HTMLFormElement, HTMLInputElement, HTMLElement, etc.).
const form = document.querySelector<HTMLFormElement>('#search-form');
const input = document.querySelector<HTMLInputElement>('#search-input');
const gallery = document.querySelector<HTMLElement>('#gif-gallery');
const status = document.querySelector<HTMLParagraphElement>('#search-status');

// 'Guardia de Control': Lanza una excepción si alguno es null. 
// A partir de esta línea, TypeScript sabe con certeza que ninguno de los cuatro elementos es null.
if (!form || !input || !gallery || !status) {
  throw new Error('No se pudo inicializar la interfaz de búsqueda.');
}

// Función que recibe un texto, elimina espacios en blanco en los extremos con '.trim()'
// y lo pasa a minúsculas con '.toLocaleLowerCase('es-MX')' para realizar búsquedas
// insensibles a mayúsculas o espacios adicionales.
function normalizeText(value: string): string {
  return value.trim().toLocaleLowerCase('es-MX');
}

// Recibe un objeto 'Gif' y el texto buscado ('query').
// Une en un solo arreglo el título, autor, descripción y etiquetas.
// Usa el operador '??' (Nullish Coalescing) para sustituir propiedades opcionales si son undefined.
// El operador '...' (spread) expande las etiquetas dentro de la misma lista de texto.
function matchesQuery(gif: Gif, query: string): boolean {
  const searchableText = [
    gif.title,
    gif.username ?? '',
    gif.description ?? '',
    ...gif.tags,
  ].join(' ');

  return normalizeText(searchableText).includes(query);
}

// Recibe la colección completa y el término de búsqueda.
// Si no hay texto de consulta, retorna una copia nueva del arreglo mediante '...collection'.
// Si hay texto, utiliza '.filter()' para retornar únicamente los GIFs que cumplan 'matchesQuery()'.
function searchGifs(collection: Gif[], value: string): Gif[] {
  const query = normalizeText(value);
  if (!query) {
    return [...collection];
  }
  return collection.filter((gif) => matchesQuery(gif, query));
}

// Aplica destructuración de objetos para obtener las propiedades del GIF.
// Asigna valores predeterminados a 'username' y 'description' en caso de que vengan como 'undefined'.
// Transforma el arreglo de 'tags' usando '.map()' e '.join()' para crear etiquetas formateadas con '#'.
function createGifCard(gif: Gif): string {
  const {
    title,
    url,
    username = 'Autor no disponible',
    description = 'Sin descripción',
    tags,
    rating,
  } = gif;

  return `
    <article class="gif-card">
      <img src="${url}" alt="${title}" loading="lazy" />
      <div class="gif-card__content">
        <h2>${title}</h2>
        <p class="description">${description}</p>
        <p><strong>${username}</strong> | Clasificación: ${rating.toUpperCase()}</p>
        <p class="tags">
          ${tags.map((tag) => `#${tag}`).join(' ')}
        </p>
      </div>
    </article>
  `;
}

// Recibe un arreglo de GIFs y actualiza la vista. 
// El tipo de retorno ': void' indica que la función modifica la interfaz pero no devuelve un valor.
function renderGifs(collection: Gif[]): void {
  // Guardia de tipo local para garantizar a TypeScript que 'status' y 'gallery' no son nulos
  if (!status || !gallery) {
    return;
  }

  const total = collection.length;
  const label = total === 1 ? 'resultado' : 'resultados';
  
  // Actualiza el texto con la cantidad total de resultados
  status.textContent = `${total} ${label}`;

  // Manejo del caso de Cero Resultados:
  if (total === 0) {
    gallery.innerHTML = `
      <p class="empty-state">
        No se encontraron GIFs.<br/>
        Prueba con otra palabra.
      </p>
    `;
    return;
  }

  // Si hay resultados, transforma el arreglo de objetos a plantillas HTML con '.map()' 
  // y las concatena en una sola cadena con '.join('')'.
  gallery.innerHTML = collection.map(createGifCard).join('');
}

// Evento 'submit': Previene la recarga del navegador con 'preventDefault()',
// realiza la búsqueda y renderiza los resultados.
form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();
  const results = searchGifs(gifs, input.value);
  renderGifs(results);
});

// Evento 'input': Detecta cuando el usuario escribe o limpia el buscador.
// Si el campo queda vacío, restaura automáticamente la galería completa.
input.addEventListener('input', () => {
  if (input.value.trim() === '') {
    renderGifs(gifs);
  }
});

// Demuestra el uso de '.find()' para localizar el primer elemento que cumpla con una condición.
// Se usa '?.title' (Encadenamiento opcional) y '??' por si el resultado fuese 'undefined'.
const firstSafeGif = gifs.find((gif) => gif.rating === 'g');
console.log(
  `Primer GIF clasificación G: ${firstSafeGif?.title ?? 'Ninguno'}`
);

// Realiza el primer renderizado para mostrar la colección inicial completa al cargar la app.
renderGifs(gifs);