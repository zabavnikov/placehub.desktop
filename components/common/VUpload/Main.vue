<template>
  <div class="v-upload" title="Загрузить изображения">
    <input ref="file" type="file" :accept="accept" :multiple="multiple" :disabled="progress > 0" @change="onUpload">
    <div class="flex items-center">
      <div :style="{backgroundColor: isError ? 'red' : undefined}" @click="$refs.file.click()">
        <slot><v-icon name="photograph" stroke="#b0bec5"></v-icon></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .v-upload {
    input[type="file"] {
      display: none;
    }
  }
</style>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default() {
          return [];
        }
      },

      to: {
        type: String,
        required: true,
      },

      multiple: {
        type: Boolean,
        default: true
      },

      max: {
        type: Number,
        default: 10
      },

      accept: {
        type: String,
        default: "image/*"
      },

      isError: {
        type: Boolean,
        default: false,
      }
    },

    data() {
      return {
        progress: 0
      }
    },

    methods: {
      onUpload(event) {
        const files = event.target.files, formData = new FormData();

        if (files.length < 1 || this.value.length >= this.max || !this.to || this.progress > 0) {
          event.target.value = '';
          return;
        }

        this.$emit('start');

        for (let file of files) {
          formData.append('images[]', file)
        }

        this.$axios
          .$post(`/api/images/${this.to}`, formData, {
            onUploadProgress: progressEvent => {
              this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              this.$emit('progress', this.progress)
            }
          })
          .then((images) => {
            if (images.length) {
              const currentImages = this.value;
              images.forEach(image => currentImages.push(image));
              this.$emit('input', currentImages);
            }
          })
          .finally(() => {
            event.target.value = '';
            this.progress = 0;
            this.$emit('progress', this.progress)

            this.$emit('finish');
          });
      }
    }
  }
</script>
