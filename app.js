/**
 * Chess Maipú - Lógica de la Aplicación y Modos Interactivos
 * Versión Limpia con Fondo Blanco y Secciones Separadas para Clases y Torneos
 */

document.addEventListener('DOMContentLoaded', () => {
  initChessEngine();
  renderClasses();
  renderTournaments();
  renderNews();
  renderCalendar();
  renderHours();
  initMap();
  setupNavigation();
  setupModalHandlers();

  if (window.lucide) {
    lucide.createIcons();
  }
});

let chessBoardInstance = null;

function initChessEngine() {
  chessBoardInstance = new InteractiveChessBoard('interactive-board-container', {
    mode: 'learn'
  });

  const learnBtn = document.getElementById('mode-learn-btn');
  const puzzleBtn = document.getElementById('mode-puzzle-btn');
  const learnPanel = document.getElementById('learn-panel');
  const puzzlePanel = document.getElementById('puzzle-panel');

  if (learnBtn && puzzleBtn) {
    learnBtn.addEventListener('click', () => {
      learnBtn.classList.add('active');
      puzzleBtn.classList.remove('active');

      if (learnPanel) learnPanel.classList.remove('hidden');
      if (puzzlePanel) puzzlePanel.classList.add('hidden');

      chessBoardInstance.options.mode = 'learn';
      chessBoardInstance.loadPieceTutorial(chessBoardInstance.currentPieceId || 'pawn', 0);
    });

    puzzleBtn.addEventListener('click', () => {
      puzzleBtn.classList.add('active');
      learnBtn.classList.remove('active');

      if (puzzlePanel) puzzlePanel.classList.remove('hidden');
      if (learnPanel) learnPanel.classList.add('hidden');

      chessBoardInstance.options.mode = 'puzzle';
      chessBoardInstance.loadPuzzle(0);
    });
  }

  // Eventos para el selector de piezas (Peón, Caballo, Alfil, Torre, Dama, Rey)
  const pieceButtons = document.querySelectorAll('#piece-selector-buttons .piece-sel-btn');
  pieceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pieceId = btn.dataset.piece;
      if (chessBoardInstance) {
        chessBoardInstance.loadPieceTutorial(pieceId, 0);
        chessBoardInstance.audio.playMove();
      }
    });
  });

  const hintBtn = document.getElementById('puzzle-hint-btn');
  const resetBtn = document.getElementById('puzzle-reset-btn');
  const nextBtn = document.getElementById('puzzle-next-btn');

  if (hintBtn) {
    hintBtn.addEventListener('click', () => chessBoardInstance.showHint());
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => chessBoardInstance.resetCurrentPuzzle());
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => chessBoardInstance.nextPuzzle());
  }
}

// Función global para seleccionar pieza desde el escaparate o tarjetas
window.selectPieceFromLineup = function(pieceId) {
  if (!chessBoardInstance) return;

  const learnBtn = document.getElementById('mode-learn-btn');
  const puzzleBtn = document.getElementById('mode-puzzle-btn');
  const learnPanel = document.getElementById('learn-panel');
  const puzzlePanel = document.getElementById('puzzle-panel');

  if (learnBtn && puzzleBtn) {
    learnBtn.classList.add('active');
    puzzleBtn.classList.remove('active');

    if (learnPanel) learnPanel.classList.remove('hidden');
    if (puzzlePanel) puzzlePanel.classList.add('hidden');
  }

  chessBoardInstance.options.mode = 'learn';
  chessBoardInstance.loadPieceTutorial(pieceId);
  chessBoardInstance.audio.playMove();

  const boardSec = document.getElementById('tablero-virtual');
  if (boardSec) {
    boardSec.scrollIntoView({ behavior: 'smooth' });
  }
};

// Renderizado de Clases Multinivel (Sección Independiente)
function renderClasses() {
  const container = document.getElementById('classes-container');
  if (!container) return;

  container.innerHTML = CHESS_DATA.classes.map(c => `
    <div class="card-clean p-8 flex flex-col justify-between space-y-6">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            ${c.badge}
          </span>
          <span class="text-xs text-slate-500 font-medium">
            ${c.schedule}
          </span>
        </div>

        <h3 class="text-xl font-black text-slate-900 uppercase font-heading">${c.level}</h3>
        <p class="text-xs text-slate-600 leading-relaxed">${c.description}</p>

        <div class="pt-3 border-t border-slate-100 space-y-2">
          ${c.features.map(f => `
            <div class="flex items-center gap-2 text-xs text-slate-700">
              <i data-lucide="check" class="w-4 h-4 text-rose-600 flex-shrink-0"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-[10px] text-slate-400 uppercase tracking-wider block">Cuota Mensual</span>
          <span class="text-sm font-black text-slate-900 font-mono">${c.price}</span>
        </div>
        <button onclick="openModal('registro')" class="btn-primary px-4 py-2 text-xs">
          Inscribirme
        </button>
      </div>
    </div>
  `).join('');
}

// Renderizado de Torneos (Sección Independiente)
function renderTournaments() {
  const container = document.getElementById('tournaments-container');
  if (!container) return;

  container.innerHTML = CHESS_DATA.tournaments.map(t => `
    <div class="card-clean p-8 flex flex-col justify-between space-y-6">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
            ${t.type}
          </span>
          <span class="text-xs text-slate-500 font-medium">
            ${t.cadence}
          </span>
        </div>

        <h3 class="text-xl font-black text-slate-900 uppercase font-heading">${t.title}</h3>
        
        <div class="space-y-2 text-xs text-slate-600">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800">Fecha:</span>
            <span>${t.date}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800">Lugar:</span>
            <span>${t.location}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-rose-600">Premios:</span>
            <span class="text-slate-800">${t.awards}</span>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-[10px] text-slate-400 uppercase tracking-wider block">Inscripción</span>
          <span class="text-sm font-black text-slate-900 font-mono">${t.entryFee}</span>
        </div>
        <button onclick="openModal('registro')" class="btn-primary px-4 py-2 text-xs">
          Participar
        </button>
      </div>
    </div>
  `).join('');
}

// Renderizado de Noticias Reales (Fiel a la captura del usuario)
function renderNews() {
  const container = document.getElementById('news-container');
  if (!container) return;

  container.innerHTML = CHESS_DATA.news.map(n => `
    <article class="card-clean overflow-hidden flex flex-col group">
      <div class="relative h-48 overflow-hidden bg-slate-900">
        <img src="${n.image}" alt="${n.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <div class="absolute top-3 left-3 bg-black text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1">
          ${n.tag}
        </div>
      </div>

      <div class="p-6 flex flex-col justify-between flex-grow space-y-4">
        <div class="space-y-2">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>${n.date}</span>
            <span>${n.readTime}</span>
          </div>
          <h3 class="text-base font-extrabold text-slate-900 uppercase font-heading group-hover:text-rose-600 transition-colors leading-snug">
            ${n.title}
          </h3>
          <p class="text-slate-600 text-xs leading-relaxed">
            ${n.summary}
          </p>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-[11px] text-slate-400">Por: <strong class="text-slate-700">${n.author}</strong></span>
          <button onclick="openModal('registro')" class="text-xs font-bold text-rose-600 hover:underline">
            Comentar en el club →
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Renderizado del Calendario Mensual (Cuadrícula 7 Columnas fiel a la captura)
function renderCalendar() {
  const container = document.getElementById('calendar-grid');
  if (!container) return;

  const totalDays = 31;
  const startOffset = 4; // Oct 1, 2026 es Jueves (DOM=0, LUN=1, MAR=2, MIÉ=3, JUE=4)
  const prevMonthEnd = 30; // Septiembre tiene 30 días

  let cellsHtml = '';

  // 1. Celdas de días previos (Septiembre 27, 28, 29, 30 sombreadas en gris)
  for (let i = startOffset - 1; i >= 0; i--) {
    const prevDay = prevMonthEnd - i;
    cellsHtml += `
      <div class="bg-[#f1f5f9] min-h-[92px] sm:min-h-[110px] p-2 flex flex-col justify-between opacity-70">
        <span class="text-xs font-bold text-slate-400 font-mono">${prevDay}</span>
        <div class="text-[9px] text-slate-400 italic">Sep</div>
      </div>
    `;
  }

  // 2. Días del mes actual (Octubre 1 al 31)
  const typeBadgeStyles = {
    'Torneo': 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
    'Clase': 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100',
    'Taller': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    'Especial': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    'Comunidad': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
  };

  for (let d = 1; d <= totalDays; d++) {
    const dayEvents = (CHESS_DATA.eventsCalendar || []).filter(e => e.day === d);
    const hasEvents = dayEvents.length > 0;

    const eventsHtml = dayEvents.map(e => `
      <div onclick="event.stopPropagation(); selectCalendarEvent(${e.id})" 
           class="px-1.5 py-0.5 rounded text-[10px] font-bold border truncate transition-all hover:scale-[1.02] shadow-[0_1px_2px_rgba(0,0,0,0.04)] cursor-pointer ${typeBadgeStyles[e.type] || 'bg-slate-100 text-slate-700'}" 
           title="${e.time} - ${e.title}">
        <span class="font-mono text-[9px] opacity-75">${e.time.slice(0, 5)}</span> ${e.title}
      </div>
    `).join('');

    cellsHtml += `
      <div onclick="selectCalendarDay(${d})" 
           class="bg-white min-h-[92px] sm:min-h-[110px] p-1.5 sm:p-2 flex flex-col justify-between hover:bg-slate-50 transition-colors group cursor-pointer border-t-2 border-transparent hover:border-rose-400 relative">
        <div class="flex items-center justify-between">
          <span class="text-xs sm:text-sm font-black text-slate-800 ${hasEvents ? 'group-hover:text-rose-600' : ''}">
            ${d}
          </span>
          ${hasEvents ? `<span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>` : ''}
        </div>
        <div class="space-y-1 mt-1 flex-1 flex flex-col justify-end">
          ${eventsHtml}
        </div>
      </div>
    `;
  }

  container.innerHTML = cellsHtml;
}

// Selección de Evento para ver en el panel inferior
window.selectCalendarEvent = function(eventId) {
  const event = (CHESS_DATA.eventsCalendar || []).find(e => e.id === eventId);
  if (!event) return;

  const badgeEl = document.getElementById('selected-event-badge');
  const timeEl = document.getElementById('selected-event-time');
  const titleEl = document.getElementById('selected-event-title');
  const descEl = document.getElementById('selected-event-desc');

  if (badgeEl) {
    badgeEl.innerText = event.type;
    badgeEl.className = `px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
      event.type === 'Torneo' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
      event.type === 'Clase' ? 'bg-sky-100 text-sky-700 border border-sky-200' :
      event.type === 'Taller' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
      'bg-emerald-100 text-emerald-700 border border-emerald-200'
    }`;
  }
  if (timeEl) timeEl.innerText = `${event.day} de ${event.month} • ${event.time}`;
  if (titleEl) titleEl.innerText = event.title;
  if (descEl) descEl.innerText = event.description;

  const panel = document.getElementById('calendar-event-modal');
  if (panel) {
    panel.classList.remove('bg-slate-50');
    panel.classList.add('bg-rose-50/50', 'border-rose-300');
    setTimeout(() => {
      panel.classList.remove('bg-rose-50/50', 'border-rose-300');
      panel.classList.add('bg-slate-50');
    }, 1200);
  }
};

window.selectCalendarDay = function(dayNum) {
  const dayEvents = (CHESS_DATA.eventsCalendar || []).filter(e => e.day === dayNum);
  if (dayEvents.length > 0) {
    window.selectCalendarEvent(dayEvents[0].id);
  } else {
    const badgeEl = document.getElementById('selected-event-badge');
    const timeEl = document.getElementById('selected-event-time');
    const titleEl = document.getElementById('selected-event-title');
    const descEl = document.getElementById('selected-event-desc');

    if (badgeEl) {
      badgeEl.innerText = 'Juego Libre';
      badgeEl.className = 'px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-800';
    }
    if (timeEl) timeEl.innerText = `${dayNum} de Octubre 2026 • 16:00 a 21:30 hrs`;
    if (titleEl) titleEl.innerText = `Día ${dayNum}: Práctica Libre en el Club`;
    if (descEl) descEl.innerText = 'Mesas disponibles para juego libre entre socios, préstamo de libros de apertura y estudio de finales en nuestra sede.';
  }
};

// Renderizado de Horarios
function renderHours() {
  const container = document.getElementById('hours-list');
  if (!container) return;

  container.innerHTML = CHESS_DATA.clubInfo.hours.map(h => `
    <div class="pt-3 first:pt-0">
      <div class="flex items-center justify-between">
        <span class="font-bold text-xs uppercase tracking-wider text-slate-900">${h.days}</span>
        <span class="text-xs font-mono font-bold text-rose-600">${h.time}</span>
      </div>
      <p class="text-[11px] text-slate-500 mt-0.5">${h.note}</p>
    </div>
  `).join('');
}

// Mapa Leaflet en Maipú (Plaza de Maipú)
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  const maipuCoords = [-33.5106, -70.7578]; // Plaza de Maipú
  const map = L.map('map', {
    scrollWheelZoom: false
  }).setView(maipuCoords, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const customIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background-color: #e11d48; width: 34px; height: 34px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(225,29,72,0.6); display: flex; align-items: center; justify-content: center; font-size: 16px; color: white; font-weight: bold;">♟</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });

  const marker = L.marker(maipuCoords, { icon: customIcon }).addTo(map);
  marker.bindPopup(`
    <div style="font-family: system-ui, sans-serif; color: #0f172a; padding: 4px;">
      <strong style="color: #e11d48; font-size: 14px;">♟ Chess Maipú</strong><br>
      <span style="font-size: 12px; color: #334155;">Av. Pajaritos 2450, Maipú</span><br>
      <span style="font-size: 11px; color: #64748b;">A pasos de Metro Plaza de Maipú (L5)</span>
    </div>
  `).openPopup();
}

// Configuración Menú Móvil
function setupNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Modal de Registro
function setupModalHandlers() {
  const form = document.getElementById('subscription-form');
  const successMsg = document.getElementById('form-success-msg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const phone = document.getElementById('form-phone').value;

      if (name && email && phone) {
        if (successMsg) successMsg.classList.remove('hidden');
        form.reset();
        setTimeout(() => {
          if (successMsg) successMsg.classList.add('hidden');
          closeModal('registro');
        }, 3500);
      }
    });
  }
}

window.openModal = function(modalId) {
  const modal = document.getElementById('registration-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeModal = function(modalId) {
  const modal = document.getElementById('registration-modal');
  if (modal) modal.classList.add('hidden');
};
