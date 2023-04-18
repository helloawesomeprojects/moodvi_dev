<script setup lang="ts">
import { FormInst, useMessage } from "naive-ui";
import { ref } from "vue";
import {
  authRepository,
  LoginResponse,
  LoginPayload,
} from "~~/repositories/auth";
import { useMutation } from "@tanstack/vue-query";
import { AxiosError } from "axios";

definePageMeta({
  layout: "auth",
});

const route = useRoute();
const formEl = ref<FormInst | null>(null);
const message = useMessage();

const model = ref({
  username: "",
  password: "",
});
const rules = {
  username: [{ required: true, message: "Username is required" }],
  password: [{ required: true, message: "Password is required" }],
};

const { mutate: login, isLoading: loading } = useMutation<
  LoginResponse,
  AxiosError<{ nonFieldErrors: string[] }>,
  LoginPayload
>(authRepository.login);

const onSubmit = async () => {
  try {
    await formEl.value?.validate();
    login(model.value, {
      async onSuccess() {
        await authRepository.fetchUser();
        navigateTo(route.query.to?.toString() || "/");
      },
      onError(error) {
        message.error(error.response?.data.nonFieldErrors[0].toString() || "");
      },
    });
  } catch (err) {}
};
</script>

<template>
  <div>
    <h1 class="mt-8 text-center text-4xl font-semibold">Sign in</h1>
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
  </div>
</template>
