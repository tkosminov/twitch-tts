import { Queue } from '@/shared';
import { defineStore } from 'pinia';
import { Client } from 'tmi.js';

export interface IChatMessage {
  message: string;
  username: string;
  reply_parent_msg_id?: string
  reply_parent_user_login?: string;

  is_subscriber: boolean;
  is_vip: boolean;
  is_premium: boolean;
  is_broadcaster: boolean;
  is_moderator: boolean;
  is_admin: boolean;
}

interface IState {
  twitch_uri: string;
  connected: boolean;
  channel: string | undefined;
  client: Client | undefined;
  messages: Queue<IChatMessage> | undefined;
}

export const useChatModel = defineStore('chatModel', {
  state: (): IState => ({
    twitch_uri: 'https://www.twitch.tv/',
    connected: false,
    channel: undefined,
    client: undefined,
    messages: undefined,
  }),
  actions: {
    changeChannel(channel: string) {
      this.channel = channel.length ? channel : undefined;
    },
    startListening() {
      if (!this.channel) {
        return
      }

      this.messages = new Queue<IChatMessage>;

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

        console.log(message)

        this.messages?.enqueue({
          message,
          username: tags['display-name'] || tags.username || '',
          reply_parent_msg_id: tags['reply-parent-msg-id'],
          reply_parent_user_login: tags['reply-parent-user-login'],

          is_subscriber: !!tags.subscriber,
          is_vip: !!badges?.vip,
          is_premium: !!badges?.premium,
          is_broadcaster: !!badges?.broadcaster,
          is_moderator: !!(badges?.moderator || badges?.global_mod),
          is_admin: !!badges?.admin,
        })
      });
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

