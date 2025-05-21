<template>
  <v-layout>
    <NavbarWidget />

    <v-container class="mt-6">
      <VoiceWidget />

      <ChatListeningWidget />

      <CopyLinkFeature />
    </v-container>
  </v-layout>
</template>

<script setup lang="ts">
import { NavbarWidget, ChatListeningWidget, VoiceWidget } from '@/widgets'
import { CopyLinkFeature } from '@/features'
</script>

<style scoped lang="scss">
.mt-6 {
  margin-top: 4.5rem !important;
}
</style>
