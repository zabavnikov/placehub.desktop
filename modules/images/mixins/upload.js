export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },

    modelType: {
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
    }
  },

  data() {
    return {
      images: this.value,
      progress: 0,
    }
  },

  methods: {
    onDelete(index) {
      this.$delete(this.images, index);

      this.$emit('input', this.images);
    },

    onUpload(event) {
      const files = event.target.files, formData = new FormData();

      if (files.length < 1 || this.images.length >= this.max || !this.modelType) {
        event.target.value = '';
        return;
      }

      for (let file of files) {
        formData.append('images[]', file)
      }

      this.$axios
        .$post(`/api/images/${this.modelType}`, formData, {
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
