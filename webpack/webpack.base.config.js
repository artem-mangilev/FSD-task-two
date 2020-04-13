const { resolve, join } = require('path')
const { readdirSync } = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: join(__dirname, '../src'),
  dist: join(__dirname, '../dist'),
}

const PAGES_FOLDER = join(PATHS.src, '/pages')

// this code assumes that the page file has the same name as containing folder
const createHtmlWebpackPlugins = (pagesFolderPath) =>
  readdirSync(pagesFolderPath).map(
    (pageFolder) =>
      new HtmlWebpackPlugin({
        template: join(pagesFolderPath, pageFolder, `${pageFolder}.pug`),
        filename: `${pageFolder}.html`,
        chunks: [pageFolder],
      })
  )

const loadersForCSS = [
  'style-loader',
  MiniCssExtractPlugin.loader,
  'css-loader',
]

module.exports = {
  externals: {
    paths: PATHS,
  },

  resolve: {
    alias: {
      '@': PATHS.src,
      '@components': resolve(PATHS.src, 'components'),
      '@layout': resolve(PATHS.src, 'layout'),
      '@fonts': resolve(PATHS.src, 'fonts'),
    },
  },

  context: PATHS.src,

  entry: {
    cards: './pages/cards/cards.js',
    'colors-and-text': './pages/colors-and-text/colors-and-text.js',
    'form-elements': './pages/form-elements/form-elements.js',
    'headers-and-footers': './pages/headers-and-footers/headers-and-footers.js',
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
        from: join(PATHS.src, '/images'),
        to: join(PATHS.dist, '/images'),
      },
      {
        from: join(PATHS.src, '/uploads'),
        to: join(PATHS.dist, '/images'),
      },
    ]),
    ...createHtmlWebpackPlugins(PAGES_FOLDER),
  ],
}
