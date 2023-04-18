<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~~/store/auth";
import { FormInst, useMessage, FormRules } from "naive-ui";

definePageMeta({
  layout: "auth",
});

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const loading = ref(false);
const errors = ref();
const formEl = ref<FormInst | null>();

const authStore = useAuthStore();

const model = ref({
  name: "",
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const rules: FormRules = {
  name: [
    {
      required: true,
      message: "Name is required",
      trigger: ["input", "blur"],
    },
  ],
  username: [{ required: true, message: "Username is required" }],
  email: [{ required: true, message: "Email address is required" }],
  password: [
    {
      required: true,
      message: "Password is required",
    },
  ],
};
const message = useMessage();

const { $apiClient } = useNuxtApp();
const onSubmit = async () => {
  try {
    await formEl.value.validate();
    loading.value = true;
    await $apiClient.post("/v1/auth/users/", model.value);
    message.success("You have successfully registered!");
    navigateTo("/auth/login");
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "response" in err &&
      typeof err.response === "object" &&
      err.response &&
      "data" in err.response &&
      err.response?.data &&
      typeof err.response?.data === "object"
    ) {
      errors.value = Object.fromEntries(
        Object.entries(err.response.data).map(([key, value]) => [key, value[0]])
      );
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1 class="mt-6 text-center text-4xl font-semibold">Register</h1>
    <n-form
      ref="formEl"
      class="mt-8 flex flex-col space-y-4"
      :model="model"
      :rules="rules"
      size="large"
      @submit.prevent="onSubmit"
    >
      <n-form-item
        path="name"
        label="Name"
        :feedback="errors?.name"
        :validation-status="!!errors?.name ? 'error' : undefined"
      >
        <n-input v-model:value="model.name" placeholder="Enter your name" />
      </n-form-item>
      <n-form-item
        path="username"
        label="Username"
        :feedback="errors?.username"
        :validation-status="!!errors?.username ? 'error' : undefined"
      >
        <n-input v-model:value="model.username" placeholder="Enter username" />
      </n-form-item>
      <n-form-item
        path="email"
        label="Email"
        :feedback="errors?.email"
        :validation-status="!!errors?.email ? 'error' : undefined"
      >
        <n-input
          v-model:value="model.email"
          placeholder="Enter your email address"
        />
      </n-form-item>
      <n-form-item
        path="password"
        label="Password"
        :feedback="errors?.password"
        :validation-status="!!errors?.password ? 'error' : undefined"
      >
        <n-input
          v-model:value="model.password"
          type="password"
          show-password-on="click"
          placeholder="*******"
        />
      </n-form-item>

      <n-form-item>
        <n-button
          block
          type="primary"
          attr-type="submit"
          :loading="loading"
          :disabled="loading"
        >
          Register
        </n-button>
      </n-form-item>

      <p class="text-sm">
        Have an account?
        <BaseLink :to="{ name: 'auth-login' }">Log in</BaseLink>
      </p>
    </n-form>
  </div>
</template>
