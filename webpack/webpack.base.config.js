const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
}

module.exports = {
  externals: {
    paths: PATHS
  },

  entry: {
    app: `${PATHS.src}/index.js`
  },

  output: {
    filename: '[name].js',
    path: PATHS.dist,
    publicPath: '/'
  },

  module: {
    rules: [
      // pug
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      // babel      
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      // scss
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.src + '/index.pug'
    })
  ]
}