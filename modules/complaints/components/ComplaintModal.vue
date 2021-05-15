<template>
  <div class="p-4 bg-white rounded" style="width: 480px;">
    <div class="mb-4 text-2xl">{{ isBan ? 'Бан' : 'Жалоба' }}</div>
    <form @submit.prevent="onSubmit">
      <div v-for="reason in categories" :key="reason.id" class="mb-2">
        <label :for="`reason${reason.id}`" class="flex items-center">
          <input :value="reason.id" v-model="category_id" :id="`reason${reason.id}`" type="radio" name="reason">
          <span class="ml-1">{{ reason.name }}</span>
        </label>
      </div>
      <div class="mr-2">
        <v-textarea v-model="comment" placeholder="Комментарий к жалобе"></v-textarea>
      </div>
      <label v-if="$auth.user.role === 'administrator'" for="ban" class="mt-1 flex items-center space-x-1">
        <input id="ban" v-model="isBan" type="checkbox">
        <span style="line-height: normal">Забанить?</span>
      </label>
      <div class="mt-4 flex items-center justify-end">
        <button type="button" class="button mr-1" @click="$overlay.hide()">Отмена</button>
        <button class="button button-success">Отправить</button>
      </div>
    </form>
  </div>
</template>

<script>
import VTextarea from '~/components/common/VTextarea';

export default {
  props: {
    modelType: String,
    modelId: [Number, String],
  },

  components: {VTextarea},

  data() {
    return {
      category_id: null,
      loading: false,
      success: false,
      isBan: false,
      comment: '',
    }
  },

  computed: {
    categories() {
      return this.$store.state.complaints.categories;
    }
  },

  methods: {
    onSubmit() {
      let url = '/api/moderation';

      if (this.isBan) {
        url += '/bans';
      }

      this.$axios
          .$post(url, {
            category_id: this.category_id,
            model_type: this.modelType || null,
            model_id: this.modelId || null,
            comment: this.comment,
          })
          .then(response => {
            if (response.status === true) {
              this.$toast.success('Жалоба отправлена')
            }
            this.onClose();
          })
          .catch(error => {
            this.$toast.error('Что-то пошло не так')
          });
    }
  }
}
</script>
