<template>
  <transition name="fade">
    <div v-if="transitionBackdrop" class="v-overlay">
      <div class="v-overlay-placement" :class="{[`v-overlay-placement--${placement}`]: isPlacement}">
        <transition name="slide-up">
          <div v-if="transition" class="v-overlay-content" :style="{width, padding: offset}">
            <div ref="target">
              <component :is="$overlay.component.value"></component>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from '@vue/composition-api'
import { onClickOutside } from '@vueuse/core';

export default {
  props: {
    placement: {
      type: String,
      default: 'center',
    },
    offset: {
      type: String,
    },
    width: {
      type: String,
      default: 'auto'
    }
  },
  setup(props, { root }) {
    const transitionBackdrop = ref(false);
    const transition = ref(false);
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
      transitionBackdrop.value = true;
      transition.value = true;
      document.addEventListener('keydown', escHandler);
      document.body.style.overflowY = 'hidden';
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', escHandler);
      document.body.style.overflowY = 'auto';
    });

    return { transitionBackdrop, transition, target }
  },
  computed: {
    isPlacement() {
      return this.placement !== 'none';
    },
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
  background-color: rgba(0, 0, 0, .52);
  overflow-y: auto;
}
.v-overlay-placement {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  &--center {
    padding: 16px;

    .v-overlay-content {
      margin: auto;
    }
  }
  &--bottom {
    justify-content: flex-end;
    padding-top: 56px;
  }
  &--top {
    justify-content: flex-start;
    padding: 56px 8px 8px;
  }
}
.v-overlay-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.v-overlay-content {
  position: relative;
}
</style>