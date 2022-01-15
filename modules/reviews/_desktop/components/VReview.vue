<template>
  <div class="flex p-4 bg-white rounded shadow-sm">
    <n-link :to="{name: 'users.show', params: {id: content.user.useridname}}" class="w-12 mr-4">
      <img :src="content.user.avatar" :alt="content.user.name" class="w-full rounded-full block">
    </n-link>

    <div class="flex-1">
      <div class="flex mb-6">
        <div class="flex-1">
          <div class="mb-1">
            <n-link :to="{name: 'users.show', params: {id: content.user.id}}"
                    class="font-semibold leading-relaxed">
              {{ content.user.name }}
            </n-link>
          </div>
          <v-rating-stars :value="content.rating"></v-rating-stars>
        </div>

        <v-dropdown>
          <ul class="dropdown-menu">
            <div
                @click="$eventBus.$emit('modal', ['complaints', 'complaint', {modelType: content.model_id, modelId: content.id}])"
                class="dropdown-menu-item">Пожаловаться
            </div>
            <n-link v-if="content.can.update"
                    :to="{name: 'reviews.edit', params: {placeId: content.place_id, reviewId: content.id}}"
                    class="dropdown-menu-item">Редактировать
            </n-link>
            <a v-if="! isApproved && content.can.approve" @click="onApprove" class="dropdown-menu-item">Подтвердить</a>
            <a v-if="content.can.delete" @click="onDelete" class="dropdown-menu-item">Удалить</a>
          </ul>
        </v-dropdown>
      </div>

      <div v-if="! isApproved" class="mb-6 bg-red-300 p-3 rounded">
        Отзыв ждет подтверждения модератором...
      </div>

      <div class="space-y-4">
        <div v-if="item.pluses">
          <div class="mb-1 font-semibold">Преимущества:</div>
          {{ item.pluses }}
        </div>

        <div v-if="item.minuses">
          <div class="mb-1 font-semibold">Недостатки:</div>
          {{ item.minuses }}
        </div>

        <div v-if="item.text">
          <div class="mb-1 font-semibold">Комментарий:</div>
          {{ item.text }}
        </div>
      </div>

      <div v-if="item.images && item.images.length > 0" class="mt-4 mb-1 grid grid-cols-4 gap-4">
        <div
            v-for="image in item.images"
            :key="image.id"
            :style="{backgroundImage: `url(${image.url})`}"
            class="review-attachment ratio rounded"
        >
        </div>
      </div>

      <div class="flex items-center space-x-4 mt-4">
        <n-link :to="{name: 'reviews.show', params: {reviewId: content.id}}" class="flex items-center underline text">
          <v-icon name="message-circle" class="mr-2" width="16" height="16"></v-icon>
          комментировать
        </n-link>
      </div>
    </div>
  </div>
</template>

<style>
.review-attachment {
  background-position: center;
  background-size: cover;
}
</style>

<script>
import VRatingStars from "~/components/common/VRatingStars/VRatingStars";
import VDropdown from "~/components/ui/VDropdown/VDropdown";

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
  },

  components: {VRatingStars, VDropdown},

  data() {
    return {
      isApproved: this.content.approved_at !== null,
      isEdit: false,
      item: this.content,
    }
  },

  methods: {
    onApprove() {
      if (this.isApproved) {
        return
      }

      if (!window.confirm('Вы хотите подтвердить отзыв?')) {
        return;
      }

      this.$axios
          .$put('/api/reviews/' + this.content.id + '/approve')
          .then(({status}) => (status === true) ? this.isApproved = this.$auth.user.id : '');
    },

    onDelete() {
      if (!window.confirm('Вы хотите удалить отзыв?')) {
        return;
      }

      this.$axios
          .$delete('/api/reviews/' + this.content.id)
          .then(() => {
            this.item.deleted_at = true
          });
    }
  }
}
</script>
