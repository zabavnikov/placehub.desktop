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
        :to="`${subjectType}_comments`"
        @start="upload = true"
        @finish="upload = false"
      >
      </v-upload>
      <div v-if="cancelable" @click="$store.commit('comments/MODE_RESET')" class="cursor-pointer flex items-center space-x-1 ml-auto" style="line-height: normal">
        <span class="help" style="color: red;">отмена</span>
        <v-icon name="x" width="16" height="16" stroke="red"></v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import { cloneDeep, pick } from 'lodash';
import Errors from '~/utils/errors';
import VTextarea from '~/components/common/VTextarea';
import VAttachments from '~/components/common/VAttachments';
import VUpload from '~/components/common/VUpload';
import { UPDATE_COMMENT } from '../../graphql';

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
      imageId: {
        type: Number,
      },

      disabled: {
        type: Boolean,
        default: false,
      },

      placeholder: {
        type: String,
        default: 'Текст комментария',
      },

      autofocus: {
        type: Boolean,
        default: false,
      },

      cancelable: {
        type: Boolean,
        default: false,
      },

      textCreate: {
        type: String
      },
    },

    data() {
      return {
        form: cloneDeep(initialState),
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
      selectedComment: {
        handler(newValue) {
          if (! this.disabled) {
            if (this.isEdit) {
              this.form = cloneDeep(newValue);
            } else {
              this.form = cloneDeep(initialState);
            }
          }
        },
        immediate: true
      }
    },

    computed: {
      selectedComment() {
        return this.$store.state.comments.selectedComment;
      },
      mode() {
        return this.$store.state.comments.mode;
      },
      isReply() {
        return this.mode === 'reply';
      },
      isEdit() {
        return this.mode === 'edit';
      },
      subjectType() {
        return this.$store.state.comments.modelType;
      },
      subjectId() {
        return this.$store.state.comments.modelId;
      }
    },

    methods: {
      async onSubmit() {
        if (this.loading || this.disabled) {
          return;
        }

        this.loading = true;

        this.form.model_type = this.subjectType;
        this.form.model_id   = this.subjectId;

        if (this.isReply) {
          this.form.parent_id = this.selectedComment.id;
        }

        if (!this.form.image_id) {
          this.form.image = null;
        }

        if (this.isEdit) {
          const { updateComment } = await this.$graphql.default.request(gql`
            ${UPDATE_COMMENT}
          `, {
            id: this.form.id,
            input: {
              parentId:   this.form.parent_id || undefined,
              text:       this.form.text
            }
          });

          if (updateComment) {
            this.$store.commit('comments/UPDATE_COMMENT', this.form);
            this.$store.commit('comments/MODE_RESET');
            this.loading = false;
          }
        } else {

          const options = {
            url: `/api/comments/${this.isEdit ? this.selectedComment.id : ''}`,
            data: this.form,
            method: 'post',
          };

          this.$axios(options)
              .then(({data}) => {
                this.$store.commit('comments/ADD_COMMENT', data);
              })
              .catch(error => this.errors.record(error))
              .finally(() => {
                this.loading = false;
                this.$store.commit('comments/MODE_RESET');
              });
        }
      },
    },

    beforeDestroy() {
      this.$store.commit('comments/MODE_RESET')
    }
  }
</script>
