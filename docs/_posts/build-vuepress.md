---
title: 基于 vuepress 搭建博客教程 + 自动化部署 GitHub actions
date: 2021-02-07
tags:
  - vuepress
  - vue
author: link
location: ShangHai
---

## 介绍
用官方的话来说 **VuePress** 是一款以 **Vue** 驱动的静态网站生成器,它的诞生初衷是为了支持 **Vue** 及其子项目的文档需求。由于vuepress支持自定义开发主题所以很多人拿它来写博客，下面我会用 **VuePress** 搭建一个极简的博客网站并使用[GitHub Actions](https://docs.github.com/en/actions)部署到[GitHub Pages](https://pages.github.com/)。

[示例项目github源码](https://github.com/huabingtao/vuepress-starter)

[示例博客访问地址](https://huabingtao.github.io/vuepress-starter/)

## 搭建博客

> 前提条件 VuePress 需要 Node.js >= 8.6

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
> 安装依赖注意如果你的现有项目依赖了 **webpack 3.x**，VuePress官方推荐使用 **Yarn** 而不是 **npm** 来安装 **VuePress**。因为在这种情形下，**npm** 会生成错误的依赖树。


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
![yOLS6P.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/764d776b420042b48f5de0dfef15eaa4~tplv-k3u1fbpfcp-zoom-1.image)
如果出现文章乱码可以参照这篇[文章](https://www.6blog.cn/frontEnd/136)去解决。

现在，你应该已经有了一个简单可用的 **VuePress** 文档。如果你有兴趣的话可以去 VuePress 官方网站上深入学习它的配置和用法来丰富你的网站内容。


## 部署

### 部署到 GitHub Pages
接下来的内容假设你已经使用过[GitHub](https://github.com/),并且对[GitHub Pages](https://pages.github.com/)有一定的了解。

1. 在GitHub上创建一个仓库
![yOwHyT.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c87f56609b5b46a7ae47871d98703005~tplv-k3u1fbpfcp-zoom-1.image)

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
> 需要将 **USERNAME** 和 **REPO** 替换成自己的**GitHub**账号和**仓库名称**这里我拿自己的GitHub账号为例。
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
> 以上脚本主要就是干了几件事: 1.生成静态文件 2.切换到生成文件的目录下初始化git写入一条记录 3. 把静态文件推送到远端仓库的gh-pages分支下。

4. 用sh脚本部署
  
打开`package.json`下新增一条命令
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
5. 设置仓库**GitHub Pages**访问路径
现在代码已经推送到远程仓库的gh-pages分支下,接下来我们需要设置博客的访问路径，点击右上角的Settings按钮进入设置。
![yXqZB8.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92910479b915404682ff870cd75de272~tplv-k3u1fbpfcp-zoom-1.image)
选择目标分支为gh-pages,根目录为root
![yXqUN4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f8dab0ade854f51a4fbc8ebf2c035a3~tplv-k3u1fbpfcp-zoom-1.image)
稍等几分钟后访问[https://huabingtao.github.io/vuepress-starter/](https://huabingtao.github.io/vuepress-starter/)此时发现我们的博客已经部署到Github Pages了。
到这里如果你只是希望你的博客可以随时在互联网被访问到，只需要在写完文章之后去执行 `npm run deploy` 这行命令就可以了。

### 使用 Github Actions 自动部署
现在我们写一篇文章并且发布到 **GitHub Pags** 需要手动执行sh脚本,使用**GitHub Actions** 可以帮助我们简化流程，让写完一篇文章后只需要将代码上传至 **GitHub** 就能帮我们自动构建部署到线上。

**GitHub Actions** 有一些自己的术语。

1.workflow （工作流程）：持续集成一次运行的过程，就是一个 workflow。

2.job （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。

3.step（步骤）：每个 job 由多个 step 构成，一步步完成。

4.action （动作）：每个 step 可以依次执行一个或多个命令（action）。

想要了解更多Github Actions知识可以浏览[官方GitHub Actions快速入门](https://docs.github.com/cn/actions/quickstart),或者[阮一峰老师的GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
#### 创建个人访问令牌
1. 在任何页面的右上角，单击您的个人资料照片，然后单击 Settings（设置）
   
  ![6EP7Ke.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad2817e37a9d484faf8247f07abe266c~tplv-k3u1fbpfcp-zoom-1.image)

2. 在左侧边栏中，单击 Developer settings。
   
  ![6EeoB8.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ac2511f2a8c407494dd0dea329acbb0~tplv-k3u1fbpfcp-zoom-1.image)

3. 在左侧边栏中，单击 Personal access tokens（个人访问令牌）
   
  ![6EmnHO.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bd1434a57e147c6960c7f6334fdbf09~tplv-k3u1fbpfcp-zoom-1.image)

4. 单击 Generate new token（生成新令牌）。
   
5. 给令牌一个描述性名称。

  令牌名字一定要叫：**ACCESS_TOKEN**

6. 选择要授予此令牌的作用域或权限。 要使用令牌从命令行访问仓库，请选择 repo（仓库）。

![6EmXIe.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fe635dd182349419d172e83625fc2d2~tplv-k3u1fbpfcp-zoom-1.image)

7. 单击 Generate token（生成令牌）。
8. 单击复制将令牌复制到剪贴板。 出于安全原因，离开此页面后，您将无法再次看到令牌。

#### 编写 workflow 文件
工作流文件使用 **YAML** 语法，这里不对 **YAML** 语法做过多介绍想要了解更多信息请参阅[五分钟了解 YAML](https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes)。

接着创建`.github/workflows/main.yml`文件,内容如下:

``` yml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: "14"

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # 部署到 gh-pages 分支
          BRANCH: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          FOLDER: docs/.vuepress/dist

```

以上代码主要配置内容如下:
1. branches 代表git push 触发flow的分支名称，如果你的分支不是main请修改正确。
2. run 表示运行命令，若没有修改的话就是 `yarn docs:build`。
3. ACCESS_TOKEN 读取GitHub仓库之前我们设置的 ACCESS_TOKEN，名称一定要与之前设置的相同。
4. BRANCH 部署到 gh-pages 分支下。
5. FOLDER 部署目录,如果没有修改默认配置就是 `docs/.vuepress/dist`。
   
完成以上配置，下次push代码的时候，就会自动开启构建。

尝试push代码，回到GitHub上点击actions,发现项目已经在自动构建了。

![6VME4S.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/999fccfbcfe049dbb88b104606b9efe7~tplv-k3u1fbpfcp-zoom-1.image)

点击进入查看部署情况。

![6VMAN8.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a39c0d5e3d8d4998b3c487d8bbc0ea55~tplv-k3u1fbpfcp-zoom-1.image)

部署成功，如果构建失败GitHub会发送一封邮件到你的邮箱。



## 搭建过程中遇到的问题
1. 如果你打算发布到 `https://<USERNAME>.github.io/，` 则不需要配置 `.vuepress/config.js` base 属性,因为 base 默认是 "/"。
2. 发布到线上后发现css样式丢失，经查看发现访问路径发生404的有可能是项目引用路径错误，本文没有修改过打包路径，用的是默认路径 `docs/.vuepress/dist`，如不一致请修改。
3. 本文所使用的actions版本是v3，以往教程中所讲到的使用的是`JamesIves/github-pages-deploy-action` v2版本，新版本语法已经发生了变化，如果继续使用就会发生错误。
4. **ACCESS_TOKEN** 一定要和github上的asectets上的名称相同。

## 参考资料
- [vuepress官网](https://vuepress.vuejs.org/zh/ "vuepress官网")
- [使用 GitHub Actions 自动部署博客](https://vuepress-theme-reco.recoluan.com/views/other/github-actions.html "部署博客")
- [阮一峰 GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
- [MarkDown 基本语法](https://www.jianshu.com/p/191d1e21f7ed)
## 小结
本文介绍了如何使用 **vuepress** 搭建博客，并使用**GitHub Pages** 部署到线上环境，但是部署的流程都是手动操作的有些麻烦，文章后半部分内容简单介绍了**GitHub Actions**，实现了当我们要发布一篇文章的时候只要`push`到 **GitHub** 就能实现自动化打包发布流程，让双手从机械的流程中解脱专注于写作。虽然能够简单实现一个博客网站，但是 **VuePress** 的更有趣的玩法还有待大家自己去学习。

以上就是本篇文章的所有内容。最后，感谢您阅读这篇文章，有任何问题或反馈请给我留言。
