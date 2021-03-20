import Vue from 'vue';

const overlay = {};

overlay.install = function (Vue) {
  Vue.prototype.$overlay = new Vue({
    data() {
      return {name: undefined, data: {}}
    },
    methods: {
      /**
       * Открытие / закрытие оверлея.
       * @param {*} name
       * @param {*} data
       */
      toggle(name = undefined, data = {}) {
        if (name === this.name) {
          this.name = undefined;
          this.data = {};
        } else {
          this.name = name;
          this.data = data;
        }
      }
    }
  })
};

Vue.use(overlay);