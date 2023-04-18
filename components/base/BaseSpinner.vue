<script>
export default {
  name: "BaseSpinner",
  props: {
    size: {
      type: Number,
      default: 24,
    },
    borderWidth: {
      type: Number,
      default: 3,
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
  computed: {
    sizeInUnit() {
      return `${this.size}px`;
    },
    borderWidthInUnit() {
      return `${this.borderWidth}px`;
    },
  },
};
</script>

<template>
  <div class="base-spinner"></div>
</template>

<style lang="scss">
.base-spinner {
  width: v-bind("sizeInUnit");
  height: v-bind(sizeInUnit);
  border: v-bind(borderWidthInUnit) solid v-bind(color);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
