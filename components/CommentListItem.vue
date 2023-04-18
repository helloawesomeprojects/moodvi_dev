<script setup lang="ts">
import { Skeletor } from "vue-skeletor";
import dayjs from "dayjs";
import type { Comment } from "~~/types/entites";

const props = defineProps<{ comment?: Comment; loading?: boolean }>();

const commentTime = computed(() =>
  dayjs.tz(props.comment?.createdAt).fromNow()
);

const showAvatar = ref(false);
</script>

<template>
  <div class="flex space-x-2">
    <figure v-if="showAvatar" class="m-0">
      <Skeletor v-if="loading" circle size="48" />
      <n-avatar
        v-else
        round
        object-fit="cover"
        src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea"
        class="w-12 h-12 rounded-full object-cover"
      />
    </figure>
    <main class="flex-1">
      <n-h5 class="text-base 2xl:text-lg font-medium mb-0">
        <Skeletor v-if="loading" class="max-w-[40%]" />
        <template v-else>
          {{ comment?.userDetail.name }}
        </template>
      </n-h5>
      <n-p class="mt-1 mb-1 text-black text-sm 2xl:text-base">
        <Skeletor v-if="loading" />
        <template v-else>{{ comment?.comment }}</template>
      </n-p>

      <div class="mt-2 flex items-center text-sm text-text-secondary">
        <Skeletor v-if="loading" class="max-w-[20%]" />
        <n-p v-else>{{ commentTime }}</n-p>
      </div>
    </main>
  </div>
</template>
