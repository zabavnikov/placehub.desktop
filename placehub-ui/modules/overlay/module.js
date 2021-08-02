const { resolve } = require('path')

export default function(moduleOptions) {
  const defaultOptions = {
    placement: 'center',
    width: 'auto',
    offset: '16px',
  };

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'overlay.js',
    options: Object.assign({}, defaultOptions, moduleOptions)
  })
}

module.exports.meta = require('./package.json')