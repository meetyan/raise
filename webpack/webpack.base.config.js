/**
 * The Webpack config which is shared by Electron's renderer and web
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const terserPluginConfig = {
  extractComments: false,
  terserOptions: {
    format: {
      comments: false,
      ascii_only: true,
    },
    compress: {
      drop_console: true,
    },
  },
}

const splitChunksConfig = {
  chunks: 'all',
  cacheGroups: {
    default: {
      chunks: 'async',
      priority: 10,
      minChunks: 2,
      reuseExistingChunk: true,
    },
    defaultVendors: false,
    commons: {
      chunks: 'all',
      test: /[\\/]node_modules[\\/]/,
      priority: 20,
      minChunks: 2,
      maxSize: 512 * 1024, // 512kb
      name: 'commons',
      filename: '[name].[chunkhash:8].js',
      reuseExistingChunk: true,
    },
    core: {
      chunks: 'all',
      test: /node_modules[\\/](?:core-js|regenerator-runtime|@babel|(?:style|css)-loader)/,
      priority: 30,
      name: 'core',
      filename: '[name].[chunkhash:8].js',
      reuseExistingChunk: true,
    },
    react: {
      chunks: 'all',
      test: /node_modules[\\/](?:react|react-dom|react-router-dom)/,
      priority: 100,
      name: 'react',
      filename: '[name].[chunkhash:8].js',
      reuseExistingChunk: true,
    },
  },
}

module.exports = argv => {
  const DEV = argv.mode === 'development'
  const PROD = !DEV

  return {
    devtool: DEV ? 'eval-cheap-module-source-map' : false,
    bail: PROD,
    cache: DEV
      ? {type: 'memory'}
      : {
          type: 'filesystem',
          buildDependencies: {config: [__filename]},
        },
    entry: ['./src/index.js'],
    output: {
      path: path.resolve('./dist'),
      filename: `[name]${PROD ? '.[contenthash:8]' : ''}.js`,
      chunkFilename: `[name]${PROD ? '.[contenthash:8]' : ''}.js`,
      publicPath: PROD ? './' : '',
    },
    resolve: {
      symlinks: false,
      cacheWithContext: false,
      alias: {
        '@': path.resolve('./src'),
        '@static': path.resolve('./static'),
        '@shared': path.resolve('./shared'),
        '@pkg': path.resolve('./package.json'),
      },
    },
    devServer: {
      static: path.resolve('./dist'),
      port: 3000,
    },
    optimization: PROD
      ? {
          runtimeChunk: 'single',
          chunkIds: 'deterministic',
          moduleIds: 'deterministic',
          minimizer: [
            new TerserPlugin(terserPluginConfig),
            new CssMinimizerPlugin({test: /\.css$/}),
          ],
          splitChunks: splitChunksConfig,
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve('./src')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportLocalsConvention: 'camelCase',
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [DEV ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportLocalsConvention: 'camelCase',
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 10kb
            },
          },
          generator: {
            filename: 'assets/images/[name].[hash:8][ext][query]',
          },
        },
      ],
    },
    plugins: [
      PROD &&
        new MiniCssExtractPlugin({
          filename: 'assets/styles/[name].[contenthash:8].css',
          chunkFilename: 'assets/styles/[name].[contenthash:8].css',
          ignoreOrder: true,
        }),
    ].filter(Boolean),
  }
}
