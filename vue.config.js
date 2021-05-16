module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tinkoff-pro/'
    : '/',
  productionSourceMap: false,
}
