# NetMusic

模仿的网易云移动端播放器  采用 flexbox 和 position 布局  

[在线播放地址]( http://8.136.18.82/#/ )
[代码地址](https://github.com/lzzqwe/Net_music)

# 如何使用和安装

> NetMusic    前端

```
git clone https://github.com/lzzqwe/Net_music.git //下载NetMusic

cd NetMusic //进入NetMusic 目录

npm install //安装依赖

npm run serve //运行NetMusic

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

+ Vue-cli (Vue脚手架工具)
+ Vue 2.6(渐进式 JavaScript 框架)
+ Vuex(状态管理)
+ Vue-Router( 路由管理器 )
+  ES 6 / 7 （JavaScript 语言的下一代标准）
+ less (css预处理器) 
+ Axios（AJAX网络请求）
+ Vant-UI (移动端ui框架)
+ vw 移动端自适应布局
+ better-scroll( better-scroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件 )
+  FastClick（解决移动端 300ms 点击延迟）       
### 首页  
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/283c2566ce774d968d3ef71a8e771fab~tplv-k3u1fbpfcp-zoom-1.image)
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6397e70033b249749106755bee9fdad5~tplv-k3u1fbpfcp-zoom-1.image)
### 视频以及视频详情
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29bc8b96634445df933667781d8465e0~tplv-k3u1fbpfcp-zoom-1.image )
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3762e2c20f04446c90d60e62332d2dda~tplv-k3u1fbpfcp-zoom-1.image )
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2467c588d53c4437bae547a80f9b00de~tplv-k3u1fbpfcp-zoom-1.image )
### 歌单列表组件
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/860ced293668477c9d70fd64bd15ee0e~tplv-k3u1fbpfcp-zoom-1.image )
### 歌单详情组件
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3b283de98ef4d1ca57f52c709ca811d~tplv-k3u1fbpfcp-zoom-1.image )
### 播放器组件
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d3aa84ff166459faf51ae36f641f21b~tplv-k3u1fbpfcp-zoom-1.image )
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ced9e779fce54ccdafb09cf30e153045~tplv-k3u1fbpfcp-zoom-1.image )
### 评论组件
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/990e84e3b32241bf9ab2ae996b568129~tplv-k3u1fbpfcp-zoom-1.image )
### 个人中心组件
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63b328fb96a84cdd939cf43d2fff1f90~tplv-k3u1fbpfcp-zoom-1.image )
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dddb5d2df4194043ac9a84fd9f00601d~tplv-k3u1fbpfcp-zoom-1.image )
### 搜索组件
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d8b5ec1b8dc4e7189245d3f4bd2d110~tplv-k3u1fbpfcp-zoom-1.image )
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dbac0f6dd734bec9a407cc081cfe282~tplv-k3u1fbpfcp-zoom-1.image )
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6cbb03726584f77b191d78f7638b7f1~tplv-k3u1fbpfcp-zoom-1.image )
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f7322f9d7794b64800e83ed0465e0cf~tplv-k3u1fbpfcp-zoom-1.image )
### 每日推荐
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5626ca72702b47fb903d8b90d83b7fb7~tplv-k3u1fbpfcp-zoom-1.image )
### 排行榜
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c99ccc50a7ff4edba73c2aaaf5c985f7~tplv-k3u1fbpfcp-zoom-1.image )
### slide组件
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7994c8add6ff4dca853cf7f3b18b8316~tplv-k3u1fbpfcp-zoom-1.image )
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fb1a656f0b0493b9c3cf2045bd3d4a1~tplv-k3u1fbpfcp-zoom-1.image )
![]( https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eea4f5dd42764339b7a9958025a7c1eb~tplv-k3u1fbpfcp-zoom-1.image )
# 免责声明

本站音频文件来自各网站接口，本站不会修改任何音频文件


本项目仅为前端练手项目，请勿用作商业用途，请勿通过本项目下载盗版歌曲资源，否则后果自负！