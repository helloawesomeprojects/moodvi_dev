<script setup lang="ts">
import { Skeletor } from "vue-skeletor";
import { Video } from "~~/types/entites";

const props = withDefaults(
  defineProps<{
    item?: Video;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const item = toRef(props, "item");

const rootEl = ref(null);
const videoPlayer = ref<any>(null);
const player = computed(() => {
  return videoPlayer.value?.player;
});

const followEnabled = ref(false);
const showAvatar = ref(false);

useVideoItem(rootEl, player);

const { save: handleSave, isSaved, savesCount } = useVideoSave(item);
const { like: handleLike, isLiked, likesCount } = useVideoLike(item);
</script>

<template>
  <div
    ref="rootEl"
    class="hidden sm:flex relative py-5 pr-4 space-x-3 after:block after:w-full after:h-[1px] after:bg-[#161823] after:bg-opacity-20 after:transform after:scale-y-50 after:absolute after:bottom-0 after:lef-0"
  >
    <figure v-if="showAvatar">
      <Skeletor v-if="loading" circle :size="56" />
      <img
        v-else
        class="w-14 h-14 rounded-full object-cover"
        src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea"
        alt="Profile photo"
      />
    </figure>
    <main class="flex-1">
      <header class="flex">
        <div class="flex-1">
          <nuxt-link
            class="block text-[#161823] font-bold text-lg hover:underline"
            to="/"
          >
            <n-skeleton v-if="loading" round class="w-28" />
            <template v-else>
              {{ item?.userDetail?.name }}
            </template>
          </nuxt-link>

          <section class="mt-1 space-y-1">
            <n-h3 class="m-0">
              <Skeletor v-if="loading" :width="180" />
              <template v-else>
                {{ item?.title }}
              </template>
            </n-h3>
            <n-p class="m-0 text-sm text-tertiary">
              <Skeletor v-if="loading" :width="180" />
              <template v-else>
                {{ item?.description }}
              </template>
            </n-p>
          </section>
        </div>
        <BaseButton v-if="followEnabled" outlined size="small">
          Follow
        </BaseButton>
      </header>
      <div class="flex space-x-4">
        <section
          class="mt-3 video-wrapper"
          :style="{
            width: 'calc(calc(100vh - 256px) * 0.5625',
            height: 'calc(100vh - 256px)',
          }"
        >
          <Skeletor
            v-if="loading"
            class="rounded-lg"
            width="100%"
            height="100%"
          />

          <NuxtLink
            v-else
            :to="{
              name: 'username-video-videoId',
              params: {
                username: item?.userDetail?.email,
                videoId: item?.id,
              },
            }"
            class="block w-full h-full"
          >
            <VideoPlayer
              ref="videoPlayer"
              src="/videos/hilton.mp4"
              rounded
              :play-pause-on-click="false"
              class="rounded-lg w-full h-full object-cover"
              loop
              controls
              preload="metadata"
            />
          </NuxtLink>
        </section>
        <nav
          v-if="item"
          class="flex flex-col justify-end space-y-4 py-4 select-none"
        >
          <!-- Like button -->
          <div class="flex flex-col items-center space-y-1.5">
            <n-button circle secondary size="large" @click.stop="handleLike">
              <Icon
                name="mdi:heart"
                size="28"
                :class="[isLiked ? 'text-red-500' : 'text-gray']"
              />
            </n-button>
            <strong class="text-xs text-opacity-[.75]">
              {{ likesCount }}
            </strong>
          </div>

          <!-- Save button -->
          <div class="flex flex-col items-center space-y-1.5">
            <n-button
              :type="isSaved ? 'primary' : 'default'"
              circle
              secondary
              size="large"
              @click.stop="handleSave"
            >
              <Icon name="mdi:bookmark" size="28" />
            </n-button>
            <strong class="text-xs text-opacity-[.75]">
              {{ savesCount }}
            </strong>
          </div>

          <!-- Comment button -->
          <div class="flex flex-col items-center space-y-1.5">
            <nuxt-link
              custom
              v-slot="{ href, navigate }"
              :to="{
                name: 'username-video-videoId',
                params: {
                  username: item?.userDetail?.email,
                  videoId: item?.id,
                },
              }"
            >
              <n-button
                tag="a"
                :href="href"
                circle
                secondary
                size="large"
                @click.stop="navigate"
              >
                <Icon name="ion:chatbubble-ellipses" size="28" />
              </n-button>
            </nuxt-link>
            <strong class="text-xs text-opacity-[.75]">
              {{ item?.commentsCount }}
            </strong>
          </div>

          <!-- Location button -->
          <nuxt-link
            v-slot="{ href, navigate }"
            :to="{ name: 'route-videoId', params: { videoId: item?.id } }"
          >
            <n-button
              tag="a"
              circle
              secondary
              size="large"
              :href="href"
              @click.stop="navigate"
            >
              <Icon name="tabler:current-location" size="28" />
            </n-button>
          </nuxt-link>
          <!-- Social network share button -->
          <client-only>
            <SocialSharePopover :item="item">
              <div class="flex flex-col items-center text-center space-y-1.5">
                <n-button circle secondary size="large">
                  <Icon name="ion:md-share-alt" size="28" />
                </n-button>
                <strong class="text-xs text-opacity-[.75]">
                  {{ item?.sharesCount }}
                </strong>
              </div>
            </SocialSharePopover>
          </client-only>
        </nav>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
.video-wrapper {
  width: calc(calc(100vh - 256px) * 0.5625);
  height: calc(100vh - 256px);
}
</style>
