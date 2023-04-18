<script setup lang="ts">
import { NIcon } from "naive-ui";
import { useAuthStore } from "~~/store/auth";
import { NuxtLink } from "#components";
import {
  AccountCircleOutlined as ProfileIcon,
  LogOutOutlined as LogoutIcon,
} from "@vicons/material";

const authStore = useAuthStore();

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const options = [
  {
    label: () =>
      h(
        NuxtLink,
        {
          to: "/profile",
        },
        { default: () => "Profile" }
      ),
    key: "profile",
    icon: renderIcon(ProfileIcon),
  },
  {
    label: "Logout",
    key: "logout",
    icon: renderIcon(LogoutIcon),
    props: {
      onclick: () => authStore.logout(),
    },
  },
];
</script>

<template>
  <n-dropdown trigger="click" :options="options">
    <n-button quaternary class="flex items-center">
      <n-avatar
        round
        :size="24"
        :src="`https://ui-avatars.com/api/?name=${authStore.user.name}&background=0D8ABC&color=fff`"
      />
      <span class="mx-1">
        {{ authStore.user.name }}
      </span>
      <Icon
        aria-hidden="true"
        name="mdi:chevron-down"
        class="ml-2 -mr-1 h-5 w-5 text-text-secondary"
      />
    </n-button>
  </n-dropdown>
</template>
