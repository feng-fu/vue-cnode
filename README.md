# vue-cnode

> A Vue.js project base on cnode.org api

> 项目开发中，一个基于cnode社区api的vue 2.0应用

> 主要依赖： vue-router／axios／mint-ui／marked

> axios代替vue-resource成为一代新宠，不得不学

> mint-ui作为新一代的UI库，基于vue深度定制，值得一用

> 预期功能：
> * 各模块贴子的浏览   √
> * 登陆及退出        √
> * 回帖，顶帖        √
> * 待续


已打包为android app [点击下载](http://fengfu.space/vue-cnode/android/package.apk)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev

# build for production with minification
npm run build
cd dist
open index.html in a server.
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 基于vue.js的cnode社区

### 分享

[线上预览](http://fengfu.space/vue-cnode/dist/index.html)

[android App](http://fengfu.space/vue-cnode/android/package.apk)

[github 地址](https://github.com/feng-fu/vue-cnode) 

 厚着脸皮来要个star

### 缘起
一直想着学习一个框架，现阶段而言，最火的框架到该就是vue.js，angular和React了，前前后后纠结了一阵，终于从入门到放弃了几次之后，痛定思痛把目光放在vue.js上，虽不能说真的学会了，但是终归还是能够写出一个入不了法眼的东西来了，就顺便着记一下这过程中学过的东西吧，也算是给自己的一个总结。

### 初步
学一个东西，最好的教材当然是它的官方文档，并且对于vue而言，可能是拥有最完整中文社区的框架了吧，按着教程一步步的走过一遍之后还是有了一个初步的理解，有时候总想着去找一些博客看看，最后发现这些博客还不都是对这官方文档的依葫芦画瓢，甚至有的还画的不那么真切，所以静下心来画个两个晚上的时间将所有的例子都是先一遍，这真的就算是入门了啊。

### 巧遇

都说学一个东西最好的方式就是实践，所以纸上谈兵想来不受人待见，这也不是没有道理的事情，至少来说，在自己一次次的摸索中，可以发现自己所欠缺的东西，这时候恰巧可而去学一学，说不定下次再用到的时候就变得的心应手了，这不，可能你和我一样，在看上面例子的时候自己已经厌倦，甚至都不能快乐的将全部的内容看完，更别说全部敲上一遍了（到这里顺便鄙视一波在上弥漫说让别人画两个晚上敲完例子的自己，毕竟自己都没有这个闲心），闲时总喜欢逛逛gayhub，看看有什么好的东西，可以顺便练练手什么的，到这里总算说道正题了，这不，搜到了一个基于cnode社区api的项目，这下可算是如获至宝了。

### 实践

我发现自己正在将一个技术分享帖往闲碎小说的方向发展，接下来终于使正题了，在这里呢，我选用了可算是现阶段的vue.js全家桶，包括vue 2.0 vue-router axios vuex这几项东西，然后选择了mint-ui作为懒得写样式和不会设计的自己的一个替代品，开始了这个随性而起的项目。

既然提到用到这些技术，当然用到了它们的招牌功能，可能有人说不该用到vuex，那不就说图个新鲜嘛，刚学的心情不都想着要全部实践一番，最后用Cordova进行了打包，这里只有android App，到现在我都还没搞明白到宝成IOS App需要什么样的条件，我还以为只要我在模拟器中能跑起来就能找到安装包，看来还是我自己太天真，毕竟我没有苹果的开发者账号。
