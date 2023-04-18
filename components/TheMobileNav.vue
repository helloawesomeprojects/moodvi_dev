<script setup>
import { useToast } from "vue-toastification";
import { NIcon } from "naive-ui";
import {
  HomeOutline as HomeIcon,
  SearchOutline as SearchIcon,
  Add as AddIcon,
  NotificationsOutline as NotificationIcon,
} from "@vicons/ionicons5";
import { AccountBoxOutlined as AccountIcon } from "@vicons/material";
import { NuxtLink } from "#components";

const toast = useToast();

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const options = [
  {
    label: () =>
      h(
        NuxtLink,
        {
          to: "/",
        },
        { default: () => "" }
      ),
    key: "index",
    icon: renderIcon(HomeIcon),
  },
  {
    label: "",
    key: "search",
    icon: renderIcon(SearchIcon),
  },
  {
    label: () =>
      h(
        NuxtLink,
        {
          to: "/upload",
        },
        { default: () => "" }
      ),
    key: "add",
    icon: renderIcon(AddIcon),
  },
  {
    label: "",
    key: "notification",
    icon: renderIcon(NotificationIcon),
  },
  {
    label: () =>
      h(
        NuxtLink,
        {
          to: "/profile",
        },
        { default: () => "" }
      ),
    key: "account",
    icon: renderIcon(AccountIcon),
  },
];
</script>

<template>
  <div class="flex justify-center items-center h-[52px] bg-black">
    <n-menu inverted :options="options" mode="horizontal" />
  </div>
</template>
