<script setup lang="ts">
import { toRef, computed, useAttrs } from "vue";
import { useField } from "vee-validate";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  size: {
    type: String,
    default: "medium",
    validator(value: string) {
      return ["small", "medium", "large"].includes(value);
    },
  },
  showCharacterCount: {
    type: Boolean,
    default: false,
  },
  showErrorMessage: {
    type: Boolean,
    default: true,
  },
});

const attrs = useAttrs();
const emit = defineEmits(["update:modelValue"]);

const name = toRef(props, "name");

let value, errorMessage, handleBlur, handleChange;
if (name.value) {
  ({ value, errorMessage, handleBlur, handleChange } = useField(
    name,
    undefined,
    {
      initialValue: props.modelValue,
    }
  ));
}

const inputId = computed(() => {
  if (attrs.id) {
    return attrs.id;
  }
  if (name.value) {
    return name.value;
  }
  return uuidv4();
});
const inputValue = computed(() => {
  if (name.value) {
    return value.value;
  }
  return props.modelValue;
});

const onInput = (event) => {
  if (handleChange) {
    handleChange(event);
  } else {
    emit("update:modelValue", event.target.value);
  }
};
const onBlur = (event) => {
  if (handleBlur) {
    handleBlur(event);
  }
};
</script>

<template>
  <div>
    <label
      v-if="label"
      class="mb-1 flex items-center justify-between"
      :for="inputId"
    >
      <span>
        {{ label }}
      </span>
      <span v-if="showCharacterCount" class="text-text-tertiary text-xs">
        {{ inputValue.length }}/{{ attrs.maxlength }}
      </span>
    </label>
    <input
      v-bind="$attrs"
      :value="inputValue"
      :id="inputId"
      class="block w-full px-4 py-2 outline-none border border-solid border-[rgba(22, 24, 35, 0.12)] rounded transition-all duration-200 focus:border-primary focus:drop-shadow-sm"
      :class="{
        'h-7 text-xs': size === 'small',
        'h-9 text-sm': size === 'medium',
        'h-12 text-base': size === 'large',
      }"
      @input="onInput"
      @blur="onBlur"
    />
    <div
      v-if="showErrorMessage"
      class="mt-0.5 block text-xs text-red-400 min-h-[16px] max-h-[16px]"
    >
      <div v-if="errorMessage" class="animated slideInUp">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
