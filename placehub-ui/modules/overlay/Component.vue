<template>
  <transition name="fade">
    <div class="v-overlay">
      <div class="v-overlay-placement" :class="{[`v-overlay-placement--${options.placement}`]: isPlacement}">
        <transition name="slide-up">
          <component ref="target" :is="$overlay.component.value"></component>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from '@vue/composition-api'
import { onClickOutside } from '@vueuse/core';

export default {
  setup(props, { root }) {
    const target = ref(null);

    // Скрываем оверлей по Escape.
    const escHandler = event => {
      if (event.key === 'Escape') root.$overlay.hide();
    }

    // Скрываем оверлей по клику в фон.
    onClickOutside(target, () => root.$overlay.hide());

    // Скрываем оверлей если маршрут изменился.
    watch(() => root.$route.path, () => root.$overlay.hide());

    onMounted(() => {
      document.addEventListener('keydown', escHandler);
      document.body.style.overflowY = 'hidden';
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', escHandler);
      document.body.style.overflowY = 'auto';
    });

    return { target }
  },
  computed: {
    isPlacement() {
      return this.options.placement !== 'none';
    },
    options() {
      return this.$overlay.options;
    }
  },
}
</script>

<style lang="scss">
.v-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, .64);
  overflow-y: auto;
  backdrop-filter: blur(4px);
}
.v-overlay-placement {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  height: 100%;

  &--center {
    > * {
      margin: auto;
    }
  }
  &--bottom {
    justify-content: flex-end;
  }
  &--top {
    justify-content: flex-start;
  }
}
.v-overlay-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>