const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'electron-main',
  entry: {
    main: path.join(__dirname, '../electron/main.js'),
    preload: path.join(__dirname, '../electron/preload.js'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
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
      '@shared': path.join(__dirname, '../shared'),
      '@pkg': path.join(__dirname, '../package.json'),
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
