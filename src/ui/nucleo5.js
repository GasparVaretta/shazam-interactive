/**
 * Nucleo 5 UI Controller — Conclusión
 * Final screen of the experience. Shown as a modal after Nucleus 4.
 * Triggers full experience restart when the user clicks VOLVER AL INICIO.
 *
 * All styles are self-contained here — no global index.html changes needed.
 */

import gsap from 'gsap';

export class Nucleo5UI {
  /**
   * @param {Function} onRestartCallback  Called when the user clicks VOLVER AL INICIO.
   */
  constructor(onRestartCallback) {
    this.onRestartCallback = onRestartCallback;
    this.overlayEl = null;
  }

  /**
   * Creates and mounts the conclusion overlay into document.body.
   * Can be called multiple times — cleans up any previous instance first.
   */
  show() {
    this.destroy();

    // ── Overlay backdrop (semi-transparent so 3D stars remain visible) ────────
    this.overlayEl = document.createElement('div');
    this.overlayEl.id = 'conclusion-overlay';
    this.overlayEl.style.cssText = `
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9000;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
    `;

    // ── Card — wider & taller than before ─────────────────────────────────────
    const card = document.createElement('div');
    card.style.cssText = `
      position: relative;
      width: min(860px, 94vw);
      max-height: 92vh;
      overflow-y: auto;
      background: rgba(6, 3, 22, 0.88);
      border: 1.5px solid #5E00FF;
      box-shadow: 0 0 48px rgba(94,0,255,0.6), 0 0 12px rgba(94,0,255,0.2) inset;
      border-radius: 6px;
      font-family: 'Share Tech Mono', 'Courier New', monospace;
      color: #e0e0ff;
      display: flex;
      flex-direction: column;
      gap: 0;
    `;

    // ── Header ────────────────────────────────────────────────────────────────
    const header = document.createElement('div');
    header.style.cssText = `
      padding: 20px 28px 12px;
      border-bottom: 1px solid rgba(94,0,255,0.45);
    `;
    const title = document.createElement('span');
    title.textContent = 'CONCLUSIÓN';
    title.style.cssText = `
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #e0e0ff;
    `;
    header.appendChild(title);

    // ── Body ──────────────────────────────────────────────────────────────────
    const body = document.createElement('div');
    body.style.cssText = `
      padding: 22px 32px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 22px;
    `;

    // Description paragraph — larger font, compact line-height
    const desc = document.createElement('p');
    desc.style.cssText = `
      color: #8DAFFF;
      font-size: 1rem;
      line-height: 1.3;
      letter-spacing: 0.03em;
      text-align: center;
      margin: 0;
      width: 100%;
    `;
    desc.textContent =
      'Si bien, el mercado ofrece alternativas muy competitivas que no solo igualan sus funciones, sino que a veces añaden herramientas únicas, Shazam sigue siendo el referente mundial en reconocimiento de audio. Su integración nativa con Apple, su enorme base de usuarios y su icónica interfaz lo posicionan como el servicio más reconocido del sector. Su verdadero diferencial es la sencillez: abrir la app y obtener una respuesta instantánea es una experiencia que ningún competidor ha logrado superar de forma generalizada. Shazam no solo identifica canciones: redefine cómo los usuarios interactúan con la música en su entorno cotidiano.';

    // Conclusion chart image — below the text, full width of card body
    const img = document.createElement('img');
    img.src = 'references/nucleo_5/conclusion.png';
    img.alt = 'Gráfico de conclusión';
    img.style.cssText = `
      width: 100%;
      max-width: 760px;
      border-radius: 4px;
      display: block;
      object-fit: contain;
    `;

    body.appendChild(desc);
    body.appendChild(img);

    // ── Footer ────────────────────────────────────────────────────────────────
    const footer = document.createElement('div');
    footer.style.cssText = `
      padding: 12px 28px 18px;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid rgba(94,0,255,0.3);
    `;

    // "VOLVER AL INICIO" button — same style as nucleo3/4 nav buttons
    const restartBtn = document.createElement('button');
    restartBtn.id = 'conclusion-restart-btn';
    restartBtn.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      border: 1.5px solid #5E00FF;
      color: #e0e0ff;
      font-family: 'Share Tech Mono', 'Courier New', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 9px 20px;
      border-radius: 3px;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s;
      box-shadow: 0 0 6px rgba(94,0,255,0.3);
    `;
    restartBtn.innerHTML = `
      <span>VOLVER AL INICIO</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    `;
    restartBtn.addEventListener('mouseenter', () => {
      restartBtn.style.background = 'rgba(94,0,255,0.2)';
      restartBtn.style.boxShadow = '0 0 16px rgba(94,0,255,0.55)';
    });
    restartBtn.addEventListener('mouseleave', () => {
      restartBtn.style.background = 'transparent';
      restartBtn.style.boxShadow = '0 0 6px rgba(94,0,255,0.3)';
    });
    restartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.destroy();
      if (this.onRestartCallback) {
        this.onRestartCallback();
      }
    });

    footer.appendChild(restartBtn);

    // ── Assemble ──────────────────────────────────────────────────────────────
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    this.overlayEl.appendChild(card);
    document.body.appendChild(this.overlayEl);

    // Cinematic entrance animation
    gsap.fromTo(
      card,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' }
    );
  }

  /**
   * Removes the conclusion overlay from the DOM.
   */
  destroy() {
    if (this.overlayEl && this.overlayEl.parentNode) {
      this.overlayEl.parentNode.removeChild(this.overlayEl);
      this.overlayEl = null;
    }
  }
}
