<script setup>
import { computed, resolveComponent } from "vue";

const props = defineProps({
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
});
const is = computed(() => {
  if (props.to) {
    return resolveComponent("NuxtLink");
  }

  return "a";
});
</script>

<template>
  <component
    :is="is"
    :to="to"
    :href="href"
    class="text-primary hover:underline"
  >
    <slot />
  </component>
</template>
