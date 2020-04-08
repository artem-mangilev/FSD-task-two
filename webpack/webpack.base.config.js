const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
}

const PAGES_FOLDER = path.join(PATHS.src, '/pages')

const createHtmlWebpackPlugins = (pagesFolderPath) => {
  const pugFilesRegex = /\.pug$/
  const pagesFolder = fs.readdirSync(pagesFolderPath)
  const pages = pagesFolder
    .map((pageFolder) => {
      const pageFolderPath = path.join(pagesFolderPath, pageFolder)
      return fs.readdirSync(pageFolderPath)
    })
    .flat()
    .filter((file) => pugFilesRegex.test(file))

  return pages.map(
    (page) =>
      new HtmlWebpackPlugin({
        template: path.join(pagesFolderPath, page.replace('.pug', ''), page),
        filename: page.replace('.pug', '.html'),
        chunks: [page.replace('.pug', '')],
      })
  )
}

module.exports = {
  externals: {
    paths: PATHS,
  },

  resolve: {
    alias: {
      '@': PATHS.src,
      '@components': path.resolve(PATHS.src, 'components'),
      '@layout': path.resolve(PATHS.src, 'layout'),
      '@fonts': path.resolve(PATHS.src, 'fonts'),
    },
  },

  context: PATHS.src,

  entry: {
    cards: `${PATHS.src}/pages/cards/cards.js`,
    'colors-and-text': `${PATHS.src}/pages/colors-and-text/colors-and-text.js`,
    'form-elements': `${PATHS.src}/pages/form-elements/form-elements.js`,
  },

  output: {
    filename: '[name].js',
    path: PATHS.dist,
    publicPath: '/',
  },

  module: {
    rules: [
      // pug
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            root: PATHS.src,
          },
        },
      },
      // babel
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
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
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: PATHS.src + '/utilities/*.scss',
            },
          },
        ],
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
              sourceMap: true,
            },
          },
        ],
      },
      // fonts
      {
        test: /\.woff|ttf|svg$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          context: 'fonts/',
          outputPath: 'fonts',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(PATHS.src, '/images'),
        to: path.join(PATHS.dist, '/images'),
      },
      {
        from: path.join(PATHS.src, '/uploads'),
        to: path.join(PATHS.dist, '/images'),
      },
    ]),
    ...createHtmlWebpackPlugins(PAGES_FOLDER),
  ],
}
