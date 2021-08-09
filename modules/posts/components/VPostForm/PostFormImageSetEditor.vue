<template>
  <div class="layout-main">
    <div class="layout-content">

      <div class="p-4 bg-white rounded-t-lg">
        <h2 class="mb-4 text-xl">Редактирование набора изображений</h2>
        <client-only>
          <draggable v-model="images" handle=".handle" class="grid grid-cols-4 gap-4">
            <div
                class="handle wh-ratio rounded bg-cover bg-center"
                v-for="(image, index) in images"
                @click="activeImage = index"
                :key="image.id"
                :style="{backgroundImage: `url(${image.sizes.small})`}">
              <div class="flex justify-end">
                <div v-if="image.text" class="p-1" title="Есть текст">
                  <v-icon name="annotation"></v-icon>
                </div>
                <div class="p-1" @click="images.splice(index, 1)" title="Удалить из набора">
                  <v-icon name="trash"></v-icon>
                </div>
              </div>
            </div>
          </draggable>
        </client-only>

        <div v-if="images[activeImage].text" class="mt-4 bg-white" style="white-space: pre-line">{{ images[activeImage].text }}</div>
      </div>

      <footer class="p-4 bg-gray-100 rounded-b-lg border-t border-solid border-gray-200">
        <button type="button" :class="{loading}" class="button button-primary" @click="$emit('upload')">Добавить фото</button>
      </footer>
    </div>
  </div>
</template>

<script>
let Draggable = null;

if (process.client) {
  Draggable = require('vuedraggable');
}

export default {
  components: {
    Draggable
  },
  props: {
    set: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      images: [...this.set],
      loading: false,
      activeImage: 0
    }
  },
  watch: {
    set(newValue) {
      this.images = newValue;
    },
    images(newValue) {
      if (newValue.length === 0) {
        // Если изображений в наборе нет, то просто выкидываем события выше.
        this.$emit('change', newValue);
      } else {
        // Если есть изображений стало меньше или больше,
        // то обновляем данные о их порядке.
        if (this.loading) {
          return;
        }

        this.loading = true;

        this.$axios
            .$put('/api/posts/images/order', {
              set: newValue
            }, {
              progress: false
            })
            .then(() => this.$emit('change', newValue))
            .finally(() => this.loading = false);
      }
    }
  },
}
</script>