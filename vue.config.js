const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tinkoff-pro/'
    : '/',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
}
}
