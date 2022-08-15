const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'electron-main',
  entry: {
    main: path.join(__dirname, '../src/main/main.js'),
    preload: path.join(__dirname, '../src/main/preload.js'),
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
      '@shared': path.resolve('./src/shared'),
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
