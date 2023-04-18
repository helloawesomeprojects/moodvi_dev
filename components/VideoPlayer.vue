<script setup lang="ts">
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import { useUiStore } from "~~/store/ui";

defineProps({
  src: {
    type: String,
    required: true,
  },
  controls: {
    type: Boolean,
    default: false,
  },
  poster: {
    type: String,
    default: undefined,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  playPauseOnClick: {
    type: Boolean,
    default: true,
  },
  alwaysShowControls: {
    type: Boolean,
    default: false,
  },
});

const player = ref(null);

const uiStore = useUiStore();

defineExpose({ player });

const onMounted = (event) => {
  player.value = event.player;

  const controlBar = player.value.getChild("ControlBar");
  controlBar.on("click", (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  });
};

const handleVolumeChange = () => {
  uiStore.muted = player.value.muted();
};
</script>

<template>
  <video-player
    :muted="uiStore.muted"
    :controls="controls"
    class="relative video-player"
    :class="{
      'video-player--rounded': rounded,
      'video-player--always-show-controls': alwaysShowControls,
    }"
    :src="src"
    :poster="poster"
    @mounted="onMounted"
    @volumechange="handleVolumeChange"
  >
    <template v-slot="{ player, state }">
      <div
        v-if="playPauseOnClick"
        class="absolute inset-0"
        :class="{ 'bottom-[30px]': controls }"
      >
        <button
          class="w-full h-full flex items-center justify-center"
          @click="state.playing ? player.pause() : player.play()"
        >
          <Icon v-if="!state.playing" name="ion:play" size="64" />
        </button>
      </div>
    </template>
  </video-player>
</template>

<style lang="scss">
.vjs-big-play-button,
.vjs-fullscreen-control,
.vjs-picture-in-picture-control {
  display: none !important;
}

.video-js {
  &:hover .vjs-control-bar {
    opacity: 1;
    pointer-events: all;
  }

  .vjs-control-bar {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}

.video-player {
  &--rounded {
    .vjs-tech {
      border-radius: 0.5rem;
      object-fit: cover;
    }
  }

  &--always-show-controls {
    &.video-js .vjs-control-bar,
    &.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
