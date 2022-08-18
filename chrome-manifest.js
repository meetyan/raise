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
    permissions: [],
    action: {
      default_popup: 'index.html',
      default_icon: {
        16: '/chrome/16.png',
        32: '/chrome/32.png',
        48: '/chrome/48.png',
        128: '/chrome/128.png',
      },
    },
    icons: {
      16: '/chrome/16.png',
      32: '/chrome/32.png',
      48: '/chrome/48.png',
      128: '/chrome/128.png',
    },
  }

  fs.writeFileSync(path.resolve('./src/manifest.json'), JSON.stringify(manifest))
}
