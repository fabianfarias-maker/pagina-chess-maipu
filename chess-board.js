/**
 * Chess Maipú - Motor de Tablero Interactivo
 * Tablero virtual en SVG nativo con modos:
 * 1. Explorador de Piezas y Reglas
 * 2. Entrenador de Problemas Tácticos
 * 3. Modo Tablero Libre (Sandbox)
 * Incluye sintetizador de audio para movimientos y efectos.
 */

class ChessAudio {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playMove() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      // Audio fallback silencioso
    }
  }

  playCapture() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.2);
      });
    } catch (e) {}
  }

  playError() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }
}

// SVGs elegantes y nítidos para las piezas de ajedrez
const PIECE_SVGS = {
  P: `<svg viewBox="0 0 45 45"><path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 C 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  N: `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#2c3e50" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="#ffffff" d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path fill="#ffffff" d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"/><path fill="#2c3e50" stroke="#2c3e50" d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0m5.433-9.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5"/></g></svg>`,
  B: `<svg viewBox="0 0 45 45"><g fill="none" stroke="#2c3e50" stroke-width="1.5" stroke-linejoin="round"><path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.54 9,36 9,36 z" fill="#ffffff"/><path d="M 12,36 C 11,32 11,26 15,22 C 16,19 17.5,14 17.5,10 C 17.5,8 19.5,7 22.5,7 C 25.5,7 27.5,8 27.5,10 C 27.5,14 29,19 30,22 C 34,26 34,32 33,36 z" fill="#ffffff"/><path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30"/><circle cx="22.5" cy="5" r="1.5" fill="#ffffff"/></g></svg>`,
  R: `<svg viewBox="0 0 45 45"><g fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" stroke-linejoin="round"><path d="M 9,39 L 36,39 L 36,36 L 9,36 z"/><path d="M 12,36 L 12,32 L 33,32 L 33,36 z"/><path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 z"/><path d="M 12,14 L 14,32 L 31,32 L 33,14 z"/></g></svg>`,
  Q: `<svg viewBox="0 0 45 45"><g fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 8,12 A 2 2 0 1 1 12,12 A 2 2 0 1 1 8,12 z M 15.5,8.5 A 2 2 0 1 1 19.5,8.5 A 2 2 0 1 1 15.5,8.5 z M 20.5,6.5 A 2 2 0 1 1 24.5,6.5 A 2 2 0 1 1 20.5,6.5 z M 25.5,8.5 A 2 2 0 1 1 29.5,8.5 A 2 2 0 1 1 25.5,8.5 z M 33,12 A 2 2 0 1 1 37,12 A 2 2 0 1 1 33,12 z"/><path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 22.5,10 L 14,25 L 7,14 L 9,26 z"/><path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10,38 L 35,38 C 34.5,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 L 9,26 z"/></g></svg>`,
  K: `<svg viewBox="0 0 45 45"><g fill="#ffffff" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 22.5,11.5 L 22.5,4.5 M 19,7.5 L 26,7.5"/><path d="M 11.5,37 C 17,40.5 28,40.5 33.5,37 C 37,29 38,18 29.5,15 C 27.5,14.5 25.5,15.5 22.5,18 C 19.5,15.5 17.5,14.5 15.5,15 C 7,18 8,29 11.5,37 z"/><path d="M 11.5,30 C 17,27 28,27 33.5,30 M 11.5,33.5 C 17,30.5 28,30.5 33.5,33.5 M 11.5,37 C 17,34 28,34 33.5,37"/></g></svg>`,
  
  // Piezas negras (relleno oscuro grafito mate)
  p: `<svg viewBox="0 0 45 45"><path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 C 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/></svg>`,
  n: `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#0f172a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="#1e293b" d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path fill="#1e293b" d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.04-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-1-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-2 2.5-3c1 0 1 3 1 3"/><path fill="#cbd5e1" stroke="#cbd5e1" d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0m5.43-9.75a.5 1.5 30 1 1-.86-.5.5 1.5 30 1 1 .86.5"/><path fill="#cbd5e1" stroke="none" d="m24.55 10.4-.45 1.45.5.15c3.15 1 5.65 2.49 7.9 6.75S35.75 29.06 35.25 39l-.05.5h2.25l.05-.5c.5-10.06-.88-16.85-3.25-21.34s-5.79-6.64-9.19-7.16z"/></g></svg>`,
  b: `<svg viewBox="0 0 45 45"><g fill="#1e293b" stroke="#0f172a" stroke-width="1.5"><path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.54 9,36 9,36 z"/><path d="M 12,36 C 11,32 11,26 15,22 C 16,19 17.5,14 17.5,10 C 17.5,8 19.5,7 22.5,7 C 25.5,7 27.5,8 27.5,10 C 27.5,14 29,19 30,22 C 34,26 34,32 33,36 z"/><circle cx="22.5" cy="5" r="1.5" fill="#1e293b"/></g></svg>`,
  r: `<svg viewBox="0 0 45 45"><g fill="#1e293b" stroke="#0f172a" stroke-width="1.5"><path d="M 9,39 L 36,39 L 36,36 L 9,36 z"/><path d="M 12,36 L 12,32 L 33,32 L 33,36 z"/><path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 z"/><path d="M 12,14 L 14,32 L 31,32 L 33,14 z"/></g></svg>`,
  q: `<svg viewBox="0 0 45 45"><g fill="#1e293b" stroke="#0f172a" stroke-width="1.5"><path d="M 8,12 A 2 2 0 1 1 12,12 A 2 2 0 1 1 8,12 z M 15.5,8.5 A 2 2 0 1 1 19.5,8.5 A 2 2 0 1 1 15.5,8.5 z M 20.5,6.5 A 2 2 0 1 1 24.5,6.5 A 2 2 0 1 1 20.5,6.5 z M 25.5,8.5 A 2 2 0 1 1 29.5,8.5 A 2 2 0 1 1 25.5,8.5 z M 33,12 A 2 2 0 1 1 37,12 A 2 2 0 1 1 33,12 z"/><path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 22.5,10 L 14,25 L 7,14 L 9,26 z"/><path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10,38 L 35,38 C 34.5,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 L 9,26 z"/></g></svg>`,
  k: `<svg viewBox="0 0 45 45"><g fill="#1e293b" stroke="#0f172a" stroke-width="1.5"><path d="M 22.5,11.5 L 22.5,4.5 M 19,7.5 L 26,7.5"/><path d="M 11.5,37 C 17,40.5 28,40.5 33.5,37 C 37,29 38,18 29.5,15 C 27.5,14.5 25.5,15.5 22.5,18 C 19.5,15.5 17.5,14.5 15.5,15 C 7,18 8,29 11.5,37 z"/></g></svg>`
};

class InteractiveChessBoard {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = Object.assign({
      mode: 'learn', // 'learn' | 'puzzle' | 'sandbox'
      orientation: 'white',
      onMove: null
    }, options);

    this.audio = new ChessAudio();
    this.boardState = {}; // { 'e4': 'P', ... }
    this.selectedSquare = null;
    this.legalMoves = [];
    this.currentPuzzleIndex = 0;
    this.currentPieceId = 'pawn';
    this.currentLessonIndex = 0;
    this.isPuzzleSolved = false;
    this.hintUsed = false;

    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderSkeleton();
    if (this.options.mode === 'learn') {
      this.loadPieceTutorial(this.currentPieceId, 0);
    } else if (this.options.mode === 'puzzle') {
      this.loadPuzzle(0);
    }
  }

  renderSkeleton() {
    this.container.innerHTML = `
      <div class="chess-board-wrapper select-none">
        <div class="chess-board-grid" id="board-grid"></div>
        <div class="coordinates-rank">
          ${[8, 7, 6, 5, 4, 3, 2, 1].map(r => `<span>${r}</span>`).join('')}
        </div>
        <div class="coordinates-file">
          ${['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(f => `<span>${f}</span>`).join('')}
        </div>
      </div>
    `;

    this.gridEl = this.container.querySelector('#board-grid');
    this.drawSquares();
  }

  drawSquares() {
    this.gridEl.innerHTML = '';
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const square = `${files[f]}${ranks[r]}`;
        const isDark = (r + f) % 2 === 1;
        const squareEl = document.createElement('div');
        squareEl.className = `board-square ${isDark ? 'dark-sq' : 'light-sq'}`;
        squareEl.dataset.square = square;
        squareEl.addEventListener('click', () => this.handleSquareClick(square));
        this.gridEl.appendChild(squareEl);
      }
    }
  }

  loadFen(fen) {
    this.boardState = {};
    const parts = fen.split(' ');
    const rows = parts[0].split('/');
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let r = 0; r < 8; r++) {
      let fileIdx = 0;
      const rank = 8 - r;
      for (const char of rows[r]) {
        if (!isNaN(char)) {
          fileIdx += parseInt(char, 10);
        } else {
          const square = `${files[fileIdx]}${rank}`;
          this.boardState[square] = char;
          fileIdx++;
        }
      }
    }
    this.updateBoardDisplay();
  }

  updateBoardDisplay() {
    const squares = this.gridEl.querySelectorAll('.board-square');
    squares.forEach(sq => {
      const coord = sq.dataset.square;
      sq.innerHTML = '';
      sq.classList.remove('selected-sq', 'legal-target', 'legal-capture', 'last-move', 'hint-highlight');

      if (this.boardState[coord]) {
        const pieceChar = this.boardState[coord];
        const pieceDiv = document.createElement('div');
        pieceDiv.className = 'chess-piece';
        pieceDiv.innerHTML = PIECE_SVGS[pieceChar] || '';
        sq.appendChild(pieceDiv);
      }

      // Indicadores de movimiento legal
      if (this.legalMoves.includes(coord)) {
        const indicator = document.createElement('div');
        const pieceOnSq = this.boardState[coord];
        const isEnemyPiece = pieceOnSq && pieceOnSq === pieceOnSq.toLowerCase();
        const isEnPassant = this.currentLesson && this.currentLesson.enPassant && this.currentLesson.enPassant.target === coord;
        const isExplicitCapture = this.currentLesson && this.currentLesson.captures && this.currentLesson.captures.includes(coord);

        if (isEnemyPiece || isEnPassant || (isExplicitCapture && isEnemyPiece)) {
          indicator.className = 'capture-ring';
          sq.classList.add('legal-capture');
        } else {
          indicator.className = 'legal-dot';
          sq.classList.add('legal-target');
        }
        sq.appendChild(indicator);
      }

      if (this.selectedSquare === coord) {
        sq.classList.add('selected-sq');
      }
    });
  }

  handleSquareClick(square) {
    if (this.options.mode === 'learn') {
      this.handleLearnClick(square);
    } else if (this.options.mode === 'puzzle') {
      this.handlePuzzleClick(square);
    }
  }

  // Lógica Modo Tutorial de Reglas Interactivo
  loadPieceTutorial(pieceId, lessonIndex = 0) {
    this.currentPieceId = pieceId;
    const pieceData = CHESS_DATA.piecesGuide.find(p => p.id === pieceId);
    if (!pieceData) return;

    const lessons = pieceData.lessons || [];
    if (lessonIndex >= lessons.length) lessonIndex = 0;
    this.currentLessonIndex = lessonIndex;
    const lesson = lessons[lessonIndex] || null;
    this.currentLesson = lesson;

    const fen = lesson ? lesson.fen : pieceData.demoFen;
    this.loadFen(fen);

    this.selectedSquare = lesson ? lesson.highlightSquare : pieceData.highlightSquare;
    const rawMoves = lesson ? [...lesson.allowedMoves] : [...pieceData.allowedMoves];
    // Filtrar para no permitir movimientos a casillas con piezas propias (mayúsculas)
    this.legalMoves = rawMoves.filter(sq => {
      const p = this.boardState[sq];
      return !p || p === p.toLowerCase();
    });
    this.updateBoardDisplay();
    this.updatePieceInfoPanel(pieceData, lesson, lessonIndex);
  }

  handleLearnClick(square) {
    const pieceData = CHESS_DATA.piecesGuide.find(p => p.id === this.currentPieceId);
    if (!pieceData) return;
    const lesson = this.currentLesson;

    // Si hace click en una casilla legal
    if (this.legalMoves.includes(square)) {
      // 1. REGLA ESPECIAL: CORONACIÓN DEL PEÓN
      if (lesson && lesson.isPromotion && square === 'e8') {
        // Mover el peón a e8
        this.boardState['e8'] = this.boardState[this.selectedSquare];
        delete this.boardState[this.selectedSquare];
        this.selectedSquare = 'e8';
        this.legalMoves = [];
        this.updateBoardDisplay();
        this.audio.playMove();

        // Desplegar selector de coronación
        this.showPromotionPicker(lesson);
        return;
      }

      // 2. REGLA ESPECIAL: CAPTURA AL PASO (EN PASSANT)
      if (lesson && lesson.enPassant && square === lesson.enPassant.target) {
        // El peón avanza a la casilla diagonal
        this.boardState[square] = this.boardState[this.selectedSquare];
        delete this.boardState[this.selectedSquare];

        // ¡Se elimina del tablero el peón enemigo sobrepasado!
        if (lesson.enPassant.removePawn) {
          delete this.boardState[lesson.enPassant.removePawn];
        }

        this.selectedSquare = square;
        this.legalMoves = [];
        this.updateBoardDisplay();
        this.audio.playCapture();

        this.showLearnSuccess(
          '⚔️ ¡Captura al Paso Lograda!',
          lesson.explanation,
          true
        );
        return;
      }

      // 3. REGLA ESPECIAL: ENROQUE DEL REY
      if (lesson && lesson.isCastling) {
        if (square === 'g1') {
          // Enroque corto: Rey a g1, Torre de h1 a f1
          delete this.boardState['e1'];
          this.boardState['g1'] = 'K';
          delete this.boardState['h1'];
          this.boardState['f1'] = 'R';
        } else if (square === 'c1') {
          // Enroque largo: Rey a c1, Torre de a1 a d1
          delete this.boardState['e1'];
          this.boardState['c1'] = 'K';
          delete this.boardState['a1'];
          this.boardState['d1'] = 'R';
        } else {
          this.boardState[square] = this.boardState[this.selectedSquare];
          delete this.boardState[this.selectedSquare];
        }

        this.selectedSquare = square;
        this.legalMoves = [];
        this.updateBoardDisplay();
        this.audio.playMove();

        this.showLearnSuccess(
          '🏰 ¡Enroque realizado con éxito!',
          lesson.explanation,
          true
        );
        return;
      }

      // 4. MOVIMIENTO O CAPTURA REGULAR (Inicial, diagonal u otras piezas)
      const isCapture = !!this.boardState[square] || (lesson && lesson.captures && lesson.captures.includes(square));
      this.boardState[square] = this.boardState[this.selectedSquare];
      delete this.boardState[this.selectedSquare];

      this.selectedSquare = square;
      this.legalMoves = [];
      this.updateBoardDisplay();

      if (isCapture) {
        this.audio.playCapture();
      } else {
        this.audio.playMove();
      }

      const title = isCapture ? '⚔️ ¡Gran Captura en Diagonal!' : '✅ ¡Movimiento Correcto!';
      this.showLearnSuccess(title, lesson ? lesson.explanation : '¡Excelente jugada!');
      return;
    }

    // Si hace click en la pieza principal seleccionada, mostramos los movimientos válidos
    if (this.boardState[square]) {
      this.selectedSquare = square;
      const rawMoves = lesson ? [...lesson.allowedMoves] : [...pieceData.allowedMoves];
      this.legalMoves = rawMoves.filter(sq => {
        const p = this.boardState[sq];
        return !p || p === p.toLowerCase();
      });
      this.updateBoardDisplay();
    }
  }

  showPromotionPicker(lesson) {
    const promoContainer = document.getElementById('promotion-picker-container');
    if (!promoContainer) return;

    promoContainer.classList.remove('hidden');

    const buttons = promoContainer.querySelectorAll('.promo-choice-btn');
    const pieceLabels = {
      'Q': 'Dama (♕)',
      'R': 'Torre (♖)',
      'B': 'Alfil (♗)',
      'N': 'Caballo (♘)'
    };

    buttons.forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', () => {
        const promoCode = newBtn.dataset.promo;
        // Sustituir en e8 por la pieza seleccionada
        this.boardState['e8'] = promoCode;
        this.updateBoardDisplay();
        this.audio.playSuccess();

        promoContainer.classList.add('hidden');

        this.showLearnSuccess(
          `🎉 ¡Coronación completada: ${pieceLabels[promoCode]}!`,
          `${lesson.explanation} Tu peón se ha convertido exitosamente en ${pieceLabels[promoCode]}.`,
          true
        );
      });
    });
  }

  showLearnSuccess(title, message, isSpecial = false) {
    const feedbackBox = document.getElementById('learn-feedback-box');
    if (!feedbackBox) return;

    const pieceData = CHESS_DATA.piecesGuide.find(p => p.id === this.currentPieceId);
    const lessons = pieceData ? (pieceData.lessons || []) : [];
    const hasNextLesson = this.currentLessonIndex + 1 < lessons.length;
    const nextLesson = hasNextLesson ? lessons[this.currentLessonIndex + 1] : null;

    feedbackBox.className = 'p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-slate-800 space-y-3 animate-fade-in';
    feedbackBox.innerHTML = `
      <div class="flex items-start gap-2.5">
        <span class="text-2xl flex-shrink-0">${isSpecial ? '🌟' : '✅'}</span>
        <div class="space-y-1 flex-1">
          <h5 class="text-xs font-black uppercase text-emerald-800">${title}</h5>
          <p class="text-xs text-slate-700 leading-relaxed">${message}</p>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-200 justify-end">
        <button id="learn-repeat-btn" class="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors">
          🔄 Repetir
        </button>
        ${hasNextLesson ? `
          <button id="learn-next-btn" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition-colors flex items-center gap-1">
            <span>Siguiente: ${nextLesson.title}</span> →
          </button>
        ` : `
          <button id="learn-next-piece-btn" class="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm transition-colors flex items-center gap-1">
            <span>Explorar otra pieza</span> →
          </button>
        `}
      </div>
    `;

    feedbackBox.classList.remove('hidden');

    const repeatBtn = document.getElementById('learn-repeat-btn');
    if (repeatBtn) {
      repeatBtn.addEventListener('click', () => {
        this.loadPieceTutorial(this.currentPieceId, this.currentLessonIndex);
        this.audio.playMove();
      });
    }

    const nextBtn = document.getElementById('learn-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.loadPieceTutorial(this.currentPieceId, this.currentLessonIndex + 1);
        this.audio.playMove();
      });
    }

    const nextPieceBtn = document.getElementById('learn-next-piece-btn');
    if (nextPieceBtn) {
      nextPieceBtn.addEventListener('click', () => {
        const pieceOrder = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
        const currentIdx = pieceOrder.indexOf(this.currentPieceId);
        const nextPieceId = pieceOrder[(currentIdx + 1) % pieceOrder.length];
        this.loadPieceTutorial(nextPieceId, 0);
        this.audio.playMove();
      });
    }
  }

  updatePieceInfoPanel(pieceData, lesson, lessonIndex) {
    // 1. Selector de Piezas (Estado Activo)
    const pieceButtons = document.querySelectorAll('#piece-selector-buttons .piece-sel-btn');
    pieceButtons.forEach(btn => {
      if (btn.dataset.piece === pieceData.id) {
        btn.className = 'piece-sel-btn p-2 rounded-lg border-2 border-rose-500 bg-rose-50 text-rose-600 font-bold text-center shadow-sm flex flex-col items-center scale-105 transition-all';
      } else {
        btn.className = 'piece-sel-btn p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-bold text-center hover:scale-105 transition-all flex flex-col items-center';
      }
    });

    // 2. Tabs de Lecciones
    const tabsContainer = document.getElementById('piece-lessons-tabs');
    const stepBadge = document.getElementById('lesson-step-badge');
    const lessons = pieceData.lessons || [];

    if (stepBadge) {
      stepBadge.innerText = `Lección ${lessonIndex + 1} de ${lessons.length}`;
    }

    if (tabsContainer) {
      tabsContainer.innerHTML = '';
      lessons.forEach((l, idx) => {
        const tabBtn = document.createElement('button');
        const isActive = idx === lessonIndex;
        tabBtn.className = isActive
          ? 'px-3 py-1.5 rounded-lg bg-rose-600 text-white font-extrabold text-xs shadow-sm transition-all'
          : 'px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all';
        tabBtn.innerText = l.title;
        tabBtn.addEventListener('click', () => {
          this.loadPieceTutorial(pieceData.id, idx);
          this.audio.playMove();
        });
        tabsContainer.appendChild(tabBtn);
      });
    }

    // 3. Banner de Instrucción
    const titleEl = document.getElementById('lesson-title');
    const textEl = document.getElementById('lesson-text');
    if (titleEl && lesson) titleEl.innerText = lesson.title;
    if (textEl && lesson) textEl.innerText = lesson.instructions;

    // 4. Ocultar contenedores flotantes
    const promoPicker = document.getElementById('promotion-picker-container');
    if (promoPicker) promoPicker.classList.add('hidden');

    const feedbackBox = document.getElementById('learn-feedback-box');
    if (feedbackBox) {
      feedbackBox.classList.add('hidden');
      feedbackBox.innerHTML = '';
    }

    // 5. Botón de Reinicio
    const resetBtn = document.getElementById('lesson-reset-btn');
    if (resetBtn) {
      resetBtn.onclick = () => {
        this.loadPieceTutorial(pieceData.id, lessonIndex);
        this.audio.playMove();
      };
    }

    // 6. Ficha Informativa General de la Pieza
    const title = document.getElementById('piece-info-title');
    const badge = document.getElementById('piece-info-badge');
    const move = document.getElementById('piece-info-move');
    const special = document.getElementById('piece-info-special');
    const tip = document.getElementById('piece-info-tip');

    if (title) title.innerText = `${pieceData.symbol} ${pieceData.name}`;
    if (badge) badge.innerText = `Valor: ${pieceData.value}`;
    if (move) move.innerText = pieceData.movement;
    if (special) special.innerText = pieceData.specialRules;
    if (tip) tip.innerText = pieceData.strategyTip;
  }

  // Lógica Modo Problemas Tácticos
  loadPuzzle(index) {
    const puzzles = CHESS_DATA.puzzles;
    if (index >= puzzles.length) index = 0;
    this.currentPuzzleIndex = index;
    this.isPuzzleSolved = false;
    this.hintUsed = false;
    this.selectedSquare = null;
    this.legalMoves = [];

    const puzzle = puzzles[this.currentPuzzleIndex];
    this.loadFen(puzzle.fen);

    // Actualizar UI del problema
    const titleEl = document.getElementById('puzzle-title');
    const badgeEl = document.getElementById('puzzle-level');
    const instrEl = document.getElementById('puzzle-instructions');
    const feedbackEl = document.getElementById('puzzle-feedback');
    const nextBtn = document.getElementById('puzzle-next-btn');

    if (titleEl) titleEl.innerText = puzzle.title;
    if (badgeEl) badgeEl.innerText = puzzle.level;
    if (instrEl) instrEl.innerText = puzzle.instructions;
    if (feedbackEl) {
      feedbackEl.className = 'puzzle-feedback-card hidden';
      feedbackEl.innerHTML = '';
    }
    if (nextBtn) {
      nextBtn.classList.add('hidden');
    }
  }

  handlePuzzleClick(square) {
    if (this.isPuzzleSolved) return;

    const puzzle = CHESS_DATA.puzzles[this.currentPuzzleIndex];

    // Si ya seleccionó una casilla de origen
    if (this.selectedSquare) {
      if (this.selectedSquare === square) {
        // Deseleccionar
        this.selectedSquare = null;
        this.legalMoves = [];
        this.updateBoardDisplay();
        return;
      }

      // Intento de jugada
      const moveAttempt = { from: this.selectedSquare, to: square };
      if (moveAttempt.from === puzzle.correctMove.from && moveAttempt.to === puzzle.correctMove.to) {
        // ¡Jugada correcta!
        const movedPiece = this.boardState[this.selectedSquare];
        const isCapture = !!this.boardState[square];
        delete this.boardState[this.selectedSquare];
        this.boardState[square] = movedPiece;

        this.selectedSquare = null;
        this.legalMoves = [];
        this.isPuzzleSolved = true;
        this.updateBoardDisplay();

        if (isCapture) {
          this.audio.playCapture();
        } else {
          this.audio.playMove();
        }

        setTimeout(() => {
          this.audio.playSuccess();
          this.showPuzzleSuccess(puzzle.explanation);
        }, 200);

      } else {
        // Si hace click en otra pieza propia blanca, cambiamos la selección
        const piece = this.boardState[square];
        if (piece && piece === piece.toUpperCase()) {
          this.selectedSquare = square;
          this.legalMoves = [square];
          this.updateBoardDisplay();
          return;
        }

        // Jugada incorrecta
        this.audio.playError();
        this.showPuzzleError();
        this.selectedSquare = null;
        this.legalMoves = [];
        this.updateBoardDisplay();
      }
      return;
    }

    // Primera selección (debe ser pieza blanca del turno)
    const piece = this.boardState[square];
    if (piece && piece === piece.toUpperCase()) {
      this.selectedSquare = square;
      this.updateBoardDisplay();
    }
  }

  showPuzzleSuccess(explanation) {
    const feedbackEl = document.getElementById('puzzle-feedback');
    const nextBtn = document.getElementById('puzzle-next-btn');

    if (feedbackEl) {
      feedbackEl.className = 'puzzle-feedback-card success-card flex items-start gap-3 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-200 mt-4 animate-fade-in';
      feedbackEl.innerHTML = `
        <div class="text-2xl">🏆</div>
        <div>
          <h4 class="font-bold text-emerald-400 text-base mb-1">¡Jugada Maestra! ¡Solución Correcta!</h4>
          <p class="text-sm text-emerald-200/90 leading-relaxed">${explanation}</p>
        </div>
      `;
      feedbackEl.classList.remove('hidden');
    }

    if (nextBtn) {
      nextBtn.classList.remove('hidden');
    }
  }

  showPuzzleError() {
    const feedbackEl = document.getElementById('puzzle-feedback');
    if (feedbackEl) {
      feedbackEl.className = 'puzzle-feedback-card error-card flex items-start gap-3 p-4 rounded-xl border border-rose-500/30 bg-rose-950/40 text-rose-200 mt-4 animate-fade-in';
      feedbackEl.innerHTML = `
        <div class="text-2xl">⚠️</div>
        <div>
          <h4 class="font-bold text-rose-400 text-base mb-1">No es la mejor jugada</h4>
          <p class="text-sm text-rose-200/90 leading-relaxed">Ese movimiento no resuelve la posición tácticamente. ¡Vuelve a intentarlo o presiona 'Ver Pista'!</p>
        </div>
      `;
      feedbackEl.classList.remove('hidden');
    }
  }

  showHint() {
    if (this.isPuzzleSolved) return;
    const puzzle = CHESS_DATA.puzzles[this.currentPuzzleIndex];
    const originSq = puzzle.correctMove.from;
    
    // Resaltar la casilla de origen
    const sqEl = this.gridEl.querySelector(`[data-square="${originSq}"]`);
    if (sqEl) {
      sqEl.classList.add('hint-highlight');
    }

    const feedbackEl = document.getElementById('puzzle-feedback');
    if (feedbackEl) {
      feedbackEl.className = 'puzzle-feedback-card hint-card flex items-start gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-950/40 text-amber-200 mt-4 animate-fade-in';
      feedbackEl.innerHTML = `
        <div class="text-2xl">💡</div>
        <div>
          <h4 class="font-bold text-amber-400 text-base mb-1">Pista Estratégica</h4>
          <p class="text-sm text-amber-200/90 leading-relaxed">Fíjate en la pieza situada en la casilla <strong class="text-amber-300 uppercase">${originSq}</strong>. ¿Hacia dónde puede causar el máximo impacto?</p>
        </div>
      `;
      feedbackEl.classList.remove('hidden');
    }
  }

  resetCurrentPuzzle() {
    this.loadPuzzle(this.currentPuzzleIndex);
  }

  nextPuzzle() {
    const nextIdx = (this.currentPuzzleIndex + 1) % CHESS_DATA.puzzles.length;
    this.loadPuzzle(nextIdx);
  }
}

window.InteractiveChessBoard = InteractiveChessBoard;
