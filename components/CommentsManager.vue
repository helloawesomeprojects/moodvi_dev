<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useCommentListQuery, useCommentCreateMutation } from "~~/api/comments";
import { useAuthStore } from "~~/store/auth";
import { Comment } from "~~/types/entites";

const authStore = useAuthStore();

const props = defineProps<{
  videoId: number;
}>();
const emit = defineEmits(["comment"]);

const comment = ref("");

const { data, status, refetch, fetchNextPage } = useCommentListQuery(
  props.videoId
);

const handleRefetch = () => {
  refetch();
};

const comments = computed<Comment[]>(() => {
  if (!data.value) {
    return [];
  }
  return data.value?.pages.flatMap((page: any) => page.results);
});

const { mutate: createComment, isLoading } = useCommentCreateMutation();
const message = useMessage();

const handlePostComment = () => {
  if (!comment.value) {
    message.error("Please enter comment");
    return;
  }
  createComment(
    {
      video: props.videoId,
      comment: comment.value,
    },
    {
      onSuccess() {
        message.info("You have posted a new comment!");
        refetch();
        emit("comment");
        comment.value = "";
      },
      onError() {
        message.error(
          "There was an error while posting your comment, please try again."
        );
      },
    }
  );
};
</script>

<template>
  <div class="flex-1 flex flex-col overflow-auto">
    <CommentList
      :status="status"
      :comments="comments"
      class="flex-1 min-h-min"
      @refetch="handleRefetch"
      @next-page="fetchNextPage"
    />
    <form class="px-7 py-5 flex" @submit.prevent="handlePostComment">
      <template v-if="authStore.isLoggedIn">
        <n-input-group size="large">
          <n-input
            v-model:value="comment"
            clearable
            placeholder="Add comment..."
          />
          <n-button type="primary" attr-type="submit" :loading="isLoading">
            Post
          </n-button>
        </n-input-group>
      </template>
      <p v-else>
        <NuxtLink
          to="/auth/login"
          class="text-primary border-0 border-b border-solid border-primary"
        >
          Login
        </NuxtLink>
        to post comments
      </p>
    </form>
  </div>
</template>
