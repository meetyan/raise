module.exports = {
  presets: [['@babel/preset-env'], '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'import',
      {libraryName: 'licia', libraryDirectory: '', camel2DashComponentName: false},
      'licia',
    ],
  ],
}
