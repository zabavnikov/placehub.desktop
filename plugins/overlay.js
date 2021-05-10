import { ref, defineComponent } from '@vue/composition-api';

export default (ctx, inject) => {
  class Overlay {
    constructor() {
      this.component = ref(undefined);
    }

    show(component, props = {}) {
      this.component.value = defineComponent({
        render(createElement) {
          return createElement(component, props)
        }
      });
    }

    hide() {
      this.component.value = undefined;
    }

    is() {
      return this.component.value !== undefined;
    }
  }

  inject('overlay', new Overlay());
}