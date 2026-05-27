# Hbt'blog — 个人技术博客 🚀

[![VuePress](https://img.shields.io/badge/VuePress-1.x-3eaf7c?logo=vue.js&style=flat-square)](https://vuepress.vuejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D_17-43853d?logo=node.js&style=flat-square)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Build & Deploy](https://github.com/huabingtao/hbtblog/actions/workflows/main.yml/badge.svg)](https://github.com/huabingtao/hbtblog/actions)

本项目是基于 **VuePress v1** 搭建并深度定制的个人技术博客，主要用于分享前端工程化、混合移动端开发（uni-app/Hybrid）、AI 大模型前端工程化落地等技术沉淀与行业思考。

> 🌐 **博客地址**：[https://huabingtao.github.io/hbtblog/](https://huabingtao.github.io/hbtblog/)

---

## 🛠️ 核心技术栈

- **生成工具**：[VuePress v1](https://vuepress.vuejs.org/zh/) (基于 Vue.js 的静态网站生成器)
- **主题插件**：`@vuepress/theme-blog` (深度自研定制化主题)
- **样式处理**：Stylus (预处理器)
- **评论系统**：[Vssue](https://vssue.js.org/) (基于 GitHub Issue 的轻量级双向评论服务)
- **持续集成**：GitHub Actions (自动化构建与部署至 GitHub Pages)
- **包管理器**：npm (从 Yarn 升级迁移)

---

## 📂 项目结构

```bash
hbtblog/
├── .github/workflows/   # GitHub Actions 自动化流水线配置
│   └── main.yml         # 监听 master 分支自动构建部署
├── .vuepress/theme/     # 深度定制的博客主题样式与组件
│   ├── components/      # 重用页面组件
│   ├── layouts/         # 页面布局模板
│   └── styles/          # Stylus 样式文件
├── docs/                # 博客内容源文件目录
│   ├── .vuepress/       # VuePress 配置目录
│   │   └── config.js    # 主配置文件 (菜单、插件、Vssue密钥等)
│   ├── _posts/          # 博客文章 Markdowns (.md 文件)
│   └── README.md        # 博客首页占位模版
├── public/              # 静态页面构建输出目录 (运行 npm run docs:build 生成)
├── deploy.sh            # 手动一键部署脚本 (推送到 gh-pages 分支)
├── package.json         # 项目依赖与 Scripts 脚本
└── package-lock.json    # 依赖锁文件
```

---

## 🚀 本地开发与构建

### 1. 安装依赖

```bash
npm install
```

### 2. 启动本地开发服务

启动热重载开发服务器（默认监听 `http://localhost:2021/hbtblog/`）：

```bash
npm run docs:dev
```

### 3. 生成静态页面（生产构建）

```bash
npm run docs:build
```
> 💡 **Node.js 版本注意**：由于 VuePress v1 部分老旧依赖包与 Node.js 17+ 默认的 OpenSSL 3.0 不兼容，构建时已在 `package.json` 内自动注入 `NODE_OPTIONS=--openssl-legacy-provider` 环境变量。

### 4. 自动化/手动部署

- **持续集成部署**：每当有代码推送到 `master` 分支，GitHub Actions 均会自动执行构建并更新到 `gh-pages` 分支上。
- **手动部署**：若需要手动将本地构建发布到 GitHub Pages，可以运行以下指令：
  ```bash
  npm run deploy
  ```

---

## 📝 撰写新文章规范

新写的文章请放置于 `docs/_posts/` 目录下。为了保证博客主题能够正确解析分类、标签与时间，每篇文章顶部必须包含如下 Frontmatter 声明：

```markdown
---
title: 文章标题
date: YYYY-MM-DD
tags:
  - 标签1
  - 标签2
author: 华炳淘
---
```

---

## 💬 评论系统 (Vssue) 配置

博客评论基于 Vssue 插件，评论数据存储于当前仓库的 GitHub Issues 中。在不同部署环境下，需配置以下 OAuth App 凭证：

- **环境变量**：
  - `VSSUE_CLIENT_ID`
  - `VSSUE_CLIENT_SECRET`
- **本地开发**：如有需要，可在本地环境变量中直接配置以上两个变量，或在 [docs/.vuepress/config.js](file:///Users/zaxh/my-project/hbtblog/docs/.vuepress/config.js) 的 `comment` 模块中进行调试配置。
