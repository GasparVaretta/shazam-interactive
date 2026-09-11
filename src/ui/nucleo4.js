/**
 * Nucleo 4 UI Controller — Actualidad: Records de Shazams
 * Handles rendering, screen transitions (Pantallas 1 & 2), and navigation for Node 4.
 */

import gsap from 'gsap';

export class Nucleo4UI {
  constructor(onCompleteCallback, onBackCallback) {
    this.onCompleteCallback = onCompleteCallback;
    this.onBackCallback = onBackCallback;
    this.container = null;
    this.currentScreen = 1;
  }

  async render(targetEl) {
    this.container = targetEl;
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="nucleo-card nucleo4-card">
        <!-- Header -->
        <div class="nucleo-card-header">
          <span id="n4-header-title" class="nucleo-header-title purple-title">ACTUALIDAD: RECORDS DE SHAZAMS</span>
        </div>
        <div class="nucleo-header-line purple-line"></div>

        <!-- Body Content -->
        <div class="nucleo-card-body">

          <!-- PANTALLA 1: Records 2002 - 2012 -->
          <div id="n4-screen-1" class="n4-screen active">
            <p class="n4-description">
              Primeras canciones en romper records de más busquedas en shazam
            </p>

            <div class="n4-p1-layout">
              <img src="references/nucleo_4/pantalla41.png" alt="Primeras canciones en romper records de más búsquedas en Shazam (2002-2012)" class="n4-record-img" />
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n4-prev-1" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n4-next-1" class="nucleo-next-btn purple-btn">
                <span>SIGUIENTE</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <!-- PANTALLA 2: Records 2002 - 2015 -->
          <div id="n4-screen-2" class="n4-screen" style="display: none;">
            <p class="n4-description">
              Primeras canciones en romper records de más busquedas en shazam
            </p>

            <div class="n4-p2-layout">
              <img src="references/nucleo_4/pantalla42.png" alt="Primeras canciones en romper records de más búsquedas en Shazam (2002-2015)" class="n4-record-img" />
            </div>

            <!-- Footer Controls -->
            <div class="nucleo-card-footer">
              <button id="n4-prev-2" class="nucleo-next-btn purple-btn prev-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>ANTERIOR</span>
              </button>
              <button id="n4-conclusion-btn" class="nucleo-next-btn purple-btn conclusion-btn">
                <span>CONCLUSIÓN</span>
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
    // Screen 1: Anterior button returns to previous state
    const prev1 = this.container.querySelector('#n4-prev-1');
    if (prev1) {
      prev1.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onBackCallback) {
          this.onBackCallback();
        }
      });
    }

    // Screen 1: Next button advances to Screen 2
    const next1 = this.container.querySelector('#n4-next-1');
    if (next1) {
      next1.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToScreen(2);
      });
    }

    // Screen 2: Previous button returns to Screen 1
    const prev2 = this.container.querySelector('#n4-prev-2');
    if (prev2) {
      prev2.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToScreen(1);
      });
    }

    // Screen 2: Conclusion button → triggers conclusion screen
    const conclusionBtn = this.container.querySelector('#n4-conclusion-btn');
    if (conclusionBtn) {
      conclusionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onCompleteCallback) {
          this.onCompleteCallback();
        }
      });
    }
  }

  goToScreen(screenNum) {
    this.currentScreen = screenNum;

    for (let i = 1; i <= 2; i++) {
      const screenEl = this.container.querySelector(`#n4-screen-${i}`);
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
