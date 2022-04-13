import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'tt-image',

  group: 'block',

  selectable: true,

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
      src: {
        default: '/images/no-photo.svg',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'tt-image',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['tt-image', mergeAttributes(this.options['HTMLAttributes'], HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
});