<template>
  <v-layout>
    <NavbarWidget />

    <v-container class="mt-6">
      <ListeningFeature />
    </v-container>
  </v-layout>
</template>

<script setup lang="ts">
import { NavbarWidget } from '@/widgets'
import { ListeningFeature } from '@/features'
</script>

<style scoped lang="scss">
.mt-6 {
  margin-top: 3.5rem !important;
}
</style>
