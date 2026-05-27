# Screens & Components

## 1. Intro (pantalla completa, z-index 2000)

**Purpose:** Primer impacto emocional; presenta marca y propuesta de valor.

**Layout:**
- `position: fixed; inset: 0` — fullscreen.
- Fondo: slideshow de 9 fotos de Miami con Ken Burns (zoom + leve traslación).
- Transición entre slides: `opacity 1.6s ease`, autoplay cada 5s.
- Overlay oscuro encima de la foto para legibilidad:
  `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.55) 70%, rgba(10,21,37,0.85) 100%)`
- Card centrada con logo + headline + tagline + botón.

**Componentes:**

| Elemento  | Detalle |
|-----------|---------|
| Logo      | `assets/imagotipo-completo.png`, width clamp(170px, 32vw, 240px), margin auto, drop-shadow `0 8px 24px rgba(0,0,0,0.4)` |
| Headline  | Oswald 700, clamp(28px, 6vw, 42px), line-height 1.05, text-shadow `0 2px 18px rgba(0,0,0,0.6)`. Copy: "Miami a tu manera.\nTu ruta, tus reglas." |
| Tagline   | Lato 300, clamp(13px, 2.4vw, 16px), opacity 0.95, max-width 360px. Copy: "Descubre los lugares que sólo conoces si tienes auto. Arma tu lista de deseos y nosotros te llevamos." |
| Botón "Comenzar mi ruta →" | Lato 700 14px UPPERCASE, letter-spacing 1px, height 52px, padding 0 30px, border-radius 100px, bg `--coral`, color white, shadow `0 10px 28px rgba(0,0,0,0.4)`. Hover: bg white, color coral, translateY(-2px) |

**Fade out:** al click se agrega `.closing` (opacity 0, transition 0.55s) y luego `display:none`.

Slides actuales (en `/intro/`): key-biscayne, downtown, wynwood, keys-highway, lighthouse-sunset, little-havana, brickell, outlets, coconut-grove.

---

## 2. Top Bar (fixed top, 60px desktop / 56px mobile, z-index 1000)

**Layout:** flex row, gap 14px, padding 0 18px. Background `rgba(255,255,255,0.96)` con `backdrop-filter: blur(8px)` y `border-bottom: 1px solid var(--line)`.

**Slots de izquierda a derecha:**

1. **Brand**: imagotipo (`assets/imagotipo.png`, height 30px) + texto en dos líneas (`<span class="top">` Lato 400 11px UPPERCASE muted "Tu ruta" / `<span class="bot">` Oswald 600 18px ink "Florida Aventura"). En <420px se oculta el texto, solo logo.
2. **Chips scrollables horizontalmente** (`overflow-x: auto`, hide scrollbar). Una chip por categoría + una "Todo" como default activa.
   - Chip: height 34px, padding 0 14px, border 1px solid `--line`, border-radius 100px, bg white, font Lato 600 13px. Activa: bg `--ink`, color white, border `--ink`. Hover (no activa): border `--ink`.
   - Cada chip muestra el emoji de la categoría + label.
3. **Toggle "Planes gratuitos"**: checkbox + label. Lato 12px muted, accent-color teal. Filtra los pines.

---

## 3. Mapa (Leaflet, fullscreen detrás del top bar)

**Tile layer:** CARTO Voyager — `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`
**Center inicial:** `[25.82, -80.20]` (Miami), zoom 11.
**Zoom control:** abajo a la derecha.

### Pin del aeropuerto MIA (fijo, no clickeable)
Custom divIcon, pill negro `--navy` + dot amarillo + texto blanco "✈️ MIA Airport". Pos `[25.7959, -80.2870]`.

### Pin de lugar
divIcon pill blanco con:
- Dot (8px circle) del color de la categoría a la izquierda.
- Texto: emoji de categoría + "Gratis" o "$".
- Estados:
  - **normal**: bg white, color ink, sombra `0 2px 8px rgba(0,0,0,0.18)`.
  - **wished** (en wishlist): bg `--coral`, color white. Misma forma.
  - **dimmed** (filtrado fuera): `opacity: 0.32`.
  - hover: `transform: scale(1.06)`.
- Tail/triángulo apuntando al punto exacto (border-top 6px solid del color de fondo del pill).

### Popup (Leaflet, custom styling)
Width 320px (280px mobile). Border-radius 18px, sombra `0 12px 36px rgba(0,0,0,0.22)`. Estructura:

- **`.pop-img`** (header con gradiente diagonal del color de categoría → oscuro 25%): 160px alto, emoji gigante 64px centrado. Encima:
  - Badge "GRATUITO" / "DE PAGO" arriba-izquierda (pill blanco, font 700 11px Lato).
  - Badge categoría abajo-izquierda (pill negro 55% transparente, white, UPPERCASE letter-spacing 0.8px).
  - Botón corazón arriba-derecha: 36px circle, bg white 92% → en wishlist bg coral con corazón blanco. Toggle.
- **`.pop-body`** (padding 14px 16px 16px):
  - Título (`pop-title`): Oswald 600 18px.
  - Subtítulo: rating con star SVG (Lato 700 13px) + count en muted + barrio.
  - Descripción: Lato 13px line-height 1.45 color #333.
  - Meta (border-top 1px line, padding-top 10px, Lato 12px muted, line-height 1.5):
    - 🚗 "A X min de tu auto · Y km desde MIA"
    - 🕒 horarios
    - 💵 Entrada gratuita / de pago (+ precio referencial si aplica, con disclaimer 10px opacity 0.7)
    - 💡 "Recomendación local:" + tip en `<em>`
  - Acciones: 2 botones (height 36px, border-radius 10px, Lato 700 12px). Primario "🚗 Cómo llegar" → Google Maps directions. Secundario "★ Reseñas" → Google Maps search.

Popup close button rediseñado: 28px circle blanco arriba-derecha, ink, shadow.

---

## 4. Bottom Sheet "Tu itinerario" (fixed bottom centered, z-index 999)

**Layout:**
- `width: min(720px, calc(100% - 32px))`, centrada (`left: 50%; transform: translateX(-50%)`).
- bottom: 18px (12px mobile).
- bg white, border-radius 22px, sombra `0 16px 48px rgba(0,0,0,0.18)`.
- Toggle por altura: cerrada `max-height: 70px` (64px mobile), abierta `max-height: 680px` (calc(100vh - 76px) mobile). Transición 0.3s ease.

### Cabecera `.sheet-head` (siempre visible, click → toggle)
flex row, height 70px, padding 0 20px, gap 14px:

- **Mini auto** (96px wide, 64px mobile): mini versión del componente "auto sobre escena" — ver Componentes Compuestos abajo.
- **Info** (flex 1): título Oswald 600 16px + subtítulo Lato 12px muted.
  - Vacío: "Tu itinerario" / "Toca ♥ en el mapa para empezar."
  - Con items: "Tu ruta · N lugar(es)" / resumen "2 playas · 1 cultura · 1 foodie"
- **Count badge**: pill coral, white, Lato 700 13px. Muestra `wishlist.length`.
- **Flecha** `▴` que rota 180° cuando abierta.

### Cuerpo `.sheet-body` (visible al abrir)
Grid 2 columnas en desktop, 1 en mobile (<600px). border-top 1px line, padding 16px 20px 20px.

- **Col izq — `.car-stage`**: el auto sobre escena (versión grande, max-width 320px) + caption Oswald 14px centrado. Caption usa `<strong>` coral para la palabra clave del modo (ej. "**Modo playero:** sol, arena y brisa.").
- **Col der — `.wishlist-list`**: max-height 380px overflow-y auto, gap 6px.
  - Vacío: `.wishlist-empty` Lato 13px muted center padding 30px.
  - Con items: cada uno es `.wish-item`:
    - bg `#FAF7F1`, padding 8px 10px, border-radius 10px, border 1px transparent.
    - hover: bg white, border `--line`.
    - dot color de categoría 10px + nombre (Lato 700 13px truncado) + meta (Lato 11px muted: "Categoría · X km · Gratuito/$") + botón × (font 16px muted, hover coral).
    - click en item (no en ×): `map.flyTo` + abre popup + cierra sheet.

### CTA card (span ambas columnas, aparece solo cuando `wishlist.length >= 3`)
- bg gradiente `linear-gradient(135deg, --navy 0%, #1a3550 100%)`, color white, border-radius 14px, padding 18px 20px.
- Decoración: círculo coral 120px en esquina superior derecha, opacity 0.18, blur natural por overflow.
- Título Oswald 700 22px: "Ya conoces Miami. Ahora recórrelo."
- Lede Lato 13px opacity 0.85: "Con Florida Aventura tienes tu auto listo al aterrizar. Sin filas, sin sorpresas y en tu idioma."
- Lista de checks (grid 2 cols, 1 en mobile, Lato 12px) con ✓ verde-teal a la izquierda:
  - Entrega directa en el aeropuerto
  - Precio final, sin cargos ocultos
  - El auto que reservas es el que recibes
  - Atención personalizada las 24 hs
  - Sillas infantiles disponibles
- Botón "💬 Reservar por WhatsApp" pill coral UPPERCASE Lato 700 13px letter-spacing 0.6px. Hover: invierte a bg white color coral + translateY(-1px). Link a `https://api.whatsapp.com/send/?phone=13057731787`.

### Acciones (span ambas columnas, border-top)
- "Borrar todo" — ghost (border ink), confirma con `confirm()` antes de borrar.
- "Compartir mi ruta 📸" — primary coral. Usa `navigator.share` si está disponible, sino copia al portapapeles y muestra toast.

### Auto-open
Cuando el wishlist alcanza 3 por primera vez en la sesión (sessionStorage flag `fa-cta-shown`), abrir la sheet automáticamente + toast "¡Excelente elección! Ya tienes un plan. Míralo aquí abajo."

---

## 5. Toast

- Pos fixed top 76px center, bg ink, color white, padding 10px 18px, pill, Lato 600 13px.
- Aparece con `.show` (opacity 0→1, translateY -20→0), 0.25s. Auto-dismiss 2.4s.

---

## Componentes Compuestos

### "Auto sobre escena" (`.fa-car-wrap`)
El componente más característico del producto. Cuadrado (aspect-ratio 1/1), border-radius 14px (10px en versión mini), overflow hidden, bg `#1a1a1a` como fallback.

**Capas (z-index ascendente):**
1. `.fa-scene` — fondo con `background-image` de la categoría dominante. Animación `scene-zoom` 14s ease-in-out infinite alternate (scale 1.0 → 1.08).
2. `.fa-scene-overlay` — gradient oscuro abajo para que el auto se "asiente" en la escena:
   `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)` + radial vignette inferior.
3. `.fa-car-img` — `<img>` PNG del auto (vista 3/4) centrado horizontalmente, bottom 6% (4% en mini), width 86% (92% en mini), drop-shadow grande. Animación `car-pop` 0.45s al cambiar.

**Escenas (`assets/moods/`):** playa.jpg, noche.jpg, compras.jpg, cultura.jpg, foodie.jpg.
**Sin lugares:** `.fa-scene-empty` con gradient cálido `#FFF5DD → #FCE9C8` (sin animación), caption "Tu Florida Aventura te espera."

**Caption dinámico:**
- 0 lugares: "Tu aventura en Florida te espera."
- Domina playa: "**Modo playero:** sol, arena y brisa."
- Domina noche: "**Modo nocturno:** luces y ciudad."
- Domina compras: "**Modo compras:** espacio de sobra en el baúl."
- Domina cultura: "**Modo explorador:** descubriendo tesoros."
- Domina foodie: "**Modo foodie:** sabores de Miami."

**Lógica de categoría dominante:** ver `js/car-svg.js` — cuenta por categoría, en empate gana el orden de prioridad `['playa','noche','compras','cultura','foodie']`.

---

## Responsive

Breakpoints:
- `<720px`: top bar 56px, chips más chicos, sheet 64px cerrada, auto mini 64px, popup 280px.
- `<600px`: sheet body se vuelve 1 columna.
- `<420px`: oculta texto del brand.
