<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-switch
        class="ml-0"
        v-model="announce_username"
        :label="`${announce_username}`"
        @change="changeAnnounceUsername"
        hide-details
      >
        <template v-slot:prepend>
          <v-chip
            class="ma-2"
            label
          >
            {{ $t('features.voice_announce_username.chip') }}
          </v-chip>
        </template>
      </v-switch>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Ref, ref, onBeforeMount } from "vue";
import { useVoiceModel } from '@/entities';
import { getQueryParam } from '@/shared';

const voice_model = useVoiceModel()
const announce_username: Ref<boolean> = ref(voice_model.announce_username)

function changeAnnounceUsername() {
  voice_model.changeAnnounceUsername(announce_username.value);
}

onBeforeMount(() => {
  const announce_username_value = getQueryParam('announce_username');

  if (announce_username_value?.length) {
    announce_username.value = announce_username_value === 'true';

    changeAnnounceUsername();
  }
})
</script>

<style scoped lang="scss"></style>
