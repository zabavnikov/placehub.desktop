import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'imageWrapper',

  group: 'block',

  content: 'image*',

  selectable: true,

  parseHTML() {
    return [{
      tag: this.name,
    }]
  },

  renderHTML({ HTMLAttributes }) {
    return [this.name, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
});