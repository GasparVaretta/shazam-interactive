/**
 * Shazam 3D Web Infographic — NÚCLEO 2 HUD Component
 * Implements NÚCLEO 2 — PANTALLA 1 (Marcar 2580 Puzzle) and
 * NÚCLEO 2 — PANTALLA 2 (Estado 1: Carga 3.5s -> Estado 2: Carga Completa)
 * Faithful to REFERENCES/NUCLEO_2/PANTALLAS/
 */

import gsap from 'gsap';

export class Nucleo2UI {
  constructor(onCompleteCallback) {
    this.onCompleteCallback = onCompleteCallback;
    this.container = null;
    this.enteredSequence = [];
    this.isResolvedP1 = false;
    this.currentScreen = 1; // 1: Pantalla 1, 2: Pantalla 2 Carga, 3: Pantalla 2 Carga Completa
    this.loadingTimer = null;
    this.eminemAlbumDataUrl = null;
  }

  /**
   * Crops Eminem album cover from nucleo2_pantalla2_carga_completa.png via HTML5 Canvas
   */
  async loadEminemAlbumPhoto() {
    if (this.eminemAlbumDataUrl) return this.eminemAlbumDataUrl;

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = 'references/nucleo_2/pantallas/nucleo2_pantalla2_carga_completa.png';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleX = img.naturalWidth / 1920;
        const scaleY = img.naturalHeight / 1080;

        // Bounding box for Eminem album cover inside mockup
        const cropX = 1420 * scaleX;
        const cropY = 388 * scaleY;
        const cropW = 280 * scaleX;
        const cropH = 280 * scaleY;

        canvas.width = cropW;
        canvas.height = cropH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        this.eminemAlbumDataUrl = canvas.toDataURL('image/png');
        resolve(this.eminemAlbumDataUrl);
      };
      img.onerror = () => {
        console.warn('Could not load nucleo2_pantalla2_carga_completa.png for cropping');
        resolve('references/nucleo_2/pantallas/nucleo2_pantalla2_carga_completa.png');
      };
    });
  }

  async render(targetEl) {
    this.container = targetEl;
    if (!this.container) return;

    const albumSrc = await this.loadEminemAlbumPhoto();

    this.container.innerHTML = `
      <div class="nucleo-card nucleo2-card">
        <!-- Header -->
        <div class="nucleo-card-header">
          <span id="n2-header-title" class="nucleo-header-title">ORIGENES: ¿COMO FUNCIONABA?</span>
        </div>
        <div class="nucleo-header-line"></div>

        <!-- Body Content -->
        <div class="nucleo-card-body">
          <!-- PANTALLA 1: Puzzle 2580 -->
          <div id="n2-screen-1" class="n2-screen active">
            <p class="n2-description">
              Antes de la existencia de los smartphones ya existía un sistema que te permitía reconocer la canción que estabas escuchando. <span class="highlight-purple">¡Probemos como funciona!</span>
            </p>

            <div class="n2-interactive-layout">
              <!-- Overlay SVG for Precise Component-to-Component Connectors (Circles sitting BELOW title & anchored) -->
              <svg class="n2-overlay-svg" viewBox="0 0 800 260">
                <!-- Connector 1: Circle sitting BELOW "Marcar 2580" title -> Keypad Mid-Left Border -->
                <circle cx="85" cy="48" r="4.5" fill="#00f0ff" />
                <path d="M 85 48 L 85 130 L 245 130" fill="none" stroke="#00f0ff" stroke-width="2.5" />
                <circle cx="245" cy="130" r="4.5" fill="#00f0ff" />

                <!-- Connector 2: Keypad Mid-Right Border -> Cellphone CTA Outer Border -->
                <circle cx="505" cy="130" r="4.5" id="n2-dot-2a" fill="rgba(0, 240, 255, 0.35)" />
                <path d="M 505 130 L 585 130 L 585 175 L 638 175" fill="none" stroke="rgba(0, 240, 255, 0.35)" stroke-width="2.5" id="n2-line-2-path" />
                <circle cx="638" cy="175" r="4.5" id="n2-dot-2b" fill="rgba(0, 240, 255, 0.35)" />
              </svg>

              <!-- Left Component: Instruction Title -->
              <div class="n2-instruction-box">
                <div class="n2-instruction-title">Marcar “2580”</div>
              </div>

              <!-- Center Component: Keypad Frame -->
              <div class="n2-keypad-box">
                <div class="keypad-grid">
                  <button class="keypad-btn" data-key="1">1</button>
                  <button class="keypad-btn" data-key="2">2</button>
                  <button class="keypad-btn" data-key="3">3</button>
                  <button class="keypad-btn" data-key="4">4</button>
                  <button class="keypad-btn" data-key="5">5</button>
                  <button class="keypad-btn" data-key="6">6</button>
                  <button class="keypad-btn" data-key="7">7</button>
                  <button class="keypad-btn" data-key="8">8</button>
                  <button class="keypad-btn" data-key="9">9</button>
                  <button class="keypad-btn" data-key="*">*</button>
                  <button class="keypad-btn" data-key="0">0</button>
                  <button class="keypad-btn" data-key="#">#</button>
                </div>
              </div>

              <!-- Right Component: Cellphone CTA Button (SIGUIENTE) -->
              <div class="n2-cellphone-box">
                <button id="n2-cellphone-btn" class="cellphone-btn disabled" disabled title="Ingresa la combinación '2580' para continuar">
                  <svg class="phone-icon-svg" viewBox="0 0 64 64" width="52" height="52">
                    <path d="M 20 12 C 18 12, 14 16, 14 20 C 14 34, 30 50, 44 50 C 48 50, 52 46, 52 44 L 46 36 C 44 34, 40 34, 38 36 L 34 40 C 26 36, 20 30, 16 22 L 20 18 C 22 16, 22 12, 20 12 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                    <line x1="36" y1="28" x2="52" y2="28" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
                    <polyline points="46 21 53 28 46 35" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- PANTALLA 2 — ESTADO 1: Carga (3.5 Segundos / 3500ms) -->
          <div id="n2-screen-2-carga" class="n2-screen" style="display: none;">
            <p class="n2-description">
              El teléfono al reconocer la música de fondo te enviaba el resultado en formato de mensaje de texto, que contenía el título de la canción y su autor
            </p>

            <div class="n2-loading-layout">
              <!-- Phone Listening Icon Pill (Handset + Ear + Sound Waves) -->
              <div class="phone-listening-pill">
                <svg viewBox="0 0 64 64" width="52" height="52" class="listening-svg">
                  <!-- Phone Handset -->
                  <path d="M 18 14 C 16 14, 12 18, 12 22 C 12 36, 28 52, 42 52 C 46 52, 50 48, 50 46 L 44 38 C 42 36, 38 36, 36 38 L 32 42 C 24 38, 18 32, 14 24 L 18 20 C 20 18, 20 14, 18 14 Z" fill="#000000" />
                  <!-- Ear Contour -->
                  <path d="M 38 14 C 42 14, 45 17, 45 21 C 45 25, 41 27, 41 29 C 41 30, 42 31, 44 31" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" />
                  <!-- Sound Waves -->
                  <path d="M 48 15 C 51 18, 51 23, 48 26" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" />
                  <path d="M 53 12 C 57 17, 57 26, 53 30" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" />
                </svg>
              </div>

              <!-- Circular Ring Loader (30 sec label, 3500ms automatic timer) -->
              <div class="ring-loader-box">
                <div class="ring-loader-spinner"></div>
                <span class="ring-loader-text">30 sec</span>
              </div>
            </div>
          </div>

          <!-- PANTALLA 2 — ESTADO 2: Carga Completa (Resultado Final) -->
          <div id="n2-screen-2-completa" class="n2-screen" style="display: none;">
            <p class="n2-description">
              El teléfono al reconocer la música de fondo te enviaba el resultado en formato de mensaje de texto, que contenía el título de la canción y su autor
            </p>

            <div class="n2-result-layout">
              <!-- Left: Phone Listening Icon -->
              <div class="phone-listening-pill">
                <svg viewBox="0 0 64 64" width="48" height="48" class="listening-svg">
                  <!-- Phone Handset -->
                  <path d="M 18 14 C 16 14, 12 18, 12 22 C 12 36, 28 52, 42 52 C 46 52, 50 48, 50 46 L 44 38 C 42 36, 38 36, 36 38 L 32 42 C 24 38, 18 32, 14 24 L 18 20 C 20 18, 20 14, 18 14 Z" fill="#000000" />
                  <!-- Ear Contour -->
                  <path d="M 38 14 C 42 14, 45 17, 45 21 C 45 25, 41 27, 41 29 C 41 30, 42 31, 44 31" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" />
                  <!-- Sound Waves -->
                  <path d="M 48 15 C 51 18, 51 23, 48 26" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" />
                  <path d="M 53 12 C 57 17, 57 26, 53 30" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" />
                </svg>
              </div>

              <!-- Center: Text Message SMS Icon + Arrow -->
              <div class="n2-sms-arrow-box">
                <div class="sms-icon-box">
                  <svg viewBox="0 0 48 48" width="38" height="38">
                    <path d="M 8 10 C 5.8 10, 4 11.8, 4 14 L 4 30 C 4 32.2, 5.8 34, 8 34 L 14 34 L 14 41 L 21 34 L 40 34 C 42.2 34, 44 32.2, 44 30 L 44 14 C 44 11.8, 42.2 10, 40 10 Z" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linejoin="round" />
                    <circle cx="16" cy="22" r="2.2" fill="#00f0ff" />
                    <circle cx="24" cy="22" r="2.2" fill="#00f0ff" />
                    <circle cx="32" cy="22" r="2.2" fill="#00f0ff" />
                  </svg>
                </div>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>

              <!-- Right: Album Cover & Song Details -->
              <div class="n2-song-card-box">
                <div class="eminem-album-frame">
                  <img id="eminemAlbumImg" src="${albumSrc}" class="eminem-cover-photo" alt="Eminem - Cleanin' Out My Closet" />
                </div>
                <div class="song-details-text">
                  <div class="song-title-line">Tu cancion es: “Cleanin' out my closet” de Eminem</div>
                  <div class="shazam-count-line">1000 Shazams (2002)</div>
                </div>
              </div>
            </div>

            <!-- Footer Navigation Controls -->
            <div class="nucleo-card-footer">
              <button id="n2-prev-btn" class="nucleo-next-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n2-final-next-btn" class="nucleo-next-btn">
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
    this.resetState();
  }

  bindEvents() {
    const keypadBtns = this.container.querySelectorAll('.keypad-btn');
    keypadBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.dataset.key;
        this.onKeyPress(key, btn);
      });
    });

    // Cellphone CTA click -> Advances to Pantalla 2 Estado 1 (Carga 3.5s)
    const cellphoneBtn = this.container.querySelector('#n2-cellphone-btn');
    if (cellphoneBtn) {
      cellphoneBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.isResolvedP1) {
          this.startPantalla2Carga();
        }
      });
    }

    // Previous Button in Pantalla 2 Estado 2
    const prevBtn = this.container.querySelector('#n2-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.resetState();
      });
    }

    // Final Next Button in Pantalla 2 Estado 2
    const finalNextBtn = this.container.querySelector('#n2-final-next-btn');
    if (finalNextBtn) {
      finalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onCompleteCallback) {
          console.log('⚡ Nucleus 2 Complete -> Triggering transition');
          this.onCompleteCallback();
        }
      });
    }
  }

  /**
   * Keypad press handler
   */
  onKeyPress(key, btnEl) {
    if (this.isResolvedP1) return;

    btnEl.classList.add('selected-key');
    gsap.fromTo(btnEl, { scale: 1.12 }, { scale: 1, duration: 0.2, ease: 'power1.out' });

    this.enteredSequence.push(key);
    if (this.enteredSequence.length > 4) {
      this.enteredSequence.shift();
    }

    const seqStr = this.enteredSequence.join('');
    if (seqStr === '2580') {
      this.transitionToResolvedStateP1();
    } else {
      const cellphoneBtn = this.container.querySelector('#n2-cellphone-btn');
      if (cellphoneBtn) {
        cellphoneBtn.classList.remove('enabled');
        cellphoneBtn.classList.add('disabled');
        cellphoneBtn.disabled = true;
      }
    }
  }

  /**
   * Highlight 2, 5, 8, 0 keys and enable Cellphone CTA button
   */
  transitionToResolvedStateP1() {
    this.isResolvedP1 = true;

    const keysToHighlight = ['2', '5', '8', '0'];
    keysToHighlight.forEach((key) => {
      const btn = this.container.querySelector(`.keypad-btn[data-key="${key}"]`);
      if (btn) {
        btn.classList.remove('selected-key');
        btn.classList.add('active');
        gsap.fromTo(btn, { scale: 1.18 }, { scale: 1, duration: 0.4, ease: 'back.out(1.8)' });
      }
    });

    const line2Path = this.container.querySelector('#n2-line-2-path');
    const dot2a = this.container.querySelector('#n2-dot-2a');
    const dot2b = this.container.querySelector('#n2-dot-2b');

    if (line2Path) {
      line2Path.setAttribute('stroke', '#00f0ff');
      line2Path.style.filter = 'drop-shadow(0 0 8px #00f0ff)';
    }
    if (dot2a) dot2a.setAttribute('fill', '#00f0ff');
    if (dot2b) dot2b.setAttribute('fill', '#00f0ff');

    const cellphoneBtn = this.container.querySelector('#n2-cellphone-btn');
    if (cellphoneBtn) {
      cellphoneBtn.classList.remove('disabled');
      cellphoneBtn.classList.add('enabled');
      cellphoneBtn.disabled = false;
      cellphoneBtn.title = 'Continuar a reconocimiento de audio';

      gsap.fromTo(
        cellphoneBtn,
        { scale: 0.88 },
        { scale: 1.1, duration: 0.55, ease: 'back.out(2)', yoyo: true, repeat: 1 }
      );
    }
  }

  /**
   * Starts Pantalla 2 — Estado 1 (Carga 3.5s / 3500ms)
   * Automatically transitions to Estado 2 (Carga Completa) after 3500ms
   */
  startPantalla2Carga() {
    this.currentScreen = 2;

    const p1 = this.container.querySelector('#n2-screen-1');
    const p2Carga = this.container.querySelector('#n2-screen-2-carga');
    const p2Completa = this.container.querySelector('#n2-screen-2-completa');

    if (p1) p1.style.display = 'none';
    if (p2Completa) p2Completa.style.display = 'none';

    if (p2Carga) {
      p2Carga.style.display = 'block';
      gsap.fromTo(p2Carga, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
    }

    // Set 3.5s (3500ms) automatic loading timer
    if (this.loadingTimer) clearTimeout(this.loadingTimer);
    this.loadingTimer = setTimeout(() => {
      this.transitionToPantalla2Completa();
    }, 3500);
  }

  /**
   * Displays Pantalla 2 — Estado 2 (Carga Completa) with Eminem song result
   */
  transitionToPantalla2Completa() {
    this.currentScreen = 3;

    const p2Carga = this.container.querySelector('#n2-screen-2-carga');
    const p2Completa = this.container.querySelector('#n2-screen-2-completa');

    if (p2Carga) {
      gsap.to(p2Carga, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          p2Carga.style.display = 'none';
          if (p2Completa) {
            p2Completa.style.display = 'block';
            gsap.fromTo(p2Completa, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 });
          }
        },
      });
    }
  }

  /**
   * Resets screen state to Pantalla 1 Neutral State whenever Nucleus 2 is re-entered
   */
  resetState() {
    this.enteredSequence = [];
    this.isResolvedP1 = false;
    this.currentScreen = 1;

    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
      this.loadingTimer = null;
    }

    if (!this.container) return;

    const p1 = this.container.querySelector('#n2-screen-1');
    const p2Carga = this.container.querySelector('#n2-screen-2-carga');
    const p2Completa = this.container.querySelector('#n2-screen-2-completa');

    if (p1) {
      p1.style.display = 'block';
      gsap.set(p1, { opacity: 1 });
    }
    if (p2Carga) p2Carga.style.display = 'none';
    if (p2Completa) p2Completa.style.display = 'none';

    // Reset keypad buttons
    const keypadBtns = this.container.querySelectorAll('.keypad-btn');
    keypadBtns.forEach((btn) => {
      btn.classList.remove('active', 'selected-key');
      gsap.set(btn, { scale: 1, x: 0 });
    });

    // Reset Connector 2 to dark cyan
    const line2Path = this.container.querySelector('#n2-line-2-path');
    const dot2a = this.container.querySelector('#n2-dot-2a');
    const dot2b = this.container.querySelector('#n2-dot-2b');

    if (line2Path) {
      line2Path.setAttribute('stroke', 'rgba(0, 240, 255, 0.35)');
      line2Path.style.filter = 'none';
    }
    if (dot2a) dot2a.setAttribute('fill', 'rgba(0, 240, 255, 0.35)');
    if (dot2b) dot2b.setAttribute('fill', 'rgba(0, 240, 255, 0.35)');

    // Reset Cellphone CTA button to disabled
    const cellphoneBtn = this.container.querySelector('#n2-cellphone-btn');
    if (cellphoneBtn) {
      cellphoneBtn.classList.remove('enabled');
      cellphoneBtn.classList.add('disabled');
      cellphoneBtn.disabled = true;
      cellphoneBtn.title = "Ingresa la combinación '2580' para continuar";
      gsap.set(cellphoneBtn, { scale: 1 });
    }
  }
}
