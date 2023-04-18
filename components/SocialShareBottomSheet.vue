<script setup lang="ts">
import { Sheet as BottomSheet } from "bottom-sheet-vue3";
import { useShareStore } from "~~/store/share";

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const shareStore = useShareStore();
const isVisible = computed({
  get() {
    return !!shareStore.videoToShare;
  },
  set(value: boolean) {
    shareStore.videoToShare = null;
  },
});

const shareItems = computed(() => [
  {
    icon: "logos:telegram",
    label: "Share to Telegram",
    network: "telegram",
  },
  {
    icon: "logos:facebook",
    label: "Share to Facebook",
    network: "facebook",
  },
  {
    icon: "logos:twitter",
    label: "Share to Twitter",
    network: "twitter",
  },
]);
</script>

<template>
  <BottomSheet v-model:visible="isVisible">
    <div
      v-if="!!shareStore.videoToShare"
      class="flex flex-col space-y-4 flex-1 justify-center px-4"
    >
      <ShareNetwork
        v-for="item in shareItems"
        :ket="item.network"
        :network="item.network"
        :url="$getVideoUrl(shareStore.videoToShare)"
        :title="shareStore.videoToShare.title"
        :description="shareStore.videoToShare.description"
        class="w-full px-4 py-2 flex items-center"
      >
        <Icon :name="item.icon" size="24" class="mr-2" />
        <span> {{ item.label }} </span>
      </ShareNetwork>
    </div>
  </BottomSheet>
</template>
