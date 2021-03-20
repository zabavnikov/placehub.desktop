import Vue from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

Vue.directive('tooltip', {
  bind: function (element, binding, vnode) {
    const options = {
      content: binding.value,
      theme:   'dark'
    };

    const placement = [
      'top', 'right', 'bottom', 'left',
      'top-start', 'right-start', 'bottom-start', 'left-start',
      'top-end', 'right-end', 'bottom-end', 'left-end',
    ];

    if (binding.arg !== undefined) {
      if (placement.includes(binding.arg)) {
        options.placement = binding.arg;
      }
    }

    tippy(element, options);
  },

  update(element, binding) {
    if (binding.value !== binding.oldValue) {
      element._tippy.setProps({
        content: binding.value,
      });
    }
  },

  unbind: function (element) {
    element._tippy.destroy();
  }
});

/**
 * Выводим модальное окно, при попытке совершить действие
 * разрешенное только авторизованным пользователям.
 */
let loggedIn;

Vue.directive('loggedIn', {
  bind: function (element, binding, vnode) {
    loggedIn = event => {
      if (!vnode.context.$auth.loggedIn) {
        vnode.context.$toast.info('Войдите в профиль.');
        event.preventDefault();
      }
    };

    vnode.context.$on('click', function () {
      console.log(1)
    });

    element.addEventListener('click', loggedIn);
  },

  unbind: function (element) {
    element.removeEventListener('click', loggedIn)
  }
});

Vue.directive('click-outside', {
  bind: function (el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) {
        warn += `Found in component '${compName}'`
      }

      console.warn(warn)
    }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    // add Event Listeners
    document.addEventListener('click', handler)
  },

  unbind: function (el, binding) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null

  }
});
