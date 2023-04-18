import { useAuthStore } from "@/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    return navigateTo({ path: "/auth/login", query: { to: to.path } });
  }
});
