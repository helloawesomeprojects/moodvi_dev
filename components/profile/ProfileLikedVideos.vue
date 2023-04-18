<script setup lang="ts">
import { useMyLikesQuery } from "~~/api/profile";
import { Skeletor } from "vue-skeletor";

const { data: myLikes, isFetching } = useMyLikesQuery();
</script>
<template>
  <div>
    <div v-if="isFetching" class="grid grid-cols-3 sm:grid-cols-5 gap-0.5">
      <div v-for="i in 9" :key="i" class="aspect-[9/16]">
        <Skeletor width="100%" height="100%" />
      </div>
    </div>
    <div
      v-else-if="myLikes.length > 0"
      class="grid grid-cols-3 sm:grid-cols-5 gap-0.5"
    >
      <div v-for="video in myLikes" :key="video.id" class="aspect-[9/16]">
        <VideoPlayer :src="video.file" class="w-full h-full max-h-full" />
      </div>
    </div>
    <n-p v-else class="p-4 text-sm text-center">You have no liked videos</n-p>
  </div>
</template>
