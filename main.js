/**
 * Índice de Trabajos Prácticos — Carrusel Interactivo
 * Materia: Diseño UX-UI (2026) | Dante Sala
 */

document.addEventListener('DOMContentLoaded', () => {
  initTpCarousel();
});

function initTpCarousel() {
  const carousel = document.getElementById('tp-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const cards = carousel ? carousel.querySelectorAll('.tp-card') : [];

  if (!carousel || !cards.length) return;

  function updateCarouselState() {
    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

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
      const cardWidth = cards[0].offsetWidth;
      const gap = 28;
      carousel.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    });
  }

  // Scroll hacia la derecha
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth;
      const gap = 28;
      carousel.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
    });
  }

  carousel.addEventListener('scroll', updateCarouselState, { passive: true });
  window.addEventListener('resize', updateCarouselState, { passive: true });

  // Estado inicial de visibilidad de botones
  updateCarouselState();
}
