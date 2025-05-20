<template>
  <v-row>
    <v-col
      cols="12"
    >
      <template v-if="channel_connect">
        <v-btn color="red-darken-2" @click="stopListening">
          {{ $t('features.listening_action.btn_stop') }}
        </v-btn>
      </template>
      <template v-else>
        <v-btn color="purple-darken-2" @click="startListening" :disabled="disabled">
          {{ $t('features.listening_action.btn_start') }}
        </v-btn>
      </template>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { storeToRefs } from 'pinia'
import { useChatModel } from '@/entities';

const chat_model = useChatModel()
const { connected, channel } = storeToRefs(chat_model)

const disabled: Ref<boolean> = ref(true);
const channel_connect: Ref<boolean> = ref(false);

function startListening() {
  chat_model.startListening()
}

function stopListening() {
  chat_model.stopListening()
}

watch(
  () => connected.value,
  (curr_connected, _prev_connected) => {
    channel_connect.value = curr_connected;
  },
  {
    immediate: true,
  }
)

watch(
  () => channel.value,
  (curr_channel, _prev_channel) => {
    disabled.value = !curr_channel?.length
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss"></style>
