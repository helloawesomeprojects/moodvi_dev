<script setup lang="ts">
import { Video } from "~~/types/entites";

defineProps<{ item: Video | undefined }>();

const shareItems = [
  { label: "Share to Telegram", icon: "logos:telegram", network: "telegram" },
  { label: "Share to Facebook", icon: "logos:facebook", network: "facebook" },
  { label: "Share to Twitter", icon: "logos:twitter", network: "twitter" },
];
</script>
<template>
  <n-popover trigger="click">
    <template #trigger>
      <slot />
    </template>
    <ClientOnly>
      <div v-if="item" class="w-[280px] flex flex-col py-1 text-sm">
        <ShareNetwork
          v-for="shareItem in shareItems"
          :key="shareItem.network"
          :network="shareItem.network"
          :url="$getVideoUrl(item)"
          :title="item.title"
          :description="item.description"
          class="text-gray-900 px-4 py-2 hover:bg-black hover:bg-opacity-[.06] text-left"
        >
          <Icon :name="shareItem.icon" size="18" class="mr-1" />
          {{ shareItem.label }}
        </ShareNetwork>
      </div>
    </ClientOnly>
  </n-popover>
</template>
