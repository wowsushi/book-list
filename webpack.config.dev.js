const path = require('path') // resolve path
const HtmlWebpackPlugin = require('html-webpack-plugin') // create file.html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extract css to files
const TerserPlugin = require('terser-webpack-plugin') // minify js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const packageJson = require('./package.json')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    host: '0.0.0.0',
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // import without .ts or .tsx etc....
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  entry: {
    index: path.join(__dirname, 'src/index.tsx'),
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash:8].bundle.js', // for production use [contenthash], for development use [hash]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      title: packageJson.description,
    }),
  ],

  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
}
