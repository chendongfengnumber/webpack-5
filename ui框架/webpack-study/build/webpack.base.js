const path = require('path')
// 自动替换html模板
const htmlWebpackPlugin = require('html-webpack-plugin')
// 分离bundle包分离出css文件(webpack4版本以上)
// 此插件不能与 loader 链中的 style-loader 一同使用。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清除dist缓存文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 处理vue问价
const { VueLoaderPlugin } = require('vue-loader')

const utils = require('./utils')
const externalConfig = JSON.parse(JSON.stringify(utils.externalConfig));  // 读取配置
utils.getExternalModules(externalConfig); // 获取到合适的路径（引用类型，自动改变）

module.exports = {
  entry: path.join(__dirname, '../src/main.js'),
  resolve: {
    // 使用别名,可以使用少些..
    alias: {
      '@': path.join(__dirname, '../src/')
    },
    // 保证引入文件不带后缀
    extensions: ['.vue', '.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,  'css-loader',
        ],
        include: [ path.join(__dirname, '../src/style') ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        // include: path.join(__dirname, '../src'),
        exclude: path.join(__dirname, '../node_modules')
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: path.join(__dirname, '../node_modules')
      }
    ]
  },
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    chunkFilename: 'chunks/[name].chunks.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname,'../public/index.html'),
      cdnConfig: externalConfig, // cdn配置
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
      chunkFilename: "[id].css"
    }),
    new VueLoaderPlugin()
  ]
}
