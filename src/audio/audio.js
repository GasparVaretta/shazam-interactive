export class AudioManager {
  constructor() {
    this.bgMusic = new Audio('references/sonido/musica_fondo.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.45;

    this.nodeSfx = new Audio('references/sonido/nucleo_sonido.mp3');
    this.nodeSfx.volume = 0.75;

    this.eminemAudio = new Audio('references/sonido/eminem.mp3');
    this.eminemAudio.volume = 0.85;

    this.prayerInCAudio = new Audio('references/sonido/Prayer in C.mp3');
    this.prayerInCAudio.volume = 0.85;

    this.isBgPlaying = false;
    this.savedBgTime = 0;
    this.isEminemPlaying = false;
    this.onEminemStateChange = null;

    this.isPrayerInCPlaying = false;
    this.onPrayerInCStateChange = null;

    // Listen for Eminem track natural completion
    this.eminemAudio.addEventListener('ended', () => {
      console.log('🎤 Eminem Track ended naturally');
      this.stopEminemAudio();
    });

    // Listen for Prayer in C track natural completion
    this.prayerInCAudio.addEventListener('ended', () => {
      console.log('🎵 Prayer in C Track ended naturally');
      this.stopPrayerInCAudio();
    });
  }

  /**
   * Starts background music loop (satisfies browser autoplay requirement)
   */
  startBackgroundMusic() {
    if (this.isBgPlaying || this.isEminemPlaying || this.isPrayerInCPlaying) return;

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
    if (!this.isBgPlaying && !this.isEminemPlaying && !this.isPrayerInCPlaying) {
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

  /**
   * Pauses background music saving its exact currentTime, and starts playing eminem.mp3
   */
  playEminemAudio() {
    if (this.isEminemPlaying) return;

    if (this.isPrayerInCPlaying) {
      this.stopPrayerInCAudio();
    }

    // 1. Pause background music & save exact position
    if (this.bgMusic && !this.bgMusic.paused) {
      this.savedBgTime = this.bgMusic.currentTime;
      this.bgMusic.pause();
      this.isBgPlaying = false;
      console.log(`🎵 Background Music Paused at exact currentTime: ${this.savedBgTime.toFixed(2)}s`);
    } else if (this.bgMusic && this.bgMusic.currentTime > 0) {
      this.savedBgTime = this.bgMusic.currentTime;
    }

    // 2. Play Eminem track
    this.isEminemPlaying = true;
    this.eminemAudio.currentTime = 0;
    
    const attemptPlay = (audioSrc) => {
      if (audioSrc) this.eminemAudio.src = audioSrc;
      return this.eminemAudio.play();
    };

    attemptPlay().then(() => {
      console.log('🎤 Eminem Track Playing successfully');
      if (this.onEminemStateChange) this.onEminemStateChange(true);
    }).catch((err) => {
      console.warn('⚠️ Eminem audio initial play failed, trying alternative paths:', err);
      attemptPlay('./REFERENCES/sonido/eminem.mp3').then(() => {
        console.log('🎤 Eminem Track Playing via ./REFERENCES/sonido/eminem.mp3');
        if (this.onEminemStateChange) this.onEminemStateChange(true);
      }).catch((err2) => {
        console.warn('⚠️ Eminem audio fallback 1 failed:', err2);
        attemptPlay('./references/sonido/eminem.mp3').then(() => {
          console.log('🎤 Eminem Track Playing via ./references/sonido/eminem.mp3');
          if (this.onEminemStateChange) this.onEminemStateChange(true);
        }).catch((err3) => {
          console.error('❌ All Eminem audio playback attempts failed:', err3);
          this.isEminemPlaying = false;
          if (this.onEminemStateChange) this.onEminemStateChange(false);
        });
      });
    });
  }

  /**
   * Pauses eminem.mp3 and resumes background music from saved position
   */
  pauseEminemAudio() {
    if (!this.isEminemPlaying) return;

    this.eminemAudio.pause();
    this.isEminemPlaying = false;
    if (this.onEminemStateChange) this.onEminemStateChange(false);

    // Resume background music from saved currentTime
    if (this.bgMusic) {
      this.bgMusic.currentTime = this.savedBgTime;
      this.bgMusic.play().then(() => {
        this.isBgPlaying = true;
        console.log(`🎵 Background Music Resumed from exact currentTime: ${this.savedBgTime.toFixed(2)}s`);
      }).catch((err) => {
        console.warn('⚠️ Background music resume error:', err);
      });
    }
  }

  /**
   * Toggles Eminem audio play/pause state
   */
  toggleEminemAudio() {
    if (this.isEminemPlaying) {
      this.pauseEminemAudio();
    } else {
      this.playEminemAudio();
    }
  }

  /**
   * Stops eminem.mp3 immediately (resets position to 0) and resumes background music
   */
  stopEminemAudio() {
    if (this.eminemAudio) {
      this.eminemAudio.pause();
      this.eminemAudio.currentTime = 0;
    }
    this.isEminemPlaying = false;
    if (this.onEminemStateChange) this.onEminemStateChange(false);

    if (this.bgMusic && !this.isBgPlaying && this.savedBgTime >= 0) {
      this.bgMusic.currentTime = this.savedBgTime;
      this.bgMusic.play().then(() => {
        this.isBgPlaying = true;
        console.log(`🎵 Background Music Resumed from exact currentTime: ${this.savedBgTime.toFixed(2)}s`);
      }).catch((err) => {
        console.warn('⚠️ Background music resume error:', err);
      });
    }
  }

  /**
   * Called when leaving Nucleus 2 or clicking Siguiente/Anterior
   */
  cleanupNucleo2Audio() {
    if (this.isEminemPlaying) {
      this.stopEminemAudio();
    }
  }

  /**
   * Pauses background music saving its exact currentTime, and starts playing Prayer in C.mp3
   */
  playPrayerInCAudio() {
    if (this.isPrayerInCPlaying) return;

    if (this.isEminemPlaying) {
      this.stopEminemAudio();
    }

    // 1. Pause background music & save exact position
    if (this.bgMusic && !this.bgMusic.paused) {
      this.savedBgTime = this.bgMusic.currentTime;
      this.bgMusic.pause();
      this.isBgPlaying = false;
      console.log(`🎵 Background Music Paused at exact currentTime: ${this.savedBgTime.toFixed(2)}s`);
    } else if (this.bgMusic && this.bgMusic.currentTime > 0) {
      this.savedBgTime = this.bgMusic.currentTime;
    }

    // 2. Play Prayer in C track
    this.isPrayerInCPlaying = true;
    this.prayerInCAudio.currentTime = 0;

    const attemptPlay = (audioSrc) => {
      if (audioSrc) this.prayerInCAudio.src = audioSrc;
      return this.prayerInCAudio.play();
    };

    attemptPlay().then(() => {
      console.log('🎵 Prayer in C Track Playing successfully');
      if (this.onPrayerInCStateChange) this.onPrayerInCStateChange(true);
    }).catch((err) => {
      console.warn('⚠️ Prayer in C initial play failed, trying alternative paths:', err);
      attemptPlay('./REFERENCES/sonido/Prayer in C.mp3').then(() => {
        console.log('🎵 Prayer in C Track Playing via ./REFERENCES/sonido/Prayer in C.mp3');
        if (this.onPrayerInCStateChange) this.onPrayerInCStateChange(true);
      }).catch((err2) => {
        console.warn('⚠️ Prayer in C fallback 1 failed:', err2);
        attemptPlay('./references/sonido/Prayer in C.mp3').then(() => {
          console.log('🎵 Prayer in C Track Playing via ./references/sonido/Prayer in C.mp3');
          if (this.onPrayerInCStateChange) this.onPrayerInCStateChange(true);
        }).catch((err3) => {
          console.error('❌ All Prayer in C audio playback attempts failed:', err3);
          this.isPrayerInCPlaying = false;
          if (this.onPrayerInCStateChange) this.onPrayerInCStateChange(false);
        });
      });
    });
  }

  /**
   * Pauses Prayer in C.mp3 and resumes background music from saved position
   */
  pausePrayerInCAudio() {
    if (!this.isPrayerInCPlaying) return;

    this.prayerInCAudio.pause();
    this.isPrayerInCPlaying = false;
    if (this.onPrayerInCStateChange) this.onPrayerInCStateChange(false);

    // Resume background music from saved currentTime
    if (this.bgMusic) {
      this.bgMusic.currentTime = this.savedBgTime;
      this.bgMusic.play().then(() => {
        this.isBgPlaying = true;
        console.log(`🎵 Background Music Resumed from exact currentTime: ${this.savedBgTime.toFixed(2)}s`);
      }).catch((err) => {
        console.warn('⚠️ Background music resume error:', err);
      });
    }
  }

  /**
   * Toggles Prayer in C audio play/pause state
   */
  togglePrayerInCAudio() {
    if (this.isPrayerInCPlaying) {
      this.pausePrayerInCAudio();
    } else {
      this.playPrayerInCAudio();
    }
  }

  /**
   * Stops Prayer in C.mp3 immediately (resets position to 0) and resumes background music
   */
  stopPrayerInCAudio() {
    if (this.prayerInCAudio) {
      this.prayerInCAudio.pause();
      this.prayerInCAudio.currentTime = 0;
    }
    this.isPrayerInCPlaying = false;
    if (this.onPrayerInCStateChange) this.onPrayerInCStateChange(false);

    if (this.bgMusic && !this.isBgPlaying && this.savedBgTime >= 0) {
      this.bgMusic.currentTime = this.savedBgTime;
      this.bgMusic.play().then(() => {
        this.isBgPlaying = true;
        console.log(`🎵 Background Music Resumed from exact currentTime: ${this.savedBgTime.toFixed(2)}s`);
      }).catch((err) => {
        console.warn('⚠️ Background music resume error:', err);
      });
    }
  }

  /**
   * Called when leaving Nucleus 3 or clicking Siguiente/Anterior
   */
  cleanupNucleo3Audio() {
    if (this.isPrayerInCPlaying) {
      this.stopPrayerInCAudio();
    }
  }
}
