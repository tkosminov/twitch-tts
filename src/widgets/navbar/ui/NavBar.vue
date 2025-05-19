<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon>
        <v-icon icon="mdi-account-voice"></v-icon>
      </v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <v-sheet>
        Twitch TTS
      </v-sheet>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <I18nSwitchFeature />
    <ThemeSwitchFeature />

    <v-divider vertical class="ml-5 mr-1"></v-divider>

    <v-app-bar-nav-icon @click="openGithub">
      <v-icon icon="mdi-github"></v-icon>
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script setup lang="ts">
import { I18nSwitchFeature, ThemeSwitchFeature } from '@/features'

function openGithub() {
  window.open('https://github.com/tkosminov/twitch-tts', '_blank')
}
</script>

<style scoped lang="scss"></style>
