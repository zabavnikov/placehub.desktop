<template>
  <v-logged-in @click="onClick" :class="classes" :title="like.isLiked ? 'Вам понравилось' : 'Мне нравится'">
      <v-icon :stroke="like.isLiked ? 'red' : color" name="heart" :width="width" :height="height"></v-icon>
<!--      <div class="v-like__count help">{{ like.count }}</div>-->
  </v-logged-in>
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        required: true,
      },

      isLiked: {
        type: Object,
      },

      count: {
        type: Number,
        default: 0,
      },

      width: {
        type: String,
        default: '24',
      },
      height: {
        type: String,
        default: '24'
      },
      color: {
        type: String,
        default: '#aaa'
      }
    },

    data() {
      return {
        like: {
          isLiked: this.isLiked && this.isLiked.hasOwnProperty('model_id'),
          count: this.count,
        },
        loading: false,
      }
    },

    computed: {
      classes() {
        return {
          'v-like': true,
          'v-like--loading': this.loading,
        }
      }
    },

    methods: {
      onClick() {
        if (this.loading) {
          return;
        }

        this.loading = true;

        let METHOD = '$post';

        if (this.like.isLiked) {
          METHOD = '$delete';
        }

        this.$axios[METHOD](`/api/likes/${this.to}`, {}, {
            progress: false
          })
          .then(({ status }) => {
            this.like.isLiked = (status === 'like');

            if (this.like.isLiked) {
              this.like.count++;
            } else if (this.like.count > 0) {
              this.like.count--;
            }
          })
          .finally(() => this.loading = false);
      }
    }
  }
</script>

<style lang="scss">
  .v-like {
    cursor: pointer;
    display: flex;
    align-items: center;

    .v-like__count {
      margin-left: 8px;
    }
  }
</style>
