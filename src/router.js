import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//路由懒加载
/**
 * 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
 * 如果我们能把不同路由对应的组件分割成不同的代码块，
 * 然后当路由被访问的时候才加载对应组件，这样就更加高效了。
 * 结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。
 */
const NetRecommend = (resolve) => {
    import('components/NetRecommend/NetRecommend').then((module) => {
        resolve(module)
    })
}
const NetSinger = (resolve) => {
    import('components/NetSinger/NetSinger').then((module) => {
        resolve(module)
    })
}
const NetRank = (resolve) => {
    import('components/NetRank/NetRank').then((module) => {
        resolve(module)
    })
}
const NetSearch = (resolve) => {
    import('components/NetSearch/NetSearch').then((module) => {
        resolve(module)
    })
}
const SingerDetail = (resolve) => {
    import('components/SingerDetail/SingerDetail').then((module) => {
        resolve(module)
    })
}
const NetDisc = (resolve) => {
    import('components/NetDisc/NetDisc').then((module) => {
        resolve(module)
    })
}
const NetMine = (resolve) => {
    import('components/NetMine/NetMine').then((module) => {
        resolve(module)
    })
}
const TopList = (resolve) => {
    import('components/TopList/TopList').then((module) => {
        resolve(module)
    })
}
const NetVideo = (resolve) => {
    import('components/NetVideo/NetVideo').then((module) => {
        resolve(module)
    })
}

const VideoDetail = (resolve) => {
    import('components/VideoDetail/VideoDetail').then((module) => {
        resolve(module)
    })
}
const NetList = (resolve) => {
    import('components/NetList/NetList').then((module) => {
        resolve(module)
    })
}

export default new Router({
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: NetRecommend,
            children: [{
                path: ':id',
                component: NetDisc
            }]
        },
        {
            path: '/singer',
            name: 'singer',
            component: NetSinger,
            children: [{
                path: ":id",
                component: SingerDetail
            }]
        },
        {
            path: '/mine',
            name: 'mine',
            component: NetMine
        },
        {
            path: '/videos',
            name: 'videos',
            component: NetVideo,
            children:[{
              path:':id',
              component:VideoDetail
            }]
        },
        {
            path: '/list',
            name: 'list',
            component: NetList,
            children: [{
                path: ':id',
                component: NetDisc
            }]
        },
        {
            path: '/rank',
            name: 'rank',
            component: NetRank,
            children: [{
                path: ":id",
                component: TopList
            }]
        },
        {
            path: '/search',
            name: 'search',
            component: NetSearch,
            children: [{
                path: ":id",
                component: SingerDetail
            }]
        }
    ]
})