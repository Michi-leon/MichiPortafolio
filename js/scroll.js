let seccionActual = 0;
let bloqueado = false;
const pantallas = document.querySelectorAll('.pantalla');
const navLinks = document.querySelectorAll('.nav-link');

function irASeccion(indice) {
  if (bloqueado || indice === seccionActual || indice < 0 || indice >= pantallas.length) return;
  bloqueado = true;
  seccionActual = indice;

  pantallas.forEach((sec, i) => {
    sec.classList.remove('activa', 'pasada');
    if (i === indice) sec.classList.add('activa');
    else if (i < indice) sec.classList.add('pasada');
  });

  navLinks.forEach((link, i) => {
    link.classList.toggle('active', i === indice);
  });

  // Si llegamos a "Perfil" (pantalla 2), dispara el efecto de escritura
  if (indice === 2 && typeof iniciarEscritura === 'function') {
    iniciarEscritura();
  }

  setTimeout(() => { bloqueado = false; }, 900);
}

// Click en links del navbar
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    irASeccion(parseInt(link.dataset.sec));

    // Cierra el menú hamburguesa automáticamente en celular/tablet
    const menuColapsable = document.getElementById('navbarNavDropdown');
    if (menuColapsable && menuColapsable.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menuColapsable).hide();
    }
  });
});

// Rueda del mouse (Desktop)
window.addEventListener('wheel', (e) => {
  const modalAbierto = document.getElementById('modalLenguaje')?.classList.contains('show');
  if (bloqueado || modalAbierto) return;

  if (e.deltaY > 40) {
    irASeccion(seccionActual + 1);
  } else if (e.deltaY < -40) {
    irASeccion(seccionActual - 1);
  }
}, { passive: true });

// Deslizar con el dedo arriba/abajo (Móvil / Tablet)
let toqueInicioY = 0;
window.addEventListener('touchstart', (e) => {
  toqueInicioY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const modalAbierto = document.getElementById('modalLenguaje')?.classList.contains('show');
  if (bloqueado || modalAbierto) return;

  // Si el usuario está deslizando horizontalmente las tarjetas de Habilidades, no cambies de sección
  if (e.target.closest('#gridHabilidades')) return;

  const pantallaActiva = pantallas[seccionActual];
  const diferenciaY = toqueInicioY - e.changedTouches[0].clientY;

  if (Math.abs(diferenciaY) < 55) return;

  if (diferenciaY > 0) {
    // Deslizó hacia arriba -> bajar a siguiente sección (solo si ya llegó al final del scroll interno)
    const llegoAlFinal = pantallaActiva.scrollTop + pantallaActiva.clientHeight >= pantallaActiva.scrollHeight - 10;
    if (llegoAlFinal) irASeccion(seccionActual + 1);
  } else {
    // Deslizó hacia abajo -> subir a sección anterior (solo si está arriba del todo)
    if (pantallaActiva.scrollTop <= 10) irASeccion(seccionActual - 1);
  }
}, { passive: true });