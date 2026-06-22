// Synthetic low-latency audio effects for the Robotics OS interface
class RoboticsAudioEngine {
  private ctx: AudioContext | null = null;
  private humOsc: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  public enabled: boolean = false;

  constructor() {
    // We defer initialization until the user triggers a click
  }

  private init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.enabled = true;
      }
    } catch (e) {
      console.warn('Web Audio API not supported in this browser environment', e);
    }
  }

  public tapClick() {
    this.init();
    if (!this.ctx || !this.enabled) return;
    this.resumeContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Short high pitched computer click
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  public nodeUnlock() {
    this.init();
    if (!this.ctx || !this.enabled) return;
    this.resumeContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    // Sweeping high pitched unlock upgrade beep
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.32);
  }

  public warningBeep() {
    this.init();
    if (!this.ctx || !this.enabled) return;
    this.resumeContext();

    const now = this.ctx.currentTime;
    
    // Play two rapid alert signals
    for (let i = 0; i < 2; i++) {
      const delay = i * 0.12;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now + delay);
      
      gain.gain.setValueAtTime(0.06, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);

      // Low pass filter to dull the harshness of the saw-tooth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now + delay);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.11);
    }
  }

  public systemBoot() {
    this.init();
    if (!this.ctx || !this.enabled) return;
    this.resumeContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.8);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.1);
  }

  public toggleBackgroundHum(active: boolean) {
    this.init();
    if (!this.ctx || !this.enabled) return;
    this.resumeContext();

    if (active) {
      if (this.humOsc) return; // Already running
      try {
        this.humOsc = this.ctx.createOscillator();
        this.humGain = this.ctx.createGain();

        // Very low sub hum to represent standard robot electronics activity
        this.humOsc.type = 'sine';
        this.humOsc.frequency.setValueAtTime(60, this.ctx.currentTime); // 60Hz hum

        this.humGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.humGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 1.5); // Fade-in

        this.humOsc.connect(this.humGain);
        this.humGain.connect(this.ctx.destination);

        this.humOsc.start();
      } catch (e) {
        console.error(e);
      }
    } else {
      if (this.humOsc && this.humGain) {
        try {
          const oscTemp = this.humOsc;
          const gainTemp = this.humGain;
          gainTemp.gain.setValueAtTime(gainTemp.gain.value, this.ctx.currentTime);
          gainTemp.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5); // Fade-out
          
          setTimeout(() => {
            try {
              oscTemp.stop();
              oscTemp.disconnect();
              gainTemp.disconnect();
            } catch (err) {}
          }, 600);
        } catch (e) {}
        this.humOsc = null;
        this.humGain = null;
      }
    }
  }

  private resumeContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
}

export const audioSystem = new RoboticsAudioEngine();
