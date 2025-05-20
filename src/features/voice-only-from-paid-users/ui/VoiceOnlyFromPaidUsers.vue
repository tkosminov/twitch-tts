<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-switch
        class="ml-0"
        v-model="only_from_paid_users"
        :label="`${only_from_paid_users}`"
        @change="changeOnlyFromPaidUsers"
        hide-details
      >
        <template v-slot:prepend>
          <v-chip
            class="ma-2"
            label
          >
            {{ $t('features.voice_only_from_paid_users.chip') }}
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
const only_from_paid_users: Ref<boolean> = ref(voice_model.only_from_paid_users)

function changeOnlyFromPaidUsers() {
  voice_model.changeOnlyFromPaidUsers(only_from_paid_users.value);
}

onBeforeMount(() => {
  const only_from_paid_users_value = getQueryParam('only_from_paid_users');

  if (only_from_paid_users_value?.length) {
    only_from_paid_users.value = only_from_paid_users_value === 'true';

    changeOnlyFromPaidUsers();
  }
})
</script>

<style scoped lang="scss"></style>
