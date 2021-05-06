import Vue from 'vue';

const v = new Vue({
  data() {
    return {
      wnd: null,
    }
  },
  methods: {
    async show(callback, data = {}) {
      this._destroy();
      this._create(callback(), data);
    },

    hide() {
      this._destroy();
    },

    _create(asyncComponent, data) {
      this.wnd = Vue.extend({
        render(createElement) {
          return createElement(asyncComponent, {
            props: {...data}
          })
        },
      })

      const body = document.body;

      const container = document.createElement('div');
      const containerChild = document.createElement('div');
      container.setAttribute('id', 'wnd');

      container.appendChild(containerChild);
      body.appendChild(container);

      new this.wnd().$mount('#wnd > div');
    },

    _destroy() {
      const el = document.getElementById('wnd');
      if (el) {
        document.body.removeChild(document.getElementById('wnd'));
      }
      this.wnd = null;
    }
  },
})

export default (ctx, inject) => {
  inject('wnd', v)
}