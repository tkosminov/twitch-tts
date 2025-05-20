import { defineStore } from 'pinia';

interface IState {
  volume: number;
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
    volume: 50,
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
  }
})