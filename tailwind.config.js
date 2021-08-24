module.exports = {
  mode: 'jit',
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
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}