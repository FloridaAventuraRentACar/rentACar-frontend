// ============================================================
// app.js v1.1 · Guía Miami Florida Aventura
// ============================================================
(function () {
  'use strict';

  const DATA = window.LUGARES_DATA;
  const CATS = DATA.categorias;
  const PLACES = DATA.lugares;
  const STORE_KEY = 'fa-miami-wishlist-v1';
  const WA_URL = 'https://api.whatsapp.com/send/?phone=13057731787';

  let activeCategory = 'all';
  let freeOnly = false;
  let wishlist = loadWishlist();

  const markers = {};
  const placesById = {};
  PLACES.forEach(p => placesById[p.id] = p);

  function loadWishlist() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function saveWishlist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(wishlist)); } catch (e) {}
  }

  // ---------- MAP ----------
  const map = L.map('map', { center: [25.82, -80.20], zoom: 11, zoomControl: false });
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap · © CARTO', subdomains: 'abcd', maxZoom: 19
  }).addTo(map);

  // MIA pin
  const miaIcon = L.divIcon({
    className: 'fa-pin',
    html: `<div class="fa-pin-inner" style="background:#0a1525;color:#fff;">
             <span class="dot" style="background:#E8C653;"></span>
             ✈️ MIA Airport
           </div>`,
    iconSize: null, iconAnchor: [50, 28]
  });
  L.marker([25.7959, -80.2870], { icon: miaIcon }).addTo(map);

  // Place pins
  PLACES.forEach(p => {
    const cat = CATS[p.categoria];
    const icon = L.divIcon({
      className: 'fa-pin',
      html: `<div class="fa-pin-inner" data-place-id="${p.id}">
               <span class="dot" style="background:${cat.color}"></span>
               <span>${cat.icono} ${p.gratis ? 'Gratis' : '$'}</span>
             </div>`,
      iconSize: null, iconAnchor: [40, 28]
    });
    const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);
    marker.bindPopup(buildPopup(p), { maxWidth: 320, autoPan: true });
    marker.on('popupopen', () => {
      bindPopupBtns(p.id);
      updatePinClasses();
    });
    markers[p.id] = marker;
  });

  // ---------- POPUP ----------
  function buildPopup(p) {
    const cat = CATS[p.categoria];
    const isWished = wishlist.includes(p.id);
    const gmaps = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}&travelmode=driving`;
    const gReviews = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.nombre + ' ' + p.barrio + ' Miami')}`;
    const star = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px"><path d="M12 2l2.9 6.9L22 10l-5 5 1.5 7-6.5-3.5L5.5 22 7 15l-5-5 7.1-1.1z"/></svg>`;
    return `
      <div class="pop">
        <div class="pop-img" style="background:linear-gradient(135deg,${cat.color} 0%, ${shade(cat.color, -25)} 100%);">
          <span style="font-size:64px;">${cat.icono}</span>
          <span class="badge-free">${p.gratis ? 'GRATUITO' : 'DE PAGO'}</span>
          <span class="badge-cat">${cat.label}</span>
          <button class="heart ${isWished ? 'on' : ''}" data-heart="${p.id}">${isWished ? '♥' : '♡'}</button>
        </div>
        <div class="pop-body">
          <h3 class="pop-title">${p.nombre}</h3>
          <div class="pop-sub">
            <span class="pop-rating">${star} ${p.rating}</span>
            <span style="color:var(--muted)">(${p.ratingsCount})</span>
            <span class="dot-sep">·</span>
            <span>${p.barrio}</span>
          </div>
          <div class="pop-desc">${p.descripcion}</div>
          <div class="pop-meta">
            <div>🚗 A <strong>${p.minutosDesdeMIA} min</strong> de tu auto · ${p.kmDesdeMIA} km desde MIA</div>
            <div>🕒 ${p.horarios}</div>
            <div>💵 <strong>${p.gratis ? 'Entrada gratuita' : 'Entrada de pago'}</strong>${p.precioReferencial ? ' · ' + p.precioReferencial : ''}</div>
            ${p.precioReferencial ? `<div style="font-size:10px;opacity:0.7;margin-top:4px;">* Precio referencial en USD. Verifica antes de visitar.</div>` : ''}
            <div style="margin-top:6px;">💡 <strong>Recomendación local:</strong> <em>${p.tips}</em></div>
          </div>
          <div class="pop-actions">
            <button class="pop-btn" data-open-url="${gReviews}">★ Reseñas</button>
            <button class="pop-btn primary" data-open-url="${gmaps}">🚗 Cómo llegar</button>
          </div>
        </div>
      </div>
    `;
  }

  function bindPopupBtns(placeId) {
    const heart = document.querySelector(`[data-heart="${placeId}"]`);
    if (heart) {
      heart.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(placeId);
        markers[placeId].setPopupContent(buildPopup(placesById[placeId]));
        setTimeout(() => bindPopupBtns(placeId), 0);
      });
    }
    // External link buttons — use window.open with fallback for iframes
    document.querySelectorAll('[data-open-url]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = btn.getAttribute('data-open-url');
        openExternal(url);
      });
    });
  }

  function openExternal(url) {
    // Try opening in a new tab; if blocked (iframe sandbox), fall back to top-level navigation,
    // and finally clipboard with toast.
    let win = null;
    try { win = window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) {}
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // Try navigating top-level
      try { window.top.location.href = url; return; } catch (e) {}
      // Fallback: copy URL
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Enlace copiado. Pégalo en tu navegador.');
        });
      }
    }
  }

  // ---------- WISHLIST ----------
  function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    if (idx === -1) {
      wishlist.push(id);
      showToast(`Añadido: ${placesById[id].nombre}`);
    } else {
      wishlist.splice(idx, 1);
    }
    saveWishlist();
    renderSheet();
    updatePinClasses();
    maybeAutoOpenSheet();
  }

  function clearWishlist() {
    if (wishlist.length === 0) return;
    if (!confirm('¿Borrar todos los lugares de tu lista?')) return;
    wishlist = [];
    saveWishlist();
    renderSheet();
    updatePinClasses();
    showToast('Lista vacía. Comienza de nuevo cuando quieras.');
  }

  function countsByCategory() {
    const counts = {};
    wishlist.forEach(id => {
      const p = placesById[id];
      if (!p) return;
      counts[p.categoria] = (counts[p.categoria] || 0) + 1;
    });
    return counts;
  }

  // ---------- FILTERS ----------
  function updatePinClasses() {
    Object.keys(markers).forEach(id => {
      const el = markers[id].getElement();
      if (!el) return;
      const inner = el.querySelector('.fa-pin-inner');
      if (!inner) return;
      const p = placesById[id];
      const matchesCat = activeCategory === 'all' || p.categoria === activeCategory;
      const matchesFree = !freeOnly || p.gratis;
      const visible = matchesCat && matchesFree;
      inner.classList.toggle('dimmed', !visible);
      inner.classList.toggle('wished', wishlist.includes(id) && visible);
    });
  }

  // ---------- SHEET RENDER ----------
  function renderSheet() {
    const counts = countsByCategory();
    document.getElementById('carCanvas').innerHTML = FACar.buildCar(counts);
    document.getElementById('carMini').innerHTML = FACar.buildCar(counts);
    document.getElementById('carCaption').innerHTML = FACar.buildCaption(counts);
    document.getElementById('wishCount').textContent = wishlist.length;

    const list = document.getElementById('wishList');
    if (wishlist.length === 0) {
      list.innerHTML = `<div class="wishlist-empty">Tu itinerario está vacío. Toca el <strong>♡</strong> en los lugares que quieres visitar.</div>`;
      document.getElementById('sheetTitle').textContent = 'Tu itinerario';
      document.getElementById('sheetSub').textContent = 'Toca ♥ en el mapa para empezar.';
    } else {
      list.innerHTML = wishlist.map(id => {
        const p = placesById[id];
        const cat = CATS[p.categoria];
        return `
          <div class="wish-item" data-goto="${id}">
            <span class="wi-dot" style="background:${cat.color}"></span>
            <div class="wi-info">
              <div class="wi-name">${p.nombre}</div>
              <div class="wi-meta">${cat.label} · ${p.kmDesdeMIA} km · ${p.gratis ? 'Gratuito' : (p.precioReferencial || '$')}</div>
            </div>
            <button class="wi-rm" data-rm="${id}">×</button>
          </div>
        `;
      }).join('');
      const summary = Object.entries(counts).map(([k, v]) => `${v} ${CATS[k].label.toLowerCase()}`).join(' · ');
      document.getElementById('sheetTitle').textContent = `Tu ruta · ${wishlist.length} lugar${wishlist.length === 1 ? '' : 'es'}`;
      document.getElementById('sheetSub').textContent = summary;

      list.querySelectorAll('[data-goto]').forEach(el => {
        el.addEventListener('click', (e) => {
          if (e.target.matches('[data-rm]')) return;
          const id = el.getAttribute('data-goto');
          const p = placesById[id];
          map.flyTo([p.lat, p.lng], 14, { duration: 0.8 });
          setTimeout(() => markers[id].openPopup(), 900);
          closeSheet();
        });
      });
      list.querySelectorAll('[data-rm]').forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleWishlist(el.getAttribute('data-rm'));
        });
      });
    }

    // CTA when 3+ places
    const ctaSlot = document.getElementById('ctaSlot');
    if (wishlist.length >= 3) {
      ctaSlot.innerHTML = `
        <div class="cta-card">
          <h3>Ya conoces Miami. Ahora recórrelo.</h3>
          <p class="lede">Con Florida Aventura tienes tu auto listo al aterrizar. Sin filas, sin sorpresas y en tu idioma.</p>
          <ul>
            <li>Entrega directa en el aeropuerto</li>
            <li>Precio final, sin cargos ocultos</li>
            <li>El auto que reservas es el que recibes</li>
            <li>Atención personalizada las 24 hs</li>
            <li>Sillas infantiles disponibles</li>
          </ul>
          <a class="cta-btn" id="ctaBtn" href="${WA_URL}" target="_blank" rel="noopener">
            <span class="wa">💬</span> Reservar por WhatsApp
          </a>
        </div>
      `;
      const ctaBtn = document.getElementById('ctaBtn');
      if (ctaBtn) {
        ctaBtn.addEventListener('click', (e) => {
          e.preventDefault();
          openExternal(WA_URL);
        });
      }
    } else {
      ctaSlot.innerHTML = '';
    }
  }

  function maybeAutoOpenSheet() {
    // Cuando llega a 3 lugares por primera vez, abrir el sheet automáticamente
    if (wishlist.length === 3 && !sessionStorage.getItem('fa-cta-shown')) {
      sessionStorage.setItem('fa-cta-shown', '1');
      document.getElementById('sheet').classList.add('open');
      setTimeout(() => showToast('¡Excelente elección! Ya tienes un plan. Míralo aquí abajo.'), 300);
    }
  }

  // ---------- CHIPS ----------
  function buildChips() {
    const chips = document.getElementById('chips');
    const cats = [['all', { label: 'Todo', icono: '🗺️' }]].concat(Object.entries(CATS));
    chips.innerHTML = cats.map(([key, cat]) =>
      `<button class="chip ${key === 'all' ? 'active' : ''}" data-cat="${key}">
        <span class="ico">${cat.icono}</span> ${cat.label}
      </button>`
    ).join('');
    chips.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        chips.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat');
        updatePinClasses();
      });
    });
  }

  // ---------- SHEET TOGGLE ----------
  const sheet = document.getElementById('sheet');
  document.getElementById('sheetHead').addEventListener('click', () => sheet.classList.toggle('open'));
  function closeSheet() { sheet.classList.remove('open'); }

  document.getElementById('btnClear').addEventListener('click', clearWishlist);
  document.getElementById('btnShare').addEventListener('click', shareCar);

  document.getElementById('freeOnly').addEventListener('change', (e) => {
    freeOnly = e.target.checked;
    updatePinClasses();
  });

  // ---------- INTRO ----------
  document.getElementById('introStart').addEventListener('click', () => {
    const intro = document.getElementById('intro');
    intro.classList.add('closing');
    setTimeout(() => { intro.style.display = 'none'; }, 550);
  });

  // ---------- TOAST ----------
  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }

  // ---------- SHARE ----------
  function shareCar() {
    if (wishlist.length === 0) {
      showToast('Añade algunos lugares primero ✨');
      return;
    }
    const counts = countsByCategory();
    const text = `Mi Miami con @floridaaventura · ${wishlist.length} lugares · ` +
                 Object.entries(counts).map(([k, v]) => `${v} ${CATS[k].label}`).join(' · ');
    if (navigator.share) {
      navigator.share({ title: 'Mi Miami · Florida Aventura', text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
      showToast('Enlace copiado. ¡Compártelo con tus acompañantes!');
    }
  }

  // ---------- UTIL ----------
  function shade(hex, percent) {
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0,2),16);
    const g = parseInt(c.substring(2,4),16);
    const b = parseInt(c.substring(4,6),16);
    const adj = (v) => Math.max(0, Math.min(255, Math.round(v + (percent/100)*255)));
    return '#' + [adj(r),adj(g),adj(b)].map(x => x.toString(16).padStart(2,'0')).join('');
  }

  // ---------- INIT ----------
  buildChips();
  renderSheet();
  updatePinClasses();
})();
