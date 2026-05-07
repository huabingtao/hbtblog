---
title: 从 0 到 1：前端 CI/CD 实战 (第三篇：用 GitLab CI 自动构建并部署前端项目)
date: 2026-01-26
show: true
tags:
  - Docker
  - CI/CD
author: Link
location: ShangHai
---

## 前言
上一篇我们虽然用 Docker 把 GitLab 搭建起来了，但这 **只是搞定了“仓库”及其管家，真正干活的 CI/CD 还需要配置 Runner 才能跑起来**。

本篇我们将继续使用 Docker 部署 GitLab Runner。它就像是 GitLab 的“手脚”，一旦监测到代码提交，就能立刻帮我们自动执行测试、构建和部署任务。

## 项目准备

在部署 GitLab Runner 之前，我们需要先准备一个**可以被 CI/CD 驱动的前端项目**。

### **1️⃣ 在 GitLab 上创建空项目**

1.  打开 GitLab 首页，登录你的账号
2.  点击右上角 **New project**
3.  选择 **Create blank project**

填写项目信息：

-   **Project name**：frontend-ci-demo
-   **Visibility Level**：Private（或根据自己需求）
-   **不要勾选** Initialize repository with a README


> 这里我们创建的是**完全空仓库**，方便后面完整演示 Git 初始化和关联过程。


创建完成后，GitLab 会给你一个仓库地址，例如：

```bash
http://<your-ip-or-domain>/your-username/frontend-ci-demo.git
```

这个地址先记住，后面会用到。

### **2️⃣ 本地创建 Vue 项目**

在你的本地开发机（Mac / Windows ）执行以下步骤。

#### **创建 Vue 项目**

这里以 Vue 3 + Vite 为例：

```bash
npm create vite@latest frontend-ci-demo
```
进入项目目录并安装依赖：

```bash
cd frontend-ci-demo
npm install
```

本地启动验证一下项目是否正常：
```bash
npm run dev
```

### **3️⃣ 初始化 Git 仓库**
在项目根目录执行：
```bash
git init
```

添加并提交第一次代码：
```bash
git add .
git commit -m "init: create vue project"
```

### **4️⃣ 关联远程 GitLab 仓库**

将本地项目与刚才创建的 GitLab 空项目关联：

```bash
git remote add origin http://<your-ip-or-domain>/your-username/frontend-ci-demo.git
```

确认远程仓库是否配置成功：
```bash
git remote -v
```

### **5️⃣ 推送代码到 GitLab**

首次推送需要指定分支：

```bash
git branch -M main
git push -u origin main
```

推送完成后，刷新 GitLab 页面，你应该可以看到：

-   项目代码已成功上传
-   分支为 main
-   提交记录正常显示

## **注册 GitLab Runner**

到目前为止，我们已经在 GitLab 中准备好了一个可运行的 Vue 项目，但现在这个项目还只是“存着”，并不能自动构建和部署。要让 GitLab 具备 CI/CD 能力，必须为它配置一个执行器 —— **GitLab Runner**。

本节将通过 Docker 的方式部署 Runner，并将其注册到当前 GitLab 服务中。

### **1️⃣ 创建 Runner 工作目录**

先在服务器上为 Runner 创建独立目录：

```bash
mkdir -p /apps/infra/gitlab-runner
cd /apps/infra/gitlab-runner
```

### **2️⃣ 编写 docker-compose.yml**

在当前目录创建配置文件：

```bash
vim docker-compose.yml
```

写入以下内容：

```bash
version: "3.9"

services:
  gitlab-runner:
    image: gitlab/gitlab-runner:latest
    container_name: gitlab-runner
    restart: always
    volumes:
      - /apps/infra/gitlab-runner/config:/etc/gitlab-runner
      - /var/run/docker.sock:/var/run/docker.sock
```

### **3️⃣ 启动 Runner 服务**

在当前目录执行：

```bash
docker compose up -d
```

查看状态：
```bash
docker compose ps
```

看到 Up 状态说明启动成功。

### **4️⃣ 获取 GitLab Runner 注册信息**
进入 GitLab 项目页面：
```code
Settings → CI/CD → Runners
```

展开 Runners 区域，获取：

-   GitLab URL
-   Registration token


```text
URL: http://192.168.1.100
Token: xxxxxxxx
```
复制备用。

### **5️⃣ 注册 Runner 到 GitLab**
进入容器内部：
```bash
docker exec -it gitlab-runner gitlab-runner register
```

按提示依次填写：
#### **① GitLab 地址**
```bash
http://你的服务器IP
```

#### **② 注册 Token**

粘贴刚才复制的 Token。

#### **③ Runner 描述**

```text
frontend-runner
```

#### **④ Tags（可选）**
```text
build
```
用于后续区分任务。

#### **⑤ Executor 类型**
```text
docker
```
#### **⑥ 默认镜像**
```text
node:24-alpine
```

注册完成后，会显示：
```bash
Runner registered successfully
```

### **6️⃣ 验证 Runner 状态**


回到 GitLab 页面：
```text
Settings → CI/CD → Runners
```
确认：

-   状态为 Online
-   绑定到当前项目

说明 Runner 已成功接入。


### **7️⃣ 配置 CI 流水线文件**

在项目根目录创建：

```text
.gitlab-ci.yml
```

内容如下：
```bash
stages:
  - test

job_test:
  stage: test
  tags: ["build"]
  script:
    - echo "test runner"
```

### **8️⃣ 触发 Pipeline 验证**

推送代码：
```bash
git add .gitlab-ci.yml
git commit -m "add ci pipeline"
git push
```
查看任务执行情况。
```bash
CI/CD → Pipelines
```

如果显示：


✅ Passed

说明：

> Runner + GitLab + 前端构建链路已经全部跑通。

## **本章小结**
本篇我们通过 Docker Compose 的方式完成了 GitLab Runner 的部署与注册，并成功将其接入到现有的 GitLab 服务中，让仓库具备了执行 CI 任务的能力。
截至目前，我们已经实现了：

-   使用 Docker Compose 管理 Runner 服务
-   将 Runner 持久化配置到服务器本地
-   通过 Token 将 Runner 注册到指定项目
-   编写 .gitlab-ci.yml 跑通前端构建流程
-   验证 Pipeline 能够正常自动执行

至此，整个 CI 链路已经基本打通：

**代码提交 → 自动拉取 → 安装依赖 → 构建项目**，都可以由 GitLab 自动完成。

下一篇将结合 Nginx 和部署目录，进一步完善自动发布流程，实现前端项目从提交到上线的全自动化。
