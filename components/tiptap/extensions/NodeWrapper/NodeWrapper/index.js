import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'NodeWrapper',

  group: 'block',

  content: 'NodeWrapperControl ImageGroupItem*',

  selectable: true,

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
    return [this.name, HTMLAttributes, 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
});