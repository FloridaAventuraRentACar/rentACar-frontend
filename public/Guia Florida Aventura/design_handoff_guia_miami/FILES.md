# Archivos en este bundle

```
design_handoff_guia_miami/
├── README.md                       ← empezar acá
├── SCREENS.md                      ← anatomía pantalla por pantalla
├── STATE_AND_INTERACTIONS.md       ← estado, eventos, animaciones
├── ASSETS.md                       ← inventario de imágenes/íconos
├── FILES.md                        ← este archivo
│
├── prototipo.html                  ← prototipo principal (HTML+CSS+intro+layout)
├── js/
│   ├── app.js                      ← lógica: mapa, pines, popups, wishlist, sheet
│   └── car-svg.js                  ← componente "auto sobre escena" + lógica de categoría dominante
├── data/
│   ├── lugares-miami.json          ← catálogo de lugares (fuente de verdad)
│   └── lugares-miami.js            ← misma data envuelta en window.LUGARES_DATA para el prototipo HTML
└── assets/                         ← logos, autos, fotos de intro y moods
    ├── imagotipo.png
    ├── imagotipo-completo.png
    ├── logotipo.png
    ├── auto-fa.png
    ├── auto-lateral.png
    ├── intro/
    │   └── (9 fotos de Miami)
    └── moods/
        └── (5 escenas, una por categoría)
```

## Cómo ver el prototipo

Abrir `prototipo.html` con un servidor estático (no `file://` por las CORS de Leaflet y los assets).

```bash
# Opción rápida
npx serve .
# o
python3 -m http.server 8000
```

Después abrir `http://localhost:8000/prototipo.html`.

## Sugerencia de stack para implementación

Recomendación si no hay codebase aún:

- **Framework:** Next.js 14 (App Router) + TypeScript.
- **Estilos:** Tailwind con tokens custom para la paleta (mapear `--coral`, `--teal`, etc. al `theme.colors`), o CSS modules con CSS variables (los valores ya están en el README).
- **Mapa:** `react-leaflet` v4 + `leaflet` + el mismo tile layer de CARTO. Alternativamente MapLibre GL JS si se quiere algo más performante y custom.
- **Estado:** `useState` + `useEffect` para localStorage. Zustand o jotai si crece. No hace falta data fetching server-side; los lugares pueden ser un JSON importado.
- **Fuentes:** `next/font/google` con Oswald y Lato.
- **Analytics:** trackear `add_to_wishlist`, `reach_3_places`, `click_whatsapp_cta`, `click_share`.

## Posibles próximos pasos (no incluidos en este prototipo)

- Foto real por lugar (campo `imagen` ya está en el modelo, hoy null en todos).
- Vista de detalle del lugar como página propia (SEO).
- Más lugares en categorías hoy flacas: noche, compras.
- Filtros adicionales: "Apto niños", "Cerca de MIA (<30 min)", "Abierto ahora".
- Permalink al itinerario (codificar la wishlist en la URL) para compartir.
- Versión imprimible / exportable a PDF del itinerario.
- Multi-idioma (hoy solo es).
