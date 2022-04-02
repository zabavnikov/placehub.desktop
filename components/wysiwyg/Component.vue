<template>
  <div>
    <button type="button" @click="addImage">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    </button>
    <editor-content :editor="editor"></editor-content>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Typography from '@tiptap/extension-typography';
import Image from './extensions/Image';

import { ref, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api';

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    const editor = ref(null);

    onMounted(() => {
      editor.value = new Editor({
        content: props.value,
        extensions: [
          Document,
          Paragraph,
          Placeholder.configure({
            placeholder: 'Привет, что нового?',
          }),
          Text,
          Typography,
          Image
        ],
        onUpdate: () => {
          emit('input', editor.value.getHTML())
        },
      });
    });

    onBeforeUnmount(() => editor.value.destroy());

    return {
      editor
    }
  },

  methods: {
    addImage() {
      const nodes = [{
        type: 'w-image',
        attrs: {
          model_id: 1,
          src: 'asd',
          'data-id': 1,
        }
      }];
      this.editor.commands.insertContent(nodes);
    }
  }
}
</script>

<style lang="scss">
.ProseMirror {
  font-size: 12px;
  font-weight: 500;
  display: block;
  width: 100%;
  min-height: 38px;
  background-color: #fff;
  padding: 8px;
  border: 1px solid #cfd8dc;
  border-radius: 4px;
  line-height: 24px;
  box-shadow: inset 0 2px rgb(0 0 0 / 4%);

  > * + * {
    margin-top: 20px;
  }

  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }
}
</style>