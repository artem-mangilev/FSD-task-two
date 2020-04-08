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

const loadersForCSS = ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']

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
    cards: './pages/cards/cards.js',
    'colors-and-text': './pages/colors-and-text/colors-and-text.js',
    'form-elements': './pages/form-elements/form-elements.js',
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
          ...loadersForCSS,
          'sass-loader',
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
        use: loadersForCSS,
      },
      // fonts
      {
        test: /\.woff|ttf|svg$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
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
