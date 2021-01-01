const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    background: Path.resolve(__dirname, '../src/js/background.ts'),
    pupop: Path.resolve(__dirname, '../src/js/popup.ts'),
    content: Path.resolve(__dirname, '../src/js/content.ts')
  },
  node:{ fs: 'empty' },
  output: {
    path: Path.join(__dirname, '../extension/dest'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: false
  },
  plugins: [
    new CleanWebpackPlugin(['dest'], { root: Path.resolve(__dirname, '../extension') }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.(js|ts)$/,
        include: Path.resolve(__dirname, '../src/js'),
        loader: 'ts-loader'
      },
      {
        test: /\.art$/,
        loader: "art-template-loader"
      },
      {
        test: /\.s?css/i,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
