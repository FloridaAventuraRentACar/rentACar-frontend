// ============================================================
// car-svg.js · v4 (escena = foto real)
// ============================================================
// Muestra el auto Florida Aventura (vista 3/4) sobre la foto
// temática que corresponde a la categoría dominante en la
// wishlist del usuario.
// ============================================================

(function (global) {
  'use strict';

  const SCENES = {
    none: {
      bg: null,
      caption: 'Tu Florida Aventura te espera.'
    },
    playa: {
      bg: 'assets/moods/playa.jpg',
      caption: '<strong>Modo playero:</strong> sol, arena y brisa.'
    },
    noche: {
      bg: 'assets/moods/noche.jpg',
      caption: '<strong>Modo nocturno:</strong> luces y ciudad.'
    },
    compras: {
      bg: 'assets/moods/compras.jpg',
      caption: '<strong>Modo compras:</strong> espacio de sobra en el baúl.'
    },
    cultura: {
      bg: 'assets/moods/cultura.jpg',
      caption: '<strong>Modo explorador:</strong> descubriendo tesoros.'
    },
    foodie: {
      bg: 'assets/moods/foodie.jpg',
      caption: '<strong>Modo foodie:</strong> sabores de Miami.'
    }
  };

  // Empate → orden de prioridad.
  const PRIORITY = ['playa', 'noche', 'compras', 'cultura', 'foodie'];

  function dominantCategory(counts) {
    counts = counts || {};
    let best = null, bestN = 0;
    PRIORITY.forEach(cat => {
      const n = counts[cat] || 0;
      if (n > bestN) { best = cat; bestN = n; }
    });
    return best;
  }

  function buildCar(counts) {
    const cat = dominantCategory(counts);
    const scene = SCENES[cat] || SCENES.none;
    const bg = scene.bg
      ? `<div class="fa-scene" style="background-image:url('${scene.bg}')"></div>`
      : `<div class="fa-scene fa-scene-empty"></div>`;
    return `
      <div class="fa-car-wrap" data-scene="${cat || 'none'}">
        ${bg}
        <div class="fa-scene-overlay"></div>
        <img class="fa-car-img" src="assets/auto-fa.png" alt="Florida Aventura" draggable="false">
      </div>
    `;
  }

  function buildCaption(counts) {
    const cat = dominantCategory(counts);
    return (SCENES[cat] || SCENES.none).caption;
  }

  global.FACar = { buildCar, buildCaption, dominantCategory };
})(window);
