# NetMusic

模仿的网易云移动端播放器  采用 flexbox 和 position 布局  

[在线播放地址](http://8.136.18.82/#/)

# 如何使用和安装

> NetMusic    前端

```
git clone https://github.com/lzzqwe/Net_music.git //下载NetMusic

cd NetMusic //进入NetMusic 目录

npm install //安装依赖


npm run serve //运行NetMusic
// 当打包时
npm run build //打包NetMusic  
```

> 后台服务器      

[网易云音乐Node.js版API]( https://binaryify.github.io/NeteaseCloudMusicApi/#/ )

```
下载 NeteaseCloudMusicApi

npm install // 安装依赖

node app.js // 服务端运行 访问 http://localhost:3000
```

###  运行NetMusic无法获取数据 请检查后台是否启动

# 技术栈

+ Vue 2.6(渐进式 JavaScript 框架)

+ Vuex(状态管理)

+ Vue-Router( 路由管理器 )

+  ES 6 / 7 （JavaScript 语言的下一代标准）

+ less (css预处理器) 

+ Axios（AJAX网络请求）

+ Vant-UI (移动端ui框架)

+ better-scroll( better-scroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件 )

+   vw自适应移动端

+   postcss-px-to-viewport( PostCSS的插件，用于将像素单元生成vw单位 )      

+  store(浏览器存储)

+  webpack

  # 项目结构目录

  ```
  │ - vue.config.js  // vue-cli 配置文件
  ├─public                                                 //静态资源目录
  │      index.html                                   //入口html文件
  │      netease_cloudmusic_128px_1186871_easyicon.net.ico  //ico图标
  └─src         //项目源码目录                                     
      │  App.vue  //根组件
      │  main.js  //入口主文件
      │  router.js  //路由文件                          
      ├─api    //数据交互目录
      │      ajax.js //axios封装  
      │      index.js //api接口
      │      lyric.js // api接口
      ├─base //公共基础组件目录  
      │  ├─BaseHead
      │  │      BaseHead.vue //头部组件
      │  │      chart-icon.svg  
      │  ├─BaseList  
      │  │      BaseList.vue // 歌单列表组件
      │  │      
      │  ├─BaseScroll
      │  │      BaseScroll.vue //滚动组件
      │  │      
      │  ├─BaseTab
      │  │      BaseTab.vue //路由切换组件
      │  │      
      │  ├─ClassifyTab
      │  │      ClassifyTab.vue //歌手分类tab组件
      │  │      
      │  ├─ListView
      │  │      ListView.vue //歌手列表组件
      │  │      
      │  ├─MusicList
      │  │      MusicList.vue //音乐组件
      │  │      
      │  ├─MvComment 
      │  │      MvComment.vue // 评论组件
      │  │      
      │  ├─NoResult
      │  │      NoResult.vue //无结果组件
      │  │      timg.jpg
      │  │      
      │  ├─PlayList
      │  │      PlayList.less
      │  │      PlayList.vue  //播放列表组件
      │  │      
      │  ├─ProgressBar
      │  │      ProgressBar.vue //进度条组件
      │  │      
      │  ├─SearchBox
      │  │      SearchBox.vue //搜索框组件
      │  │      
      │  ├─SearchSuggest
      │  │      SearchSuggest.vue //搜索建议组件
      │  │      
      │  ├─SlideBar
      │  │      SlideBar.vue //导航组件
      │  │      
      │  ├─SongList
      │  │      SongList.vue //歌曲列表组件
      │  │      
      │  └─VideoPlayer
      │          VideoPlayer.vue //视频播放器组件
      │          
      ├─common
      │  ├─font //字体图标
      │  │      iconfont.css
      │  │      iconfont.eot
      │  │      iconfont.svg
      │  │      iconfont.ttf
      │  │      iconfont.woff
      │  │      iconfont.woff2
      │  │      
      │  ├─js 
      │  │      cache.js //数据存储
      │  │      config.js //播放顺序的配置
      │  │      dom.js //dom操作
      │  │      mixin.js //混合
      │  │      song.js //数据处理
      │  │      until.js //工具函数
      │  │      
      │  └─less
      │          base.less //基础样式
      │          font.less //字体样式
      │          index.less //入口文件
      │          mixin.less // 样式混合
      │          reset.less // 样式初始化
      │          variable.less //样式主题
      │          
      ├─components // 页面路由组件目录
      │  ├─NetDisc
      │  │      NetDisc.vue  //推荐歌单详情组件
      │  │      
      │  ├─NetList
      │  │      NetList.vue //歌单列表组件
      │  │      
      │  ├─NetMine
      │  │      NetMine.vue //用户中心组件
      │  │      
      │  ├─NetPlayer 
      │  │      disc.png
      │  │      needle.png
      │  │      NetPlayer.less
      │  │      NetPlayer.vue //播放器组件
      │  │      
      │  ├─NetRank
      │  │      NetRank.vue //排行组件
      │  │      
      │  ├─NetRecommend
      │  │      1.png
      │  │      2.png
      │  │      3.png
      │  │      NetRecommend.vue //推荐页面组件
      │  │      
      │  ├─NetSearch
      │  │      NetSearch.less
      │  │      NetSearch.vue // 搜索组件
      │  │      
      │  ├─NetSinger
      │  │      needle.png
      │  │      NetSinger.vue //歌手组件
      │  │      
      │  ├─NetVideo
      │  │      NetVideo.vue //视频组件
      │  │      
      │  ├─SingerDetail
      │  │      SingerDetail.vue //歌手详情组件
      │  │      
      │  ├─TopList
      │  │      TopList.vue //排行榜详情组件
      │  │      
      │  └─VideoDetail
      │          VideoDetail.vue //视频播放详情组件
      │          
      └─store //Vuex状态管理目录
              actions.js //配置 actions
              getters.js //配置 getters
              index.js //引用 vuex，创建 store
            mutation-type.js  // 定义常量名 mutations 
              mutation.js // 配置 mutations
  ```

# 实现功能

- 播放器
  
- 播放历史
  
- 歌词滚动
  
- 搜索
  
- 视频播放
  
- 上拉加载
  
- 查看评论
  
- 歌单详情
  
- 歌手详情
  
- 排行榜
  
- 歌曲收藏 取消
  
- 歌曲 播放 暂停 上一曲 下一曲 歌曲列表的播放顺序切换     
  
  # 项目界面欣赏
  
  ### 推荐
  
  ###  ![](https://github.com/lzzqwe/Net_music/blob/master/screenshot/1.png)
  
  ![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/2.png )
  
### 视频以及视频详情

![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/3.png )  ![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/4.png )

### 歌单列表组件

![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/5.png )

### 歌单详情组件

![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/6.png )

![7]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/7.png )

### 播放器组件

![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/9.png )

![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/11.png )

![](https://github.com/lzzqwe/Net_music/blob/master/screenshot/8.png)

### 评论组件

![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/10.png )

### 歌手组件

![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/12.png )

### 个人中心组件

![]( https://github.com/lzzqwe/Net_music/blob/master/screenshot/13.png )

# 免责声明

本站音频文件来自各网站接口，本站不会修改任何音频文件

音频版权来自各网站，本站只提供数据查询服务，不提供任何音频存储和贩卖服务

本项目仅为前端练手项目，请勿用作商业用途，请勿通过本项目下载盗版歌曲资源，否则后果自负！