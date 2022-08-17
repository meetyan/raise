/**
 * The Webpack config which Electron's renderer uses
 */

const path = require('path')
const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')

const base = require('./webpack.base.config')

module.exports = (env, argv) => {
  console.log('webpack config argv =>', argv)

  const DEV = argv.mode === 'development'
  const PROD = !DEV

  const baseConfig = base(env, argv)

  return merge(baseConfig, {
    plugins: [
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
