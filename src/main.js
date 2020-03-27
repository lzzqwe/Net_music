import Vue from 'vue'

import App from './App.vue'

import {
    Button,
    Tab,
    Tabs,
    Swipe,
    SwipeItem,
    Card,
    Loading,
    Toast,
    Dialog,
    Lazyload,
    Circle,
    PullRefresh
} from 'vant'

import router from './router'

import store from './store/index'
import 'amfe-flexible';
import 'common/stylus/index.styl'
import 'common/font/iconfont.css'

Vue.use(Button)
    .use(Tab)
    .use(Tabs)
    .use(PullRefresh)
    .use(Swipe)
    .use(SwipeItem)
    .use(Card)
    .use(Loading)
    .use(Toast)
    .use(Dialog)
    .use(Circle)
    .use(Lazyload, {
        loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577964300&di=7c09f36a6088ba96f19efc39baab8bb0&imgtype=jpg&er=1&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffbe4ef9f8e6fd3f723f5d33559af795bb370868712aca-z8IkyD_fw658'
    })
    // Vue.prototype.$toast = function(str) {
    //     return {
    //         fail: Toast.fail(str),
    //         success:Toast.success(str)
    //     }

// }
Vue.prototype.$dialog = function() {
    Dialog.confirm({
        title: '标题',
        message: '是否要清空所有搜索历史?',
        confirmButtonText: "清空",
        width: 240
    }).then(() => {
        this.$store.dispatch('clearSearchHistory')
    }).catch(() => {
        // on cancel
    });
}
Vue.prototype.$dialog_1 = function() {
    Dialog.confirm({
        title: '标题',
        message: '是否要清空播放列表?',
        confirmButtonText: "清空",
        width: 240
    }).then(() => {
        this.$store.dispatch('deleteSongList')
    }).catch(() => {
        // on cancel
    });
}
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')