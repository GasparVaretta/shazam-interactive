/**
 * Shazam 3D Web Infographic — NÚCLEO 3 HUD Component (EVOLUCIÓN / ACTUALIDAD)
 * Implements NÚCLEO 3 — Pantallas 1 to 6
 * Faithful to REFERENCES/NUCLEO_3/PANTALLAS/
 */

import gsap from 'gsap';

export class Nucleo3UI {
  constructor(onCompleteCallback) {
    this.onCompleteCallback = onCompleteCallback;
    this.container = null;
    this.currentScreen = 1; // 1 to 6
    this.robinSchulzAlbumDataUrl = null;

    // Explicit Data Mapping Structure for Pantalla 6 Radar Graph
    this.graphData = {
      top: {
        title: "Canciones en el catalogo",
        cyan: "+20 millones (2002)",
        purple: "+100.000 millones (2026)"
      },
      left: {
        title: "Tiempo de procesado",
        cyan: "15-30 segundos (2002)",
        purple: "3-7 segundos (2026)"
      },
      right: {
        title: "Usuarios activos",
        cyan: "500.000 usuarios (2002)",
        purple: "+300 millones (2026)"
      }
    };
  }

  /**
   * Crops Robin Schulz album cover from pantalla5.png via HTML5 Canvas
   */
  async loadRobinSchulzAlbumPhoto() {
    if (this.robinSchulzAlbumDataUrl) return this.robinSchulzAlbumDataUrl;

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = 'references/nucleo_3/pantallas/pantalla5.png';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleX = img.naturalWidth / 1920;
        const scaleY = img.naturalHeight / 1080;

        // Bounding box for Robin Schulz album cover inside pantalla5.png
        const cropX = 710 * scaleX;
        const cropY = 398 * scaleY;
        const cropW = 280 * scaleX;
        const cropH = 280 * scaleY;

        canvas.width = cropW;
        canvas.height = cropH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        this.robinSchulzAlbumDataUrl = canvas.toDataURL('image/png');
        resolve(this.robinSchulzAlbumDataUrl);
      };
      img.onerror = () => {
        console.warn('Could not load pantalla5.png for cropping');
        resolve('references/nucleo_3/pantallas/pantalla5.png');
      };
    });
  }

  async render(targetEl) {
    this.container = targetEl;
    if (!this.container) return;

    const albumSrc = await this.loadRobinSchulzAlbumPhoto();

    this.container.innerHTML = `
      <div class="nucleo-card nucleo3-card">
        <!-- Header -->
        <div class="nucleo-card-header">
          <span id="n3-header-title" class="nucleo-header-title purple-title">¿COMO FUNCIONA ACTUA?</span>
        </div>
        <div class="nucleo-header-line purple-line"></div>

        <!-- Body Content -->
        <div class="nucleo-card-body">

          <!-- PANTALLA 1: Disclaimer & Sound Photo Concept -->
          <div id="n3-screen-1" class="n3-screen active">
            <p class="n3-description">
              ¿Sabías que Shazam no escucha la canción? Lo que hace es sacarle una foto al sonido
            </p>

            <div class="n3-p1-layout">
              <!-- Exact pantalla1_animacion.gif Asset (Infinite Loop Hand Animation) -->
              <div class="n3-hand-pointer-box">
                <img src="references/nucleo_3/assets_mockups/pantalla1_animacion.gif" class="n3-hand-anim-gif" alt="Mano Animada" />
              </div>

              <!-- Phone Frame with Exact Shazam_Logo.png Asset from ASSETS_MOCKUPS -->
              <div class="n3-phone-frame" id="n3-p1-phone">
                <button class="n3-shazam-app-btn" id="n3-shazam-app-btn" title="Haz clic para iniciar el análisis">
                  <img src="references/nucleo_3/assets_mockups/Shazam_Logo.png" alt="Shazam App Icon" class="n3-shazam-logo-img" />
                </button>
              </div>
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <div></div>
              <button id="n3-next-1" class="nucleo-next-btn purple-btn">
                <span>SIGUIENTE</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 2: Espectrograma (Audio a Imagen) -->
          <div id="n3-screen-2" class="n3-screen" style="display: none;">
            <p class="n3-description">
              Esa foto se llama espectrograma: el audio convertido en imagen.
            </p>

            <div class="n3-p2-layout">
              <!-- Left Phone Frame -->
              <div class="n3-phone-frame small-phone">
                <div class="ear-icon-circle">
                  <svg viewBox="0 0 48 48" width="34" height="34">
                    <path d="M 28 10 C 32 10, 35 13, 35 17 C 35 21, 31 23, 31 25 C 31 26, 32 27, 34 27" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M 38 12 C 41 15, 41 19, 38 22" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M 42 9 C 46 14, 46 22, 42 26" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" />
                  </svg>
                </div>
              </div>

              <!-- Right Spectrum Audio Visualizer -->
              <div class="n3-spectrum-box">
                <svg class="spectrum-svg" viewBox="0 0 450 140" preserveAspectRatio="none">
                  <path d="M 0 70 Q 25 30 50 70 T 100 70 T 150 20 T 200 110 T 250 30 T 300 90 T 350 40 T 400 80 T 450 70" fill="none" stroke="#0088ff" stroke-width="3" />
                  <path d="M 0 70 Q 20 10 40 70 T 90 70 T 140 10 T 190 120 T 240 15 T 290 100 T 340 25 T 390 90 T 450 70" fill="none" stroke="#00f0ff" stroke-width="2" opacity="0.85" />
                  <path d="M 0 70 Q 30 50 60 70 T 120 70 T 170 30 T 220 95 T 270 40 T 320 80 T 370 50 T 450 70" fill="none" stroke="#b545ff" stroke-width="2.5" opacity="0.9" />
                </svg>
              </div>
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-2" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-next-2" class="nucleo-next-btn purple-btn">
                <span>SIGUIENTE</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 3: Filtrado de Picos Intensos -->
          <div id="n3-screen-3" class="n3-screen" style="display: none;">
            <p class="n3-description">
              De esa imagen Shazam borra casi todo, solo guarda los puntos más intensos, los picos.
            </p>

            <div class="n3-p3-layout">
              <!-- Left Phone Frame -->
              <div class="n3-phone-frame small-phone">
                <div class="ear-icon-circle">
                  <svg viewBox="0 0 48 48" width="34" height="34">
                    <path d="M 28 10 C 32 10, 35 13, 35 17 C 35 21, 31 23, 31 25 C 31 26, 32 27, 34 27" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M 38 12 C 41 15, 41 19, 38 22" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" />
                  </svg>
                </div>
              </div>

              <!-- Spectrum Container with Dark Translucent Band & 4 Highlighted Peak Boxes -->
              <div class="n3-peaks-container">
                <div class="dark-blur-overlay-band"></div>

                <svg class="spectrum-svg" viewBox="0 0 450 140" preserveAspectRatio="none">
                  <path d="M 0 70 Q 25 30 50 70 T 100 70 T 150 20 T 200 110 T 250 30 T 300 90 T 350 40 T 400 80 T 450 70" fill="none" stroke="#0055aa" stroke-width="2" opacity="0.4" />
                  <path d="M 0 70 Q 20 10 40 70 T 90 70 T 140 10 T 190 120 T 240 15 T 290 100 T 340 25 T 390 90 T 450 70" fill="none" stroke="#00e5ff" stroke-width="2.5" />
                </svg>

                <!-- Peak Box 1 (Top Left) -->
                <div class="peak-highlight-box p1">
                  <div class="peak-bars">
                    <span class="bar h-60"></span>
                    <span class="bar h-90"></span>
                    <span class="bar h-40"></span>
                  </div>
                </div>

                <!-- Peak Box 2 (Bottom Mid-Left) -->
                <div class="peak-highlight-box p2">
                  <div class="peak-bars">
                    <span class="bar h-50"></span>
                    <span class="bar h-85"></span>
                    <span class="bar h-65"></span>
                  </div>
                </div>

                <!-- Peak Box 3 (Top Mid-Right) -->
                <div class="peak-highlight-box p3">
                  <div class="peak-bars">
                    <span class="bar h-70"></span>
                    <span class="bar h-100"></span>
                    <span class="bar h-80"></span>
                  </div>
                </div>

                <!-- Peak Box 4 (Top Far-Right) -->
                <div class="peak-highlight-box p4">
                  <div class="peak-bars">
                    <span class="bar h-75"></span>
                    <span class="bar h-95"></span>
                    <span class="bar h-55"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-3" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-next-3" class="nucleo-next-btn purple-btn">
                <span>SIGUIENTE</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 4: Huella Digital de la Canción -->
          <div id="n3-screen-4" class="n3-screen" style="display: none;">
            <p class="n3-description">
              Esos picos son la huella digital de la canción
            </p>

            <div class="n3-p4-layout">
              <!-- Left Phone Frame -->
              <div class="n3-phone-frame small-phone">
                <div class="ear-icon-circle">
                  <svg viewBox="0 0 48 48" width="34" height="34">
                    <path d="M 28 10 C 32 10, 35 13, 35 17 C 35 21, 31 23, 31 25 C 31 26, 32 27, 34 27" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" />
                  </svg>
                </div>
              </div>

              <!-- Spectrum Container with Central Purple Fingerprint Overlay -->
              <div class="n3-fingerprint-overlay-container">
                <div class="dark-blur-overlay-band"></div>

                <!-- 4 Highlight Boxes Behind Fingerprint -->
                <div class="peak-highlight-box p1 opacity-50"></div>
                <div class="peak-highlight-box p2 opacity-50"></div>
                <div class="peak-highlight-box p3 opacity-50"></div>
                <div class="peak-highlight-box p4 opacity-50"></div>

                <!-- Central Prominent Fingerprint Circle -->
                <div class="central-fingerprint-circle">
                  <svg viewBox="0 0 64 64" width="70" height="70">
                    <path d="M 32 12 C 22 12, 14 20, 14 30 L 14 42" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                    <path d="M 32 18 C 25 18, 20 23, 20 30 L 20 46" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                    <path d="M 32 24 C 28 24, 26 27, 26 30 L 26 50" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                    <path d="M 32 30 C 32 32, 31 34, 31 36 L 31 48" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                    <path d="M 38 20 C 44 24, 46 30, 46 36 L 46 44" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                    <path d="M 40 28 C 42 31, 42 35, 42 40" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-4" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-next-4" class="nucleo-next-btn purple-btn">
                <span>SIGUIENTE</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 5: Búsqueda en Base de Datos & Resultado -->
          <div id="n3-screen-5" class="n3-screen" style="display: none;">
            <p class="n3-description">
              Una vez obtenida la huella la aplicación la busca entre millones de canciones, proceso que solo tarda milisegundos.
            </p>

            <div class="n3-p5-layout">
              <!-- Left: Purple Fingerprint Squircle Card -->
              <div class="fingerprint-card-box">
                <svg viewBox="0 0 64 64" width="60" height="60">
                  <path d="M 32 12 C 22 12, 14 20, 14 30 L 14 42" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                  <path d="M 32 18 C 25 18, 20 23, 20 30 L 20 46" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                  <path d="M 32 24 C 28 24, 26 27, 26 30 L 26 50" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                  <path d="M 38 20 C 44 24, 46 30, 46 36 L 46 44" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" />
                </svg>
              </div>

              <!-- Center: Purple Right Arrow -->
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#b545ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>

              <!-- Right: Robin Schulz Album Cover & Song Details -->
              <div class="n3-song-card-box">
                <div class="robin-album-frame">
                  <img src="${albumSrc}" class="robin-cover-photo" alt="Robin Schulz - Prayer in C" />
                </div>
                <div class="song-details-text">
                  <div class="song-title-line purple-text">Tu cancion es: “Prayer in C” de Robin Schulz</div>
                  <div class="shazam-count-line">20 millones Shazams (2015).</div>
                </div>
              </div>
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-5" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-next-5" class="nucleo-next-btn purple-btn">
                <span>SIGUIENTE</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 6: Comparativas Antes vs Hoy (Gráfico Triangular con Hover) -->
          <div id="n3-screen-6" class="n3-screen" style="display: none;">
            <div class="n3-p6-layout">
              <!-- Left Legend -->
              <div class="p6-legend-box">
                <div class="legend-item">
                  <span class="legend-dot cyan-dot"></span>
                  <span class="legend-label">Estadisticas en 2002</span>
                </div>
                <div class="legend-item">
                  <span class="legend-dot purple-dot"></span>
                  <span class="legend-label">Estadisticas en 2026</span>
                </div>
              </div>

              <!-- Center Triangular Spectro-Radar Graph -->
              <div class="p6-graph-container">
                <svg class="radar-triangle-svg" viewBox="0 0 360 280">
                  <!-- Outer Base Triangle (Purple Boundary) -->
                  <polygon points="180,20 40,240 320,240" fill="rgba(124, 58, 237, 0.08)" stroke="#7c3aed" stroke-width="2.5" />

                  <!-- 3 Center Axis Lines -->
                  <line x1="180" y1="140" x2="180" y2="20" stroke="rgba(181, 69, 255, 0.4)" stroke-dasharray="3,3" stroke-width="1.5" />
                  <line x1="180" y1="140" x2="40" y2="240" stroke="rgba(181, 69, 255, 0.4)" stroke-dasharray="3,3" stroke-width="1.5" />
                  <line x1="180" y1="140" x2="320" y2="240" stroke="rgba(181, 69, 255, 0.4)" stroke-dasharray="3,3" stroke-width="1.5" />

                  <!-- Series 2002 (Cyan Polygon) -->
                  <polygon points="180,94 65,222 229,175" fill="rgba(0, 240, 255, 0.18)" stroke="#00f0ff" stroke-width="2.5" />

                  <!-- Series 2002 Dots -->
                  <circle cx="180" cy="94" r="5" fill="#00f0ff" />
                  <circle cx="65" cy="222" r="5" fill="#00f0ff" />
                  <circle cx="229" cy="175" r="5" fill="#00f0ff" />

                  <!-- Series 2026 (Purple/Lavender Polygon) -->
                  <polygon points="180,20 145,165 320,240" fill="rgba(129, 140, 248, 0.18)" stroke="#818cf8" stroke-width="2.5" />

                  <!-- Series 2026 Dots -->
                  <circle cx="180" cy="20" r="6" fill="#818cf8" />
                  <circle cx="145" cy="165" r="6" fill="#818cf8" />
                  <circle cx="320" cy="240" r="6" fill="#818cf8" />
                </svg>

                <!-- Interactive Vertex 1 (Top: Canciones en el catálogo) -->
                <div class="vertex-zone v-top" data-vertex="top">
                  <div class="vertex-title">Canciones en el catalogo</div>
                  <!-- Hidden by Default -> Popup Tooltip on Hover ONLY -->
                  <div class="vertex-hover-tooltip" id="tooltip-top">
                    <div class="val-cyan">+20 millones (2002)</div>
                    <div class="val-purple">+100.000 millones (2026)</div>
                  </div>
                </div>

                <!-- Interactive Vertex 2 (Bottom-Left: Tiempo de procesado) -->
                <div class="vertex-zone v-left" data-vertex="left">
                  <div class="vertex-title">Tiempo de procesado</div>
                  <!-- Hidden by Default -> Popup Tooltip on Hover ONLY -->
                  <div class="vertex-hover-tooltip" id="tooltip-left">
                    <div class="val-cyan">15-30 segundos (2002)</div>
                    <div class="val-purple">3-7 segundos (2026)</div>
                  </div>
                </div>

                <!-- Interactive Vertex 3 (Bottom-Right: Usuarios activos) -->
                <div class="vertex-zone v-right" data-vertex="right">
                  <div class="vertex-title">Usuarios activos</div>
                  <!-- Hidden by Default -> Popup Tooltip on Hover ONLY -->
                  <div class="vertex-hover-tooltip" id="tooltip-right">
                    <div class="val-cyan">500.000 usuarios (2002)</div>
                    <div class="val-purple">+300 millones (2026)</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n3-prev-6" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n3-final-next-btn" class="nucleo-next-btn purple-btn">
                <span>SIGUIENTE</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
    this.goToScreen(1);
  }

  bindEvents() {
    // Screen 1: Clicking Shazam App Button advances to Screen 2
    const shazamBtn = this.container.querySelector('#n3-shazam-app-btn');
    if (shazamBtn) {
      shazamBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToScreen(2);
      });
    }

    // Next Buttons
    const next1 = this.container.querySelector('#n3-next-1');
    if (next1) next1.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(2); });

    const next2 = this.container.querySelector('#n3-next-2');
    if (next2) next2.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(3); });

    const next3 = this.container.querySelector('#n3-next-3');
    if (next3) next3.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(4); });

    const next4 = this.container.querySelector('#n3-next-4');
    if (next4) next4.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(5); });

    const next5 = this.container.querySelector('#n3-next-5');
    if (next5) next5.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(6); });

    // Previous Buttons
    const prev2 = this.container.querySelector('#n3-prev-2');
    if (prev2) prev2.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(1); });

    const prev3 = this.container.querySelector('#n3-prev-3');
    if (prev3) prev3.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(2); });

    const prev4 = this.container.querySelector('#n3-prev-4');
    if (prev4) prev4.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(3); });

    const prev5 = this.container.querySelector('#n3-prev-5');
    if (prev5) prev5.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(4); });

    const prev6 = this.container.querySelector('#n3-prev-6');
    if (prev6) prev6.addEventListener('click', (e) => { e.stopPropagation(); this.goToScreen(5); });

    // Final Next Button on Screen 6 -> Unlocks Node 4
    const finalNextBtn = this.container.querySelector('#n3-final-next-btn');
    if (finalNextBtn) {
      finalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onCompleteCallback) {
          console.log('⚡ Nucleus 3 Complete -> Triggering transition to Node 4');
          this.onCompleteCallback();
        }
      });
    }

    // Pantalla 6 Vertex Hover Events for Data Tooltips (Hidden by default, visible on hover ONLY)
    const vertexZones = this.container.querySelectorAll('.vertex-zone');
    vertexZones.forEach((zone) => {
      zone.addEventListener('mouseenter', () => {
        const tooltip = zone.querySelector('.vertex-hover-tooltip');
        if (tooltip) tooltip.classList.add('visible');
      });
      zone.addEventListener('mouseleave', () => {
        const tooltip = zone.querySelector('.vertex-hover-tooltip');
        if (tooltip) tooltip.classList.remove('visible');
      });
    });
  }

  goToScreen(screenNum) {
    this.currentScreen = screenNum;

    // Update Header Title depending on Screen
    const headerTitle = this.container.querySelector('#n3-header-title');
    if (headerTitle) {
      if (screenNum === 6) {
        headerTitle.textContent = 'COMPARATIVAS: ANTES VS HOY';
      } else {
        headerTitle.textContent = '¿COMO FUNCIONA ACTUA?';
      }
    }

    // Toggle Screen Elements
    for (let i = 1; i <= 6; i++) {
      const screenEl = this.container.querySelector(`#n3-screen-${i}`);
      if (screenEl) {
        if (i === screenNum) {
          screenEl.style.display = 'block';
          gsap.fromTo(screenEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 });
        } else {
          screenEl.style.display = 'none';
        }
      }
    }
  }

  resetState() {
    this.goToScreen(1);
  }
}
