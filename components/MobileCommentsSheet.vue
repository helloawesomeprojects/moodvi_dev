<script setup lang="ts">
import { Sheet as BottomSheet } from "bottom-sheet-vue3";
import { Skeletor } from "vue-skeletor";
import { useCommentListQuery } from "~~/api/comments";
import { useVideoById } from "~~/api/videos";
import { useUiStore } from "~~/store/ui";
import { Comment } from "~~/types/entites";

const uiStore = useUiStore();
const route = useRoute();

const id = computed<number>(() => {
  return Number(route.query.comment as string);
});

const isVisible = computed({
  get() {
    return !!id.value;
  },
  set(value: boolean) {
    if (!value) {
      if (!id.value) {
        return;
      }
      navigateTo(
        { query: { ...route.query, comment: undefined } },
        { replace: true }
      );
    }
  },
});

const {
  data,
  status,
  refetch,
  fetchNextPage,
  isFetching: isCommentsLoading,
} = useCommentListQuery(id, isVisible);
const {
  data: video,
  isLoading: isVideoLoading,
  refetch: refetchVideo,
} = useVideoById(id, isVisible);

watch(isVisible, (value) => {
  if (value) {
    refetch();
    refetchVideo();
  }
  uiStore.bodyScrollDisabled = value;
});

const comments = computed<Comment[]>(
  () => data.value?.pages.flatMap((page) => page.results) || []
);

const commentsCount = computed(() => video.value?.video.commentsCount);
const title = computed(() =>
  commentsCount.value !== undefined
    ? `${commentsCount.value} comments`
    : undefined
);

const handleNextPage = () => {
  fetchNextPage();
};

const handlePostCommentSuccess = () => {
  refetch();
};
</script>

<template>
  <n-drawer v-model:show="isVisible" placement="bottom" height="60vh">
    <n-drawer-content
      :body-content-style="{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }"
    >
      <template #header>
        <Skeletor v-if="isVideoLoading" :width="180" />
        <template v-else>{{ title }}</template>
      </template>
      <CommentList
        class="flex-1"
        :comments="comments"
        :status="status"
        @next-page="handleNextPage"
      />
      <section class="p-1">
        <CommentPostForm :video-id="id" @success="handlePostCommentSuccess" />
      </section>
    </n-drawer-content>
  </n-drawer>
</template>
