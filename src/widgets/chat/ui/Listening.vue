<template>
  <v-row>
    <v-col
      cols="12"
      lg="6"
    >
      <ChatAnnounceUsernameFeature />
      <ChatExcludeReplyMessageFeature />
      <ChatExcludeBotCommandsFeature />
      <ChatOnlyFromModerationUsersFeature />
      <ChatOnlyFromPaidUsersFeature />
      <ChatListeningChannelFeature />
      <ChatListeningActionFeature />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {
  ChatAnnounceUsernameFeature,
  ChatExcludeReplyMessageFeature,
  ChatExcludeBotCommandsFeature,
  ChatOnlyFromPaidUsersFeature,
  ChatOnlyFromModerationUsersFeature,
  ChatListeningChannelFeature,
  ChatListeningActionFeature
  } from '@/features';
</script>

<style scoped lang="scss"></style>
