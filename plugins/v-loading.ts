import { createApp } from "vue";
import BaseSpinner from "@/components/base/BaseSpinner.vue";

const BACKGROUND_COLOR = "rgba(255, 255, 255, 0.65)";
const ELEMENT_ID = "v-loading-element";

function getLoadingElement(el) {
  return el.querySelector(`#${ELEMENT_ID}`);
}

function createLoadingElement(el) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", ELEMENT_ID);
  wrapper.style.position = "absolute";
  wrapper.style.inset = "0";
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "center";
  wrapper.style.alignItems = "center";
  wrapper.style.background =
    el.getAttribute("data-loading-background") || BACKGROUND_COLOR;

  const instance = createApp(BaseSpinner, { color: "#4285F4", size: 64 });

  instance.mount(wrapper);
  return wrapper;
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("loading", {
    mounted(el, binding) {
      const isLoading = binding.value;
      const position =
        window.getComputedStyle(el).getPropertyValue("position") ||
        el.style.position;
      if (!position || position === "static") {
        el.style.position = "relative";
      }
      if (isLoading) {
        const loadingElement = createLoadingElement(el);
        el.appendChild(loadingElement);
      }
    },
    updated(el, binding) {
      const isLoading = binding.value;
      let loadingElement = getLoadingElement(el);
      if (isLoading) {
        if (!loadingElement) {
          loadingElement = createLoadingElement(el);
          el.appendChild(loadingElement);
        }
        loadingElement.style.display = "flex";
      } else if (loadingElement) {
        loadingElement.style.display = "none";
      }
    },
  });
});
