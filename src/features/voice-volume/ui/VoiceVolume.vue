<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-slider
        class="ml-0"
        v-model="volume"
        :thumb-size="14"
        :step="1"
        thumb-label="always"
        @end="changeVolume"
        hide-details
      >
        <template v-slot:prepend>
          <v-chip
            class="ma-2"
            label
          >
            {{ $t('features.voice_volume.chip') }}
          </v-chip>
        </template>
      </v-slider>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Ref, ref, onBeforeMount } from "vue";
import { useVoiceModel } from '@/entities';
import { getQueryParam } from '@/shared';

const voice_model = useVoiceModel()
const volume: Ref<number> = ref(voice_model.volume)

function changeVolume() {
  voice_model.changeVolume(volume.value);
}

onBeforeMount(() => {
  const volume_value = getQueryParam('volume');

  if (volume_value?.length) {
    volume.value = +volume_value;

    changeVolume();
  }
})
</script>

<style scoped lang="scss"></style>
