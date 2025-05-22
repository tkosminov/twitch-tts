import { Queue, removeEmotes } from '@/shared';
import { defineStore } from 'pinia';
import { Client } from 'tmi.js';

interface IState {
  twitch_uri: string;
  connected: boolean;
  channel: string | undefined;
  client: Client | undefined;
  messages: Queue<string> | undefined;

  announce_username: boolean;
  skip_emotes_in_message: boolean;
  exclude_reply_message: boolean;
  exclude_bot_commands: boolean;
  only_from_paid_users: boolean;
  only_from_moderation_users: boolean;
  only_with_tts_command: boolean;
  tts_command: string;
}

export const useChatModel = defineStore('chatModel', {
  state: (): IState => ({
    twitch_uri: 'https://www.twitch.tv/',
    connected: false,
    channel: undefined,
    client: undefined,
    messages: undefined,

    announce_username: false,
    skip_emotes_in_message: true,
    exclude_reply_message: true,
    exclude_bot_commands: true,
    only_from_paid_users: false,
    only_from_moderation_users: false,
    only_with_tts_command: false,
    tts_command: '!tts'
  }),
  getters: {
    current_message(state) {
      return state.messages?.dequeue()
    }
  },
  actions: {
    changeChannel(channel: string) {
      this.channel = channel.length ? channel : undefined;
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
    startListening() {
      if (!this.channel) {
        return
      }

      this.messages = new Queue<string>;

      this.client = new Client({
        connection: {
          secure: true,
          reconnect: true,
        },
        channels: [this.channel],
      });

      this.client.connect().then(() => {
        this.connected = true;
      });

      this.client.on('message', (_wat, tags, message, _self) => {
        const badges = tags.badges;
        const username = tags['display-name'] || tags.username || '';

        const validations = []

        validations.push(username !== this.channel)

        if (this.exclude_reply_message) {
          validations.push(!tags['reply-parent-msg-id'])
        }

        if (this.exclude_bot_commands) {
          validations.push(!message.startsWith('!') && !message.startsWith(this.tts_command))
        }

        if (this.only_from_paid_users) {
          validations.push(!!tags.subscriber || !!badges?.vip || !!badges?.premium)
        }

        if (this.only_from_moderation_users) {
          validations.push(!!badges?.broadcaster || !!badges?.moderator || !!badges?.global_mod || !!badges?.admin)
        }

        if (this.only_with_tts_command) {
          validations.push(message.startsWith(this.tts_command))
        }

        if (validations.every((valid) => valid)) {
          let msg = message;

          if (this.skip_emotes_in_message) {
            if (tags.emotes) {
              const emotes_range = Object.values(tags.emotes).flat();

              msg = removeEmotes(msg, emotes_range)
            }
          }

          msg = msg.trim();

          if (msg.length) {
            if (this.announce_username) {
              msg = `${username} ${msg}`
            }
          
            this.messages?.enqueue(msg)
          }
        }
      })
    },
    stopListening() {
      if (this.client) {
        this.client.removeAllListeners()
        this.client.disconnect();

        this.client = undefined;
      }

      this.connected = false;
      this.messages = undefined;
    }
  }
});

