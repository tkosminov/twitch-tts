<template>
  <v-row>
    <v-col
      cols="12"
      lg="6"
    >
      <v-dialog
        max-width="400"
        v-model="dialog"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn color="blue-darken-2" @click="openDialog" v-bind="activatorProps" :disabled="disabled">
            {{ $t('features.copy_link.dialog') }}
          </v-btn>
        </template>
    
        <v-card>
          <v-card-item>
            {{ $t('features.copy_link.description') }}
          </v-card-item>

          <v-card-item>
            <v-text-field
              v-model="link"
              type="input"
              :disabled="true"
            ></v-text-field>
          </v-card-item>

          <template v-slot:actions>
            <v-spacer></v-spacer>
    
            <v-btn @click="closeDialog">
              {{ $t('features.copy_link.cancel') }}
            </v-btn>
    
            <v-btn @click="copyLink">
              {{ $t('features.copy_link.copy') }}
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useVoiceModel, useChatModel } from '@/entities';

const voice_model = useVoiceModel()
const chat_model = useChatModel()
const { channel } = storeToRefs(chat_model)

const dialog: Ref<boolean> = ref(false)
const link: Ref<string> = ref("")
const disabled: Ref<boolean> = ref(true);

const clipboard_unavailable = navigator.clipboard == null;

function openDialog() {
  dialog.value = true

  link.value = `${
    window.location.origin
  }?channelname=${
    chat_model.channel
  }&volume=${
    voice_model.volume
  }&speed=${
    voice_model.speed
  }&announce_username=${
    voice_model.announce_username
  }&exclude_reply_message=${
    voice_model.exclude_reply_message
  }&exclude_bot_commands=${
    voice_model.exclude_bot_commands
  }&only_from_paid_users=${
    voice_model.only_from_paid_users
  }&only_from_moderation_users=${
    voice_model.only_from_moderation_users
  }`
}

function closeDialog() {
  dialog.value = false
}

function copyLink() {
  navigator.clipboard.writeText(link.value)

  dialog.value = false
}

watch(
  () => channel.value,
  (curr_channel, _prev_channel) => {
    disabled.value = !curr_channel?.length && !clipboard_unavailable
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss"></style>
