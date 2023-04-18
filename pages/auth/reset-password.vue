<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { string } from "yup";

definePageMeta({
  layout: "auth",
});

interface ResetPasswordForm {
  email: string;
}

const isEmailSent = ref(false);

const { handleSubmit } = useForm<ResetPasswordForm>({
  validationSchema: {
    email: string().email().required(),
  },
});

const onSubmit = handleSubmit((values) => {});
</script>

<template>
  <div v-if="isEmailSent">
    <p class="mt-8">
      We have sent a new link to reset your password to the email provided.
      Please check your email
    </p>
    <p class="mt-4">
      Go back to <BaseLink :to="{ name: 'auth-login' }">login</BaseLink>
    </p>
  </div>
  <div v-else>
    <h1 class="mt-8 text-center text-3xl font-semibold">Reset password</h1>
    <p class="mt-4 text-sm text-center">
      If you forget or there is something wrong with your password, we will send
      you reset pasword link
    </p>
    <form class="mt-8" @submit.prevent="onSubmit">
      <n-input
        name="email"
        label="Your email"
        placeholder="Email"
        size="large"
      />
      <n-button type="primary" class="mt-4 w-full" size="large">
        Send
      </n-button>
    </form>
  </div>
</template>
