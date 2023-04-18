<script setup lang="ts">
interface BalloonContent {
  iconContent?: string;
  iconCaption?: string;
  hintContent?: string;
  balloonContent?: string;
  balloonContentHeader?: string;
  balloonContentBody?: string;
  balloonContentFooter?: string;
}

interface Options {
  preset?:
    | "islands#icon"
    | "islands#dotIcon"
    | "islands#circleIcon"
    | "islands#circleDotIcon";
  iconColor?: string;
  iconLayout?: "default#image" | "default#imageWithContent";
}

const props = defineProps<{
  coords: number[];
  properties?: BalloonContent;
  options?: Options;
}>();
const map: any = inject("map");
onMounted(() => {
  const marker = new (window as any).ymaps.Placemark(
    props.coords,
    props.properties || {},
    props.options || {}
  );
  map.value.geoObjects.add(marker);
});
</script>

<template>
  <div></div>
</template>
