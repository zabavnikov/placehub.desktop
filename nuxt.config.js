const routes = require('./routes');

module.exports = {
  server: {
    host: process.env.APP_HOST
  },

  head: {
    titleTemplate: title => (title ? `${title} — ` : '') + 'PlaceHub - сервис микроблогов для путешественников',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
    ],
    link: [
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap'}
    ],
  },

  css: [
    './assets/scss/index.scss'
  ],

  plugins: [
    './plugins/axios.js',
    './plugins/event-bus.js',
    './plugins/directives.js',
    './plugins/components.js',
  ],

  buildModules: [
    'nuxt-graphql-request',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    ['@nuxtjs/laravel-echo', {
      broadcaster: 'pusher',
      authEndpoint: `${process.env.API_URL}/api/broadcasting/auth`,
      wsHost: process.env.LARAVEL_WEBSOCKETS_HOST,
      wsPort: process.env.LARAVEL_WEBSOCKETS_PORT,
      key: process.env.LARAVEL_WEBSOCKETS_APP_KEY,
      authModule: true,
      forceTLS: false,
      disableStats: true,
    }],
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '~/placehub-ui/modules/overlay'
  ],


  router: {
    extendRoutes: (nuxtRoutes, resolve) => routes(nuxtRoutes, resolve)
  },

  /*
    Auth module configuration
   */
  auth: {
    plugins: [
      '~/plugins/graphql-auth'
    ],
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_URL + '/api/users/login',
            method: 'post',
          },
          logout: {
            url: process.env.API_URL + '/api/users/logout',
            method: 'post'
          },
          user: {
            url: process.env.API_URL + '/api/users/me',
            method: 'post',
            propertyName: false
          }
        },
        token: {
          property: 'token',
          maxAge: 60 * 60
        },
        user: {
          property: false,
        },
      }
    },
    redirect: {
      home: false,
    }
  },

  /*
    Toast module configuration
   */
  toast: {
    duration: 3000,
  },

  tailwindcss: {
    viewer: false,
  },

  graphql: {
    clients: {
      default: {
        endpoint: process.env.GRAPHQL_URL,
      },
    },
  },
};
