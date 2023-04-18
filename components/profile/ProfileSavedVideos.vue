<script setup lang="ts">
import { Skeletor } from "vue-skeletor";
import { useMySavesQuery } from "~~/api/profile";

const { data: mySaves, isFetching } = useMySavesQuery();
</script>

<template>
  <div v-if="isFetching" class="grid grid-cols-3 sm:grid-cols-5 gap-0.5">
    <div v-for="i in 9" :key="i" class="aspect-[9/16]">
      <Skeletor width="100%" height="100%" />
    </div>
  </div>
  <div
    v-else-if="mySaves.length > 0"
    class="grid grid-cols-3 sm:grid-cols-5 gap-0.5"
  >
    <div v-for="video in mySaves" :key="video.id" class="aspect-[9/16]">
      <VideoPlayer :src="video.file" class="w-full h-full max-h-full" />
    </div>
  </div>
  <n-p v-else class="p-4 text-sm text-center">You have no saved videos</n-p>
</template>
