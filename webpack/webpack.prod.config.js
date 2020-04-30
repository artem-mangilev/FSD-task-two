const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const GH_PAGES_PUBLIC_PATH = '/FSD-task-two/'

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',

  output: {
    filename: '[name].js',
    path: baseWebpackConfig.externals.paths.dist,
    publicPath: GH_PAGES_PUBLIC_PATH,
  },
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
