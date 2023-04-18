<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
</script>

<template>
  <div>
    <Popover class="relative">
      <PopoverButton class="outline-none">
        <slot name="trigger" />
      </PopoverButton>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute bottom-full transform -translate-y-2 z-10 bg-white rounded shadow"
        >
          <slot />
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>
