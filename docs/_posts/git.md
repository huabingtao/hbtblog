<!--
 * @Author: your name
 * @Date: 2021-04-13 12:17:25
 * @LastEditTime: 2021-04-22 18:07:09
 * @LastEditors: huabingtao
 * @Description: In User Settings Edit
 * @FilePath: /hbtblog/docs/_posts/git.md
-->
---
title: git 常用命令
date: 2021-02-23
show: false
tags:
  - GIT
author: BingBing
location: ShangHai
---

## 修改最后一次注释
``` git
git commit --amend
```

输入i进入修改模式，修改好注释后，按Esc键 退出编辑模式，输入:wq保存并退出。ok，修改完成。
### 添加源 

查看远程关联库

`git remote -v`

添加关联

`git remote add origin xxxx.git`

删除关联

`git remote rm origin`

## 自定义Git

### 配置别名

git 当前状态 `git st`
`git config --global alias.st status`

co表示checkout，ci表示commit，br表示branch

```sh
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
```
git 最后一次提交的log `git last `
`git config --global alias.last 'log -1'`

git lg 
`git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"`

## git commit 提交规范
- init: 初始化
- feat: 新特性
- fix: 修改问题
- refactor: 代码重构
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改
- test: 测试用例修改
- build: 构建项目
- chore: 其他修改, 比如依赖管理
- scope: commit 影响的范围, 比如: route, component, utils, build...
- subject: commit 的概述

## 设置用户名和邮箱
### 查看git配置
`git config --list`
### 本地设置
```git
git config user.name "Your Name"
git config user.email "email@example.com"
```
### 全局设置
```git
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```
## 修改已经提交用户名和邮箱
[链接](https://cloud.tencent.com/developer/article/1352623)

在项目根目录下创建 email.sh 写入下面这段代码
```sh
#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="fphd_xian_lufei@fphd"
CORRECT_NAME="sy-records"
CORRECT_EMAIL="52o@qq52o.cn"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

执行 `./email.sh`

## Mac－－查看公钥

```sh
cd ~/.ssh
cat id_rsa.pub
```