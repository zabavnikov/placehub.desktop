import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'image',

  draggable: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      'data-id': {
        default: '',
      },
      'data-caption': {
        default: '',
      },
      'data-src': {
        default: '',
      },
      src: {
        default: '/images/no-photo.svg',
      },
    }
  },

  parseHTML() {
    return [{
      tag: 'img',
    }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
});