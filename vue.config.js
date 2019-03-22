// vue.config.js
module.exports = {
  publicPath: '/',
  devServer: {
    // open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'https://pic.sogou.com/pics/json.jsp',
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }, // 设置代理
    before: app => {}
  }
}
