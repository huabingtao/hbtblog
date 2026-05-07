---
title: 从 0 到 1：前端 CI/CD 实战（第四篇：Nginx + GitLab CI 实现前端自动发布上线）
date: 2026-01-27
show: true
tags:
  - Docker
  - CI/CD
author: Link
location: ShangHai
---
## **前言**


在前几篇中，我们已经完成了 GitLab、GitLab Runner 以及前端项目的自动构建流程。但在真实项目中，CI/CD 往往不仅仅是“跑通一次构建”这么简单，而是需要支持多环境、多项目、多分支部署。

本篇将结合我的真实项目结构，介绍如何通过 Nginx + GitLab CI，将前端项目分别部署到 dev、test、uat、prod 等环境中，实现一套可长期维护的自动发布方案。

## 目录规划

以 dev 环境为例：

```bash
cd /apps/deploy/dev

mkdir -p frontend/project-1
mkdir -p backend
```
结构如下：
```bash
/apps/deploy/dev
├── frontend
│   └── project-1
└── backend
```


## **配置 Nginx 配置文件**

所有环境的 Nginx 配置统一放在：

```bash
/apps/nginx-conf
```

### **1. 创建 dev 配置文件**

进入目录：
```bash
cd /apps/nginx-conf
```

新建文件：
```bash
vim front-dev.conf
```

写入内容：
```bash
server {
    listen 80;
    server_name _;

    location = /project-1 {
        return 301 /project-1/;
    }

    location /project-1 {
        alias /usr/share/nginx/html/project-1/;
        try_files $uri $uri/ /project-1/index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        root /usr/share/nginx/html/project-1;
        expires max;
        log_not_found off;
    }
}

```

保存退出：
```bash
:wq
```

### **2. 创建 test 配置（同理）**

```bash
vim front-test.conf
```

内容与 dev 基本一致,生产环境同理。

## **创建多环境 Nginx 容器**

### 创建 dev 环境的 Nginx 服务。

进入项目目录

```bash
cd /apps/deploy/dev/frontend/project-1
```
创建 compose 文件：
```bash
vim docker-compose.yml
```

编写 docker-compose.yml

```bash
version: "3.9"

services:
  front-dev-nginx:
    image: nginx:alpine
    container_name: front-dev-nginx
    ports:
      - "8000:80"
    volumes:
      - /apps/deploy/dev/frontend:/usr/share/nginx/html:ro
      - /apps/nginx-conf/front-dev.conf:/etc/nginx/conf.d/default.conf:ro
    restart: unless-stopped
```
### 创建 test 环境的 Nginx 服务。

进入项目目录
```bash
cd /apps/deploy/test/frontend/project-1
```

创建 compose 文件并写入
```bash
services:
  front-test-nginx:
    image: nginx:alpine
    container_name: front-test-nginx
    ports:
      - "8001:80"
    volumes:
      - /apps/deploy/test/frontend:/usr/share/nginx/html:ro
      - /apps/nginx-conf/front-test.conf:/etc/nginx/conf.d/default.conf:ro
    restart: unless-stopped
```

### 创建 prod 环境的 Nginx 服务。
进入项目目录
```bash
cd /apps/deploy/prod/frontend/project-1
```

创建 compose 文件并写入
```bash
services:
  front-prod-nginx:
    image: nginx:alpine
    container_name: front-prod-nginx
    ports:
      - "8002:80"
    volumes:
      - /apps/deploy/prod/frontend:/usr/share/nginx/html:ro
      - /apps/nginx-conf/front-prod.conf:/etc/nginx/conf.d/default.conf:ro
    restart: unless-stopped
```

### **3. 启动容器**

切换到 dev 文件夹下：

执行：
```bash
docker compose up -d
```
查看状态：
```bash
docker ps
```
出现：`nginx-dev`说明启动成功。

其他环境同理。

## **配置 GitLab CI 自动部署**
前面已经配置好构建流程，下面重点是部署阶段。

## 创建多环境主 CI 文件

在 project-1 项目根目录创建:
```bash
vim .gitlab-ci.yml
```
写入
```
include:
  - local: '.gitlab-ci-dev.yml'
    rules:
      - if: '$CI_COMMIT_REF_NAME == "dev"'

  - local: '.gitlab-ci-test.yml'
    rules:
      - if: '$CI_COMMIT_REF_NAME == "test"'

  - local: '.gitlab-ci-main.yml'
    rules:
      - if: '$CI_COMMIT_REF_NAME == "main"'
```

### **dev 环境 CI 文件**

在 project-1 项目根目录创建：

```bash
vim .gitlab-ci-dev.yml
```
写入：

```bash
stages:
  - build
  - deploy

variables:
  BUILD_DIR: dist
  DEPLOY_DIR: /apps/deploy/dev/frontend/project-1

build_project:
  stage: build
  tags: ["build"]
  image: node:24-alpine
  
  script:
    - npm install -g pnpm@8.15.3
    - pnpm install
    - npm run build:dev
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour


deploy_project:
  stage: deploy
  tags: ["build"]
  image: alpine:latest
  script:
    - mkdir -p $DEPLOY_DIR
    - rm -rf $DEPLOY_DIR/*
    - cp -r $CI_PROJECT_DIR/$BUILD_DIR/* $DEPLOY_DIR/
```

### **test 环境 CI 文件**

同理创建：
```bash
vim .gitlab-ci-test.yml
```
写入:
```bash
stages:
  - build
  - deploy

variables:
  BUILD_DIR: dist
  DEPLOY_DIR: /apps/deploy/test/frontend/project-1

build_project:
  stage: build
  tags: ["build"]
  image: node:24-alpine
  script:
    - npm install -g pnpm@8.15.3
    - pnpm install
    - npm run build:test
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour


deploy_project:
  stage: deploy
  tags: ["build"]
  image: alpine:latest
  script:
    - mkdir -p $DEPLOY_DIR
    - rm -rf $DEPLOY_DIR/*
    - cp -r $CI_PROJECT_DIR/$BUILD_DIR/* $DEPLOY_DIR/
```

### **prod 环境 CI 文件**

同理创建：
```bash
vim .gitlab-ci-main.yml
```
写入：
```bash
stages:
  - build
  - deploy

variables:
  BUILD_DIR: dist
  DEPLOY_DIR: /apps/deploy/prod/frontend/project-1

build_project:
  stage: build
  tags: ["build"]
  image: node:24-alpine
  script:
    - npm install -g pnpm@8.15.3
    - pnpm install
    - npm run build:prod
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour


deploy_project:
  stage: deploy
  tags: ["build"]
  image: alpine:latest
  script:
    - mkdir -p $DEPLOY_DIR
    - rm -rf $DEPLOY_DIR/*
    - cp -r $CI_PROJECT_DIR/$BUILD_DIR/* $DEPLOY_DIR/
```

## **测试完整发布流程**

到这里，可以开始验证完整链路。

### **1. 推送代码**
```bash
git push origin dev
```
### **2. 查看流水线**
进入 GitLab：
```bash
CI/CD → Pipelines
```

确认：

-   build 成功
-   deploy 成功

### **3. 查看服务器目录**

```bash
ls /apps/deploy/dev/frontend/project-1
```
应看到：
```text
index.html
assets
```

### **4. 浏览器访问**

打开：
```bash
http://服务器IP:8000/project-1/
```
页面正常显示即 dev 环境部署成功，其他环境同理。

## 本篇小结

这一路走来，我们不仅跑通了流程，更点亮了一整套实战技能树：从 **搭建云服务** 到 **GitLab** 私有化部署，从 **GitLab CI** 自动化构建到 **Docker + Nginx** 的多环境容器化隔离。

现在，只需一次 `git push`，代码就能自动流过我们亲手搭建的流水线。这种告别 FTP 搬砖、告别手动改配置的“全链路自动化”，才是前端工程化的核心魅力。至此，发布闭环正式达成——从此发布不求人，环境不抓瞎。

感谢你陪我走完这个系列，希望这套方案能帮你彻底告别手动发布的琐碎，把时间留给更酷的代码，我们下个系列见🎉🎉🎉！


