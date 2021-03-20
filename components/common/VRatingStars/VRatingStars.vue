<template>
  <div class="rating-stars" :title="value">
    <div
      v-for="rating in number"
      :class="{
        'rating-stars__star': true,
        'rating-stars__star--editable': editable || readonly,
        'rating-stars__star--active': value >= rating || (editable && hover >= rating),
      }"
      @mouseenter="hover = rating"
      @mouseleave="hover = 0"
      @click="onClick(rating)">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      number: {
        type: [Number, String],
        default: 5,
      },

      value: {
        type: [Number, String],
      },

      editable: {
        type: Boolean,
        default: false,
      },

      readonly: {
        type: Boolean
      }
    },

    data() {
      return {
        hover: 0,
      }
    },

    methods: {
      onClick(rating) {
        if (! this.editable || this.readonly) {
          return;
        }

        this.$emit('input', rating);
      }
    }
  }
</script>

<style lang="scss">
  .rating-stars {
    display: flex;

    &__star + &__star {
      margin-left: 4px;
    }

    &__star {
      width: 16px;
      height: 16px;
      background-image: url('/images/icons/rating-stars.png');
      background-position: 0 0;

      &--active {
        background-position: -16px 0;
      }

      &--editable {
        cursor: pointer;
      }
    }
  }
</style>
