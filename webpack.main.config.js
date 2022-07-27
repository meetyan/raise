const path = require('path')

module.exports = {
  entry: './src/main/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  target: 'electron-main',
}
