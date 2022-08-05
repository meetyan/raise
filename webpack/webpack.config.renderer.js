const path = require('path')
const webpack = require('webpack')

// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  console.log('webpack config argv =>', argv)
  const DEV = argv.mode === 'development'
  const PROD = !DEV

  const config = {
    devtool: DEV ? 'eval-cheap-module-source-map' : false,
    bail: PROD,
    cache: DEV
      ? {type: 'memory'}
      : {
          type: 'filesystem',
          buildDependencies: {config: [__filename]},
        },
    entry: ['./src/renderer/index.js'],
    output: {
      path: path.resolve('./dist'),
      filename: `[name]${PROD ? '.[contenthash:8]' : ''}.js`,
      chunkFilename: `[name]${PROD ? '.[contenthash:8]' : ''}.js`,
      publicPath: PROD ? './' : '',
      clean: true,
    },
    resolve: {
      symlinks: false,
      cacheWithContext: false,
      alias: {
        '@': path.resolve('./src/renderer'),
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
          include: [path.resolve('./src/renderer')],
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
      new webpack.DefinePlugin({
        WEBPACK_DEV: DEV,
      }),
      // new CopyWebpackPlugin({
      //   patterns: [{from: './public', to: './public'}],
      // }),
      new HtmlWebpackPlugin({
        template: 'src/renderer/index.html',
        chunks: ['main'],
      }),
      PROD &&
        new MiniCssExtractPlugin({
          filename: 'assets/styles/[name].[contenthash:8].css',
          chunkFilename: 'assets/styles/[name].[contenthash:8].css',
          ignoreOrder: true,
        }),
      PROD && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/^runtime.+\.js$/]),
      PROD && new WebpackManifestPlugin(),
    ].filter(Boolean),
  }

  return handleConfig(config, argv)
}

function handleConfig(config, argv) {
  if (!argv.speed) return config

  const smp = new SpeedMeasurePlugin()
  return smp.wrap(config)
}

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
