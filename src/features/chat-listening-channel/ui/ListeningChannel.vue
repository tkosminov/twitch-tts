<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-text-field
        class="ml-0"
        v-model="channel"
        :label="$t('features.chat_listening_channel.label')"
        @input="changeChannel"
        hide-details
      >
        <template v-slot:prepend>
          <v-chip
            class="ma-2"
            label
          >
            {{ chat_model.twitch_uri }}
          </v-chip>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Ref, ref, onBeforeMount } from "vue";
import { useChatModel } from '@/entities';
import { getQueryParam } from '@/shared';

const chat_model = useChatModel()
const channel: Ref<string> = ref("")

function changeChannel() {
  chat_model.changeChannel(channel.value);
}

onBeforeMount(() => {
  const channel_name = getQueryParam('channelname');

  if (channel_name?.length) {
    channel.value = channel_name;

    changeChannel();
  }
})
</script>

<style scoped lang="scss"></style>
