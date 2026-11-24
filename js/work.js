/* =========================================================
   WORK — vista general + galería a escala real
   ========================================================= */
(() => {
  // --- Escala de la sala -------------------------------------------------
  const MURO_ANCHO_CM = 360;   // ancho real que representa el muro del fondo
  const MURO_ALTO_CM  = 250;   // alto real del muro (más bajo = obras más grandes en pantalla)
  const CENTRO_CM     = 150;   // altura de museo: centro de la obra a 1.50 m del piso
  const MARGEN_CM     = 25;    // espacio mínimo entre la obra y el techo

  const WIX = 'https://static.wixstatic.com/media/';
  const srcGrande = img => img.startsWith('http') || img.includes('/') ? img : `${WIX}${img}/v1/fit/w_1800,h_1800,q_90/${img}`;
  // imágenes locales: miniatura en la subcarpeta thumbs/ ; las de Wix se piden reducidas
  const srcThumb  = img => img.startsWith('http') ? img : img.includes('/') ? img.replace(/\/([^/]+)$/, '/thumbs/$1') : `${WIX}${img}/v1/fit/w_700,h_700,q_85/${img}`;

  // "Precursor, 2021" → { titulo: "Precursor", anio: "2021" }
  const partirFicha = ficha => {
    const m = ficha.match(/^(.*?),?\s*(\d{4}(?:\s*-\s*\d{4})?)$/);
    return m ? { titulo: m[1], anio: m[2] } : { titulo: ficha, anio: '' };
  };
  // "130x 110 cm c/u" → [130, 110]
  const medidasCm = txt => (txt.match(/[\d.]+/g) || []).slice(0, 2).map(Number);

  // --- Elementos ---------------------------------------------------------
  const $ = id => document.getElementById(id);
  const tabsEl = $('series-tabs'), gridEl = $('grid');
  const gallery = $('gallery'), room = $('room'), wall = $('back-wall');
  const art = $('artwork'), artImg = $('artwork-img'), spot = $('spot');
  const label = $('label'), countEl = $('gallery-count');
  const viewBtns = document.querySelectorAll('.view-btn');

  // --- Estado (se refleja en la URL para poder enlazar desde Home) -------
  const params = new URLSearchParams(location.search);
  let serie = COLECCIONES.find(c => c.id === params.get('serie')) || COLECCIONES[0];
  let indice = 0;
  let ultimoFoco = null;
  const proporciones = new Map(); // ancho/alto real de cada imagen, ya cargada

  const actualizarURL = abierta => {
    const p = new URLSearchParams({ serie: serie.id });
    if (abierta) p.set('obra', indice + 1);
    history.replaceState(null, '', `${location.pathname}?${p}`);
  };

  // --- Pestañas de colección ---------------------------------------------
  function pintarTabs() {
    tabsEl.innerHTML = '';
    const activa = serie.padre || serie.id;          // la serie principal seleccionada
    const cambiar = c => { serie = c; pintarTabs(); pintarGrid(); actualizarURL(false); };

    // Fila principal: solo series principales (Heme aquí, Cartografías)
    const fila = document.createElement('div');
    fila.className = 'series-row';
    fila.setAttribute('role', 'tablist');
    COLECCIONES.filter(c => !c.padre).forEach(c => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'series-tab';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', c.id === activa);
      b.innerHTML = `${c.nombre}<sup>${c.obras.length}</sup>`;
      b.addEventListener('click', () => cambiar(c));
      fila.appendChild(b);
    });
    tabsEl.appendChild(fila);

    // Subseries (p. ej. Heme aquí mini) debajo de su serie principal
    const hijas = COLECCIONES.filter(c => c.padre === activa);
    if (hijas.length) {
      const sub = document.createElement('div');
      sub.className = 'series-sub';
      sub.setAttribute('role', 'tablist');
      sub.setAttribute('aria-label', 'Subseries');
      [COLECCIONES.find(c => c.id === activa), ...hijas].forEach(c => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'series-subtab';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-selected', c === serie);
        b.innerHTML = `${c.nombre}<span>${c.obras.length}</span>`;
        b.addEventListener('click', () => cambiar(c));
        sub.appendChild(b);
      });
      tabsEl.appendChild(sub);
    }
  }

  // --- Vista general: foto + título ---------------------------------------
  function pintarGrid() {
    gridEl.innerHTML = '';
    serie.obras.forEach((o, i) => {
      const { titulo, anio } = partirFicha(o.ficha);
      const li = document.createElement('li');
      li.className = 'card';
      li.innerHTML = `
        <button type="button" class="card-btn">
          <div class="card-frame"><img src="${srcThumb(o.img)}" alt="${titulo}" loading="lazy"></div>
          <p class="card-title">${titulo}<span class="card-year">${anio}</span></p>
        </button>`;
      li.querySelector('button').addEventListener('click', e => abrir(i, e.currentTarget));
      gridEl.appendChild(li);
    });
  }

  // --- Galería -------------------------------------------------------------
  function abrir(i, origen) {
    ultimoFoco = origen || document.activeElement;
    gallery.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => gallery.classList.add('is-open'));
    marcarVista('galeria');
    mostrar(i, true);
    $('gallery-back').focus();
  }

  // Leyenda bajo la ficha: qué pasa al dar clic en la obra
  const tactil = matchMedia('(hover: none)').matches;
  function leyenda(cerca) {
    const el = $('label-hint');
    if (!el) return;
    el.textContent = cerca
      ? (tactil ? 'Toca la obra para alejarte' : 'Da clic en la obra para alejarte')
      : (tactil ? 'Toca la obra para verla de cerca' : 'Da clic en la obra para verla de cerca');
  }

  // ¿Está activa la sala 3D? (se carga aparte, en work.html)
  const en3D = () => !!(window.sala3d && window.sala3d.listo);
  const estaCerca = () => en3D() ? window.sala3d.cerca : room.classList.contains('is-close');
  function alejar() {
    if (en3D()) window.sala3d.alejar();
    room.classList.remove('is-close');
    room.style.transform = '';
    art.setAttribute('aria-label', 'Acercarse a la obra');
    leyenda(false);
  }

  function cerrar() {
    gallery.classList.remove('is-open');
    alejar();
    document.body.style.overflow = '';
    marcarVista('general');
    actualizarURL(false);
    setTimeout(() => { gallery.hidden = true; }, 450);
    if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus();
  }

  function marcarVista(v) {
    viewBtns.forEach(b => b.setAttribute('aria-pressed', b.dataset.view === v));
  }

  // Calcula el tamaño real de la obra en el muro
  function colgar(obra) {
    const [a, b] = medidasCm(obra.medidas);
    const aspecto = proporciones.get(obra.img) || (b ? b / a : 1); // ancho / alto de la foto

    let anchoCm, altoCm;
    if (obra.piezas) {
      // Conjunto de piezas: alto = el de una pieza; ancho = el de la foto del conjunto.
      // Mientras carga la foto, se estima con piezas + separación.
      const altoPieza = Math.max(a, b), anchoPieza = Math.min(a, b);
      altoCm = altoPieza;
      anchoCm = proporciones.has(obra.img)
        ? altoPieza * proporciones.get(obra.img)
        : obra.piezas * anchoPieza + (obra.piezas - 1) * (obra.separacion || 8);
    } else {
      // El lado más largo de la foto = la medida más grande de la ficha
      const mayor = Math.max(a, b);
      if (aspecto >= 1) { anchoCm = mayor; altoCm = mayor / aspecto; }
      else { altoCm = mayor; anchoCm = mayor * aspecto; }
    }

    // Sala 3D (si el navegador la pudo cargar): ella cuelga la obra en metros
    // obras de varias piezas: un bastidor 3D por pieza, con su separación real
    window.__obraActual = { anchoCm, altoCm, piezas: obra.piezas || 1, sep: obra.piezas ? (obra.separacion || 8) : 0 };
    art.classList.toggle('is-multi', !!obra.piezas);
    if (en3D()) { window.sala3d.colgar(window.__obraActual); return; }

    // Sala CSS de respaldo
    const r = wall.getBoundingClientRect();
    const pxCm = Math.min(r.width / MURO_ANCHO_CM, r.height / MURO_ALTO_CM);
    const techoCm = r.height / pxCm;
    const centro = Math.min(CENTRO_CM, techoCm - MARGEN_CM - altoCm / 2);
    const bottomPx = (centro - altoCm / 2) * pxCm;

    art.style.width = `${anchoCm * pxCm}px`;
    art.style.height = `${altoCm * pxCm}px`;
    art.style.bottom = `${bottomPx}px`;

    // la luz sigue a la obra
    spot.style.left = '50%';
    spot.style.top = `${r.height - bottomPx - (altoCm * pxCm) / 2}px`;
    spot.style.width = `${Math.max(anchoCm * pxCm * 2.2, r.width * .35)}px`;
  }

  function mostrar(i, inmediato) {
    indice = (i + serie.obras.length) % serie.obras.length;
    const obra = serie.obras[indice];
    const { titulo, anio } = partirFicha(obra.ficha);

    alejar();
    art.classList.add('is-loading');
    label.classList.add('is-changing');

    const nueva = new Image();
    nueva.onload = () => {
      proporciones.set(obra.img, nueva.naturalWidth / nueva.naturalHeight);
      if (serie.obras[indice] !== obra) return; // el usuario ya cambió de obra
      colgar(obra);
      artImg.src = nueva.src;
      artImg.alt = `${titulo}, ${obra.tecnica}, ${obra.medidas}`;
      setTimeout(() => art.classList.remove('is-loading'), inmediato ? 0 : 350);
    };
    nueva.onerror = () => { colgar(obra); art.classList.remove('is-loading'); };
    nueva.src = srcGrande(obra.img);
    colgar(obra); // tamaño provisional mientras carga

    // Heme aquí mini: dolly hacia el cuadro al abrir (la toma se define en work.html)
    if (en3D()) window.sala3d.toma(serie.id === 'heme-aqui-mini' ? 'mini' : null, { animar: true, desdeGeneral: !!inmediato });

    setTimeout(() => {
      $('label-title').textContent = titulo;
      $('label-year').textContent = anio;
      $('label-tecnica').textContent = obra.tecnica;
      $('label-medidas').textContent = obra.medidas;
      label.classList.remove('is-changing');
    }, inmediato ? 0 : 300);

    countEl.textContent = `${serie.nombre} — ${indice + 1} de ${serie.obras.length}`;
    actualizarURL(true);

    // precarga la siguiente y la anterior
    [1, -1].forEach(d => {
      const o = serie.obras[(indice + d + serie.obras.length) % serie.obras.length];
      const im = new Image();
      im.onload = () => proporciones.set(o.img, im.naturalWidth / im.naturalHeight);
      im.src = srcGrande(o.img);
    });
  }

  // Clic en la obra: acercarse / alejarse
  art.addEventListener('click', () => {
    if (en3D()) {
      const c = window.sala3d.acercar();
      art.setAttribute('aria-label', c ? 'Alejarse de la obra' : 'Acercarse a la obra');
      leyenda(c);
      return;
    }
    if (room.classList.toggle('is-close')) {
      const a = art.getBoundingClientRect();
      const vw = innerWidth, vh = innerHeight;
      const k = Math.min(3.2, Math.max(1.3, Math.min((vh * .62) / a.height, (vw * .6) / a.width)));
      const cx = a.left + a.width / 2, cy = a.top + a.height / 2;
      room.style.transform = `translate(${vw / 2 - cx}px, ${vh * .45 - cy}px) scale(${k})`;
      room.style.transformOrigin = `${cx}px ${cy}px`;
      art.setAttribute('aria-label', 'Alejarse de la obra');
      leyenda(true);
    } else {
      room.style.transform = '';
      art.setAttribute('aria-label', 'Acercarse a la obra');
    }
  });

  $('prev').addEventListener('click', () => mostrar(indice - 1));
  $('next').addEventListener('click', () => mostrar(indice + 1));
  $('gallery-back').addEventListener('click', cerrar);

  // Toggle Vista general / Galería
  viewBtns.forEach(b => b.addEventListener('click', () => {
    if (b.dataset.view === 'galeria' && gallery.hidden) abrir(0, b);
    if (b.dataset.view === 'general' && !gallery.hidden) cerrar();
  }));

  // Teclado y swipe
  document.addEventListener('keydown', e => {
    if (gallery.hidden) return;
    if (e.key === 'ArrowRight') mostrar(indice + 1);
    else if (e.key === 'ArrowLeft') mostrar(indice - 1);
    else if (e.key === 'Escape') estaCerca() ? art.click() : cerrar();
  });
  let x0 = null;
  gallery.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  gallery.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) mostrar(indice + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  addEventListener('resize', () => { if (!gallery.hidden && !en3D()) { room.classList.remove('is-close'); room.style.transform = ''; colgar(serie.obras[indice]); } });

  // --- Inicio ---------------------------------------------------------------
  pintarTabs();
  pintarGrid();
  const obraURL = parseInt(params.get('obra'), 10);
  if (obraURL >= 1 && obraURL <= serie.obras.length) abrir(obraURL - 1);
})();
