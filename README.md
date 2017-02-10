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

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev

# build for production with minification
npm run build
因为需要打包Android App，所以对build做了些修改，变成了相对路径的方式如需build，请将build所生成的处于根目录下的img文件夹复制入dist中的static文件夹内，双击打开index.html文件即可
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
