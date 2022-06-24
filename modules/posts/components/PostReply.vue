<template>
  <div :class="{'bg-yellow-100': isSelected}">
    <div class="flex">
      <nuxt-link :to="{name: 'users.show', params: {userId: content.user.id}}" class="mr-2 flex-shrink-0">
        <img :src="content.user.avatar" :alt="content.user.name" class="w-8 h-8 rounded-full">
      </nuxt-link>
      <div class="overflow-hidden">
        <nuxt-link :to="{name: 'users.show', params: {userId: content.user.id}}" class="font-bold">
          {{ content.user.name }}
        </nuxt-link>
        <span> - {{ content.created_at }}</span>
        <div class="mt-1 space-y-2">
          <div v-if="content.text">{{ content.text }}</div>
          <div v-if="content.images.length" class="grid grid-cols-4 gap-1">
            <img v-for="image in content.images" :key="image.id" :src="image.url" class="object-cover aspect-square rounded">
          </div>
        </div>

        <div @click="onEdit">edit</div>
        <div @click="onReply">reply</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    selectedReply() {
      return this.$store.state.posts.replies.selected;
    },
    isSelected() {
      return this.selectedReply.id === this.content.id;
    },
  },
  methods: {
    onEdit() {
      this.$overlay.show(() => import('~/modules/posts/components/PostReplyFormDialog.vue'), {
        props: {
          value: this.content
        },
        on: {
          input: value => this.content = value
        }
      });
      this.$store.commit('posts/replies/MODE_EDIT', this.content);
    },
    onReply() {
      this.$overlay.show(() => import('~/modules/posts/components/PostReplyFormDialog.vue'), {
        props: {
          value: this.content
        },
        on: {
          input: value => this.content = value
        }
      });
      this.$store.commit('posts/replies/MODE_REPLY', this.content);
    }
  }
}
</script>