/**
 * Shazam 3D Web Infographic — Audio Manager
 * Manages continuous background music loop and interactive node sfx.
 */

export class AudioManager {
  constructor() {
    this.bgMusic = new Audio('references/sonido/musica_fondo.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.45;

    this.nodeSfx = new Audio('references/sonido/nucleo_sonido.mp3');
    this.nodeSfx.volume = 0.75;

    this.isBgPlaying = false;
  }

  /**
   * Starts background music loop (satisfies browser autoplay requirement)
   */
  startBackgroundMusic() {
    if (this.isBgPlaying) return;

    this.bgMusic.play().then(() => {
      this.isBgPlaying = true;
      console.log('🎵 Background Music Loop Started');
    }).catch((err) => {
      console.warn('⚠️ Audio autoplay waiting for user interaction:', err);
    });
  }

  /**
   * Plays single-shot sound effect when clicking/navigating to a Nucleus (1, 2, 3, 4)
   */
  playNodeSfx() {
    // Ensure background music is playing if it wasn't already
    if (!this.isBgPlaying) {
      this.startBackgroundMusic();
    }

    try {
      this.nodeSfx.currentTime = 0;
      this.nodeSfx.play().catch((err) => {
        console.warn('⚠️ Node sound playback issue:', err);
      });
    } catch (e) {
      console.warn('⚠️ Node sound error:', e);
    }
  }
}
