---
title: git 常用命令
date: 2021-02-23
show: false
tags:
  - GIT
author: link
location: ShangHai
---

## .gitignore 忽略规则及清除缓存

清除缓存:

如果在开发的过程中添加或者修改了`.gitignore`文件，那么它可能不会生效，因为一些需要忽略的文件已经加入了 git 的追踪列表中，可以通过清除 git 缓存来使新的.gitignore 生效。方法如下：

```sh
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

## 常用操作

### 克隆指定分支

```sh
git clone -b dev-md https://gitee.com/mindspore/mindscience.git
```

### 新建分支

git checkout -b xxxx

### 删除分支

git branch -D xxx

### 删除远程分支

git push origin --delete branch

### 新建分支并关联远程分支

git checkout --track origin/dev

### 修改最后一次注释

```git
git commit --amend
```

输入 i 进入修改模式，修改好注释后，按 Esc 键 退出编辑模式，输入:wq 保存并退出。ok，修改完成。

### 撤销commit

git reset --soft HEAD^

git reset --hard HEAD^  这样连add也撤销了。

>>> HEAD^ 表示上一个版本，即上一次的commit，几个^代表几次提交，如果回滚两次就是HEAD^^。
也可以写成HEAD~1，如果进行两次的commit，想要都撤回，可以使用HEAD~2。

>>> --soft
不删除工作空间的改动代码 ，撤销commit，不撤销add

>>> --hard
删除工作空间的改动代码，撤销commit且撤销add

### 添加源

查看远程关联库

`git remote -v`

添加关联

`git remote add origin xxxx.git`

删除关联

`git remote rm origin`

## 自定义 Git

### 配置别名

git 当前状态 `git st`
`git config --global alias.st status`

co 表示 checkout，ci 表示 commit，br 表示 branch

```sh
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
```

git 最后一次提交的 log `git last`
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

### 查看 git 配置

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

## 秘钥配置

### 查看秘钥如果没有密钥则不会有此文件夹

```sh
cd ~/.ssh
cat id_rsa.pub
```

## [解决]git-ssh: connect to host github.com port 22: Connection timed out

[文章链接](https://www.jianshu.com/p/c3aac5024877)

### 生成新的秘钥

```sh
ssh-keygen -t rsa -C "eamil"
```

你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，因为这个 Key 仅用于简单的服务，所以也无需设置密码。
