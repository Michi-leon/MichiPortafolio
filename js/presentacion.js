const tituloTexto = "Sobre Mí";
const parrafoTexto = "¡Hola! Soy Michelle Cameron Leon Leyva, estudiante de Diseño y Desarrollo de Software en TECSUP. Me apasiona el diseño web, la programación y todo lo que tenga que ver con crear experiencias digitales. Actualmente sigo explorando nuevas herramientas mientras desarrollo mis propios proyectos.";
let escrituraIniciada = false;

function iniciarEscritura() {
  if (escrituraIniciada) return;
  escrituraIniciada = true;

  const tituloEl = document.getElementById('tituloSobreMi');
  const parrafoEl = document.getElementById('textoSobreMi');
  const acciones = document.getElementById('accionesPerfil');

  tituloEl.innerHTML = '<span id="letrasTitulo"></span><span class="cursor-escribiendo" id="cursorActivo"></span>';
  const spanTitulo = document.getElementById('letrasTitulo');
  let i = 0;

  const intTitulo = setInterval(() => {
    spanTitulo.textContent += tituloTexto.charAt(i);
    i++;
    if (i >= tituloTexto.length) {
      clearInterval(intTitulo);
      const c1 = document.getElementById('cursorActivo');
      if (c1) c1.remove();
      tituloEl.innerHTML = 'Sobre <em>Mí</em>';
      escribirParrafo(parrafoEl, acciones);
    }
  }, 55);
}

function escribirParrafo(parrafoEl, acciones) {
  parrafoEl.innerHTML = '<span id="letrasParrafo"></span><span class="cursor-escribiendo" id="cursorParrafo"></span>';
  const spanParrafo = document.getElementById('letrasParrafo');
  let j = 0;

  const intParrafo = setInterval(() => {
    spanParrafo.textContent += parrafoTexto.charAt(j);
    j++;
    if (j >= parrafoTexto.length) {
      clearInterval(intParrafo);
      const c2 = document.getElementById('cursorParrafo');
      if (c2) c2.remove();
      acciones.classList.add('visible');
    }
  }, 22);
}
//para responsive
const zonaPerfilTexto = document.querySelector('#sec-2 .col-lg-7');
const avatarPerfil = document.getElementById('avatarPerfil');
const textoPerfilEl = document.getElementById('textoSobreMi');

if (textoPerfilEl) {
  let modoEnfoque = false;
  const textoOriginal = "¡Hola! Soy Michelle Cameron Leon Leyva, estudiante de Diseño y Desarrollo de Software en TECSUP. Me apasiona el diseño web, la programación y todo lo que tenga que ver con crear experiencias digitales.";
  const textoEnfoque = "Mi enfoque combina arquitectura de software limpia con diseño editorial centrado en el usuario. Busco transformar cada requerimiento técnico en una interfaz intuitiva, rápida y memorable.";

  const alternarTextoPerfil = (e) => {
    if (window.innerWidth > 991 || e.target.closest('a')) return;
    modoEnfoque = !modoEnfoque;
    textoPerfilEl.textContent = modoEnfoque ? textoEnfoque : textoOriginal;
  };

  if (zonaPerfilTexto) zonaPerfilTexto.addEventListener('click', alternarTextoPerfil);
  if (avatarPerfil) avatarPerfil.addEventListener('click', alternarTextoPerfil);
}