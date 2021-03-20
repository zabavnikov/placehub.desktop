const deepMerge = require('deepmerge');
const nuxt = require('./nuxt.config.js');

module.exports = deepMerge(nuxt, {
  env: {
    DEVICE: process.env.DEVICE,
  },

  buildDir: '.nuxt/desktop',

  dir: {
    pages: 'applications/desktop/pages',
    layouts: 'applications/desktop/layouts'
  },

  plugins: ['./applications/desktop/plugins/components'],

  tailwindcss: {
    configPath: 'applications/desktop/tailwindcss.config.js',
  },
});
