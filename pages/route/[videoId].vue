<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";
import { useVideoById } from "~~/api/videos";

definePageMeta({
  layout: "without-container",
});

useHead({
  title: "Location",
});

const { coords } = useGeolocation();

const route = useRoute();
const id = computed(() => +route.params.videoId);
const { data: video, isLoading } = useVideoById(id);
</script>

<template>
  <div
    v-loading="isLoading"
    ref="rootEl"
    class="relative w-full h-[calc(100vh_-_52px)]"
  >
    <BaseMap :show-marker="false">
      <BaseMapRoute
        v-if="video && coords.latitude"
        :from="[coords.latitude, coords.longitude]"
        :to="[+video.lat, +video.lon]"
      />
    </BaseMap>
  </div>
</template>
