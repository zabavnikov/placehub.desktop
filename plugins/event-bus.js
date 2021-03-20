import Vue from 'vue';

const eventBus = {};

eventBus.install = function (Vue) {
  Vue.prototype.$eventBus = new Vue({
    data() {
      return {
        modals: {
          users: {
            loginRegister: {
              show: false,
            },
          },
          places: {
            delete: { show: false, data: {}},
            choose: { show: false, data: {}}
          },
          complaints: {
            complaint: { show: false, data: {} }
          }
        }
      }
    },

    created() {
      this.modalHandler();
    },

    methods: {
      /**
       * Обработчик модальных окон.
       */
      modalHandler() {
        this.$on('modal', function ([namespace, name, data = {}]) {
          const modals = this.modals;

          if (
            modals.hasOwnProperty(namespace)
            && modals[namespace].hasOwnProperty(name)
          ) {
            const modal = modals[namespace][name];

            modal.show = !modal.show;

            // Если модальное окно закрылось, чистим его данные.
            if (modal.show === false) {
              data = {};
            }

            modal.data = data;
          }
        });
      }
    }
  })
};

Vue.use(eventBus);
