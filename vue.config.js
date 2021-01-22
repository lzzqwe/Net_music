const path = require('path')
const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-pxtorem');
const pxtoviewport = require('postcss-px-to-viewport');

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
    css: {
        loaderOptions: {
          postcss: {
            plugins: [
              autoprefixer(),
              // pxtorem({
              //   rootValue: 54,
              //   propList: ['*']
              // })
              pxtoviewport({
                viewportWidth: 540
              })
            ]
          },
          less:{
            modifyVars: {
              // 直接覆盖变量
              'dialog-width': '470px',
              'dialog-border-radius': '12px',
              'dialog-message-font-size': '20px',
              'dialog-has-title-message-text-color': 'rgb(153,153,153)',
              'dialog-font-size':'20px',
              'dialog-message-padding':'30px',
              'tabs-bottom-bar-width': '50px',
              'tabs-bottom-bar-height': '9px',
              'tabs-line-height':'86px',
              'tabs-nav-background-color':'rgb(245,245,245)',
              'tab-font-size': '20px',
              'search-padding': '0 24px',
              'search-background-color':'rgb(245,245,245)',
              'search-content-background-color':'rgb(238,238,238)',
              'search-input-height':'52px',
              'search-action-font-size':'20px'
            }
          }
        }
      }

}
