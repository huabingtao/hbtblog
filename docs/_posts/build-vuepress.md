---
title: 基于 vuepress 搭建博客教程 + 自动化部署 GitHub actions
date: 2021-02-07
tags:
  - vuepress
  - vue
author: BingBing
location: ShangHai
---

## 介绍
用官方的话来说 **VuePress** 是一款以 **Vue** 驱动的静态网站生成器，它的诞生初衷是为了支持 **Vue** 及其子项目的文档需求。下面我会用 **VuePress** 开发一个博客网站并使用[GitHub Actions](https://docs.github.com/en/actions)部署到[GitHub Pages](https://pages.github.com/)

## 搭建博客

> 前提条件 
VuePress 需要 Node.js >= 8.6
1. 创建并进入一个新目录
``` sh
mkdir vuepress-starter && cd vuepress-starter
```
2. 使用你喜欢的包管理器进行初始化

``` sh
yarn init # npm init
```

3. 将 VuePress 安装为本地依赖
  
``` sh
yarn add -D vuepress # npm install -D vuepress
```
> 安装依赖注意
如果你的现有项目依赖了 **webpack 3.x**，VuePress官方推荐使用 **Yarn** 而不是 **npm** 来安装 **VuePress**。因为在这种情形下，**npm** 会生成错误的依赖树。

4. 创建你的第一篇文档 
  
```  sh
mkdir docs && echo '# Hello VuePress' > docs/README.md 
```
5. 在 package.json 中添加一些 scripts
  
``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
6. 在本地启动服务器
``` sh
yarn docs:dev # npm run docs:dev
```
VuePress 会在 [http://localhost:8080](http://localhost:8080) 启动一个热重载的开发服务器。
![yOLS6P.png](https://s3.ax1x.com/2021/02/24/yOLS6P.png)
如果出现文章乱码可以参照这篇[文章](https://www.6blog.cn/frontEnd/136)去解决。

现在，你应该已经有了一个简单可用的 **VuePress** 文档。如果你有兴趣的话可以去 VuePress 官方网站上深入学习它的配置和用法来丰富你的网站内容。


## 部署

### 部署到 GitHub Pages
接下来的内容假设你已经使用过[GitHub](https://github.com/),并且对[GitHub Pages](https://pages.github.com/)有一定的了解。
1. 在GitHub上创建一个仓库
  
![yOwHyT.png](https://s3.ax1x.com/2021/02/24/yOwHyT.png)

2. 在 docs/.vuepress/config.js 中设置正确的 base

在 docs/.vuepress 文件夹下创建 **config.js** 
``` js
// config.js
module.exports = {
    base: "/vuepress-starter/"
}
```

3. 配置.sh脚本
在你的项目根目录中，创建一个如下的 deploy.sh 文件（请自行判断去掉高亮行的注释）:
> 注意
> 需要将 **USERNAME** 和 **REPO** 替换成自己的**GitHub**账号和**仓库名称**这里我拿自己的GitHub账号为例
``` sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git remote add origin git@github.com:huabingtao/vuepress-starter.git
git branch -M main
git push -f git@github.com:huabingtao/vuepress-starter.git main:gh-pages

cd -
```


4. 用sh脚本部署
  
在package.json下新增一条命令
``` json
"scripts": {
  ...,
  "deploy": "bash deploy.sh"
}
```

打开控制台执行
``` sh
npm run deploy
```
5. 设置仓库GitHub Pages访问路径
现在代码已经部署到远程仓库的gh-pages分支下,接下来我们需要设置博客的访问路径，点击右上角的Settings按钮进入设置
![yXqZB8.png](https://s3.ax1x.com/2021/02/24/yXqZB8.png)
选择目标分支为gh-pages,根目录为root
![yXqUN4.png](https://s3.ax1x.com/2021/02/24/yXqUN4.png)
稍等几分钟后访问[https://huabingtao.github.io/vuepress-starter/](https://huabingtao.github.io/vuepress-starter/)此时发现我们的博客部署到Github Pages了

### github actions 自动部署

1. 

## 报错以及其它问题

## 参考资料
- [vuepress官网](https://vuepress.vuejs.org/zh/ "vuepress官网")
- [使用 GitHub Actions 自动部署博客](https://vuepress-theme-reco.recoluan.com/views/other/github-actions.html "部署博客")
###
