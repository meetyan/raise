const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'electron-main',
  entry: {
    main: './src/main/main.js',
    preload: './src/main/preload.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    symlinks: false,
    cacheWithContext: false,
    alias: {
      '@': path.resolve('./src/main'),
    },
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
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{from: './src/main/assets', to: './assets'}],
    }),
  ],
}
