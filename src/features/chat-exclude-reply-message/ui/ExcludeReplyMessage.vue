<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-switch
        class="ml-0"
        v-model="exclude_reply_message"
        :label="`${exclude_reply_message}`"
        @change="changeExcludeReplyMessage"
        hide-details
      >
        <template v-slot:prepend>
          <v-chip
            class="ma-2"
            label
          >
            {{ $t('features.chat_exclude_reply_message.chip') }}
          </v-chip>
        </template>
      </v-switch>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Ref, ref, onBeforeMount } from "vue";
import { useChatModel } from '@/entities';
import { getQueryParam } from '@/shared';

const chat_model = useChatModel()
const exclude_reply_message: Ref<boolean> = ref(chat_model.exclude_reply_message)

function changeExcludeReplyMessage() {
  chat_model.changeExcludeReplyMessage(exclude_reply_message.value);
}

onBeforeMount(() => {
  const exclude_reply_message_value = getQueryParam('exclude_reply_message');

  if (exclude_reply_message_value?.length) {
    exclude_reply_message.value = exclude_reply_message_value === 'true';

    changeExcludeReplyMessage();
  }
})
</script>

<style scoped lang="scss"></style>
