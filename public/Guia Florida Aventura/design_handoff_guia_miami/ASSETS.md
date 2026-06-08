# Assets

Todos los paths son relativos a la raíz del bundle de handoff.

## Marca

| Archivo | Uso |
|---------|-----|
| `assets/imagotipo-completo.png` | Logo grande para la intro (con marca completa). |
| `assets/imagotipo.png` | Imagotipo compacto del top bar. |
| `assets/logotipo.png` | Wordmark, no se usa hoy pero queda como backup. |
| `assets/auto-fa.png` | Auto principal vista 3/4 — el que se renderiza en `.fa-car-img`. |
| `assets/auto-lateral.png` | Variante lateral, no se usa hoy. |

## Fotos de la intro (`assets/intro/`)

9 fotos JPG/HEIC convertidas, todas con cobertura cover. Se rotan cada 5s.

- `key-biscayne.jpg`
- `downtown.jpg`
- `wynwood.jpg`
- `keys-highway.jpg`
- `lighthouse-sunset.jpg`
- `little-havana.jpg`
- `brickell.jpg`
- `outlets.jpg`
- `coconut-grove.jpg`

## Escenas del "auto sobre escena" (`assets/moods/`)

Una por categoría — se muestra detrás del auto cuando esa categoría domina el wishlist.

- `playa.jpg`
- `noche.jpg`
- `compras.jpg`
- `cultura.jpg`
- `foodie.jpg`

## Procedencia

Mezcla de fotos cedidas por el cliente (carpeta `uploads/` del proyecto original) y referencias de stock/Instagram (`vic.ceron_*` son del Instagram de la marca). **Antes de producción, verificar derechos de uso de cada imagen** — algunas fotos de stock genéricas (Brickell, Little Havana, Miami downtown, etc.) probablemente deban reemplazarse por contenido licenciado o material propio.

## Iconografía

Todos los íconos son **emojis Unicode nativos**, no SVG ni font-icon: 🏖️ 🌃 🎨 🍽️ 🛍️ ✈️ 🚗 🕒 💵 💡 💬 📸 ★ ✓ ♥ ♡. Decisión deliberada: rinden bien en mobile, son universales, y mantienen la vibra "guía amigable". Si el codebase destino tiene un sistema de iconografía (lucide, heroicons, etc.) y se prefiere uniformidad, está bien reemplazarlos siempre que se mantenga la legibilidad y se sumen colores donde hoy el emoji aporta color (ej. categorías).

## SVG inline

Solo uno: la estrella del rating en el popup. Path:

```html
<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l2.9 6.9L22 10l-5 5 1.5 7-6.5-3.5L5.5 22 7 15l-5-5 7.1-1.1z"/>
</svg>
```
