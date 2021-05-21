import { ref, defineComponent } from '@vue/composition-api';

export default (ctx, inject) => {
  class Overlay {
    constructor() {
      this.component = ref(undefined);
      this.options = {
        placement: 'center',
        width: 'auto',
        offset: '16px',
      };
    }

    show(component, payload = {}) {
      if (payload.hasOwnProperty('overlay')) {
        this.options = Object.assign(this.options, payload.overlay);
        delete payload.overlay;
      }

      this.component.value = defineComponent({
        render(createElement) {
          return createElement(component, payload)
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