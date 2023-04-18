<script setup lang="ts">
import { Ref } from "vue";

const props = defineProps<{
  from: number[];
  to: number[];
}>();

const map: Ref<any> = inject("map");

onMounted(() => {
  const multiRoute = new (window as any).ymaps.multiRouter.MultiRoute(
    {
      // Route points. Points can be set as coordinates or addresses.
      referencePoints: [props.from, props.to],
    },
    {
      // Automatically set the map viewport so that
      // the entire route is visible.
      boundsAutoApply: true,
    }
  );
  // // Add the route to the map.
  map.value.geoObjects.add(multiRoute);
});
</script>

<template>
  <div></div>
</template>
