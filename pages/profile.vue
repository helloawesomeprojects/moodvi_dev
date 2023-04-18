<script setup lang="ts">
import { useAuthStore } from "~~/store/auth";
import ProfileUploadedVideos from "~~/components/profile/ProfileUploadedVideos.vue";
import ProfileLikedVideos from "~/components/profile/ProfileLikedVideos.vue";
import ProfileSavedVideos from "~/components/profile/ProfileSavedVideos.vue";

definePageMeta({
  middleware: ["auth"],
});
const authStore = useAuthStore();

const tabs = ref([
  {
    label: "Uploaded",
    icon: "mdi:playlist-play",
    name: "uploaded",
    component: ProfileUploadedVideos,
  },
  {
    label: "Liked",
    icon: "mdi:heart-outline",
    name: "liked",
    component: ProfileLikedVideos,
  },
  {
    label: "Saved",
    icon: "mdi:bookmark-outline",
    name: "saved",
    component: ProfileSavedVideos,
  },
]);

const showAvatar = ref(true);
</script>

<template>
  <div>
    <!-- Mobile -->
    <div class="pt-8">
      <figure
        class="flex items-center justify-center sm:justify-start space-x-3"
      >
        <n-avatar
          v-if="showAvatar"
          round
          :size="56"
          :src="`https://ui-avatars.com/api/?name=${authStore.user.name}&background=0D8ABC&color=fff`"
          object-fit="cover"
          :alt="authStore.user.name"
        />
        <figcaption>
          <h1 class="font-medium sm:text-3xl">{{ authStore.user.name }}</h1>
          <p class="text-xs sm:text-lg sm:mt-2">{{ authStore.user.email }}</p>
        </figcaption>
      </figure>

      <n-tabs animated type="segment" class="sm:w-7/12">
        <n-tab-pane
          v-for="tab in tabs"
          :key="tab.name"
          :name="tab.name"
          :tab="tab.label"
        >
          <template #tab>
            <div>
              <Icon :name="tab.icon" size="28" />
              <span class="hidden sm:inline sm:ml-1">{{ tab.label }}</span>
            </div>
          </template>
          <component :is="tab.component" />
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
