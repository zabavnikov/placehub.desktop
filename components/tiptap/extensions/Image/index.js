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
    return [this.name, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
});