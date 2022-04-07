import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

const nodeName = 'w-image';

export default Node.create({
  name: nodeName,

  group: 'block',

  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      images: {
        parseHTML: node => {
          if (node.children.length > 0) {
            const attribute = [];

            for (let index = 0; index < node.children.length; index++) {
              const item = node.children[index];
              attribute.push({
                src: item.getAttribute('src'),
                'data-id': item.getAttribute('dataid'),
              })
            }

            return attribute;
          }

          return [];
        },
        rendered: false
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: nodeName,
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const html = [nodeName];

    node.attrs.images.forEach(image => {
      html.push(['w-image-item', mergeAttributes(image)]);
    })

    return html;
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
});