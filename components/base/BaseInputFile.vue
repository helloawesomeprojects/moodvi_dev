<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const name = toRef(props, "name");

const { handleChange, handleBlur, errorMessage } = useField(name);

const onChange = (event) => {
  handleChange(event.target.files[0]);
};
</script>

<template>
  <div>
    <input
      v-bind="$attrs"
      type="file"
      class="file:cursor-pointer file:bg-primary file:border-0 file:h-9 file:px-4 rounded file:text-white hover:file:bg-primary-dark"
      @change="onChange"
      @blur="handleBlur"
    />
    <div class="mt-0.5 block text-xs text-red-400 min-h-[16px] max-h-[16px]">
      <div v-if="errorMessage" class="animated slideInUp">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
