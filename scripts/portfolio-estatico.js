#!/usr/bin/env node
/*
 * Mete en el HTML de cada /portfolio/<proyecto>.html el contenido que antes
 * solo pintaba el JavaScript: titulo, tipo, texto, galeria y proyectos
 * relacionados, mas datos estructurados. Tambien la rejilla de portfolio.html.
 *
 * Por que: Google descargaba 24 paginas identicas (solo cambiaba el <title>)
 * y las descartaba como duplicadas ("Descubierta/Rastreada: actualmente sin
 * indexar" en Search Console, sept. 2026).
 *
 * Se puede ejecutar las veces que haga falta: cada bloque generado va entre
 * marcas <!-- estatico:... --> y se sustituye entero.
 *
 *   node scripts/portfolio-estatico.js
 *
 * Los textos de cada proyecto estan en TEXTOS, abajo. Son descripciones
 * prudentes hechas a partir del nombre y el tipo de trabajo: conviene
 * enriquecerlas con datos reales (cliente, lugar, equipo, fecha).
 */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");

const RAIZ = path.join(__dirname, "..");
const DIR = path.join(RAIZ, "portfolio");
const SITIO = "https://photoeloi.com";

const TEXTOS = {
  "suzet-atelier": "Sesión de fotografía de marca para Suzet Atelier. Imágenes pensadas para contar el universo del atelier: sus piezas, sus texturas y la manera de llevarlas, con una luz cuidada y un estilo editorial que la marca puede usar en web, catálogo y redes.",
  "julia-martinez": "Retrato editorial de Julia Martinez. Una serie de retratos con dirección de pose y luz trabajada para construir una imagen personal con carácter, a medio camino entre el retrato de moda y el retrato de autor.",
  "poblenou-antic": "Editorial de moda fotografiada en Poblenou, el barrio de Barcelona donde está el estudio de Eloi Garcia. La historia se apoya en la arquitectura industrial y las calles del antiguo distrito fabril para dar contexto a cada look.",
  "the-crazy-side": "The Crazy Side! es una editorial de moda con un tono atrevido y lúdico. Estilismo, pose y color van a más para construir una serie con personalidad propia, lejos del catálogo convencional.",
  "lemon-magazine": "Pieza audiovisual editorial para Lemon Magazine. Vídeo de moda con la misma mirada que las fotografías de Eloi Garcia: dirección de los modelos, ritmo y una estética cuidada plano a plano.",
  "hazzys-kids": "Lookbook infantil para Hazzys Kids. Fotografía de moda para niños en la que prima la naturalidad: dirigir a los más pequeños para que la ropa se vea bien sin perder la espontaneidad propia de su edad.",
  "lucky-try": "Campaña audiovisual para Lucky Try. Vídeos de campaña producidos por Eloi Garcia para presentar la marca y su producto con una narrativa visual coherente con su identidad.",
  "valentina-bentos": "Editorial de moda con Valentina Bentos. Una serie de moda con dirección de arte, estilismo y luz al servicio de la modelo y de las prendas, pensada para portfolio y publicación.",
  "my-little-pony": "My Little Pony by Thuya: editorial de moda con una propuesta estética juguetona y muy cuidada, en la que el estilismo y el color marcan el tono de toda la serie.",
  "exotica-gin": "Campaña publicitaria para Exótica Gin. Fotografía de producto y bodegón para una marca de bebidas: composición, luz y ambientación para que la botella y el universo de la marca funcionen en publicidad, web y redes.",
  "vip-picnic": "Reportaje del evento Vip.Picnic. Fotografía de eventos que recoge el ambiente, los detalles de la puesta en escena y a los asistentes de forma natural, sin interrumpir el momento.",
  "glenis": "Nueva colección de Glenis Swimwear. Fotografía de moda de baño con modelo: luz, localización y pose al servicio de los bañadores y bikinis de la colección, en imágenes útiles tanto para campaña como para la tienda online.",
  "martina-pavia": "Fotografía de marca para Martina Pavia. Imágenes que presentan la firma y sus productos con un estilo coherente, listas para web, catálogo y redes sociales.",
  "dinner-at-my-house": "Dinner at My House es una editorial de moda con una escena doméstica como hilo conductor. Una cena que sirve de excusa para trabajar la narrativa, el estilismo y la luz de interior.",
  "was-swimwear": "Nueva colección de WAS Swimwear. Sesión de moda de baño para presentar la colección con modelo, pensada para lookbook, campaña y ecommerce.",
  "billy-elliot": "Billy Elliot es una editorial de moda con referencias al mundo de la danza. Movimiento, pose y vestuario construyen una serie expresiva en la que el cuerpo es protagonista.",
  "arma-de-mujer": "Arma de Mujer es una editorial de moda centrada en la fuerza y la presencia femenina. Retrato, estilismo y luz se combinan para dar a cada imagen una actitud rotunda.",
  "princess-bikinis": "Nueva colección de Princess Bikinis. Fotografía de moda de baño con modelo para lanzar la colección: imágenes de campaña y producto que muestran el corte y el ajuste de cada bikini.",
  "new-year-party": "New Year Party es una editorial de fiesta: brillo, noche y estilismo de celebración en una serie de moda con energía y movimiento.",
  "introspective-journey": "An Introspective Journey es un proyecto de fotografía fine art. Una serie más personal y pausada, en la que la imagen se acerca al retrato de autor y a la fotografía conceptual.",
  "liz-swimwear": "Lookbook para Liz Swimwear. Fotografía de moda de baño que presenta las piezas de la marca con modelo, cuidando la luz natural y la sensación de verano que transmite la colección.",
  "gianni-versace": "Retrospectiva en vídeo sobre Gianni Versace. Pieza audiovisual de Eloi Garcia que repasa el legado del diseñador a través de una mirada propia sobre la moda y la imagen.",
  "fete-barcelona": "Campaña para Fete Barcelona. Fotografía de campaña con dirección de arte y estilismo pensados para comunicar la identidad de la marca en web, redes y publicidad.",
  "alyona-yuliya": "Editorial de moda con Alyona y Yuliya. Una serie a dos modelos en la que la complicidad entre ambas, el estilismo y la pose construyen la historia.",
};

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Miniaturas y galeria redimensionadas por Cloudinary; el lightbox sigue usando los originales.
const redim = (url, w) => url.replace("/image/fetch/https:", `/image/fetch/w_${w},q_auto,f_auto/https:`);
const tituloEm = t => esc(t).replace(/(\S+)$/, "<em>$1</em>");

function leerProyectos(html) {
  const ini = html.indexOf("const BASE=");
  const fin = html.indexOf("];", html.indexOf("const projects=")) + 2;
  if (ini < 0 || fin < 2) throw new Error("no encuentro const projects=[...]");
  const ctx = {};
  vm.runInNewContext(html.slice(ini, fin).replace(/\bconst (\w+)=/g, "this.$1="), ctx);
  return ctx.projects;
}

function sustituir(html, marca, nuevo, antes) {
  const re = new RegExp(`<!-- estatico:${marca} -->[\\s\\S]*?<!-- /estatico:${marca} -->`);
  const bloque = `<!-- estatico:${marca} -->${nuevo}<!-- /estatico:${marca} -->`;
  if (re.test(html)) return html.replace(re, () => bloque);
  if (!html.includes(antes)) throw new Error(`no encuentro el punto de inserción de ${marca}`);
  return html.replace(antes, () => bloque + antes);
}

function relacionados(ps, p) {
  const tipo = l => l.split(/\s+—\s+/)[0].toLowerCase();
  const i = ps.indexOf(p);
  const orden = [...ps.slice(i + 1), ...ps.slice(0, i)];
  const mismo = orden.filter(x => tipo(x.label) === tipo(p.label));
  return [...mismo, ...orden.filter(x => !mismo.includes(x))].slice(0, 4);
}

function descripcionMeta(p) {
  const t = TEXTOS[p.id];
  const primera = t.split(/(?<=\.)\s/)[0];
  const n = p.images.length ? ` ${p.images.length} fotografías.` : " Vídeo.";
  const d = primera + " Por Eloi Garcia, fotógrafo en Barcelona." + n;
  return d.length > 158 ? primera.slice(0, 150).replace(/\s\S*$/, "") + "…" : d;
}

function paginaProyecto(ps, p, html) {
  if (!TEXTOS[p.id]) throw new Error("falta texto para " + p.id);
  const url = `${SITIO}/portfolio/${p.id}`;
  const videos = p.videos || (p.video ? [p.video] : []);
  const desc = descripcionMeta(p);

  // <head>: descripcion y datos estructurados
  html = html.replace(/<meta name="description" content="[^"]*"\/?>/, `<meta name="description" content="${esc(desc)}"/>`)
             .replace(/<meta property="og:description" content="[^"]*"\/?>/, `<meta property="og:description" content="${esc(desc)}"/>`)
             .replace(/<meta name="twitter:description" content="[^"]*"\/?>/, `<meta name="twitter:description" content="${esc(desc)}"/>`);
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": videos.length ? "CreativeWork" : "ImageGallery",
      name: p.title, headline: `${p.title} — ${p.label}`, description: TEXTOS[p.id], url,
      genre: p.label, inLanguage: "es",
      image: (p.images.length ? p.images : [p.cover]).slice(0, 12),
      author: { "@type": "Person", name: "Eloi Garcia", url: SITIO + "/", jobTitle: "Fotógrafo", address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" } },
      ...(videos.length ? { video: videos.map(v => ({ "@type": "VideoObject", name: p.title, description: TEXTOS[p.id], thumbnailUrl: p.cover, embedUrl: `https://player.vimeo.com/video/${v}`, uploadDate: "2024-01-01" })) } : {}),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITIO + "/" },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: SITIO + "/portfolio" },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    },
  ];
  html = sustituir(html, "ld", `\n  <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>\n  `, "</head>");
  html = sustituir(html, "css", `
  <style>
    .project-intro{padding:28px 44px 36px;max-width:820px}
    .project-intro p{font-size:15px;line-height:1.85;color:var(--text);margin:0 0 12px}
    .project-intro .meta{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
    .project-intro a{color:var(--accent)}
    .related{padding:56px 44px 0}
    .related-title{font-family:var(--serif);font-size:32px;font-weight:300;margin:0 0 24px;color:var(--dark)}
    .related-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:3px}
    .related-card{position:relative;display:block;aspect-ratio:4/5;overflow:hidden;color:#fff;text-decoration:none;background:#ddd}
    .related-card img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
    .related-card:hover img{transform:scale(1.04)}
    .related-card span{position:absolute;left:14px;right:14px;bottom:12px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;text-shadow:0 1px 8px rgba(0,0,0,.6)}
    .related-card small{display:block;font-size:10px;opacity:.8;margin-top:3px}
    @media(max-width:900px){.project-intro,.related{padding-left:20px;padding-right:20px}.related-grid{grid-template-columns:repeat(2,1fr)}}
  </style>
  <noscript><style>.gallery-item{opacity:1!important;transform:none!important}</style></noscript>
  `, "</head>");

  // Cabecera
  html = html.replace(/<span id="bc-title">[^<]*<\/span>/, `<span id="bc-title">${esc(p.title)}</span>`)
             .replace(/<span class="project-detail-label" id="detail-label">[^<]*<\/span>/, `<span class="project-detail-label" id="detail-label">${esc(p.label)}</span>`)
             .replace(/<h1 class="project-detail-title" id="detail-title">[\s\S]*?<\/h1>/, `<h1 class="project-detail-title" id="detail-title">${tituloEm(p.title)}</h1>`)
             .replace(/<div class="project-detail-count" id="detail-count">[^<]*<\/div>/, `<div class="project-detail-count" id="detail-count">${videos.length ? "Vídeo" : p.images.length + " fotos"}</div>`);

  // Texto del proyecto, justo antes de la galeria
  const intro = `
<section class="project-intro">
  <p>${esc(TEXTOS[p.id])}</p>
  <p class="meta">${esc(p.label)} · Eloi Garcia, fotógrafo en Barcelona · <a href="/fotografo-moda-barcelona">Fotografía de moda en Barcelona</a></p>
</section>
`;
  html = sustituir(html, "intro", intro, `<!-- Gallery -->`);

  // Galeria
  const galeria = videos.length
    ? videos.map(v => `<div class="video-wrap"><iframe src="https://player.vimeo.com/video/${v}?autoplay=0&title=0&byline=0&portrait=0" title="${esc(p.title)} — vídeo de Eloi Garcia" loading="lazy" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`).join("")
    : p.images.map((u, i) => `<div class="gallery-item"><img src="${esc(redim(u, 1000))}" alt="${esc(`${p.title} — ${p.label.toLowerCase()} por Eloi Garcia, fotógrafo en Barcelona (${i + 1} de ${p.images.length})`)}"${i < 3 ? "" : ' loading="lazy"'} decoding="async"/></div>`).join("");
  html = html.replace(/<div class="project-gallery" id="project-gallery"[^>]*>[\s\S]*?<\/div><!-- \/project-gallery -->|<div class="project-gallery" id="project-gallery"><\/div>/,
    () => `<div class="project-gallery" id="project-gallery"${videos.length ? ' style="column-count:1"' : ""}>${galeria}</div><!-- /project-gallery -->`);

  // Proyectos relacionados (enlazado interno)
  const rel = relacionados(ps, p).map(x =>
    `<a class="related-card" href="/portfolio/${x.id}"><img src="${esc(redim(x.cover, 600))}" alt="${esc(x.title + " — " + x.label)}" loading="lazy" decoding="async"/><span>${esc(x.title)}<small>${esc(x.label)}</small></span></a>`).join("");
  html = sustituir(html, "relacionados", `
<section class="related">
  <h2 class="related-title">Más <em>proyectos</em></h2>
  <div class="related-grid">${rel}</div>
</section>
`, `<!-- CTA -->`);

  // JS: reutilizar la galeria ya pintada en vez de duplicarla, y no crear una segunda canonica.
  html = html.replace(
    "const desc = p.label + ' por Eloi Garcia, fotógrafo en Barcelona. ' + (p.video ? 'Proyecto audiovisual.' : p.images.length + ' fotografías.');",
    "const desc = document.querySelector('meta[name=\"description\"]').content || (p.label + ' por Eloi Garcia, fotógrafo en Barcelona.');");
  html = html.replace(
    "  const canon = document.createElement('link');\n  canon.rel='canonical'; canon.href='https://photoeloi.com/portfolio/'+p.id;\n  document.head.appendChild(canon);",
    "  if(!document.querySelector('link[rel=\"canonical\"]')){\n    const canon = document.createElement('link');\n    canon.rel='canonical'; canon.href='https://photoeloi.com/portfolio/'+p.id;\n    document.head.appendChild(canon);\n  }");
  html = html.replace(
    "  const videoIds = p.videos || (p.video ? [p.video] : []);\n  if(videoIds.length){",
    "  const videoIds = p.videos || (p.video ? [p.video] : []);\n" +
    "  if(gallery.children.length){\n" +
    "    // Galeria ya incluida en el HTML (scripts/portfolio-estatico.js): solo lightbox y animacion.\n" +
    "    gallery.querySelectorAll('.gallery-item').forEach((el,i)=>el.addEventListener('click',()=>openLightbox(i)));\n" +
    "    setTimeout(()=>{ gallery.querySelectorAll('.gallery-item').forEach((el,i)=>setTimeout(()=>el.classList.add('visible'), i*40)); }, 100);\n" +
    "  } else if(videoIds.length){");
  if (!html.includes("if(gallery.children.length){")) throw new Error("no pude adaptar el JS de " + p.id);
  // Los proyectos con varios videos usan p.videos (no p.video) y salian como "0 fotos".
  html = html.replace("document.getElementById('detail-count').textContent = p.video ?",
                      "document.getElementById('detail-count').textContent = (p.video || p.videos) ?");
  return html;
}

function paginaPortfolio(ps) {
  const f = path.join(RAIZ, "portfolio.html");
  let html = fs.readFileSync(f, "utf8");
  const tarjetas = ps.map(p => `<a class="project-card" href="/portfolio/${p.id}"><img src="${esc(redim(p.cover, 800))}" alt="${esc(p.title + " — " + p.label)}" loading="lazy"/><div class="project-card-overlay"></div><div class="project-card-info"><div class="project-card-title">${esc(p.title)}</div></div><div class="project-card-arrow">→</div></a>`).join("\n    ");
  html = html.replace(/<div class="projects-grid" id="projects-grid">[\s\S]*?<\/div><!-- \/projects-grid -->|<div class="projects-grid" id="projects-grid"><\/div>/,
    () => `<div class="projects-grid" id="projects-grid">\n    ${tarjetas}\n  </div><!-- /projects-grid -->`);
  // El JS vuelve a pintar la rejilla (con sus animaciones): vaciarla antes para no duplicar.
  if (!html.includes("grid.innerHTML='';"))
    html = html.replace("  const grid = document.getElementById('projects-grid');\n  projects.forEach(",
                        "  const grid = document.getElementById('projects-grid');\n  grid.innerHTML='';\n  projects.forEach(");
  if (!html.includes("grid.innerHTML='';")) throw new Error("no pude adaptar buildGrid de portfolio.html");
  // Entradilla en el hueco derecho de la cabecera, frente al titulo: texto
  // visible (el texto oculto no cuenta para Google) pero discreto.
  const intro = `
    <p class="portfolio-intro"><a href="/fotografo-moda-barcelona">Fotógrafo de moda y editorial en Barcelona</a>. Editoriales, lookbooks, campañas y moda de baño para marcas, y <a href="/ecommerce">fotografía ecommerce con IA</a> para tiendas online.</p>
    `;
  html = html.replace(/<!-- estatico:intro -->[\s\S]*?<!-- \/estatico:intro -->/, "");
  html = sustituir(html, "intro", intro, `<div class="portfolio-count">`);
  html = sustituir(html, "css", `
  <style>
    .portfolio-intro{max-width:390px;margin:0 0 4px;font-size:12.5px;line-height:1.75;letter-spacing:.01em;color:var(--muted,#888);text-align:right}
    .portfolio-intro a{color:var(--dark,#111);text-decoration:none;border-bottom:1px solid var(--border,#ddd);transition:border-color .25s}
    .portfolio-intro a:hover{border-color:var(--accent,#b5925a)}
    @media(max-width:768px){.portfolio-intro{text-align:left;max-width:none}}
  </style>
  <noscript><style>.project-card{opacity:1!important;transform:none!important}</style></noscript>
  `, "</head>");
  fs.writeFileSync(f, html);
  return ps.length;
}

// ---------------------------------------------------------------------------
const archivos = fs.readdirSync(DIR).filter(f => f.endsWith(".html"));
const ps = leerProyectos(fs.readFileSync(path.join(DIR, archivos[0]), "utf8"));
let n = 0;
for (const f of archivos) {
  const id = f.replace(/\.html$/, "");
  const p = ps.find(x => x.id === id);
  if (!p) { console.warn("sin datos:", id); continue; }
  const ruta = path.join(DIR, f);
  fs.writeFileSync(ruta, paginaProyecto(ps, p, fs.readFileSync(ruta, "utf8")));
  n++;
}
console.log(`proyectos: ${n}/${archivos.length} · rejilla de portfolio.html: ${paginaPortfolio(ps)} tarjetas`);
