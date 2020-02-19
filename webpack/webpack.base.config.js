const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
}

const PAGES_FOLDER = path.join(PATHS.src, '/pages')

const createHtmlWebpackPlugins = pagesFolder => {
  const pugFilesRegex = /\.pug$/ 
  const pages = fs.readdirSync(pagesFolder).filter(file => pugFilesRegex.test(file))
  
  return pages.map(page => new HtmlWebpackPlugin({
      template: path.join(pagesFolder, page),
      filename: page.replace('.pug', '.html')
    }))
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
      },
      // fonts
      {
        test: /\.woff|ttf|svg$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }, 
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    ...createHtmlWebpackPlugins(PAGES_FOLDER)
  ]
}