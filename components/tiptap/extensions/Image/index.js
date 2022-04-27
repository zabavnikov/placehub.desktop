import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'image',

  group: 'imagewrapper',

  draggable: true,

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
      tag: this.name,
    }]
  },

  renderHTML({ HTMLAttributes }) {
    return [this.name, mergeAttributes(this.options['HTMLAttributes'], HTMLAttributes), 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
});