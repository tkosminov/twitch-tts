import { defineStore } from 'pinia';
import { Client } from 'tmi.js';

interface IState {
  twitch_uri: string;
  connected: boolean;
  channel: string | undefined;
  client: Client | undefined;
}

export const useChatModel = defineStore('chatModel', {
  state: (): IState => ({
    twitch_uri: 'https://www.twitch.tv/',
    connected: false,
    client: undefined,
    channel: undefined,
  }),
  actions: {
    clearState() {
      this.channel = undefined;
      this.connected = false;

      if (this.client) {
        this.client.disconnect();

        this.client = undefined;
      }
    },
    startListening(channel: string) {
      this.channel = channel;

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
        console.log('tags', tags, 'message', message)
      });
    },
    stopListening() {
      if (this.client) {
        this.client.disconnect();

        this.client = undefined;
      }

      this.connected = false;
    }
  }
});

