<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-autocomplete
        v-model="voice"
        :items="voice_model.voices"
        :label="$t('features.voice.label')"
        item-title="name"
        return-object
        hide-details
        @update:modelValue="changeVoice"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Ref, ref, onBeforeMount } from "vue";
import { useVoiceModel } from '@/entities';

const voice_model = useVoiceModel();
 
const voice: Ref<SpeechSynthesisVoice | undefined> = ref(undefined)

onBeforeMount(() => {
  voice_model.loadVoices();
})

function changeVoice() {
  voice_model.changeVoice(voice.value)
}
</script>

<style scoped lang="scss"></style>