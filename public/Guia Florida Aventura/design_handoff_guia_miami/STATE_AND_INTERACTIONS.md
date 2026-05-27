# Estado, datos e interacciones

## Estado global

```ts
type Category = 'playa' | 'noche' | 'cultura' | 'foodie' | 'compras';

interface AppState {
  activeCategory: Category | 'all';   // chip activo
  freeOnly: boolean;                  // toggle "Planes gratuitos"
  wishlist: string[];                 // ids de lugares (orden de inserción)
}
```

### Persistencia
- `localStorage.fa-miami-wishlist-v1` → `JSON.stringify(wishlist)`
- `sessionStorage.fa-cta-shown` → flag "1" para no abrir el sheet más de una vez por sesión cuando se llega a 3 lugares.

### Derivado
- `countsByCategory`: `{playa: 2, noche: 1, ...}` calculado de `wishlist`.
- `dominantCategory`: la de mayor count, desempate por prioridad fija `['playa','noche','compras','cultura','foodie']`.

---

## Modelo de datos (lugar)

```ts
interface Place {
  id: string;                  // slug único
  nombre: string;
  categoria: Category;
  lat: number;
  lng: number;
  barrio: string;
  descripcion: string;
  kmDesdeMIA: number;          // entero
  minutosDesdeMIA: number;     // entero
  gratis: boolean;
  precioReferencial: string | null;   // ej "USD 25 adultos"
  rating: number;              // 0–5
  ratingsCount: string;        // formateado con punto miles ej "92.000+"
  tips: string;                // recomendación local, frase corta
  horarios: string;            // texto libre
  imagen: string | null;       // path a imagen real, hoy null en todos
}
```

Datos completos en `lugares-miami.json`.

---

## Interacciones

### Click en pin
1. Leaflet abre popup ligado a ese marker.
2. Re-bindea los botones internos del popup (corazón + links externos).
3. Refresca clases de pines (por si cambia el wished state).

### Click en corazón (popup)
1. `toggleWishlist(id)` — push/splice según presencia.
2. `saveWishlist()` localStorage.
3. Toast "Añadido: NombreLugar" solo al agregar.
4. Re-renderiza popup (con corazón actualizado), re-renderiza sheet, refresca clases de pines.
5. Si `wishlist.length === 3` y aún no se mostró el CTA en esta sesión: abrir sheet + toast especial.

### Click en × dentro del wishlist
Mismo `toggleWishlist`. No abre popup ni vuela el mapa.

### Click en item del wishlist (no en ×)
`map.flyTo([lat, lng], 14, {duration: 0.8})` + 900ms después `markers[id].openPopup()` + cierra sheet.

### Chips de categoría
- 1 sola activa a la vez (radio behavior).
- `'all'` es el default. No filtra.
- Solo cambia clases visuales (`.dimmed`) sobre los pines existentes — no remueve markers.

### Toggle "Planes gratuitos"
Filtro combinable con la categoría: un pin se ve cuando `(activeCategory === 'all' || place.categoria === activeCategory) && (!freeOnly || place.gratis)`. Lo demás → `dimmed`.

### Tap en `.sheet-head`
Toggle `.open` class en el sheet. Animación CSS por `max-height` transition.

### "Borrar todo"
`window.confirm('¿Borrar todos los lugares de tu lista?')`. Si OK → vacía wishlist, persiste, re-renderiza, toast.

### "Compartir mi ruta 📸"
```js
const text = `Mi Miami con @floridaaventura · ${n} lugares · ${counts mapeados}`;
navigator.share ? navigator.share({title, text}) : navigator.clipboard.writeText(text) + toast;
```
Si no hay items, toast "Añade algunos lugares primero ✨".

### Links externos (Google Maps, WhatsApp)
Helper `openExternal(url)` que intenta `window.open`; si falla (sandbox iframe) intenta `window.top.location.href`; última opción copia al portapapeles + toast.

---

## Animaciones

| Elemento | Animación | Detalle |
|----------|-----------|---------|
| Intro slides | `kenburns` 8s ease-out forwards | scale 1.0 → 1.14, translate -1% -1% |
| Intro cross-fade | opacity transition 1.6s ease | autoplay setInterval 5000ms |
| Intro dismiss | opacity 1→0 en 0.55s + display:none | |
| Escena del auto | `scene-zoom` 14s ease-in-out infinite alternate | scale 1.0 ↔ 1.08 |
| Auto al cambiar | `car-pop` 0.45s ease | opacity 0→1, translateY 8→0 |
| Pin hover | transform scale(1.06) 0.15s | |
| Botones CTA hover | translateY(-1px o -2px) | |
| Sheet toggle | `max-height` 0.3s ease | |
| Flecha sheet | rotate 180° 0.25s | |
| Toast | opacity + translateY 0.25s ease | dismiss 2.4s |
| flyTo (mapa) | Leaflet built-in 0.8s | |

---

## Dependencias actuales

- **Leaflet 1.9.4** + CSS (CDN). Reemplazar por react-leaflet o MapLibre en el target.
- **Google Fonts**: Oswald + Lato.
- Sin más libs.

---

## Notas para el dev

- El mapa no usa clustering; con ~25 lugares no hace falta. Si crece bastante, considerar Leaflet.markercluster o equivalente.
- Los popups de Leaflet aceptan HTML string. Si se pasa a react-leaflet, lo natural es `<Popup>` con JSX y bindear handlers normalmente.
- Hoy las imágenes de los lugares no se usan (todos los `imagen: null` y los popups muestran gradient + emoji). El campo está reservado para cuando haya fotos reales — al implementar, el `pop-img` debería mostrar `<img>` con object-fit cover si `imagen` no es null, y caer al gradient + emoji como fallback.
- Los textos de copy son finales en español. **No traducir.**
- Número de WhatsApp: `+1 305 773 1787` — verificar antes de production.
- El "auto sobre escena" es identidad visual fuerte de la marca. Mantenerlo central, no esconderlo.
- En mobile, la sheet abierta debe ser scrolleable (`overflow-y: auto`), no la página entera.
- El intro corre **siempre** al cargar (no se persiste). Decisión consciente: el slideshow es parte del awareness de marca.
