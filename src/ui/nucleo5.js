/**
 * Nucleo 5 UI Controller — Conclusión (2-Screen Interactive HUD)
 * Renders local content for Conclusiones Screen 1 and Screen 2 based on mockup_conclusiones_1 & 2.
 * Top-left Shazam Navigator and Top-right Nuclei Map sit on the persistent Global HUD layer.
 */

import gsap from 'gsap';

export class Nucleo5UI {
  /**
   * @param {Function} onFinalizeCallback Called when the user clicks FINALIZAR on Screen 2.
   */
  constructor(onFinalizeCallback) {
    this.onFinalizeCallback = onFinalizeCallback;
    this.overlayEl = null;
    this.currentScreen = 1;
  }

  show() {
    this.destroy();

    // ── Semi-transparent Backdrop ──────────────────────────────────────────────
    this.overlayEl = document.createElement('div');
    this.overlayEl.id = 'conclusion-overlay';
    this.overlayEl.style.cssText = `
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9000;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
    `;

    // ── Main Card Container ──────────────────────────────────────────────────
    const card = document.createElement('div');
    card.id = 'conclusion-card';
    card.style.cssText = `
      position: relative;
      width: min(920px, 94vw);
      min-height: 540px;
      max-height: 94vh;
      background: rgba(6, 3, 22, 0.92);
      border: 1.5px solid #5E00FF;
      box-shadow: 0 0 45px rgba(94, 0, 255, 0.45), inset 0 0 20px rgba(94, 0, 255, 0.15);
      border-radius: 12px;
      font-family: 'Roboto Mono', monospace;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      padding: 28px 36px;
      box-sizing: border-box;
      overflow-y: auto;
    `;

    // ── Top Header (Centered Title "Conclusion") ─────────────────────────────
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 12px;
      width: 100%;
    `;

    const centerTitle = document.createElement('h2');
    centerTitle.textContent = 'Conclusion';
    centerTitle.style.cssText = `
      font-family: 'Roboto Mono', monospace;
      font-size: 2.2rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      letter-spacing: -0.01em;
      text-align: center;
    `;
    header.appendChild(centerTitle);

    // Purple Horizontal Line
    const line = document.createElement('div');
    line.style.cssText = `
      width: 100%;
      height: 1.5px;
      background: rgba(94, 0, 255, 0.5);
      box-shadow: 0 0 10px rgba(94, 0, 255, 0.6);
      margin-top: 14px;
      margin-bottom: 24px;
    `;

    // ── Body Container ────────────────────────────────────────────────────────
    const bodyContainer = document.createElement('div');
    bodyContainer.id = 'conclusion-body-container';
    bodyContainer.style.cssText = `
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

    // ── Assemble Card ────────────────────────────────────────────────────────
    card.appendChild(header);
    card.appendChild(line);
    card.appendChild(bodyContainer);
    this.overlayEl.appendChild(card);
    document.body.appendChild(this.overlayEl);

    // Render initial screen 1
    this.renderScreen(1);

    // Entrance animation
    gsap.fromTo(
      card,
      { opacity: 0, scale: 0.95, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }

  renderScreen(screenNum) {
    this.currentScreen = screenNum;
    const bodyContainer = document.getElementById('conclusion-body-container');
    if (!bodyContainer) return;

    bodyContainer.innerHTML = '';

    if (screenNum === 1) {
      this.renderScreen1(bodyContainer);
    } else {
      this.renderScreen2(bodyContainer);
    }

    gsap.fromTo(
      bodyContainer,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }

  /**
   * Pantalla 1 Layout: 3 Competitor Bars (Musixmatch 50M, Deezer 100M, SoundHound 300M) + SIGUIENTE
   */
  renderScreen1(container) {
    // Description text
    const p1Text = document.createElement('p');
    p1Text.style.cssText = `
      font-family: 'Roboto Mono', monospace;
      font-size: 1.15rem;
      line-height: 1.65;
      color: #8DAFFF;
      text-align: center;
      max-width: 780px;
      margin-bottom: 34px;
    `;
    p1Text.textContent =
      'Si bien el mercado ofrece alternativas muy competitivas que no solo igualan sus funciones, sino que además añaden herramientas únicas como la capacidad de reconocer tarareos o mostrar letras sincronizadas en tiempo real...';

    // Chart Section (3 Bars)
    const chartWrapper = document.createElement('div');
    chartWrapper.style.cssText = `
      width: 100%;
      max-width: 680px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 28px;
    `;

    // Bars Row
    const barsRow = document.createElement('div');
    barsRow.style.cssText = `
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 160px;
      padding-bottom: 0px;
    `;

    // 1. Musixmatch
    const bar1 = this.createBarItem('50 millones\nde descargas', 32, false);
    // 2. Deezer
    const bar2 = this.createBarItem('100 millones\nde descargas', 58, false);
    // 3. SoundHound
    const bar3 = this.createBarItem('300 millones\nde descargas', 125, false);

    barsRow.appendChild(bar1);
    barsRow.appendChild(bar2);
    barsRow.appendChild(bar3);

    // Baseline separator
    const baseLine = document.createElement('div');
    baseLine.style.cssText = `
      width: 100%;
      height: 2px;
      background: #5E00FF;
      box-shadow: 0 0 10px rgba(94, 0, 255, 0.8);
      margin-top: 4px;
      margin-bottom: 16px;
    `;

    // Logos Row
    const logosRow = document.createElement('div');
    logosRow.style.cssText = `
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    `;

    const logo1 = this.createBrandItem('musixmatch', 'Musixmatch');
    const logo2 = this.createBrandItem('deezer', 'Deezer');
    const logo3 = this.createBrandItem('soundhound', 'SoundHound');

    logosRow.appendChild(logo1);
    logosRow.appendChild(logo2);
    logosRow.appendChild(logo3);

    chartWrapper.appendChild(barsRow);
    chartWrapper.appendChild(baseLine);
    chartWrapper.appendChild(logosRow);

    // Footer Controls (SIGUIENTE)
    const footer = document.createElement('div');
    footer.style.cssText = `
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: auto;
      padding-top: 10px;
    `;

    const nextBtn = document.createElement('button');
    nextBtn.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(8, 14, 26, 0.92);
      border: 2px solid #5E00FF;
      border-radius: 40px;
      padding: 8px 24px;
      color: #ffffff;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 0 18px rgba(94, 0, 255, 0.4);
      transition: all 0.3s ease;
      outline: none;
    `;
    nextBtn.innerHTML = `
      <span>SIGUIENTE</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    `;

    nextBtn.addEventListener('mouseenter', () => {
      nextBtn.style.borderColor = '#ffffff';
      nextBtn.style.boxShadow = '0 0 28px rgba(94, 0, 255, 0.8)';
      nextBtn.style.transform = 'scale(1.04)';
    });
    nextBtn.addEventListener('mouseleave', () => {
      nextBtn.style.borderColor = '#5E00FF';
      nextBtn.style.boxShadow = '0 0 18px rgba(94, 0, 255, 0.4)';
      nextBtn.style.transform = 'scale(1)';
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.renderScreen(2);
    });

    footer.appendChild(nextBtn);

    container.appendChild(p1Text);
    container.appendChild(chartWrapper);
    container.appendChild(footer);
  }

  /**
   * Pantalla 2 Layout: 4 Competitor Bars (including Shazam 500M filled bar) + ANTERIOR & FINALIZAR
   */
  renderScreen2(container) {
    // Description text with purple highlights
    const p2Text = document.createElement('p');
    p2Text.style.cssText = `
      font-family: 'Roboto Mono', monospace;
      font-size: 1.15rem;
      line-height: 1.65;
      color: #8DAFFF;
      text-align: center;
      max-width: 820px;
      margin-bottom: 30px;
    `;
    p2Text.innerHTML =
      '<span style="color: #b545ff; font-weight: 700;">...Shazam</span> continúa siendo el rey indiscutible del reconocimiento musical en el mundo gracias a su integración con Apple, <span style="color: #b545ff; font-weight: 700;">su velocidad y su inmensa base de datos</span>';

    // Chart Section (4 Bars)
    const chartWrapper = document.createElement('div');
    chartWrapper.style.cssText = `
      width: 100%;
      max-width: 760px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 24px;
    `;

    // Bars Row
    const barsRow = document.createElement('div');
    barsRow.style.cssText = `
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 190px;
      padding-bottom: 0px;
    `;

    // 1. Musixmatch (50M)
    const bar1 = this.createBarItem('50 millones\nde descargas', 28, false);
    // 2. Deezer (100M)
    const bar2 = this.createBarItem('100 millones\nde descargas', 48, false);
    // 3. SoundHound (300M)
    const bar3 = this.createBarItem('300 millones\nde descargas', 110, false);
    // 4. Shazam (500M) - Filled purple glowing bar!
    const bar4 = this.createBarItem('500 millones\nde descargas', 165, true);

    barsRow.appendChild(bar1);
    barsRow.appendChild(bar2);
    barsRow.appendChild(bar3);
    barsRow.appendChild(bar4);

    // Baseline separator
    const baseLine = document.createElement('div');
    baseLine.style.cssText = `
      width: 100%;
      height: 2px;
      background: #5E00FF;
      box-shadow: 0 0 10px rgba(94, 0, 255, 0.8);
      margin-top: 4px;
      margin-bottom: 16px;
    `;

    // Logos Row
    const logosRow = document.createElement('div');
    logosRow.style.cssText = `
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    `;

    const logo1 = this.createBrandItem('musixmatch', 'Musixmatch');
    const logo2 = this.createBrandItem('deezer', 'Deezer');
    const logo3 = this.createBrandItem('soundhound', 'SoundHound');
    const logo4 = this.createBrandItem('shazam', 'Shazam');

    logosRow.appendChild(logo1);
    logosRow.appendChild(logo2);
    logosRow.appendChild(logo3);
    logosRow.appendChild(logo4);

    chartWrapper.appendChild(barsRow);
    chartWrapper.appendChild(baseLine);
    chartWrapper.appendChild(logosRow);

    // Footer Controls (ANTERIOR & FINALIZAR)
    const footer = document.createElement('div');
    footer.style.cssText = `
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: 10px;
    `;

    // ANTERIOR Button
    const prevBtn = document.createElement('button');
    prevBtn.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(8, 14, 26, 0.92);
      border: 2px solid #5E00FF;
      border-radius: 40px;
      padding: 8px 24px;
      color: #ffffff;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 0 18px rgba(94, 0, 255, 0.4);
      transition: all 0.3s ease;
      outline: none;
    `;
    prevBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span>ANTERIOR</span>
    `;

    prevBtn.addEventListener('mouseenter', () => {
      prevBtn.style.borderColor = '#ffffff';
      prevBtn.style.boxShadow = '0 0 28px rgba(94, 0, 255, 0.8)';
      prevBtn.style.transform = 'scale(1.04)';
    });
    prevBtn.addEventListener('mouseleave', () => {
      prevBtn.style.borderColor = '#5E00FF';
      prevBtn.style.boxShadow = '0 0 18px rgba(94, 0, 255, 0.4)';
      prevBtn.style.transform = 'scale(1)';
    });
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.renderScreen(1);
    });

    // FINALIZAR Button
    const finalizeBtn = document.createElement('button');
    finalizeBtn.id = 'conclusion-finalize-btn';
    finalizeBtn.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(8, 14, 26, 0.95);
      border: 2px solid #5E00FF;
      border-radius: 40px;
      padding: 8px 28px;
      color: #ffffff;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 0 22px rgba(94, 0, 255, 0.5);
      transition: all 0.3s ease;
      outline: none;
    `;
    finalizeBtn.innerHTML = `
      <span>FINALIZAR</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    `;

    finalizeBtn.addEventListener('mouseenter', () => {
      finalizeBtn.style.borderColor = '#ffffff';
      finalizeBtn.style.boxShadow = '0 0 32px rgba(94, 0, 255, 0.9)';
      finalizeBtn.style.transform = 'scale(1.05)';
    });
    finalizeBtn.addEventListener('mouseleave', () => {
      finalizeBtn.style.borderColor = '#5E00FF';
      finalizeBtn.style.boxShadow = '0 0 22px rgba(94, 0, 255, 0.5)';
      finalizeBtn.style.transform = 'scale(1)';
    });
    finalizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.destroy();
      if (this.onFinalizeCallback) {
        this.onFinalizeCallback();
      }
    });

    footer.appendChild(prevBtn);
    footer.appendChild(finalizeBtn);

    container.appendChild(p2Text);
    container.appendChild(chartWrapper);
    container.appendChild(footer);
  }

  /**
   * Helper creating a single vertical chart bar with text label above
   */
  createBarItem(labelLines, heightPx, isFilled) {
    const col = document.createElement('div');
    col.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 120px;
    `;

    const label = document.createElement('div');
    label.style.cssText = `
      font-family: 'Roboto Mono', monospace;
      font-size: 0.75rem;
      font-weight: 600;
      color: #8DAFFF;
      text-align: center;
      line-height: 1.25;
      margin-bottom: 10px;
      white-space: pre-line;
    `;
    label.textContent = labelLines;

    const barPill = document.createElement('div');
    barPill.style.cssText = `
      width: 68px;
      height: ${heightPx}px;
      border-radius: 12px;
      border: 2px solid #5E00FF;
      background: ${
        isFilled
          ? 'linear-gradient(180deg, #7D12FF 0%, #4400B3 100%)'
          : 'rgba(6, 3, 22, 0.7)'
      };
      box-shadow: ${
        isFilled
          ? '0 0 28px rgba(94, 0, 255, 0.8), inset 0 0 12px rgba(255, 255, 255, 0.3)'
          : '0 0 14px rgba(94, 0, 255, 0.35)'
      };
      transition: height 0.4s ease;
    `;

    col.appendChild(label);
    col.appendChild(barPill);
    return col;
  }

  /**
   * Helper creating brand logo icon and title label underneath baseline
   */
  createBrandItem(brandKey, labelText) {
    const col = document.createElement('div');
    col.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 120px;
    `;

    const iconContainer = document.createElement('div');
    iconContainer.style.cssText = `
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    if (brandKey === 'musixmatch') {
      iconContainer.innerHTML = `
        <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #ff3366, #ff5e36); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(255,51,102,0.6);">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 18V9l4 4 4-4v9"></path>
            <path d="M12 18V9l4 4 4-4v9"></path>
          </svg>
        </div>
      `;
    } else if (brandKey === 'deezer') {
      iconContainer.innerHTML = `
        <div style="width: 48px; height: 48px; border-radius: 50%; background: #000000; border: 1.5px solid #a855f7; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px rgba(168,85,247,0.7);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#a855f7">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      `;
    } else if (brandKey === 'soundhound') {
      iconContainer.innerHTML = `
        <div style="width: 48px; height: 48px; border-radius: 50%; background: #ff9900; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px rgba(255,153,0,0.7);">
          <span style="font-family: sans-serif; font-size: 1.6rem; font-weight: 900; color: #000000; line-height: 1;">S</span>
        </div>
      `;
    } else if (brandKey === 'shazam') {
      iconContainer.innerHTML = `
        <img src="references/menu_inicio/Shazam_Logo.png" alt="Shazam" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 18px rgba(0,240,255,0.9);" />
      `;
    }

    const label = document.createElement('span');
    label.style.cssText = `
      font-family: 'Roboto Mono', monospace;
      font-size: 0.8rem;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.04em;
    `;
    label.textContent = labelText;

    col.appendChild(iconContainer);
    col.appendChild(label);
    return col;
  }

  destroy() {
    if (this.overlayEl && this.overlayEl.parentNode) {
      this.overlayEl.parentNode.removeChild(this.overlayEl);
      this.overlayEl = null;
    }
  }
}
