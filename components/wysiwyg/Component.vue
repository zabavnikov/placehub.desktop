<template>
  <div>
    <editor-content :editor="editor"></editor-content>
    <input type="file" id="wysiwyg-file" style="display: none;" @change="addImage" multiple>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Typography from '@tiptap/extension-typography';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Image from './extensions/Image';
import Commands from './commands/commands'
import suggestion from './commands/suggestion'

import { ref, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api';

export default {
  components: {
    EditorContent
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
          Dropcursor.configure({
            width: 2,
            color: '#90A4AE'
          }),
          Gapcursor,
          Image,
          Commands.configure({
            suggestion,
          }),
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

.mention {
  border: 1px solid #000;
  border-radius: 0.4rem;
  padding: 0.1rem 0.3rem;
  box-decoration-break: clone;
}
</style>