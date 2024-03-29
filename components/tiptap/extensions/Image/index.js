import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'image',

  group: 'block',

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      'data-id': {
        default: null,
      },
      'data-caption': {
        default: null,
      },
      'data-src': {
        default: null,
      },
      src: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [{
      tag: 'img',
    }]
  },

  renderHTML({ HTMLAttributes }) {
    if (HTMLAttributes['data-id'] === null) {
      HTMLAttributes['data-empty'] = true;
    }

    return [this.name, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
});