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

现在，你应该已经有了一个简单可用的 VuePress 文档。如果你有兴趣的话可以去VuePress官方网站上深入学习它的配置和用法来丰富你的文档内容。


## 部署

### 部署到 GitHub Pages
接下来的内容假设你已经使用过 **GitHub**,并且对 **GitHub Pages** 有一定的了解。



### bash 脚本手动部署

### github actions 自动部署

## 其它问题

## 参考资料
- [vuepress官网](https://vuepress.vuejs.org/zh/ "vuepress官网")
- [使用 GitHub Actions 自动部署博客](https://vuepress-theme-reco.recoluan.com/views/other/github-actions.html "部署博客")
###
