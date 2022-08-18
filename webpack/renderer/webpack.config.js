/**
 * The Webpack config which Electron's renderer uses
 */

const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')

const base = require('../webpack.base.config')

module.exports = (_, argv) => {
  console.log('webpack config argv =>', argv)

  const DEV = argv.mode === 'development'
  const PROD = !DEV

  return merge(base(argv), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          WEBPACK_DEV: DEV,
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('./src/index.ejs'),
        filename: 'index.html',
        chunks: ['main'],
        analyticsId: DEV
          ? 'de05c6be-10c6-4ef8-ad28-ae9a122e4d78' // dev
          : '065c72b6-f23a-4104-9327-60b0beef40ac', // prod
      }),
      PROD && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/^runtime.+\.js$/]),
    ].filter(Boolean),
  })
}
