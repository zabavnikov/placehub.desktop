import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'nodewrapper',

  group: 'block',

  content: 'nodewrappercontrol ImageGroupItem*',

  selectable: true,

  defining: true,

  addAttributes() {
    return {
      type: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [{
      tag: this.name,
    }]
  },

  renderHTML({ HTMLAttributes }) {
    return [this.name, HTMLAttributes, ['div', {'data-a': 1}, 0]];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
});