<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

defineProps<{
  open: boolean;
}>();
const emit = defineEmits(["update:open"]);
const attrs = useAttrs();
const handleClose = () => {
  emit("update:open", false);
};
</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="handleClose">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              v-bind="attrs"
              class="w-full max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                v-if="$slots.title"
                as="h3"
                class="text-lg font-medium leading-6 text-text-primary px-4 py-2"
              >
                <slot name="title" />
              </DialogTitle>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
