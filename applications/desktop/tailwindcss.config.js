/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
    purge: {
      // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
      enabled: process.env.NODE_ENV === 'production',
      content: [
        'assets/scss/**/*.scss',
        'components/**/*.{vue,js}',
        'layouts/desktop/**/*.vue',
        'modules/**/components/**/*.{vue,js}',
        'modules/**/_desktop/**/*.{vue,js}',
        'pages/**/*.vue',
        'plugins/**/*.js',
      ]
    },
    theme: {},
    variants: {},
    plugins: [],
  }