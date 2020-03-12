const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
}

const PAGES_FOLDER = path.join(PATHS.src, '/pages')

const createHtmlWebpackPlugins = pagesFolderPath => {
  const pugFilesRegex = /\.pug$/
  const pagesFolder = fs.readdirSync(pagesFolderPath)
  const pages = pagesFolder
    .map(pageFolder => {
      const pageFolderPath = path.join(pagesFolderPath, pageFolder)
      return fs.readdirSync(pageFolderPath)
    })
    .flat()
    .filter(file => pugFilesRegex.test(file))

  return pages.map(
    page =>
      new HtmlWebpackPlugin({
        template: path.join(pagesFolderPath, page.replace('.pug', ''), page),
        filename: `/pages/${page.replace('.pug', '.html')}`
      })
  )
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
          'style-loader',
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
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                PATHS.src + '/scss/mixins-lib.scss',
                PATHS.src + '/scss/variables.scss'
              ]
            }
          }
        ]
      },
      // css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
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
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(PATHS.src + '/images'),
        to: PATHS.dist
      }
    ]),
    ...createHtmlWebpackPlugins(PAGES_FOLDER)
  ]
}
