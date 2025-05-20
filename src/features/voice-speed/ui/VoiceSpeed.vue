<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-slider
        class="ml-0"
        v-model="speed"
        :thumb-size="14"
        :step="0.25"
        :min="0"
        :max="2"
        thumb-label="always"
        @end="changeSpeed"
        hide-details
      >
        <template v-slot:prepend>
          <v-chip
            class="ma-2"
            label
          >
            {{ $t('features.voice_speed.chip') }}
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
const speed: Ref<number> = ref(voice_model.speed)

function changeSpeed() {
  voice_model.changeSpeed(speed.value);
}

onBeforeMount(() => {
  const speed_value = getQueryParam('speed');

  if (speed_value?.length) {
    speed.value = +speed_value;

    changeSpeed();
  }
})
</script>

<style scoped lang="scss"></style>
