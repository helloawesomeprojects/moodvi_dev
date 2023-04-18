<script setup lang="ts">
import { FormInst, useMessage } from "naive-ui";
import { useAuthStore } from "~~/store/auth";

const route = useRoute();
const authStore = useAuthStore();
const loading = ref(false);
const formEl = ref<FormInst | null>(null);

const model = ref({
  username: "",
  password: "",
});
const rules = {
  username: [{ required: true, message: "Username is required" }],
  password: [{ required: true, message: "Password is required" }],
};

const message = useMessage();
const { $apiClient } = useNuxtApp();
const onSubmit = async () => {
  try {
    await formEl.value?.validate();
    loading.value = true;
    const response: any = await $apiClient.post(
      "http://moodvi.javokhmi.beget.tech/auth/token/login/",
      model.value
    );
    authStore.token = response.auth_token;
    await authStore.fetchUser();
    navigateTo(route.query.to?.toString() || "/");
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "data" in err &&
      err.data &&
      typeof err.data === "object" &&
      "non_field_errors" in err.data &&
      Array.isArray(err?.data?.non_field_errors) &&
      err.data.non_field_errors.length > 0
    ) {
      message.error(err.data?.non_field_errors[0]);
    } else {
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        message.error(err.message);
      }
    }
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <n-form
    ref="formEl"
    class="mt-12 flex flex-col space-y-4"
    :model="model"
    :rules="rules"
    size="large"
    @submit.prevent="onSubmit"
  >
    <n-form-item path="username" label="Username">
      <n-input v-model:value="model.username" placeholder="Username" />
    </n-form-item>

    <n-form-item path="password" label="Password">
      <n-input
        v-model:value="model.password"
        placeholder="*********"
        type="password"
        show-password-on="click"
      />
    </n-form-item>

    <section class="flex justify-end">
      <BaseLink :to="{ name: 'auth-reset-password' }" class="text-sm">
        Forgot password?
      </BaseLink>
    </section>
    <n-form-item>
      <n-button
        block
        type="primary"
        attr-type="submit"
        :loading="loading"
        :disabled="loading"
      >
        Sign in
      </n-button>
    </n-form-item>
    <p class="text-sm">
      Don't have an account?
      <BaseLink :to="{ name: 'auth-register' }">Register</BaseLink>
    </p>
  </n-form>
</template>
