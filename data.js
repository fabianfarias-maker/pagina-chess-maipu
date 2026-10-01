/**
 * Chess Maipú - Datos de la plataforma
 * Noticias, Torneos, Clases, Calendario y Problemas Tácticos
 */

const CHESS_DATA = {
  clubInfo: {
    name: "Club Chess Maipú (CCM)",
    slogan: "Estrategia, mente y comunidad en el corazón de Maipú",
    address: "Av. Pajaritos 2450 (a pasos de Metro Plaza de Maipú), Santiago, Chile",
    phone: "+56 9 8452 7193",
    email: "contacto@chessmaipu.cl",
    whatsapp: "https://wa.me/56984527193?text=Hola%20Chess%20Maip%C3%BA,%20deseo%20m%C3%A1s%20informaci%C3%B3n",
    instagram: "@chessmaipu",
    coordinates: [-33.5106, -70.7578], // Plaza de Maipú
    hours: [
      { days: "Lunes a Jueves", time: "16:00 - 21:30 hrs", note: "Juego libre, biblioteca y estudio táctico" },
      { days: "Viernes", time: "17:00 - 21:30 hrs", note: "Clínicas estratégicas y preparación de torneos" },
      { days: "Sábados", time: "10:00 - 20:00 hrs", note: "Clases formativas y Torneos Blitz semanales" },
      { days: "Domingos", time: "11:00 - 16:00 hrs", note: "Encuentros familiares y simultáneas" }
    ]
  },

  news: [
    {
      id: 1,
      tag: "Ajedrez Chileno",
      badgeClass: "badge-chile",
      title: "Histórica actuación del equipo chileno en la Olimpiada Mundial de Ajedrez",
      date: "Septiembre 2026",
      summary: "La delegación nacional destacó internacionalmente con memorables triunfos ante potencias mundiales. Grandes actuaciones del GM Rodrigo Vásquez y la WMI Javiera Gómez que inspiran a las nuevas generaciones en Chile.",
      readTime: "3 min de lectura",
      author: "Comisión Técnica CCM",
      image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
      contentUrl: "#"
    },
    {
      id: 2,
      tag: "Sede Nacional",
      badgeClass: "badge-event",
      title: "Santiago albergará el XXII Festival Sudamericano de la Juventud 2026",
      date: "Octubre 2026",
      summary: "La capital chilena recibirá en diciembre a las mejores promesas de Sudamérica. Nuestro club preparará una delegación especial de jugadores sub-14 y sub-18 para representar a la comuna de Maipú.",
      readTime: "4 min de lectura",
      author: "Área Competitiva CCM",
      image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=800&q=80",
      contentUrl: "#"
    },
    {
      id: 3,
      tag: "Élite Mundial",
      badgeClass: "badge-fide",
      title: "Duelo por la Corona Mundial: Gukesh vs Sindarov marca la era dorada juvenil",
      date: "Octubre 2026",
      summary: "El campeón indiscutido Gukesh D defenderá su cetro mundial ante el desafiante Javokhir Sindarov en Ginebra. Analizamos en nuestras clases las partidas clave que definen la vanguardia ajedrecística.",
      readTime: "5 min de lectura",
      author: "Academia CCM",
      image: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=800&q=80",
      contentUrl: "#"
    }
  ],

  classes: [
    {
      id: "semillero",
      level: "Iniciación / Infantil (Sub-14)",
      badge: "Principiante",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      schedule: "Sábados 10:30 - 12:00 hrs",
      description: "Aprende jugando: movimiento de piezas, valores, mates básicos, respeto deportivo y desarrollo del pensamiento lógico.",
      features: [
        "Metodología lúdica y dinámica",
        "Material didáctico y guías ilustradas",
        "Torneítos internos con medallas mensuales",
        "No requiere conocimientos previos"
      ],
      price: "$20.000 / mes (Socios: $12.000)"
    },
    {
      id: "intermedio",
      level: "Intermedio / Club Adultos & Jóvenes",
      badge: "Intermedio (1200 - 1700 ELO)",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      schedule: "Sábados 12:30 - 14:00 hrs",
      description: "Profundización estratégica: celadas de apertura, cálculo de variantes, planes de medio juego y finales fundamentales de peones y torres.",
      features: [
        "Análisis de tus propias partidas con módulos",
        "Repertorio de aperturas personalizado",
        "Clases prácticas con reloj reglamentario",
        "Acceso al equipo del club en Lichess"
      ],
      price: "$28.000 / mes (Socios: $18.000)"
    },
    {
      id: "avanzado",
      level: "Alta Competencia y Maestría",
      badge: "Avanzado (+1700 ELO / Federados)",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      schedule: "Sábados 15:00 - 17:00 hrs",
      description: "Entrenamiento riguroso para torneos IRT y FIDE. Patrones tácticos complejos, profilaxis, psicología competitiva y finales técnicos.",
      features: [
        "Dirigido por Maestros FIDE invitados",
        "Simulacros con control de tiempo oficial",
        "Preparación específica contra rivales",
        "Inscripción bonificada en torneos abiertos"
      ],
      price: "$35.000 / mes (Socios: $25.000)"
    }
  ],

  tournaments: [
    {
      id: "blitz-semanal",
      title: "Torneo Semanal Blitz de Maipú",
      type: "Interno / Social",
      cadence: "3 min + 2 seg (7 rondas suizo)",
      date: "Todos los Sábados - 19:00 a 21:00 hrs",
      location: "Sede Club Chess Maipú (Av. Pajaritos 2450)",
      awards: "Copas, libros de ajedrez y puntos Ranking Club",
      entryFee: "$2.500 (Gratis para socios al día)"
    },
    {
      id: "irt-mensual",
      title: "Torneo Mensual IRT 'Cuna de la Patria'",
      type: "Válido para Ranking Nacional & FIDE",
      cadence: "60 min + 30 seg (5 rondas)",
      date: "Último fin de semana del mes (24 y 25 de Octubre)",
      location: "Sede Club Chess Maipú / Auditorio Municipal",
      awards: "Puntos Ranking Nacional, Trofeos y Premios en dinero",
      entryFee: "$12.000 General / $8.000 Socios y Escolares"
    }
  ],

  eventsCalendar: [
    {
      id: 1,
      day: 1,
      month: "Octubre",
      year: 2026,
      time: "16:30 hrs",
      title: "Juego Libre & Biblioteca",
      type: "Comunidad",
      badge: "comunidad",
      description: "Apertura de mes con mesas de juego libre, préstamo de libros de táctica y análisis informal entre socios."
    },
    {
      id: 2,
      day: 2,
      month: "Octubre",
      year: 2026,
      time: "19:30 hrs",
      title: "Torneo Blitz Nocturno #42",
      type: "Torneo",
      badge: "torneo",
      description: "7 rondas a 3 min + 2 seg. Puntos para el ranking interno del club y premiación en medallas."
    },
    {
      id: 3,
      day: 3,
      month: "Octubre",
      year: 2026,
      time: "10:30 hrs",
      title: "Clases Semillero & Infantil",
      type: "Clase",
      badge: "clase",
      description: "Iniciación y fundamentos para niños y jóvenes: tácticas elementales, mates básicos y desarrollo de piezas."
    },
    {
      id: 4,
      day: 3,
      month: "Octubre",
      year: 2026,
      time: "19:00 hrs",
      title: "Torneo Semanal Blitz Maipú",
      type: "Torneo",
      badge: "torneo",
      description: "Tradicional encuentro sabatino abierto a toda la comunidad ajedrecística de Maipú."
    },
    {
      id: 5,
      day: 4,
      month: "Octubre",
      year: 2026,
      time: "11:30 hrs",
      title: "Jornada Familiar y Simultáneas",
      type: "Comunidad",
      badge: "comunidad",
      description: "Encuentro dominical para familias, tableros gigantes y partidas simultáneas recreativas."
    },
    {
      id: 6,
      day: 7,
      month: "Octubre",
      year: 2026,
      time: "19:00 hrs",
      title: "Taller: Finales de Torres",
      type: "Taller",
      badge: "taller",
      description: "Clínica práctica sobre posiciones de Lucena, Philidor y actividad de la torre en el final de partida."
    },
    {
      id: 7,
      day: 9,
      month: "Octubre",
      year: 2026,
      time: "19:30 hrs",
      title: "Simultánea con Maestro Invitado",
      type: "Especial",
      badge: "especial",
      description: "Desafío contra Maestro FIDE invitado a 20 tableros simultáneos en nuestra sede central."
    },
    {
      id: 8,
      day: 10,
      month: "Octubre",
      year: 2026,
      time: "10:30 hrs",
      title: "Clases Formativas & Blitz",
      type: "Clase",
      badge: "clase",
      description: "Bloque formativo matutino para nivel intermedio y avanzado seguido por partidas prácticas."
    },
    {
      id: 9,
      day: 14,
      month: "Octubre",
      year: 2026,
      time: "19:00 hrs",
      title: "Clínica: Aperturas Modernas",
      type: "Taller",
      badge: "taller",
      description: "Estructuras de peones clave en la Defensa Siciliana y Gambito de Dama explicadas a fondo."
    },
    {
      id: 10,
      day: 16,
      month: "Octubre",
      year: 2026,
      time: "19:30 hrs",
      title: "Viernes Blitz Nocturno #43",
      type: "Torneo",
      badge: "torneo",
      description: "Torneo rápido de viernes con reloj electrónico oficial DGT y transmisión de partidas."
    },
    {
      id: 11,
      day: 17,
      month: "Octubre",
      year: 2026,
      time: "10:30 hrs",
      title: "Clases y Preparación Táctica",
      type: "Clase",
      badge: "clase",
      description: "Entrenamiento por niveles (Iniciación, Intermedio y Avanzado) con profesores federados."
    },
    {
      id: 12,
      day: 21,
      month: "Octubre",
      year: 2026,
      time: "19:00 hrs",
      title: "Clínica Intensiva de Cálculo",
      type: "Taller",
      badge: "taller",
      description: "Resolución cronometrada de patrones tácticos complejos previa al torneo nacional IRT."
    },
    {
      id: 13,
      day: 23,
      month: "Octubre",
      year: 2026,
      time: "19:00 hrs",
      title: "Congresillo Técnico IRT",
      type: "Especial",
      badge: "especial",
      description: "Revisión de bases, confirmación de inscripciones y bienvenida a los competidores federados."
    },
    {
      id: 14,
      day: 24,
      month: "Octubre",
      year: 2026,
      time: "09:30 hrs",
      title: "IRT Cuna de la Patria - R1 y R2",
      type: "Torneo",
      badge: "torneo",
      description: "Torneo válido para el Ranking Nacional y FIDE. Rondas 1 y 2 con control 60 min + 30 seg."
    },
    {
      id: 15,
      day: 25,
      month: "Octubre",
      year: 2026,
      time: "10:00 hrs",
      title: "IRT Cuna de la Patria - Final & Premios",
      type: "Torneo",
      badge: "torneo",
      description: "Rondas definitorias 3, 4 y 5. Ceremonia de clausura y entrega de copas y premios oficiales."
    },
    {
      id: 16,
      day: 28,
      month: "Octubre",
      year: 2026,
      time: "19:00 hrs",
      title: "Análisis Post-IRT con Módulos",
      type: "Taller",
      badge: "taller",
      description: "Sesión grupal proyectada en pantalla gigante analizando los aciertos y errores del torneo."
    },
    {
      id: 17,
      day: 30,
      month: "Octubre",
      year: 2026,
      time: "19:30 hrs",
      title: "Torneo Blitz Temático",
      type: "Torneo",
      badge: "torneo",
      description: "Ritmo vertiginoso 3+2 con medallas y premios especiales para los primeros lugares."
    },
    {
      id: 18,
      day: 31,
      month: "Octubre",
      year: 2026,
      time: "11:00 hrs",
      title: "Gran Cierre de Mes y Convivencia",
      type: "Comunidad",
      badge: "comunidad",
      description: "Jornada comunitaria, premiación a socios destacados del mes y partidas simultáneas abiertas."
    }
  ],

  // Problemas tácticos interactivos para resolver en el tablero
  puzzles: [
    {
      id: 1,
      title: "Problema 1: Mate del Pasillo",
      level: "Nivel Principiante",
      instructions: "Las piezas blancas juegan y dan Jaque Mate en 1 movimiento. Observa al Rey negro atrapado tras sus propios peones.",
      fen: "6k1/5ppp/8/8/8/8/4QPPP/6K1 w - - 0 1",
      turn: "white",
      correctMove: { from: "e2", to: "e8" },
      explanation: "¡Excelente! La Dama blanca penetra en la octava fila (De8#). Es el clásico Mate del Pasillo: el Rey negro no tiene casillas de escape porque sus propios peones en f7, g7 y h7 le bloquean la salida."
    },
    {
      id: 2,
      title: "Problema 2: La Doble Amenaza del Caballo (Horquilla)",
      level: "Nivel Principiante / Intermedio",
      instructions: "Juegan blancas. Encuentra el salto de caballo que ataca al Rey y a la Dama simultáneamente.",
      fen: "2q1k3/8/8/8/4N3/8/4K3/8 w - - 0 1",
      turn: "white",
      correctMove: { from: "e4", to: "d6" },
      explanation: "¡Brillante! El Caballo salta a d6 (Cd6+), dando jaque al Rey en e8 y amenazando a la Dama en c8 al mismo tiempo. ¡Ganancia decisiva de la Dama!"
    },
    {
      id: 3,
      title: "Problema 3: Mate del Pastor Inevitable",
      level: "Nivel Iniciación",
      instructions: "Juegan blancas y dan Jaque Mate en 1 jugada. La Dama blanca y el Alfil apuntan al punto débil f7.",
      fen: "r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
      turn: "white",
      correctMove: { from: "f3", to: "f7" },
      explanation: "¡Jaque Mate! Dxf7#. La Dama captura en f7 protegida por el Alfil en c4. El Rey negro no puede capturar la Dama ni escapar."
    },
    {
      id: 4,
      title: "Problema 4: La Clavada Ganadora de la Torre",
      level: "Nivel Intermedio",
      instructions: "Juegan blancas. La Dama negra y el Rey negro están en la misma columna. Utiliza tu Torre para clavar a la Dama con el respaldo de tu caballo.",
      fen: "4k3/5ppp/8/4q3/8/5N2/5PPP/3R2K1 w - - 0 1",
      turn: "white",
      correctMove: { from: "d1", to: "e1" },
      explanation: "¡Gran jugada! La Torre se sitúa en e1 (Te1), clavando a la Dama negra contra su Rey. Al estar protegida por el Caballo en f3, si la Dama captura (Dxe1+), el Caballo recaptura (Cxe1) ganando la Dama limpia."
    }
  ],

  // Guía interactiva de piezas y reglas didácticas (Posiciones de Partidas Reales)
  piecesGuide: [
    {
      id: "pawn",
      name: "El Peón",
      symbol: "♙",
      value: "1 Punto",
      role: "El alma del ajedrez y la primera línea de infantería",
      movement: "Avanza hacia adelante 1 casilla (o 2 en su primer movimiento). Captura en diagonal 1 casilla.",
      specialRules: "Captura al paso y Coronación (al llegar al final del tablero, se transforma en Dama, Torre, Alfil o Caballo).",
      strategyTip: "Una cadena sólida de peones domina el centro y resguarda a tu Rey.",
      lessons: [
        {
          id: "pawn-start",
          title: "1. Movimiento Inicial (1 o 2 casillas)",
          instructions: "Partida real: posición inicial. El peón de rey blanco en e2 se prepara para abrir el juego. Haz clic en e4 (avance doble de 2 casillas) o en e3 (avance simple).",
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
          highlightSquare: "e2",
          allowedMoves: ["e3", "e4"],
          explanation: "¡Excelente! La jugada 1.e4 es la apertura más clásica de la historia. Solo en su primer movimiento desde la 2ª fila, el peón tiene la opción de avanzar 1 o 2 casillas hacia adelante."
        },
        {
          id: "pawn-capture",
          title: "2. Captura en Diagonal",
          instructions: "Partida real (Apertura Escandinava tras 1.e4 d5). El peón blanco en e4 desafía al peón negro en d5. Haz clic en d5 para capturarlo en diagonal.",
          fen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
          highlightSquare: "e4",
          allowedMoves: ["d5", "e5"],
          captures: ["d5"],
          explanation: "¡Gran captura! exd5. Los peones avanzan de frente, pero capturan exclusivamente una casilla en diagonal hacia adelante."
        },
        {
          id: "pawn-enpassant",
          title: "3. Captura al Paso (En Passant)",
          instructions: "Partida real (Defensa Francesa variante del avance): el peón negro acaba de saltar 2 casillas de d7 a d5. Tu peón avanzado en e5 puede capturarlo al paso en diagonal haciendo clic en d6.",
          fen: "rnbqkbnr/ppp2ppp/4p3/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3",
          highlightSquare: "e5",
          allowedMoves: ["d6"],
          enPassant: { target: "d6", removePawn: "d5" },
          explanation: "¡Regla especial ejecutada! La Captura al Paso permite capturar a un peón rival que avanzó dos casillas sobrepasando la casilla crítica como si solo hubiera avanzado una."
        },
        {
          id: "pawn-promotion",
          title: "4. Coronación (Promoción)",
          instructions: "Final de partida real: tu peón ha alcanzado la 7ª fila (e7) escoltado por su Rey en e6. Haz clic en e8 para llegar a la última fila y elegir tu nueva pieza.",
          fen: "8/4P3/4K3/8/8/8/8/6k1 w - - 0 1",
          highlightSquare: "e7",
          allowedMoves: ["e8"],
          isPromotion: true,
          explanation: "¡Coronación histórica! Al alcanzar la 8ª fila, el peón se transforma inmediatamente en Dama, Torre, Alfil o Caballo."
        }
      ]
    },
    {
      id: "knight",
      name: "El Caballo",
      symbol: "♘",
      value: "3 Puntos",
      role: "El saltador ágil y táctico del tablero",
      movement: "Mueve en forma de 'L' (2 casillas en una dirección y 1 perpendicular). ¡Es la única pieza que puede saltar sobre otras!",
      specialRules: "No puede ser bloqueado por piezas intermedias. Cambia de color de casilla en cada salto.",
      strategyTip: "Los caballos son letales en posiciones cerradas y desde casillas centrales avanzadas.",
      lessons: [
        {
          id: "knight-jumps",
          title: "1. Salto en 'L' y Salto sobre Piezas",
          instructions: "Partida real tras 1.e4 e5: el Caballo blanco en g1 salta por encima de su muralla de peones. Haz clic en f3 (la jugada magistral 2.Cf3 que presiona el centro).",
          fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
          highlightSquare: "g1",
          allowedMoves: ["f3", "e2", "h3"],
          explanation: "¡Imparable! El caballo es la única pieza capaz de saltar sobre otras figuras (propias o rivales). Con 2.Cf3 entra en juego y ataca el centro."
        }
      ]
    },
    {
      id: "bishop",
      name: "El Alfil",
      symbol: "♗",
      value: "3 Puntos",
      role: "El francotirador de las diagonales largas",
      movement: "Se desplaza tantas casillas como desee en línea diagonal libre. Cada alfil permanece toda la partida en su color de origen.",
      specialRules: "No puede saltar sobre otras piezas. Se mueve siempre en diagonales de su color.",
      strategyTip: "La pareja de alfiles combinada en posiciones abiertas controla diagonales cruzadas mortales.",
      lessons: [
        {
          id: "bishop-diagonals",
          title: "1. Diagonales Libres y Desarrollo",
          instructions: "Partida real (Apertura Italiana tras 1.e4 e5 2.Cf3 Cc6). El Alfil de casillas claras en f1 tiene la diagonal despejada. Haz clic en c4 para activar el Alfil (3.Ac4).",
          fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
          highlightSquare: "f1",
          allowedMoves: ["c4", "b5", "e2", "d3"],
          explanation: "¡Dominio de diagonales! 3.Ac4. El Alfil se desplaza a cualquier distancia en diagonal siempre que no haya obstáculos, controlando el centro y apuntando al punto f7."
        }
      ]
    },
    {
      id: "rook",
      name: "La Torre",
      symbol: "♖",
      value: "5 Puntos",
      role: "La artillería pesada en columnas y filas",
      movement: "Mueve en línea recta horizontal o vertical tantas casillas como desee si el camino está libre.",
      specialRules: "Participa junto al Rey en el movimiento especial del Enroque.",
      strategyTip: "Coloca tus torres en columnas abiertas (sin peones) y domina la 7ª fila en el final.",
      lessons: [
        {
          id: "rook-lines",
          title: "1. Columna Abierta y 7ª Fila",
          instructions: "Partida real: la Torre blanca en d1 domina la columna abierta 'd' y la 1ª fila. Haz clic en una casilla de la columna para avanzar o en d8 para capturar la torre rival.",
          fen: "3r2k1/ppp2ppp/8/8/8/8/PPP2PPP/3R2K1 w - - 0 1",
          highlightSquare: "d1",
          allowedMoves: ["d2", "d3", "d4", "d5", "d6", "d7", "d8", "c1", "b1", "a1", "e1", "f1"],
          captures: ["d8"],
          explanation: "¡Poder lineal! Las torres barren filas y columnas abiertas con gran alcance de ataque. En d8 capturó la torre contraria dominando toda la columna."
        }
      ]
    },
    {
      id: "queen",
      name: "La Dama",
      symbol: "♕",
      value: "9 Puntos",
      role: "La pieza más poderosa y versátil del juego",
      movement: "Combina el poder de la Torre y el Alfil: puede moverse cualquier cantidad de casillas en vertical, horizontal o diagonal.",
      specialRules: "No puede saltar piezas. Evita sacarla demasiado temprano en la apertura.",
      strategyTip: "Coordínala siempre con piezas menores para crear redes de mate imparables.",
      lessons: [
        {
          id: "queen-mobility",
          title: "1. Movilidad Total y Ataque Central",
          instructions: "Partida real: la Dama centralizada en d4 despliega su máximo potencial en 8 direcciones. Haz clic en cualquier casilla marcada o captura un peón rival en d7 o a7.",
          fen: "6k1/p1pp1ppp/8/8/3Q4/8/PP3PPP/6K1 w - - 0 1",
          highlightSquare: "d4",
          allowedMoves: ["d1", "d2", "d3", "d5", "d6", "d7", "c4", "b4", "a4", "e4", "f4", "g4", "h4", "c5", "b6", "a7", "e5", "f6", "c3", "e3"],
          captures: ["d7", "a7"],
          explanation: "¡Poder supremo! La Dama combina la fuerza de la Torre y el Alfil en una sola figura, barriendo diagonales, filas y columnas completas con máxima versatilidad."
        }
      ]
    },
    {
      id: "king",
      name: "El Rey",
      symbol: "♔",
      value: "Invaluable (El corazón del juego)",
      role: "El líder al que debes proteger a toda costa",
      movement: "Se mueve 1 sola casilla en cualquier dirección (horizontal, vertical o diagonal).",
      specialRules: "Nunca puede ponerse en jaque. Realiza el movimiento especial de Enroque para protegerse.",
      strategyTip: "En la apertura protégelo con el enroque; en el final de la partida, ¡actívalo activamente para apoyar a tus peones!",
      lessons: [
        {
          id: "king-moves",
          title: "1. Movimiento de 1 Casilla en el Final",
          instructions: "Final de partida real de Reyes y Peones: el Rey se convierte en una pieza activa. Haz clic en cualquier casilla adyacente para avanzar hacia el centro.",
          fen: "8/4k3/6p1/8/4K3/6P1/7P/8 w - - 0 1",
          highlightSquare: "e4",
          allowedMoves: ["d5", "e5", "f5", "d4", "f4", "d3", "e3", "f3"],
          explanation: "¡Paso a paso! En el final de la partida el Rey deja su refugio y camina casilla a casilla en cualquier dirección hacia el centro para apoyar a sus peones."
        },
        {
          id: "king-castling",
          title: "2. Regla Especial: El Enroque",
          instructions: "Partida real (Apertura Italiana tras 1.e4 e5 2.Cf3 Cc6 3.Ac4 Ac5). El Rey en e1 y la Torre en h1 tienen el camino despejado. Haz clic en g1 para ejecutar el Enroque Corto (O-O).",
          fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
          highlightSquare: "e1",
          allowedMoves: ["g1"],
          isCastling: true,
          explanation: "¡Rey a salvo! El enroque es el único movimiento en que se mueven dos piezas a la vez: el Rey se refugia en el flanco de rey y la Torre entra en combate hacia el centro."
        }
      ]
    }
  ]
};

