<template>
  <div class="v-attachments">
    <div v-if="value.length > 0" class="grid grid-cols-4 gap-4 mb-4">
      <div
        v-for="(image, index) in value"
        :key="image.id"
        :style="{backgroundImage: `url(${image.url})`}"
        class="v-attachment ratio"
      >
        <div class="v-attachment-tools">
          <div @click="onDelete(index)" class="v-attachment-tools__delete">
            <v-icon name="x-circle" fill="white"></v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default() {
          return [];
        }
      },
    },

    methods: {
      onDelete(index) {
        this.$delete(this.value, index);
        this.$emit('input', this.value);
      }
    }
  }
</script>

<style lang="scss">
  .v-attachments {
  }

  .v-attachment {
    position: relative;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
  }

  .v-attachment-tools {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
  }

  .v-attachment-tools__delete {
    margin: 4px;
    cursor: pointer;
  }
</style>
