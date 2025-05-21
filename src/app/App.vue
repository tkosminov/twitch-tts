<template>
  <v-layout>
    <NavbarWidget />

    <v-container class="mt-6">
      <VoiceWidget />
      <ChatWidget />
      <CopyLinkFeature />
    </v-container>
  </v-layout>
</template>

<script setup lang="ts">
import { watch, Ref, ref, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { NavbarWidget, ChatWidget, VoiceWidget } from '@/widgets'
import { CopyLinkFeature } from '@/features'
import { useChatModel, useVoiceModel } from '@/entities';

const chat_model = useChatModel();
const voice_model = useVoiceModel();
const { connected } = storeToRefs(chat_model)
const timeout: Ref<NodeJS.Timeout | null> = ref(null)

onBeforeMount(() => {
  cancelSpeak();
})

watch(
  () => connected.value,
  (curr_connected, _prev_connected) => {
    if (curr_connected) {
      speak()
    } else {
      cancelSpeak();
    }
  },
  {
    immediate: true,
  }
)

function cancelSpeak() {
  cancelTimeout()
  voice_model.cancelSpeak()
}

function cancelTimeout() {
  if (timeout.value) {
    clearTimeout(timeout.value)
    timeout.value = null;
  }
}

async function speak() {
  cancelTimeout()

  const msg = chat_model.current_message;

  if (msg) {
    await voice_model.speak(msg);
  }

  timeout.value = setTimeout(async () => {
    await speak()
  }, 100)
}
</script>

<style scoped lang="scss">
.mt-6 {
  margin-top: 4.5rem !important;
}
</style>
