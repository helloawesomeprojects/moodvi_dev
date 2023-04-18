<script setup lang="ts">
import { toRef, computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  label: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: undefined,
  },
  optionValue: {
    type: [String, Function],
    default: undefined,
  },
  size: {
    type: String,
    default: "medium",
    validator(value: string) {
      return ["small", "medium", "large"].includes(value);
    },
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const name = toRef(props, "name");
const emit = defineEmits(["update:modelValue"]);

let value, handleChange, handleBlur, errorMessage;
if (name.value) {
  ({ value, handleChange, handleBlur, errorMessage } = useField(name));
}

const inputValue = computed(() => {
  if (name.value) {
    return value.value;
  }

  return props.modelValue;
});

const handleUpdate = (val) => {
  emit("update:modelValue", val);
  if (handleChange) {
    handleChange(val);
  }
};

const selectedValue = computed(() => {
  if (props.optionValue && props.optionLabel) {
    const selectedOption = props.options.find(
      (option) => getOptionValue(option) === inputValue.value
    );
    if (selectedOption) {
      return getOptionLabel(selectedOption);
    }
  }

  return inputValue.value;
});

const getOptionLabel = (option) => {
  if (props.optionLabel) {
    return option[props.optionLabel];
  }

  return option;
};
const getOptionValue = (option) => {
  if (props.optionValue) {
    if (typeof props.optionValue === "string") {
      return option[props.optionValue];
    }
    if (typeof props.optionValue === "function") {
      return props.optionValue(option);
    }

    return option;
  }

  return option;
};
</script>

<template>
  <div>
    <label v-if="label" class="mb-1">
      {{ label }}
    </label>
    <Listbox
      v-slot="{ open }"
      :model-value="inputValue"
      @update:model-value="handleUpdate"
      @blur="handleBlur"
    >
      <div class="relative">
        <ListboxButton
          class="rounded border border-solid border-line-secondary px-4 py-2 flex items-center"
          :class="{
            'h-7': size === 'small',
            'h-9': size === 'medium',
            'h-12': size === 'large',
            'w-full': fullWidth,
          }"
        >
          <span class="flex-1 text-left">{{ selectedValue }}</span>
          <Icon
            name="carbon:caret-down"
            class="transition-transform duration-200 transform"
            :class="{ 'rotate-180': open }"
          />
        </ListboxButton>
        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="getOptionValue(option)"
              :value="getOptionValue(option)"
              as="template"
            >
              <li
                class=""
                :class="[
                  active ? 'bg-bg-hover' : '',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium text-primary' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ getOptionLabel(option) }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
                >
                  <Icon name="mdi:check" class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <div class="mt-0.5 block text-xs text-red-400 min-h-[16px] max-h-[16px]">
      <div v-if="errorMessage" class="animated slideInUp">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
