<script setup lang="ts">
import { useRecommendationList } from "~~/api/videos";
import { MqObject } from "~~/types/vue-mq";

const mq: MqObject = inject("mq") as MqObject;

const { data: videos, refetch, isLoading } = useRecommendationList();
</script>
<template>
  <div>
    <div v-if="mq.smPlus">
      <template v-if="isLoading">
        <VideoItem v-for="i in 5" :loading="true" />
      </template>
      <template v-else>
        <VideoItem
          v-for="video in videos"
          :key="video.id"
          :item="video"
          class="snap-center snap-always"
          @save="refetch"
        />
      </template>
    </div>
    <div v-else class="min-h-[calc(100vh_-_52px)]">
      <VideoItemMobile
        v-for="video in videos"
        :key="video.id"
        :item="video"
        class="snap-start snap-always"
        @save="refetch"
      />
    </div>
  </div>
</template>
