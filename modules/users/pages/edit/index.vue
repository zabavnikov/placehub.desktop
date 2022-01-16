<template>
  <the-layout reverse heading="Редактирование профиля">
    <template #sidebar>
      <img :src="$auth.user.avatar" :alt="user.name" class="rounded" width="100%" />
      <input type="file" @change="onUpload" class="mt-2" />
    </template>

    <template #content>
      <div>
        <label for="name">
          Имя пользователя
          <span class="asterisk"></span>
        </label>
        <input v-model="user.name" type="text" class="input" id="name" />
        <div v-if="errors.has('name')" class="help mt-1" style="color: red;">{{ errors.first('name') }}</div>
        <div
            v-else
            class="help mt-1"
        >Чтобы людям было проще находить ваш аккаунт, используйте имя, под которым вас знают: ваше имя и фамилию, никнейм или название компании.</div>
      </div>

      <div class="mt-4">
        <label for="description">О себе</label>
        <v-textarea v-model="user.description" id="description"></v-textarea>
        <div v-if="errors.has('description')" class="help mt-1" style="color: red;">{{ errors.first('description') }}</div>
      </div>

      <div class="mt-4">
        <button @click="onSubmit" :class="{loading}" class="button button-success">Сохранить</button>
      </div>
    </template>
  </the-layout>
</template>

<script>
import VTextarea from '~/components/common/VTextarea';
import Errors from '~/utils/errors';

export default {
  components: { VTextarea },

  data() {
    return {
      loading: false,
      errors: new Errors()
    };
  },

  async asyncData({ $axios, $auth }) {
    const GQL = `{
      getUser(id: "${$auth.user.id}") {
        name
        description
      }
    }`;

    const { data } = await $axios.$post(`/graphql`, {
      query: GQL
    });

    return {
      user: data.getUser
    };
  },

  methods: {
    onSubmit() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      this.$axios
          .$put(`/api/users/${this.$auth.user.id}`, this.user)
          .then((response) => {
            if (response.status === true) {
              if (this.user.name !== this.$auth.user.name) {
                this.$store.commit('UPDATE_USER', {name: this.user.name})
              }

              this.$router.push({
                name: 'users.show',
                params: { userId: this.$auth.user.id },
              });
            }
          })
          .catch((error) => this.errors.record(error))
          .finally(() => (this.loading = false));
    },

    onUpload(event) {
      const formData = new FormData();

      formData.append("image", event.target.files[0]);

      this.$axios
          .$post('/api/users/upload/avatar', formData)
          .then(avatar => {
            if (avatar !== null) {
              this.$store.commit('UPDATE_USER', {avatar});
            }
          })
          .finally(() => {
            event.target.value = "";
          });
    },
  },
};
</script>

