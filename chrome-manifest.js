/**
 * Dynamically generate manifest.json for Chrome Extension
 */

const fs = require('fs')
const path = require('path')

const pkg = require('./package.json')

module.exports = () => {
  const manifest = {
    name: pkg.chromeProductName,
    description: pkg.chromeDescription,
    version: pkg.version,
    manifest_version: 3,
    permissions: ['storage'],
    background: {
      service_worker: '/chrome/background.js',
    },
    action: {
      default_popup: 'index.html',
      default_icon: {
        16: '/static/16.png',
        32: '/static/32.png',
        48: '/static/48.png',
        128: '/static/128.png',
      },
    },
    icons: {
      16: '/static/16.png',
      32: '/static/32.png',
      48: '/static/48.png',
      128: '/static/128.png',
    },
  }

  fs.writeFileSync(path.resolve('./src/chrome/manifest.json'), JSON.stringify(manifest))
}
