<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useCommentCreateMutation } from "~~/api/comments";
import { useAuthStore } from "~~/store/auth";

const props = defineProps<{
  videoId: number;
}>();
const emit = defineEmits(["success"]);
const authStore = useAuthStore();
const message = useMessage();

const { mutate: createComment, isLoading } = useCommentCreateMutation();

const comment = ref("");

const handlePostComment = () => {
  if (!comment.value) {
    message.error("Please enter comment");
    return;
  }

  if (isLoading.value) {
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
        emit("success");
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
  <form class="px-1 py-1 flex" @submit.prevent="handlePostComment">
    <n-input-group v-if="authStore.isLoggedIn">
      <n-input v-model:value="comment" placeholder="Add comment..." />
      <n-button
        type="primary"
        attr-type="submit"
        :loading="isLoading"
        :disabled="isLoading"
      >
        Post
      </n-button>
    </n-input-group>
    <n-p v-else class="p-1">
      <NuxtLink to="/auth/login" class="underline">Login</NuxtLink>
      to post comments
    </n-p>
  </form>
</template>
