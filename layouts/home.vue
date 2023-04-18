<script setup lang="ts"></script>

<template>
  <div>
    <DiscoverWindow />
    <div class="hidden sm:block">
      <TheHeader />
      <div class="container flex space-x-4">
        <TheSider />
        <main class="w-10/12 lg:w-8/12 xl:w-9/12 py-6">
          <slot />
        </main>
      </div>
    </div>
    <!-- Mobile layout -->
    <div class="sm:hidden">
      <TheHeaderMobile />
      <slot />
      <TheMobileNav class="sticky bottom-0" />
    </div>
  </div>
</template>
