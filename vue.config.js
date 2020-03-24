const path = require('path')
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
            .set('common', resolve('src/common'))
            .set('base', resolve('src/base'))
    },
    devServer: {
        proxy: {
            '/': { // 匹配所有以 '/api'开头的请求路径
                target: 'http://127.0.0.1:3000', // 代理目标的基础路径
                changeOrigin: true, // 支持跨域
                pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                    '^/': ''
                }
            }
        },
        open: true,
        host: '0.0.0.0', // 将 host:'localhost' 改成 host:'0.0.0.0',
        port: 8080
    },
    css: {
        loaderOptions: {
          postcss: {
            plugins: [
              autoprefixer(),
              pxtorem({
                rootValue: 37.5,
                propList: ['*']
              })
            ]
          }
        }
      }

}