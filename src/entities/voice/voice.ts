import { defineStore } from 'pinia';

import { IChatMessage } from '../chat/chat';

interface IState {
  synth: SpeechSynthesis;
  voices: SpeechSynthesisVoice[];
  voice: SpeechSynthesisVoice | undefined;
  volume: number;
  speed: number;
  announce_username: boolean;
  exclude_reply_message: boolean;
  exclude_bot_commands: boolean;
  only_from_paid_users: boolean;
  only_from_moderation_users: boolean;
  only_with_tts_command: boolean;
  tts_command: string;
}

export const useVoiceModel = defineStore('voiceModel', {
  state: (): IState => ({
    synth: window.speechSynthesis,
    voices: [],
    voice: undefined,
    volume: 50,
    speed: 1.0,
    announce_username: true,
    exclude_reply_message: false,
    exclude_bot_commands: false,
    only_from_paid_users: false,
    only_from_moderation_users: false,
    only_with_tts_command: false,
    tts_command: '!tts'
  }),
  actions: {
    changeVolume(volume: number) {
      this.volume = volume;
    },
    changeSpeed(speed: number) {
      this.speed = speed;
    },
    changeAnnounceUsername(announce_username: boolean) {
      this.announce_username = announce_username
    },
    changeExcludeReplyMessage(exclude_reply_message: boolean) {
      this.exclude_reply_message = exclude_reply_message
    },
    changeExcludeBotCommands(exclude_bot_commands: boolean) {
      this.exclude_bot_commands = exclude_bot_commands
    },
    changeOnlyFromPaidUsers(only_from_paid_users: boolean) {
      this.only_from_paid_users = only_from_paid_users
    },
    changeOnlyFromModerationUsers(only_from_moderation_users: boolean) {
      this.only_from_moderation_users = only_from_moderation_users
    },
    changeOnlyWithTtsCommand(only_with_tts_command: boolean) {
      this.only_with_tts_command = only_with_tts_command
    },
    changeTtsCommand(tts_command: string) {
      this.tts_command = tts_command
    },
    changeVoice(voice: SpeechSynthesisVoice | undefined) {
      this.voice = voice;
    },
    speak(message: IChatMessage) {
      if (!this.voice) {
        return;
      }

      const validations = []

      if (this.exclude_reply_message) {
        validations.push(!message.reply_parent_msg_id)
      }

      if (this.exclude_bot_commands) {
        validations.push(!message.message.startsWith('!'))
      }

      if (this.only_from_paid_users) {
        validations.push(message.is_subscriber || message.is_vip || message.is_premium)
      }

      if (this.only_from_moderation_users) {
        validations.push(message.is_broadcaster || message.is_moderator || message.is_admin)
      }

      if (this.only_with_tts_command) {
        validations.push(message.message.startsWith(this.tts_command))
      }

      if (!validations.every((valid) => valid)) {
        return
      }
      
      const text = this.announce_username ? `${message.username} ${message.message}` : message.message;

      const utterance = new SpeechSynthesisUtterance(text);
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