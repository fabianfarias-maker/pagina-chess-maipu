# Chess Maipú - Sitio Web Oficial del Club de Ajedrez

Sitio web moderno, limpio y juvenil desarrollado para **Chess Maipú**, club de ajedrez comunitario ubicado en la comuna de **Maipú, Santiago, Chile**.

---

## 🌟 Características Principales

1. **Identidad & Hero Impactante:**
   - Estética inspirada en el ajedrez moderno, la mente y la comunidad.
   - Tipografía limpia (*Plus Jakarta Sans* y acentos nobles), modo oscuro con toques esmeralda y cian.
   - Llamados a la acción directos para socios, clases y torneos.

2. **Historia & Valores Comunales:**
   - Reseña del espíritu del club arraigado en la comuna de Maipú.
   - Enfoque en pensamiento crítico, juventud, integración familiar y competencia sana.

3. **Clases Multinivel & Torneos:**
   - **Clases:** Semillero Infantil (Iniciación Sub-14), Intermedio (1200 - 1700 ELO), Alta Competencia (+1700 ELO / Federados).
   - **Torneos:** Viernes Blitz Nocturno semanal, Torneo Abierto IRT FIDE "Cuna de la Patria", Copa Escolar Intercolegios.
   - Selector interactivo mediante pestañas con tarifas y horarios claros.

4. **Laboratorio Interactivo de Ajedrez (En línea):**
   - **Modo 1: Conoce las Piezas y Reglas:** Selector interactivo de piezas (Peón, Caballo, Alfil, Torre, Dama, Rey) con tablero interactivo que muestra las casillas válidas, valores relativos, reglas especiales (enroque, coronación, captura al paso) y consejos estratégicos.
   - **Modo 2: Entrenador de Problemas Tácticos:** Puzzles interactivos reales (Mate del Pasillo, Horquilla de Caballo, Mate del Pastor, Clavada de Torre) con validación de jugadas en tiempo real, efectos de sonido sintetizados (Web Audio API), explicaciones didácticas, sistema de pistas y botón de siguiente problema.

5. **Noticias Actualizadas (Nacional e Internacional):**
   - **Nacional:** Histórica participación de Chile en la Olimpiada Mundial de Ajedrez con destacadas victorias ante potencias.
   - **Sede:** Santiago como anfitrión del XXII Festival Sudamericano de Ajedrez de la Juventud 2026.
   - **Internacional:** Duelo por la Corona Mundial FIDE (Gukesh D vs Javokhir Sindarov).

6. **Calendario de Actividades del Mes:**
   - Lista visual de fechas clave de torneos, talleres y encuentros familiares.

7. **Horarios, Ubicación y Mapa:**
   - Horarios detallados de Lunes a Domingo.
   - Dirección: Av. Pajaritos 2450 (Plaza de Maipú, Santiago).
   - Mapa interactivo de OpenStreetMap / Leaflet centrado en el corazón de Maipú con indicaciones de transporte público (Metro L5 y micros).

8. **Inscripción & Suscripción:**
   - Modal interactivo con validación de formulario para registrar nuevos socios, alumnos o participantes de torneos.

9. **Footer Completo:**
   - Canales oficiales de contacto, WhatsApp con enlace directo, correo, redes sociales y horarios.

---

## 🚀 Cómo Abrir y Ejecutar el Proyecto

El sitio web está construido con tecnologías web estándar (HTML5, Tailwind CSS, JavaScript modular), por lo que funciona sin requerir compilación pesada:

### Opción 1: Abrir directamente en el navegador
Puedes hacer doble clic en el archivo `index.html` en tu explorador de archivos para abrirlo en Chrome, Edge, Firefox o Safari.

### Opción 2: Con servidor local de Python
Si deseas correrlo a través de un servidor HTTP local:
```bash
python -m http.server 8000
```
Luego abre tu navegador en: [http://localhost:8000](http://localhost:8000)

---

## 📁 Estructura del Proyecto

```
Página ChessMaipú/
│
├── index.html         # Estructura semántica, accesibilidad y maquetación completa
├── styles.css         # Estilos visuales, glassmorphism, cuadrícula del tablero y animaciones
├── app.js             # Lógica de interacción, navegación, renderizado dinámico y mapa
├── chess-board.js     # Motor del tablero interactivo SVG, audio sintetizado y lógica táctica
├── data.js            # Fuente de datos: noticias, torneos, clases, calendario y puzzles
└── README.md          # Documentación del proyecto
```
