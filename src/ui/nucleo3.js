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
              <!-- celularshazam.png — Asset principal centrado con bordes neon -->
              <div class="n3-celular-frame" id="n3-p1-phone">
                <img src="references/nucleo_3/assets_mockups/celularshazam.png" alt="Shazam en celular" class="n3-celular-img" />
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
              <img src="references/nucleo_3/assets_mockups/celularfoto.png" alt="Espectrograma: el audio convertido en imagen" class="n3-espectrograma-img" />
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
              <img src="references/nucleo_3/assets_mockups/celularpicos.png" alt="Filtrado de picos: puntos más intensos del espectrograma" class="n3-picos-img" />
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
              <img src="references/nucleo_3/assets_mockups/celularpicoshuella.png" alt="Huella digital: picos convertidos en huella de la canción" class="n3-huella-img" />
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
              <!-- Left: Huella y flecha integrada -->
              <div class="n3-huellaflecha-frame">
                <img src="references/nucleo_3/assets_mockups/huellaflecha.png" alt="Huella y flecha hacia la canción" class="n3-huellaflecha-img" />
              </div>

              <!-- Right: Robin Schulz Album Cover & Song Details -->
              <div class="n3-song-card-box">
                <div class="robin-album-frame">
                  <img src="${albumSrc}" class="robin-cover-photo" alt="Robin Schulz - Prayer in C" />
                </div>
                <div class="song-details-text">
                  <div class="song-title-line">Tu cancion es: “Prayer in C” de Robin Schulz</div>
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

          <!-- PANTALLA 6: Comparativas Antes vs Hoy (Gráfico Triangular) -->
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
                <!-- Top Axis Data: Canciones en el catálogo -->
                <div class="vertex-block v-top">
                  <div class="vertex-title">Canciones en el catalogo</div>
                  <div class="val-cyan">+20 millones (2002)</div>
                  <div class="val-purple">+100.000 millones (2026)</div>
                </div>

                <!-- Central Radar Triangle SVG -->
                <svg class="radar-triangle-svg" viewBox="0 0 360 250">
                  <!-- Outer Base Triangle (Purple Boundary) -->
                  <polygon points="180,45 65,215 295,215" fill="rgba(94, 0, 255, 0.08)" stroke="#5E00FF" stroke-width="2.5" />

                  <!-- Inner Grid Triangle -->
                  <polygon points="180,102 122,187 238,187" fill="none" stroke="rgba(94, 0, 255, 0.3)" stroke-dasharray="3,3" stroke-width="1.2" />

                  <!-- 3 Center Axis Lines -->
                  <line x1="180" y1="158" x2="180" y2="45" stroke="rgba(94, 0, 255, 0.4)" stroke-dasharray="3,3" stroke-width="1.5" />
                  <line x1="180" y1="158" x2="65" y2="215" stroke="rgba(94, 0, 255, 0.4)" stroke-dasharray="3,3" stroke-width="1.5" />
                  <line x1="180" y1="158" x2="295" y2="215" stroke="rgba(94, 0, 255, 0.4)" stroke-dasharray="3,3" stroke-width="1.5" />

                  <!-- Series 2002 (Cyan Polygon) -->
                  <polygon points="180,110 82,204 225,180" fill="rgba(0, 240, 255, 0.18)" stroke="#00f0ff" stroke-width="2.5" />

                  <!-- Series 2002 Dots -->
                  <circle cx="180" cy="110" r="5" fill="#00f0ff" />
                  <circle cx="82" cy="204" r="5" fill="#00f0ff" />
                  <circle cx="225" cy="180" r="5" fill="#00f0ff" />

                  <!-- Series 2026 (Periwinkle/Violet Polygon) -->
                  <polygon points="180,45 150,172 295,215" fill="rgba(129, 140, 248, 0.18)" stroke="#818cf8" stroke-width="2.5" />

                  <!-- Series 2026 Dots -->
                  <circle cx="180" cy="45" r="6" fill="#818cf8" />
                  <circle cx="150" cy="172" r="6" fill="#818cf8" />
                  <circle cx="295" cy="215" r="6" fill="#818cf8" />
                </svg>

                <!-- Bottom-Left Axis Data: Tiempo de procesado -->
                <div class="vertex-block v-left">
                  <div class="vertex-title">Tiempo de procesado</div>
                  <div class="val-cyan">15-30 segundos (2002)</div>
                  <div class="val-purple">3-7 segundos (2026)</div>
                </div>

                <!-- Bottom-Right Axis Data: Usuarios activos -->
                <div class="vertex-block v-right">
                  <div class="vertex-title">Usuarios activos</div>
                  <div class="val-cyan">500.000 usuarios (2002)</div>
                  <div class="val-purple">+300 millones (2026)</div>
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
    // Screen 1: Next button advances to Screen 2
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
