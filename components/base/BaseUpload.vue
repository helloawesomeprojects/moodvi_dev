<script setup lang="ts">
import { computed } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => {},
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const fileInput = ref<HTMLInputElement | undefined>();

const name = toRef(props, "name");
const { value, handleChange, errorMessage } = useField(name);

const previewUrl = computed(() => {
  if (!value.value || !window) {
    return null;
  }

  return window.URL.createObjectURL(value.value as MediaSource);
});

const filename = computed(() => {
  if (!value.value) {
    return null;
  }

  return value.value.name;
});

const handleClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleInputChange = (event) => {
  if (props.multiple) {
    emit("update:modelValue", event.target.files);
    handleChange(event.target.files);
  } else {
    emit("update:modelValue", event.target.files[0]);
    handleChange(event.target.files[0]);
  }
};
</script>

<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      accept="video/mp4"
      class="hidden"
      :multiple="multiple"
      @change="handleInputChange"
    />
    <section
      v-if="previewUrl"
      class="w-[260px] h-[472px] bg-black flex items-center rounded-lg"
    >
      <video :src="previewUrl" preload="metadata" muted autoplay loop />
    </section>
    <section
      v-else
      class="w-[260px] h-[472px] flex items-center rounded-lg border-2 border-dashed border-line-secondary transition-colors duration-300 hover:border-primary hover:bg-bg-hover cursor-pointer"
      @click="handleClick"
    >
      <main class="w-full flex flex-col items-center px-9">
        <Icon name="carbon:cloud-upload" size="48" />
        <h1 class="mt-6 text-lg text-center text-text-primary font-medium">
          Select video to upload
        </h1>
        <section
          class="mt-6 text-text-tertiary text-xs text-center font-normal space-y-1.5"
        >
          <p>MP4 or WebM</p>
          <p>720x1280 resolution or higher</p>
          <p>Up to 5 minutes</p>
          <p>Less than 2 GBs</p>
        </section>
        <BaseButton class="mt-8 w-full">Select file</BaseButton>
      </main>
    </section>
    <section
      v-if="filename"
      class="mt-4 flex items-center bg-white rounded-xl border border-solid border-line-secondary p-3 text-xs"
    >
      <div class="flex-1 flex items-center">
        <Icon name="mdi:check-circle-outline" size="16" class="mr-1" />
        <div class="truncate flex-1 max-w-[120px]" :title="filename">
          {{ filename }}
        </div>
      </div>
      <button
        type="button"
        class="text-text-primary flex-shrink-0 font-medium hover:underline"
        @click="handleClick"
      >
        Change video
      </button>
    </section>
    <section
      class="mt-0.5 block text-xs text-red-400 min-h-[16px] max-h-[16px]"
    >
      <div v-if="errorMessage" class="animated slideInUp">
        {{ errorMessage }}
      </div>
    </section>
  </div>
</template>
