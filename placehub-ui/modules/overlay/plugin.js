import { ref, defineComponent } from '@vue/composition-api';

export default (ctx, inject) => {
  class Overlay {
    constructor() {
      this.component = ref(undefined);
    }

    show(component, attributes = {}) {
      if (attributes.hasOwnProperty('overlay')) {
        this.options = Object.assign({}, this.options, attributes.overlay);
        delete attributes.overlay;
      } else {
        this.options = JSON.parse(`<%= JSON.stringify(options) %>`);
      }

      this.component.value = defineComponent({
        render: h => h(component, attributes)
      });

      if (process.client) {
        document.addEventListener('click', this.hideByClickLinkInsideOverlay.bind(this));
      }
    }

    /**
     * @returns {Promise<unknown>}
     */
    hide() {
      if (process.client) {
        document.removeEventListener('click', this.hideByClickLinkInsideOverlay);
      }

      return new Promise((resolve, reject) => {
        this.component.value = undefined;

        (typeof this.component.value === 'undefined')
            ? resolve()
            : reject();
      });
    }

    /**
     * Скрываем оверлей если был клик по ссылке внутри оверлея.
     * @param event
     */
    hideByClickLinkInsideOverlay(event) {
      if (this.is && event.target.tagName === 'A') {
        this.hide();
      }
    }

    get is() {
      return !!this.component.value;
    }
  }

  inject('overlay', new Overlay());
}