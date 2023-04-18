<script setup lang="ts">
import { computed, resolveComponent } from "vue";
import BaseSpinner from "./BaseSpinner.vue";

const props = defineProps({
  color: {
    type: String,
    default: "primary",
    validator(value: string) {
      return ["primary", "gray"].includes(value);
    },
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "medium",
    validator(value: string) {
      return ["small", "medium", "large"].includes(value);
    },
  },
  circle: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false,
  },
  text: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
    validator(value: string) {
      return ["button", "submit", "reset"].includes(value);
    },
  },
});

const is = computed(() => {
  if (props.to) {
    return resolveComponent("NuxtLink");
  }
  if (props.href) {
    return "a";
  }

  return props.tag || "button";
});
</script>

<template>
  <component
    :is="is"
    :to="to"
    :href="href"
    class="flex items-center justify-center font-semibold transition-all duration-200 disabled:text-text-quaternary disabled:bg-[rgba(235,235,235,1)] disabled:cursor-not-allowed"
    :class="{
      'w-full': fullWidth && !circle,
      'bg-primary text-white hover:bg-primary-dark':
        color === 'primary' && !outlined && !text,
      'bg-bg-input hover:bg-opacity-[.08] active:bg-opacity-[.14]':
        color === 'gray' && !outlined && !text,
      'bg-white text-primary border-primary hover:bg-primary hover:bg-opacity-[.06] active:bg-primary active:bg-opacity-[.16]':
        color === 'primary' && outlined,
      'hover:bg-bg-view': color === 'gray' && outlined,
      'border border-solid': outlined,
      'h-7': size === 'small',
      'h-9': size === 'medium',
      'h-12': size === 'large',
      rounded: !circle,
      'rounded-full': circle,
      'px-4 min-w-[100px]': !circle && !square,
      'w-12': size === 'large' && (circle || square),
      'w-9': size === 'medium' && (circle || square),
      'w-7': size === 'small' && (circle || square),
    }"
    :type="type"
  >
    <BaseSpinner v-if="loading" />
    <slot v-else />
  </component>
</template>
