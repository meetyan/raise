const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'electron-main',
  entry: './electron/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
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
  // node: {
  //   __dirname: false,
  //   __filename: false,
  // },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{from: './electron/assets', to: './assets'}],
    }),
  ],
}
