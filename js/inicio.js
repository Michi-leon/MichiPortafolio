const luz = document.getElementById('luzCursor');
window.addEventListener('mousemove', (e) => {
  if (luz) {
    luz.style.left = e.clientX + 'px';
    luz.style.top = e.clientY + 'px';
  }
});

const contenedorParticulas = document.getElementById('particulas-container');
const colores = ['#D496A7', '#A1CDF1', '#9D695A'];

if (contenedorParticulas) {
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.classList.add('particula');
    const size = Math.random() * 6 + 3;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = (Math.random() * 96 + 2) + 'vw';
    p.style.top = (Math.random() * 92 + 4) + 'vh';
    p.style.backgroundColor = colores[i % colores.length];
    p.style.animationDuration = (Math.random() * 3 + 2.5) + 's';
    p.style.animationDelay = '-' + (Math.random() * 3) + 's';
    contenedorParticulas.appendChild(p);
  }
}

const parrafoHero = document.getElementById('parrafoHero');
document.addEventListener('selectionchange', () => {
  if (!parrafoHero) return;
  const seleccion = window.getSelection().toString().trim();
  if (seleccion.length > 0 && parrafoHero.textContent.includes(seleccion)) {
    parrafoHero.classList.add('sombreando');
  } else {
    parrafoHero.classList.remove('sombreando');
  }
});