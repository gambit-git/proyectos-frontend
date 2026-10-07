(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`};function t(t){return t.replace(/[&<>"']/g,t=>e[t])}function n(e,n){let{id:r,title:i,url:a,detailUrl:o=a,altText:s=i,username:c=`Autor no disponible`,rating:l}=e;n.innerHTML=`
    <article class="gif-detail">
      <button type="button" data-action="close-detail" aria-label="Cerrar detalle">Cerrar</button>
      <h2>${t(i)}</h2>
      <img src="${t(o)}" alt="${t(s)}" />
      <p><strong>Identificador:</strong> ${t(r)}</p>
      <p><strong>Autor:</strong> ${t(c)}</p>
      <p><strong>Clasificación:</strong> ${l.toUpperCase()}</p>
    </article>
  `}function r(e){e.replaceChildren()}function i(e){let{id:n,title:r,url:i,altText:a=r,username:o=`Autor no disponible`,rating:s}=e;return`
    <article class="gif-card">
      <img src="${t(i)}" alt="${t(a)}" loading="lazy" />
      <div class="gif-card__content">
        <h2>${t(r)}</h2>
        <p>Autor: ${t(o)} | Clasificación: ${s.toUpperCase()}</p>
        <button type="button" data-gif-id="${t(n)}">Ver detalle</button>
      </div>
    </article>
  `}function a(e,t){t.innerHTML=e.map(i).join(``)}var o={Initial:`initial`,Loading:`loading`,Success:`success`,Empty:`empty`,Error:`error`};function s(e,t,n=0){t.className=`status status--${e}`;let r=n===1?`1 GIF disponible.`:`${n} GIFs disponibles.`,i=n===1?`1 resultado encontrado.`:`${n} resultados encontrados.`;switch(e){case o.Initial:t.textContent=`${r} Preparando la consulta.`;break;case o.Loading:t.textContent=`Consultando GIPHY...`;break;case o.Success:t.textContent=i;break;case o.Empty:t.textContent=`No se encontraron GIFs. Prueba con otra palabra.`;break;case o.Error:t.textContent=`No fue posible consultar GIPHY. Intenta buscar de nuevo.`}}var c=`https://api.giphy.com/v1/gifs`,l=12;function u(){return`o6BkYbPqxx4JLVBq7aszquzsCnIPxslF`}function d(e){return e===`g`||e===`pg`||e===`pg-13`}function f(e){let{id:t,title:n,username:r,rating:i,alt_text:a,images:o}=e,s=n||`GIF sin título`;return{id:t,title:s,url:(o.fixed_width??o.original).url,detailUrl:o.original.url,altText:a||s,username:r||void 0,tags:[],rating:d(i)?i:`g`}}function p(e,t={}){let n=new URL(`${c}/${e}`);return n.search=new URLSearchParams({api_key:u(),limit:String(l),rating:`g`,...t}).toString(),n}async function m(e){let t=await fetch(e);if(!t.ok)throw Error(`GIPHY respondió con el estado ${t.status}.`);let n=await t.json();if(n.meta.status!==200)throw Error(n.meta.msg||`Respuesta inválida de GIPHY.`);return n.data.map(f)}async function h(){return m(p(`trending`))}async function g(e){let t=e.trim();return t?m(p(`search`,{q:t,lang:`es`})):h()}function _(e,t){return e.find(e=>e.id===t)}function v(e){let t=document.querySelector(e);if(!t)throw Error(`No se encontró el elemento ${e}.`);return t}var y=v(`#app`);y.innerHTML=`
  <main class="app-shell">
    <header class="hero">
      <p class="eyebrow">EC1 - Programación asíncrona</p>
      <h1>GIFinder</h1>
      <p>Busca contenido mediante la API de GIPHY.</p>
    </header>
    <form id="search-form" class="search-form">
      <label for="search-input">Buscar GIF</label>
      <div class="search-row">
        <input id="search-input" name="query" type="search" maxlength="50"
          placeholder="Ejemplo: programación" autocomplete="off" />
        <button type="submit">Buscar</button>
      </div>
    </form>
    <p id="search-status" class="status" role="status" aria-live="polite"></p>
    <section id="gif-gallery" class="gallery" aria-label="Resultados"></section>
    <aside id="gif-detail" class="gif-detail-container" aria-live="polite"></aside>
    <footer class="giphy-attribution">
      <a href="https://giphy.com/" target="_blank" rel="noopener noreferrer">
        <img src="/powered-by-giphy.png" alt="Powered by GIPHY" />
      </a>
    </footer>
  </main>
`;var b=v(`#search-form`),x=v(`#search-input`),S=v(`#gif-gallery`),C=v(`#search-status`),w=v(`#gif-detail`),T=[];function E(e){T=e,a(T,S),s(T.length>0?o.Success:o.Empty,C,T.length)}function D(e){let t=e instanceof Error?e.message:`Error desconocido.`;console.error(t),T=[],a(T,S),r(w),s(o.Error,C)}async function O(){s(o.Loading,C);try{E(await h())}catch(e){D(e)}}b.addEventListener(`submit`,async e=>{e.preventDefault(),s(o.Loading,C),r(w);try{E(await g(x.value))}catch(e){D(e)}}),S.addEventListener(`click`,e=>{let t=e.target;if(!(t instanceof Element))return;let r=t.closest(`[data-gif-id]`);if(!r?.dataset.gifId)return;let i=_(T,r.dataset.gifId);if(!i){s(o.Error,C);return}n(i,w)}),w.addEventListener(`click`,e=>{let t=e.target;t instanceof Element&&t.closest(`[data-action="close-detail"]`)&&r(w)}),s(o.Initial,C),O();