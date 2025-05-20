<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <v-text-field
        v-model="channel"
        :label="$t('features.listening.label')"
        @input="setChannel"
        required
      >
        <template v-slot:prepend>
          <v-chip
            class="ma-2"
            label
          >
            {{ chat_model.twitch_uri }}
          </v-chip>
        </template>

        <!-- <template v-slot:append>
          <template v-if="channel_connect">
            <v-btn color="purple-darken-2" @click="stopListening">
              {{ $t('features.listening.btn_stop') }}
            </v-btn>
          </template>
          <template v-else>
            <v-btn color="purple-darken-2" @click="startListening">
              {{ $t('features.listening.btn_start') }}
            </v-btn>
          </template>
        </template> -->
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Ref, ref, onBeforeMount } from "vue";
// import { storeToRefs } from 'pinia'
import { useChatModel } from '@/entities';

const chat_model = useChatModel()
// const { connected } = storeToRefs(chat_model)

const channel: Ref<string> = ref("")
// const channel_connect: Ref<boolean> = ref(false);

function setChannel() {
  chat_model.setChannel(channel.value);
}

onBeforeMount(() => {
  const query_params = new URLSearchParams(window.location.search);
  const channelname = query_params.get('channelname');

  if (channelname?.length) {
    channel.value = channelname;

    setChannel();
  }
})

// async function startListening() {
//   if (!channel.value.length) {
//     return;
//   }

//   chat_model.clearState();

//   chat_model.startListening(channel.value)
// }

// async function stopListening() {
//   chat_model.stopListening()
// }

// watch(
//   () => connected.value,
//   (curr_connected, _prev_connected) => {
//     channel_connect.value = curr_connected;
//   },
//   {
//     immediate: true,
//   }
// )
</script>

<style scoped lang="scss"></style>
