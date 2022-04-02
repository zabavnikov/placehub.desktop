<template>
  <div v-html="html"></div>
</template>

<script>
import { generateHTML } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

export default {
  props: {
    content: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      html: ''
    }
  },
  mounted() {
    const extensions = [
      Document,
      Paragraph,
      Text,
    ];

    this.html = generateHTML(JSON.parse(this.json), extensions);
  },
}
</script>