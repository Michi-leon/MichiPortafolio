document.addEventListener('DOMContentLoaded', () => {
  window.tablaProyectosSQL = [
    { id: 1, nombre: 'Portafolio Editorial', tech: 'Web' },
    { id: 2, nombre: 'Sistema Académico', tech: 'Java' }
  ];

  // 1. Girar tarjetas en 3D
  document.querySelectorAll('.flip-card').forEach(tarjeta => {
    tarjeta.addEventListener('click', () => tarjeta.classList.toggle('volteada'));
  });

  // 2. Diccionario de Mini-Apps por habilidad
  const demosLenguajes = {
    python: {
      titulo: "Python — Calculadora Completa",
      codigo: "def operar(a, b, op):\n    ops = {'+': a+b, '-': a-b, '*': a*b, '/': a/b}\n    return round(ops[op], 2)",
      html: `
        <div class="d-flex gap-2 mb-2">
          <input type="number" id="pyA" class="form-control form-control-sm bg-dark text-white" value="24">
          <input type="number" id="pyB" class="form-control form-control-sm bg-dark text-white" value="6">
        </div>
        <div class="btn-group w-100 mb-2">
          <button type="button" class="btn btn-sm btn-outline-info" onclick="calcPy('+')">+</button>
          <button type="button" class="btn btn-sm btn-outline-info" onclick="calcPy('-')">−</button>
          <button type="button" class="btn btn-sm btn-outline-info" onclick="calcPy('*')">×</button>
          <button type="button" class="btn btn-sm btn-outline-info" onclick="calcPy('/')">÷</button>
        </div>
        <div class="p-2 rounded text-center" style="background:#0e0c0b;">
          <span id="pyRes" class="fw-bold" style="color: var(--old-rose);">Resultado: 30</span>
        </div>
      `
    },
    java: {
      titulo: "Java — Mini-Juego: Piedra, Papel o Tijera",
      codigo: "String[] opciones = {\"Piedra\", \"Papel\", \"Tijera\"};\nString cpu = opciones[new Random().nextInt(3)];\n// Comparación de lógica POO",
      html: `
        <p class="small mb-2 text-center">Elige tu jugada contra la JVM:</p>
        <div class="d-flex justify-content-center gap-2 mb-2">
          <button type="button" class="btn btn-sm btn-outline-light" onclick="jugarJava('Piedra')">🪨 Piedra</button>
          <button type="button" class="btn btn-sm btn-outline-light" onclick="jugarJava('Papel')">📄 Papel</button>
          <button type="button" class="btn btn-sm btn-outline-light" onclick="jugarJava('Tijera')">✂️ Tijera</button>
        </div>
        <p id="javaRes" class="small text-center mb-0" style="color: var(--sky-blue);">¡Esperando jugada!</p>
      `
    },
    js: {
      titulo: "JavaScript — Michi Runner",
      codigo: "if (cactusX < 48 && cactusX > 15 && michiY < 26) {\n  gameOver();\n}",
      html: `
        <div id="juegoArea" onclick="saltarMichi()" style="position:relative; height:115px; background:#0e0c0b; border-radius:10px; overflow:hidden; cursor:pointer; border-bottom:2px solid var(--terracotta);">
          <span style="position:absolute; top:8px; right:12px; font-size:0.75rem; color:var(--sky-blue);" id="scoreDino">Pts: 0</span>
          <div id="michiPlayer" style="position:absolute; bottom:0; left:25px; font-size:1.8rem; transform: scaleX(-1); transition: bottom 0.2s ease-out;">🐈‍⬛</div>
          <div id="cactusObstaculo" style="position:absolute; bottom:0; left:320px; font-size:1.5rem;">🌵</div>
          <div id="gameOverOverlay" class="d-none" style="position:absolute; inset:0; background:rgba(24,19,18,0.88); display:flex; flex-direction:column; align-items:center; justify-content:center;">
            <span style="color:var(--old-rose); font-weight:600; font-size:0.95rem;">¡Chocaste con el cactus!</span>
            <button type="button" class="btn btn-sm btn-outline-info mt-1" onclick="event.stopPropagation(); iniciarJuegoMichi();">Reintentar</button>
          </div>
        </div>
      `,
      onOpen: iniciarJuegoMichi
    },
    html: {
      titulo: "HTML5 — Estructura y Validación Nativa",
      codigo: "<form>\n  <input type=\"email\" required placeholder=\"tu@correo.com\">\n  <button type=\"submit\">Validar</button>\n</form>",
      html: `
        <form onsubmit="event.preventDefault(); document.getElementById('htmlMsg').textContent='✓ Correo válido según HTML5';" class="mb-2">
          <label class="small mb-1">Validación nativa sin JavaScript:</label>
          <div class="input-group input-group-sm">
            <input type="email" required class="form-control bg-dark text-white" placeholder="Escribe un correo válido...">
            <button type="submit" class="btn btn-outline-info">Probar</button>
          </div>
          <small id="htmlMsg" class="d-block mt-1" style="color:var(--sky-blue);"></small>
        </form>
        <details class="small border-top pt-2">
          <summary style="color:var(--old-rose); cursor:pointer;">Ver etiquetas semánticas usadas</summary>
          <span class="text-muted">&lt;form&gt;, &lt;input type="email" required&gt;, &lt;details&gt;</span>
        </details>
      `
    },
    css: {
      titulo: "CSS3 — Variables Dinámicas y Paleta",
      codigo: ":root {\n  --tema-activo: #D496A7;\n}\n.tarjeta-preview {\n  box-shadow: 0 0 20px var(--tema-activo);\n}",
      html: `
        <div id="cssDemoBox" class="p-3 rounded text-center mb-2" style="background:#181312; border:2px solid #D496A7; transition:0.4s;">
          Vista previa con Variables CSS
        </div>
        <div class="d-flex justify-content-center gap-2">
          <button type="button" class="btn btn-sm" style="background:#D496A7; color:#181312;" onclick="cambiarTemaCSS('#D496A7')">Old Rose</button>
          <button type="button" class="btn btn-sm" style="background:#A1CDF1; color:#181312;" onclick="cambiarTemaCSS('#A1CDF1')">Sky Blue</button>
          <button type="button" class="btn btn-sm" style="background:#9D695A; color:#fff;" onclick="cambiarTemaCSS('#9D695A')">Terracotta</button>
        </div>
      `
    },
    bootstrap: {
      titulo: "Bootstrap 5 — Grilla Responsiva en Vivo",
      codigo: "<div class=\"row g-2\">\n  <div class=\"col-6\">Bloque A</div>\n  <div class=\"col-6\">Bloque B</div>\n</div>",
      html: `
        <div class="btn-group btn-group-sm w-100 mb-2">
          <button type="button" class="btn btn-outline-info" onclick="cambiarGridBS('col-6')">2 Columnas</button>
          <button type="button" class="btn btn-outline-info" onclick="cambiarGridBS('col-4')">3 Columnas</button>
        </div>
        <div class="row g-2 text-center small" id="bsGridDemo">
          <div class="col-6"><div class="p-2 border rounded">Item 1</div></div>
          <div class="col-6"><div class="p-2 border rounded">Item 2</div></div>
          <div class="col-6"><div class="p-2 border rounded">Item 3</div></div>
        </div>
      `
    },
    mysql: {
      titulo: "MySQL — Inserta datos (Conectado a Oracle)",
      codigo: "INSERT INTO proyectos (nombre, tech)\nVALUES ('Nuevo Proyecto', 'SQL');",
      html: `
        <div class="input-group input-group-sm mb-2">
          <input type="text" id="sqlNombreInput" class="form-control bg-dark text-white" placeholder="Nombre proyecto...">
          <button type="button" class="btn btn-outline-info" onclick="insertarFilaSQL()">INSERT</button>
        </div>
        <table class="table table-dark table-sm mb-0 small">
          <thead><tr><th>ID</th><th>Proyecto</th><th>Tech</th></tr></thead>
          <tbody id="tbodyMysql"></tbody>
        </table>
      `,
      onOpen: renderTablaMysql
    },
    oracle: {
      titulo: "Oracle SQL*Plus — Consulta los datos de MySQL",
      codigo: "SELECT id, nombre, tech\nFROM proyectos_compartidos\nORDER BY id DESC;",
      html: `
        <button type="button" class="btn btn-sm btn-outline-warning w-100 mb-2" onclick="ejecutarSelectOracle()">▶ Ejecutar SELECT en Oracle</button>
        <pre id="oracleOutput" class="p-2 rounded small mb-0" style="background:#0e0c0b; color:#A1CDF1; max-height:110px; overflow:auto;">Presiona Ejecutar para leer la tabla...</pre>
      `
    },
    arqui: {
      titulo: "Arquitectura de Computadoras — Mini-Ensamblador (CPU & RAM)",
      codigo: "LOAD  [0]   ; AX <- RAM[0]\nADD   [1]   ; AX <- AX + RAM[1]\nSTORE [2]   ; RAM[2] <- AX",
      html: `
        <div class="d-flex justify-content-between align-items-center mb-2 small">
          <span>Objetivo en RAM[2]: <strong id="cpuTarget" style="color:var(--old-rose); font-size:1rem;">11</strong></span>
          <button type="button" class="btn btn-sm btn-link p-0 text-decoration-none" style="color:var(--sky-blue); font-size:0.75rem;" onclick="iniciarMiniCPU()">↻ Nuevo</button>
        </div>
        <div class="row g-2 text-center mb-2 small">
          <div class="col-4">
            <div class="p-2 rounded" style="background:#0e0c0b; border:1px solid var(--sky-blue);">
              <span class="d-block text-muted" style="font-size:0.65rem;">CPU (AX)</span>
              <strong id="regAX" style="color:var(--sky-blue); font-size:1.1rem;">0</strong>
            </div>
          </div>
          <div class="col-8">
            <div class="d-flex gap-1 h-100">
              <div class="flex-fill p-2 rounded" style="background:#0e0c0b; border:1px solid rgba(245,239,234,0.15);">
                <span class="d-block text-muted" style="font-size:0.65rem;">RAM[0]</span>
                <strong id="ram0">4</strong>
              </div>
              <div class="flex-fill p-2 rounded" style="background:#0e0c0b; border:1px solid rgba(245,239,234,0.15);">
                <span class="d-block text-muted" style="font-size:0.65rem;">RAM[1]</span>
                <strong id="ram1">7</strong>
              </div>
              <div class="flex-fill p-2 rounded" style="background:#0e0c0b; border:1px dashed var(--old-rose);">
                <span class="d-block text-muted" style="font-size:0.65rem;">RAM[2]</span>
                <strong id="ram2" style="color:var(--old-rose);">?</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group btn-group-sm w-100 mb-2">
          <button type="button" class="btn btn-outline-info" onclick="ejecutarAsm('LOAD0')">LOAD [0]</button>
          <button type="button" class="btn btn-outline-info" onclick="ejecutarAsm('ADD1')">ADD [1]</button>
          <button type="button" class="btn btn-outline-light" onclick="ejecutarAsm('STORE2')">STORE [2]</button>
        </div>
        <p id="cpuLog" class="small text-center mb-0" style="color:rgba(245,239,234,0.75); font-size:0.75rem;">Mueve los datos de RAM a la CPU para sumar</p>
      `,
      onOpen: iniciarMiniCPU
    }
  };

  // 3. Abrir Modal al hacer clic en cada etiqueta .pill-skill
  document.querySelectorAll('.pill-skill').forEach(etiqueta => {
    etiqueta.addEventListener('click', (e) => {
      e.stopPropagation();
      const clave = etiqueta.getAttribute('data-lang');
      const data = demosLenguajes[clave];
      const modalEl = document.getElementById('modalLenguaje');

      if (!data || !modalEl) return;

      document.getElementById('modalTitulo').textContent = data.titulo;
      document.getElementById('modalCodigo').textContent = data.codigo;
      document.getElementById('modalDemoViva').innerHTML = data.html;

      const modalInstancia = bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstancia.show();

      if (data.onOpen) setTimeout(data.onOpen, 150);
    });
  });

  const modalEl = document.getElementById('modalLenguaje');
  if (modalEl) {
    modalEl.addEventListener('hidden.bs.modal', () => {
      if (window.intervaloJuegoMichi) clearInterval(window.intervaloJuegoMichi);
    });
  }
});

// Funciones globales de cada demo
function calcPy(op) {
  const a = parseFloat(document.getElementById('pyA').value) || 0;
  const b = parseFloat(document.getElementById('pyB').value) || 0;
  let r = 0;
  if (op === '+') r = a + b;
  if (op === '-') r = a - b;
  if (op === '*') r = a * b;
  if (op === '/') r = b !== 0 ? (a / b).toFixed(2) : 'Error (÷0)';
  document.getElementById('pyRes').textContent = 'Resultado: ' + r;
}

function jugarJava(jugada) {
  const opciones = ['Piedra', 'Papel', 'Tijera'];
  const cpu = opciones[Math.floor(Math.random() * 3)];
  let msg = 'Tú: ' + jugada + ' | Java: ' + cpu + ' → ';
  if (jugada === cpu) msg += '¡Empate!';
  else if ((jugada === 'Piedra' && cpu === 'Tijera') || (jugada === 'Papel' && cpu === 'Piedra') || (jugada === 'Tijera' && cpu === 'Papel')) msg += '¡Ganaste! 🎉';
  else msg += 'Gana Java 💻';
  document.getElementById('javaRes').textContent = msg;
}

// Juego Michi Runner
let michiSaltando = false;

function saltarMichi() {
  const michi = document.getElementById('michiPlayer');
  if (!michi || michiSaltando) return;
  michiSaltando = true;
  michi.style.bottom = '58px';
  setTimeout(() => {
    if (michi) michi.style.bottom = '0px';
    setTimeout(() => { michiSaltando = false; }, 180);
  }, 340);
}

function iniciarJuegoMichi() {
  if (window.intervaloJuegoMichi) clearInterval(window.intervaloJuegoMichi);
  const overlay = document.getElementById('gameOverOverlay');
  if (overlay) overlay.classList.add('d-none');

  let posX = 330;
  let pts = 0;
  michiSaltando = false;
  document.getElementById('scoreDino').textContent = 'Pts: 0';

  window.intervaloJuegoMichi = setInterval(() => {
    const cactus = document.getElementById('cactusObstaculo');
    const michi = document.getElementById('michiPlayer');
    if (!cactus || !michi) return;

    posX -= 6;
    cactus.style.left = posX + 'px';

    const alturaMichi = parseInt(michi.style.bottom) || 0;
    if (posX > 15 && posX < 48 && alturaMichi < 26) {
      clearInterval(window.intervaloJuegoMichi);
      if (overlay) overlay.classList.remove('d-none');
      return;
    }

    if (posX < -25) {
      posX = 330;
      pts += 10;
      document.getElementById('scoreDino').textContent = 'Pts: ' + pts;
    }
  }, 35);
}

function cambiarTemaCSS(color) {
  const box = document.getElementById('cssDemoBox');
  box.style.borderColor = color;
  box.style.boxShadow = '0 0 18px ' + color + '55';
}

function cambiarGridBS(claseCol) {
  document.querySelectorAll('#bsGridDemo > div').forEach(col => {
    col.className = claseCol;
  });
}

function renderTablaMysql() {
  const tbody = document.getElementById('tbodyMysql');
  if (!tbody) return;
  tbody.innerHTML = window.tablaProyectosSQL.map(f => '<tr><td>' + f.id + '</td><td>' + f.nombre + '</td><td>' + f.tech + '</td></tr>').join('');
}

function insertarFilaSQL() {
  const inp = document.getElementById('sqlNombreInput');
  if (!inp || !inp.value.trim()) return;
  window.tablaProyectosSQL.push({
    id: window.tablaProyectosSQL.length + 1,
    nombre: inp.value.trim(),
    tech: 'SQL'
  });
  inp.value = '';
  renderTablaMysql();
}

function ejecutarSelectOracle() {
  const out = document.getElementById('oracleOutput');
  const filas = window.tablaProyectosSQL.map(f => 'ID: ' + f.id + ' | ' + f.nombre + ' [' + f.tech + ']').join('\n');
  out.textContent = 'SQL> SELECT * FROM proyectos;\n----------------------------\n' + filas + '\n(' + window.tablaProyectosSQL.length + ' filas seleccionadas)';
}

// Mini-Ensamblador CPU & RAM
let cpuState = { ax: 0, ram: [4, 7, null], target: 11 };

function iniciarMiniCPU() {
  const a = Math.floor(Math.random() * 9) + 2;
  const b = Math.floor(Math.random() * 9) + 2;
  cpuState = { ax: 0, ram: [a, b, null], target: a + b };

  const targetEl = document.getElementById('cpuTarget');
  if (!targetEl) return;

  targetEl.textContent = cpuState.target;
  document.getElementById('regAX').textContent = '0';
  document.getElementById('ram0').textContent = a;
  document.getElementById('ram1').textContent = b;
  document.getElementById('ram2').textContent = '?';
  const log = document.getElementById('cpuLog');
  log.textContent = 'Carga RAM[0], suma RAM[1] y guarda en RAM[2]';
  log.style.color = 'rgba(245,239,234,0.75)';
}

function ejecutarAsm(instruccion) {
  const log = document.getElementById('cpuLog');
  const regEl = document.getElementById('regAX');

  if (instruccion === 'LOAD0') {
    cpuState.ax = cpuState.ram[0];
    regEl.textContent = cpuState.ax;
    log.textContent = 'LOAD [0] → AX ahora vale ' + cpuState.ax;
  } else if (instruccion === 'ADD1') {
    cpuState.ax += cpuState.ram[1];
    regEl.textContent = cpuState.ax;
    log.textContent = 'ADD [1] → AX sumó ' + cpuState.ram[1] + ' (Total: ' + cpuState.ax + ')';
  } else if (instruccion === 'STORE2') {
    cpuState.ram[2] = cpuState.ax;
    document.getElementById('ram2').textContent = cpuState.ax;

    if (cpuState.ax === cpuState.target) {
      log.textContent = '¡Ciclo Fetch-Execute completado! ✓';
      log.style.color = '#D496A7';
      setTimeout(iniciarMiniCPU, 1300);
    } else {
      log.textContent = 'Guardaste ' + cpuState.ax + ', pero el objetivo es ' + cpuState.target;
      log.style.color = '#A1CDF1';
    }
  }
}