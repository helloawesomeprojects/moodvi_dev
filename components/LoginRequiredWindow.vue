<script setup lang="ts">
import { Sheet as BottomSheet } from "bottom-sheet-vue3";
import { MqObject } from "~~/types/vue-mq";
const mq: MqObject = inject("mq") as MqObject;
const route = useRoute();
const showModal = computed({
  get() {
    return route.query.modal === "login-required";
  },
  set(value: boolean) {
    if (!value && route.query.modal !== "login-required") {
      return;
    }
    navigateTo(
      {
        query: { ...route.query, modal: value ? "login-required" : undefined },
      },
      { replace: true }
    );
  },
});
</script>

<template>
  <ClientOnly>
    <div>
      <n-modal
        v-if="mq.smPlus"
        v-model:show="showModal"
        preset="card"
        :style="{ width: '640px' }"
        title="Login to like, save and comment videos"
      >
        <LoginForm />
      </n-modal>
      <BottomSheet v-else v-model:visible="showModal" class="px-4">
        <h3 class="text-lg text-text-primary text-center">
          Login to like, save and comment videos
        </h3>
        <BaseButton to="/auth/login" class="mt-8"> Login </BaseButton>
      </BottomSheet>
    </div>
  </ClientOnly>
</template>
