<template>
  <v-row>
    <v-col
      cols="12"
      lg="6"
    >
      <VoiceFeature />
      <VoiceVolumeFeature />
      <VoiceSpeedFeature />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {
  VoiceFeature,
  VoiceVolumeFeature,
  VoiceSpeedFeature,
} from '@/features';
</script>

<style scoped lang="scss"></style>
