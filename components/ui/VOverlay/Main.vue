<template>
  <transition name="fade">
    <div v-if="transitionBackdrop" class="v-overlay">
      <div class="v-overlay-placement" :class="{[`v-overlay-placement--${placement}`]: isPlacement}">
        <transition name="slide-up">
          <div v-if="transition" class="v-overlay-content" :style="{width, padding: offset}">
            <div ref="target">
              <slot></slot>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import {ref} from '@vue/composition-api'
import {onClickOutside} from '@vueuse/core';

export default {
  setup(props, { emit }) {
    const target = ref(null)
    onClickOutside(target, () => emit('close'));
    return { target }
  },
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
  data() {
    return {
      transitionBackdrop: false,
      transition: false,
    }
  },
  computed: {
    isPlacement() {
      return this.placement !== 'none';
    }
  },
  watch: {
    $route() {
      this.$emit('close');
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handler);
    document.body.style.overflowY = 'hidden';
    this.transitionBackdrop = true;
    this.$nextTick(() => {
      this.transition = true;
    });
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handler)
    document.body.style.overflowY = 'auto';
    this.$overlay.hide();
  },
  methods: {
    handler(event) {
      if (event.key === 'Escape') {
        this.$emit('close');
      }
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