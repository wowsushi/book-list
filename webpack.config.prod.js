const path = require('path') // resolve path
const HtmlWebpackPlugin = require('html-webpack-plugin') // create file.html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extract css to files
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin') // minify js
const packageJson = require('./package.json')

module.exports = {
  mode: 'production',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // import without .ts or .tsx etc....
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  entry: {
    index: './src/index.tsx',
  },
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash:8].bundle.js', // for production use [contenthash], for development use [hash]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      title: packageJson.description,
    }),
  ].filter((plugin) => !!plugin),

  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    moduleIds: 'deterministic',
    runtimeChunk: 'single', // share same code between js files
    splitChunks: {
      name: 'runtime',
      chunks: 'all',
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
              modules: true,
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
        exclude: /(node_modules|build)/,
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
