/**
 * The Webpack config which chrome extension project uses
 */

const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const base = require('../webpack.base.config')
const generateChromeManifest = require('../../chrome-manifest')

generateChromeManifest()

module.exports = (_, argv) => {
  console.log('webpack config argv =>', argv)

  const DEV = argv.mode === 'development'

  return merge(base(argv), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          WEBPACK_DEV: DEV,
          isChrome: true,
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('./src/index.ejs'),
        filename: 'index.html',
        chunks: ['main'],
        analyticsId: DEV
          ? 'de05c6be-10c6-4ef8-ad28-ae9a122e4d78' // dev
          : 'a8af4888-2337-4ddb-af83-ae84546316dc', // prod
      }),
      new CopyWebpackPlugin({
        patterns: [
          {from: './static/chrome', to: './chrome'},
          {from: './src/manifest.json', to: './manifest.json'},
        ],
      }),
    ],
  })
}
