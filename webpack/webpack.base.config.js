const { resolve, join } = require('path')
const { readdirSync, readdir } = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: join(__dirname, '../src'),
  dist: join(__dirname, '../dist'),
}

const PAGES_FOLDER = join(PATHS.src, '/pages')
const IMAGES_FOLDER = join(PATHS.src, '/images')
const UPLOADS_FOLDER = join(PATHS.src, '/uploads')
const FONTS_FOLDER = join(PATHS.src, '/fonts')

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

const createEntryPoints = () => {
  const entryPoints = {}

  const pageNames = readdirSync(PAGES_FOLDER)

  pageNames.forEach(
    (page) => (entryPoints[page] = join(PAGES_FOLDER, page, `${page}.js`))
  )

  return entryPoints
}

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
      '@images': resolve(PATHS.src, 'images'),
      '@uploads': resolve(PATHS.src, 'uploads'),
    },
  },

  context: PATHS.src,

  entry: createEntryPoints(),

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
        test: /\.(woff|ttf|svg)$/,
        exclude: [IMAGES_FOLDER, UPLOADS_FOLDER],
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts',
        },
      },
      // images
      {
        test: /.(png|jpg|gif|svg)$/,
        exclude: FONTS_FOLDER,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
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
    ...createHtmlWebpackPlugins(PAGES_FOLDER),
  ],
}
