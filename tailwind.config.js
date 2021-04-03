module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.{js,vue}',
      'layouts/**/*.{js,vue}',
      'modules/**/*.{js,vue}',
      'pages/**/*.vue',
      'plugins/*.js',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}