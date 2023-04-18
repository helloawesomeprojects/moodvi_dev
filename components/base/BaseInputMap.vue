<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
});
const name = toRef(props, "name");

const { value, errorMessage } = useField<number[]>(name);
</script>

<template>
  <div class="flex flex-col">
    <label v-if="label" class="mb-1">{{ label }}</label>
    <div class="flex-1">
      <BaseMap v-model="value" />
    </div>
    <div class="mt-0.5 block text-xs text-red-400 min-h-[16px] max-h-[16px]">
      <div v-if="errorMessage" class="animated slideInUp">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
