<script setup lang="ts"></script>
<template>
  <div
    class="min-h-screen max-h-screen flex flex-col items-center justify-center bg-white md:bg-neutral-50"
  >
    <main
      class="w-full md:w-1/2 lg:w-4/12 2xl:w-4/12 rounded-2xl bg-white px-6 py-8 shadow-sm"
    >
      <figure class="flex justify-center">
        <nuxt-link to="/">
          <img src="~/assets/images/logo.png" alt="Moodvi logo" width="95" />
        </nuxt-link>
      </figure>
      <slot />
    </main>
    <BaseLink class="mt-3" to="/">Homepage</BaseLink>
  </div>
</template>
