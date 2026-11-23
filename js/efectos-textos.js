const charsScramble = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

// 1. Mover la píldora blanca/rosada del Navbar hacia el enlace activo
function actualizarPillNavbar() {
  const pill = document.getElementById('navPill');
  const activo = document.querySelector('#navMenu .nav-link.active');
  if (!pill || !activo || window.innerWidth < 992) {
    if (pill) pill.style.opacity = '0';
    return;
  }
  pill.style.opacity = '1';
  pill.style.left = activo.offsetLeft + 'px';
  pill.style.width = activo.offsetWidth + 'px';
}

// 2. Decodificador rápido para el subtítulo de Inicio
function efectoScrambleRapido(elemento, textoFinal, velocidad = 18) {
  if (!elemento) return;
  let iteracion = 0;
  clearInterval(elemento.intervaloScramble);

  elemento.intervaloScramble = setInterval(() => {
    elemento.textContent = textoFinal
      .split('')
      .map((letra, index) => {
        if (letra === ' ') return ' ';
        if (index < iteracion) return textoFinal[index];
        return charsScramble[Math.floor(Math.random() * charsScramble.length)];
      })
      .join('');

    if (iteracion >= textoFinal.length) {
      clearInterval(elemento.intervaloScramble);
      elemento.textContent = textoFinal;
    }
    iteracion += 0.8;
  }, velocidad);
}

// 3. Convertir cada palabra del párrafo de Inicio en interactiva
function prepararParrafoInicio() {
  const parrafo = document.getElementById('parrafoHero');
  if (!parrafo) return;
  const palabras = parrafo.textContent.trim().split(/\s+/);
  parrafo.innerHTML = palabras
    .map(p => `<span class="palabra-desc">${p}</span>`)
    .join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar píldora del Navbar y escuchar cambios de tamaño
  setTimeout(actualizarPillNavbar, 100);
  window.addEventListener('resize', actualizarPillNavbar);

  // Observar cuando cambia la clase .active en los links del navbar
  const navMenu = document.getElementById('navMenu');
  if (navMenu) {
    const navObserver = new MutationObserver(actualizarPillNavbar);
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      navObserver.observe(link, { attributes: true, attributeFilter: ['class'] });
    });
  }

  // Efectos en Inicio (subtítulo + párrafo palabra por palabra)
  const subHero = document.getElementById('subtituloHero');
  if (subHero) {
    efectoScrambleRapido(subHero, subHero.textContent, 18);
  }
  prepararParrafoInicio();

  // Secreto 1: Clic en "PROYECTOS SELECCIONADOS" activa Modo Blueprint
  const sec1 = document.getElementById('sec-1');
  const tituloProyectosSub = sec1 ? sec1.querySelector('.seccion-subtitulo') : null;
  if (sec1 && tituloProyectosSub) {
    tituloProyectosSub.addEventListener('click', () => {
      sec1.classList.toggle('modo-blueprint');
      const activo = sec1.classList.contains('modo-blueprint');
      const orig = 'PROYECTOS SELECCIONADOS';
      tituloProyectosSub.textContent = activo ? '📐 MODO BLUEPRINT [GRID: 12-COL]' : orig;
    });
  }

  // Secreto 2: Clic en "STACK TECNOLÓGICO" baraja y reparte las cartas
  const secretoBtn = document.getElementById('secretoStack');
  const grid = document.getElementById('gridHabilidades');
  const toast = document.getElementById('michiSecretoToast');

  if (secretoBtn && grid) {
    secretoBtn.addEventListener('click', () => {
      const columnas = Array.from(grid.children);
      if (toast) toast.classList.remove('d-none');

      columnas.forEach(col => col.classList.add('barajando'));

      setTimeout(() => {
        for (let i = columnas.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          grid.appendChild(columnas[j]);
        }
        columnas.forEach(col => col.classList.remove('barajando'));
      }, 420);

      setTimeout(() => {
        if (toast) toast.classList.add('d-none');
      }, 2200);
    });
  }
});

// 4. Animaciones de entrada al cambiar de pantalla
const observadorSecciones = new MutationObserver((mutaciones) => {
  mutaciones.forEach(m => {
    if (m.target.classList.contains('activa')) {
      actualizarPillNavbar();

      const proyectos = m.target.querySelectorAll('.proyecto-item');
      proyectos.forEach((item, idx) => {
        item.classList.remove('anim-entrada');
        void item.offsetWidth;
        item.style.animationDelay = (idx * 0.12) + 's';
        item.classList.add('anim-entrada');
      });

      const tarjetas = m.target.querySelectorAll('.flip-card');
      tarjetas.forEach(card => {
        card.classList.remove('anim-vuelo');
        void card.offsetWidth;
        card.classList.add('anim-vuelo');
      });
    }
  });
});

document.querySelectorAll('.pantalla').forEach(sec => {
  observadorSecciones.observe(sec, { attributes: true, attributeFilter: ['class'] });
});