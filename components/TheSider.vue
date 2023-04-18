<script setup lang="ts">
import { NIcon } from "naive-ui";
import { Component } from "vue";
import { useAuthStore } from "~~/store/auth";
import { MqObject } from "~~/types/vue-mq";
import {
  LocationOutline as LocationIcon,
  HomeOutline as HomeIcon,
} from "@vicons/ionicons5";
import { NuxtLink } from "#components";

const mq: MqObject = inject("mq") as MqObject;

const authStore = useAuthStore();
const route = useRoute();

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const links = computed(() => [
  {
    label: () =>
      h(
        NuxtLink,
        {
          to: "/",
        },
        { default: () => "Home" }
      ),
    key: "index",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        NuxtLink,
        {
          to: {
            query: { ...route.query, modal: "discover" },
          },
        },
        { default: () => "Discover" }
      ),
    key: "discover",
    icon: renderIcon(LocationIcon),
  },
]);
</script>

<template>
  <aside
    class="w-2/12 lg:w-4/12 xl:w-3/12 sticky top-16 h-[calc(100vh_-_64px)] self-start"
  >
    <main class="py-6 w-16 lg:w-full h-full relative vertical-line-right">
      <ClientOnly>
        <n-menu
          :collapsed="mq.mdMinus"
          :collapsed-width="64"
          :options="links"
        />
        <section v-if="authStore.isLoggedIn"></section>
        <section
          v-else
          class="hidden lg:block mt-2 pt-5 px-2 pb-6 relative divider-before"
        >
          <p class="text-black text-opacity-50">
            Log in to follow creators, like videos, and view comments.
          </p>
          <nuxt-link
            custom
            v-slot="{ href, navigate }"
            :to="{ name: 'auth-login' }"
          >
            <n-button
              tag="a"
              :href="href"
              class="mt-5 flex"
              tertiary
              size="large"
              @click="navigate"
            >
              Log in
            </n-button>
          </nuxt-link>
        </section>
      </ClientOnly>
    </main>
  </aside>
</template>
