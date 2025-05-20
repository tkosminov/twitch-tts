<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-switch
        class="ml-0"
        v-model="exclude_bot_commands"
        :label="`${exclude_bot_commands}`"
        @change="changeExcludeBotCommands"
        hide-details
      >
        <template v-slot:prepend>
          <v-chip
            class="ma-2"
            label
          >
            {{ $t('features.voice_exclude_bot_commands.chip') }}
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
const exclude_bot_commands: Ref<boolean> = ref(voice_model.exclude_bot_commands)

function changeExcludeBotCommands() {
  voice_model.changeExcludeBotCommands(exclude_bot_commands.value);
}

onBeforeMount(() => {
  const exclude_bot_commands_value = getQueryParam('exclude_bot_commands');

  if (exclude_bot_commands_value?.length) {
    exclude_bot_commands.value = exclude_bot_commands_value === 'true';

    changeExcludeBotCommands();
  }
})
</script>

<style scoped lang="scss"></style>
