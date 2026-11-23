document.addEventListener('DOMContentLoaded', () => {
  const michi = document.getElementById('michiPersonaje');
  const form = document.getElementById('formContactos');
  const estado = document.getElementById('estadoContactos');

  const inputs = [
    document.getElementById('inputNombre'),
    document.getElementById('inputCorreo'),
    document.getElementById('inputTelefono'),
    document.getElementById('inputConsulta')
  ];

  if (!michi || !form) return;

  const poses = {
    reposo: 'img/gato-huellitas.lottie',
    activo: 'img/gato-asechar.lottie',
    borrar: 'img/gato-rasguño.lottie',
    celebrar: 'img/gato-caja.lottie'
  };

  let poseActual = poses.reposo;
  let temporizadorInactividad;
  let temporizadorBorrar;

  function cambiarEstado(nuevaPose) {
    if (poseActual === nuevaPose) return;
    poseActual = nuevaPose;

    michi.classList.remove('pose-pata', 'pose-caja');
    if (nuevaPose === poses.borrar) michi.classList.add('pose-pata');
    if (nuevaPose === poses.celebrar) michi.classList.add('pose-caja');

    if (typeof michi.load === 'function') {
      michi.load(nuevaPose);
    } else {
      michi.setAttribute('src', nuevaPose);
    }
  }

  function reiniciarInactividad() {
    clearTimeout(temporizadorInactividad);
    temporizadorInactividad = setTimeout(() => {
      cambiarEstado(poses.reposo);
    }, 6000);
  }

  inputs.forEach((input) => {
    if (!input) return;

    input.addEventListener('focus', () => {
      cambiarEstado(poses.activo);
      reiniciarInactividad();
    });

    input.addEventListener('input', (e) => {
      if (e.inputType === 'deleteContentBackward' || e.inputType === 'deleteContentForward') {
        cambiarEstado(poses.borrar);
        clearTimeout(temporizadorBorrar);
        temporizadorBorrar = setTimeout(() => {
          cambiarEstado(poses.activo);
        }, 1200);
      } else {
        cambiarEstado(poses.activo);
      }
      reiniciarInactividad();
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearTimeout(temporizadorInactividad);
    clearTimeout(temporizadorBorrar);

    cambiarEstado(poses.celebrar);
    if (estado) {
      estado.textContent = '¡Consulta enviada! El michi celebra tu mensaje.';
    }

    try {
      const formData = new FormData(form);
      const respuesta = await fetch('envio.php', {
        method: 'POST',
        body: formData
      });

      if (!respuesta.ok) {
        throw new Error('Error al guardar en la base de datos');
      }

      cambiarEstado(poses.celebrar);
      if (estado) estado.textContent = '¡Consulta enviada! El michi celebra tu mensaje.';
    } catch (err) {
      cambiarEstado(poses.borrar);
      if (estado) estado.textContent = 'No se pudo conectar con PHP/MySQL. Ábrelo desde localhost:8081.';
      return;
    }

    setTimeout(() => {
      form.reset();
      cambiarEstado(poses.reposo);
      if (estado) estado.textContent = '';
    }, 4500);
  });
});