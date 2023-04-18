<script setup lang="ts">
import { useShareStore } from "~~/store/share";
import type { Video } from "~~/types/entites";

const props = defineProps<{ item: Video }>();

const route = useRoute();
const rootEl = ref(null);
const videoPlayer = ref<any>(null);
const showAvatar = ref(true);
const player = computed(() => {
  return videoPlayer.value?.player;
});

useVideoItem(rootEl, player);

const video = toRef(props, "item");

const { like: handleLike, likesCount, isLiked } = useVideoLike(video);
const { save: handleSave, savesCount, isSaved } = useVideoSave(video);

const handleComment = () => {
  navigateTo({ query: { ...route.query, comment: props.item.id.toString() } });
};

const shareStore = useShareStore();
const handleShare = () => {
  shareStore.videoToShare = props.item;
};
</script>

<template>
  <div
    ref="rootEl"
    class="relative w-screen h-[calc(100vh_-_52px)] overflow-hidden"
  >
    <VideoPlayer
      ref="videoPlayer"
      class="w-full h-full object-cover"
      loop
      controls
      preload="metadata"
      always-show-controls
      src="/videos/hilton.mp4"
    />
    <nav
      class="absolute top-1/2 right-3 transform -translate-y-1/2 flex flex-col space-y-4 text-white text-xs"
    >
      <n-avatar
        v-if="showAvatar"
        class="relative mb-8"
        round
        :title="video.userDetail.name"
        :size="48"
        :src="`https://ui-avatars.com/api/?name=${video.userDetail.name}&background=random`"
        object-fit="cover"
      />
      <!-- Like button -->
      <div class="flex flex-col items-center">
        <n-button circle quaternary @click="handleLike">
          <Icon
            name="mdi:heart"
            size="32"
            :class="[isLiked ? 'text-red-500' : 'text-white']"
          />
        </n-button>
        <span> {{ likesCount }} </span>
      </div>
      <!-- Save button -->
      <div class="flex flex-col items-center">
        <n-button
          circle
          quaternary
          :color="isSaved ? undefined : 'white'"
          :type="isSaved ? 'primary' : 'default'"
          @click="handleSave"
        >
          <Icon name="mdi:bookmark" size="32" />
        </n-button>
        <span>{{ savesCount }}</span>
      </div>
      <!-- Comment button -->
      <div class="flex flex-col items-center">
        <n-button circle quaternary color="white" @click="handleComment">
          <Icon name="ion:chatbubble-ellipses" size="32" />
        </n-button>
        <span>{{ item.commentsCount }}</span>
      </div>
      <!-- Location button -->
      <div class="flex justify-center">
        <nuxt-link
          v-slot="{ href, navigate }"
          custom
          :to="{ name: 'route-videoId', params: { videoId: item.id } }"
        >
          <n-button
            tag="a"
            :href="href"
            circle
            quaternary
            color="white"
            @click="navigate"
          >
            <Icon name="tabler:current-location" size="32" />
          </n-button>
        </nuxt-link>
      </div>
      <!-- Share button -->
      <div class="flex flex-col items-center">
        <n-button circle quaternary color="white" @click="handleShare">
          <Icon name="ion:md-share-alt" size="32" />
        </n-button>
      </div>
    </nav>
    <div class="absolute bottom-12 left-0 w-full text-white px-3">
      <n-h3 class="font-semibold text-white m-0"
        >@{{ item.userDetail.email }}</n-h3
      >
      <p class="text-sm mt-1">
        {{ item.title }}
      </p>
      <p v-if="item.description" class="text-sm">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
