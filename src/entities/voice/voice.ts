import { defineStore } from 'pinia';

interface IState {
  synth: SpeechSynthesis;
  voices: SpeechSynthesisVoice[];
  voice: SpeechSynthesisVoice | undefined;
  volume: number;
  speed: number;
}

export const useVoiceModel = defineStore('voiceModel', {
  state: (): IState => ({
    synth: window.speechSynthesis,
    voices: [],
    voice: undefined,
    volume: 50,
    speed: 1.0,
  }),
  actions: {
    changeVolume(volume: number) {
      this.volume = volume;
    },
    changeSpeed(speed: number) {
      this.speed = speed;
    },
    changeVoice(voice: SpeechSynthesisVoice | undefined) {
      this.voice = voice;
    },
    speak(message: string) {
      if (!this.voice) {
        return;
      }

      const utterance = new SpeechSynthesisUtterance(message);
      utterance.volume = this.volume;
      utterance.rate = this.speed;
      utterance.voice = this.voice;

      this.synth.speak(utterance)
    },
    cancelSpeak() {
      this.synth.cancel();
    },
    loadVoices() {
      if (this.voices.length) {
        return;
      }

      this.voices = this.synth.getVoices();

      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
  }
})