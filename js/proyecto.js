const itemsProyecto = document.querySelectorAll('.proyecto-item');
const previewBox = document.getElementById('previewBox');
const previewOverlay = document.getElementById('previewOverlay');
const videoEl = document.getElementById('proyectoVideo');
let itemActivo = itemsProyecto[0];

if (previewBox && itemActivo) {
  previewBox.style.backgroundImage = `url('${itemActivo.dataset.img}')`;
}

itemsProyecto.forEach(item => {
  item.addEventListener('mouseenter', () => {
    itemActivo = item;
    videoEl.pause();
    videoEl.classList.add('d-none');
    previewOverlay.classList.remove('d-none');

    previewBox.style.backgroundImage = `url('${item.dataset.img}')`;
    document.getElementById('previewTag').textContent = item.dataset.tag;
    document.getElementById('previewTitle').textContent = item.dataset.title;
    document.getElementById('previewDesc').textContent = item.dataset.desc;
  });
});

function reproducirVideoProyecto() {
  if (!itemActivo) return;
  const esBlueprint = document.getElementById('sec-1')?.classList.contains('modo-blueprint');
  const rutaVideo = esBlueprint && itemActivo.dataset.videoBlueprint
    ? itemActivo.dataset.videoBlueprint
    : itemActivo.dataset.video;

  previewOverlay.classList.add('d-none');
  videoEl.src = rutaVideo;
  videoEl.classList.remove('d-none');
  videoEl.play();
}