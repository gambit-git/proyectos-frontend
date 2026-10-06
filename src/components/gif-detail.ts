import type { Gif } from '../models/gif.interface';
import { escapeHtml } from '../utils/html';

export function renderGifDetail(gif: Gif, container: HTMLElement): void {
  const { id, title, url, detailUrl = url, altText = title,
    username = 'Autor no disponible', rating } = gif;
  container.innerHTML = `
    <article class="gif-detail">
      <button type="button" data-action="close-detail" aria-label="Cerrar detalle">Cerrar</button>
      <h2>${escapeHtml(title)}</h2>
      <img src="${escapeHtml(detailUrl)}" alt="${escapeHtml(altText)}" />
      <p><strong>Identificador:</strong> ${escapeHtml(id)}</p>
      <p><strong>Autor:</strong> ${escapeHtml(username)}</p>
      <p><strong>Clasificación:</strong> ${rating.toUpperCase()}</p>
    </article>
  `;
}

export function clearGifDetail(container: HTMLElement): void {
  container.replaceChildren();
}
