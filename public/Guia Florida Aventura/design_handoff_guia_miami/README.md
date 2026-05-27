# Handoff: Guía Miami · Florida Aventura

## Overview

Mapa interactivo para que un turista hispanohablante que va a Miami arme su propio itinerario de lugares para visitar, basado en cinco categorías (playa, noche, cultura, foodie y compras). El objetivo de negocio es generar leads para **Florida Aventura**, una empresa de alquiler de autos: la propuesta de valor es "estos lugares solo los conoces si tienes auto", y al juntar 3+ lugares aparece un CTA hacia WhatsApp para reservar.

El flujo es:

1. Intro pantalla completa con slideshow de Miami + CTA "Comenzar mi ruta".
2. Mapa de Miami con pines de lugares categorizados + pin fijo del aeropuerto MIA.
3. Filtros (chips por categoría + toggle "solo gratis").
4. Tap en pin → popup con foto/gradiente, rating, descripción, tips, horarios, links a Google Maps + reseñas, y corazón para agregar al itinerario.
5. Bottom sheet "Tu itinerario": muestra el auto de la marca sobre una escena que **cambia según la categoría dominante** del wishlist + lista de lugares + CTA a WhatsApp cuando hay 3+ lugares.
6. Persistencia en `localStorage`.

## About the Design Files

Los archivos en este bundle son **referencias de diseño hechas en HTML** — prototipos que muestran el look & feel y el comportamiento previstos, **no código de producción para copiar tal cual**. La tarea es **recrear estos diseños en el entorno del codebase destino** (React/Next, Vue, Astro, lo que sea) usando los patrones y librerías ya establecidos. Si no hay codebase aún, elegir el framework más apropiado (recomendación: Next.js + React, dado que es un sitio mayormente estático con un mapa interactivo).

El mapa actual está hecho con **Leaflet** vanilla. En un stack React conviene reemplazarlo por **react-leaflet** o **MapLibre GL JS** según preferencia. Los datos de lugares están en un JS/JSON estático; pueden migrarse a un CMS o quedar como JSON en el repo.

## Fidelity

**High-fidelity (hifi).** Colores finales, tipografía final, espaciados, animaciones e interacciones definidas. Recrear pixel-perfect.

## Brand System

### Paleta

```
--teal:     #1AAFAF    (acento secundario)
--teal-2:   #35DFD0
--teal-dk:  #0E7878
--coral:    #E8473A    (acento principal / CTA / wished)
--yellow:   #E8C653    (pin MIA)
--navy:     #0a1525    (fondo intro + CTA card)
--ink:      #1a1a1a    (texto principal)
--paper:    #FAF7F1    (fondo app)
--line:     #E8E2D3    (bordes suaves)
--muted:    #6f6a5e    (texto secundario)
--pink:     #E84A8C    (categoría compras)
--violet:   #7A4AE0    (categoría noche)
--orange:   #F2A03D    (categoría foodie)
```

### Tipografía

- **Display / títulos:** `Oswald` 500/600/700 (Google Fonts)
- **UI / cuerpo:** `Lato` 300/400/700/900 (Google Fonts)
- Body base: 14–16px. Títulos popup: 18px Oswald 600. Headline intro: clamp(28px, 6vw, 42px).

### Categorías (color + ícono emoji)

| Categoría | Color    | Ícono |
|-----------|----------|-------|
| Playas    | #1AAFAF  | 🏖️    |
| Noche     | #7A4AE0  | 🌃    |
| Cultura   | #E8473A  | 🎨    |
| Foodie    | #F2A03D  | 🍽️    |
| Compras   | #E84A8C  | 🛍️    |

### Radios y sombras

- Pins / chips / botones pill: `border-radius: 100px`
- Cards / popups: `18–22px`
- Sheet: `22px` arriba
- Sombra principal: `0 16px 48px rgba(0,0,0,0.18)`
- Sombra de pin: `0 2px 8px rgba(0,0,0,0.18)`

Ver `STYLES.md` y `SCREENS.md` para el detalle por componente.
