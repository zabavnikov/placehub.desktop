<template>
  <div>
    <input type="file" :max="max" @change="onUpload">
    <div class="images">
      <div v-for="image in images" :key="image.id">
        <img :src="image.url">
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

    placeId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      images: this.value,
      progress: 0,
    }
  },

  computed: {
    max() {
      return 10;
    }
  },

  methods: {
    onDelete(index) {
      this.$delete(this.images, index);
      this.$emit('input', this.images);
    },

    onUpload(event) {
      const files = event.target.files, formData = new FormData();

      if (files.length < 1 || this.images.length >= this.max || !this.placeId) {
        event.target.value = '';
        return;
      }

      for (let file of files) {
        formData.append('images[]', file)
      }

      formData.append('place_id', this.placeId);

      this.$axios
          .$post('/api/images/upload', formData, {
            onUploadProgress: (progressEvent) => {
              this.progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
            }
          })
          .then((response) => {
            if (response.length) {
              response.forEach(image => this.images.push(image));
              this.$emit('input', this.images);
              this.$emit('uploaded')
            }
          })
          .finally(() => {
            event.target.value = '';
            this.progress = 0;
          });
    }
  }
}
</script>