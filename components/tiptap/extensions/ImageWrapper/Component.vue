<template>
  <node-view-wrapper class="node-wrapper" :class="{'node-wrapper--selected': selected}">
    <node-control @delete="deleteNode">
      <node-control-item @click="isEdit = !isEdit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
        </svg>
      </node-control-item>
      <node-control-item @click="$refs.file.click()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </node-control-item>
    </node-control>
    <input type="file" ref="file" style="display: none;" @change="onUpload" multiple>
    <div :class="{'swiper': isSliderMode}" ref="swiper">
      <node-view-content :class="{[isSliderMode ? 'swiper-wrapper': 'grid']: true}"></node-view-content>
    </div>
  </node-view-wrapper>
</template>

<script>
import {
  NodeViewWrapper,
  NodeViewContent,
  nodeViewProps
} from '@tiptap/vue-2';

import 'swiper/swiper-bundle.min.css';

import NodeControl from '../../components/NodeControl';
import NodeControlItem from '../../components/NodeControlItem';

let Swiper = null;

if (process.client) {
  Swiper = require('swiper/swiper-bundle.min.js')
}

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    NodeControl,
    NodeControlItem
  },

  props: nodeViewProps,

  data() {
    return {
      isEdit: false,
      swiper: null
    }
  },

  mounted() {
    this.onSwiper();
  },

  watch: {
    'node.firstChild.attrs.src'(newValue) {
      if (newValue === null) {
        this.deleteNode();
      }
    },
    isEdit(newValue) {
      if (newValue) {
        this.swiper.destroy();
      } else {
        this.onSwiper();
      }
    }
  },

  computed: {
    isSliderMode() {
      return this.isEdit === false && this.swiper && this.childCount > 1;
    },
    childCount() {
      return this.node.childCount;
    }
  },

  methods: {
    onSwiper() {
      if (Swiper) {
        this.$nextTick()
          .then(() => {
            this.swiper = new Swiper(this.$refs.swiper, {
              autoHeight: true,
              spaceBetween: 20,
            })
          });
      }
    },
    onUpload(event) {
      const formData = new FormData();
      const images = event.target.files;

      if (images.length === 0) return;

      for (let image of images) {
        formData.append('images[]', image);
      }

      this.$axios
        .$post(`/api/images/posts`, formData)
        .then(images => {
          this.editor.commands.insertContentAt(this.getPos() + 1,
            images.map(image => {
              return {
                type: 'image',
                attrs: {
                  src:       image.url,
                  'data-id': image.id,
                }
              }
            })
          );

          if (this.isSliderMode) {
            this.swiper.update();
          }
        })
        .finally(() => event.target.value = '');
    }
  }
}
</script>

<style lang="scss">
.node-wrapper {
  padding: 8px;
  border: 1px solid #f1f1f1;
  border-radius: 8px;

  &--selected {
    background-color: aliceblue;
  }

  .swiper-slide {
    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 480px;
    }
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;

  .swiper-slide {
    aspect-ratio: 1;
    width: 100%;

    img {
      height: 100%;
    }
  }
}
</style>