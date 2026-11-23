document.addEventListener('DOMContentLoaded', () => {
  const datosTestimonios = [
    {
      frase: "“Michelle es una estudiante muy aplicada e inteligente. Es muy trabajadora y siempre busca el camino mas cómodo y versatil a la hora de realizar sus actividades.”",
      nombre: "Dylan Paul Bustos Mauricio",
      cargo: "Alumno de Diseño y Desarrollo de  Software • TECSUP",
      redes: `
        <a href="mailto:dylan.bustos@tecsup.edu.pe" title="Correo"><i class="fa-solid fa-envelope"></i></a>
        <a href="https://wa.me/51956388779" target="_blank" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      `
    },
    {
      frase: "“Trabajar con Michelle en proyectos grupales es súper fluido. Siempre propone ideas creativas para que la web no se vea genérica y se encarga de que todo funcione sin errores.”",
      nombre: "Valeria Quispe",
      cargo: "Compañera de Equipo • Diseño de Software",
      redes: `
        <a href="mailto:valeria@correo.com" title="Correo"><i class="fa-solid fa-envelope"></i></a>
        <a href="https://wa.me/51999999999" target="_blank" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      `
    },
    {
      frase: "“Demuestra una evolución constante en HTML5, CSS3 y JavaScript. Su portafolio refleja dominio técnico, creatividad y compromiso con cada reto académico.”",
      nombre: "Miguel Pallín",
      cargo: "Docente en los curso de Informática y Diseño",
      redes: `
        <a href="mailto:miguel_pallin@hotmail.com " title="Correo"><i class="fa-solid fa-envelope"></i></a>
        <a href="https://wa.me/51968069577" target="_blank" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      `
    }
  ];

  const botones = document.querySelectorAll('.avatar-btn');
  const escenario = document.getElementById('citaEscenario');
  const fraseEl = document.getElementById('fraseTexto');
  const nombreEl = document.getElementById('autorNombre');
  const cargoEl = document.getElementById('autorCargo');
  const redesEl = document.getElementById('autorRedes');

  if (!botones.length || !escenario) return;

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('activo')) return;

      botones.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');

      const info = datosTestimonios[btn.dataset.index];
      escenario.classList.add('cambiando');

      setTimeout(() => {
        fraseEl.textContent = info.frase;
        nombreEl.textContent = info.nombre;
        cargoEl.textContent = info.cargo;
        redesEl.innerHTML = info.redes;
        escenario.classList.remove('cambiando');
      }, 220);
    });
  });
});