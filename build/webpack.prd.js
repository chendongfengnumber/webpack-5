const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge.merge(baseConfig, {
  mode: 'production',
  devtool: 'inline-source-map',
})
