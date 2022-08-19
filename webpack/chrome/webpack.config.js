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
    /**
     * The field `devtool` fixed unsafe-eval error in dev mode.
     * See https://stackoverflow.com/questions/48047150/chrome-extension-compiled-by-webpack-throws-unsafe-eval-error
     */
    devtool: DEV ? 'cheap-module-source-map' : false,
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
        isChrome: true,
        analyticsDomain: DEV ? 'raise-dev.curve.to' : 'raise-chrome.curve.to',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {from: './static/chrome', to: './static'},
          {from: './src/chrome/manifest.json', to: './manifest.json'},
          {from: './src/chrome', to: './chrome', globOptions: {ignore: ['**/*/manifest.json']}},
        ],
      }),
    ],
  })
}
