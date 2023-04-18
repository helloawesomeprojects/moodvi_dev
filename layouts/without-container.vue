<script setup lang="ts">
useHead({
  title: "Upload",
});
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader class="hidden md:flex" />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
    <TheMobileNav class="w-full sticky bottom-0 md:hidden" />
  </div>
</template>
