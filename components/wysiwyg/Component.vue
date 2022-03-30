<template>
  <editor-content :editor="editor"></editor-content>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Typography from '@tiptap/extension-typography';

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
          Typography
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
  line-height: 20px;
  box-shadow: inset 0 2px rgb(0 0 0 / 4%);

  > * + * {
    margin-top: 0.75em;
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