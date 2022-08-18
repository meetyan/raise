/**
 * The webpack config which Electron main uses
 */

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'electron-main',
  entry: {
    main: path.resolve('./electron/main.js'),
    preload: path.resolve('./electron/preload.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /.node$/,
        loader: 'node-loader',
      },
    ],
  },
  resolve: {
    symlinks: false,
    cacheWithContext: false,
    alias: {
      '@shared': path.resolve('./shared'),
      '@pkg': path.resolve('./package.json'),
    },
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{from: './static', to: './static'}],
    }),
  ],
}
