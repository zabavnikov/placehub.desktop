import Vue from 'vue';

Vue.use({
  install: function (Vue) {
    Vue.prototype.$overlay = new Vue({
      data() {
        return {
          name: undefined,
          data: {},
        }
      },
      methods: {
        toggle(name = undefined, data = {}) {
          if (name === this.name) {
            this.hide();
          } else {
            this.name = name;
            this.data = data;
          }
        },
        hide() {
          this.name = undefined;
          this.data = {};
        },
        show(name, data = {}) {
          this.name = name;
          this.data = data;
        },
        is(name) {
          return name === this.name;
        },
      }
    })
  }
});