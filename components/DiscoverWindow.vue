<script setup lang="ts">
import { Sheet as BottomSheet } from "bottom-sheet-vue3";
import { MqObject } from "~~/types/vue-mq";

const route = useRoute();
const coords = ref();

watch(
  () => route.query.discover,
  () => {
    if (route.query.discover && typeof route.query.discover === "string") {
      coords.value = route.query.discover.split(",").map(Number);
    }
  },
  { immediate: true }
);

const mq: MqObject = inject("mq") as MqObject;

const showDiscover = computed({
  get() {
    return route.query.modal === "discover";
  },
  set(value: boolean) {
    if (!value && route.query.modal !== "discover") {
      return;
    }
    navigateTo({
      query: { ...route.query, modal: value ? "discover" : undefined },
    });
  },
});

const handleSelect = () => {
  navigateTo({
    path: "/",
    query: {
      ...route.query,
      discover: coords.value.join(","),
      modal: undefined,
    },
  });
};
</script>

<template>
  <div>
    <n-modal
      v-if="mq.smPlus"
      v-model:show="showDiscover"
      class="w-[50vw] max-w-screen-md h-[60vh] bg-white rounded relative"
    >
      <div>
        <n-h2
          class="w-8/12 text-center absolute top-16 left-1/2 transform -translate-x-1/2 z-50 bg-white bg-opacity-50"
        >
          Select location to discover more
        </n-h2>
        <ClientOnly>
          <BaseMap v-model="coords"></BaseMap>
        </ClientOnly>
        <n-button
          type="primary"
          class="absolute z-50 bottom-4 left-1/2 transform -translate-x-1/2"
          :disabled="!coords"
          @click="handleSelect"
        >
          Select
        </n-button>
      </div>
    </n-modal>

    <n-drawer
      v-else
      v-model:show="showDiscover"
      placement="bottom"
      height="70vh"
    >
      <n-drawer-content
        :header-style="{ display: 'flex', justifyContent: 'center' }"
        :body-content-style="{
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
        }"
      >
        <template #header>Select location to discover more </template>
        <ClientOnly>
          <BaseMap v-model="coords" class="h-[calc(100%_-_40px)]"></BaseMap>
        </ClientOnly>
        <n-button
          type="primary"
          class="absolute z-50 bottom-4 left-1/2 transform -translate-x-1/2"
          :disabled="!coords"
          @click="handleSelect"
        >
          Select
        </n-button>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
