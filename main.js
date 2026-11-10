/**
 * Índice de Trabajos Prácticos — Carrusel Interactivo
 * Materia: Diseño UX-UI (2026) | Dante Sala
 */

function initTpCarousel() {
  const carousel = document.getElementById('tp-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!carousel) return;
  const cards = carousel.querySelectorAll('.tp-card');
  if (!cards.length) return;

  function updateCarouselState() {
    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    // Si todo el contenido entra en pantalla sin necesidad de scroll
    if (maxScroll <= 5) {
      if (prevBtn) prevBtn.classList.add('is-hidden');
      if (nextBtn) nextBtn.classList.add('is-hidden');
      return;
    }

    // Mostrar/ocultar botones de forma dinámica según la dirección disponible
    if (prevBtn) {
      if (scrollLeft <= 10) {
        prevBtn.classList.add('is-hidden');
      } else {
        prevBtn.classList.remove('is-hidden');
      }
    }

    if (nextBtn) {
      if (scrollLeft >= maxScroll - 10) {
        nextBtn.classList.add('is-hidden');
      } else {
        nextBtn.classList.remove('is-hidden');
      }
    }
  }

  // Scroll hacia la izquierda
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const card = cards[0];
      const cardWidth = card ? card.offsetWidth : 350;
      const gap = 28;
      carousel.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    });
  }

  // Scroll hacia la derecha
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const card = cards[0];
      const cardWidth = card ? card.offsetWidth : 350;
      const gap = 28;
      carousel.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
    });
  }

  carousel.addEventListener('scroll', updateCarouselState, { passive: true });
  window.addEventListener('resize', updateCarouselState, { passive: true });

  // Estado inicial de visibilidad de botones
  updateCarouselState();
}

// Ejecución defensiva: si el DOM ya cargó, inicializar de inmediato; si no, esperar al evento.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTpCarousel);
} else {
  initTpCarousel();
}
