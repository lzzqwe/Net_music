import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import {_parseNum} from './filter/index.js'
import './common/css/reset.css'
import './common/font/iconfont.css'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

import 'vant/lib/dialog/style/less';
import 'vant/lib/tabs/style/less'
import 'vant/lib/search/style/less'
import {
  Swipe,
  SwipeItem,
  Col,
  Row, Tab,
  Tabs,
  Uploader,
  Image as VanImage,
  Form, Field,
  Button, Dialog,
  NoticeBar,
  Switch,
  PullRefresh,
  List,
  Toast,
  Cell,
  CellGroup,
  Lazyload,
  Search,
  Skeleton,
  Overlay,
  ActionSheet,
  Notify
} from 'vant';

Vue.use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Uploader)
  .use(Tabs)
  .use(VanImage)
  .use(Col)
  .use(Row)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Dialog)
  .use(NoticeBar)
  .use(Switch)
  .use(PullRefresh)
  .use(List)
  .use(Cell)
  .use(CellGroup)
  .use(Toast)
  .use(Search)
  .use(Skeleton)
  .use(Overlay)
  .use(Notify)
  .use(ActionSheet)
  .use(Lazyload, {
    lazyComponent: true,
  })
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(VueMeta)
Vue.filter('parseNum',_parseNum)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
