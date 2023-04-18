<script setup lang="ts"></script>

<template>
  <header class="w-full px-4 py-2 flex justify-end fixed top-0 left-0 z-10">
    <nuxt-link
      custom
      v-slot="{ href, navigate }"
      :to="{ query: { modal: 'discover' } }"
    >
      <n-button
        tag="a"
        :href="href"
        circle
        color="white"
        quaternary
        size="large"
        @click="navigate"
      >
        <Icon name="ion:compass" size="48" />
      </n-button>
    </nuxt-link>
  </header>
</template>
