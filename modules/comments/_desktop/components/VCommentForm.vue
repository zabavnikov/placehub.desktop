<template>
  <div class="comments-form">
    <div :class="{'form-field': true, 'is-invalid': errors.has('text')}">
      <div class="form-control">
        <v-textarea v-model="form.text" :placeholder="placeholder" @focus="errors.clear('text')"></v-textarea>
      </div>
      <div v-if="errors.has('text')" class="help mt-1">{{ errors.first('text') }}</div>
    </div>

    <v-attachments class="mt-2" v-model="form.images"></v-attachments>

    <div v-if="form.hasOwnProperty('image') && form.image !== null" class="mb-2">
      <img :src="form.image.url" />
    </div>

    <div class="flex mt-2">
      <button @click="onSubmit" :class="{'button button--success mr-2': true, loading: loading || upload}" :disabled="loading || upload">Отправить</button>
      <v-upload
        v-model="form.images"
        show-progress
        :to="`${modelType}_comments`"
        @start="upload = true"
        @finish="upload = false"
      >
      </v-upload>
      <div v-if="showCancel" @click="$store.commit('comments/MODE_RESET')" class="cursor-pointer flex items-center space-x-1 ml-auto" style="line-height: normal">
        <span class="help" style="color: red;">отмена</span>
        <v-icon name="x" width="16" height="16" stroke="red"></v-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import cloneDeep from 'lodash/cloneDeep';
  import Errors from '~/utils/errors';
  import VTextarea from '~/components/common/VTextarea';
  import VAttachments from '~/components/common/VAttachments';
  import VUpload from '~/components/common/VUpload';

  const initialState = {
    parent_id: null,
    image_id: null,
    text: '',
    images: [],
    image: null
  };

  export default {
    name: 'VCommentForm',

    components: {
      VTextarea,
      VAttachments,
      VUpload,
    },

    props: {
      modelType: {
        type: String,
        required: true,
      },

      modelId: {
        type: Number,
        required: true,
      },

      selectedComment: {
        type: Object,
        default() {
          return cloneDeep(initialState);
        }
      },

      imageId: {
        type: Number,
      },

      placeholder: {
        type: String,
        default: 'Текст комментария',
      },

      autofocus: {
        type: Boolean,
        default: false,
      },

      showCancel: {
        type: Boolean,
        default: false,
      },

      textCreate: {
        type: String
      }
    },

    data() {
      return {
        form: {...this.selectedComment},
        errors: new Errors(),
        loading: false,
        upload: false
      }
    },

    watch: {
      imageId: {
        handler(imageId) {
          if (imageId !== undefined) {
            this.form.image_id = imageId;

            if (imageId === null) {
              this.form.image = imageId;
            }
          }
        },
        immediate: true
      },
    },

    computed: {
      mode() {
        return this.$store.state.comments.mode;
      },
      isReply() {
        return this.mode === 'reply';
      },
      isEdit() {
        return this.mode === 'mode';
      },
    },

    methods: {
      onSubmit() {
        if (this.loading) {
          return;
        }

        this.loading = true;

        this.form.model_type = this.modelType;
        this.form.model_id   = this.modelId;

        if (this.isReply) {
          this.form.parent_id = this.selectedComment.id;
        }

        if (!this.form.image_id) {
          this.form.image = null;
        }

        const options = {
          url: `/api/comments/${this.isEdit ? this.selectedComment.id : ''}`,
          data: this.form,
          method: this.isEdit ? 'put' : 'post',
        };

        this.$axios(options)
          .then(({ data }) => {
            if (this.isEdit) {
              this.$store.commit('comments/UPDATE_COMMENT', this.form);
            } else {
              this.$store.commit('comments/ADD_COMMENT', data);
            }

            this.form = cloneDeep(initialState);
          })
          .catch(error => this.errors.record(error))
          .finally(() => {
            this.loading = false;
            this.$store.commit('comments/MODE_RESET');
          });
      },
    }
  }
</script>
