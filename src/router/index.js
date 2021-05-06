import Vue from 'vue';
import VueRouter from 'vue-router';
const NetHome = (resolve) => {
    import('../views/NetHome/index.vue').then((moudle) => resolve(moudle));
}
const SongsList = (resolve) => {
    import('../views/NetList/index.vue').then((module) => resolve(module));
}
const SongListDetail = (resolve) => {
    import('../views/SongListDetail/index.vue').then((module) => resolve(module));
}
const DailylRecommend = (resolve) => {
    import('../views/DailylRecommend/index.vue').then((module) => resolve(module));
}
const NetLogin = (resolve) => {
    import('../views/NetLogin/index.vue').then((module) => resolve(module));
}
const NetRank = (resolve) => {
    import('../views/NetRank/index.vue').then((module) => resolve(module));
}
const PersonalFm = (resolve) => {
    import('../views/PersonalFm/index.vue').then((module) => resolve(module));
}
const NetSearch = (resolve) => {
    import('../views/NetSearch/index.vue').then((module) => resolve(module));
}
const NetMe = (resolve) => {
    import('../views/NetMe/index.vue').then((module) => resolve(module));
}
const NetComment = (resolve) => {
    import('../views/NetComment/index.vue').then((module) => resolve(module));
}
const NetMv = (resolve) => {
    import('../views/NetMv/index.vue').then((module) => resolve(module));
}
const MvPlayer = (resolve) => {
    import('../views/MvPlayer/index.vue').then((module) => resolve(module));
}
Vue.use(VueRouter);
const routes = [{
    path: '/',
    name: 'NetHome',
    component: NetHome,
    meta: { keepAlive: false }
}, {
    path: '/rank',
    name: 'NetRank',
    component: NetRank,
    meta: { keepAlive: false },
    children: [{
        path: ':id',
        component: SongListDetail,
        meta: { keepAlive: false }
    }]
},
{
    path: '/playlistCollection',
    name: 'SongsList',
    component: SongsList,
    meta: { keepAlive: false },
    children: [{
        path: ':id',
        component: SongListDetail,
        meta: { keepAlive: false },
    }]
}, {
    path: '/songrcmd',
    name: 'DailylRecommend',
    component: DailylRecommend,
    meta: { keepAlive: false },
}, {
    path: '/login',
    name: 'NetLogin',
    component: NetLogin,
    meta: { keepAlive: false }
}, {
    path: '/privatefm',
    name: 'PersonalFm',
    component: PersonalFm,
    meta: { keepAlive: false },
},
{
    path: '/search',
    name: 'NetSearch',
    component: NetSearch,
    props: (route) => ({ keyword: route.query.keyword }),
    meta: { keepAlive: false },
},
{
    path: '/me',
    name: 'NetMe',
    component: NetMe,
    meta: { keepAlive: false },
},
{
    path: '/comment',
    name: 'NetComment',
    component: NetComment,
    meta: { keepAlive: false },
},
{
    path: '/mv',
    name: 'NetMv',
    component: NetMv,
    meta: { keepAlive: false },
    children: [{
        path: ':id',
        name: "MvPlayer",
        component: MvPlayer,
        meta: { keepAlive: false }
    }]
}
]
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err);
}

const router = new VueRouter({
    routes
})
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.netToken
//   if(to.path==='/login' || to.path==='/') {
//     next()
//   } else {
//     isLogin ? next() : next('/login')
//   }
// })
router.beforeEach((to, from, next) => {
    // console.log(to, from)
    if (to.path === '/login' || to.path === '/') {
        next()
    } else {
        next()
    }
})
router.beforeResolve((to, from, next) => {
    // console.log(to, from)
    next()
})
export default router
