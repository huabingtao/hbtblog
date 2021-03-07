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
### 添加源 
输入i进入修改模式，修改好注释后，按Esc键 退出编辑模式，输入:wq保存并退出。ok，修改完成。
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