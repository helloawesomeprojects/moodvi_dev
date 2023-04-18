<script setup lang="ts">
import Color from "color";
import "bottom-sheet-vue3/css/style.css";
import "vue-skeletor/dist/vue-skeletor.css";
import { useUiStore } from "./store/ui";

const uiStore = useUiStore();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Moodvi` : "Moodvi";
  },
  htmlAttrs: {
    class: "snap-y snap-mandatory",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/moodvi-icon.png",
    },
  ],
});

watch(
  () => uiStore.bodyScrollDisabled,
  (value: boolean) => {
    if (typeof document === "undefined") {
      return;
    }
    if (value) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  },
  { immediate: true }
);

const primaryColor = Color("#4285F4");

const themeOverrides = {
  common: {
    primaryColor: primaryColor.hex(),
    primaryColorHover: primaryColor.lighten(0.1).hex(),
    primaryColorPressed: primaryColor.darken(0.1).hex(),
  },
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" inline-theme-disabled>
    <n-message-provider>
      <div class="max-w-[2560px] mx-auto">
        <LoginRequiredWindow />
        <SocialShareBottomSheet />
        <MobileCommentsSheet />
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
