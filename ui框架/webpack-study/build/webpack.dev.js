const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')


module.exports = webpackMerge.merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist/index.html'),
    },
    compress: true,
    port: 9000,
    // client: {
    //   process: 'overlay'
    // },
    proxy: {

    }
  }
})
