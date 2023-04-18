<script setup lang="ts">
import { useMessage } from "naive-ui";
import { Skeletor } from "vue-skeletor";
import { useVideoById } from "~~/api/videos";
import { useShareStore } from "~~/store/share";

definePageMeta({ layout: "empty" });

const shareStore = useShareStore();

const { $getVideoUrl } = useNuxtApp();

const router = useRouter();
const route = useRoute();

const id = computed(() => +route.params.videoId);

const { data, isLoading, isSuccess, isError, refetch } = useVideoById(id);

const video = computed(() => data.value?.video);

const url = computed(() => {
  if (video.value) {
    return $getVideoUrl(video.value);
  }
  return "";
});

const message = useMessage();
const showNavButtons = ref(false);
const showAvatar = ref(false);

const handleCopyLink = () => {
  navigator.clipboard.writeText(url.value);
  message.info("URL copied to the clipboard");
};

const handleClose = () => {
  router.back();
};

const handleUp = () => {};
const handleDown = () => {};

const handleNewComment = () => {
  refetch();
};
</script>

<template>
  <div class="flex min-h-screen max-h-screen">
    <main class="relative w-[70%]">
      <n-button
        class="absolute top-4 left-4 z-20"
        circle
        quaternary
        color="#fff"
        text-color="#000"
        @click="handleClose"
      >
        <i-mdi-close class="w-6 h-6" />
      </n-button>
      <nav
        v-if="showNavButtons"
        class="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 flex flex-col space-y-2"
      >
        <button
          class="w-10 h-10 rounded-full bg-white/[0.12] text-white"
          @click="handleUp"
        >
          <Icon name="mdi:chevron-up" size="24" />
        </button>
        <button
          class="w-10 h-10 rounded-full bg-white/[0.12] text-white"
          @click="handleDown"
        >
          <Icon name="mdi:chevron-down" size="24" />
        </button>
      </nav>
      <Skeletor v-if="isLoading" width="100%" height="100%" />
      <VideoPlayer
        v-else-if="isSuccess"
        src="/videos/hilton.mp4"
        autoplay
        controls
        loop
        class="w-full h-full"
      />
      <div
        v-else-if="isError"
        class="w-full h-full flex flex-col items-center justify-center bg-gray-100"
      >
        <n-p> Something went wrong while loading video. Please try again.</n-p>
        <n-button size="small" @click="refetch">
          <template #icon>
            <i-mdi-reload class="w-6 h-6" />
          </template>
          Reload
        </n-button>
      </div>
    </main>
    <aside class="w-5/12 2xl:w-4/12 flex flex-col">
      <header class="px-8 py-12">
        <figure class="m-0 flex space-x-2">
          <template v-if="showAvatar">
            <Skeletor v-if="isLoading" width="56" height="56" circle />
            <n-avatar
              v-else
              round
              :title="video?.userDetail.name"
              :size="56"
              :src="`https://ui-avatars.com/api/?name=${video?.userDetail.name}&background=random`"
              object-fit="cover"
            />
          </template>
          <figcaption class="flex-1">
            <h3 class="m-0 text-text-primary font-bold">
              <Skeletor v-if="isLoading" class="max-w-[100px]" />
              <template v-else>
                {{ video?.userDetail.name }}
              </template>
            </h3>
            <p class="m-0 first-letter:text-sm">
              <Skeletor v-if="isLoading" />
              <template v-else>
                {{ video?.userDetail.email }}
              </template>
            </p>
          </figcaption>
        </figure>
        <h4 class="m-0 mt-6">
          <Skeletor v-if="isLoading" />
          <template v-else>
            {{ video?.title }}
          </template>
        </h4>
        <p>
          <template v-if="isLoading">
            <Skeletor />
          </template>
          <template v-else>
            {{ video?.description }}
          </template>
        </p>

        <div class="mt-6 flex flex-wrap justify-between items-center">
          <section class="flex space-x-2">
            <VideoActions
              :loading="isLoading"
              :video="video"
              orientation="horizontal"
            />
          </section>
          <ClientOnly>
            <section class="flex space-x-1">
              <ShareNetwork
                v-for="item in shareStore.shareItems"
                :key="item.network"
                :network="item.network"
                title="Title"
                description="Description"
                :url="url"
                class="p-2"
              >
                <Icon :name="item.icon" size="24" />
              </ShareNetwork>
            </section>
          </ClientOnly>
        </div>

        <n-input-group class="mt-4 flex bg-bg-view">
          <n-input placeholder="" readonly :value="url" />
          <n-button
            class="font-medium transition duration-200 hover:bg-bg-hover px-4 py-2"
            @click="handleCopyLink"
          >
            Copy link
          </n-button>
        </n-input-group>
      </header>
      <CommentsManager :video-id="id" @comment="handleNewComment" />
    </aside>
  </div>
</template>
