<template>
  <v-row>
    <v-col
      cols="12"
      lg="6"
    >
      <ListeningChannelFeature />
    </v-col>
  </v-row>

  <v-row>
    <v-col
      cols="12"
      lg="6"
    >
      <ListeningActionFeature />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ListeningChannelFeature, ListeningActionFeature } from '@/features';
</script>

<style scoped lang="scss"></style>
