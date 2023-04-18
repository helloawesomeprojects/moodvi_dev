<script setup lang="ts">
import { vIntersectionObserver } from "@vueuse/components";
import { Comment } from "~~/types/entites";

defineProps<{
  comments: Comment[];
  status: string;
}>();
const emit = defineEmits(["refetch", "next-page"]);

const handleRefetch = () => {
  emit("refetch");
};

const onIntersectionObserver = ([
  { isIntersecting },
]: IntersectionObserverEntry[]) => {
  if (isIntersecting) {
    emit("next-page");
  }
  return "";
};
</script>

<template>
  <div
    class="bg-gray-50 border-t border-b border-black border-opacity-20 px-8 py-6 max-h-full overflow-y-scroll space-y-6"
  >
    <template v-if="status === 'loading'">
      <CommentListItem v-for="i in 10" :key="i" loading />
    </template>
    <template v-else-if="status === 'success'">
      <template v-if="comments?.length > 0">
        <CommentListItem
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </template>
      <n-p v-else class="text-center">No comments</n-p>
    </template>
    <div
      v-else
      class="text-sm text-text-secondary text-center flex flex-col items-center justify-center"
    >
      <n-p>Unable to fetch comments</n-p>

      <n-button size="small" @click="handleRefetch">
        <i-mdi-reload class="mr-1" />
        Reload
      </n-button>
    </div>

    <div
      v-if="status !== 'loading' && status !== 'error'"
      v-intersection-observer="onIntersectionObserver"
      role="presentation"
      aria-hidden="true"
    ></div>
  </div>
</template>
