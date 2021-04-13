<!--
 * @Description: description
 * @Version: 1.0
 * @Author: huabingtao
 * @Date: 2021-04-13 13:48:47
 * @LastEditors: huabingtao
 * @LastEditTime: 2021-04-13 17:36:47
 * @FilePath: /hbtblog/docs/_posts/utils.md
-->
---
title: 工具
date: 2021-04-13
tags:
  - js
author: BingBing
location: ShangHai
---

## 安装homebrew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## nvm
安装命令: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash`
看一下node有哪些版本可以安装
```
nvm ls-remote
```
安装版本 
```
nvm install v4.5.0
```
查看版本
```
nvm ls
```

nvm 轻松切换 node 版本
```
nvm use v4.5.0
```
查看当前版本
```
nvm current
```

## yarn
macOs
### 安装
by Homebrew
```
brew install yarn
```
### by curl
```
curl -o- -L https://yarnpkg.com/install.sh | bash
```
查看版本 `yarn --version`
## nrm

