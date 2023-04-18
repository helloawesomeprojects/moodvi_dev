<script setup lang="ts">
import { useAuthStore } from "~~/store/auth";
import { PlusOutlined } from "@vicons/material";

const authStore = useAuthStore();
</script>

<template>
  <header
    class="px-4 h-16 sticky top-0 bg-white z-10 border-b border-solid border-black border-opacity-5"
  >
    <main class="container h-full flex items-center justify-between">
      <nuxt-link to="/">
        <img src="~/assets/images/logo.png" class="w-24" />
      </nuxt-link>
      <n-input
        class="!w-[280px]"
        placeholder="Search accounts and videos"
        clearable
      >
        <template #prefix>
          <Icon name="ic:round-search" class="text-gray-500" />
        </template>
      </n-input>
      <ClientOnly>
        <section class="flex items-center space-x-2">
          <template v-if="authStore.isLoggedIn">
            <nuxt-link
              custom
              v-slot="{ href, navigate }"
              :to="{ name: 'upload' }"
            >
              <n-button tag="a" :href="href" @click="navigate">
                <template #icon>
                  <n-icon>
                    <PlusOutlined />
                  </n-icon>
                </template>
                Add
              </n-button>
            </nuxt-link>
            <UserDropdown />
          </template>
          <nuxt-link
            v-else
            v-slot="{ href, navigate }"
            custom
            :to="{ name: 'auth-login' }"
          >
            <n-button type="primary" tag="a" :href="href" @click="navigate">
              Log in
            </n-button>
          </nuxt-link>
        </section>
      </ClientOnly>
    </main>
  </header>
</template>
