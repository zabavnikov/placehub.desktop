module.exports = {
  content: [
    'components/**/*.{js,vue}',
    'layouts/**/*.{js,vue}',
    'modules/**/*.{js,vue}',
    'pages/**/*.vue',
    'plugins/*.js',
  ],
  theme: {
    extend: {
      fontWeight: {
        semibold: 500,
      },
      fontSize: {
        base: '12px',
      },
    }
  },
  variants: {
    extend: {},
  },
}