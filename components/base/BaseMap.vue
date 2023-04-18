<script lang="ts">
const DEFAULT_CENTER = [41.2995, 69.2401];
</script>

<script setup lang="ts">
import { useScriptTag } from "@vueuse/core";
import { provide, shallowRef, ref } from "vue";

const props = defineProps({
  showMarker: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: Array,
    default: DEFAULT_CENTER,
    validator(value) {
      if (Array.isArray(value) && value.length !== 2) {
        console.error("Value should be an array containing lat and lon values");
        return false;
      }
      return true;
    },
  },
});
const emit = defineEmits(["update:modelValue", "init"]);

const map = shallowRef();
const mapContainer = ref();

provide("map", map);

const SCRIPT_ID = "yandex-maps";

const initMap = () => {
  const inputSearch = new ymaps.control.SearchControl({
    options: {
      // Пусть элемент управления будет
      // в виде поисковой строки.
      size: "large",
      // Включим возможность искать
      // не только топонимы, но и организации.
      provider: "yandex#search",
    },
  });
  // Создание карты.
  map.value = new ymaps.Map(mapContainer.value, {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: props.modelValue || DEFAULT_CENTER,
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 13,
    controls: [inputSearch, "zoomControl", "geolocationControl"],
  });
  // map.value.behaviors.disable(["scrollZoom"]);
  if (props.showMarker) {
    const marker = new ymaps.Placemark(props.modelValue || DEFAULT_CENTER);
    map.value.geoObjects.add(marker);
    map.value.events.add("boundschange", () => {
      const position = map.value.getCenter();
      marker.geometry.setCoordinates(position);
      emit("update:modelValue", position);
    });
    map.value.events.add("actiontick", (e) => {
      const tick = e.get("tick");
      const newPosition = map.value.options
        .get("projection")
        .fromGlobalPixels(tick.globalPixelCenter, tick.zoom);
      marker.geometry.setCoordinates(newPosition);
      emit("update:modelValue", newPosition);
    });
  }
  emit("init", { map: map.value });
};

const { load } = useScriptTag(
  "https://api-maps.yandex.ru/2.1/?apikey=afe691f1-2e2d-49b0-b3ea-46a6fe3640e0&lang=en_US",
  (el: HTMLScriptElement) => {},
  { manual: true, attrs: { id: SCRIPT_ID, async: "", defer: "" } }
);

onMounted(() => {
  if (process.client) {
    const script = document.getElementById(SCRIPT_ID);
    if (!script) {
      load().then(() => {
        (window as any).ymaps.ready(initMap);
      });
    } else {
      if (typeof (window as any).ymaps !== "undefined") {
        (window as any).ymaps.ready(initMap);
      } else {
        script.addEventListener("load", () => {
          (window as any).ymaps.ready(initMap);
        });
      }
    }
  }
});
</script>

<template>
  <div ref="mapContainer" class="w-full max-w-full h-full">
    <slot v-if="map" />
  </div>
</template>
