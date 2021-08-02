<template>
  <div class="v-dropdown">
    <div ref="trigger" class="cursor-pointer">
      <slot name="trigger">
        <img src="/images/icons/more.svg" width="20" class="block">
      </slot>
    </div>
    <div ref="content" style="display: none" @click="onClickInside">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import tippy, {sticky} from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default {
  name: 'VDropdown',

  props: {
    hideOnClickInside: {type: Boolean, default: true},
    hideOnClick:       {type: Boolean, default: true},
    interactive:       {type: Boolean, default: true},
    placement:         {type: String,  default: 'bottom'},
    trigger:           {type: String,  default: 'click'},
  },

  mounted() {
    const content = this.$refs.content;

    tippy(this.$refs.trigger, {
      content,
      trigger:     this.trigger,
      hideOnClick: this.hideOnClick,
      interactive: this.interactive,
      placement:   this.placement,

      allowHTML: true,
      theme: 'simple',
      sticky: 'reference',
      plugins: [sticky],
      onCreate: () => content.style.display = 'block',
      onDestroy: () => content.style.display = 'none',
    });
  },

  methods: {
    onClickInside() {
      if (this.hideOnClickInside === true && this.$refs.trigger !== undefined) {
        this.$refs.trigger._tippy.hide();
      }
    }
  },

  beforeDestroy() {
    this.$refs.trigger._tippy.destroy();
  }
}
</script>