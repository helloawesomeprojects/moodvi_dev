<script setup lang="ts">
import { Skeletor } from "vue-skeletor";
import { useMyVideosQuery } from "~~/api/profile";

const { data: myVideos, isFetching } = useMyVideosQuery();
</script>

<template>
  <div>
    <section v-if="isFetching" class="grid grid-cols-3 sm:grid-cols-5 gap-0.5">
      <div v-for="i in 9" class="aspect-[9/16]">
        <Skeletor width="100%" height="100%" />
      </div>
    </section>
    <section v-else-if="myVideos.length > 0" class="grid grid-cols-3 gap-0.5">
      <div v-for="video in myVideos" :key="video.id" class="aspect-[9/16]">
        <VideoPlayer
          :src="$getMediaUrl(video.url)"
          class="w-full h-full max-h-full"
        />
      </div>
    </section>
    <section v-else class="pt-12 text-center">
      <n-h4 class="text-text-primary text-base">Upload your first video</n-h4>
      <n-p class="mt-4 text-text-tertiary text-sm">
        Your videos will appear here
      </n-p>
    </section>
  </div>
</template>
