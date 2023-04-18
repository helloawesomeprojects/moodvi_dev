<script setup lang="ts">
import { Skeletor } from "vue-skeletor";
import { Video } from "~~/types/entites";

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    video?: Video | undefined;
    orientation: "horizontal" | "vertical";
  }>(),
  {
    orientation: "vertical",
    loading: false,
  }
);

const isVertical = computed(() => props.orientation === "vertical");

const video = toRef(props, "video");

const { like: handleLike, isLiked, likesCount } = useVideoLike(video);
const { save: handleSave, isSaved, savesCount } = useVideoSave(video);
</script>
<template>
  <div
    class="flex"
    :class="{
      'flex-col space-y-2': orientation === 'vertical',
      'space-x-4': orientation === 'horizontal',
    }"
  >
    <Skeletor v-if="loading" circle :size="48" />
    <div
      v-else
      class="flex items-center text-[#161823] text-center"
      :class="[isVertical ? 'flex-col space-y-1.5' : 'space-x-1.5']"
      @click="handleLike"
    >
      <n-button circle secondary size="large" class="w-12 h-12">
        <Icon
          name="mdi:heart"
          size="28"
          :class="[isLiked ? 'text-red-500' : 'text-gray']"
        />
      </n-button>
      <strong class="text-xs text-opacity-[.75]">
        {{ likesCount }}
      </strong>
    </div>
    <Skeletor v-if="loading" circle :size="48" />
    <div
      v-else
      class="flex items-center text-[#161823] text-center"
      :class="[isVertical ? 'flex-col space-y-1.5' : 'space-x-1.5']"
      @click="handleSave"
    >
      <n-button circle secondary size="large" class="w-12 h-12">
        <Icon
          name="mdi:bookmark"
          size="28"
          :class="[isSaved ? 'text-primary' : 'text-gray']"
        />
      </n-button>
      <strong class="text-xs text-opacity-[.75]">
        {{ savesCount }}
      </strong>
    </div>
    <Skeletor v-if="loading" circle :size="48" />
    <div
      v-else
      class="flex items-center text-[#161823] text-center"
      :class="[isVertical ? 'flex-col space-y-1.5' : 'space-x-1.5']"
    >
      <n-button circle secondary size="large" class="w-12 h-12">
        <Icon name="ion:chatbubble-ellipses" size="28" />
      </n-button>
      <strong class="text-xs text-opacity-[.75]">
        {{ video?.commentsCount }}
      </strong>
    </div>
    <Skeletor v-if="loading" circle :size="48" />
    <n-button
      v-else
      circle
      secondary
      size="large"
      :to="{ name: 'route-videoId', params: { videoId: video?.id } }"
      class="w-12 h-12"
    >
      <Icon name="tabler:current-location" size="28" />
    </n-button>
  </div>
</template>
